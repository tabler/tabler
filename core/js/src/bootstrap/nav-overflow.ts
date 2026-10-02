/**
 * --------------------------------------------------------------------------
 * Bootstrap nav-overflow.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import Dropdown from './dropdown'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import { defineJQueryPlugin, onDOMContentLoaded } from './util/index'
import { DefaultIconAllowlist, sanitizeHtml } from './util/sanitizer'
import type { ComponentConfig as BaseComponentConfig, ElementSelector, JQueryCollectionLike } from './types'

type MenuPlacement = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'

type ComponentConfig = {
  collapseBelow: number | string
  iconPlacement: 'start' | 'end'
  menuPlacement: MenuPlacement
  menuStrategy: 'absolute' | 'fixed'
  moreText: string | false
  moreIcon: string
  threshold: number
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

type RelocatedMenu = {
  menu: HTMLElement
  parent: ParentNode
  nextSibling: ChildNode | null
}

/**
 * Constants
 */

const NAME = 'navoverflow'
const DATA_KEY = 'bs.navoverflow'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_UPDATE = `update${EVENT_KEY}`
const EVENT_OVERFLOW = `overflow${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`
const EVENT_TAB_SHOWN = 'shown.bs.tab'

const CLASS_NAME_OVERFLOW = 'nav-overflow'
const CLASS_NAME_OVERFLOW_MENU = 'nav-overflow-menu'
const CLASS_NAME_HIDDEN = 'd-none'
const CLASS_NAME_KEEP = 'nav-overflow-keep'
const CLASS_NAME_INITIALIZED = 'nav-overflow-initialized'
const CLASS_NAME_SUBMENU = 'dropend'
const CLASS_NAME_SUBMENU_START = 'dropstart'
const CLASS_NAME_DROPUP = 'dropup'
const CLASS_NAME_MENU_END = 'dropdown-menu-end'
const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_ACTIVE = 'active'

const SELECTOR_NAV = '.nav, .navbar-nav'
const SELECTOR_NAV_ITEM = '.nav-item'
const SELECTOR_NAV_LINK = '.nav-link'
const SELECTOR_OVERFLOW_TOGGLE = '.nav-overflow-toggle'
const SELECTOR_OVERFLOW_MENU = '.nav-overflow-menu'
const SELECTOR_CUSTOM_ICON = '[data-bs-overflow-icon], [data-tblr-overflow-icon]'
const SELECTOR_MENU = '.dropdown-menu'
const SELECTOR_MENU_TOGGLE = '[data-bs-toggle="dropdown"], [data-tblr-toggle="dropdown"]'
const SELECTOR_ANY_TOGGLE = '[data-bs-toggle], [data-tblr-toggle]'
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="nav-overflow"], [data-tblr-toggle="nav-overflow"]'

const DEFAULT_TEXT = 'More'

const Default: ComponentConfig = {
  collapseBelow: 0,
  iconPlacement: 'start',
  menuPlacement: 'bottom-end',
  menuStrategy: 'absolute',
  moreText: DEFAULT_TEXT,
  moreIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>',
  threshold: 0,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  collapseBelow: '(number|string)',
  iconPlacement: 'string',
  menuPlacement: 'string',
  menuStrategy: 'string',
  moreText: '(string|boolean)',
  moreIcon: 'string',
  threshold: 'number',
}

/**
 * Class definition
 */

