/**
 * --------------------------------------------------------------------------
 * Bootstrap tab.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import { getNextActiveElement, isDisabled } from './util/index'

const NAME = 'tab'
const DATA_KEY = 'bs.tab'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`

const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_RIGHT_KEY = 'ArrowRight'
const ARROW_UP_KEY = 'ArrowUp'
const ARROW_DOWN_KEY = 'ArrowDown'
const HOME_KEY = 'Home'
const END_KEY = 'End'

const CLASS_NAME_ACTIVE = 'active'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'
const CLASS_DROPDOWN = 'dropdown'

const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle'
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu'
const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`

const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]'
const SELECTOR_OUTER = '.nav-item, .list-group-item'
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"], [data-tblr-toggle="tab"], [data-tblr-toggle="pill"], [data-tblr-toggle="list"]'
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`

const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"], .${CLASS_NAME_ACTIVE}[data-tblr-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-tblr-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-tblr-toggle="list"]`

class Tab extends BaseComponent {
  _parent: HTMLElement | null

  constructor(element: HTMLElement | string) {
    super(element)
    this._parent = this._element.closest(SELECTOR_TAB_PANEL)

    if (!this._parent) {
      return
    }

    this._setInitialAttributes(this._parent, this._getChildren())

    EventHandler.on(this._element, EVENT_KEYDOWN, (event: KeyboardEvent) => this._keydown(event))
  }

  static get NAME(): string {
    return NAME
  }

  show(): void {
    const innerElem = this._element
    if (this._elemIsActive(innerElem)) {
      return
    }

    const active = this._getActiveElem()

    const hideEvent = active ?
      EventHandler.trigger(active, EVENT_HIDE, { relatedTarget: innerElem }) :
      null

    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW, { relatedTarget: active })

    if (showEvent?.defaultPrevented || hideEvent?.defaultPrevented) {
      return
    }

    this._deactivate(active, innerElem)
    this._activate(innerElem, active)
  }

  _activate(element: HTMLElement | null, relatedElem?: HTMLElement | null): void {
    if (!element) {
      return
    }

    element.classList.add(CLASS_NAME_ACTIVE)

    this._activate(SelectorEngine.getElementFromSelector(element))

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.add(CLASS_NAME_SHOW)
        return
      }

      element.removeAttribute('tabindex')
      element.setAttribute('aria-selected', 'true')
      this._toggleDropDown(element, true)
      EventHandler.trigger(element, EVENT_SHOWN, {
        relatedTarget: relatedElem
      })
    }

    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE))
  }

  _deactivate(element: HTMLElement | null, relatedElem?: HTMLElement | null): void {
    if (!element) {
      return
    }

    element.classList.remove(CLASS_NAME_ACTIVE)
    element.blur()

    this._deactivate(SelectorEngine.getElementFromSelector(element))

    const complete = () => {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.remove(CLASS_NAME_SHOW)
        return
      }

      element.setAttribute('aria-selected', 'false')
      element.setAttribute('tabindex', '-1')
      this._toggleDropDown(element, false)
      EventHandler.trigger(element, EVENT_HIDDEN, { relatedTarget: relatedElem })
    }

    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE))
  }

  _keydown(event: KeyboardEvent): void {
    if (!([ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key))) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    const children = this._getChildren().filter(element => !isDisabled(element))
    let nextActiveElement: HTMLElement | undefined

    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1]
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key)
      nextActiveElement = getNextActiveElement(children, event.target as HTMLElement, isNext, true) as HTMLElement
    }

    if (nextActiveElement) {
      nextActiveElement.focus({ preventScroll: true })
      ;(Tab.getOrCreateInstance(nextActiveElement) as Tab).show()
    }
  }

  _getChildren(): HTMLElement[] {
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent!)
  }

  _getActiveElem(): HTMLElement | null {
    return this._getChildren().find(child => this._elemIsActive(child)) || null
  }

  _setInitialAttributes(parent: HTMLElement, children: HTMLElement[]): void {
    this._setAttributeIfNotExists(parent, 'role', 'tablist')

    for (const child of children) {
      this._setInitialAttributesOnChild(child)
    }
  }

  _setInitialAttributesOnChild(child: HTMLElement): void {
    child = this._getInnerElement(child)!
    const isActive = this._elemIsActive(child)
    const outerElem = this._getOuterElement(child)
    child.setAttribute('aria-selected', String(isActive))

    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, 'role', 'presentation')
    }

    if (!isActive) {
      child.setAttribute('tabindex', '-1')
    }

    this._setAttributeIfNotExists(child, 'role', 'tab')

    this._setInitialAttributesOnTargetPanel(child)
  }

  _setInitialAttributesOnTargetPanel(child: HTMLElement): void {
    const target = SelectorEngine.getElementFromSelector(child)

    if (!target) {
      return
    }

    this._setAttributeIfNotExists(target, 'role', 'tabpanel')

    if (child.id) {
      this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`)
    }
  }

  _toggleDropDown(element: HTMLElement, open: boolean): void {
    const outerElem = this._getOuterElement(element)
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return
    }

    const toggle = (selector: string, className: string) => {
      const el = SelectorEngine.findOne(selector, outerElem)
      if (el) {
        el.classList.toggle(className, open)
      }
    }

    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE)
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW)
    outerElem.setAttribute('aria-expanded', String(open))
  }

  _setAttributeIfNotExists(element: HTMLElement, attribute: string, value: string): void {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value)
    }
  }

  _elemIsActive(elem: HTMLElement): boolean {
    return elem.classList.contains(CLASS_NAME_ACTIVE)
  }

  _getInnerElement(elem: HTMLElement): HTMLElement | null {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem)
  }

  _getOuterElement(elem: HTMLElement): HTMLElement {
    return elem.closest(SELECTOR_OUTER) || elem
  }
}

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault()
  }

  if (isDisabled(this)) {
    return
  }

  ;(Tab.getOrCreateInstance(this) as Tab).show()
})

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element)
  }
})

export default Tab
