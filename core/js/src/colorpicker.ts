/**
 * --------------------------------------------------------------------------
 * Tabler colorpicker.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import * as Popper from '@popperjs/core'
import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
import { getElement, isDisabled, isRTL } from './bootstrap/util/index'
import type { ComponentConfig as BaseConfig, ElementSelector } from './bootstrap/types'
import { detectColorFormat, formatColor, hsvaToRgba, parseColor, rgbaToHsva, type ColorFormat, type HSVA, type RGBA } from './util/color'

type OutputFormat = ColorFormat | 'auto'

type Labels = {
  dialog: string
  instruction: string
  /** `{s}` and `{v}` are replaced with the saturation and brightness */
  marker: string
  hue: string
  alpha: string
  input: string
  format: string
  swatch: string
  clear: string
  close: string
}

type ComponentConfig = {
  /** show the opacity slider and keep the alpha channel of the value */
  alpha: boolean
  clearButton: boolean
  closeButton: boolean
  /** 'light', 'dark' or 'auto' for the panel only; null inherits from the nearest `[data-bs-theme]` */
  colorpickerTheme: string | null
  /** element the panel is appended to */
  container: string | HTMLElement
  /** colour the panel shows while the field is empty */
  defaultColor: string
  /** notation written to the field; 'auto' keeps the one the value came in */
  format: OutputFormat
  /** selector in the panel to switch the notation */
  formatToggle: boolean
  /** render the panel in place instead of a popup */
  inline: boolean
  /** texts read by assistive technology, merged with the defaults */
  labels: Labels
  /** Popper placement; `start` and `end` follow the text direction */
  placement: string
  /** element the popup is aligned with; defaults to the `.colorpicker` wrapper or the element */
  positionElement: string | HTMLElement | null
  /** preset colours; `null` reads the Tabler palette from CSS custom properties */
  swatches: string[] | null
  /** hide the gradient and sliders, leaving the swatches */
  swatchesOnly: boolean
  /** initial value for an element that is not an input */
  value: string | null
}

type ComponentConfigInput = Partial<Omit<ComponentConfig, 'labels' | 'swatches'>> & {
  labels?: Partial<Labels>
  swatches?: string[] | string | null
} & Record<string, unknown>

type ChangeEventArgs = { value: string; format: ColorFormat; rgba: RGBA | null; hsva: HSVA | null }

/**
 * Constants
 */

const NAME = 'colorpicker'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_CHANGE = `change${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`
const EVENT_POINTERMOVE = `pointermove${EVENT_KEY}`
const EVENT_POINTERUP = `pointerup${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_FOCUSIN_DATA_API = `focusin${EVENT_KEY}${DATA_API_KEY}`
// `input` is not in EventHandler's native-event list, so it cannot be namespaced
const EVENT_INPUT = 'input'
const EVENT_NATIVE_CHANGE = 'change'

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_PANEL = `${NAME}-panel`
const CLASS_NAME_PANEL_INLINE = `${NAME}-panel-inline`
const CLASS_NAME_AREA = `${NAME}-area`
const CLASS_NAME_MARKER = `${NAME}-marker`
const CLASS_NAME_SLIDERS = `${NAME}-sliders`
const CLASS_NAME_HUE = `${NAME}-hue`
const CLASS_NAME_ALPHA = `${NAME}-alpha`
const CLASS_NAME_SWATCHES = `${NAME}-swatches`
const CLASS_NAME_SWATCH = `${NAME}-swatch`
const CLASS_NAME_FOOTER = `${NAME}-footer`
const CLASS_NAME_INPUT = `${NAME}-input`
const CLASS_NAME_FORMAT = `${NAME}-format`
const CLASS_NAME_CLEAR = `${NAME}-clear`
const CLASS_NAME_CLOSE = `${NAME}-close`

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`
const SELECTOR_WRAPPER = `.${NAME}`
const SELECTOR_BOUND_INPUT = 'input[type="hidden"], input[name]'
const SELECTOR_FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]'

