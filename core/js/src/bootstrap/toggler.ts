/**
 * --------------------------------------------------------------------------
 * Bootstrap toggler.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler.js'
import { eventActionOnPlugin } from './util/component-functions'
import { defineJQueryPlugin } from './util/index.js'
import type { JQueryCollectionLike } from './types'

type TogglerConfig = {
  attribute: string
  value: string | number | boolean | null
}

type TogglerConfigInput = Partial<TogglerConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'toggler'
const DATA_KEY = 'bs.toggler'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_TOGGLE = `toggle${EVENT_KEY}`
const EVENT_TOGGLED = `toggled${EVENT_KEY}`
const EVENT_CLICK = 'click'

const SELECTOR_DATA_TOGGLE = ':is([data-bs-toggle="toggler"], [data-tblr-toggle="toggler"])'

const DefaultType: Record<keyof TogglerConfig, string> = {
  attribute: 'string',
  value: '(string|number|boolean|null)',
}

const Default: TogglerConfig = {
  attribute: 'class',
  value: null,
}

/**
 * Class definition
 */

class Toggler extends BaseComponent {
  declare _element: HTMLElement
  declare _config: TogglerConfig

  constructor(element?: Element | string | null, config?: TogglerConfigInput | null) {
    super(element as string | HTMLElement, (config ?? undefined) as Record<string, unknown>)
  }

  // Getters
  static get Default(): TogglerConfig {
    return Default
  }

  static get DefaultType(): Record<keyof TogglerConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  // Public
  toggle(): void {
    const toggleEvent = EventHandler.trigger(this._element, EVENT_TOGGLE)

    if (toggleEvent?.defaultPrevented) {
      return
    }

    this._execute()

    EventHandler.trigger(this._element, EVENT_TOGGLED)
  }

  // Private
  _execute(): void {
    const { attribute, value } = this._config

    if (attribute === 'id') {
      return // You have to be kidding
    }

    // Nothing to toggle without a value (e.g. missing `data-bs-value`)
    if (value === null || value === undefined) {
      return
    }

    if (attribute === 'class') {
      this._element.classList.toggle(String(value))
      return
    }

    // Compare as strings since getAttribute() always returns a string
    if (this._element.getAttribute(attribute) === String(value)) {
      this._element.removeAttribute(attribute)
      return
    }

    this._element.setAttribute(attribute, String(value))
  }

  // Static
  static jQueryInterface(this: JQueryCollectionLike, config?: unknown): unknown {
    return this.each(function (this: HTMLElement) {
      const data = Toggler.getOrCreateInstance(this) as Toggler

      if (config === 'toggle') {
        data.toggle()
      }
    })
  }
}

/**
 * Data API implementation
 */

eventActionOnPlugin(Toggler, EVENT_CLICK, SELECTOR_DATA_TOGGLE, 'toggle')

/**
 * jQuery
 */

defineJQueryPlugin(Toggler)

export default Toggler
export type { TogglerConfig }
