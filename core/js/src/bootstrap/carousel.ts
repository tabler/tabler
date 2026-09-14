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
import { getNextActiveElement, isRTL, isVisible } from './util/index'

type ComponentConfig = {
  interval: number | boolean
  keyboard: boolean
  pause: 'hover' | boolean
  ride: boolean | 'carousel'
  touch: boolean
  wrap: boolean
  defaultInterval?: number | boolean
}

type ComponentConfigInput = Partial<Omit<ComponentConfig, 'defaultInterval'>> & Record<string, unknown>

const NAME = 'carousel'
const DATA_KEY = 'bs.carousel'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_RIGHT_KEY = 'ArrowRight'

const ORDER_NEXT = 'next'
const ORDER_PREV = 'prev'
const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

const EVENT_SLIDE = `slide${EVENT_KEY}`
const EVENT_SLID = `slid${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_CAROUSEL = 'carousel'
const CLASS_NAME_ACTIVE = 'active'
const CLASS_NAME_FADE = 'carousel-fade'

const SELECTOR_ACTIVE = '.active'
const SELECTOR_ITEM = '.carousel-item'
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM
const SELECTOR_INNER = '.carousel-inner'
const SELECTOR_INDICATORS = '.carousel-indicators'
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to], [data-tblr-slide], [data-tblr-slide-to]'
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"], [data-tblr-ride="carousel"]'

const KEY_TO_DIRECTION: Record<string, string> = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT,
}

const Default: ComponentConfig = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true,
}

const DefaultType: Record<Exclude<keyof ComponentConfig, 'defaultInterval'>, string> = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean',
}

class Carousel extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _interval: ReturnType<typeof setInterval> | null
  _activeElement: HTMLElement | null
  _isSliding: boolean
  _indicatorsElement: HTMLElement | null
  _viewport: HTMLElement | null
  _observer: IntersectionObserver | null
  _pendingElement: HTMLElement | null

  constructor(element: HTMLElement | string, config?: ComponentConfigInput) {
    super(element, config)

    this._interval = null
    this._activeElement = this._getActive()
    this._isSliding = false
    this._observer = null
    this._pendingElement = null

    this._viewport = SelectorEngine.findOne(SELECTOR_INNER, this._element)
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element)

    this._addEventListeners()
    this._observeItems()

    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle()
    }
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<Exclude<keyof ComponentConfig, 'defaultInterval'>, string> {
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
    if (this._observer) {
      this._observer.disconnect()
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

    // Scrolling is native; `touch: false` only turns off the drag gesture on the
    // viewport, buttons/keyboard/indicators keep working.
    if (this._viewport) {
      this._viewport.style.touchAction = this._config.touch ? '' : 'none'
    }
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

    this._config.interval = elementInterval || (this._config.defaultInterval ?? this._config.interval)
  }

  _slide(order: string, element: HTMLElement | null = null): void {
    if (this._isSliding) {
      return
    }

    const activeElement = this._getActive()
    const isNext = order === ORDER_NEXT
    const nextElement = element || (getNextActiveElement(this._getItems(), activeElement!, isNext, this._config.wrap as boolean) as HTMLElement)

    if (!activeElement || !nextElement || nextElement === activeElement) {
      return
    }

    const slideEvent = EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget: nextElement,
      direction: this._orderToDirection(order),
      from: this._getItemIndex(activeElement),
      to: this._getItemIndex(nextElement),
    })

    if (slideEvent?.defaultPrevented) {
      return
    }

    const isCycling = Boolean(this._interval)
    this.pause()
    this._isSliding = true

    if (this._element.classList.contains(CLASS_NAME_FADE)) {
      activeElement.classList.remove(CLASS_NAME_ACTIVE)
      nextElement.classList.add(CLASS_NAME_ACTIVE)
      this._queueCallback(() => this._finishSlide(activeElement, nextElement), nextElement, true)
    } else {
      // A jump of more than one item (wrap-around, `to()`) scrolls past the
      // items in between; pin the target so their transient crossings are
      // ignored until it actually arrives — see `_handleIntersection()`.
      this._pendingElement = nextElement
      nextElement.scrollIntoView({ inline: 'start', block: 'nearest' })

      // Safety net: don't wait on the observer forever if it never confirms
      // arrival (element removed, browser quirk).
      setTimeout(() => {
        if (this._pendingElement === nextElement) {
          this._pendingElement = null
          this._setActive(nextElement)
        }
      }, 2000)
    }

    if (isCycling) {
      this.cycle()
    }
  }

  _observeItems(): void {
    // Fade carousels stack every item in one grid cell, so every item always
    // intersects the viewport fully — geometry can't tell them apart.
    if (!this._viewport || this._element.classList.contains(CLASS_NAME_FADE)) {
      return
    }

    this._observer = new IntersectionObserver((entries) => this._handleIntersection(entries), {
      root: this._viewport,
      threshold: [0, 0.5, 1],
    })

    for (const item of this._getItems()) {
      this._observer.observe(item)
    }
  }

  _handleIntersection(entries: IntersectionObserverEntry[]): void {
    if (this._pendingElement) {
      // A programmatic jump (wrap-around, `to()`) scrolls past items in
      // between; ignore their transient crossings until the actual target
      // — the only one that can clear `_pendingElement` — arrives.
      const arrived = entries.find((entry) => entry.target === this._pendingElement && entry.intersectionRatio >= 0.5)
      if (arrived) {
        this._pendingElement = null
        this._setActive(arrived.target as HTMLElement)
      }

      return
    }

    // A manual swipe/scroll has no pinned target: judge only this batch, not a
    // running history, so a stale ratio never outranks what arrives next.
    let bestEntry: IntersectionObserverEntry | null = null

    for (const entry of entries) {
      if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
        bestEntry = entry
      }
    }

    if (bestEntry && bestEntry.intersectionRatio >= 0.5) {
      this._setActive(bestEntry.target as HTMLElement)
    }
  }

  _setActive(nextElement: HTMLElement): void {
    const activeElement = this._activeElement ?? this._getActive()

    if (!activeElement || nextElement === activeElement) {
      return
    }

    activeElement.classList.remove(CLASS_NAME_ACTIVE)
    nextElement.classList.add(CLASS_NAME_ACTIVE)

    this._finishSlide(activeElement, nextElement)
  }

  _finishSlide(fromElement: HTMLElement, toElement: HTMLElement): void {
    const fromIndex = this._getItemIndex(fromElement)
    const toIndex = this._getItemIndex(toElement)
    const order = toIndex > fromIndex ? ORDER_NEXT : ORDER_PREV

    this._setActiveIndicatorElement(toIndex)
    this._activeElement = toElement
    this._isSliding = false

    EventHandler.trigger(this._element, EVENT_SLID, {
      relatedTarget: toElement,
      direction: this._orderToDirection(order),
      from: fromIndex,
      to: toIndex,
    })
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
