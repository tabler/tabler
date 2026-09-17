/**
 * --------------------------------------------------------------------------
 * Bootstrap rating.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type RatingLabels = string[] | ((value: number) => string) | null

type ComponentConfig = {
  max: number
  half: boolean
  clearable: boolean
  readonly: boolean
  icon: string | null
  labels: RatingLabels
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'rating'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`
const EVENT_HOVER = `hover${EVENT_KEY}`

const CLASS_NAME_RENDERED = 'rating-rendered'
const CLASS_NAME_READONLY = 'rating-readonly'
const CLASS_NAME_STAR = 'rating-star'
const CLASS_NAME_STAR_ACTIVE = 'rating-star-active'
const CLASS_NAME_STAR_HALF = 'rating-star-half'
const CLASS_NAME_STAR_INPUT = 'rating-star-input'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="rating"], [data-tblr-toggle="rating"]'
const SELECTOR_STAR_INPUT = '.rating-star-input'
const SELECTOR_INPUT = 'input'

const VAR_FILL = '--tblr-rating-fill'
const VAR_ICON = '--tblr-rating-icon'

const DEFAULT_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"/></svg>'

// A CSS mask (not two overlaid <svg> copies) draws each star, so the active
// and inactive colors are one box's background - no second box to misalign.
function iconMaskUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

const Default: ComponentConfig = {
  max: 5,
  half: false,
  clearable: false,
  readonly: false,
  icon: null,
  labels: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  max: 'number',
  half: 'boolean',
  clearable: 'boolean',
  readonly: 'boolean',
  icon: '(string|null)',
  labels: '(array|function|null)',
}

function defaultLabel(value: number): string {
  return `${value} star${value === 1 ? '' : 's'}`
}

/**
 * Class definition
 *
 * A single real `<input>` inside `.rating` keeps the form value. JavaScript
 * renders `max` stars on top of it: a `radiogroup` of unnamed radios (no
 * `name`, so only the real input submits) in interactive mode, or `max`
 * plain, fractionally-filled icons in readonly mode.
 */

