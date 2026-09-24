/**
 * --------------------------------------------------------------------------
 * Bootstrap button.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler.js'
import { defineJQueryPlugin } from './util/index.js'
import type { JQueryCollectionLike } from './types'

const NAME = 'button'
const DATA_KEY = 'bs.button'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const CLASS_NAME_ACTIVE = 'active'
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"], [data-tblr-toggle="button"]'
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

class Button extends BaseComponent {
  declare _element: HTMLElement

  static get NAME(): string {
    return NAME
  }

  toggle(): void {
    this._element.setAttribute('aria-pressed', String(this._element.classList.toggle(CLASS_NAME_ACTIVE)))
  }

  static jQueryInterface(this: JQueryCollectionLike, config?: unknown): unknown {
    return this.each(function (this: HTMLElement) {
      const data = Button.getOrCreateInstance(this) as Button

      if (config === 'toggle') {
        data.toggle()
      }
    })
  }
}

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, (event: Event) => {
  event.preventDefault()

  const target = (event.target as HTMLElement)?.closest(SELECTOR_DATA_TOGGLE) as HTMLElement | null
  if (!target) {
    return
  }

  const data = Button.getOrCreateInstance(target) as Button
  data.toggle()
})

defineJQueryPlugin(Button)

export default Button
