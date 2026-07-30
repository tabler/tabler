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

const Default: ComponentConfig = {
  offset: null,
  rootMargin: '0px 0px -25%',
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
}

const DefaultType: ComponentConfigType = {
  offset: '(number|null)',
  rootMargin: 'string',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array'
}

class ScrollSpy extends BaseComponent {
  _targetLinks: Map<string, HTMLElement>
  _observableSections: Map<string, HTMLElement>
  _rootElement: HTMLElement | null
  _activeTarget: HTMLElement | null
  _observer: IntersectionObserver | null
  _previousScrollData: {
    visibleEntryTop: number
    parentScrollTop: number
  }

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    this._targetLinks = new Map()
    this._observableSections = new Map()
    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element
    this._activeTarget = null
    this._observer = null
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }
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

    if (this._observer) {
      this._observer.disconnect()
    } else {
      this._observer = this._getNewObserver()
    }

    for (const section of this._observableSections.values()) {
      this._observer.observe(section)
    }
  }

  dispose(): void {
    this._observer!.disconnect()
    super.dispose()
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    config.target = getElement(config.target) || document.body

    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin

    if (typeof config.threshold === 'string') {
      config.threshold = config.threshold.split(',').map((value: string) => Number.parseFloat(value))
    }

    return config
  }

  _maybeEnableSmoothScroll(): void {
    if (!this._config.smoothScroll) {
      return
    }

    EventHandler.off(this._config.target as HTMLElement, EVENT_CLICK)

    EventHandler.on(this._config.target as HTMLElement, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event: Event) => {
      const observableSection = this._observableSections.get((event.target as HTMLAnchorElement).hash)
      if (observableSection) {
        event.preventDefault()
        const root = this._rootElement || window
        const height = observableSection.offsetTop - this._element.offsetTop
        if ('scrollTo' in root) {
          root.scrollTo({ top: height, behavior: 'smooth' })
          return
        }

        (root as HTMLElement).scrollTop = height
      }
    })
  }

  _getNewObserver(): IntersectionObserver {
    const options: IntersectionObserverInit = {
      root: this._rootElement,
      threshold: this._config.threshold as number[],
      rootMargin: this._config.rootMargin as string
    }

    return new IntersectionObserver(entries => this._observerCallback(entries), options)
  }

  _observerCallback(entries: IntersectionObserverEntry[]): void {
    const targetElement = (entry: IntersectionObserverEntry) => this._targetLinks.get(`#${entry.target.id}`)
    const activate = (entry: IntersectionObserverEntry) => {
      this._previousScrollData.visibleEntryTop = (entry.target as HTMLElement).offsetTop
      this._process(targetElement(entry)!)
    }

    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop
    this._previousScrollData.parentScrollTop = parentScrollTop

    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null
        this._clearActiveClass(targetElement(entry)!)

        continue
      }

      const entryIsLowerThanPrevious = (entry.target as HTMLElement).offsetTop >= this._previousScrollData.visibleEntryTop
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry)
        if (!parentScrollTop) {
          return
        }

        continue
      }

      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry)
      }
    }
  }

  _initializeTargetsAndObservables(): void {
    this._targetLinks = new Map()
    this._observableSections = new Map()

    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target as HTMLElement)

    for (const anchor of targetLinks) {
      if (!(anchor as HTMLAnchorElement).hash || isDisabled(anchor)) {
        continue
      }

      const observableSection = SelectorEngine.findOne(decodeURI((anchor as HTMLAnchorElement).hash), this._element)

      if (isVisible(observableSection!)) {
        this._targetLinks.set(decodeURI((anchor as HTMLAnchorElement).hash), anchor)
        this._observableSections.set((anchor as HTMLAnchorElement).hash, observableSection!)
      }
    }
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
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)!)!
        .classList.add(CLASS_NAME_ACTIVE)
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
