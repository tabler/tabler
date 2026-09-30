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

const SELECTOR_DATA_MASK = `[${ATTRIBUTE_MASK}]`

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

/**
 * Class definition
 *
 * A native input mask. Pattern characters: `0` a digit, `a` a letter, `*` any
 * character; `\` makes the next one a literal. Add more with the `tokens` option.
 */

class InputMask extends BaseComponent {
  declare _element: HTMLInputElement
  declare _config: ComponentConfig
  _legacy: IMaskInstance | null = null
  _unmasked = ''
  _complete = false
  _onInput = (event: Event): void => this._handleInput(event as InputEvent)

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element || !this._config.mask) {
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
    return this._legacy ?? (this._config.mask ? this : null)
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
    super.dispose()
  }

  // Private
  _slots(unmasked: string): Slot[] {
    const { mask, tokens } = this._config

    return parse(typeof mask === 'function' ? mask(unmasked) : mask, { ...TOKENS, ...tokens })
  }

  _extract(raw: string, caret: number | null = null): { unmasked: string; count: number | null } {
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

    return { unmasked, count }
  }

  _format(unmasked: string): { text: string; ends: number[]; complete: boolean } {
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
        typed = at
      }
    }

    this._unmasked = unmasked
    this._render(unmasked, typed)

    if (unmasked !== previous) {
      EventHandler.trigger(this._element, EVENT_ACCEPT, { value: this._element.value, unmaskedValue: unmasked })
    }
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
