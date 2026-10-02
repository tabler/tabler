/**
 * --------------------------------------------------------------------------
 * Tabler phone-input.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import { initAll } from './bootstrap/util/component-functions'
import Combobox from './combobox'
import { countryOfDial, formatNumber, formatOfCountry, PHONE_COUNTRIES, TRUNK_ZERO } from './phone-countries'
import type { PhoneCountry } from './phone-countries'

type ComponentConfig = {
  autoDetect: boolean
  container: string | HTMLElement | null
  country: string
  countryLabel: string
  format: boolean
  hiddenInput: string | null
  locale: string | null
  onlyCountries: string[] | string | null
  preferredCountries: string[] | string
  searchPlaceholder: string
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'phoneInput'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_COUNTRY_CHANGE = `countrychange${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="phone-input"]'

const MAX_DIAL_LENGTH = 4
const MIN_DIGITS = 4
const MAX_DIGITS = 15

const Default: ComponentConfig = {
  autoDetect: true,
  container: null,
  country: 'us',
  countryLabel: 'Country',
  format: true,
  hiddenInput: null,
  locale: null,
  onlyCountries: null,
  preferredCountries: [],
  searchPlaceholder: 'Search…',
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  autoDetect: 'boolean',
  container: '(string|element|null)',
  country: 'string',
  countryLabel: 'string',
  format: 'boolean',
  hiddenInput: '(string|null)',
  locale: '(string|null)',
  onlyCountries: '(array|string|null)',
  preferredCountries: '(array|string)',
  searchPlaceholder: 'string',
}

// A list of country codes as an array or as a string like "de,at,ch"
const toCodes = (value: string[] | string): string[] => (Array.isArray(value) ? value : value.split(',')).map((code) => String(code).trim().toLowerCase()).filter(Boolean)

/**
 * Class definition
 *
 * A telephone `<input>` gets a country picker in front of it. The picker is a
 * Combobox built from a hidden `<select>`; the input itself keeps the national
 * number, and `getNumber()` (or the optional hidden input) gives the full
 * number in the international format.
 */

class PhoneInput extends BaseComponent {
  declare _element: HTMLInputElement
  declare _config: ComponentConfig
  _countries: PhoneCountry[]
  _names: Map<string, string>
  _country: PhoneCountry
  _select: HTMLSelectElement
  _combobox: Combobox
  _wrapper: HTMLElement
  _hidden: HTMLInputElement | null

