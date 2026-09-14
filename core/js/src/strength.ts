/**
 * --------------------------------------------------------------------------
 * Tabler strength.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong'

type ComponentConfig = {
  /** selector of the password field; without it the meter looks in its own parent */
  input: string | null
  minLength: number
  messages: Record<StrengthLevel, string>
  weights: Record<string, number>
  /** score bounds: weak up to the first, fair to the second, good to the third */
  thresholds: number[]
  /** replaces the built-in scoring; gets the password, returns a number */
  scorer: ((password: string) => number) | null
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'strength'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`

const CLASS_NAME_ACTIVE = 'active'

const SELECTOR_DATA_STRENGTH = `[data-bs-${NAME}], [data-tblr-${NAME}]`
const SELECTOR_SEGMENT = `.${NAME}-segment`
const SELECTOR_TEXT = `.${NAME}-text`
const SELECTOR_PASSWORD = 'input[type="password"]'

const LEVELS: StrengthLevel[] = ['weak', 'fair', 'good', 'strong']

const Default: ComponentConfig = {
  input: null,
  minLength: 8,
  messages: {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
  },
  weights: {
    minLength: 1,
    extraLength: 1,
    longPassword: 1,
    lowercase: 1,
    uppercase: 1,
    numbers: 1,
    special: 1,
    multipleSpecial: 1,
  },
  thresholds: [2, 4, 6],
  scorer: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  input: '(string|null)',
  minLength: 'number',
  messages: 'object',
  weights: 'object',
  thresholds: 'array',
  scorer: '(function|null)',
}

/**
 * Class definition
 *
 * Rates the password typed in a field and fills a segmented meter. The score
 * is a hint for the user, never a validation: check the password on the
 * server as well.
 */

class Strength extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _input: HTMLInputElement | null = null
  _segments: HTMLElement[] = []
  _text: HTMLElement | null = null
  // What the markup put in the label element: shown while the field is empty,
  // so a form can keep its password rules there until a level replaces them.
  _emptyText = ''
  _level: StrengthLevel | null = null
  _onInput = (): void => this.evaluate()

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this._input = this._getInput()
    this._segments = SelectorEngine.find(SELECTOR_SEGMENT, this._element)
    this._text = this._getText()
    this._emptyText = this._text?.textContent?.trim() ?? ''

    this._setUpAria()

    if (!this._input) {
      return
    }

    this._input.addEventListener('input', this._onInput)
    this.evaluate()
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

  get level(): StrengthLevel | null {
    return this._level
  }

  // Public
  evaluate(): void {
    if (!this._input) {
      return
    }

    const password = this._input.value
    const score = this._score(password)
    const level = this._level_(score)

    if (level === this._level) {
      return
    }

    this._level = level
    this._render(level)

    // The password itself is never part of the payload.
    EventHandler.trigger(this._element, EVENT_CHANGE, { strength: level, score })
  }

  dispose(): void {
    this._input?.removeEventListener('input', this._onInput)
    super.dispose()
  }

  // Private
  _getInput(): HTMLInputElement | null {
    const { input } = this._config
    if (input) {
      return SelectorEngine.findOne(input) as HTMLInputElement | null
    }

    // Without an explicit selector only the meter's own parent is searched, so
    // a form with several password fields cannot bind the wrong one.
    const parent = this._element.parentElement
    const fields = parent ? (SelectorEngine.find(SELECTOR_PASSWORD, parent) as HTMLInputElement[]) : []
    return fields[fields.length - 1] ?? null
  }

  _getText(): HTMLElement | null {
    const parent = this._element.parentElement
    return parent ? SelectorEngine.findOne(SELECTOR_TEXT, parent) : null
  }

  _setUpAria(): void {
    const element = this._element
    element.setAttribute('role', 'progressbar')
    element.setAttribute('aria-valuemin', '0')
    element.setAttribute('aria-valuemax', String(LEVELS.length))
    element.setAttribute('aria-valuenow', '0')

    if (!element.hasAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
      element.setAttribute('aria-label', 'Password strength')
    }

    // The segments are decoration; the level is read from the meter itself.
    for (const segment of this._segments) {
      segment.setAttribute('aria-hidden', 'true')
    }

    this._text?.setAttribute('aria-live', 'polite')
  }

  _score(password: string): number {
    if (!password) {
      return 0
    }

    const { scorer, weights, minLength } = this._config
    if (typeof scorer === 'function') {
      return scorer(password)
    }

    const rules: [boolean, number | undefined][] = [
      [password.length >= minLength, weights.minLength],
      [password.length >= minLength + 4, weights.extraLength],
      [password.length >= 16, weights.longPassword],
      [/[a-z]/.test(password), weights.lowercase],
      [/[A-Z]/.test(password), weights.uppercase],
      [/\d/.test(password), weights.numbers],
      [/[^\dA-Za-z]/.test(password), weights.special],
      [(password.match(/[^\dA-Za-z]/g) ?? []).length > 1, weights.multipleSpecial],
    ]

    return rules.reduce((score, [passed, weight]) => score + (passed ? (weight ?? 0) : 0), 0)
  }

  // Trailing underscore: `_level` is the field holding the current value.
  _level_(score: number): StrengthLevel | null {
    if (score <= 0) {
      return null
    }

    const index = this._config.thresholds.findIndex((threshold) => score <= threshold)
    return LEVELS[index === -1 ? LEVELS.length - 1 : index] ?? null
  }

  _render(level: StrengthLevel | null): void {
    const element = this._element
    const index = level ? LEVELS.indexOf(level) : -1

    // Emptied rather than removed: `data-bs-strength` is also the attribute
    // the data API looks for, and an empty value matches no level in CSS.
    element.dataset.bsStrength = level ?? ''

    element.setAttribute('aria-valuenow', String(index + 1))
    // No level means no spoken value: `aria-valuenow` of 0 says it already,
    // and an invented word here could not be translated through `messages`.
    if (level) {
      element.setAttribute('aria-valuetext', this._config.messages[level] ?? level)
    } else {
      element.removeAttribute('aria-valuetext')
    }

    // The segments are filled in proportion, so a meter with three or five of
    // them works as well as the usual four.
    const filled = level ? Math.ceil(((index + 1) / LEVELS.length) * this._segments.length) : 0
    for (const [position, segment] of this._segments.entries()) {
      segment.classList.toggle(CLASS_NAME_ACTIVE, position < filled)
    }

    if (this._text) {
      this._text.textContent = level ? (this._config.messages[level] ?? '') : this._emptyText
      this._text.dataset.bsStrength = level ?? ''
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start strength-init
for (const element of SelectorEngine.find(SELECTOR_DATA_STRENGTH)) {
  Strength.getOrCreateInstance(element)
}
// js-docs-end strength-init

export default Strength
