/**
 * --------------------------------------------------------------------------
 * Bootstrap scrollspy.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import { getElement, isDisabled, isVisible } from './util/index'
import type { ComponentConfig, ComponentConfigType } from './types'

const NAME = 'scrollspy'
const DATA_KEY = 'bs.scrollspy'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_ACTIVATE = `activate${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`
const EVENT_SCROLL = `scroll${EVENT_KEY}`
const EVENT_SCROLLEND = `scrollend${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item'
const CLASS_NAME_ACTIVE = 'active'

const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"], [data-tblr-spy="scroll"]'
const SELECTOR_TARGET_LINKS = '[href]'
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group'
const SELECTOR_NAV_LINKS = '.nav-link'
const SELECTOR_NAV_ITEMS = '.nav-item'
const SELECTOR_LIST_ITEMS = '.list-group-item'
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`
const SELECTOR_DROPDOWN = '.dropdown'
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle'

// How long (ms) to wait after the last scroll event before settling a pending
// smooth-scroll navigation, when the native `scrollend` event is unavailable.
const SCROLL_IDLE_TIMEOUT = 100
// Debounce (ms) for rebuilding the observer on resize (px activation lines only).
const RESIZE_DEBOUNCE = 100

const Default: ComponentConfig = {
  // `rootMargin` is the raw IntersectionObserver root-box override. When set it
  // takes precedence over `topMargin` and is passed straight to the observer.
  // Leave it null and use `topMargin` for everyday use.
  rootMargin: null,
  smoothScroll: false,
  target: null,
  threshold: [0],
  // Position of the activation line, measured from the top of the scroll root.
  // The active section is the deepest one whose top has scrolled to/above it.
  // Accepts a percentage (`12%`) or pixels (`96px`, e.g. below a sticky navbar).
  topMargin: '12%',
}

const DefaultType: ComponentConfigType = {
  rootMargin: '(string|null)',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array',
  topMargin: 'string',
}

// Decode a URL fragment id, tolerating malformed escapes (returns it as-is).
const decodeFragment = (hash: string): string => {
  try {
    return decodeURIComponent(hash)
  } catch {
    return hash
  }
}

class ScrollSpy extends BaseComponent {
  _sections: HTMLElement[]
  _linkBySection: Map<HTMLElement, HTMLElement>
  _sectionByLink: Map<HTMLElement, HTMLElement>
  _intersecting: Set<HTMLElement>
  _activeTarget: HTMLElement | null
  _lastActive: HTMLElement | null
  _sentinelVisible: boolean
  _bottomScrollHandler: (() => void) | null
  _bottomScrollFrame: number | null
  _triggers: number[]
  _maxScroll: number
  _rootElement: HTMLElement | null
  _observer: IntersectionObserver | null
  _sentinel: HTMLElement | null
  _sentinelObserver: IntersectionObserver | null
  _pendingNavigation: { hash: string; section: HTMLElement } | null
  _settleTimeout: ReturnType<typeof setTimeout> | null
  _settleHandler: (() => void) | null
  _scrollIdleHandler: (() => void) | null
  _resizeHandler: (() => void) | null
  _resizeTimeout: ReturnType<typeof setTimeout> | null

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    // this._element is the observablesContainer and config.target the menu links wrapper
    this._sections = [] // observable section elements, in DOM order
    this._linkBySection = new Map() // section element -> nav link
    this._sectionByLink = new Map() // nav link -> section element (for smooth scroll)
    this._intersecting = new Set() // sections currently crossing the activation line
    this._activeTarget = null
    this._lastActive = null // last activated section (keep-last across gaps)
    this._sentinelVisible = false
    this._bottomScrollHandler = null
    this._bottomScrollFrame = null
    this._triggers = [] // scroll position at which each section reaches the line
    this._maxScroll = 0
    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element

    this._observer = null
    this._sentinel = null
    this._sentinelObserver = null

    this._pendingNavigation = null
    this._settleTimeout = null
    this._settleHandler = null
    this._scrollIdleHandler = null

    this._resizeHandler = null
    this._resizeTimeout = null

    this.refresh()
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): ComponentConfigType {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  refresh(): void {
    this._initializeTargetsAndObservables()
    this._maybeEnableSmoothScroll()

    // (Re)build the activation observer.
    this._observer?.disconnect()
    this._intersecting.clear()
    this._observer = this._getNewObserver()
    for (const section of this._sections) {
      this._observer.observe(section)
    }

    // Measure where each section would cross the line, so the tail sections a
    // short page can't scroll up to the line still get their turn.
    this._measure()

    // Detect the bottom-of-page case (short trailing sections whose tops never
    // reach the activation line) via a dedicated sentinel observer.
    this._setUpSentinel()

    // Keep the measurements (and, for a px line, the observer) current on resize.
    this._addResizeListener()
  }

  dispose(): void {
    this._observer?.disconnect()
    this._teardownSentinel()
    this._disarmSettle()
    this._removeResizeListener()
    EventHandler.off(this._config.target as HTMLElement, EVENT_CLICK)
    super.dispose()
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    config.target = getElement(config.target) || document.body

    if (typeof config.threshold === 'string') {
      config.threshold = config.threshold.split(',').map((value: string) => Number.parseFloat(value))
    }

    return config
  }

  // --- Detection (IntersectionObserver-driven) -----------------------------

  _getNewObserver(): IntersectionObserver {
    const options: IntersectionObserverInit = {
      root: this._rootElement,
      threshold: this._config.threshold as number[],
      rootMargin: (this._config.rootMargin as string | null) ?? this._getDerivedRootMargin(),
    }

    return new IntersectionObserver((entries) => this._onIntersect(entries), options)
  }

  _onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this._intersecting.add(entry.target as HTMLElement)
      } else {
        this._intersecting.delete(entry.target as HTMLElement)
      }
    }

    this._computeActive()
  }

  // Single source of truth for active selection. It runs off IO state (the
  // deepest DOM-order section crossing the activation line; keep-last across a
  // gap; the first section stays active at the top). Near the bottom, where a
  // short page can't scroll the trailing sections up to the line, it hands off
  // to `_tailActiveIndex`, which spreads the leftover scroll across them.
  _computeActive(): void {
    // Guard against observer callbacks that outlive a disposed/detached instance.
    if (!this._element?.isConnected || this._sections.length === 0) {
      return
    }

    let active: HTMLElement | null = null

    const tailIndex = this._tailActiveIndex()
    if (tailIndex !== -1) {
      active = this._sections[tailIndex]
    } else {
      for (const section of this._sections) {
        if (this._intersecting.has(section)) {
          active = section
        }
      }

      // No section crosses the line: keep the last active (content gap), or fall
      // back to the first section at the top of the page.
      active ||= this._lastActive ?? this._sections[0]
    }

    if (!active) {
      return
    }

    this._lastActive = active
    const link = this._linkBySection.get(active)
    if (link) {
      this._process(link)
    }
  }

  // Distance of the activation line from the top of the scroll root, in pixels.
  _lineOffset(): number {
    const { value, unit } = this._parseTopMargin()
    if (unit === 'px') {
      return value
    }

    const rootHeight = this._rootElement ? this._rootElement.clientHeight : document.documentElement.clientHeight || window.innerHeight
    return (value / 100) * rootHeight
  }

  _scroller(): HTMLElement {
    return this._rootElement || (document.scrollingElement as HTMLElement) || document.documentElement
  }

  // Record, per section, the scroll position at which its top meets the line,
  // plus the scroll root's maximum scroll. Read on refresh/resize/approach —
  // never on the hot path.
  _measure(): void {
    if (!this._element?.isConnected) {
      return
    }

    const scroller = this._scroller()
    this._maxScroll = Math.max(scroller.scrollHeight - scroller.clientHeight, 0)

    const offset = this._lineOffset()
    const base = this._rootElement ? this._rootElement.getBoundingClientRect().top - this._rootElement.scrollTop : -window.scrollY

    this._triggers = this._sections.map((section) => section.getBoundingClientRect().top - base - offset)
  }

  // When trailing sections can't be scrolled up to the line, IO state alone
  // would leave them (and often the last one) unreachable. Once we're in that
  // zone, spread the remaining scroll evenly across them so every link lights
  // up. Returns -1 whenever normal IO selection should stand.
  _tailActiveIndex(): number {
    // Not near the bottom, no sections measured, or nothing actually scrolls.
    if (!this._bottomScrollHandler || this._triggers.length === 0 || this._maxScroll <= 0) {
      return -1
    }

    let firstUnreachable = -1
    for (const [index, trigger] of this._triggers.entries()) {
      if (trigger > this._maxScroll + 1) {
        firstUnreachable = index
        break
      }
    }

    if (firstUnreachable === -1) {
      return -1
    }

    const anchor = Math.max(firstUnreachable - 1, 0)
    const start = Math.min(this._triggers[anchor], this._maxScroll)
    const scrollTop = this._scroller().scrollTop

    if (scrollTop < start - 1) {
      return -1
    }

    const tailCount = this._sections.length - anchor
    const span = Math.max(this._maxScroll - start, 1)
    const progress = Math.min(Math.max((scrollTop - start) / span, 0), 1)

    return anchor + Math.min(Math.floor(progress * tailCount), tailCount - 1)
  }

  // Single source of truth for the `topMargin` option: its numeric value and
  // whether it's expressed as a percentage of the root height or in pixels.
  _parseTopMargin(): { value: number; unit: '%' | 'px' } {
    const value = String(this._config.topMargin)
    return {
      value: Number.parseFloat(value) || 0,
      unit: value.endsWith('%') ? '%' : 'px',
    }
  }

  // Collapse the observer root to a strip from the top down to the activation
  // line, so a section is "intersecting" exactly while it crosses that line.
  _getDerivedRootMargin(): string {
    const { value, unit } = this._parseTopMargin()
    let percent = value

    // Express a pixel activation line as a percentage of the root height.
    if (unit === 'px') {
      const rootHeight = this._rootElement ? this._rootElement.clientHeight : document.documentElement.clientHeight || window.innerHeight
      percent = rootHeight ? (value / rootHeight) * 100 : 12
    }

    // Clamp so the bottom inset stays a valid (non-negative) rootMargin even if
    // the line sits outside the root box.
    const bottom = Math.min(Math.max(100 - percent, 0), 100)
    return `0px 0px -${bottom}% 0px`
  }

  // Whether the activation line is derived from a pixel `topMargin` (in which
  // case it must be recomputed on resize). An explicit `rootMargin` is owned by
  // the caller, and a `%` topMargin is recomputed by the browser automatically.
  _usesPixelMargin(): boolean {
    return !this._config.rootMargin && this._parseTopMargin().unit === 'px'
  }

  // --- Bottom sentinel -----------------------------------------------------

  // Trailing sections a short page can't scroll up to the activation line would
  // never activate on IO state alone. The sentinel sits at the end of the
  // observable container; when it comes into view we re-measure and arm a
  // bounded scroll listener so `_tailActiveIndex` can hand the trailing links
  // their turn as the last of the scroll runs out.
  _setUpSentinel(): void {
    this._teardownSentinel()

    if (this._sections.length === 0) {
      return
    }

    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText = 'position:relative;width:0;height:0;margin:0;padding:0;border:0;visibility:hidden;'
    this._element.append(sentinel)
    this._sentinel = sentinel

    // Extend the observer root a full viewport upwards so the watch stays armed
    // through the true scroll end even when up to ~a screenful of unrelated
    // content sits below the observable container.
    this._sentinelObserver = new IntersectionObserver((entries) => this._onSentinel(entries), {
      root: this._rootElement,
      rootMargin: '100% 0px 0px 0px',
      threshold: [0],
    })
    this._sentinelObserver.observe(sentinel)
  }

  _onSentinel(entries: IntersectionObserverEntry[]): void {
    const entry = entries[entries.length - 1]
    this._sentinelVisible = Boolean(entry?.isIntersecting)

    if (this._sentinelVisible) {
      this._measure()
      this._armBottomWatch()
    } else {
      this._disarmBottomWatch()
    }

    this._computeActive()
  }

  _armBottomWatch(): void {
    if (this._bottomScrollHandler) {
      return
    }

    this._bottomScrollHandler = () => {
      if (this._bottomScrollFrame !== null) {
        return
      }

      this._bottomScrollFrame = requestAnimationFrame(() => {
        this._bottomScrollFrame = null
        this._computeActive()
      })
    }

    EventHandler.on(this._getScrollTarget(), EVENT_SCROLL, this._bottomScrollHandler)
  }

  _disarmBottomWatch(): void {
    if (this._bottomScrollFrame !== null) {
      cancelAnimationFrame(this._bottomScrollFrame)
      this._bottomScrollFrame = null
    }

    if (this._bottomScrollHandler) {
      EventHandler.off(this._getScrollTarget(), EVENT_SCROLL, this._bottomScrollHandler)
      this._bottomScrollHandler = null
    }
  }

  _teardownSentinel(): void {
    this._disarmBottomWatch()
    this._sentinelObserver?.disconnect()
    this._sentinelObserver = null
    this._sentinel?.remove()
    this._sentinel = null
    this._sentinelVisible = false
  }

  // --- Resize ------------------------------------------------------------------

  _addResizeListener(): void {
    this._removeResizeListener()

    this._resizeHandler = () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout)
      }

      this._resizeTimeout = setTimeout(() => {
        if (!this._element?.isConnected) {
          return
        }

        // A `%` line tracks viewport height on its own, a `px` one doesn't — so
        // the observer only needs rebuilding in the px case. The tail
        // measurements always do.
        if (this._usesPixelMargin()) {
          this._rebuildObserver()
        }

        this._measure()
        this._computeActive()
      }, RESIZE_DEBOUNCE)
    }

    EventHandler.on(window, EVENT_RESIZE, this._resizeHandler)
  }

  _removeResizeListener(): void {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout)
      this._resizeTimeout = null
    }

    if (this._resizeHandler) {
      EventHandler.off(window, EVENT_RESIZE, this._resizeHandler)
      this._resizeHandler = null
    }
  }

  _rebuildObserver(): void {
    if (!this._observer) {
      return
    }

    this._observer.disconnect()
    this._intersecting.clear()
    this._observer = this._getNewObserver()
    for (const section of this._sections) {
      this._observer.observe(section)
    }
  }

  // --- Smooth-scroll settle (hash + focus) ---------------------------------

  _maybeEnableSmoothScroll(): void {
    if (!this._config.smoothScroll) {
      return
    }

    // Unregister any previous listener so refresh() doesn't stack them.
    EventHandler.off(this._config.target as HTMLElement, EVENT_CLICK)

    EventHandler.on(this._config.target as HTMLElement, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event: Event) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(SELECTOR_TARGET_LINKS)
      const section = link && this._sectionByLink.get(link)
      if (!section || !this._element) {
        return
      }

      event.preventDefault()

      const root = this._rootElement || window
      const height = section.offsetTop - this._element.offsetTop
      const currentTop = this._rootElement ? this._rootElement.scrollTop : window.scrollY
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

      // If we're already there (or motion is reduced), there will be no scroll
      // — and thus no `scrollend` — to wait for, so settle immediately. This
      // avoids a stuck pending navigation that never restores hash/focus.
      if (reduceMotion || Math.abs(currentTop - height) <= 2) {
        if ('scrollTo' in root) {
          root.scrollTo({ top: height, behavior: 'auto' })
        } else {
          ;(root as HTMLElement).scrollTop = height
        }

        this._settleNavigation(link.hash, section)
        return
      }

      // Defer the URL-hash and focus updates until the scroll settles, so we
      // don't thrash the address bar mid-animation (and so the native hash
      // navigation we just prevented is restored once we arrive).
      this._pendingNavigation = { hash: link.hash, section }
      this._armSettle()

      if ('scrollTo' in root) {
        root.scrollTo({ top: height, behavior: 'smooth' })
      } else {
        ;(root as HTMLElement).scrollTop = height
      }
    })
  }

  // Arm a one-shot settle for the in-flight smooth scroll. `scrollend` is the
  // primary signal; a transient scroll-idle timer covers engines without it.
  // Both are removed on settle, so a later unrelated scroll can't replay it.
  _armSettle(): void {
    this._disarmSettle()

    const target = this._getScrollTarget()

    this._settleHandler = () => this._onSettle()
    this._scrollIdleHandler = () => {
      if (this._settleTimeout) {
        clearTimeout(this._settleTimeout)
      }

      this._settleTimeout = setTimeout(() => this._onSettle(), SCROLL_IDLE_TIMEOUT)
    }

    EventHandler.on(target, EVENT_SCROLLEND, this._settleHandler)
    EventHandler.on(target, EVENT_SCROLL, this._scrollIdleHandler)
  }

  _disarmSettle(): void {
    if (this._settleTimeout) {
      clearTimeout(this._settleTimeout)
      this._settleTimeout = null
    }

    const target = this._getScrollTarget()
    if (this._settleHandler) {
      EventHandler.off(target, EVENT_SCROLLEND, this._settleHandler)
      this._settleHandler = null
    }

    if (this._scrollIdleHandler) {
      EventHandler.off(target, EVENT_SCROLL, this._scrollIdleHandler)
      this._scrollIdleHandler = null
    }
  }

  _getScrollTarget(): EventTarget {
    return this._rootElement || document
  }

  _onSettle(): void {
    this._disarmSettle()

    if (!this._pendingNavigation) {
      return
    }

    const { hash, section } = this._pendingNavigation
    this._settleNavigation(hash, section)
  }

  _settleNavigation(hash: string, section: HTMLElement): void {
    this._pendingNavigation = null

    // Restore the URL hash (without adding a history entry) now that we've
    // arrived, and move focus to the section for keyboard/AT users.
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', hash)
    }

    if (!section.hasAttribute('tabindex')) {
      section.setAttribute('tabindex', '-1')
    }

    section.focus({ preventScroll: true })
  }

  // --- Targets / observables ----------------------------------------------

  _initializeTargetsAndObservables(): void {
    this._sections = []
    this._linkBySection = new Map()
    this._sectionByLink = new Map()

    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target as HTMLElement)
    const seen = new Set<HTMLElement>()

    for (const anchor of targetLinks) {
      const hash = (anchor as HTMLAnchorElement).hash
      if (!hash || isDisabled(anchor)) {
        continue
      }

      // Resolve by id (decoded) rather than building a CSS selector, so any
      // literal id works — dots, slashes, colons, and percent-encoded chars —
      // without escaping.
      const id = decodeFragment(hash.slice(1))
      if (!id) {
        continue
      }

      const section = document.getElementById(id)
      // ensure the section exists, is scoped to this element, and is visible
      if (!section || !this._element.contains(section) || !isVisible(section)) {
        continue
      }

      this._sectionByLink.set(anchor, section)
      this._linkBySection.set(section, anchor) // last link wins for a section

      if (!seen.has(section)) {
        seen.add(section)
        this._sections.push(section)
      }
    }

    // Keep sections in top-to-bottom order so "deepest" selection is
    // well-defined. Read once here (refresh/resize), never on the hot path.
    this._sections.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
  }

  _process(target: HTMLElement): void {
    if (this._activeTarget === target) {
      return
    }

    this._clearActiveClass(this._config.target as HTMLElement)
    this._activeTarget = target
    target.classList.add(CLASS_NAME_ACTIVE)
    this._activateParents(target)

    EventHandler.trigger(this._element, EVENT_ACTIVATE, { relatedTarget: target })
  }

  _activateParents(target: HTMLElement): void {
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)!)!.classList.add(CLASS_NAME_ACTIVE)
      return
    }

    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE)
      }
    }
  }

  _clearActiveClass(parent: HTMLElement): void {
    parent.classList.remove(CLASS_NAME_ACTIVE)

    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent)
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE)
    }
  }
}

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy)
  }
})

export default ScrollSpy