  constructor(element: HTMLInputElement | string, config?: ComponentConfigInput) {
    super(element, config)

    this._names = new Map()
    this._countries = this._listCountries()
    this._country = this._countries.find((country) => country.iso === this._config.country.toLowerCase()) ?? this._countries[0]
    this._hidden = null

    this._select = this._createSelect()
    this._wrapper = this._wrap()
    this._combobox = this._createCombobox()

    if (this._config.hiddenInput) {
      this._hidden = Object.assign(document.createElement('input'), { type: 'hidden', name: this._config.hiddenInput })
      this._wrapper.append(this._hidden)
    }

    this._select.addEventListener('change', this._onCountryChange)
    this._element.addEventListener('input', this._onInput)

    this._onInput()
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
  // The full number in the international format, e.g. "+48600100200", or an empty string
  getNumber(): string {
    const digits = this._nationalDigits()
    return digits ? `+${this._country.dial}${digits}` : ''
  }

  // Lower-case ISO code of the chosen country
  getCountry(): string {
    return this._country.iso
  }

  getDialCode(): string {
    return this._country.dial
  }

  setCountry(iso: string): void {
    const country = this._countries.find((item) => item.iso === iso.toLowerCase())

    if (country) {
      this._applyCountry(country)
    }
  }

  // Accepts a number with a dial code, e.g. "+48 600 100 200"
  setNumber(number: string): void {
    this._element.value = number
    this._onInput()
  }

  // A quick length check (4 to 15 digits in total), not a full numbering plan check
  isValid(): boolean {
    const digits = this._nationalDigits()
    return digits.length >= MIN_DIGITS && this._country.dial.length + digits.length <= MAX_DIGITS
  }

  dispose(): void {
    this._select.removeEventListener('change', this._onCountryChange)
    this._element.removeEventListener('input', this._onInput)
    this._combobox.dispose()
    this._hidden?.remove()
    this._wrapper.replaceWith(this._element)

    super.dispose()
  }

  // Private
  _listCountries(): PhoneCountry[] {
    const only = this._config.onlyCountries === null ? null : toCodes(this._config.onlyCountries)
    const preferred = toCodes(this._config.preferredCountries)
    const locale = this._config.locale || document.documentElement.lang || 'en'
    let display: Intl.DisplayNames | null = null

    try {
      display = new Intl.DisplayNames([locale], { type: 'region' })
    } catch {
      display = null
    }

    const countries = PHONE_COUNTRIES.filter((country) => !only || only.includes(country.iso))

    for (const { iso } of countries) {
      let name = iso.toUpperCase()

      try {
        name = display?.of(name) ?? name
      } catch {
        // keep the code when the browser does not know the region
      }

      this._names.set(iso, name)
    }

    const rank = (iso: string): number => {
      const index = preferred.indexOf(iso)
      return index === -1 ? Number.POSITIVE_INFINITY : index
    }

    return countries.sort((a, b) => {
      const [rankA, rankB] = [rank(a.iso), rank(b.iso)]
      return rankA === rankB ? this._names.get(a.iso)!.localeCompare(this._names.get(b.iso)!, locale) : rankA - rankB
    })
  }

  _createSelect(): HTMLSelectElement {
    const input = this._element
    const size = input.classList.contains('form-control-sm') ? ' form-select-sm' : input.classList.contains('form-control-lg') ? ' form-select-lg' : ''
    const select = document.createElement('select')

    select.className = `form-select${size}`
    select.disabled = input.disabled
    select.setAttribute('aria-label', this._config.countryLabel)

    for (const { iso, dial } of this._countries) {
      const option = Object.assign(document.createElement('option'), { value: iso, textContent: this._names.get(iso), selected: iso === this._country.iso })

      option.dataset.hint = `+${dial}`
      option.dataset.display = `+${dial}`
      option.dataset.customProperties = `<span class='flag flag-xs flag-country-${iso}'></span>`
      select.append(option)
    }

    return select
  }

  _wrap(): HTMLElement {
    const wrapper = Object.assign(document.createElement('div'), { className: 'phone-input' })
    const group = Object.assign(document.createElement('div'), { className: 'input-group phone-input-group' })

    this._element.replaceWith(wrapper)
    group.append(this._element)
    wrapper.append(this._select, group)

    return wrapper
  }

  _createCombobox(): Combobox {
    const combobox = new Combobox(this._select, { container: this._config.container, searchPlaceholder: this._config.searchPlaceholder })
    const group = this._element.parentElement!

    group.prepend(combobox._toggle)

    if (combobox._menu.parentElement === this._wrapper) {
      combobox._toggle.after(combobox._menu)
    }

    combobox._menu.classList.add('phone-input-menu')

    return combobox
  }

  _nationalDigits(): string {
    return this._element.value.replace(/\D/g, '').replace(/^0+/, '')
  }

  _pickCountry(dial: string): PhoneCountry | undefined {
    const candidates = this._countries.filter((country) => country.dial === dial)

    if (candidates.length === 0) {
      return undefined
    }

    return candidates.find((country) => country === this._country) ?? candidates.find((country) => country.iso === countryOfDial(dial)) ?? candidates[0]
  }

  _applyCountry(country: PhoneCountry): void {
    const changed = country !== this._country

    this._country = country
    this._select.value = country.iso
    this._combobox.sync()
    this._formatValue()
    this._updateHidden()

    if (changed) {
      EventHandler.trigger(this._element, EVENT_COUNTRY_CHANGE, { country: country.iso, dialCode: country.dial })
    }
  }

  _updateHidden(): void {
    if (this._hidden) {
      this._hidden.value = this.getNumber()
    }
  }

  _onCountryChange = (): void => {
    const country = this._countries.find((item) => item.iso === this._select.value)

    if (country) {
      this._applyCountry(country)
      // the combobox puts the focus back on its own field right after this event
      queueMicrotask(() => this._element.focus())
    }
  }

  _onInput = (): void => {
    const value = this._element.value

    if (this._config.autoDetect && value.trimStart().startsWith('+')) {
      const digits = value.replace(/\D/g, '')

      for (let length = 1; length <= Math.min(MAX_DIAL_LENGTH, digits.length); length++) {
        const country = this._pickCountry(digits.slice(0, length))

        if (country) {
          const rest = digits.slice(length)

          this._applyCountry(country)
          this._element.value = this._config.format && rest && TRUNK_ZERO.has(country.iso) && !rest.startsWith('0') ? `0${rest}` : rest
          break
        }
      }
    } else if (!this._config.format) {
      const cleaned = value.replace(/[^\d\s\-().]/g, '')

      if (cleaned !== value) {
        this._element.value = cleaned
      }
    }

    this._formatValue()
    this._updateHidden()
  }

  // Writes the digits in the way people write numbers in the chosen country and keeps the cursor next to the same digit.
  _formatValue(): void {
    if (!this._config.format) {
      return
    }

    const input = this._element
    const value = input.value

    // a dial code that is still being typed stays as it is
    if (value.trimStart().startsWith('+')) {
      return
    }

    const caret = input.selectionStart ?? value.length
    const digitsBefore = value.slice(0, caret).replace(/\D/g, '').length
    const formatted = formatNumber(value.replace(/\D/g, ''), formatOfCountry(this._country.iso))

    if (formatted === value) {
      return
    }

    input.value = formatted

    if (document.activeElement === input) {
      let position = 0

      for (let seen = 0; position < formatted.length && seen < digitsBefore; position++) {
        seen += /\d/.test(formatted[position]) ? 1 : 0
      }

      input.setSelectionRange(position, position)
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start phone-input-init
initAll(SELECTOR_DATA_TOGGLE, PhoneInput)
// js-docs-end phone-input-init

export default PhoneInput