// Shipped (`--tblr-`-prefixed) custom properties. The build prefixes the SCSS
// tokens, so the plugin writes the prefixed names to meet the rendered CSS.
const PROPERTY_VALUE = '--tblr-colorpicker-value'
const PROPERTY_COLOR = '--tblr-colorpicker-color'
const PROPERTY_HUE = '--tblr-colorpicker-hue'

const FORMATS: ColorFormat[] = ['hex', 'rgb', 'hsl', 'oklch']
const KEY_STEP = 1
const KEY_STEP_LARGE = 10

// Palette names looked up as `--tblr-<name>` on the root element; the hex
// values are the fallback for a page that loads the script without the CSS.
const PALETTE: [string, string][] = [
  ['blue', '#066fd1'],
  ['azure', '#4299e1'],
  ['indigo', '#4263eb'],
  ['purple', '#ae3ec9'],
  ['pink', '#d6336c'],
  ['red', '#d63939'],
  ['orange', '#f76707'],
  ['yellow', '#f59f00'],
  ['lime', '#74b816'],
  ['green', '#2fb344'],
  ['teal', '#0ca678'],
  ['cyan', '#17a2b8'],
]

const DefaultLabels: Labels = {
  dialog: 'Color picker',
  instruction: 'Saturation and brightness selector. Use the arrow keys to select.',
  marker: 'Saturation: {s}%. Brightness: {v}%.',
  hue: 'Hue',
  alpha: 'Opacity',
  input: 'Color value',
  format: 'Color format',
  swatch: 'Color swatch',
  clear: 'Clear',
  close: 'Close',
}

const Default: ComponentConfig = {
  alpha: false,
  clearButton: false,
  closeButton: false,
  colorpickerTheme: null,
  container: 'body',
  defaultColor: '#000000',
  format: 'hex',
  formatToggle: false,
  inline: false,
  labels: DefaultLabels,
  placement: 'bottom-start',
  positionElement: null,
  swatches: null,
  swatchesOnly: false,
  value: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  alpha: 'boolean',
  clearButton: 'boolean',
  closeButton: 'boolean',
  colorpickerTheme: '(null|string)',
  container: '(string|element)',
  defaultColor: 'string',
  format: 'string',
  formatToggle: 'boolean',
  inline: 'boolean',
  labels: 'object',
  placement: 'string',
  positionElement: '(null|string|element)',
  swatches: '(array|null)',
  swatchesOnly: 'boolean',
  value: '(null|string)',
}

const create = <K extends keyof HTMLElementTagNameMap>(tag: K, className: string, attributes: Record<string, string> = {}): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag)
  element.className = className
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value)
  }

  return element
}

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

/**
 * Class definition
 *
 * Same lifecycle as the Datepicker: a text input or a button carries the
 * toggle, the panel is built on the first show and appended to the container,
 * and the value stays in the field so the form works without the plugin.
 */

