/**
 * --------------------------------------------------------------------------
 * Tabler select-all.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  /** selector of the item checkboxes inside the element */
  items: string
  /** shift-click checks or unchecks every item between the last two clicked */
  range: boolean
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'selectAll'
const DATA_NAME = 'select-all'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${DATA_NAME}"], [data-tblr-toggle="${DATA_NAME}"]`
const SELECTOR_CHECK = `[data-bs-${DATA_NAME}-check], [data-tblr-${DATA_NAME}-check]`
const SELECTOR_COUNT = `[data-bs-${DATA_NAME}-count], [data-tblr-${DATA_NAME}-count]`
const SELECTOR_TOTAL = `[data-bs-${DATA_NAME}-total], [data-tblr-${DATA_NAME}-total]`

const Default: ComponentConfig = {
  items: '.table-selectable-check, .list-group-selectable-check',
  range: true,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  items: 'string',
  range: 'boolean',
}

/**
 * Class definition
 *
 * Ties a "select all" checkbox to the item checkboxes of a table or a list.
 * The checkbox checks or unchecks every enabled item, turns indeterminate
 * while only some are checked, and the counters show how many are selected.
 * Listeners sit on the element itself, and rows added or removed later
 * refresh the state on their own.
 */

class SelectAll extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _lastItem: HTMLInputElement | null = null
  _silent = false
  _observer: MutationObserver | null = null

  _onChange = (event: Event): void => this._handleChange(event)
  _onClick = (event: Event): void => this._handleClick(event as MouseEvent)

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    this._element.addEventListener('change', this._onChange)
    this._element.addEventListener('click', this._onClick)
    this._observer = new MutationObserver((records) => this._handleMutations(records))
    this._observer.observe(this._element, { childList: true, subtree: true })
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

  // Public
  getSelected(): HTMLInputElement[] {
    return this._items().filter((item) => item.checked)
  }

  selectAll(): void {
    this._setAll(true)
  }

  deselectAll(): void {
    this._setAll(false)
  }

  update(): void {
    const items = this._items()
    const selected = items.filter((item) => item.checked).length
    const enabled = items.filter((item) => !item.disabled)
    const allChecked = enabled.length > 0 && enabled.every((item) => item.checked)

    for (const check of this._checks()) {
      check.checked = allChecked
      check.indeterminate = selected > 0 && !allChecked
      check.disabled = enabled.length === 0
    }

    for (const count of SelectorEngine.find(SELECTOR_COUNT, this._element)) {
      count.textContent = String(selected)
    }

    for (const total of SelectorEngine.find(SELECTOR_TOTAL, this._element)) {
      total.textContent = String(items.length)
    }
  }

  dispose(): void {
    this._element.removeEventListener('change', this._onChange)
    this._element.removeEventListener('click', this._onClick)
    this._observer?.disconnect()
    this._observer = null
    super.dispose()
  }

  // Private
  _checks(): HTMLInputElement[] {
    return SelectorEngine.find(SELECTOR_CHECK, this._element) as HTMLInputElement[]
  }

  _items(): HTMLInputElement[] {
    return (SelectorEngine.find(this._config.items, this._element) as HTMLInputElement[]).filter((item) => !item.matches(SELECTOR_CHECK))
  }

  _setAll(checked: boolean): void {
    const changed = this._items().filter((item) => !item.disabled && item.checked !== checked)
    for (const item of changed) {
      item.checked = checked
    }

    this._commit(changed)
  }

  _handleChange(event: Event): void {
    const target = event.target as HTMLInputElement
    if (this._silent || !(target instanceof HTMLInputElement)) {
      return
    }

    if (target.matches(SELECTOR_CHECK)) {
      this._setAll(target.checked)
      return
    }

    if (this._isItem(target)) {
      this._commit([])
    }
  }

  _handleClick(event: MouseEvent): void {
    const target = event.target as HTMLInputElement
    if (!this._isItem(target)) {
      return
    }

    const previous = this._lastItem
    this._lastItem = target

    if (!this._config.range || !event.shiftKey || !previous || previous === target) {
      return
    }

    const items = this._items()
    const from = items.indexOf(previous)
    const to = items.indexOf(target)
    if (from === -1 || to === -1) {
      return
    }

    const changed = items.slice(Math.min(from, to), Math.max(from, to) + 1).filter((item) => item !== target && !item.disabled && item.checked !== target.checked)
    for (const item of changed) {
      item.checked = target.checked
    }

    this._dispatch(changed)
  }

  _handleMutations(records: MutationRecord[]): void {
    const touchesItems = records.some((record) => [...record.addedNodes, ...record.removedNodes].some((node) => node instanceof Element && (node.matches(this._config.items) || node.querySelector(this._config.items) !== null)))

    if (touchesItems) {
      this._lastItem = this._lastItem?.isConnected ? this._lastItem : null
      this.update()
    }
  }

  _isItem(element: HTMLElement): element is HTMLInputElement {
    return element instanceof HTMLInputElement && element.matches(this._config.items) && !element.matches(SELECTOR_CHECK) && this._element.contains(element)
  }

  _dispatch(changed: HTMLInputElement[]): void {
    this._silent = true
    for (const item of changed) {
      item.dispatchEvent(new Event('input', { bubbles: true }))
      item.dispatchEvent(new Event('change', { bubbles: true }))
    }
    this._silent = false
  }

  _commit(changed: HTMLInputElement[]): void {
    this._dispatch(changed)
    this.update()

    const selected = this.getSelected()
    EventHandler.trigger(this._element, EVENT_CHANGE, { selected, count: selected.length, total: this._items().length })
  }
}

/**
 * Data API implementation
 */

// js-docs-start select-all-init
initAll(SELECTOR_DATA_TOGGLE, SelectAll)
// js-docs-end select-all-init

export default SelectAll
