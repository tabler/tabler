/**
 * --------------------------------------------------------------------------
 * Tabler stepper.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
import { isDisabled } from './bootstrap/util/index'
import type { ElementSelector } from './bootstrap/types'

type StepperAction = 'increment' | 'decrement'

type ComponentConfig = {
  /** lower bound; `null` reads the input's `min` attribute, no bound when that is missing too */
  min: number | null
  /** upper bound; `null` reads the input's `max` attribute, no bound when that is missing too */
  max: number | null
  /** amount added or removed per step; `null` reads the input's `step` attribute, or 1 */
  step: number | null
  /** keep stepping while a button is held down */
  repeat: boolean
  /** milliseconds a button has to be held before it starts repeating */
  repeatDelay: number
  /** milliseconds between two repeated steps */
  repeatInterval: number
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'stepper'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`
const SELECTOR_INPUT = 'input'
const SELECTOR_ACTION = `[data-bs-${NAME}-action], [data-tblr-${NAME}-action]`

const ATTRIBUTES_ACTION = [`data-bs-${NAME}-action`, `data-tblr-${NAME}-action`]

const KEY_UP = 'ArrowUp'
const KEY_DOWN = 'ArrowDown'
const KEY_HOME = 'Home'
const KEY_END = 'End'

// A held button stops repeating on any of these, so a drag off the button or
// a cancelled touch never leaves the timer running.
const POINTER_END_EVENTS = ['pointerup', 'pointercancel', 'pointerleave']

const Default: ComponentConfig = {
  min: null,
  max: null,
  step: null,
  repeat: true,
  repeatDelay: 400,
  repeatInterval: 80,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  min: '(number|null)',
  max: '(number|null)',
  step: '(number|null)',
  repeat: 'boolean',
  repeatDelay: 'number',
  repeatInterval: 'number',
}

/**
 * Class definition
 *
 * A number field with a decrement and an increment button. The `<input>` stays
 * the single source of truth: the buttons, the arrow keys and the public API
 * all write to it, clamp to `min` / `max` and round to the precision of
 * `step`, so a form sees nothing but an ordinary field.
 */

class Stepper extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _input: HTMLInputElement | null = null
  _buttons: HTMLElement[] = []
  _min = Number.NEGATIVE_INFINITY
  _max = Number.POSITIVE_INFINITY
  _step = 1
  _precision = 0
  // Characters the field accepts: digits, plus a minus sign and a decimal
  // separator only when the bounds and the step call for them.
  _disallowed = /[^0-9]/g
  _holdTimer: ReturnType<typeof setTimeout> | null = null
  _repeatTimer: ReturnType<typeof setInterval> | null = null
  // Set once a held button has stepped on its own, so the `click` that ends
  // the hold does not add one more step.
  _held = false
  // The last value the field held, restored after an edit that is not a number
  _lastValue = ''

  _onClick = (event: Event): void => this._handleClick(event)
  _onPointerDown = (event: Event): void => this._handlePointerDown(event)
  _onPointerEnd = (): void => this._stopRepeat()
  _onKeyDown = (event: Event): void => this._handleKeyDown(event as KeyboardEvent)
  _onBeforeInput = (event: Event): void => this._handleBeforeInput(event as InputEvent)
  _onInputChange = (): void => this._handleInputChange()

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    const input = SelectorEngine.findOne(SELECTOR_INPUT, this._element) as HTMLInputElement | null
    if (!input) {
      return
    }

    this._input = input
    this._buttons = SelectorEngine.find(SELECTOR_ACTION, this._element)

    this._resolveBounds()
    this._setUpInput()
    this._addEventListeners()
    this._update()
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
  getValue(): number | null {
    return this._parse(this._input?.value ?? '')
  }

  setValue(value: number | string): void {
    const parsed = this._parse(String(value))
    if (parsed === null) {
      return
    }

    this._commit(parsed)
  }

  increment(): void {
    this._stepBy(1)
  }

  decrement(): void {
    this._stepBy(-1)
  }

  dispose(): void {
    this._stopRepeat()

    if (this._input) {
      this._input.removeEventListener('keydown', this._onKeyDown)
      this._input.removeEventListener('beforeinput', this._onBeforeInput)
      this._input.removeEventListener('change', this._onInputChange)
      this._input.removeEventListener('blur', this._onInputChange)
    }

    for (const button of this._buttons) {
      button.removeEventListener('click', this._onClick)
      button.removeEventListener('pointerdown', this._onPointerDown)
      for (const type of POINTER_END_EVENTS) {
        button.removeEventListener(type, this._onPointerEnd)
      }
    }

    super.dispose()
  }

  // Private
  // Config wins over the input's own attributes; both are optional.
  _resolveBounds(): void {
    const input = this._input!
    const attribute = (name: string): number | null => {
      const value = Number.parseFloat(input.getAttribute(name) ?? '')
      return Number.isFinite(value) ? value : null
    }

    this._min = this._config.min ?? attribute('min') ?? Number.NEGATIVE_INFINITY
    this._max = this._config.max ?? attribute('max') ?? Number.POSITIVE_INFINITY

    const step = this._config.step ?? attribute('step')
    this._step = step !== null && step > 0 ? step : 1

    // `0.25` has two decimals: every result is rounded to the same precision,
    // so repeated steps never drift into `0.30000000000000004`.
    const decimals = String(this._step).split('.')[1]
    this._precision = decimals ? decimals.length : 0

    const allowed = `0-9${this._min < 0 ? '-' : ''}${this._precision > 0 ? '.,' : ''}`
    this._disallowed = new RegExp(`[^${allowed}]`, 'g')
  }

  _setUpInput(): void {
    const input = this._input!

    // A text field keeps the native spin buttons away on every platform;
    // the role tells assistive technology it still behaves like a number.
    if (input.type !== 'number') {
      input.setAttribute('role', 'spinbutton')
      if (!input.hasAttribute('inputmode')) {
        input.setAttribute('inputmode', this._precision > 0 ? 'decimal' : 'numeric')
      }
    }

    const current = this._parse(input.value)
    if (current !== null) {
      input.value = this._format(this._clamp(current))
    }

    this._lastValue = input.value
  }

  _addEventListeners(): void {
    const input = this._input!

    input.addEventListener('keydown', this._onKeyDown)
    input.addEventListener('beforeinput', this._onBeforeInput)
    // `blur` as well as `change`: a value set by a script before the field is
    // left fires no `change`, and the clamp must still happen.
    input.addEventListener('change', this._onInputChange)
    input.addEventListener('blur', this._onInputChange)

    for (const button of this._buttons) {
      button.addEventListener('click', this._onClick)
      button.addEventListener('pointerdown', this._onPointerDown)
      for (const type of POINTER_END_EVENTS) {
        button.addEventListener(type, this._onPointerEnd)
      }
    }
  }

  _actionOf(button: HTMLElement): StepperAction | null {
    for (const name of ATTRIBUTES_ACTION) {
      const action = button.getAttribute(name)
      if (action === 'increment' || action === 'decrement') {
        return action
      }
    }

    return null
  }

  _handleClick(event: Event): void {
    const button = event.currentTarget as HTMLElement
    event.preventDefault()

    if (this._held) {
      this._held = false
      return
    }

    this._runAction(this._actionOf(button))
  }

  _handlePointerDown(event: Event): void {
    const button = event.currentTarget as HTMLElement
    const action = this._actionOf(button)

    this._stopRepeat()

    if (!this._config.repeat || !action || isDisabled(button) || this._isLocked()) {
      return
    }

    // Keep the focus on the field being edited; the step itself happens on
    // `click`, which also covers keyboard activation.
    if ((event as PointerEvent).pointerType === 'mouse') {
      event.preventDefault()
    }

    this._holdTimer = setTimeout(() => {
      this._holdTimer = null
      this._held = true
      this._runAction(action)
      this._repeatTimer = setInterval(() => this._runAction(action), this._config.repeatInterval)
    }, this._config.repeatDelay)
  }

  _stopRepeat(): void {
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer)
      this._holdTimer = null
    }

    if (this._repeatTimer !== null) {
      clearInterval(this._repeatTimer)
      this._repeatTimer = null
    }
  }

  _runAction(action: StepperAction | null): void {
    if (action === 'increment') {
      this.increment()
    } else if (action === 'decrement') {
      this.decrement()
    }
  }

  _handleKeyDown(event: KeyboardEvent): void {
    const steps: Record<string, () => void> = {
      [KEY_UP]: () => this.increment(),
      [KEY_DOWN]: () => this.decrement(),
      [KEY_HOME]: () => this._commit(this._min),
      [KEY_END]: () => this._commit(this._max),
    }

    const handler = steps[event.key]
    if (!handler) {
      return
    }

    if ((event.key === KEY_HOME && !Number.isFinite(this._min)) || (event.key === KEY_END && !Number.isFinite(this._max))) {
      return
    }

    event.preventDefault()
    handler()
  }

  // Letters never get into the field: a typed one is dropped, a pasted text
  // keeps only its digits (and the sign or separator when those are allowed).
  _handleBeforeInput(event: InputEvent): void {
    const { data, inputType } = event
    if (!data || !inputType.startsWith('insert')) {
      return
    }

    const clean = data.replace(this._disallowed, '')
    if (clean === data) {
      return
    }

    event.preventDefault()

    if (clean === '') {
      return
    }

    const input = this._input!
    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? start
    input.setRangeText(clean, start, end, 'end')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }

  // A typed value is clamped once the field is left; a value that is not a
  // number goes back to the previous one. An untouched field is left alone,
  // so leaving it fires no events.
  _handleInputChange(): void {
    const input = this._input!
    if (input.value === this._lastValue) {
      return
    }

    const parsed = this._parse(input.value)

    if (parsed === null) {
      input.value = this._lastValue
      this._update()
      return
    }

    this._commit(parsed)
  }

  _stepBy(direction: 1 | -1): void {
    if (this._isLocked()) {
      return
    }

    const current = this.getValue() ?? this._fallbackValue()
    this._commit(current + direction * this._step)
  }

  // The value an empty field steps from: the nearest bound, or zero.
  _fallbackValue(): number {
    if (Number.isFinite(this._min) && this._min > 0) {
      return this._min
    }

    if (Number.isFinite(this._max) && this._max < 0) {
      return this._max
    }

    return 0
  }

  _commit(value: number): void {
    const input = this._input!
    const previousValue = this.getValue()
    const next = this._clamp(value)
    const formatted = this._format(next)

    const changed = input.value !== formatted
    input.value = formatted
    this._lastValue = formatted
    this._update()

    if (!changed) {
      return
    }

    // The field itself fires `input` and `change`, so a form, a framework
    // binding or validation sees a stepped value like a typed one.
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))

    EventHandler.trigger(this._element, EVENT_CHANGE, { value: next, previousValue })

    if (next === this._min || next === this._max) {
      this._stopRepeat()
    }
  }

  _isLocked(): boolean {
    const input = this._input!
    return input.disabled || input.readOnly
  }

  _clamp(value: number): number {
    return Math.min(this._max, Math.max(this._min, value))
  }

  _parse(value: string): number | null {
    const trimmed = value.trim().replace(',', '.')
    if (trimmed === '') {
      return null
    }

    const parsed = Number(trimmed)
    return Number.isFinite(parsed) ? parsed : null
  }

  _format(value: number): string {
    return value.toFixed(this._precision)
  }

  // Buttons go inert at a bound or while the field is locked, and the
  // spinbutton role gets its `aria-value*` attributes refreshed.
  _update(): void {
    const input = this._input!
    const value = this.getValue()
    const locked = this._isLocked()

    for (const button of this._buttons) {
      const action = this._actionOf(button)
      const atBound = value !== null && ((action === 'increment' && value >= this._max) || (action === 'decrement' && value <= this._min))
      ;(button as HTMLButtonElement).disabled = locked || atBound
    }

    if (input.getAttribute('role') !== 'spinbutton') {
      return
    }

    if (Number.isFinite(this._min)) {
      input.setAttribute('aria-valuemin', this._format(this._min))
    }

    if (Number.isFinite(this._max)) {
      input.setAttribute('aria-valuemax', this._format(this._max))
    }

    if (value === null) {
      input.removeAttribute('aria-valuenow')
    } else {
      input.setAttribute('aria-valuenow', this._format(value))
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start stepper-init
initAll(SELECTOR_DATA_TOGGLE, Stepper)
// js-docs-end stepper-init

export default Stepper
