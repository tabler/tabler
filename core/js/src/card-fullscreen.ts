/**
 * --------------------------------------------------------------------------
 * Tabler card-fullscreen.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { registerPlugin } from './bootstrap/util/component-functions'
import { getElement, isDisabled, resolved } from './bootstrap/util/index'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  target: string | HTMLElement | null
  labelExpand: string
  labelCollapse: string
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'card-fullscreen'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const ESCAPE_KEY = 'Escape'

const EVENT_CLICK = `click${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`

const CLASS_NAME_FULLSCREEN = 'card-fullscreen'
const CLASS_NAME_OPEN = 'card-fullscreen-open'

const SELECTOR_CARD = '.card'
const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`
const SELECTOR_OPEN_OVERLAY = '.modal.show, .offcanvas.show, .offcanvas.showing'
const SELECTOR_OPEN_DROPDOWN = '.dropdown-menu.show, [data-bs-toggle="dropdown"][aria-expanded="true"]'

const Default: ComponentConfig = {
  target: null,
  labelExpand: 'Expand',
  labelCollapse: 'Collapse',
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  target: '(null|string|element)',
  labelExpand: 'string',
  labelCollapse: 'string',
}

let expandedTrigger: HTMLElement | null = null

/**
 * Class definition
 */

class CardFullscreen extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig

  #card: HTMLElement | null = null

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this.#card = (this._config.target ? getElement(this._config.target) : null) ?? this._element.closest<HTMLElement>(SELECTOR_CARD)

    EventHandler.on(this._element, EVENT_CLICK, (event: Event) => {
      if (['A', 'AREA'].includes(this._element.tagName)) {
        event.preventDefault()
      }

      if (!isDisabled(this._element)) {
        void this.toggle()
      }
    })

    if (this.#isShown()) {
      this.#apply(true)
    } else {
      this.#updateTrigger(false)
    }
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

  // Public
  toggle(): Promise<void> {
    return this.#isShown() ? this.hide() : this.show()
  }

  show(): Promise<void> {
    if (!this.#card || this.#isShown()) {
      return resolved()
    }

    const showEvent = EventHandler.trigger(this.#card, EVENT_SHOW, { relatedTarget: this._element })
    if (showEvent?.defaultPrevented) {
      return resolved()
    }

    const expanded = expandedTrigger && expandedTrigger !== this._element ? (CardFullscreen.getInstance(expandedTrigger) as CardFullscreen | null) : null
    if (expanded && !expanded.#close()) {
      return resolved()
    }

    this.#apply(true)
    EventHandler.trigger(this.#card, EVENT_SHOWN, { relatedTarget: this._element })
    return resolved()
  }

  hide(): Promise<void> {
    this.#close()
    return resolved()
  }

  dispose(): void {
    if (this.#isShown()) {
      this.#apply(false)
    }

    super.dispose()
  }

  // Private
  #isShown(): boolean {
    return Boolean(this._element && this.#card?.classList.contains(CLASS_NAME_FULLSCREEN))
  }

  #close(): boolean {
    if (!this.#card || !this.#isShown()) {
      return true
    }

    const hideEvent = EventHandler.trigger(this.#card, EVENT_HIDE, { relatedTarget: this._element })
    if (hideEvent?.defaultPrevented) {
      return false
    }

    this.#apply(false)
    EventHandler.trigger(this.#card, EVENT_HIDDEN, { relatedTarget: this._element })
    return true
  }

  #apply(shown: boolean): void {
    this.#card?.classList.toggle(CLASS_NAME_FULLSCREEN, shown)
    document.documentElement.classList.toggle(CLASS_NAME_OPEN, shown)
    this.#updateTrigger(shown)

    if (shown) {
      expandedTrigger = this._element
      window.addEventListener('keydown', this.#onKeydown, true)
    } else {
      if (expandedTrigger === this._element) {
        expandedTrigger = null
      }

      window.removeEventListener('keydown', this.#onKeydown, true)
    }

    window.dispatchEvent(new Event('resize'))
  }

  #updateTrigger(shown: boolean): void {
    const element = this._element
    const label = shown ? this._config.labelCollapse : this._config.labelExpand

    element.setAttribute('aria-pressed', String(shown))

    if (element.hasAttribute('title')) {
      element.setAttribute('title', label)
    }

    if (element.hasAttribute('aria-label') || (!element.hasAttribute('title') && !element.textContent?.trim())) {
      element.setAttribute('aria-label', label)
    }
  }

  #onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== ESCAPE_KEY || event.defaultPrevented || SelectorEngine.findOne(SELECTOR_OPEN_OVERLAY) || (event.target as Element | null)?.closest?.(SELECTOR_OPEN_DROPDOWN)) {
      return
    }

    void this.hide()
  }
}

/**
 * Data API implementation
 */

// js-docs-start card-fullscreen-init
registerPlugin(CardFullscreen, { selector: SELECTOR_DATA_TOGGLE })
// js-docs-end card-fullscreen-init

export default CardFullscreen
