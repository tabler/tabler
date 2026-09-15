/**
 * --------------------------------------------------------------------------
 * Bootstrap otp-input.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type OtpInputType = 'numeric' | 'alphanumeric' | 'alpha'

type ComponentConfig = {
  groups: number[] | null
  length: number | null
  mask: boolean
  separator: string
  type: string
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'otpInput'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_INPUT = `input${EVENT_KEY}`
const EVENT_COMPLETE = `complete${EVENT_KEY}`

const CLASS_NAME_INPUT = 'otp-input'
const CLASS_NAME_RENDERED = 'otp-rendered'
const CLASS_NAME_SLOTS = 'otp-slots'
const CLASS_NAME_SLOT = 'otp-slot'
const CLASS_NAME_SLOT_FILLED = 'otp-slot-filled'
const CLASS_NAME_SLOT_ACTIVE = 'otp-slot-active'
const CLASS_NAME_SEPARATOR = 'otp-separator'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="otp"], [data-tblr-toggle="otp"]'
const SELECTOR_INPUT = 'input'

// Keeps the active-slot highlight in sync with the caret as it moves without typing
const SYNC_EVENTS = ['blur', 'keyup', 'select']

const MASK_CHARACTER = '•'

// Per-type input mode, validation pattern, and a filter that strips disallowed characters
const TYPES: Record<OtpInputType, { inputmode: string; pattern: string; filter: RegExp }> = {
  numeric: { inputmode: 'numeric', pattern: '[0-9]*', filter: /[^0-9]/g },
  alphanumeric: { inputmode: 'text', pattern: '[A-Za-z0-9]*', filter: /[^A-Za-z0-9]/g },
  alpha: { inputmode: 'text', pattern: '[A-Za-z]*', filter: /[^A-Za-z]/g },
}

const Default: ComponentConfig = {
  groups: null,
  length: null,
  mask: false,
  separator: '·',
  type: 'numeric',
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  groups: '(array|null)',
  length: '(number|null)',
  mask: 'boolean',
  separator: 'string',
  type: 'string',
}

/**
 * Class definition
 *
 * A single real `<input>` inside `.otp` is turned into a transparent overlay
 * once its value is rendered into one `.otp-slot` per character, so screen
 * readers, password managers and SMS autofill still see one ordinary field.
 */

