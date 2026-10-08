/**
 * --------------------------------------------------------------------------
 * Tabler transfer.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

type TransferSide = 'source' | 'target'

type TransferAction = 'add' | 'remove' | 'add-all' | 'remove-all' | 'up' | 'down'

type TransferDirection = 'add' | 'remove' | 'reorder'

type ComponentConfig = {
  /** text of the counter in a panel header; `{checked}` and `{total}` are replaced */
  counterTemplate: string
  /** `name` of the `<select multiple>` the plugin renders when the markup has none; `null` renders nothing */
  name: string | null
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'transfer'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`

const CLASS_NAME_ITEM = 'transfer-item'

const attributeSelector = (name: string): string => `[data-bs-${name}], [data-tblr-${name}]`

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`
const SELECTOR_PANEL = attributeSelector(`${NAME}-panel`)
const SELECTOR_LIST = attributeSelector(`${NAME}-list`)
const SELECTOR_SEARCH = attributeSelector(`${NAME}-search`)
const SELECTOR_COUNTER = attributeSelector(`${NAME}-counter`)
const SELECTOR_SELECT_ALL = attributeSelector(`${NAME}-select-all`)
const SELECTOR_ACTION = attributeSelector(`${NAME}-action`)
const SELECTOR_ITEM = `.${CLASS_NAME_ITEM}`
const SELECTOR_CHECKBOX = 'input[type="checkbox"]'
const SELECTOR_SELECT = 'select[multiple]'

const ATTRIBUTES_PANEL = [`data-bs-${NAME}-panel`, `data-tblr-${NAME}-panel`]
const ATTRIBUTES_ACTION = [`data-bs-${NAME}-action`, `data-tblr-${NAME}-action`]

const ACTIONS: TransferAction[] = ['add', 'remove', 'add-all', 'remove-all', 'up', 'down']

const KEY_UP = 'ArrowUp'
const KEY_DOWN = 'ArrowDown'
const KEY_HOME = 'Home'
const KEY_END = 'End'
const KEY_SPACE = ' '
const KEY_ENTER = 'Enter'

const Default: ComponentConfig = {
  counterTemplate: '{checked} / {total}',
  name: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  counterTemplate: 'string',
  name: '(string|null)',
}

/**
 * Class definition
 *
 * Two lists side by side with buttons between them. The rows live in the
 * markup; the plugin moves them from one list to the other and keeps a
 * `<select multiple>` in sync, so a form submits the values of the rows in the
 * target list and sees nothing but an ordinary field.
 */

