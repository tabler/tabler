/**
 * --------------------------------------------------------------------------
 * Tabler clipboard.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
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
 * Helpers
 */

// The `hidden` DOM property belongs to HTMLElement, so an `<svg>` ignores it.
// The attribute works on any element.
const toggleHidden = (element: Element, hidden: boolean): void => {
  if (hidden) {
    element.setAttribute('hidden', '')
  } else {
    element.removeAttribute('hidden')
  }
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
  _labels: Element[] = []
  _feedbacks: Element[] = []
  _timeout = 0

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    // Several of each are allowed: an icon-only button pairs a check icon with
    // a visually hidden word, and both switch together.
    this._labels = SelectorEngine.find(SELECTOR_LABEL, this._element)
    this._feedbacks = SelectorEngine.find(SELECTOR_FEEDBACK, this._element)

    for (const feedback of this._feedbacks) {
      // Revealed rather than restyled, so a screen reader announces it.
      toggleHidden(feedback, true)

      if (!feedback.hasAttribute('role')) {
        feedback.setAttribute('role', 'status')
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

    for (const label of this._labels) {
      toggleHidden(label, copied)
    }

    for (const feedback of this._feedbacks) {
      toggleHidden(feedback, !copied)
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start clipboard-init
initAll(SELECTOR_DATA_TOGGLE, Clipboard)
// js-docs-end clipboard-init

export default Clipboard
