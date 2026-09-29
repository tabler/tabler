/**
 * --------------------------------------------------------------------------
 * Bootstrap combobox.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import * as Popper from '@popperjs/core'
import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { eventActionOnPlugin, initAll } from './bootstrap/util/component-functions'
import { getElement, getNextActiveElement, isDisabled, isRTL, isVisible } from './bootstrap/util/index'
import type { DelegatedEvent } from './bootstrap/dom/event-handler'

type ComponentConfig = {
  boundary: Popper.Boundary
  container: string | HTMLElement | null
  maxItems: number | null
  multiple: boolean
  name: string | null
  noResultsText: string
  offset: number[] | string
  placeholder: string
  placement: string | null
  search: boolean | null
  searchNormalize: boolean
  searchPlaceholder: string
  tagsOverflow: 'count' | 'wrap'
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'combobox'
const DATA_KEY = 'bs.combobox'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const ESCAPE_KEY = 'Escape'
const TAB_KEY = 'Tab'
const ARROW_UP_KEY = 'ArrowUp'
const ARROW_DOWN_KEY = 'ArrowDown'
const HOME_KEY = 'Home'
const END_KEY = 'End'
const ENTER_KEY = 'Enter'
const SPACE_KEY = ' '
const BACKSPACE_KEY = 'Backspace'

const EVENT_CHANGE = `change${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_CLICK_OUTSIDE = `click${EVENT_KEY}.outside`
const EVENT_KEYUP_OUTSIDE = `keyup${EVENT_KEY}.outside`

const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_SELECTED = 'selected'
const CLASS_NAME_PLACEHOLDER = 'combobox-placeholder'
const CLASS_NAME_TAGS = 'combobox-tags'
const CLASS_NAME_HAS_TAGS = 'combobox-has-tags'
const CLASS_NAME_HAS_INDICATOR = 'combobox-has-indicator'
const CLASS_NAME_TAGS_WRAP = 'combobox-tags-wrap'
const CLASS_NAME_TAG_MORE = 'combobox-tag-more'
const CLASS_NAME_HIDDEN = 'd-none'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="combobox"]'
const SELECTOR_MENU = '.dropdown-menu'
const SELECTOR_ITEM = '.dropdown-item[data-bs-value]'
const SELECTOR_VISIBLE_ITEMS = `${SELECTOR_ITEM}:not(.disabled):not(:disabled)`
const SELECTOR_ITEM_LABEL = '.dropdown-item-label, .dropdown-item-content > span:first-child'
const SELECTOR_ITEM_INDICATOR = '.dropdown-item-indicator'
const SELECTOR_VALUE = '.combobox-value'
const SELECTOR_SEARCH_INPUT = '.combobox-search-input'
const SELECTOR_NO_RESULTS = '.combobox-no-results'

const CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" class="dropdown-item-check icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10" /></svg>'

const Default: ComponentConfig = {
  boundary: 'clippingParents',
  container: null,
  maxItems: null,
  multiple: false,
  name: null,
  noResultsText: 'No results found',
  offset: [0, 2],
  placeholder: '',
  placement: null,
  search: null,
  searchNormalize: false,
  searchPlaceholder: 'Search…',
  tagsOverflow: 'count',
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  boundary: '(string|element)',
  container: '(string|element|null)',
  maxItems: '(number|null)',
  multiple: 'boolean',
  name: '(string|null)',
  noResultsText: 'string',
  offset: '(array|string)',
  placeholder: 'string',
  placement: '(string|null)',
  search: '(boolean|null)',
  searchNormalize: 'boolean',
  searchPlaceholder: 'string',
  tagsOverflow: 'string',
}

/**
 * Class definition
 *
 * Two modes share one implementation. On a `<button>` the items are written in
 * the markup; on a `<select>` the toggle and the menu are built from its
 * `<option>`s and the select stays in the DOM as the real form field.
 */

