/**
 * --------------------------------------------------------------------------
 * Tabler input-mask.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

type MaskFunction = (unmaskedValue: string) => string

// The part of an IMask instance the legacy fallback uses
interface IMaskInstance {
  value: string
  unmaskedValue: string
  updateValue(): void
  updateOptions(options: Record<string, unknown>): void
  destroy(): void
}

type ComponentConfig = {
  /** a pattern string, or a function that returns one for the current unmasked value */
  mask: string | MaskFunction
  /** show the mask only as far as the user has typed */
  lazy: boolean
  /** the character that stands for an empty slot when `lazy` is `false` */
  placeholderChar: string
  /** extra pattern characters, each with the RegExp one typed character has to match */
  tokens: Record<string, RegExp>
  /** `'number'` formats a number instead of a fixed pattern */
  type?: 'pattern' | 'number' | 'date'
  /** date: the format, from `YYYY`, `MM`, `DD`, `HH`, `mm` and `ss` (default `DD/MM/YYYY`) */
  format?: string
  /** pattern: the allowed range of each group of digits, in order, such as `[[0, 255], [0, 255]]` */
  ranges?: [number, number][]
  /** number: digits after the radix, `0` for integers (default `2`) */
  scale?: number
  /** number: the fractional separator (default `.`) */
  radix?: string
  /** number: the character that groups thousands (default none) */
  thousandsSeparator?: string
  /** number: other characters typed as the radix (default `,` for `.` and `.` for `,`) */
  mapToRadix?: string[]
  /** number: the lowest value; a `min` of `0` or more also forbids the minus sign */
  min?: number
  /** number: the highest value */
  max?: number
  /** number: text before the number, such as a currency symbol */
  prefix?: string
  /** number: text after the number */
  suffix?: string
  /** number: add zeros up to `scale` when the field loses focus */
  padFractionalZeros?: boolean
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'input-mask'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_ACCEPT = `accept${EVENT_KEY}`
const EVENT_COMPLETE = `complete${EVENT_KEY}`

const ATTRIBUTE_MASK = 'data-mask'
const ATTRIBUTE_VISIBLE = 'data-mask-visible'
const ATTRIBUTE_PLACEHOLDER_CHAR = 'data-mask-placeholder-char'
const ATTRIBUTE_TYPE = 'data-mask-type'

// `data-mask-<name>` attributes of the number type, by option name and value type
const ATTRIBUTE_FORMAT = 'data-mask-format'
const ATTRIBUTE_RANGES = 'data-mask-ranges'

const NUMBER_ATTRIBUTES: Record<string, 'number' | 'string' | 'boolean'> = {
  scale: 'number',
  radix: 'string',
  thousandsSeparator: 'string',
  min: 'number',
  max: 'number',
  prefix: 'string',
  suffix: 'string',
  padFractionalZeros: 'boolean',
}

const SELECTOR_DATA_MASK = `[${ATTRIBUTE_MASK}], [${ATTRIBUTE_TYPE}="number"], [${ATTRIBUTE_TYPE}="date"]`

const ESCAPE = '\\'

const TOKENS: Record<string, RegExp> = {
  '0': /\d/,
  'a': /\p{L}/u,
  '*': /./,
}

const Default: ComponentConfig = {
  mask: '',
  lazy: true,
  placeholderChar: '_',
  tokens: {},
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  mask: '(string|function|regexp|object|array)',
  lazy: 'boolean',
  placeholderChar: 'string',
  tokens: 'object',
  type: '(string|undefined)',
  scale: '(number|undefined)',
  radix: '(string|undefined)',
  thousandsSeparator: '(string|undefined)',
  mapToRadix: '(array|undefined)',
  min: '(number|undefined)',
  max: '(number|undefined)',
  prefix: '(string|undefined)',
  suffix: '(string|undefined)',
  padFractionalZeros: '(boolean|undefined)',
  format: '(string|undefined)',
  ranges: '(array|undefined)',
}

const isLegacyMask = (mask: unknown): boolean => typeof mask !== 'string' && (typeof mask !== 'function' || mask === Number || mask === Date)

