/**
 * --------------------------------------------------------------------------
 * Bootstrap dropdown.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { flip, offset, shift, type Placement } from '@floating-ui/dom'
import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import Manipulator from './dom/manipulator'
import SelectorEngine from './dom/selector-engine'
import FloatingUi, { type FloatingConfig } from './util/floating-ui'
import { execute, getNextActiveElement, isDisabled, isElement, isRTL, isVisible, noop } from './util/index'
import type { ComponentConfig, ComponentConfigType } from './types'

const NAME = 'dropdown'
const DATA_KEY = 'bs.dropdown'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const ESCAPE_KEY = 'Escape'
const TAB_KEY = 'Tab'
const ARROW_UP_KEY = 'ArrowUp'
const ARROW_DOWN_KEY = 'ArrowDown'
const RIGHT_MOUSE_BUTTON = 2

const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_DROPUP = 'dropup'
const CLASS_NAME_DROPEND = 'dropend'
const CLASS_NAME_DROPSTART = 'dropstart'
const CLASS_NAME_DROPUP_CENTER = 'dropup-center'
const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled), [data-tblr-toggle="dropdown"]:not(.disabled):not(:disabled)'
const SELECTOR_DATA_TOGGLE_SHOWN = `.${CLASS_NAME_SHOW}[data-bs-toggle="dropdown"], .${CLASS_NAME_SHOW}[data-tblr-toggle="dropdown"]`
const SELECTOR_MENU = '.dropdown-menu'
const SELECTOR_NAVBAR = '.navbar'
const SELECTOR_NAVBAR_NAV = '.navbar-nav'
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'

const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start'
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end'
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start'
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end'
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start'
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start'
const PLACEMENT_TOPCENTER = 'top'
const PLACEMENT_BOTTOMCENTER = 'bottom'

const Default: ComponentConfig = {
  autoClose: true,
  boundary: 'clippingParents',
  display: 'dynamic',
  offset: [0, 2],
  popperConfig: null,
  positionConfig: null,
  reference: 'toggle',
}

const DefaultType: ComponentConfigType = {
  autoClose: '(boolean|string)',
  boundary: '(string|element)',
  display: 'string',
  offset: '(array|string|function)',
  popperConfig: '(null|object|function)',
  positionConfig: '(null|object|function)',
  reference: '(string|element|object)',
}

class Dropdown extends BaseComponent {
  _floatingUi: FloatingUi
  _parent: HTMLElement
  _menu: HTMLElement
  _inNavbar: boolean

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    this._floatingUi = new FloatingUi()
    this._parent = this._element.parentNode as HTMLElement
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent)!
    this._inNavbar = this._detectNavbar()
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

  toggle(): void {
    this._isShown() ? this.hide() : this.show()
  }

  show(): void {
    if (isDisabled(this._element) || this._isShown()) {
      return
    }

    const relatedTarget = {
      relatedTarget: this._element,
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, relatedTarget)

    if (showEvent.defaultPrevented) {
      return
    }

    this._createFloatingUi()

    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element of [].concat(...(document.body.children as any))) {
        EventHandler.on(element, 'mouseover', noop)
      }
    }

    this._element.focus()
    this._element.setAttribute('aria-expanded', 'true')

    this._menu.classList.add(CLASS_NAME_SHOW)
    this._element.classList.add(CLASS_NAME_SHOW)
    EventHandler.trigger(this._element, EVENT_SHOWN, relatedTarget)
  }

  hide(): void {
    if (isDisabled(this._element) || !this._isShown()) {
      return
    }

    const relatedTarget = {
      relatedTarget: this._element,
    }

    this._completeHide(relatedTarget)
  }

  dispose(): void {
    this._floatingUi.stop()
    super.dispose()
  }

  update(): void {
    this._inNavbar = this._detectNavbar()
    this._floatingUi.update()
  }

  _completeHide(relatedTarget: Record<string, any>): void {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE, relatedTarget)
    if (hideEvent.defaultPrevented) {
      return
    }

    if ('ontouchstart' in document.documentElement) {
      for (const element of [].concat(...(document.body.children as any))) {
        EventHandler.off(element, 'mouseover', noop)
      }
    }

    this._floatingUi.stop()

    this._menu.classList.remove(CLASS_NAME_SHOW)
    this._element.classList.remove(CLASS_NAME_SHOW)
    this._element.setAttribute('aria-expanded', 'false')
    Manipulator.removeDataAttribute(this._menu, 'popper')
    EventHandler.trigger(this._element, EVENT_HIDDEN, relatedTarget)
  }

  _getConfig(config: Partial<ComponentConfig>): ComponentConfig {
    config = super._getConfig(config)

    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof (config.reference as any).getBoundingClientRect !== 'function') {
      throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
    }

    return config
  }

  _createFloatingUi(): void {
    // A static menu is placed by the stylesheet, so nothing has to be computed.
    if (this._inNavbar || this._config.display === 'static') {
      Manipulator.setDataAttribute(this._menu, 'popper', 'static')
      return
    }

    const referenceElement = FloatingUi.getReferenceElement(this._config.reference, this._element, this._parent)
    this._floatingUi.calculate(referenceElement, this._menu, this._getFloatingConfig())
  }

  _isShown(): boolean {
    return this._menu.classList.contains(CLASS_NAME_SHOW)
  }

  _getPlacement(): string {
    const parentDropdown = this._parent

    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER
    }

    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end'

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP
    }

    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM
  }

  _detectNavbar(): boolean {
    return this._element.closest(SELECTOR_NAVBAR) !== null
  }

  _getFloatingConfig(): FloatingConfig {
    const boundary = FloatingUi.getBoundary(this._config.boundary)

    const defaultBsConfig: FloatingConfig = {
      placement: this._getPlacement() as Placement,
      middleware: [offset(FloatingUi.parseOffset(this._config.offset, this._element)), flip({ boundary }), shift({ boundary })],
    }

    const positionConfig = execute(this._config.positionConfig ?? this._config.popperConfig, [undefined, defaultBsConfig])
    return {
      ...defaultBsConfig,
      ...(typeof positionConfig === 'object' && positionConfig !== null ? positionConfig : {}),
    }
  }

  _selectMenuItem({ key, target }: { key: string; target: HTMLElement }): void {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element))

    if (!items.length) {
      return
    }

    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus()
  }

  static clearMenus(event: Event & { button?: number; key?: string; composedPath?: () => EventTarget[] }): void {
    if ((event as MouseEvent).button === RIGHT_MOUSE_BUTTON || (event.type === 'keyup' && (event as KeyboardEvent).key !== TAB_KEY)) {
      return
    }

    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN)

    for (const toggle of openToggles) {
      const context = Dropdown.getInstance(toggle) as Dropdown | null
      if (!context || context._config.autoClose === false) {
        continue
      }

      const composedPath = event.composedPath()
      const isMenuTarget = composedPath.includes(context._menu)
      if (composedPath.includes(context._element) || (context._config.autoClose === 'inside' && !isMenuTarget) || (context._config.autoClose === 'outside' && isMenuTarget)) {
        continue
      }

      if (context._menu.contains(event.target as Node) && ((event.type === 'keyup' && (event as KeyboardEvent).key === TAB_KEY) || /input|select|option|textarea|form/i.test((event.target as HTMLElement).tagName))) {
        continue
      }

      const relatedTarget: Record<string, any> = { relatedTarget: context._element }

      if (event.type === 'click') {
        relatedTarget.clickEvent = event
      }

      context._completeHide(relatedTarget)
    }
  }

  static dataApiKeydownHandler(this: HTMLElement, event: KeyboardEvent): void {
    const isInput = /input|textarea/i.test((event.target as HTMLElement).tagName)
    const isEscapeEvent = event.key === ESCAPE_KEY
    const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)

    if (!isUpOrDownEvent && !isEscapeEvent) {
      return
    }

    if (isInput && !isEscapeEvent) {
      return
    }

    event.preventDefault()

    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, (event as any).delegateTarget.parentNode)

    const instance = Dropdown.getOrCreateInstance(getToggleButton!) as Dropdown

    if (isUpOrDownEvent) {
      event.stopPropagation()
      instance.show()
      instance._selectMenuItem(event as any)
      return
    }

    if (instance._isShown()) {
      event.stopPropagation()
      instance.hide()
      getToggleButton!.focus()
    }
  }
}

EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler)
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler)
EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus)
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus)
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  event.preventDefault()
  ;(Dropdown.getOrCreateInstance(this) as Dropdown).toggle()
})

export default Dropdown
