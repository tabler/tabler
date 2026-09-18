/**
 * --------------------------------------------------------------------------
 * Tabler datepicker.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import type { Calendar, DateAny, DateMode, DatesArr, MonthsCount, Options, PositionToInput, Range, WeekDayID } from 'vanilla-calendar-pro'
import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { isDisabled } from './bootstrap/util/index'
import type { ElementSelector } from './bootstrap/types'

/**
 * Constants
 */

const NAME = 'datepicker'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_CHANGE = `change${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_FOCUSIN_DATA_API = `focusin${EVENT_KEY}${DATA_API_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="datepicker"], [data-tblr-toggle="datepicker"]'
const SELECTOR_DISPLAY = '[data-bs-datepicker-display], [data-tblr-datepicker-display]'
const SELECTOR_INPUT_WRAPPER = '.input-icon, .input-group'
const SELECTOR_BOUND_INPUT = 'input[type="hidden"], input[name]'

const HIDE_DELAY = 100 // ms delay before hiding after selection

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

// The date, weekday, month-count and placement options are handed straight to
// Vanilla Calendar Pro, so they use its own literal unions rather than the wider
// `string` / `number`. That keeps a bad value a compile error here instead of a
// silent no-op inside the calendar.
type ComponentConfig = {
  /** 'light', 'dark' or 'auto' for the popup only; null inherits from the nearest `[data-bs-theme]` */
  datepickerTheme: string | null
  dateMin: DateAny | null
  dateMax: DateAny | null
  /** `Intl.DateTimeFormat` options, or a function(date, locale) returning the text shown in the field */
  dateFormat: Intl.DateTimeFormatOptions | ((date: Date, locale: string | undefined) => string) | null
  /** element that shows the formatted date; a button uses itself or its `[data-bs-datepicker-display]` child */
  displayElement: string | HTMLElement | boolean | null
  displayMonthsCount: MonthsCount
  /** 0 = Sunday, 1 = Monday */
  firstWeekday: WeekDayID
  /** render the calendar in place instead of a popup */
  inline: boolean
  locale: string
  /** element the popup is aligned with; defaults to the `.input-icon` / `.input-group` wrapper or the element */
  positionElement: string | HTMLElement | null
  /** preselected dates as `YYYY-MM-DD` */
  selectedDates: string[]
  selectionMode: DateMode
  placement: PositionToInput
  /** pass-through for any Vanilla Calendar Pro option */
  vcpOptions: Options
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

type ChangeEventArgs = { dates: string[]; event: MouseEvent }

const Default: ComponentConfig = {
  datepickerTheme: null,
  dateMin: null,
  dateMax: null,
  dateFormat: null,
  displayElement: null,
  displayMonthsCount: 1,
  firstWeekday: 1,
  inline: false,
  locale: 'default',
  positionElement: null,
  selectedDates: [],
  selectionMode: 'single',
  placement: 'left',
  vcpOptions: {},
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  datepickerTheme: '(null|string)',
  dateMin: '(null|string|number|object)',
  dateMax: '(null|string|number|object)',
  dateFormat: '(null|object|function)',
  displayElement: '(null|string|element|boolean)',
  displayMonthsCount: 'number',
  firstWeekday: 'number',
  inline: 'boolean',
  locale: 'string',
  positionElement: '(null|string|element)',
  selectedDates: 'array',
  selectionMode: 'string',
  placement: 'string',
  vcpOptions: 'object',
}

/**
 * Class definition
 *
 * Wraps Vanilla Calendar Pro (https://vanilla-calendar.pro), loaded separately
 * as `window.VanillaCalendarPro`. Without the plugin the component is inert.
 * Same options, methods and events as Bootstrap 6's Datepicker, so markup
 * written for one works with the other.
 */

class Datepicker extends BaseComponent {
  declare _element: HTMLElement & { value: string }
  declare _config: ComponentConfig
  _calendar: Calendar | null = null
  _isShown = false
  _isInput = false
  _isInline = false
  _boundInput: HTMLInputElement | null = null
  _positionElement: HTMLElement | null = null
  _displayElement: HTMLElement | false | null = null
  _themeObserver: MutationObserver | null = null
  _onFocusIn: ((event: Event) => void) | null = null
  // The plugin builds a popup lazily, so its context has no selection until
  // the first show; this mirror answers `getSelectedDates()` before that.
  _selectedDates: string[] = []

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element || !window.VanillaCalendarPro) {
      return
    }

    this._initCalendar()
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

  /** The Vanilla Calendar Pro instance, for options the component does not expose. */
  get calendar(): Calendar | null {
    return this._calendar
  }

  // Public
  toggle(): Promise<void> {
    if (this._config.inline) {
      return Promise.resolve() // Inline calendars are always visible
    }

    return this._isShown ? this.hide() : this.show()
  }

  async show(): Promise<void> {
    if (this._config.inline) {
      return // Inline calendars are always visible
    }

    if (!this._calendar || isDisabled(this._element) || this._isShown) {
      return
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW)
    if (showEvent?.defaultPrevented) {
      return
    }

    this._calendar.show()
    this._isShown = true

    EventHandler.trigger(this._element, EVENT_SHOWN)
  }

  async hide(): Promise<void> {
    if (this._config.inline) {
      return // Inline calendars are always visible
    }

    if (!this._calendar || !this._isShown) {
      return
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)
    if (hideEvent?.defaultPrevented) {
      return
    }

    this._calendar.hide()
    this._isShown = false

    EventHandler.trigger(this._element, EVENT_HIDDEN)
  }

  dispose(): void {
    this._themeObserver?.disconnect()

    if (this._onFocusIn) {
      EventHandler.off(document, EVENT_FOCUSIN, this._onFocusIn)
    }

    this._calendar?.destroy()

    super.dispose()
  }

  getSelectedDates(): string[] {
    const dates = this._calendar?.context?.selectedDates
    return dates && dates.length > 0 ? [...dates] : [...this._selectedDates]
  }

  setSelectedDates(dates: DatesArr): void {
    this._selectedDates = dates.map(String)
    this._calendar?.set({ selectedDates: dates })
  }

  // Private
  _initCalendar(): void {
    this._isInput = this._element.tagName === 'INPUT'
    this._isInline = this._config.inline

    // For inline mode, look for a hidden input child to bind to
    if (this._isInline && !this._isInput) {
      this._boundInput = SelectorEngine.findOne(SELECTOR_BOUND_INPUT, this._element) as HTMLInputElement | null
    }

    this._positionElement = this._resolvePositionElement()
    this._displayElement = this._resolveDisplayElement()
    this._selectedDates = [...this._config.selectedDates]

    // The calendar always attaches to the element itself. The plugin closes on
    // any click whose target is not exactly its input, so handing it a wrapper
    // makes a click on the field inside close and reopen the popup. The popup
    // is aligned with the position element after each show instead.
    this._calendar = new window.VanillaCalendarPro!.Calendar(this._element, this._buildCalendarOptions())
    this._calendar.init()

    // An inline calendar renders into the element and drops its children, so
    // the bound input moves right after it to stay in the form.
    if (this._boundInput && !this._boundInput.isConnected) {
      this._element.after(this._boundInput)
    }

    // Watch for theme changes on ancestor elements (for live theme switching)
    this._setupThemeObserver()

    this._setupDismissOnFocus()

    // Set initial value if input has a value
    if (this._isInput && this._element.value) {
      this._parseInputValue()
    }

    // Populate input/display with preselected dates
    this._updateDisplayWithSelectedDates()
  }

  _updateDisplayWithSelectedDates(): void {
    const { selectedDates } = this._config
    if (!selectedDates || selectedDates.length === 0) {
      return
    }

    this._writeSelection(selectedDates)
  }

  _writeSelection(selectedDates: string[]): void {
    const formattedDate = this._formatDateForInput(selectedDates)

    if (this._isInput) {
      this._element.value = formattedDate
    }

    if (this._boundInput) {
      this._boundInput.value = selectedDates.join(',')
    }

    if (this._displayElement) {
      this._displayElement.textContent = formattedDate
    }
  }

  _resolvePositionElement(): HTMLElement {
    let { positionElement } = this._config

    if (typeof positionElement === 'string') {
      positionElement = SelectorEngine.findOne(positionElement)
    }

    // Use the input's wrapper when it sits in an icon or group wrapper
    if (!positionElement && this._isInput && !this._isInline) {
      positionElement = this._element.closest<HTMLElement>(SELECTOR_INPUT_WRAPPER)
    }

    return positionElement || this._element
  }

  _resolveDisplayElement(): HTMLElement | false | null {
    const { displayElement } = this._config

    if (typeof displayElement === 'string') {
      return SelectorEngine.findOne(displayElement)
    }

    // For buttons/non-inputs (not inline), look for a display child
    if (displayElement === true || (displayElement === null && !this._isInput && !this._isInline)) {
      return SelectorEngine.findOne(SELECTOR_DISPLAY, this._element) || this._element
    }

    return displayElement
  }

  // The plugin positions the popup against the element; a wrapper such as
  // `.input-icon` or `.input-group` wants the popup aligned with its own edges.
  _alignToPositionElement(): void {
    const mainElement = this._calendar?.context?.mainElement
    if (!mainElement || this._isInline || !this._positionElement || this._positionElement === this._element) {
      return
    }

    const anchor = this._positionElement.getBoundingClientRect()
    const popup = mainElement.getBoundingClientRect()
    let { placement } = this._config

    if (placement === 'auto') {
      placement = anchor.left + popup.width > document.documentElement.clientWidth ? 'right' : 'left'
    }

    const left = placement === 'right' ? anchor.right - popup.width : placement === 'center' ? anchor.left + (anchor.width - popup.width) / 2 : anchor.left

    mainElement.style.left = `${left + window.scrollX}px`
  }

  _getThemeAncestor(): Element | null {
    return this._element.closest('[data-bs-theme]')
  }

  _getEffectiveTheme(): string | null {
    // Priority: explicit datepickerTheme config > inherited from ancestor > none
    const { datepickerTheme } = this._config
    if (datepickerTheme) {
      return datepickerTheme
    }

    return this._getThemeAncestor()?.getAttribute('data-bs-theme') || null
  }

  _syncThemeAttribute(element: HTMLElement | undefined): void {
    if (!element) {
      return
    }

    const theme = this._getEffectiveTheme()

    if (theme) {
      // Copy the theme to the popup: the plugin appends it to <body>, which
      // breaks inheritance from a themed container.
      element.setAttribute('data-bs-theme', theme)
    } else {
      element.removeAttribute('data-bs-theme')
    }
  }

  _setupThemeObserver(): void {
    const ancestor = this._getThemeAncestor()
    if (!ancestor || this._config.datepickerTheme) {
      // No ancestor to watch, or explicit datepickerTheme overrides
      return
    }

    this._themeObserver = new MutationObserver(() => {
      this._syncThemeAttribute(this._calendar?.context?.mainElement)
    })

    this._themeObserver.observe(ancestor, {
      attributes: true,
      attributeFilter: ['data-bs-theme'],
    })
  }

  // The plugin ignores focus and mounts the popup on <body>, so close it
  // ourselves when focus leaves both the element and the calendar.
  _setupDismissOnFocus(): void {
    if (this._isInline) {
      return
    }

    this._onFocusIn = (event: Event): void => {
      if (!this._isShown) {
        return
      }

      const { target } = event
      const mainElement = this._calendar?.context?.mainElement

      if (target instanceof Node && (this._element.contains(target) || mainElement?.contains(target))) {
        return
      }

      this.hide()
    }

    EventHandler.on(document, EVENT_FOCUSIN, this._onFocusIn)
  }

  _buildCalendarOptions(): Options {
    // The plugin uses 'system' for auto-detection, Bootstrap and Tabler use 'auto'
    const theme = this._getEffectiveTheme()
    const vcpTheme = !theme || theme === 'auto' ? 'system' : theme

    const calendarOptions: Options = {
      ...this._config.vcpOptions,
      inputMode: !this._isInline,
      positionToInput: this._config.placement,
      firstWeekday: this._config.firstWeekday,
      locale: this._config.locale,
      selectionDatesMode: this._config.selectionMode,
      selectedDates: this._config.selectedDates,
      displayMonthsCount: this._config.displayMonthsCount,
      type: this._config.displayMonthsCount > 1 ? 'multiple' : 'default',
      selectedTheme: vcpTheme,
      themeAttrDetect: '[data-bs-theme]',
      onClickDate: (self, event) => this._handleDateClick(self, event),
      onInit: (self) => {
        this._syncThemeAttribute(self.context.mainElement)
      },
      onShow: () => {
        if (!this._calendar) {
          return
        }

        this._isShown = true
        this._syncThemeAttribute(this._calendar.context.mainElement)
        this._alignToPositionElement()
      },
      onHide: () => {
        this._isShown = false
      },
    }

    // Navigate to the month of the first selected date
    const [firstSelected] = this._config.selectedDates
    if (firstSelected) {
      const firstDate = this._parseDate(firstSelected)
      // `getMonth()` is always 0-11, which TypeScript cannot narrow on its own
      calendarOptions.selectedMonth = firstDate.getMonth() as Range<12>
      calendarOptions.selectedYear = firstDate.getFullYear()
    }

    if (this._config.dateMin) {
      calendarOptions.dateMin = this._config.dateMin
    }

    if (this._config.dateMax) {
      calendarOptions.dateMax = this._config.dateMax
    }

    return calendarOptions
  }

  _handleDateClick(self: Calendar, event: MouseEvent): void {
    const selectedDates = [...self.context.selectedDates]
    this._selectedDates = selectedDates

    if (selectedDates.length > 0) {
      this._writeSelection(selectedDates)
    }

    const args: ChangeEventArgs = { dates: selectedDates, event }
    EventHandler.trigger(this._element, EVENT_CHANGE, args)

    this._maybeHideAfterSelection(selectedDates)
  }

  _maybeHideAfterSelection(selectedDates: string[]): void {
    if (this._isInline) {
      return
    }

    const shouldHide = (this._config.selectionMode === 'single' && selectedDates.length > 0) || (this._config.selectionMode === 'multiple-ranged' && selectedDates.length >= 2)

    if (shouldHide) {
      setTimeout(() => this.hide(), HIDE_DELAY)
    }
  }

  _parseDate(dateStr: string): Date {
    const [year = 0, month = 1, day = 1] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  _formatDate(dateStr: string): string {
    const date = this._parseDate(dateStr)
    const locale = this._config.locale === 'default' ? undefined : this._config.locale
    const { dateFormat } = this._config

    // Custom function formatter
    if (typeof dateFormat === 'function') {
      return dateFormat(date, locale)
    }

    // Intl.DateTimeFormat options object
    if (dateFormat && typeof dateFormat === 'object') {
      return new Intl.DateTimeFormat(locale, dateFormat).format(date)
    }

    // Default: locale-aware formatting
    return date.toLocaleDateString(locale)
  }

  _formatDateForInput(dates: string[]): string {
    if (dates.length === 0) {
      return ''
    }

    if (dates.length === 1) {
      return this._formatDate(dates[0]!)
    }

    // For date ranges, use en-dash; for multiple dates, use comma
    const separator = this._config.selectionMode === 'multiple-ranged' ? ' – ' : ', '
    return dates.map((date) => this._formatDate(date)).join(separator)
  }

  _parseInputValue(): void {
    const value = this._element.value.trim()
    if (!value) {
      return
    }

    // `YYYY-MM-DD` is read as a local date: `new Date('2020-06-20')` would be
    // UTC midnight and land on the previous day west of Greenwich.
    const date = DATE_PATTERN.test(value) ? this._parseDate(value) : new Date(value)
    if (Number.isNaN(date.getTime())) {
      return
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    this._selectedDates = [`${year}-${month}-${day}`]
    this._calendar?.set({ selectedDates: this._selectedDates })
  }
}

/**
 * Data API implementation
 */

// js-docs-start datepicker-init
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement, event: Event) {
  // Inputs open on focus, and inline calendars are always visible
  if (this.tagName === 'INPUT' || this.dataset.bsInline === 'true' || this.dataset.tblrInline === 'true') {
    return
  }

  event.preventDefault()
  ;(Datepicker.getOrCreateInstance(this) as Datepicker).toggle()
})

EventHandler.on(document, EVENT_FOCUSIN_DATA_API, SELECTOR_DATA_TOGGLE, function (this: HTMLElement) {
  if (this.tagName !== 'INPUT') {
    return
  }

  ;(Datepicker.getOrCreateInstance(this) as Datepicker).show()
})

// Render on load what cannot wait for a focus or a click: inline calendars,
// and fields with preselected dates or a value, so they show it right away.
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  const { dataset } = element
  const eager = dataset.bsInline === 'true' || dataset.tblrInline === 'true' || 'bsSelectedDates' in dataset || 'tblrSelectedDates' in dataset || (element as HTMLInputElement).value

  if (eager) {
    Datepicker.getOrCreateInstance(element)
  }
}
// js-docs-end datepicker-init

export default Datepicker
export type { ComponentConfig as DatepickerConfig, ChangeEventArgs as DatepickerChangeEventArgs }
