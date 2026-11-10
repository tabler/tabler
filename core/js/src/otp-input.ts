/**
 * --------------------------------------------------------------------------
 * Bootstrap otp-input.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
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

const SYNC_EVENTS = ['blur', 'keyup', 'select']

const POINTER_END_EVENTS = ['click', 'pointercancel']

const MASK_CHARACTER = '•'

const TYPES: Record<OtpInputType, { inputmode: string; pattern: string; filter: RegExp }> = {
  numeric: { inputmode: 'numeric', pattern: '[0-9]*', filter: /[^0-9]/g },
  alphanumeric: { inputmode: 'text', pattern: '[A-Za-z0-9]*', filter: /[^A-Za-z0-9]/g },
  alpha: { inputmode: 'text', pattern: '[A-Za-z]*', filter: /[^A-Za-z]/g },
}

const MAX_LENGTH = 32

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
  _wasComplete = false
  _slots: HTMLElement[] = []
  _slotsContainer: HTMLElement | null = null
  _pointerActive = false
  _pointerIndex = 0
  _composedValue: string | null = null

  _onInput = (event: Event): void => {
    if ((event as InputEvent).isComposing) {
      return
    }

    const composed = this._composedValue
    this._composedValue = null
    if (composed !== null && composed === this._input.value) {
      return
    }

    this._handleInput()
  }
  _onCompositionEnd = (): void => {
    this._handleInput()
    this._composedValue = this._input.value
  }
  _onBeforeInput = (event: Event): void => this._handleBeforeInput(event as InputEvent)
  _onFocus = (): void => this._handleFocus()
  _onPointerDown = (event: Event): void => this._handlePointerDown(event as PointerEvent)
  _onPointerEnd = (): void => {
    this._pointerActive = false
  }
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
    this._wasComplete = this._input.value.length === this._length
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

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
    this._pointerActive = false
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
    this._input.removeEventListener('compositionend', this._onCompositionEnd)
    for (const type of POINTER_END_EVENTS) {
      this._input.removeEventListener(type, this._onPointerEnd)
    }
    for (const type of SYNC_EVENTS) {
      this._input.removeEventListener(type, this._onSync)
    }

    document.removeEventListener('selectionchange', this._onSelectionChange)

    this._slotsContainer?.remove()
    this._element.classList.remove(CLASS_NAME_RENDERED)
    super.dispose()
  }

  _resolveLength(): number {
    const candidates: unknown[] = [this._config.length, Number.parseInt(this._input.getAttribute('maxlength') ?? '', 10)]

    const { groups } = this._config
    if (Array.isArray(groups) && groups.length > 0) {
      candidates.push(groups.reduce<number>((sum, group) => sum + Number(group), 0))
    }

    for (const candidate of candidates) {
      if (typeof candidate === 'number' && Number.isInteger(candidate) && candidate > 0) {
        return Math.min(candidate, MAX_LENGTH)
      }
    }

    return 6
  }

  _setupInput(): void {
    const input = this._input

    if (input.type !== 'text' && input.type !== 'tel') {
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
    this._input.addEventListener('compositionend', this._onCompositionEnd)
    for (const type of POINTER_END_EVENTS) {
      this._input.addEventListener(type, this._onPointerEnd)
    }

    document.addEventListener('selectionchange', this._onSelectionChange)

    for (const type of SYNC_EVENTS) {
      this._input.addEventListener(type, this._onSync)
    }
  }

  _handleFocus(): void {
    if (this._pointerActive) {
      this._pointerActive = false
      this._selectSlot(this._pointerIndex)
      this._render()
      return
    }

    this._selectSlot(this._firstEmptyIndex())
    this._render()
  }

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

  _handleBeforeInput(event: InputEvent): void {
    const { inputType, data } = event

    if (inputType === 'insertText' && data && data.length === 1) {
      event.preventDefault()

      const char = this._sanitize(data)
      if (!char) {
        return
      }

      const index = Math.min(this._input.selectionStart ?? 0, this._length - 1)
      const end = Math.max(this._input.selectionEnd ?? index, index + 1)
      const chars = [...this._input.value]
      chars.splice(index, end - index, char)
      this._input.value = chars.join('').slice(0, this._length)

      this._selectSlot(index + 1)
      this._afterValueChange()
      return
    }

    if (inputType === 'deleteContentBackward') {
      event.preventDefault()

      const before = this._input.value

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

      this._afterValueChange(before)
      return
    }

    if (inputType === 'deleteContentForward') {
      event.preventDefault()

      const before = this._input.value

      const start = this._input.selectionStart ?? 0
      const end = this._input.selectionEnd ?? start
      const chars = [...this._input.value]

      if (end > start) {
        chars.splice(start, end - start)
        this._input.value = chars.join('')
      } else if (start < chars.length) {
        chars.splice(start, 1)
        this._input.value = chars.join('')
      }

      this._selectSlot(start)
      this._afterValueChange(before)
    }
  }

  _handlePointerDown(event: PointerEvent): void {
    const index = this._slotIndexFromPoint(event.clientX)
    if (index === null) {
      return
    }

    const target = Math.min(index, this._firstEmptyIndex())

    if (document.activeElement === this._input) {
      event.preventDefault()
      this._selectSlot(target)
      this._render()
      return
    }

    this._pointerActive = true
    this._pointerIndex = target
  }

  _slotIndexFromPoint(x: number): number | null {
    const rtl = getComputedStyle(this._element).direction === 'rtl'

    for (const [index, slot] of this._slots.entries()) {
      const rect = slot.getBoundingClientRect()
      const reached = rtl ? x >= rect.left : x <= rect.right

      if (reached || index === this._slots.length - 1) {
        return index
      }
    }

    return null
  }

  _afterValueChange(before?: string): void {
    this._render()

    if (before !== undefined && before === this._input.value) {
      return
    }

    EventHandler.trigger(this._element, EVENT_INPUT, { value: this._input.value })
    this._checkComplete()
  }

  _firstEmptyIndex(): number {
    return Math.min(this._input.value.length, this._length - 1)
  }

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
    const complete = value.length === this._length

    if (complete && !this._wasComplete) {
      EventHandler.trigger(this._element, EVENT_COMPLETE, { value })
    }

    this._wasComplete = complete
  }
}

/**
 * Data API implementation
 */

// js-docs-start otp-init
initAll(SELECTOR_DATA_TOGGLE, OtpInput)
// js-docs-end otp-init

export default OtpInput