class OtpInput extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _input!: HTMLInputElement
  _type!: (typeof TYPES)[OtpInputType]
  _length = 0
  _slots: HTMLElement[] = []
  _slotsContainer: HTMLElement | null = null
  // Tracks a tap so focus (fired natively by the browser) can respect the
  // clicked slot instead of jumping to the first empty one
  _pointerActive = false
  _pointerIndex = 0

  _onInput = (): void => this._handleInput()
  _onBeforeInput = (event: Event): void => this._handleBeforeInput(event as InputEvent)
  _onFocus = (): void => this._handleFocus()
  _onPointerDown = (event: Event): void => this._handlePointerDown(event as PointerEvent)
  _onSync = (): void => this._render()
  _onSelectionChange = (): void => {
    if (document.activeElement === this._input) {
      this._render()
    }
  }

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
    this._type = TYPES[this._config.type as OtpInputType] ?? TYPES.numeric
    this._length = this._resolveLength()

    this._setupInput()
    this._renderSlots()
    this._addEventListeners()
    this._render()
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
  getValue(): string {
    return this._input.value
  }

  setValue(value: string | number): void {
    this._input.value = this._sanitize(String(value))
    this._render()
    this._checkComplete()
  }

  clear(): void {
    this._input.value = ''
    this._render()
    this._input.focus()
  }

  focus(): void {
    this._input.focus()
    this._selectSlot(this._firstEmptyIndex())
    this._render()
  }

  dispose(): void {
    if (!this._input) {
      super.dispose()
      return
    }

    this._input.removeEventListener('input', this._onInput)
    this._input.removeEventListener('beforeinput', this._onBeforeInput)
    this._input.removeEventListener('focus', this._onFocus)
    this._input.removeEventListener('pointerdown', this._onPointerDown)
    for (const type of SYNC_EVENTS) {
      this._input.removeEventListener(type, this._onSync)
    }

    document.removeEventListener('selectionchange', this._onSelectionChange)

    this._slotsContainer?.remove()
    this._element.classList.remove(CLASS_NAME_RENDERED)
    super.dispose()
  }

  // Private
  _resolveLength(): number {
    if (this._config.length) {
      return this._config.length
    }

    const maxLength = Number.parseInt(this._input.getAttribute('maxlength') ?? '', 10)
    return Number.isNaN(maxLength) || maxLength < 1 ? 6 : maxLength
  }

  _setupInput(): void {
    const input = this._input

    // A single text field backs the whole control so screen readers, password
    // managers, and SMS autofill treat it like any other input.
    if (input.type === 'number' || input.type === 'password') {
      input.type = 'text'
    }

    input.classList.add(CLASS_NAME_INPUT)
    input.setAttribute('maxlength', String(this._length))
    input.setAttribute('inputmode', this._type.inputmode)
    input.setAttribute('pattern', this._type.pattern)

    if (!input.getAttribute('autocomplete')) {
      input.setAttribute('autocomplete', 'one-time-code')
    }

    if (input.value) {
      input.value = this._sanitize(input.value)
    }
  }

  _renderSlots(): void {
    const container = document.createElement('div')
    container.className = CLASS_NAME_SLOTS
    container.setAttribute('aria-hidden', 'true')

    const { groups, separator } = this._config
    let groupIndex = 0
    let inGroup = 0

    for (let i = 0; i < this._length; i++) {
      const slot = document.createElement('div')
      slot.className = CLASS_NAME_SLOT
      container.append(slot)
      this._slots.push(slot)

      if (groups && groups.length > 0) {
        inGroup++
        if (inGroup === groups[groupIndex] && i < this._length - 1) {
          const separatorEl = document.createElement('div')
          separatorEl.className = CLASS_NAME_SEPARATOR
          separatorEl.textContent = separator
          container.append(separatorEl)
          groupIndex = Math.min(groupIndex + 1, groups.length - 1)
          inGroup = 0
        }
      }
    }

    this._slotsContainer = container
    this._element.append(container)
    this._element.classList.add(CLASS_NAME_RENDERED)
  }

  _addEventListeners(): void {
    this._input.addEventListener('input', this._onInput)
    this._input.addEventListener('beforeinput', this._onBeforeInput)
    this._input.addEventListener('focus', this._onFocus)
    this._input.addEventListener('pointerdown', this._onPointerDown)
    document.addEventListener('selectionchange', this._onSelectionChange)

    for (const type of SYNC_EVENTS) {
      this._input.addEventListener(type, this._onSync)
    }
  }

  _handleFocus(): void {
    if (this._pointerActive) {
      // Wait for focus to settle before moving the caret, or iOS raises then
      // immediately dismisses the on-screen keyboard.
      this._pointerActive = false
      this._selectSlot(this._pointerIndex)
      this._render()
      return
    }

    this._selectSlot(this._firstEmptyIndex())
    this._render()
  }

  // Bulk path: paste, SMS autofill, or a programmatic change land here as a
  // single multi-character `input` event. Single keystrokes are handled by
  // `_handleBeforeInput` (overwrite semantics) and never reach this method.
  _handleInput(): void {
    const sanitized = this._sanitize(this._input.value)
    if (sanitized !== this._input.value) {
      this._input.value = sanitized
    }

    if (document.activeElement === this._input) {
      this._selectSlot(this._firstEmptyIndex())
    }

    this._afterValueChange()
  }

  // Intercepts single-character typing and backspace so each slot is
  // overwritten in place rather than inserting and shifting the value.
  // Anything else (paste, autofill, IME) falls through to `_handleInput`.
  _handleBeforeInput(event: InputEvent): void {
    const { inputType, data } = event

    if (inputType === 'insertText' && data && data.length === 1) {
      event.preventDefault()

      const char = this._sanitize(data)
      if (!char) {
        return
      }

      const index = Math.min(this._input.selectionStart ?? 0, this._length - 1)
      const chars = [...this._input.value]
      chars[index] = char
      this._input.value = chars.join('').slice(0, this._length)

      this._selectSlot(index + 1)
      this._afterValueChange()
      return
    }

    if (inputType === 'deleteContentBackward') {
      event.preventDefault()

      const start = this._input.selectionStart ?? 0
      const end = this._input.selectionEnd ?? start
      const chars = [...this._input.value]

      if (end > start) {
        chars.splice(start, end - start)
        this._input.value = chars.join('')
        this._selectSlot(start)
      } else if (start > 0) {
        chars.splice(start - 1, 1)
        this._input.value = chars.join('')
        this._selectSlot(start - 1)
      }

      this._afterValueChange()
    }
  }

  _handlePointerDown(event: PointerEvent): void {
    const index = this._slotIndexFromPoint(event.clientX)
    if (index === null) {
      return
    }

    const target = Math.min(index, this._firstEmptyIndex())

    if (document.activeElement === this._input) {
      // Already focused: safe to take over caret placement, it won't dismiss
      // the on-screen keyboard.
      event.preventDefault()
      this._selectSlot(target)
      this._render()
      return
    }

    // Not yet focused: let the browser focus the input natively so a tap
    // raises the on-screen keyboard; the caret is placed once focus settles.
    this._pointerActive = true
    this._pointerIndex = target
  }

  // Maps a viewport x-coordinate to the slot under it, clamped to the last slot.
  _slotIndexFromPoint(x: number): number | null {
    const rtl = getComputedStyle(this._element).direction === 'rtl'

    for (const [index, slot] of this._slots.entries()) {
      const rect = slot.getBoundingClientRect()
      // RTL mirrors the visual slot order, so the boundary flips from the
      // right edge (v6, LTR-only) to the left edge.
      const reached = rtl ? x >= rect.left : x <= rect.right

      if (reached || index === this._slots.length - 1) {
        return index
      }
    }

    return null
  }

  _afterValueChange(): void {
    this._render()
    EventHandler.trigger(this._element, EVENT_INPUT, { value: this._input.value })
    this._checkComplete()
  }

  _firstEmptyIndex(): number {
    return Math.min(this._input.value.length, this._length - 1)
  }

  // Represents the active slot as a selection: a filled slot is selected so
  // the next keystroke overwrites it; an empty slot gets a collapsed caret.
  _selectSlot(index: number): void {
    const clamped = Math.max(0, Math.min(index, this._length - 1))
    const end = clamped < this._input.value.length ? clamped + 1 : clamped
    this._input.setSelectionRange(clamped, end)
  }

  _sanitize(value: string): string {
    return value.replace(this._type.filter, '').slice(0, this._length)
  }

  _render(): void {
    const { value } = this._input
    const isFocused = document.activeElement === this._input
    const caret = Math.min(this._input.selectionStart ?? value.length, this._length - 1)

    for (const [index, slot] of this._slots.entries()) {
      const char = value[index] ?? ''
      slot.textContent = char && this._config.mask ? MASK_CHARACTER : char
      slot.classList.toggle(CLASS_NAME_SLOT_FILLED, Boolean(char))
      slot.classList.toggle(CLASS_NAME_SLOT_ACTIVE, isFocused && index === caret)
    }
  }

  _checkComplete(): void {
    const { value } = this._input
    if (value.length === this._length) {
      EventHandler.trigger(this._element, EVENT_COMPLETE, { value })
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start otp-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  OtpInput.getOrCreateInstance(element)
}
// js-docs-end otp-init

export default OtpInput