type Slot = { token: RegExp | null; char: string }

// `\0` makes a literal of a token character; every other character outside the token map is a literal
const parse = (mask: string, tokens: Record<string, RegExp>): Slot[] => {
  const slots: Slot[] = []

  for (let i = 0; i < mask.length; i++) {
    const char = mask[i]

    if (char === ESCAPE && i + 1 < mask.length) {
      slots.push({ token: null, char: mask[++i] })
    } else {
      slots.push({ token: tokens[char] ?? null, char })
    }
  }

  return slots
}

type NumberOptions = {
  scale: number
  radix: string
  thousandsSeparator: string
  radixChars: string[]
  min: number | null
  max: number | null
  prefix: string
  suffix: string
  pad: boolean
}

const numberOptions = (config: ComponentConfig): NumberOptions => {
  const radix = config.radix ?? '.'
  const thousandsSeparator = config.thousandsSeparator ?? ''
  const mapToRadix = config.mapToRadix ?? [radix === '.' ? ',' : '.']

  return {
    scale: config.scale ?? 2,
    radix,
    thousandsSeparator,
    radixChars: [radix, ...mapToRadix.filter((char) => char !== thousandsSeparator)],
    min: config.min ?? null,
    max: config.max ?? null,
    prefix: config.prefix ?? '',
    suffix: config.suffix ?? '',
    pad: config.padFractionalZeros ?? false,
  }
}

// The canonical number: an optional `-`, digits and a `.`, whatever the radix shown. `-` and `12.` are valid while typing.
const scanNumber = (text: string, o: NumberOptions, final = false): string => {
  const signed = o.min === null || o.min < 0
  let sign = ''
  let int = ''
  let frac = ''
  let radix = false

  for (const char of o.prefix ? text.replace(o.prefix, '') : text) {
    if (char >= '0' && char <= '9') {
      if (!radix) {
        int += char
      } else if (frac.length < o.scale) {
        frac += char
      }
    } else if (char === '-' && signed && !int && !radix) {
      sign = '-'
    } else if (!radix && o.scale > 0 && o.radixChars.includes(char)) {
      radix = true
    }
  }

  int = int.replace(/^0+(?=\d)/, '')

  if (radix && !int) {
    int = '0'
  }

  let canon = sign + int + (radix ? `.${frac}` : '')
  const value = parseFloat(canon)

  if (o.max !== null && value > o.max) {
    canon = String(o.max)
  } else if (o.min !== null && value < (final ? o.min : Math.min(o.min, 0))) {
    canon = String(o.min)
  }

  if (final) {
    canon = canon.replace(/\.$/, '')

    if (o.pad && o.scale > 0 && /\d/.test(canon)) {
      const [whole, decimals = ''] = canon.split('.')
      canon = `${whole}.${decimals.padEnd(o.scale, '0')}`
    }
  }

  return canon
}

const displayNumber = (canon: string, o: NumberOptions): string => {
  const body = canon.replace('-', '')

  if (!body) {
    return canon
  }

  const [int, frac] = body.split('.')
  const grouped = o.thousandsSeparator ? int.replace(/\B(?=(\d{3})+(?!\d))/g, () => o.thousandsSeparator) : int

  return `${canon.startsWith('-') ? '-' : ''}${o.prefix}${grouped}${frac === undefined ? '' : o.radix + frac}${o.suffix}`
}

// A group of digits with the range it has to stay in; `kind` marks the day, month and year of a date
type Segment = { length: number; min: number; max: number; kind: '' | 'D' | 'M' | 'Y' }

const DATE_PARTS: Record<string, Segment> = {
  YYYY: { length: 4, min: 1, max: 9999, kind: 'Y' },
  MM: { length: 2, min: 1, max: 12, kind: 'M' },
  DD: { length: 2, min: 1, max: 31, kind: 'D' },
  HH: { length: 2, min: 0, max: 23, kind: '' },
  mm: { length: 2, min: 0, max: 59, kind: '' },
  ss: { length: 2, min: 0, max: 59, kind: '' },
}

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

