/**
 * --------------------------------------------------------------------------
 * Tabler switch-icon.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = Record<string, never>

type ComponentConfigInput = Record<string, unknown>

/**
 * Constants
 */

const NAME = 'switch-icon'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CLICK = `click${EVENT_KEY}`
const EVENT_CHANGE = `change${EVENT_KEY}`

const CLASS_NAME_ACTIVE = 'active'

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

const Default: ComponentConfig = {}

const DefaultType: Record<keyof ComponentConfig, string> = {}

/**
 * Class definition
 *
 * A toggle button that swaps between two icons. The state is the `active`
 * class, mirrored in `aria-pressed`.
 */

class SwitchIcon extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    if (!this._element.hasAttribute('aria-pressed')) {
      this._element.setAttribute('aria-pressed', String(this.isActive))
    }

    // The button usually sits inside a clickable row or card; the click must
    // not reach it.
    EventHandler.on(this._element, EVENT_CLICK, (event: Event) => {
      event.stopPropagation()
      this.toggle()
    })
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  get isActive(): boolean {
    return this._element.classList.contains(CLASS_NAME_ACTIVE)
  }

  // Public
  toggle(force?: boolean): void {
    const active = this._element.classList.toggle(CLASS_NAME_ACTIVE, force)
    this._element.setAttribute('aria-pressed', String(active))

    EventHandler.trigger(this._element, EVENT_CHANGE, { active })
  }
}

/**
 * Data API implementation
 */

// js-docs-start switch-icon-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  SwitchIcon.getOrCreateInstance(element)
}
// js-docs-end switch-icon-init

export default SwitchIcon
