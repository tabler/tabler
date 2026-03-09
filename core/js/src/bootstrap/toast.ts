/**
 * --------------------------------------------------------------------------
 * Bootstrap toast.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler.js'
import { enableDismissTrigger } from './util/component-functions'
import { reflow } from './util/index.js'
import type { ComponentConfig, ComponentConfigType, ElementSelector } from './types'

const NAME = 'toast'
const DATA_KEY = 'bs.toast'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`

const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_HIDE = 'hide'
const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_SHOWING = 'showing'

const DefaultType: ComponentConfigType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
}

const Default: ComponentConfig = {
  animation: true,
  autohide: true,
  delay: 5000
}

class Toast extends BaseComponent {
  _timeout: ReturnType<typeof setTimeout> | null
  _hasMouseInteraction: boolean
  _hasKeyboardInteraction: boolean

  constructor(element: ElementSelector, config?: ComponentConfig) {
    super(element, config)

    this._timeout = null
    this._hasMouseInteraction = false
    this._hasKeyboardInteraction = false
    this._setListeners()
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

  show(): void {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW)

    if (showEvent?.defaultPrevented) {
      return
    }

    this._clearTimeout()

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE)
    }

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING)
      EventHandler.trigger(this._element, EVENT_SHOWN)

      this._maybeScheduleHide()
    }

    this._element.classList.remove(CLASS_NAME_HIDE)
    reflow(this._element)
    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING)

    this._queueCallback(complete, this._element, this._config.animation)
  }

  hide(): void {
    if (!this.isShown()) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)

    if (hideEvent?.defaultPrevented) {
      return
    }

    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE)
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW)
      EventHandler.trigger(this._element, EVENT_HIDDEN)
    }

    this._element.classList.add(CLASS_NAME_SHOWING)
    this._queueCallback(complete, this._element, this._config.animation)
  }

  dispose(): void {
    this._clearTimeout()

    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW)
    }

    super.dispose()
  }

  isShown(): boolean {
    return this._element.classList.contains(CLASS_NAME_SHOW)
  }

  _maybeScheduleHide(): void {
    if (!this._config.autohide) {
      return
    }

    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return
    }

    this._timeout = setTimeout(() => {
      this.hide()
    }, this._config.delay)
  }

  _onInteraction(event: Event, isInteracting: boolean): void {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout': {
        this._hasMouseInteraction = isInteracting
        break
      }

      case 'focusin':
      case 'focusout': {
        this._hasKeyboardInteraction = isInteracting
        break
      }

      default: {
        break
      }
    }

    if (isInteracting) {
      this._clearTimeout()
      return
    }

    const nextElement = (event as FocusEvent).relatedTarget as Node | null
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return
    }

    this._maybeScheduleHide()
  }

  _setListeners(): void {
    EventHandler.on(this._element, EVENT_MOUSEOVER, (event: Event) => this._onInteraction(event, true))
    EventHandler.on(this._element, EVENT_MOUSEOUT, (event: Event) => this._onInteraction(event, false))
    EventHandler.on(this._element, EVENT_FOCUSIN, (event: Event) => this._onInteraction(event, true))
    EventHandler.on(this._element, EVENT_FOCUSOUT, (event: Event) => this._onInteraction(event, false))
  }

  _clearTimeout(): void {
    clearTimeout(this._timeout!)
    this._timeout = null
  }
}

enableDismissTrigger(Toast)

export default Toast