// Turns a date format into a pattern of zeros and the segments behind it
const parseDateFormat = (format: string): { mask: string; segments: Segment[] } => {
  const segments: Segment[] = []
  const mask = format.replace(/YYYY|MM|DD|HH|mm|ss/g, (part) => {
    segments.push(DATE_PARTS[part])
    return '0'.repeat(part.length)
  })

  return { mask, segments }
}

// The lengths of the runs of token slots in a pattern, paired with the given ranges
const segmentsFromRanges = (slots: Slot[], ranges: [number, number][]): Segment[] => {
  const lengths: number[] = []
  let run = 0

  for (const slot of slots) {
    if (slot.token) {
      run++
    } else if (run) {
      lengths.push(run)
      run = 0
    }
  }

  if (run) {
    lengths.push(run)
  }

  return ranges.slice(0, lengths.length).map(([min, max], i) => ({ length: lengths[i], min, max, kind: '' }))
}

// Keeps every group of digits inside its range as the user types: a first digit that cannot start a valid
// number gets a `0` in front, and a full group is pulled back into the range.
const fixSegments = (digits: string, segments: Segment[]): string => {
  const parts: string[] = []
  let rest = digits

  for (const { length, min, max } of segments) {
    if (!rest) {
      break
    }

    if (length > 1 && Number(rest[0]) * 10 ** (length - 1) > max) {
      rest = `0${rest}`
    }

    let part = rest.slice(0, length)

    rest = rest.slice(length)

    if (part.length < length) {
      part = Number(part) * 10 ** (length - part.length) > max ? `0${part}` : part
    } else {
      const value = Number(part)
      part = value > max ? String(max).padStart(length, '0') : value < min ? String(min).padStart(length, '0') : part
    }

    parts.push(part)
  }

  const day = segments.findIndex((segment) => segment.kind === 'D')
  const month = segments.findIndex((segment) => segment.kind === 'M')
  const year = segments.findIndex((segment) => segment.kind === 'Y')

  if (day > -1 && month > -1 && parts[day]?.length === segments[day].length && parts[month]?.length === segments[month].length) {
    const common = year > -1 && parts[year]?.length === 4 && !isLeapYear(Number(parts[year]))
    const days = Number(parts[month]) === 2 && common ? 28 : DAYS_IN_MONTH[Number(parts[month]) - 1]

    if (Number(parts[day]) > days) {
      parts[day] = String(days)
    }
  }

  return parts.join('') + rest
}

/**
 * Class definition
 *
 * A native input mask. Pattern characters: `0` a digit, `a` a letter, `*` any
 * character; `\` makes the next one a literal. Add more with the `tokens` option.
 * With `type: 'number'` it formats a number instead.
 */

class InputMask extends BaseComponent {
  declare _element: HTMLInputElement
  declare _config: ComponentConfig
  _legacy: IMaskInstance | null = null
  _unmasked = ''
  _complete = false
  _number: NumberOptions | null = null
  _mask = ''
  _segments: Segment[] = []
  _onBlur = (): void => this._finish()
  _onInput = (event: Event): void => this._handleInput(event as InputEvent)

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    if (this._config.type === 'number') {
      this._number = numberOptions(this._config)
      this._element.addEventListener('input', this._onInput)
      this._element.addEventListener('blur', this._onBlur)
      this._element.inputMode ||= 'decimal'
      this.update()
      return
    }

    this._mask = this._config.mask as string

    if (this._config.type === 'date') {
      const { mask, segments } = parseDateFormat(this._config.format ?? 'DD/MM/YYYY')

      this._mask = mask
      this._segments = segments
    }

    if (!this._mask) {
      return
    }

    // deprecated(2.0): IMask object masks (`Number`, `Date`, a RegExp) stay on the IMask library when it is loaded
    if (isLegacyMask(this._config.mask)) {
      if (window.IMask) {
        this._legacy = new window.IMask(this._element, { ...this._config })
      } else {
        console.warn('Tabler InputMask: only string and function masks are supported without IMask.')
      }

      return
    }

