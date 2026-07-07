/**
 * --------------------------------------------------------------------------
 * Bootstrap util/swipe.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import Config from './config'
import { execute } from './index'
import type { ComponentConfig, ComponentConfigType } from '../types'

const NAME = 'swipe'
const EVENT_KEY = '.bs.swipe'
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`
const EVENT_TOUCHEND = `touchend${EVENT_KEY}`
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`
const EVENT_POINTERUP = `pointerup${EVENT_KEY}`
const POINTER_TYPE_TOUCH = 'touch'
const POINTER_TYPE_PEN = 'pen'
const CLASS_NAME_POINTER_EVENT = 'pointer-event'
const SWIPE_THRESHOLD = 40

interface SwipeConfig {
  endCallback: (() => void) | null
  leftCallback: (() => void) | null
  rightCallback: (() => void) | null
}

const Default: SwipeConfig = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}

const DefaultType: ComponentConfigType = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
}

class Swipe extends Config {
  declare _config: SwipeConfig & ComponentConfig
  _element: HTMLElement
  _deltaX: number
  _supportPointerEvents: boolean

  constructor(element: HTMLElement, config?: ComponentConfig) {
    super()
    this._element = element

    if (!element || !Swipe.isSupported()) {
      return
    }

    this._config = this._getConfig(config) as SwipeConfig & ComponentConfig
    this._deltaX = 0
    this._supportPointerEvents = Boolean(window.PointerEvent)
    this._initEvents()
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

  dispose(): void {
    EventHandler.off(this._element, EVENT_KEY)
  }

  _start(event: Event): void {
    if (!this._supportPointerEvents) {
      this._deltaX = (event as TouchEvent).touches[0].clientX
      return
    }

    if (this._eventIsPointerPenTouch(event as PointerEvent)) {
      this._deltaX = (event as PointerEvent).clientX
    }
  }

  _end(event: Event): void {
    if (this._eventIsPointerPenTouch(event as PointerEvent)) {
      this._deltaX = (event as PointerEvent).clientX - this._deltaX
    }

    this._handleSwipe()
    execute(this._config.endCallback)
  }

  _move(event: Event): void {
    this._deltaX = (event as TouchEvent).touches && (event as TouchEvent).touches.length > 1 ?
      0 :
      (event as TouchEvent).touches[0].clientX - this._deltaX
  }

  _handleSwipe(): void {
    const absDeltaX = Math.abs(this._deltaX)

    if (absDeltaX <= SWIPE_THRESHOLD) {
      return
    }

    const direction = absDeltaX / this._deltaX

    this._deltaX = 0

    if (!direction) {
      return
    }

    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback)
  }

  _initEvents(): void {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, (event: Event) => this._start(event))
      EventHandler.on(this._element, EVENT_POINTERUP, (event: Event) => this._end(event))

      this._element.classList.add(CLASS_NAME_POINTER_EVENT)
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, (event: Event) => this._start(event))
      EventHandler.on(this._element, EVENT_TOUCHMOVE, (event: Event) => this._move(event))
      EventHandler.on(this._element, EVENT_TOUCHEND, (event: Event) => this._end(event))
    }
  }

  _eventIsPointerPenTouch(event: PointerEvent): boolean {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)
  }

  static isSupported(): boolean {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
  }
}

export default Swipe