class Transfer extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _panels: Record<TransferSide, HTMLElement | null> = { source: null, target: null }
  _select: HTMLSelectElement | null = null
  // Position of every row in the markup, so a row sent back lands where it came from
  _order = new Map<HTMLElement, number>()

  _onClick = (event: Event): void => this._handleClick(event)
  _onKeyDown = (event: Event): void => this._handleKeyDown(event as KeyboardEvent)
  _onInput = (event: Event): void => this._handleInput(event)
  _onChange = (event: Event): void => this._handleChange(event)

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    for (const panel of SelectorEngine.find(SELECTOR_PANEL, this._element) as HTMLElement[]) {
      const side = this._sideOf(panel)
      if (side && !this._panels[side]) {
        this._panels[side] = panel
      }
    }

    if (!this._panels.source || !this._panels.target) {
      return
    }

    this._setUpItems()
    this._setUpSelect()
    this._addEventListeners()
    this._syncSelect()
    this._refresh()
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
  getValue(): string[] {
    return this._items('target').map((item) => this._valueOf(item))
  }

  setValue(values: string[]): void {
    const before = this.getValue()
    const wanted = values.map(String)
    const items = [...this._items('source'), ...this._items('target')]
    const byValue = new Map(items.map((item) => [this._valueOf(item), item]))

    for (const item of items) {
      if (!wanted.includes(this._valueOf(item)) && !this._isDisabled(item)) {
        this._place(item, 'source')
      }
    }

    for (const value of wanted) {
      const item = byValue.get(value)
      if (item && !this._isDisabled(item)) {
        this._place(item, 'target')
      }
    }

    this._finish(before, 'reorder')
  }

  add(values?: string[]): void {
    this._moveItems(this._pick('source', values), 'target')
  }

  remove(values?: string[]): void {
    this._moveItems(this._pick('target', values), 'source')
  }

  addAll(): void {
    this._moveItems(this._enabled('source'), 'target')
  }

  removeAll(): void {
    this._moveItems(this._enabled('target'), 'source')
  }

  dispose(): void {
    if (this._element) {
      this._element.removeEventListener('click', this._onClick)
      this._element.removeEventListener('keydown', this._onKeyDown)
      this._element.removeEventListener('input', this._onInput)
      this._element.removeEventListener('change', this._onChange)
    }

    super.dispose()
  }

  // Private
  _sideOf(panel: HTMLElement): TransferSide | null {
    for (const name of ATTRIBUTES_PANEL) {
      const side = panel.getAttribute(name)
      if (side === 'source' || side === 'target') {
        return side
      }
    }

    return null
  }

  _list(side: TransferSide): HTMLElement {
    return SelectorEngine.findOne(SELECTOR_LIST, this._panels[side]!) as HTMLElement
  }

  _items(side: TransferSide): HTMLElement[] {
    return SelectorEngine.find(SELECTOR_ITEM, this._list(side)) as HTMLElement[]
  }

  _enabled(side: TransferSide): HTMLElement[] {
    return this._items(side).filter((item) => !this._isDisabled(item))
  }

  _checked(side: TransferSide): HTMLElement[] {
    return this._enabled(side).filter((item) => this._isChecked(item))
  }

  _pick(side: TransferSide, values?: string[]): HTMLElement[] {
    if (!values) {
      return this._checked(side)
    }

    const wanted = values.map(String)
    return this._enabled(side).filter((item) => wanted.includes(this._valueOf(item)))
  }

  _valueOf(item: HTMLElement): string {
    return item.dataset.value ?? ''
  }

  _isDisabled(item: HTMLElement): boolean {
    return item.getAttribute('aria-disabled') === 'true'
  }

  _isChecked(item: HTMLElement): boolean {
    return item.getAttribute('aria-selected') === 'true'
  }

  _isVisible(item: HTMLElement): boolean {
    return !item.hidden
  }

  _setUpItems(): void {
    let index = 0

    for (const side of ['source', 'target'] as TransferSide[]) {
      const list = this._list(side)
      list.setAttribute('role', 'listbox')
      list.setAttribute('aria-multiselectable', 'true')

      for (const item of this._items(side)) {
        const checkbox = SelectorEngine.findOne(SELECTOR_CHECKBOX, item) as HTMLInputElement | null

        item.setAttribute('role', 'option')
        item.tabIndex = -1
        this._order.set(item, index++)
        this._setChecked(item, this._isChecked(item) || Boolean(checkbox?.checked))

        if (checkbox) {
          checkbox.tabIndex = -1
          checkbox.setAttribute('aria-hidden', 'true')
        }
      }
    }
  }

  // Uses the `<select multiple>` of the markup, or renders a hidden one when
  // the `name` option asks for it.
  _setUpSelect(): void {
    const existing = SelectorEngine.findOne(SELECTOR_SELECT, this._element) as HTMLSelectElement | null

    if (existing) {
      this._select = existing
      return
    }

    if (!this._config.name) {
      return
    }

    const select = document.createElement('select')
    select.multiple = true
    select.hidden = true
    select.name = this._config.name
    this._element.append(select)
    this._select = select
  }

  _addEventListeners(): void {
    this._element.addEventListener('click', this._onClick)
    this._element.addEventListener('keydown', this._onKeyDown)
    this._element.addEventListener('input', this._onInput)
    this._element.addEventListener('change', this._onChange)
  }

  _itemFrom(event: Event): HTMLElement | null {
    const target = event.target as Element | null
    const item = target?.closest(SELECTOR_ITEM) as HTMLElement | null
    return item && this._element.contains(item) ? item : null
  }

  _sideOfItem(item: HTMLElement): TransferSide {
    return this._panels.target!.contains(item) ? 'target' : 'source'
  }

  _actionOf(button: Element): TransferAction | null {
    for (const name of ATTRIBUTES_ACTION) {
      const action = button.getAttribute(name) as TransferAction | null
      if (action && ACTIONS.includes(action)) {
        return action
      }
    }

    return null
  }

  _handleClick(event: Event): void {
    const target = event.target as Element
    const button = target.closest(SELECTOR_ACTION)

    if (button && this._element.contains(button)) {
      event.preventDefault()
      this._runAction(this._actionOf(button))
      return
    }

    const item = this._itemFrom(event)
    if (item && !this._isDisabled(item)) {
      this._setChecked(item, !this._isChecked(item))
      this._focusItem(item)
      this._refresh()
    }
  }

  _runAction(action: TransferAction | null): void {
    switch (action) {
      case 'add':
        this.add()
        break
      case 'remove':
        this.remove()
        break
      case 'add-all':
        this.addAll()
        break
      case 'remove-all':
        this.removeAll()
        break
      case 'up':
        this._reorder(-1)
        break
      case 'down':
        this._reorder(1)
        break
      default:
    }
  }

  _handleKeyDown(event: KeyboardEvent): void {
    const item = this._itemFrom(event)
    if (!item || event.target !== item) {
      return
    }

    const side = this._sideOfItem(item)

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      event.preventDefault()
      this._checkAll(side, true)
      return
    }

    if (event.key === KEY_SPACE || event.key === KEY_ENTER) {
      event.preventDefault()
      if (!this._isDisabled(item)) {
        this._setChecked(item, !this._isChecked(item))
        this._refresh()
      }
      return
    }

    const visible = this._items(side).filter((candidate) => this._isVisible(candidate))
    const index = visible.indexOf(item)
    const targets: Record<string, HTMLElement | undefined> = {
      [KEY_UP]: visible[index - 1],
      [KEY_DOWN]: visible[index + 1],
      [KEY_HOME]: visible[0],
      [KEY_END]: visible[visible.length - 1],
    }

    if (!(event.key in targets)) {
      return
    }

    event.preventDefault()
    const next = targets[event.key]
    if (next) {
      this._focusItem(next)
    }
  }

  _handleInput(event: Event): void {
    const search = (event.target as Element).closest(SELECTOR_SEARCH) as HTMLInputElement | null
    const panel = search?.closest(SELECTOR_PANEL) as HTMLElement | null
    if (!search || !panel) {
      return
    }

    const side = this._sideOf(panel)
    if (side) {
      this._applyFilter(side)
      this._refresh()
    }
  }

  _handleChange(event: Event): void {
    const checkbox = (event.target as Element).closest(SELECTOR_SELECT_ALL) as HTMLInputElement | null
    const panel = checkbox?.closest(SELECTOR_PANEL) as HTMLElement | null
    if (!checkbox || !panel) {
      return
    }

    const side = this._sideOf(panel)
    if (side) {
      this._checkAll(side, checkbox.checked)
    }
  }

  _applyFilter(side: TransferSide): void {
    const search = SelectorEngine.findOne(SELECTOR_SEARCH, this._panels[side]!) as HTMLInputElement | null
    const query = (search?.value ?? '').trim().toLowerCase()

    for (const item of this._items(side)) {
      item.hidden = query !== '' && !(item.textContent ?? '').toLowerCase().includes(query)
    }
  }

  _checkAll(side: TransferSide, checked: boolean): void {
    for (const item of this._enabled(side)) {
      if (this._isVisible(item)) {
        this._setChecked(item, checked)
      }
    }

    this._refresh()
  }

  _setChecked(item: HTMLElement, checked: boolean): void {
    item.setAttribute('aria-selected', String(checked))

    const checkbox = SelectorEngine.findOne(SELECTOR_CHECKBOX, item) as HTMLInputElement | null
    if (checkbox) {
      checkbox.checked = checked
    }
  }

  _focusItem(item: HTMLElement): void {
    for (const sibling of this._items(this._sideOfItem(item))) {
      sibling.tabIndex = sibling === item ? 0 : -1
    }

    item.focus()
  }

  // Appends the row to the target list, or puts it back among the rows of the
  // source list in its original order.
  _place(item: HTMLElement, side: TransferSide): void {
    const list = this._list(side)
    this._setChecked(item, false)

    if (side === 'target') {
      list.append(item)
    } else {
      const order = this._order.get(item) ?? 0
      const next = this._items('source').find((candidate) => candidate !== item && (this._order.get(candidate) ?? 0) > order)
      list.insertBefore(item, next ?? null)
    }
  }

  _moveItems(items: HTMLElement[], side: TransferSide): void {
    if (items.length === 0) {
      return
    }

    const before = this.getValue()

    for (const item of items) {
      this._place(item, side)
    }

    this._applyFilter('source')
    this._applyFilter('target')
    this._finish(
      before,
      side === 'target' ? 'add' : 'remove',
      items.map((item) => this._valueOf(item)),
    )
  }

  _reorder(step: -1 | 1): void {
    const before = this.getValue()
    const list = this._list('target')
    const items = this._items('target')

    if (step === 1) {
      items.reverse()
    }

    for (const item of items) {
      if (!this._isChecked(item) || this._isDisabled(item)) {
        continue
      }

      const neighbour = (step === -1 ? item.previousElementSibling : item.nextElementSibling) as HTMLElement | null
      if (neighbour && !this._isChecked(neighbour)) {
        list.insertBefore(item, step === -1 ? neighbour : neighbour.nextElementSibling)
      }
    }

    this._finish(before, 'reorder')
  }

  _finish(before: string[], direction: TransferDirection, moved: string[] = []): void {
    const value = this.getValue()
    const changed = value.length !== before.length || value.some((entry, index) => entry !== before[index])

    this._syncSelect()
    this._refresh()

    if (!changed) {
      return
    }

    this._select?.dispatchEvent(new Event('change', { bubbles: true }))

    EventHandler.trigger(this._element, EVENT_CHANGE, { value, moved, direction })
  }

  // The options follow the rows: selected when the row is in the target list,
  // and ordered like the target list, since a form submits them in DOM order.
  _syncSelect(): void {
    const select = this._select
    if (!select) {
      return
    }

    const rows = [...this._items('source'), ...this._items('target')]
    const options = new Map(Array.from(select.options, (option) => [option.value, option]))

    for (const item of rows) {
      const value = this._valueOf(item)
      let option = options.get(value)

      if (!option) {
        option = new Option((item.textContent ?? '').trim(), value)
        options.set(value, option)
      }

      option.selected = this._sideOfItem(item) === 'target'
    }

    const ordered = rows.map((item) => options.get(this._valueOf(item))!)
    const selected = this._items('target').map((item) => options.get(this._valueOf(item))!)

    select.replaceChildren(...selected, ...ordered.filter((option) => !selected.includes(option)))

    for (const option of selected) {
      option.selected = true
    }
  }

  // Counters, the select-all checkboxes, the roving tabindex and the buttons
  _refresh(): void {
    for (const side of ['source', 'target'] as TransferSide[]) {
      const panel = this._panels[side]!
      const items = this._items(side)
      const enabled = this._enabled(side).filter((item) => this._isVisible(item))
      const checked = enabled.filter((item) => this._isChecked(item))

      const counter = SelectorEngine.findOne(SELECTOR_COUNTER, panel)
      if (counter) {
        const total = items.length
        const checkedCount = items.filter((item) => this._isChecked(item)).length
        counter.textContent = this._config.counterTemplate.replace('{checked}', String(checkedCount)).replace('{total}', String(total))
      }

      const selectAll = SelectorEngine.findOne(SELECTOR_SELECT_ALL, panel) as HTMLInputElement | null
      if (selectAll) {
        selectAll.checked = enabled.length > 0 && checked.length === enabled.length
        selectAll.indeterminate = checked.length > 0 && checked.length < enabled.length
        selectAll.disabled = enabled.length === 0
      }

      const visible = items.filter((item) => this._isVisible(item))
      const current = visible.find((item) => item.tabIndex === 0) ?? visible.find((item) => !this._isDisabled(item)) ?? visible[0]
      for (const item of items) {
        item.tabIndex = item === current ? 0 : -1
      }
    }

    for (const button of SelectorEngine.find(SELECTOR_ACTION, this._element) as HTMLButtonElement[]) {
      const action = this._actionOf(button)
      let enabled = false

      if (action === 'add') {
        enabled = this._checked('source').length > 0
      } else if (action === 'remove') {
        enabled = this._checked('target').length > 0
      } else if (action === 'add-all') {
        enabled = this._enabled('source').length > 0
      } else if (action === 'remove-all') {
        enabled = this._enabled('target').length > 0
      } else if (action === 'up' || action === 'down') {
        enabled = this._checked('target').length > 0
      }

      button.disabled = !enabled
    }
  }
}

/**
 * Data API implementation
 */

// js-docs-start transfer-init
initAll(SELECTOR_DATA_TOGGLE, Transfer)
// js-docs-end transfer-init

export default Transfer