class NavOverflow extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _nav: HTMLElement
  _items: HTMLElement[]
  _overflowItems: HTMLElement[]
  _lastOverflow: HTMLElement[]
  _overflowMenu: HTMLElement | null
  _overflowToggle: HTMLElement | null
  _ownsToggle: boolean
  _ownsClass: boolean
  _clones: Map<HTMLElement, HTMLElement>
  _resizeObserver: ResizeObserver | null
  _resizeHandler: (() => void) | null
  _collapseBelow: number
  _itemMenus: Map<HTMLElement, HTMLElement>
  _relocatedMenus: Map<HTMLElement, RelocatedMenu>

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    const nav = SelectorEngine.findOne(SELECTOR_NAV, this._element)

    if (!nav) {
      throw new TypeError(`${this._element.outerHTML} has no child ${SELECTOR_NAV} to collapse`)
    }

    this._nav = nav
    this._items = []
    this._overflowItems = []
    this._lastOverflow = []
    this._overflowMenu = null
    this._overflowToggle = null
    this._ownsToggle = false
    this._ownsClass = false
    this._clones = new Map()
    this._resizeObserver = null
    this._resizeHandler = null
    this._collapseBelow = 0
    this._itemMenus = new Map()
    this._relocatedMenus = new Map()

    this._init()
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  // Public
  update(): void {
    this._calculateOverflow()
    EventHandler.trigger(this._element, EVENT_UPDATE)
  }

  dispose(): void {
    this._resizeObserver?.disconnect()

    if (this._resizeHandler) {
      EventHandler.off(window, EVENT_RESIZE, this._resizeHandler)
    }

    EventHandler.off(this._element, EVENT_KEY)
    this._restoreItems()

    if (this._ownsToggle) {
      this._overflowToggle?.closest(SELECTOR_NAV_ITEM)?.remove()
    }

    this._element.classList.remove(CLASS_NAME_INITIALIZED)

    if (this._ownsClass) {
      this._element.classList.remove(CLASS_NAME_OVERFLOW)
    }

    super.dispose()
  }

  // Private
  _init(): void {
    this._ownsClass = !this._element.classList.contains(CLASS_NAME_OVERFLOW)
    this._element.classList.add(CLASS_NAME_OVERFLOW)

    this._items = SelectorEngine.find(SELECTOR_NAV_ITEM, this._nav).filter((item) => item.parentElement === this._nav && !item.querySelector(SELECTOR_OVERFLOW_TOGGLE))

    for (const item of this._items) {
      const link = SelectorEngine.findOne(SELECTOR_NAV_LINK, item)
      if (link?.matches(SELECTOR_MENU_TOGGLE)) {
        this._findItemMenu(item, link)
      }
    }

    // Tabs switch on the original link, so copy the new state to the menu
    EventHandler.on(this._element, `${EVENT_TAB_SHOWN}${EVENT_KEY}`, () => this._syncStates())

    this._collapseBelow = this._resolveCollapseBelow()
    this._createOverflowMenu()
    this._setupResizeObserver()
    this._calculateOverflow()
    this._element.classList.add(CLASS_NAME_INITIALIZED)
  }

  _createOverflowMenu(): void {
    this._overflowToggle = SelectorEngine.findOne(SELECTOR_OVERFLOW_TOGGLE, this._element)

    if (this._overflowToggle) {
      this._overflowMenu = SelectorEngine.findOne(SELECTOR_OVERFLOW_MENU, this._element)
      return
    }

    const { moreText, menuPlacement, iconPlacement } = this._config
    const label = typeof moreText === 'string' ? moreText : ''

    const overflowItem = document.createElement('li')
    overflowItem.className = 'nav-item dropdown nav-overflow-item'

    if (menuPlacement.startsWith('top')) {
      overflowItem.classList.add(CLASS_NAME_DROPUP)
    }

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'nav-link nav-overflow-toggle'
    button.setAttribute('data-bs-toggle', 'dropdown')
    button.setAttribute('aria-expanded', 'false')

    if (label === '') {
      button.setAttribute('aria-label', DEFAULT_TEXT)
    }

    const iconSpan = document.createElement('span')
    iconSpan.className = 'nav-overflow-icon'
    iconSpan.innerHTML = sanitizeHtml(this._resolveIcon(), DefaultIconAllowlist)

    if (label === '') {
      button.append(iconSpan)
    } else {
      const textSpan = document.createElement('span')
      textSpan.className = 'nav-overflow-text'
      textSpan.textContent = label

      if (iconPlacement === 'end') {
        button.append(textSpan, iconSpan)
      } else {
        button.append(iconSpan, textSpan)
      }
    }

    const menu = document.createElement('div')
    menu.className = `dropdown-menu ${CLASS_NAME_OVERFLOW_MENU}`

    if (menuPlacement.endsWith('end')) {
      menu.classList.add(CLASS_NAME_MENU_END)
    }

    overflowItem.append(button, menu)
    this._nav.append(overflowItem)

    this._overflowToggle = button
    this._overflowMenu = menu
    this._ownsToggle = true
  }

  _resolveIcon(): string {
    const customIconElement = SelectorEngine.findOne(SELECTOR_CUSTOM_ICON, this._element)

    if (!customIconElement) {
      return this._config.moreIcon
    }

    const iconClone = customIconElement.cloneNode(true) as HTMLElement
    iconClone.removeAttribute('data-bs-overflow-icon')
    iconClone.removeAttribute('data-tblr-overflow-icon')
    customIconElement.remove()

    return iconClone.outerHTML
  }

  _resolveCollapseBelow(): number {
    const value = this._config.collapseBelow

    if (typeof value === 'number') {
      return value
    }

    if (value === '') {
      return 0
    }

    const numeric = Number(value)
    if (!Number.isNaN(numeric)) {
      return numeric
    }

    const cssValue = getComputedStyle(document.documentElement).getPropertyValue(`--tblr-breakpoint-${value}`)
    return Number.parseFloat(cssValue) || 0
  }

  _setupResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      this._resizeHandler = () => this._calculateOverflow()
      EventHandler.on(window, EVENT_RESIZE, this._resizeHandler)
      return
    }

    // Observe the wrapper, never the nav: collapsing items resizes the nav and would loop
    this._resizeObserver = new ResizeObserver(() => {
      this._calculateOverflow()
    })

    this._resizeObserver.observe(this._element)
  }

  _availableWidth(): number {
    const { paddingInlineStart, paddingInlineEnd } = getComputedStyle(this._element)
    const padding = (Number.parseFloat(paddingInlineStart) || 0) + (Number.parseFloat(paddingInlineEnd) || 0)

    return this._element.clientWidth - padding
  }

  _navGap(): number {
    return Number.parseFloat(getComputedStyle(this._nav).columnGap) || 0
  }

  _calculateOverflow(): void {
    const overflowItem = this._overflowToggle?.closest<HTMLElement>(SELECTOR_NAV_ITEM) ?? null

    // Measure with every item shown, so widths never depend on the last pass
    this._setHidden([], overflowItem, false)
    const itemsToOverflow = this._getItemsToOverflow(overflowItem)

    // Leave the menu alone when nothing moves, so a resize does not close it
    if (itemsToOverflow.length === this._lastOverflow.length && itemsToOverflow.every((item, index) => item === this._lastOverflow[index])) {
      this._setHidden(this._overflowItems, overflowItem)
      return
    }

    this._restoreItems()
    this._lastOverflow = itemsToOverflow
    this._applyOverflow(itemsToOverflow, overflowItem)
  }

  _getItemsToOverflow(overflowItem: HTMLElement | null): HTMLElement[] {
    // A vertical nav, like a collapsed navbar, has room for every item
    if (getComputedStyle(this._nav).flexDirection.startsWith('column')) {
      return []
    }

    const availableWidth = this._availableWidth()
    const candidates = this._items.filter((item) => !item.classList.contains(CLASS_NAME_KEEP))

    if (this._collapseBelow > 0 && availableWidth < this._collapseBelow) {
      return candidates
    }

    const gap = this._navGap()
    const keepWidth = this._items.filter((item) => item.classList.contains(CLASS_NAME_KEEP)).reduce((sum, item) => sum + item.offsetWidth + gap, 0)
    const overflowWidth = overflowItem ? overflowItem.offsetWidth + gap : 0
    const limit = availableWidth - keepWidth - overflowWidth

    let usedWidth = 0
    let itemsToOverflow: HTMLElement[] = []

    for (const item of candidates) {
      usedWidth += item.offsetWidth + gap

      if (usedWidth > limit + 1) {
        itemsToOverflow.push(item)
      }
    }

    // Everything fits once the toggle is gone, so do not reserve room for it
    if (itemsToOverflow.length > 0 && usedWidth <= availableWidth - keepWidth + 1) {
      itemsToOverflow = []
    }

    const { threshold } = this._config
    const visibleCount = this._items.length - itemsToOverflow.length
    if (visibleCount < threshold && this._items.length > threshold) {
      itemsToOverflow = this._items.slice(threshold).filter((item) => !item.classList.contains(CLASS_NAME_KEEP))
    }

    return itemsToOverflow
  }

  _setHidden(items: HTMLElement[], overflowItem: HTMLElement | null, hideToggle = items.length === 0): void {
    for (const item of this._items) {
      const hide = items.includes(item)
      item.classList.toggle(CLASS_NAME_HIDDEN, hide)

      if (hide) {
        item.dataset.bsNavOverflow = 'true'
      } else {
        delete item.dataset.bsNavOverflow
      }
    }

    overflowItem?.classList.toggle(CLASS_NAME_HIDDEN, hideToggle)
  }

  _applyOverflow(items: HTMLElement[], overflowItem: HTMLElement | null): void {
    const hasSubmenu = this._moveToOverflow(items)

    this._setHidden(this._overflowItems, overflowItem)

    if (this._overflowToggle && this._ownsToggle) {
      Dropdown.getOrCreateInstance(this._overflowToggle, {
        autoClose: hasSubmenu ? 'outside' : true,
        popperConfig: { strategy: this._config.menuStrategy },
      })
    }

    if (items.length > 0) {
      EventHandler.trigger(this._element, EVENT_OVERFLOW, {
        overflowCount: items.length,
        visibleCount: this._items.length - items.length,
      })
    }
  }

  _moveToOverflow(items: HTMLElement[]): boolean {
    let hasSubmenu = false

    if (!this._overflowMenu) {
      return hasSubmenu
    }

    this._clearMenu()

    for (const item of items) {
      const link = SelectorEngine.findOne(SELECTOR_NAV_LINK, item)
      if (!link) {
        continue
      }

      const menu = this._findItemMenu(item, link)

      if (menu && link.matches(SELECTOR_MENU_TOGGLE)) {
        this._overflowMenu.append(this._relocateAsSubmenu(item, link, menu))
        hasSubmenu = true
      } else {
        this._overflowMenu.append(this._cloneAsProxy(link))
      }

      this._overflowItems.push(item)
    }

    return hasSubmenu
  }

  // Move the original menu (not a clone) so nested dropdowns, ids and state stay on one element
  _relocateAsSubmenu(item: HTMLElement, link: HTMLElement, menu: HTMLElement): HTMLElement {
    this._resetMenu(link, menu)
    item.classList.remove(CLASS_NAME_SHOW)

    this._relocatedMenus.set(item, {
      menu,
      parent: menu.parentNode!,
      nextSibling: menu.nextSibling,
    })

    // An end-aligned menu sits at the inline end, so its submenus open towards the start
    const submenu = document.createElement('div')
    submenu.className = this._overflowMenu?.classList.contains(CLASS_NAME_MENU_END) ? CLASS_NAME_SUBMENU_START : CLASS_NAME_SUBMENU
    submenu.append(this._cloneAsMenuItem(link, true), menu)

    return submenu
  }

  // A link that drives a plugin, like a tab, acts through the original, which holds the state
  _cloneAsProxy(link: HTMLElement): HTMLElement {
    const clonedLink = this._cloneAsMenuItem(link)

    if (link.matches(SELECTOR_ANY_TOGGLE)) {
      this._removeDataAttributes(clonedLink)

      EventHandler.on(clonedLink, EVENT_CLICK, (event: Event) => {
        event.preventDefault()
        link.click()
        this._syncStates()
      })
    }

    return clonedLink
  }

  _removeDataAttributes(element: HTMLElement): void {
    for (const name of element.getAttributeNames()) {
      if ((name.startsWith('data-bs-') || name.startsWith('data-tblr-')) && !name.endsWith('-theme')) {
        element.removeAttribute(name)
      }
    }
  }

  _isActive(link: HTMLElement): boolean {
    return link.classList.contains(CLASS_NAME_ACTIVE) || Boolean(link.closest(SELECTOR_NAV_ITEM)?.classList.contains(CLASS_NAME_ACTIVE))
  }

  _syncStates(): void {
    for (const [clonedLink, link] of this._clones) {
      clonedLink.classList.toggle(CLASS_NAME_ACTIVE, this._isActive(link))
    }
  }

  _cloneAsMenuItem(link: HTMLElement, submenu = false): HTMLElement {
    const clonedLink = link.cloneNode(true) as HTMLElement
    clonedLink.className = 'dropdown-item'
    clonedLink.removeAttribute('id')
    this._clones.set(clonedLink, link)

    if (this._isActive(link)) {
      clonedLink.classList.add(CLASS_NAME_ACTIVE)
    }

    if (link.classList.contains('disabled') || link.hasAttribute('disabled')) {
      clonedLink.classList.add('disabled')
    }

    if (submenu) {
      this._removeDataAttributes(clonedLink)

      clonedLink.classList.add('dropdown-toggle')
      clonedLink.removeAttribute('href')
      clonedLink.setAttribute('data-bs-toggle', 'dropdown')
      clonedLink.setAttribute('data-bs-auto-close', 'outside')
      clonedLink.setAttribute('aria-haspopup', 'true')
      clonedLink.setAttribute('aria-expanded', 'false')

      if (clonedLink.tagName === 'A') {
        clonedLink.setAttribute('role', 'button')

        if (!clonedLink.hasAttribute('tabindex')) {
          clonedLink.setAttribute('tabindex', '0')
        }
      }
    }

    return clonedLink
  }

  _findItemMenu(item: HTMLElement, link: HTMLElement): HTMLElement | null {
    const sibling = SelectorEngine.next(link, SELECTOR_MENU)[0]

    if (sibling && !sibling.classList.contains(CLASS_NAME_OVERFLOW_MENU)) {
      this._itemMenus.set(item, sibling)
      return sibling
    }

    const nested = SelectorEngine.findOne(SELECTOR_MENU, item)

    if (nested && !nested.classList.contains(CLASS_NAME_OVERFLOW_MENU)) {
      this._itemMenus.set(item, nested)
      return nested
    }

    const cached = this._itemMenus.get(item)
    if (cached?.isConnected) {
      return cached
    }

    this._itemMenus.delete(item)
    return null
  }

  _resetMenu(toggle: HTMLElement, menu: HTMLElement): void {
    Dropdown.getInstance(toggle)?.dispose()
    toggle.classList.remove(CLASS_NAME_SHOW)
    toggle.setAttribute('aria-expanded', 'false')
    toggle.parentElement?.classList.remove(CLASS_NAME_SHOW)
    menu.classList.remove(CLASS_NAME_SHOW)
  }

  _restoreRelocatedMenus(): void {
    for (const { menu, parent, nextSibling } of this._relocatedMenus.values()) {
      const toggle = menu.previousElementSibling as HTMLElement | null

      if (toggle?.matches(SELECTOR_MENU_TOGGLE)) {
        this._resetMenu(toggle, menu)
      }

      if (nextSibling) {
        nextSibling.before(menu)
      } else {
        parent.append(menu)
      }
    }

    this._relocatedMenus.clear()
  }

  _restoreItems(): void {
    if (this._overflowToggle && this._overflowMenu) {
      this._resetMenu(this._overflowToggle, this._overflowMenu)
    }

    this._restoreRelocatedMenus()
    this._setHidden([], this._overflowToggle?.closest<HTMLElement>(SELECTOR_NAV_ITEM) ?? null, false)

    this._clearMenu()
  }

  _clearMenu(): void {
    for (const clonedLink of this._clones.keys()) {
      EventHandler.off(clonedLink, EVENT_KEY)
    }

    this._clones.clear()
    this._overflowMenu?.replaceChildren()
    this._overflowItems = []
  }

  // Static
  static jQueryInterface(this: JQueryCollectionLike, config?: unknown): unknown {
    return this.each(function (this: HTMLElement) {
      const data = NavOverflow.getOrCreateInstance(this, config as BaseComponentConfig) as unknown as Record<string, (arg?: unknown) => unknown>

      if (typeof config !== 'string') {
        return
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config]()
    })
  }
}

/**
 * Data API implementation
 */

// js-docs-start nav-overflow-init
onDOMContentLoaded(() => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
    NavOverflow.getOrCreateInstance(element)
  }
})
// js-docs-end nav-overflow-init

/**
 * jQuery
 */

defineJQueryPlugin(NavOverflow)

export default NavOverflow
