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
const EVENT_TOGGLE = `toggle${EVENT_KEY}`
const EVENT_CHANGE = `change${EVENT_KEY}`

const CLASS_NAME_ACTIVE = 'active'
const CLASS_NAME_DISABLED = 'disabled'
const CLASS_NAME_LOADING = 'switch-icon-loading'

const SELECTOR_SWITCH_ICON = '.switch-icon'
const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

const Default: ComponentConfig = {}

const DefaultType: Record<keyof ComponentConfig, string> = {}

/**
 * Class definition
 *
 * A toggle button that swaps between two icons. The state is the `active`
 * class, mirrored in `aria-pressed`. The element is the `.switch-icon` itself,
 * or a button (e.g. `.btn-action`) wrapping one: the classes then go on the
 * inner `.switch-icon` and the ARIA state stays on the button.
 */

class SwitchIcon extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig

  #iconElement!: HTMLElement

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this.#iconElement = this._element.matches(SELECTOR_SWITCH_ICON) ? this._element : (SelectorEngine.findOne(SELECTOR_SWITCH_ICON, this._element) ?? this._element)

    if (!this._element.hasAttribute('aria-pressed')) {
      this._element.setAttribute('aria-pressed', String(this.isActive))
    }

    // The button usually sits inside a clickable row or card; the click must
    // not reach it.
    EventHandler.on(this._element, EVENT_CLICK, (event: Event) => {
      event.stopPropagation()

      // `.disabled` only blocks the pointer; Enter and Space still fire a click
      if (this._element.classList.contains(CLASS_NAME_DISABLED) || this._element.getAttribute('aria-disabled') === 'true') {
        return
      }

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
    return this.#iconElement.classList.contains(CLASS_NAME_ACTIVE)
  }

  get isLoading(): boolean {
    return this.#iconElement.classList.contains(CLASS_NAME_LOADING)
  }

  // Public
  toggle(force?: boolean): void {
    if (this.isLoading) {
      return
    }

    const active = force ?? !this.isActive

    // A listener can cancel with preventDefault(), or hand over a promise with
    // wait(): the button shows a spinner until it settles and switches only
    // when it resolves.
    let pending: Promise<unknown> | undefined
    const toggleEvent = EventHandler.trigger(this._element, EVENT_TOGGLE, {
      active,
      wait: (promise: Promise<unknown>) => {
        pending = promise
      },
    })

    if (toggleEvent?.defaultPrevented) {
      return
    }

    if (!pending) {
      this.#setActive(active)
      return
    }

    this.#setLoading(true)
    pending
      .then(
        () => this.#setActive(active),
        () => undefined,
      )
      .finally(() => this.#setLoading(false))
  }

  // Private
  #setActive(active: boolean): void {
    this.#iconElement.classList.toggle(CLASS_NAME_ACTIVE, active)
    this._element.setAttribute('aria-pressed', String(active))

    EventHandler.trigger(this._element, EVENT_CHANGE, { active })
  }

  #setLoading(loading: boolean): void {
    this.#iconElement.classList.toggle(CLASS_NAME_LOADING, loading)
    if (loading) {
      this._element.setAttribute('aria-busy', 'true')
    } else {
      this._element.removeAttribute('aria-busy')
    }
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
