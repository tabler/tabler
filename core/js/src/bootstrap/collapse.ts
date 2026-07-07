/**
 * --------------------------------------------------------------------------
 * Bootstrap collapse.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import { getElement, reflow } from './util/index'
import type { ComponentConfig, ComponentConfigType, ElementSelector } from './types'

const NAME = 'collapse'
const DATA_KEY = 'bs.collapse'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_COLLAPSE = 'collapse'
const CLASS_NAME_COLLAPSING = 'collapsing'
const CLASS_NAME_COLLAPSED = 'collapsed'
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`
const CLASS_NAME_HORIZONTAL = 'collapse-horizontal'

const WIDTH = 'width'
const HEIGHT = 'height'

const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing'
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"], [data-tblr-toggle="collapse"]'

const Default: ComponentConfig = {
  parent: null,
  toggle: true
}

const DefaultType: ComponentConfigType = {
  parent: '(null|element)',
  toggle: 'boolean'
}

class Collapse extends BaseComponent {
  _isTransitioning: boolean
  _triggerArray: HTMLElement[]

  constructor(element: ElementSelector, config?: ComponentConfig) {
    super(element, config)

    this._isTransitioning = false
    this._triggerArray = []

    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE)

    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem)
      const filterElement = SelectorEngine.find(selector!)
        .filter(foundElement => foundElement === this._element)

      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem)
      }
    }

    this._initializeChildren()

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown())
    }

    if (this._config.toggle) {
      this.toggle()
    }
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
    if (this._isShown()) {
      this.hide()
    } else {
      this.show()
    }
  }

  show(): void {
    if (this._isTransitioning || this._isShown()) {
      return
    }

    let activeChildren: Collapse[] = []

    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES)
        .filter(element => element !== this._element)
        .map(element => Collapse.getOrCreateInstance(element, { toggle: false }) as Collapse)
    }

    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW)
    if (startEvent?.defaultPrevented) {
      return
    }

    for (const activeInstance of activeChildren) {
      activeInstance.hide()
    }

    const dimension = this._getDimension()

    this._element.classList.remove(CLASS_NAME_COLLAPSE)
    this._element.classList.add(CLASS_NAME_COLLAPSING)

    this._element.style[dimension] = '0'

    this._addAriaAndCollapsedClass(this._triggerArray, true)
    this._isTransitioning = true

    const complete = () => {
      this._isTransitioning = false

      this._element.classList.remove(CLASS_NAME_COLLAPSING)
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW)

      this._element.style[dimension] = ''

      EventHandler.trigger(this._element, EVENT_SHOWN)
    }

    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1)
    const scrollSize = `scroll${capitalizedDimension}` as 'scrollWidth' | 'scrollHeight'

    this._queueCallback(complete, this._element, true)
    this._element.style[dimension] = `${this._element[scrollSize]}px`
  }

  hide(): void {
    if (this._isTransitioning || !this._isShown()) {
      return
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE)
    if (startEvent?.defaultPrevented) {
      return
    }

    const dimension = this._getDimension()

    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`

    reflow(this._element)

    this._element.classList.add(CLASS_NAME_COLLAPSING)
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW)

    for (const trigger of this._triggerArray) {
      const element = SelectorEngine.getElementFromSelector(trigger)

      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false)
      }
    }

    this._isTransitioning = true

    const complete = () => {
      this._isTransitioning = false
      this._element.classList.remove(CLASS_NAME_COLLAPSING)
      this._element.classList.add(CLASS_NAME_COLLAPSE)
      EventHandler.trigger(this._element, EVENT_HIDDEN)
    }

    this._element.style[dimension] = ''

    this._queueCallback(complete, this._element, true)
  }

  _isShown(element: HTMLElement = this._element): boolean {
    return element.classList.contains(CLASS_NAME_SHOW)
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    config.toggle = Boolean(config.toggle)
    config.parent = getElement(config.parent)
    return config
  }

  _getDimension(): typeof WIDTH | typeof HEIGHT {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT
  }

  _initializeChildren(): void {
    if (!this._config.parent) {
      return
    }

    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE)

    for (const element of children) {
      const selected = SelectorEngine.getElementFromSelector(element)

      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected))
      }
    }
  }

  _getFirstLevelChildren(selector: string): HTMLElement[] {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent as HTMLElement)
    return SelectorEngine.find(selector, this._config.parent as HTMLElement).filter(element => !children.includes(element))
  }

  _addAriaAndCollapsedClass(triggerArray: HTMLElement[], isOpen: boolean): void {
    if (!triggerArray.length) {
      return
    }

    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen)
      element.setAttribute('aria-expanded', String(isOpen))
    }
  }
}

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  if ((event.target as HTMLElement).tagName === 'A' || ((event as any).delegateTarget && (event as any).delegateTarget.tagName === 'A')) {
    event.preventDefault()
  }

  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    (Collapse.getOrCreateInstance(element, { toggle: false }) as Collapse).toggle()
  }
})

export default Collapse