    if (this._config.ranges && typeof this._mask === 'string') {
      this._segments = segmentsFromRanges(parse(this._mask, { ...TOKENS, ...this._config.tokens }), this._config.ranges)
    }

    this._element.addEventListener('input', this._onInput)
    this.update()
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

  /** The value as shown in the input, with the literals. */
  get value(): string {
    return this._legacy ? this._legacy.value : this._element.value
  }

  /** Only what the user typed, without the literals and the placeholders. */
  get unmaskedValue(): string {
    return this._legacy ? this._legacy.unmaskedValue : this._unmasked
  }

  /** `true` when every slot of the mask is filled. */
  get isComplete(): boolean {
    return this._complete
  }

  // deprecated(2.0): the IMask instance; the component itself answers the same members
  get mask(): this | IMaskInstance | null {
    return this._legacy ?? (this._mask || this._number ? this : null)
  }

  // Public
  /** Re-applies the mask after the value was changed from code. */
  update(): void {
    if (this._legacy) {
      this._legacy.updateValue()
      return
    }

    this._unmasked = this._extract(this._element.value).unmasked
    this._render(this._unmasked, null)
  }

  // deprecated(2.0): IMask method names
  updateValue(): void {
    this.update()
  }

  destroy(): void {
    this.dispose()
  }

  dispose(): void {
    this._legacy?.destroy()
    this._element.removeEventListener('input', this._onInput)
    this._element.removeEventListener('blur', this._onBlur)
    super.dispose()
  }

  // Private
  _slots(unmasked: string): Slot[] {
    const mask = this._mask || this._config.mask
    const { tokens } = this._config

    return parse(typeof mask === 'function' ? mask(unmasked) : mask, { ...TOKENS, ...tokens })
  }

  _extract(raw: string, caret: number | null = null): { unmasked: string; count: number | null } {
    if (this._number) {
      const o = this._number
      const before = caret === null ? null : raw.slice(0, caret)

      return { unmasked: scanNumber(raw, o), count: before === null ? null : [...before].filter((char) => /[\d-]/.test(char) || o.radixChars.includes(char)).length }
    }

    // A dynamic mask is resolved by what the value holds, so the first pass reads it with the previous mask
    let slots = this._slots(this._unmasked)
    let unmasked = ''
    let count: number | null = null
    let position = 0

    for (let i = 0; i <= raw.length; i++) {
      if (i === caret) {
        count = unmasked.length
      }

      const char = raw[i]

      if (char === undefined) {
        break
      }

      while (position < slots.length && !slots[position].token && slots[position].char !== char) {
        position++
      }

      if (position >= slots.length) {
        break
      }

      const { token } = slots[position]

      if (!token) {
        position++
        continue
      }

      if (char !== this._config.placeholderChar && token.test(char)) {
        unmasked += char
        position++
        slots = this._slots(unmasked)
      }
    }

    if (this._segments.length) {
      const fixed = fixSegments(unmasked, this._segments).slice(0, slots.filter((slot) => slot.token).length)

      if (count !== null) {
        count = count === unmasked.length ? fixed.length : Math.min(fixed.length, count + fixed.length - unmasked.length)
      }

      unmasked = fixed
    }

    return { unmasked, count }
  }

  _format(unmasked: string): { text: string; ends: number[]; complete: boolean } {
    if (this._number) {
      const text = displayNumber(unmasked, this._number)
      const ends: number[] = []

      for (let i = 0; i < text.length; i++) {
        if (/[\d-]/.test(text[i]) || this._number.radixChars.includes(text[i])) {
          ends.push(i + 1)
        }
      }

      return { text, ends, complete: false }
    }

    const slots = this._slots(unmasked)
    const { lazy, placeholderChar } = this._config
    const ends: number[] = []
    let text = ''
    let used = 0
    let complete = true

    for (const slot of slots) {
      if (!slot.token) {
        if (!lazy || used < unmasked.length) {
          text += slot.char
        }

        continue
      }

      if (used < unmasked.length) {
        text += unmasked[used++]
        ends.push(text.length)
      } else {
        complete = false

        if (lazy) {
          break
        }

        text += placeholderChar
      }
    }

    return { text, ends, complete: complete && slots.some((slot) => slot.token) }
  }