class Combobox extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _select: HTMLSelectElement | null
  _toggle: HTMLElement
  _menu: HTMLElement
  _valueDisplay: HTMLElement
  _searchInput: HTMLInputElement | null
  _noResults: HTMLElement | null
  _hiddenInput: HTMLInputElement | null
  _popper: Popper.Instance | null
  _optionByItem: Map<HTMLElement, HTMLOptionElement>
  _isSyncing: boolean
  _resizeObserver: ResizeObserver | null

  constructor(element: HTMLElement | string, config?: ComponentConfigInput) {
    super(element, config)

    this._select = this._element instanceof HTMLSelectElement ? this._element : null
    this._optionByItem = new Map()
    this._hiddenInput = null
    this._popper = null
    this._isSyncing = false
    this._resizeObserver = null

    if (this._select) {
      this._toggle = this._createToggle(this._select)
      this._valueDisplay = SelectorEngine.findOne(SELECTOR_VALUE, this._toggle) as HTMLElement
      this._menu = document.createElement('div')
      this._menu.className = 'dropdown-menu'
      this._noResults = null
      this._searchInput = null
      this._buildMenu()
      this._select.after(this._toggle)
      this._toggle.after(this._menu)
    } else {
      this._toggle = this._element
      this._menu = (SelectorEngine.next(this._toggle, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._toggle.parentNode as Element)) as HTMLElement
      this._valueDisplay = SelectorEngine.findOne(SELECTOR_VALUE, this._toggle) as HTMLElement
      this._searchInput = SelectorEngine.findOne(SELECTOR_SEARCH_INPUT, this._menu) as HTMLInputElement | null
      this._noResults = SelectorEngine.findOne(SELECTOR_NO_RESULTS, this._menu)
      this._createHiddenInput()
    }

    this._menu.classList.add('combobox-menu')

    const container = this._config.container ? getElement(this._config.container) : null
    container?.append(this._menu)

    this._setAriaAttributes()
    this._syncInitialSelection()
    this._addEventListeners()
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
  toggle(): void {
    this._isShown() ? this.hide() : this.show()
  }

  show(): void {
    if (isDisabled(this._toggle) || this._isShown()) {
      return
    }

    if (EventHandler.trigger(this._element, EVENT_SHOW)?.defaultPrevented) {
      return
    }

    this._menu.style.minWidth = `${this._toggle.offsetWidth}px`
    this._popper = Popper.createPopper(this._toggle, this._menu, this._getPopperConfig())

    this._menu.classList.add(CLASS_NAME_SHOW)
    this._toggle.classList.add(CLASS_NAME_SHOW)
    this._toggle.setAttribute('aria-expanded', 'true')

    if (this._searchInput) {
      this._searchInput.value = ''
      this._filterItems('')
      this._searchInput.focus()
    }

    this._addOutsideListeners()
    EventHandler.trigger(this._element, EVENT_SHOWN)
  }

  hide(): void {
    if (!this._isShown()) {
      return
    }

    if (EventHandler.trigger(this._element, EVENT_HIDE)?.defaultPrevented) {
      return
    }

    this._popper?.destroy()
    this._popper = null

    this._menu.classList.remove(CLASS_NAME_SHOW)
    this._toggle.classList.remove(CLASS_NAME_SHOW)
    this._toggle.setAttribute('aria-expanded', 'false')

    this._removeOutsideListeners()
    EventHandler.trigger(this._element, EVENT_HIDDEN)
  }

  update(): void {
    this._popper?.update()
  }

  // Rebuilds the menu from the `<select>` after its options changed, or re-reads its value after it was set from code.
  refresh(): void {
    if (!this._select) {
      return
    }

    this._buildMenu()
    this._syncInitialSelection()
  }

  dispose(): void {
    this._popper?.destroy()
    this._removeOutsideListeners()
    this._hiddenInput?.remove()
    this._hiddenInput = null

    EventHandler.off(this._menu, EVENT_KEY)
    EventHandler.off(this._toggle, EVENT_KEY)
    this._searchInput?.removeEventListener('input', this._onSearchInput)
    this._resizeObserver?.disconnect()

    if (this._select) {
      this._select.removeEventListener('change', this._onNativeChange)
      this._select.removeEventListener('focus', this._onNativeFocus)
      this._select.classList.remove('combobox-native')
      this._select.removeAttribute('aria-hidden')
      this._select.removeAttribute('tabindex')
      this._toggle.remove()
      this._menu.remove()
    }

    super.dispose()
  }

  // Private
  _isShown(): boolean {
    return this._menu.classList.contains(CLASS_NAME_SHOW)
  }

  _isMultipleTags(): boolean {
    return this._select !== null && this._config.multiple
  }

  _getPopperConfig(): Partial<Popper.Options> {
    const { boundary, container, offset, placement } = this._config

    return {
      placement: (placement || (isRTL() ? 'bottom-end' : 'bottom-start')) as Popper.Placement,
      strategy: container ? 'fixed' : 'absolute',
      modifiers: [
        { name: 'preventOverflow', options: { boundary } },
        {
          name: 'offset',
          options: { offset: typeof offset === 'string' ? offset.split(',').map((value) => Number.parseInt(value, 10)) : offset },
        },
      ],
    }
  }

  _createToggle(select: HTMLSelectElement): HTMLElement {
    const multiple = select.multiple
    const toggle = document.createElement('button')

    toggle.type = 'button'
    toggle.className = `${select.className} form-select combobox-toggle`
    toggle.append(Object.assign(document.createElement('span'), { className: 'combobox-value' }))

    if (select.disabled) {
      toggle.disabled = true
    }

    const label = select.id ? document.querySelector(`label[for="${CSS.escape(select.id)}"]`) : null

    if (label) {
      label.id ||= `${select.id}-label`
      toggle.setAttribute('aria-labelledby', label.id)
    } else if (select.hasAttribute('aria-label')) {
      toggle.setAttribute('aria-label', select.getAttribute('aria-label')!)
    }

    select.classList.add('combobox-native')
    select.tabIndex = -1
    select.setAttribute('aria-hidden', 'true')

    const emptyOption = Array.from(select.options).find((option) => option.value === '')
    this._config.multiple = multiple
    this._config.placeholder ||= select.dataset.placeholder || ''

    if (this._config.placeholder && !multiple && !Array.from(select.options).some((option) => option.defaultSelected)) {
      select.selectedIndex = -1
    }

    this._config.placeholder ||= emptyOption?.textContent?.trim() || ''

    return toggle
  }

  _buildMenu(): void {
    const select = this._select!
    const menu = this._menu

    for (const element of SelectorEngine.find(`${SELECTOR_ITEM}, .dropdown-header`, menu)) {
      element.remove()
    }

    this._optionByItem.clear()

    const anchor = this._noResults ?? null

    for (const child of Array.from(select.children)) {
      if (child instanceof HTMLOptGroupElement) {
        const header = Object.assign(document.createElement('div'), { className: 'dropdown-header', textContent: child.label })
        menu.insertBefore(header, anchor)

        for (const option of Array.from(child.children)) {
          this._appendOption(option as HTMLOptionElement, child.disabled, anchor)
        }
      } else if (child instanceof HTMLOptionElement) {
        this._appendOption(child, false, anchor)
      }
    }

    if (!this._searchInput && this._config.search !== false) {
      this._createSearch()
    }
  }

  _appendOption(option: HTMLOptionElement, groupDisabled: boolean, anchor: Element | null): void {
    if (option.value === '') {
      return
    }

    const item = document.createElement('button')
    item.type = 'button'
    item.className = 'dropdown-item'
    item.dataset.bsValue = option.value
    item.disabled = option.disabled || groupDisabled

    const custom = option.dataset.customProperties

    if (custom) {
      const indicator = document.createElement('span')
      indicator.className = 'dropdown-item-indicator'
      indicator.innerHTML = custom
      item.append(indicator)
    }

    item.append(Object.assign(document.createElement('span'), { className: 'dropdown-item-label', textContent: option.textContent }))
    item.insertAdjacentHTML('beforeend', CHECK_ICON)

    this._menu.insertBefore(item, anchor)
    this._optionByItem.set(item, option)
  }

  _createSearch(): void {
    const wrapper = Object.assign(document.createElement('div'), { className: 'combobox-search' })
    const input = Object.assign(document.createElement('input'), {
      type: 'text',
      className: 'form-control combobox-search-input',
      placeholder: this._config.searchPlaceholder,
      autocomplete: 'off',
    })
    input.setAttribute('aria-label', this._config.searchPlaceholder)
    wrapper.append(input)
    this._menu.prepend(wrapper)

    this._noResults = Object.assign(document.createElement('div'), {
      className: `combobox-no-results ${CLASS_NAME_HIDDEN}`,
      textContent: this._config.noResultsText,
    })
    this._menu.append(this._noResults)
    this._searchInput = input
    input.addEventListener('input', this._onSearchInput)
  }

  _setAriaAttributes(): void {
    this._toggle.setAttribute('aria-haspopup', 'listbox')
    this._toggle.setAttribute('aria-expanded', 'false')
    this._menu.setAttribute('role', 'listbox')

    if (this._config.multiple) {
      this._menu.setAttribute('aria-multiselectable', 'true')
    }

    for (const item of SelectorEngine.find(SELECTOR_ITEM, this._menu)) {
      item.setAttribute('role', 'option')

      if (!item.hasAttribute('aria-selected')) {
        item.setAttribute('aria-selected', String(item.classList.contains(CLASS_NAME_SELECTED)))
      }

      if (item.hasAttribute('disabled')) {
        item.setAttribute('aria-disabled', 'true')
      }
    }
  }

  _createHiddenInput(): void {
    const { name } = this._config

    if (!name) {
      return
    }

    this._hiddenInput = document.createElement('input')
    this._hiddenInput.type = 'hidden'
    this._hiddenInput.name = name
    this._toggle.before(this._hiddenInput)
  }

  _syncInitialSelection(): void {
    if (this._select) {
      for (const [item, option] of this._optionByItem) {
        const selected = option.selected && option.value !== ''
        item.classList.toggle(CLASS_NAME_SELECTED, selected)
        item.setAttribute('aria-selected', String(selected))
      }

      this._setAriaAttributes()
    }

    this._updateToggleText()
    this._updateHiddenInput()
  }

  _onNativeChange = (): void => {
    if (!this._isSyncing) {
      this._syncInitialSelection()
    }
  }

  _onNativeFocus = (): void => {
    this._toggle.focus()
  }

  _onSearchInput = (): void => {
    this._filterItems(this._searchInput!.value)
  }

  _addEventListeners(): void {
    EventHandler.on(this._menu, EVENT_CLICK, SELECTOR_ITEM, (event: DelegatedEvent<MouseEvent>) => {
      const item = event.delegateTarget as HTMLElement

      if (isDisabled(item)) {
        return
      }

      event.preventDefault()
      this._selectItem(item)
    })

    EventHandler.on(this._toggle, EVENT_KEYDOWN, (event: KeyboardEvent) => this._handleToggleKeydown(event))
    EventHandler.on(this._menu, EVENT_KEYDOWN, (event: KeyboardEvent) => this._handleMenuKeydown(event))

    this._searchInput?.addEventListener('input', this._onSearchInput)

    if (this._config.multiple && typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => this._layoutValue())
      this._resizeObserver.observe(this._valueDisplay)
    }

    if (this._select) {
      this._select.addEventListener('change', this._onNativeChange)
      this._select.addEventListener('focus', this._onNativeFocus)

      EventHandler.on(this._toggle, EVENT_CLICK, () => this.toggle())
    }
  }

  _onOutsideClick = (event: MouseEvent): void => {
    const path = event.composedPath()

    if (!path.includes(this._toggle) && !path.includes(this._menu)) {
      this.hide()
    }
  }

  _onOutsideKeyup = (event: KeyboardEvent): void => {
    if (event.key === TAB_KEY && !this._menu.contains(document.activeElement) && document.activeElement !== this._toggle) {
      this.hide()
    }
  }

  _addOutsideListeners(): void {
    EventHandler.on(document, EVENT_CLICK_OUTSIDE, this._onOutsideClick)
    EventHandler.on(document, EVENT_KEYUP_OUTSIDE, this._onOutsideKeyup)
  }

  _removeOutsideListeners(): void {
    EventHandler.off(document, EVENT_CLICK_OUTSIDE, this._onOutsideClick)
    EventHandler.off(document, EVENT_KEYUP_OUTSIDE, this._onOutsideKeyup)
  }

  _selectItem(item: HTMLElement): void {
    const { maxItems, multiple } = this._config

    if (multiple) {
      const selected = !item.classList.contains(CLASS_NAME_SELECTED)

      if (selected && maxItems !== null && this._getSelectedItems().length >= maxItems) {
        return
      }

      item.classList.toggle(CLASS_NAME_SELECTED, selected)
      item.setAttribute('aria-selected', String(selected))
    } else {
      for (const previous of this._getSelectedItems()) {
        previous.classList.remove(CLASS_NAME_SELECTED)
        previous.setAttribute('aria-selected', 'false')
      }

      item.classList.add(CLASS_NAME_SELECTED)
      item.setAttribute('aria-selected', 'true')
    }

    this._commit(item)

    if (!multiple) {
      this.hide()
      this._toggle.focus()
    }
  }

  _removeValue(value: string): void {
    const item = SelectorEngine.find(SELECTOR_ITEM, this._menu).find((element) => element.dataset.bsValue === value)

    if (item?.classList.contains(CLASS_NAME_SELECTED)) {
      item.classList.remove(CLASS_NAME_SELECTED)
      item.setAttribute('aria-selected', 'false')
      this._commit(item)
    }
  }

  _removeLastValue(): void {
    const selected = this._getSelectedItems()
    const last = selected[selected.length - 1]

    if (last) {
      this._removeValue(last.dataset.bsValue!)
    }
  }

  _commit(item: HTMLElement): void {
    this._updateToggleText()
    this._updateHiddenInput()

    if (this._select) {
      for (const [element, option] of this._optionByItem) {
        option.selected = element.classList.contains(CLASS_NAME_SELECTED)
      }
    }

    const selectedValues = this._getSelectedItems().map((element) => element.dataset.bsValue)

    this._isSyncing = true
    EventHandler.trigger(this._element, EVENT_CHANGE, {
      value: this._config.multiple ? selectedValues : item.dataset.bsValue,
      item,
    })

    if (this._select) {
      this._select.dispatchEvent(new Event('change', { bubbles: true }))
    }

    this._isSyncing = false
    this._popper?.update()
  }

  _getItemLabel(item: HTMLElement): string {
    const label = SelectorEngine.findOne(SELECTOR_ITEM_LABEL, item)
    return (label ?? item).textContent!.trim()
  }

  _labelNodes(item: HTMLElement): Node[] {
    const nodes: Node[] = []
    const indicator = SelectorEngine.findOne(SELECTOR_ITEM_INDICATOR, item)

    if (indicator) {
      nodes.push(indicator.cloneNode(true))
    }

    nodes.push(Object.assign(document.createElement('span'), { className: 'text-truncate', textContent: this._getItemLabel(item) }))

    for (const addon of SelectorEngine.children(item, 'kbd, .badge')) {
      nodes.push(addon.cloneNode(true))
    }

    return nodes
  }

  _updateToggleText(): void {
    const selectedItems = this._getSelectedItems()

    if (selectedItems.length === 0) {
      this._showPlaceholder()
      return
    }

    this._valueDisplay.classList.remove(CLASS_NAME_PLACEHOLDER)
    this._valueDisplay.classList.toggle(CLASS_NAME_TAGS, this._isMultipleTags())
    this._valueDisplay.classList.toggle(CLASS_NAME_TAGS_WRAP, this._isMultipleTags() && this._config.tagsOverflow === 'wrap')
    this._toggle.classList.toggle(CLASS_NAME_HAS_TAGS, this._isMultipleTags())
    this._toggle.classList.remove(CLASS_NAME_HAS_INDICATOR)

    if (this._isMultipleTags()) {
      this._valueDisplay.replaceChildren(...selectedItems.map((item) => this._createTag(item)))
      this._layoutTags()
    } else if (this._config.multiple) {
      this._valueDisplay.replaceChildren(Object.assign(document.createElement('span'), { className: 'text-truncate' }))
      this._layoutList(selectedItems.map((item) => this._getItemLabel(item)))
    } else {
      this._valueDisplay.replaceChildren(...this._labelNodes(selectedItems[0]))
      this._toggle.classList.toggle(CLASS_NAME_HAS_INDICATOR, this._valueDisplay.querySelector(SELECTOR_ITEM_INDICATOR) !== null)
    }
  }

  _layoutValue(): void {
    if (this._isMultipleTags()) {
      this._layoutTags()
    } else if (this._config.multiple) {
      this._layoutList(this._getSelectedItems().map((item) => this._getItemLabel(item)))
    }
  }

  // Lists the labels separated by commas and, when they do not fit, ends with "and N more".
  _layoutList(labels: string[]): void {
    const text = SelectorEngine.findOne('.text-truncate', this._valueDisplay)

    if (!text || labels.length === 0) {
      return
    }

    text.textContent = labels.join(', ')

    if (labels.length < 2 || text.clientWidth === 0 || text.scrollWidth <= text.clientWidth) {
      return
    }

    for (let shown = labels.length - 1; shown >= 1; shown--) {
      text.textContent = `${labels.slice(0, shown).join(', ')} and ${labels.length - shown} more`

      if (text.scrollWidth <= text.clientWidth) {
        return
      }
    }
  }

  // Keeps the tags on one line: the ones that do not fit are hidden and a "+N" tag counts them.
  _layoutTags(): void {
    if (!this._isMultipleTags() || this._config.tagsOverflow !== 'count') {
      return
    }

    const container = this._valueDisplay
    const tags = SelectorEngine.find('.combobox-tag', container)

    SelectorEngine.findOne(`.${CLASS_NAME_TAG_MORE}`, container)?.remove()

    for (const tag of tags) {
      tag.classList.remove(CLASS_NAME_HIDDEN)
    }

    if (tags.length < 2 || container.clientWidth === 0 || container.scrollWidth <= container.clientWidth) {
      return
    }

    const more = Object.assign(document.createElement('span'), { className: `tag ${CLASS_NAME_TAG_MORE}` })
    container.append(more)

    let hidden = 0

    while (hidden < tags.length - 1 && container.scrollWidth > container.clientWidth) {
      tags[tags.length - 1 - hidden].classList.add(CLASS_NAME_HIDDEN)
      hidden++
      more.textContent = `+${hidden}`
      more.title = `${hidden} more selected`
    }
  }

  _createTag(item: HTMLElement): HTMLElement {
    const tag = Object.assign(document.createElement('span'), { className: 'tag combobox-tag' })

    tag.append(...this._labelNodes(item))
    return tag
  }

  _showPlaceholder(): void {
    this._valueDisplay.classList.remove(CLASS_NAME_TAGS)
    this._toggle.classList.remove(CLASS_NAME_HAS_TAGS, CLASS_NAME_HAS_INDICATOR)
    this._valueDisplay.classList.add(CLASS_NAME_PLACEHOLDER)
    this._valueDisplay.replaceChildren(this._config.placeholder)
  }

  _updateHiddenInput(): void {
    if (!this._hiddenInput) {
      return
    }

    const values = this._getSelectedItems().map((element) => element.dataset.bsValue)
    this._hiddenInput.value = this._config.multiple ? values.join(',') : (values[0] ?? '')
  }

  _getSelectedItems(): HTMLElement[] {
    return SelectorEngine.find(`${SELECTOR_ITEM}.${CLASS_NAME_SELECTED}`, this._menu)
  }

  _getVisibleItems(): HTMLElement[] {
    return SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((item) => isVisible(item))
  }

  _filterItems(query: string): void {
    const normalizedQuery = this._normalizeText(query.toLowerCase().trim())
    let visibleCount = 0
    let header: HTMLElement | null = null
    let headerHasMatch = false

    for (const element of Array.from(this._menu.children) as HTMLElement[]) {
      if (element.matches('.dropdown-header')) {
        header?.style.setProperty('display', headerHasMatch ? '' : 'none')
        header = element
        headerHasMatch = false
      } else if (element.matches(SELECTOR_ITEM)) {
        const matches = !normalizedQuery || this._normalizeText(element.textContent!.toLowerCase().trim()).includes(normalizedQuery)
        element.style.display = matches ? '' : 'none'

        if (matches) {
          visibleCount++
          headerHasMatch = true
        }
      }
    }

    header?.style.setProperty('display', headerHasMatch ? '' : 'none')

    this._noResults?.classList.toggle(CLASS_NAME_HIDDEN, visibleCount > 0)
    this._popper?.update()
  }

  _normalizeText(text: string): string {
    return this._config.searchNormalize ? text.normalize('NFD').replace(/[̀-ͯ]/g, '') : text
  }

  _focusItem(items: HTMLElement[], index: 'first' | 'last'): void {
    if (items.length > 0) {
      items[index === 'first' ? 0 : items.length - 1].focus()
    }
  }

  _handleToggleKeydown(event: KeyboardEvent): void {
    const { key } = event

    if (key === ARROW_DOWN_KEY || key === ARROW_UP_KEY) {
      event.preventDefault()
      this.show()
      this._focusItem(this._getVisibleItems(), key === ARROW_DOWN_KEY ? 'first' : 'last')
      return
    }

    if ((key === ENTER_KEY || key === SPACE_KEY) && !this._isShown()) {
      event.preventDefault()
      this.show()
      return
    }

    if (key === BACKSPACE_KEY && this._isMultipleTags()) {
      event.preventDefault()
      this._removeLastValue()
      return
    }

    if (this._searchInput && key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && !this._isShown()) {
      event.preventDefault()
      this.show()
      this._searchInput.value = key
      this._filterItems(key)
    }
  }

  _handleMenuKeydown(event: KeyboardEvent): void {
    const { key } = event
    const target = event.target as HTMLElement

    if (key === ESCAPE_KEY) {
      event.preventDefault()
      event.stopPropagation()
      this.hide()
      this._toggle.focus()
      return
    }

    if (key === TAB_KEY) {
      this.hide()
      return
    }

    if (key === BACKSPACE_KEY && target === this._searchInput && this._searchInput.value === '' && this._isMultipleTags()) {
      this._removeLastValue()
      return
    }

    const items = this._getVisibleItems()

    if (key === ARROW_DOWN_KEY || key === ARROW_UP_KEY) {
      event.preventDefault()
      event.stopPropagation()

      if (items.length > 0) {
        getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus()
      }

      return
    }

    if (key === HOME_KEY || key === END_KEY) {
      if (target.matches('input')) {
        return
      }

      event.preventDefault()
      this._focusItem(items, key === HOME_KEY ? 'first' : 'last')
      return
    }

    if ((key === ENTER_KEY || key === SPACE_KEY) && !target.matches('input')) {
      const item = target.closest<HTMLElement>(SELECTOR_ITEM)

      if (item && !isDisabled(item)) {
        event.preventDefault()
        this._selectItem(item)
      }
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start combobox-init
eventActionOnPlugin(Combobox, EVENT_CLICK_DATA_API, `${SELECTOR_DATA_TOGGLE}:not(select)`, 'toggle')
initAll(SELECTOR_DATA_TOGGLE, Combobox)
// js-docs-end combobox-init

export default Combobox