class Colorpicker extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _isInput = false
  _input: HTMLInputElement | null = null
  _wrapper: HTMLElement | null = null
  _panel: HTMLElement | null = null
  _area: HTMLElement | null = null
  _marker: HTMLElement | null = null
  _hueInput: HTMLInputElement | null = null
  _alphaInput: HTMLInputElement | null = null
  _valueInput: HTMLInputElement | null = null
  _formatSelect: HTMLSelectElement | null = null
  _popper: Popper.Instance | null = null
  _themeObserver: MutationObserver | null = null
  _isShown = false
  _isEmpty = true
  _isTyping = false
  _isWriting = false
  _isRestoringFocus = false
  _hsva: HSVA = { h: 0, s: 0, v: 0, a: 1 }
  _format: ColorFormat = 'hex'
  _onDocumentClick = (event: Event): void => this._handleDocumentClick(event)
  _onDocumentFocusIn = (event: Event): void => this._handleDocumentFocusIn(event)
  _onDocumentKeydown = (event: KeyboardEvent): void => this._handleDocumentKeydown(event)
  _onAreaPointerMove = (event: PointerEvent): void => this._pickAtPointer(event)
  _onAreaPointerUp = (): void => this._stopAreaDrag()

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this._init()
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
  toggle(): Promise<void> {
    if (this._config.inline) {
      return Promise.resolve()
    }

    return this._isShown ? this.hide() : this.show()
  }

  async show(): Promise<void> {
    // Focus handed back by `hide()` reaches the Data API too, which must not reopen the panel
    if (this._config.inline || this._isShown || this._isRestoringFocus || isDisabled(this._element)) {
      return
    }

    if (EventHandler.trigger(this._element, EVENT_SHOW)?.defaultPrevented) {
      return
    }

    const panel = this._getPanel()
    const container = getElement(this._config.container) ?? document.body
    if (panel.parentElement !== container) {
      container.append(panel)
    }

    this._syncTheme()
    this._render()
    panel.classList.add(CLASS_NAME_SHOW)
    this._popper = Popper.createPopper(this._getPositionElement(), panel, this._getPopperConfig())
    this._isShown = true

    EventHandler.on(document, EVENT_CLICK, this._onDocumentClick)
    EventHandler.on(document, EVENT_FOCUSIN, this._onDocumentFocusIn)
    EventHandler.on(document, EVENT_KEYDOWN, this._onDocumentKeydown)

    EventHandler.trigger(this._element, EVENT_SHOWN)
  }

  async hide(): Promise<void> {
    if (this._config.inline || !this._isShown) {
      return
    }

    if (EventHandler.trigger(this._element, EVENT_HIDE)?.defaultPrevented) {
      return
    }

    const focusWasInside = this._panel?.contains(document.activeElement) ?? false

    this._panel?.classList.remove(CLASS_NAME_SHOW)
    this._popper?.destroy()
    this._popper = null
    this._isShown = false

    EventHandler.off(document, EVENT_CLICK, this._onDocumentClick)
    EventHandler.off(document, EVENT_FOCUSIN, this._onDocumentFocusIn)
    EventHandler.off(document, EVENT_KEYDOWN, this._onDocumentKeydown)

    if (focusWasInside) {
      this._isRestoringFocus = true
      this._element.focus()
      this._isRestoringFocus = false
    }

    EventHandler.trigger(this._element, EVENT_HIDDEN)
  }

  /** The value in the configured notation, or an empty string while the field is empty. */
  getValue(): string {
    return this._isEmpty ? '' : formatColor(hsvaToRgba(this._hsva), this._format, this._config.alpha)
  }

  /** Any CSS colour; `null` or an empty string clears the field. */
  setValue(value: string | null): void {
    if (!value || !value.trim()) {
      this._clear()
      return
    }

    const rgba = parseColor(value)
    if (!rgba) {
      return
    }

    this._adoptFormat(value)
    this._setColor(rgbaToHsva(rgba))
  }

  dispose(): void {
    this._themeObserver?.disconnect()
    this._stopAreaDrag()

    if (this._isShown) {
      EventHandler.off(document, EVENT_CLICK, this._onDocumentClick)
      EventHandler.off(document, EVENT_FOCUSIN, this._onDocumentFocusIn)
      EventHandler.off(document, EVENT_KEYDOWN, this._onDocumentKeydown)
    }

    this._popper?.destroy()
    this._panel?.remove()

    if (this._input && this._input !== this._element) {
      EventHandler.off(this._input, EVENT_KEY)
    }

    super.dispose()
  }

  // Private
  _configAfterMerge(config: BaseConfig): BaseConfig {
    if (typeof config.swatches === 'string') {
      config.swatches = config.swatches
        .split(',')
        .map((swatch) => swatch.trim())
        .filter(Boolean)
    }

    config.labels = { ...DefaultLabels, ...(typeof config.labels === 'object' && config.labels !== null ? config.labels : {}) }

    if (typeof config.format === 'string' && !FORMATS.includes(config.format as ColorFormat) && config.format !== 'auto') {
      config.format = 'hex'
    }

    return config
  }

  _init(): void {
    this._isInput = this._element.tagName === 'INPUT'
    this._input = this._isInput ? (this._element as HTMLInputElement) : (SelectorEngine.findOne(SELECTOR_BOUND_INPUT, this._element) as HTMLInputElement | null)
    this._wrapper = this._element.closest<HTMLElement>(SELECTOR_WRAPPER)
    this._format = this._config.format === 'auto' ? 'hex' : this._config.format

    const initial = this._input?.value || this._config.value || ''
    const rgba = initial ? parseColor(initial) : null
    if (rgba) {
      this._adoptFormat(initial)
      this._hsva = rgbaToHsva(this._config.alpha ? rgba : { ...rgba, a: 1 })
      this._isEmpty = false
    } else {
      this._hsva = rgbaToHsva(parseColor(this._config.defaultColor) ?? { r: 0, g: 0, b: 0, a: 1 })
    }

    this._writePreview()

    if (this._input) {
      EventHandler.on(this._input, EVENT_INPUT, () => this._handleFieldInput())
      EventHandler.on(this._input, EVENT_NATIVE_CHANGE, () => this._handleFieldChange())
    }

    if (this._isInput) {
      EventHandler.on(this._element, EVENT_KEYDOWN, (event: KeyboardEvent) => this._handleFieldKeydown(event))
    }

    this._setupThemeObserver()

    if (this._config.inline) {
      const panel = this._getPanel()
      panel.classList.add(CLASS_NAME_PANEL_INLINE, CLASS_NAME_SHOW)
      if (this._isInput) {
        this._element.after(panel)
      } else {
        this._element.append(panel)
      }

      this._syncTheme()
      this._render()
    }
  }

  // Panel

  _getPanel(): HTMLElement {
    if (this._panel) {
      return this._panel
    }

    const { labels, alpha, swatchesOnly, formatToggle, clearButton, closeButton } = this._config
    const panel = create('div', CLASS_NAME_PANEL, { 'role': 'dialog', 'aria-label': labels.dialog, 'tabindex': '-1' })

    if (!swatchesOnly) {
      this._area = create('div', CLASS_NAME_AREA, { 'role': 'application', 'aria-label': labels.instruction })
      this._marker = create('div', CLASS_NAME_MARKER, { tabindex: '0', role: 'img' })
      this._area.append(this._marker)

      const sliders = create('div', CLASS_NAME_SLIDERS)
      this._hueInput = create('input', `form-range ${CLASS_NAME_HUE}`, { 'type': 'range', 'min': '0', 'max': '360', 'step': '1', 'aria-label': labels.hue })
      sliders.append(this._hueInput)

      if (alpha) {
        this._alphaInput = create('input', `form-range ${CLASS_NAME_ALPHA}`, { 'type': 'range', 'min': '0', 'max': '100', 'step': '1', 'aria-label': labels.alpha })
        sliders.append(this._alphaInput)
      }

      panel.append(this._area, sliders)

      EventHandler.on(this._area, EVENT_POINTERDOWN, (event: PointerEvent) => this._startAreaDrag(event))
      EventHandler.on(this._marker, EVENT_KEYDOWN, (event: KeyboardEvent) => this._handleMarkerKeydown(event))
      EventHandler.on(this._hueInput, EVENT_INPUT, () => this._setColor({ ...this._hsva, h: Number(this._hueInput!.value) }))
      if (this._alphaInput) {
        EventHandler.on(this._alphaInput, EVENT_INPUT, () => this._setColor({ ...this._hsva, a: Number(this._alphaInput!.value) / 100 }))
      }
    }

    const swatches = this._getSwatches()
    if (swatches.length > 0) {
      const list = create('div', CLASS_NAME_SWATCHES)
      for (const swatch of swatches) {
        const rgba = parseColor(swatch)
        if (!rgba) {
          continue
        }

        const button = create('button', CLASS_NAME_SWATCH, { 'type': 'button', 'aria-label': `${labels.swatch} ${swatch}` })
        button.style.setProperty(PROPERTY_VALUE, formatColor(rgba, 'rgb'))
        EventHandler.on(button, EVENT_CLICK, () => this._setColor(rgbaToHsva(this._config.alpha ? rgba : { ...rgba, a: 1 })))
        list.append(button)
      }

      panel.append(list)
    }

    const footer = create('div', CLASS_NAME_FOOTER)
    this._valueInput = create('input', `form-control form-control-sm ${CLASS_NAME_INPUT}`, { 'type': 'text', 'spellcheck': 'false', 'autocomplete': 'off', 'aria-label': labels.input })
    footer.append(this._valueInput)
    EventHandler.on(this._valueInput, EVENT_INPUT, () => this._handlePanelInput())
    EventHandler.on(this._valueInput, EVENT_NATIVE_CHANGE, () => this._render())

    if (formatToggle) {
      this._formatSelect = create('select', `form-select form-select-sm ${CLASS_NAME_FORMAT}`, { 'aria-label': labels.format })
      for (const format of FORMATS) {
        const option = document.createElement('option')
        option.value = format
        option.textContent = format.toUpperCase()
        this._formatSelect.append(option)
      }

      EventHandler.on(this._formatSelect, EVENT_NATIVE_CHANGE, () => {
        this._format = this._formatSelect!.value as ColorFormat
        this._setColor(this._hsva)
      })
      footer.append(this._formatSelect)
    }

    if (clearButton) {
      const button = create('button', `btn btn-sm ${CLASS_NAME_CLEAR}`, { type: 'button' })
      button.textContent = labels.clear
      EventHandler.on(button, EVENT_CLICK, () => this._clear())
      footer.append(button)
    }

    if (closeButton) {
      const button = create('button', `btn btn-sm btn-primary ${CLASS_NAME_CLOSE}`, { type: 'button' })
      button.textContent = labels.close
      EventHandler.on(button, EVENT_CLICK, () => this.hide())
      footer.append(button)
    }

    panel.append(footer)
    EventHandler.on(panel, EVENT_KEYDOWN, (event: KeyboardEvent) => this._handlePanelKeydown(event))

    this._panel = panel
    return panel
  }

  _getSwatches(): string[] {
    const { swatches } = this._config
    if (swatches) {
      return swatches
    }

    const style = getComputedStyle(document.documentElement)
    return PALETTE.map(([name, fallback]) => style.getPropertyValue(`--tblr-${name}`).trim() || fallback)
  }

  /** Paints the panel from the current state; the field is written by `_setColor`. */
  _render(): void {
    if (!this._panel) {
      return
    }

    const { h, s, v, a } = this._hsva
    const rgba = hsvaToRgba(this._hsva)
    const { labels } = this._config

    this._panel.style.setProperty(PROPERTY_HUE, `${Math.round(h)}`)
    this._panel.style.setProperty(PROPERTY_VALUE, formatColor(rgba, 'rgb'))
    this._panel.style.setProperty(PROPERTY_COLOR, formatColor(rgba, 'rgb', false))

    if (this._marker) {
      this._marker.style.insetInlineStart = `${s}%`
      this._marker.style.top = `${100 - v}%`
      this._marker.setAttribute('aria-label', labels.marker.replace('{s}', `${Math.round(s)}`).replace('{v}', `${Math.round(v)}`))
    }

    if (this._hueInput) {
      this._hueInput.value = `${Math.round(h)}`
    }

    if (this._alphaInput) {
      this._alphaInput.value = `${Math.round(a * 100)}`
    }

    if (this._valueInput && document.activeElement !== this._valueInput) {
      this._valueInput.value = this._isEmpty ? '' : formatColor(rgba, this._format, this._config.alpha)
    }

    if (this._formatSelect) {
      this._formatSelect.value = this._format
    }
  }

  // State

  _setColor(hsva: HSVA): void {
    this._hsva = { h: clamp(hsva.h, 0, 360), s: clamp(hsva.s, 0, 100), v: clamp(hsva.v, 0, 100), a: this._config.alpha ? clamp(hsva.a, 0, 1) : 1 }
    this._isEmpty = false

    this._render()
    this._writePreview()

    const value = this.getValue()
    if (!this._isTyping) {
      this._writeField(value)
    }

    this._triggerChange(value, hsvaToRgba(this._hsva))
  }

  _clear(): void {
    this._isEmpty = true
    this._render()
    this._writePreview()

    if (!this._isTyping) {
      this._writeField('')
    }

    this._triggerChange('', null)
  }

  /** Writes the field and lets the form know, the way a user's edit would. */
  _writeField(value: string): void {
    if (!this._input || this._input.value === value) {
      return
    }

    this._isWriting = true
    this._input.value = value
    this._input.dispatchEvent(new Event(EVENT_INPUT, { bubbles: true }))
    this._input.dispatchEvent(new Event(EVENT_NATIVE_CHANGE, { bubbles: true }))
    this._isWriting = false
  }

  _triggerChange(value: string, rgba: RGBA | null): void {
    const args: ChangeEventArgs = { value, format: this._format, rgba, hsva: rgba ? { ...this._hsva } : null }
    EventHandler.trigger(this._element, EVENT_CHANGE, args)
  }

  /** The swatch in the field and the button variant read the value from this custom property. */
  _writePreview(): void {
    const target = this._wrapper ?? this._element
    if (this._isEmpty) {
      target.style.removeProperty(PROPERTY_VALUE)
      return
    }

    target.style.setProperty(PROPERTY_VALUE, formatColor(hsvaToRgba(this._hsva), 'rgb'))
  }

  _adoptFormat(value: string): void {
    if (this._config.format === 'auto') {
      this._format = detectColorFormat(value) ?? this._format
    }
  }

  // Field

  _handleFieldInput(): void {
    if (this._isWriting) {
      return
    }

    const value = this._input!.value
    if (!value.trim()) {
      this._isTyping = true
      this._clear()
      this._isTyping = false
      return
    }

    const rgba = parseColor(value)
    if (!rgba) {
      return
    }

    this._adoptFormat(value)
    this._isTyping = true
    this._setColor(rgbaToHsva(this._config.alpha ? rgba : { ...rgba, a: 1 }))
    this._isTyping = false
  }

  /** On commit the field gets the value written back in the configured notation. */
  _handleFieldChange(): void {
    if (this._isWriting) {
      return
    }

    const value = this.getValue()
    if (this._input!.value !== value && (value || !parseColor(this._input!.value))) {
      this._input!.value = value
    }
  }

  _handleFieldKeydown(event: KeyboardEvent): void {
    if (!this._isShown || event.key !== 'Tab' || event.shiftKey) {
      return
    }

    const first = this._getFocusable()[0]
    if (first) {
      event.preventDefault()
      first.focus()
    }
  }

  _handlePanelInput(): void {
    const value = this._valueInput!.value
    if (!value.trim()) {
      return
    }

    const rgba = parseColor(value)
    if (!rgba) {
      return
    }

    this._adoptFormat(value)
    this._setColor(rgbaToHsva(this._config.alpha ? rgba : { ...rgba, a: 1 }))
  }

  // Gradient area

  _startAreaDrag(event: PointerEvent): void {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()
    this._pickAtPointer(event)
    this._marker?.focus({ preventScroll: true })

    EventHandler.on(document, EVENT_POINTERMOVE, this._onAreaPointerMove)
    EventHandler.on(document, EVENT_POINTERUP, this._onAreaPointerUp)
  }

  _stopAreaDrag(): void {
    EventHandler.off(document, EVENT_POINTERMOVE, this._onAreaPointerMove)
    EventHandler.off(document, EVENT_POINTERUP, this._onAreaPointerUp)
  }

  _pickAtPointer(event: PointerEvent): void {
    const rect = this._area!.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      return
    }

    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1)

    this._setColor({ ...this._hsva, s: (isRTL() ? 1 - x : x) * 100, v: (1 - y) * 100 })
  }

  _handleMarkerKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP
    const inlineStep = isRTL() ? -step : step
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-inlineStep, 0],
      ArrowRight: [inlineStep, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    }

    const move = moves[event.key]
    if (!move) {
      return
    }

    event.preventDefault()
    this._setColor({ ...this._hsva, s: this._hsva.s + move[0], v: this._hsva.v + move[1] })
  }

  // Keyboard and dismissal

  _handlePanelKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || this._config.inline) {
      return
    }

    const focusable = this._getFocusable()
    const target = event.target as HTMLElement

    if (event.shiftKey && target === focusable[0]) {
      event.preventDefault()
      this._element.focus()
    } else if (!event.shiftKey && target === focusable[focusable.length - 1]) {
      event.preventDefault()
      this.hide()
    }
  }

  _handleDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.hide()
    }
  }

  _handleDocumentClick(event: Event): void {
    if (!this._isOwnTarget(event.target)) {
      this.hide()
    }
  }

  _handleDocumentFocusIn(event: Event): void {
    if (!this._isOwnTarget(event.target)) {
      this.hide()
    }
  }

  _isOwnTarget(target: EventTarget | null): boolean {
    return target instanceof Node && (this._element.contains(target) || (this._panel?.contains(target) ?? false) || (this._wrapper?.contains(target) ?? false))
  }

  _getFocusable(): HTMLElement[] {
    return this._panel ? SelectorEngine.find(SELECTOR_FOCUSABLE, this._panel) : []
  }

  // Position and theme

  _getPositionElement(): HTMLElement {
    const { positionElement } = this._config
    return (typeof positionElement === 'string' ? getElement(positionElement) : positionElement) ?? this._wrapper ?? this._element
  }

  _getPopperConfig(): Partial<Popper.Options> {
    let { placement } = this._config
    if (isRTL()) {
      placement = placement.endsWith('-start') ? placement.replace('-start', '-end') : placement.endsWith('-end') ? placement.replace('-end', '-start') : placement
    }

    return {
      placement: placement as Popper.Placement,
      modifiers: [{ name: 'flip' }, { name: 'offset', options: { offset: [0, 4] } }, { name: 'preventOverflow', options: { boundary: 'clippingParents' } }],
    }
  }

  _getThemeAncestor(): Element | null {
    return this._element.closest('[data-bs-theme]')
  }

  _syncTheme(): void {
    if (!this._panel) {
      return
    }

    const theme = this._config.colorpickerTheme || this._getThemeAncestor()?.getAttribute('data-bs-theme') || null
    if (theme) {
      this._panel.setAttribute('data-bs-theme', theme)
    } else {
      this._panel.removeAttribute('data-bs-theme')
    }
  }

  /** The panel lives in the container, outside the theme's cascade, so it copies the attribute. */
  _setupThemeObserver(): void {
    const ancestor = this._getThemeAncestor()
    if (!ancestor || this._config.colorpickerTheme) {
      return
    }

    this._themeObserver = new MutationObserver(() => this._syncTheme())
    this._themeObserver.observe(ancestor, { attributes: true, attributeFilter: ['data-bs-theme'] })
  }
}

