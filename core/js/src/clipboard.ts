/**
 * --------------------------------------------------------------------------
 * Tabler clipboard.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  /** selector of the element to read the text from */
  target: string | null
  /** literal text to copy; wins over `target` */
  text: string | null
  /** how long the copied state lasts, in milliseconds */
  delay: number
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'clipboard'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_COPIED = `copied${EVENT_KEY}`
const EVENT_ERROR = `error${EVENT_KEY}`

const CLASS_NAME_COPIED = 'copied'

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`
const SELECTOR_LABEL = `.${NAME}-label`
const SELECTOR_FEEDBACK = `.${NAME}-feedback`

const Default: ComponentConfig = {
  target: null,
  text: null,
  delay: 2000,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  target: '(string|null)',
  text: '(string|number|null)',
  delay: 'number',
}

/**
 * Class definition
 *
 * Copies text to the clipboard when the trigger is clicked, then shows the
 * copied state for a moment. Every word lives in the markup: the trigger holds
 * a `clipboard-label` and a `clipboard-feedback`, and the component only swaps
 * which of them is hidden.
 *
 * The browser gives `navigator.clipboard` to secure contexts only, so on plain
 * http a copy fails and `error.bs.clipboard` fires.
 */

class Clipboard extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _label: HTMLElement | null = null
  _feedback: HTMLElement | null = null
  _timeout = 0

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this._label = SelectorEngine.findOne(SELECTOR_LABEL, this._element)
    this._feedback = SelectorEngine.findOne(SELECTOR_FEEDBACK, this._element)

    if (this._feedback) {
      // Revealed rather than restyled, so a screen reader announces it.
      this._feedback.hidden = true

      if (!this._feedback.hasAttribute('role')) {
        this._feedback.setAttribute('role', 'status')
      }
    }

    EventHandler.on(this._element, `click${EVENT_KEY}`, (event: Event) => {
      event.preventDefault()
      void this.copy()
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

  get text(): string {
    const { text, target } = this._config
    if (text !== null && text !== '') {
      return String(text)
    }

    const source = target ? SelectorEngine.findOne(target) : null
    if (!source) {
      return ''
    }

    return source instanceof HTMLInputElement || source instanceof HTMLTextAreaElement ? source.value : (source.textContent ?? '').trim()
  }

  // Public
  async copy(): Promise<void> {
    const { text } = this

    if (!text || !navigator.clipboard) {
      EventHandler.trigger(this._element, EVENT_ERROR)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      EventHandler.trigger(this._element, EVENT_ERROR)
      return
    }

    this._showCopied()
    EventHandler.trigger(this._element, EVENT_COPIED)
  }

  dispose(): void {
    window.clearTimeout(this._timeout)
    super.dispose()
  }

  // Private
  _showCopied(): void {
    window.clearTimeout(this._timeout)
    this._toggleCopied(true)

    if (this._config.delay > 0) {
      this._timeout = window.setTimeout(() => this._toggleCopied(false), this._config.delay)
    }
  }

  _toggleCopied(copied: boolean): void {
    this._element.classList.toggle(CLASS_NAME_COPIED, copied)

    if (this._label) {
      this._label.hidden = copied
    }

    if (this._feedback) {
      this._feedback.hidden = !copied
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start clipboard-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  Clipboard.getOrCreateInstance(element)
}
// js-docs-end clipboard-init

export default Clipboard
