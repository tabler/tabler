/**
 * --------------------------------------------------------------------------
 * Tabler range.ts
 * A native <input type="range"> enhancer: filled track, value tooltip and a
 * dual-handle min/max range built from two stacked inputs.
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import SelectorEngine from './dom/selector-engine'
import type { ComponentConfig, ComponentConfigType, ElementSelector } from './types'

const NAME = 'range'
const DATA_KEY = 'bs.range'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`

const CLASS_NAME_RANGE = 'form-range'
const CLASS_NAME_RANGE_INPUT = 'form-range-input'
const CLASS_NAME_TOOLTIP = 'form-range-tooltip'
const CLASS_NAME_ACTIVE = 'active'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="range"], [data-tblr-toggle="range"]'
const SELECTOR_RANGE_INPUT = `input[type="range"].${CLASS_NAME_RANGE_INPUT}`

// Custom properties are authored bare in scss (`--range-fill-end`) and get the
// public `--tblr-` prefix at build time (see `.build/css-var-prefix.ts`). JS
// never goes through that pipeline, so these have to spell out the prefix.
const VAR_FILL_START = '--tblr-range-fill-start'
const VAR_FILL_END = '--tblr-range-fill-end'
const VAR_TOOLTIP_POSITION = '--tblr-range-tooltip-position'
const VAR_THUMB_BG = '--tblr-range-thumb-bg'

const Default: ComponentConfig = {
  tooltip: true,
}

const DefaultType: ComponentConfigType = {
  tooltip: 'boolean',
}

class Range extends BaseComponent {
  _wrapper!: HTMLElement
  _inputs!: HTMLInputElement[]
  _tooltips!: HTMLElement[]
  _isDual!: boolean
  _wasWrapped!: boolean
  _onInput!: (event: Event) => void
  _onPointerDown!: (event: Event) => void
  _onPointerUp!: () => void

  constructor(element: ElementSelector, config?: Partial<ComponentConfig>) {
    super(element, config)

    if (!this._element) {
      return
    }

    this._wasWrapped = this._element.tagName === 'INPUT'
    this._wrapper = this._wasWrapped ? this._wrapInput(this._element as unknown as HTMLInputElement) : this._element
    this._inputs = this._wasWrapped ? [this._wrapper.querySelector<HTMLInputElement>(SELECTOR_RANGE_INPUT)!] : (SelectorEngine.find(SELECTOR_RANGE_INPUT, this._wrapper) as HTMLInputElement[])
    this._isDual = this._inputs.length > 1
    this._tooltips = this._config.tooltip ? this._inputs.map((input) => this._createTooltip(input)) : []
    this._syncColor()

    this._onInput = (event: Event) => this._update(event.target as HTMLInputElement)
    this._onPointerDown = (event: Event) => this._activate(event.target as HTMLInputElement)
    this._onPointerUp = () => this._deactivate()

    for (const input of this._inputs) {
      EventHandler.on(input, `input${EVENT_KEY}`, this._onInput)
      EventHandler.on(input, `change${EVENT_KEY}`, () => EventHandler.trigger(this._wrapper, EVENT_CHANGE, { values: this._values() }))
      EventHandler.on(input, `pointerdown${EVENT_KEY}`, this._onPointerDown)
      EventHandler.on(input, `pointerup${EVENT_KEY}`, this._onPointerUp)
      EventHandler.on(input, `pointercancel${EVENT_KEY}`, this._onPointerUp)
    }

    this._update()
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): ComponentConfigType {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  dispose(): void {
    for (const tooltip of this._tooltips) {
      tooltip.remove()
    }

    if (this._wasWrapped) {
      const input = this._inputs[0]
      input.className = this._wrapper.className
      this._wrapper.replaceWith(input)
    }

    super.dispose()
  }

  _wrapInput(input: HTMLInputElement): HTMLElement {
    const wrapper = document.createElement('div')
    // The wrapper takes over the input's classes (spacing, color, validation
    // utilities, …) — as a flex child, a margin left on the input itself would
    // shift its whole margin box within `align-items: center`, throwing the
    // thumb off the track's vertical center.
    wrapper.className = input.className
    input.before(wrapper)
    input.className = CLASS_NAME_RANGE_INPUT
    wrapper.append(input)
    return wrapper
  }

  // A text color utility (e.g. `.text-green`) on the wrapper sets `color`, which
  // `currentcolor` can't carry into `::-webkit-slider-thumb`/`::-moz-range-thumb`
  // (a real cross-browser limitation, not a Tabler bug). Reading the resolved
  // `color` back into `--range-thumb-bg` on the wrapper and every input sidesteps
  // it, since a real custom property does inherit into those pseudo-elements.
  _syncColor(): void {
    const color = getComputedStyle(this._wrapper).color
    this._wrapper.style.setProperty(VAR_THUMB_BG, color)

    for (const input of this._inputs) {
      input.style.setProperty(VAR_THUMB_BG, color)
    }
  }

  _createTooltip(input: HTMLInputElement): HTMLElement {
    const tooltip = document.createElement('span')
    tooltip.className = CLASS_NAME_TOOLTIP
    input.after(tooltip)
    return tooltip
  }

  _values(): number[] {
    return this._inputs.map((input) => Number(input.value))
  }

  _activate(input: HTMLInputElement): void {
    if (!this._isDual) {
      return
    }

    for (const candidate of this._inputs) {
      candidate.classList.toggle(CLASS_NAME_ACTIVE, candidate === input)
    }
  }

  // Releasing the pointer must clear `.active`, or its tooltip (and raised
  // z-index) would stay stuck on whichever handle was last dragged.
  _deactivate(): void {
    for (const input of this._inputs) {
      input.classList.remove(CLASS_NAME_ACTIVE)
    }
  }

  _update(source?: HTMLInputElement): void {
    if (this._isDual) {
      this._clamp(source || this._inputs[0])
    }

    const percentages = this._inputs.map((input) => this._percentage(input))

    for (const [index, input] of this._inputs.entries()) {
      if (this._tooltips[index]) {
        this._tooltips[index].textContent = input.value
        this._tooltips[index].style.setProperty(VAR_TOOLTIP_POSITION, `${percentages[index]}%`)
      }
    }

    this._wrapper.style.setProperty(VAR_FILL_START, `${this._isDual ? Math.min(...percentages) : 0}%`)
    this._wrapper.style.setProperty(VAR_FILL_END, `${this._isDual ? Math.max(...percentages) : percentages[0]}%`)
  }

  _percentage(input: HTMLInputElement): number {
    const min = Number(input.min || 0)
    const max = Number(input.max || 100)
    return max === min ? 0 : ((Number(input.value) - min) / (max - min)) * 100
  }

  // Two independent native inputs don't know about each other's value, so the
  // one the user is moving pushes the other past it instead of crossing it.
  _clamp(source: HTMLInputElement): void {
    const [low, high] = this._inputs
    const other = source === low ? high : low

    if (Number(low.value) > Number(high.value)) {
      other.value = source.value
    }
  }
}

/**
 * Data API implementation
 */

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
    Range.getOrCreateInstance(element)
  }
})

export default Range