/**
 * Data API implementation
 */

// js-docs-start colorpicker-init
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  // Inputs open on focus, and inline panels are always visible
  if (this.tagName === 'INPUT' || this.dataset.bsInline === 'true' || this.dataset.tblrInline === 'true') {
    return
  }

  event.preventDefault()
  ;(Colorpicker.getOrCreateInstance(this) as Colorpicker).toggle()
})

EventHandler.on(document, EVENT_FOCUSIN_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement) {
  if (this.tagName !== 'INPUT') {
    return
  }

  ;(Colorpicker.getOrCreateInstance(this) as Colorpicker).show()
})

// Render on load what cannot wait for a focus or a click: inline panels, and
// fields with a value, so the swatch in the field shows it right away.
initAll(SELECTOR_DATA_TOGGLE, Colorpicker, (element) => {
  const { dataset } = element

  return dataset.bsInline === 'true' || dataset.tblrInline === 'true' || 'bsValue' in dataset || 'tblrValue' in dataset || Boolean((element as HTMLInputElement).value) || Boolean(SelectorEngine.findOne(SELECTOR_BOUND_INPUT, element))
})
// js-docs-end colorpicker-init

export default Colorpicker
export type { ComponentConfig as ColorpickerConfig, ChangeEventArgs as ColorpickerChangeEventArgs, Labels as ColorpickerLabels }
