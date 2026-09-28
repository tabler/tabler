/**
 * --------------------------------------------------------------------------
 * Bootstrap alert.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler.js'
import { enableDismissTrigger } from './util/component-functions'
import { defineJQueryPlugin } from './util/index.js'
import type { JQueryCollectionLike } from './types'

const NAME = 'alert'
const DATA_KEY = 'bs.alert'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CLOSE = `close${EVENT_KEY}`
const EVENT_CLOSED = `closed${EVENT_KEY}`
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'

class Alert extends BaseComponent {
  static get NAME(): string {
    return NAME
  }

  close(): void {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE)

    if (closeEvent?.defaultPrevented) {
      return
    }

    this._element.classList.remove(CLASS_NAME_SHOW)

    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE)
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated)
  }

  _destroyElement(): void {
    this._element.remove()
    EventHandler.trigger(this._element, EVENT_CLOSED)
    this.dispose()
  }

  static jQueryInterface(this: JQueryCollectionLike, config?: unknown): unknown {
    return this.each(function (this: HTMLElement) {
      const data = Alert.getOrCreateInstance(this) as unknown as Record<string, (arg?: unknown) => unknown>

      if (typeof config !== 'string') {
        return
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config](this)
    })
  }
}

enableDismissTrigger(Alert, 'close')

defineJQueryPlugin(Alert)

export default Alert