class Rating extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _input!: HTMLInputElement
  _icon = DEFAULT_ICON
  _max = 5
  _step = 1
  _value = 0
  _previewValue: number | null = null
  _stars: HTMLElement[] = []
  _radios: HTMLInputElement[] = []

  _onClick = (event: Event): void => this._handleClick(event)
  _onKeydown = (event: Event): void => this._handleKeydown(event as KeyboardEvent)
  _onPointerOver = (event: Event): void => this._handlePointerOver(event as PointerEvent)
  _onPointerLeave = (): void => this._handlePointerLeave()

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
    this._max = Math.max(1, Math.trunc(this._config.max) || 5)
    this._step = this._config.half ? 0.5 : 1
    this._icon = this._resolveIcon()
    this._element.style.setProperty(VAR_ICON, iconMaskUrl(this._icon))
    this._value = this._clamp(Number.parseFloat(this._input.value))

    if (this._config.readonly) {
      this._renderReadonly()
    } else {
      this._renderInteractive()
      this._addEventListeners()
    }

    this._element.classList.add(CLASS_NAME_RENDERED)
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
  getValue(): number {
    return this._value
  }

  setValue(value: number | string): void {
    this._commit(this._clamp(Number.parseFloat(String(value))))
  }

  clear(): void {
    this._commit(0)
  }

  dispose(): void {
    if (!this._input) {
      super.dispose()
      return
    }

    this._element.removeEventListener('click', this._onClick)
    this._element.removeEventListener('keydown', this._onKeydown)
    this._element.removeEventListener('pointerover', this._onPointerOver)
    this._element.removeEventListener('pointerleave', this._onPointerLeave)

    for (const star of this._stars) {
      star.remove()
    }

    this._element.classList.remove(CLASS_NAME_RENDERED, CLASS_NAME_READONLY)
    this._element.removeAttribute('role')
    this._element.removeAttribute('aria-label')
    this._element.style.removeProperty(VAR_ICON)
    super.dispose()
  }

  // Private
  _resolveIcon(): string {
    const { icon } = this._config
    if (!icon) {
      return DEFAULT_ICON
    }

    if (icon.trim().startsWith('<')) {
      return icon
    }

    const template = document.querySelector<HTMLTemplateElement>(icon)
    return template?.content.firstElementChild?.outerHTML ?? DEFAULT_ICON
  }

  _clamp(value: number): number {
    const safe = Number.isNaN(value) ? 0 : value
    const clamped = Math.max(0, Math.min(this._max, safe))
    if (this._config.readonly) {
      return clamped
    }

    return this._config.half ? Math.round(clamped * 2) / 2 : Math.round(clamped)
  }

  _labelFor(value: number): string {
    const { labels } = this._config

    if (typeof labels === 'function') {
      return labels(value)
    }

    if (Array.isArray(labels) && Number.isInteger(value)) {
      return labels[value - 1] ?? defaultLabel(value)
    }

    return defaultLabel(value)
  }

  _createStarIconElement(): HTMLElement {
    const icon = document.createElement('span')
    icon.className = 'rating-star-icon'
    icon.setAttribute('aria-hidden', 'true')
    return icon
  }

  _renderReadonly(): void {
    this._element.classList.add(CLASS_NAME_READONLY)
    this._element.setAttribute('role', 'img')
    this._element.setAttribute('aria-label', `${this._value} out of ${this._max}`)

    for (let index = 1; index <= this._max; index++) {
      const star = document.createElement('span')
      star.className = CLASS_NAME_STAR
      star.append(this._createStarIconElement())

      const fill = Math.round(Math.max(0, Math.min(1, this._value - (index - 1))) * 10_000) / 100
      star.style.setProperty(VAR_FILL, `${fill}%`)

      this._stars.push(star)
      this._element.append(star)
    }
  }

  _renderInteractive(): void {
    this._element.setAttribute('role', 'radiogroup')
    if (!this._element.hasAttribute('aria-label') && !this._element.hasAttribute('aria-labelledby')) {
      this._element.setAttribute('aria-label', 'Rating')
    }

    const disabled = this._input.disabled

    for (let index = 1; index <= this._max; index++) {
      const star = document.createElement('span')
      star.className = CLASS_NAME_STAR

      const steps = this._config.half ? [index - 0.5, index] : [index]
      for (const [stepIndex, value] of steps.entries()) {
        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.className = CLASS_NAME_STAR_INPUT
        radio.dataset.value = String(value)
        radio.setAttribute('aria-label', this._labelFor(value))
        radio.checked = value === this._value
        radio.tabIndex = -1
        radio.disabled = disabled
        if (steps.length > 1) {
          radio.style.insetInlineStart = stepIndex === 0 ? '0' : '50%'
          radio.style.inlineSize = '50%'
        }

        this._radios.push(radio)
        star.append(radio)
      }

      star.append(this._createStarIconElement())

      this._stars.push(star)
      this._element.append(star)
    }

    const checkedIndex = this._radios.findIndex((radio) => radio.checked)
    this._radios[Math.max(checkedIndex, 0)]?.setAttribute('tabindex', '0')

    this._render()
  }

  _addEventListeners(): void {
    this._element.addEventListener('click', this._onClick)
    this._element.addEventListener('keydown', this._onKeydown)
    this._element.addEventListener('pointerover', this._onPointerOver)
    this._element.addEventListener('pointerleave', this._onPointerLeave)
  }

  _handleClick(event: Event): void {
    const radio = (event.target as HTMLElement).closest<HTMLInputElement>(SELECTOR_STAR_INPUT)
    if (!radio || radio.disabled) {
      return
    }

    const value = Number.parseFloat(radio.dataset.value ?? '0')

    if (this._config.clearable && value === this._value) {
      radio.checked = false
      this._setActiveRadio(null)
      this._commit(0)
      return
    }

    this._setActiveRadio(radio)
    this._commit(value)
  }

  _handleKeydown(event: KeyboardEvent): void {
    const radio = (event.target as HTMLElement).closest<HTMLInputElement>(SELECTOR_STAR_INPUT)
    if (!radio) {
      return
    }

    const currentIndex = this._radios.indexOf(radio)
    if (currentIndex === -1) {
      return
    }

    const rtl = getComputedStyle(this._element).direction === 'rtl'
    let nextIndex: number

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = currentIndex + (rtl ? -1 : 1)
        break
      case 'ArrowLeft':
        nextIndex = currentIndex + (rtl ? 1 : -1)
        break
      case 'ArrowDown':
        nextIndex = currentIndex + 1
        break
      case 'ArrowUp':
        nextIndex = currentIndex - 1
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = this._radios.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    nextIndex = Math.max(0, Math.min(nextIndex, this._radios.length - 1))
    const next = this._radios[nextIndex]
    if (next.disabled) {
      return
    }

    next.focus()
    this._setActiveRadio(next)
    this._commit(Number.parseFloat(next.dataset.value ?? '0'))
  }

  _handlePointerOver(event: PointerEvent): void {
    const radio = (event.target as HTMLElement).closest<HTMLInputElement>(SELECTOR_STAR_INPUT)
    if (!radio || radio.disabled) {
      return
    }

    this._previewValue = Number.parseFloat(radio.dataset.value ?? '0')
    this._render()
    EventHandler.trigger(this._element, EVENT_HOVER, { value: this._previewValue })
  }

  _handlePointerLeave(): void {
    this._previewValue = null
    this._render()
    EventHandler.trigger(this._element, EVENT_HOVER, { value: this._value })
  }

  // Keeps exactly one radio checked and focusable; the rest unchecked with a
  // roving tabindex, since unnamed radios get no native grouping.
  _setActiveRadio(radio: HTMLInputElement | null): void {
    for (const candidate of this._radios) {
      candidate.checked = candidate === radio
      candidate.tabIndex = candidate === radio ? 0 : -1
    }

    if (!radio && this._radios.length > 0) {
      this._radios[0].tabIndex = 0
    }
  }

  _commit(value: number): void {
    this._value = value
    this._previewValue = null
    this._input.value = value ? String(value) : ''
    this._input.dispatchEvent(new Event('input', { bubbles: true }))
    this._input.dispatchEvent(new Event('change', { bubbles: true }))

    if (!this._config.readonly) {
      const active = this._radios.find((radio) => Number.parseFloat(radio.dataset.value ?? '') === value) ?? null
      this._setActiveRadio(active)
    }

    this._render()
    EventHandler.trigger(this._element, EVENT_CHANGE, { value: this._value })
  }

  _render(): void {
    if (this._config.readonly) {
      return
    }

    const display = this._previewValue ?? this._value

    for (const [index, star] of this._stars.entries()) {
      const threshold = index + 1
      star.classList.toggle(CLASS_NAME_STAR_ACTIVE, display >= threshold)
      star.classList.toggle(CLASS_NAME_STAR_HALF, this._config.half && display < threshold && display >= threshold - 0.5)
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start rating-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  Rating.getOrCreateInstance(element)
}
// js-docs-end rating-init

export default Rating
