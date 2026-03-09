/**
 * --------------------------------------------------------------------------
 * Bootstrap carousel.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import Manipulator from './dom/manipulator'
import SelectorEngine from './dom/selector-engine'
import {
  getNextActiveElement,
  isRTL,
  isVisible,
  reflow,
  triggerTransitionEnd
} from './util/index'
import Swipe from './util/swipe'
import type { ComponentConfig, ComponentConfigType } from './types'

const NAME = 'carousel'
const DATA_KEY = 'bs.carousel'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_RIGHT_KEY = 'ArrowRight'
const TOUCHEVENT_COMPAT_WAIT = 500

const ORDER_NEXT = 'next'
const ORDER_PREV = 'prev'
const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

const EVENT_SLIDE = `slide${EVENT_KEY}`
const EVENT_SLID = `slid${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`
const EVENT_DRAG_START = `dragstart${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_CAROUSEL = 'carousel'
const CLASS_NAME_ACTIVE = 'active'
const CLASS_NAME_SLIDE = 'slide'
const CLASS_NAME_END = 'carousel-item-end'
const CLASS_NAME_START = 'carousel-item-start'
const CLASS_NAME_NEXT = 'carousel-item-next'
const CLASS_NAME_PREV = 'carousel-item-prev'

const SELECTOR_ACTIVE = '.active'
const SELECTOR_ITEM = '.carousel-item'
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM
const SELECTOR_ITEM_IMG = '.carousel-item img'
const SELECTOR_INDICATORS = '.carousel-indicators'
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to], [data-tblr-slide], [data-tblr-slide-to]'
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"], [data-tblr-ride="carousel"]'

const KEY_TO_DIRECTION: Record<string, string> = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
}

const Default: ComponentConfig = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
}

const DefaultType: ComponentConfigType = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
}

class Carousel extends BaseComponent {
  _interval: ReturnType<typeof setInterval> | null
  _activeElement: HTMLElement | null
  _isSliding: boolean
  touchTimeout: ReturnType<typeof setTimeout> | null
  _swipeHelper: Swipe | null
  _indicatorsElement: HTMLElement | null

  constructor(element: HTMLElement | string, config?: Partial<ComponentConfig>) {
    super(element, config)

    this._interval = null
    this._activeElement = null
    this._isSliding = false
    this.touchTimeout = null
    this._swipeHelper = null

    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element)
    this._addEventListeners()

    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle()
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

  next(): void {
    this._slide(ORDER_NEXT)
  }

  nextWhenVisible(): void {
    if (!document.hidden && isVisible(this._element)) {
      this.next()
    }
  }

  prev(): void {
    this._slide(ORDER_PREV)
  }

  pause(): void {
    if (this._isSliding) {
      triggerTransitionEnd(this._element)
    }

    this._clearInterval()
  }

  cycle(): void {
    this._clearInterval()
    this._updateInterval()

    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval as number)
  }

  _maybeEnableCycle(): void {
    if (!this._config.ride) {
      return
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle())
      return
    }

    this.cycle()
  }

  to(index: number): void {
    const items = this._getItems()
    if (index > items.length - 1 || index < 0) {
      return
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index))
      return
    }

    const activeIndex = this._getItemIndex(this._getActive()!)
    if (activeIndex === index) {
      return
    }

    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV

    this._slide(order, items[index])
  }

  dispose(): void {
    if (this._swipeHelper) {
      this._swipeHelper.dispose()
    }

    super.dispose()
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    config.defaultInterval = config.interval
    return config
  }

  _addEventListeners(): void {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, (event: Event) => this._keydown(event as KeyboardEvent))
    }

    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER, () => this.pause())
      EventHandler.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle())
    }

    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners()
    }
  }

  _addTouchEventListeners(): void {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, (event: Event) => event.preventDefault())
    }

    const endCallBack = () => {
      if (this._config.pause !== 'hover') {
        return
      }

      this.pause()
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout)
      }

      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + (this._config.interval as number))
    }

    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    }

    this._swipeHelper = new Swipe(this._element, swipeConfig)
  }

  _keydown(event: KeyboardEvent): void {
    if (/input|textarea/i.test((event.target as HTMLElement).tagName)) {
      return
    }

    const direction = KEY_TO_DIRECTION[event.key]
    if (direction) {
      event.preventDefault()
      this._slide(this._directionToOrder(direction))
    }
  }

  _getItemIndex(element: HTMLElement): number {
    return this._getItems().indexOf(element)
  }

  _setActiveIndicatorElement(index: number): void {
    if (!this._indicatorsElement) {
      return
    }

    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement)

    activeIndicator!.classList.remove(CLASS_NAME_ACTIVE)
    activeIndicator!.removeAttribute('aria-current')

    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"], [data-tblr-slide-to="${index}"]`, this._indicatorsElement)

    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE)
      newActiveIndicator.setAttribute('aria-current', 'true')
    }
  }

  _updateInterval(): void {
    const element = this._activeElement || this._getActive()

    if (!element) {
      return
    }

    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval') || element.getAttribute('data-tblr-interval') || '', 10)

    this._config.interval = elementInterval || this._config.defaultInterval
  }

  _slide(order: string, element: HTMLElement | null = null): void {
    if (this._isSliding) {
      return
    }

    const activeElement = this._getActive()
    const isNext = order === ORDER_NEXT
    const nextElement = element || getNextActiveElement(this._getItems(), activeElement!, isNext, this._config.wrap as boolean) as HTMLElement

    if (nextElement === activeElement) {
      return
    }

    const nextElementIndex = this._getItemIndex(nextElement)

    const triggerEvent = (eventName: string) => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order),
        from: this._getItemIndex(activeElement!),
        to: nextElementIndex
      })
    }

    const slideEvent = triggerEvent(EVENT_SLIDE)

    if (slideEvent.defaultPrevented) {
      return
    }

    if (!activeElement || !nextElement) {
      return
    }

    const isCycling = Boolean(this._interval)
    this.pause()

    this._isSliding = true

    this._setActiveIndicatorElement(nextElementIndex)
    this._activeElement = nextElement

    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV

    nextElement.classList.add(orderClassName)

    reflow(nextElement)

    activeElement.classList.add(directionalClassName)
    nextElement.classList.add(directionalClassName)

    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName)
      nextElement.classList.add(CLASS_NAME_ACTIVE)

      activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName)

      this._isSliding = false

      triggerEvent(EVENT_SLID)
    }

    this._queueCallback(completeCallBack, activeElement, this._isAnimated())

    if (isCycling) {
      this.cycle()
    }
  }

  _isAnimated(): boolean {
    return this._element.classList.contains(CLASS_NAME_SLIDE)
  }

  _getActive(): HTMLElement | null {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element)
  }

  _getItems(): HTMLElement[] {
    return SelectorEngine.find(SELECTOR_ITEM, this._element)
  }

  _clearInterval(): void {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }
  }

  _directionToOrder(direction: string): string {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV
  }

  _orderToDirection(order: string): string {
    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT
  }
}

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (this: HTMLElement, event: Event) {
  const target = SelectorEngine.getElementFromSelector(this)

  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return
  }

  event.preventDefault()

  const carousel = Carousel.getOrCreateInstance(target) as Carousel
  const slideIndex = this.getAttribute('data-bs-slide-to') || this.getAttribute('data-tblr-slide-to')

  if (slideIndex) {
    carousel.to(Number(slideIndex))
    carousel._maybeEnableCycle()
    return
  }

  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    carousel.next()
    carousel._maybeEnableCycle()
    return
  }

  carousel.prev()
  carousel._maybeEnableCycle()
})

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE)

  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel)
  }
})

export default Carousel