  _render(unmasked: string, typed: number | null): void {
    const { text, ends, complete } = this._format(unmasked)
    const changed = text !== this._element.value

    if (changed) {
      this._element.value = text
    }

    if (typed !== null && document.activeElement === this._element) {
      const caret = typed === 0 ? 0 : (ends[Math.min(typed, ends.length) - 1] ?? text.length)
      this._element.setSelectionRange(caret, caret)
    }

    if (complete !== this._complete) {
      this._complete = complete

      if (complete) {
        EventHandler.trigger(this._element, EVENT_COMPLETE, { value: text, unmaskedValue: unmasked })
      }
    }
  }

  _handleInput(event: InputEvent): void {
    if (event.isComposing) {
      return
    }

    const raw = this._element.value
    const caret = this._element.selectionStart ?? raw.length
    const previous = this._unmasked
    let { unmasked, count } = this._extract(raw, caret)
    let typed = count ?? unmasked.length

    // Deleting a literal changes nothing after re-masking, so it removes the digit next to it
    if (unmasked === previous && event.inputType.startsWith('delete') && typed > 0) {
      const at = event.inputType === 'deleteContentForward' ? typed : typed - 1

      if (at < unmasked.length) {
        unmasked = unmasked.slice(0, at) + unmasked.slice(at + 1)

        if (this._number) {
          unmasked = scanNumber(unmasked.replace('.', this._number.radix), this._number)
        }

        typed = at
      }
    }

    this._unmasked = unmasked
    this._render(unmasked, typed)

    if (unmasked !== previous) {
      EventHandler.trigger(this._element, EVENT_ACCEPT, { value: this._element.value, unmaskedValue: unmasked })
    }
  }

  _finish(): void {
    if (!this._number) {
      return
    }

    this._unmasked = scanNumber(this._element.value, this._number, true)
    this._element.value = displayNumber(this._unmasked, this._number)
  }

  _mergeConfigObj(config?: Record<string, unknown>, element?: HTMLElement): Record<string, unknown> {
    // `data-mask` holds the pattern; `data-mask-visible="true"` shows it
    // before typing, which is `lazy: false`.
    const dataOptions: Record<string, unknown> = {}
    const mask = element?.getAttribute(ATTRIBUTE_MASK)
    const placeholderChar = element?.getAttribute(ATTRIBUTE_PLACEHOLDER_CHAR)

    if (mask) {
      dataOptions.mask = mask
    }

    if (placeholderChar) {
      dataOptions.placeholderChar = placeholderChar
    }

    if (element?.getAttribute(ATTRIBUTE_TYPE) === 'number') {
      dataOptions.type = 'number'

      for (const [name, type] of Object.entries(NUMBER_ATTRIBUTES)) {
        const value = element.getAttribute(`data-mask-${name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`)

        if (value !== null) {
          dataOptions[name] = type === 'number' ? Number(value) : type === 'boolean' ? value !== 'false' : value
        }
      }
    }

    if (element?.getAttribute(ATTRIBUTE_TYPE) === 'date') {
      dataOptions.type = 'date'
    }

    const format = element?.getAttribute(ATTRIBUTE_FORMAT)
    const ranges = element?.getAttribute(ATTRIBUTE_RANGES)

    if (format) {
      dataOptions.format = format
    }

    if (ranges) {
      dataOptions.ranges = ranges.split(/[\s,]+/).map((range) => range.split('-').map(Number))
    }

    // A bare `data-mask-visible` means visible, like `="true"`.
    if (element?.hasAttribute(ATTRIBUTE_VISIBLE)) {
      dataOptions.lazy = element.getAttribute(ATTRIBUTE_VISIBLE) === 'false'
    }

    return super._mergeConfigObj({ ...dataOptions, ...config }, element)
  }
}

/**
 * Data API implementation
 */

// js-docs-start input-mask-init
initAll(SELECTOR_DATA_MASK, InputMask)
// js-docs-end input-mask-init

export default InputMask
export type { IMaskInstance }
