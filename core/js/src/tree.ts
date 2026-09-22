/**
 * --------------------------------------------------------------------------
 * Tabler tree.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = Record<string, never>

type ComponentConfigInput = Record<string, unknown>

/**
 * Constants
 */

const NAME = 'tree'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_CHANGE = `change${EVENT_KEY}`
const EVENT_CHANGED = `changed${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`

const SELECTOR_ITEM = 'li'
const SELECTOR_CHECKBOX = 'input[type="checkbox"]'
const SELECTOR_OWN_CHECKBOX = `:scope > details > summary ${SELECTOR_CHECKBOX}, :scope > label ${SELECTOR_CHECKBOX}, :scope > div ${SELECTOR_CHECKBOX}, :scope > ${SELECTOR_CHECKBOX}`
const SELECTOR_DESCENDANT_CHECKBOXES = `:scope ul ${SELECTOR_CHECKBOX}`
const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`
const SELECTOR_TOGGLE_BUTTON = '.tree-toggle'
const SELECTOR_TOGGLE_NODE = `.tree-node:has(> ${SELECTOR_TOGGLE_BUTTON})`

const findCheckboxes = (selector: string, root: Element): HTMLInputElement[] => SelectorEngine.find(selector, root) as HTMLInputElement[]

const Default: ComponentConfig = {}

const DefaultType: Record<keyof ComponentConfig, string> = {}

/**
 * Class definition
 *
 * A tree of nested lists with checkboxes. Checking a folder checks everything
 * inside it; a folder whose children are only partly checked shows the
 * indeterminate state.
 */

class Tree extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    for (const checkbox of findCheckboxes(SELECTOR_CHECKBOX, this._element).reverse()) {
      this.#syncFromChildren(checkbox)
    }

    EventHandler.on(this._element, EVENT_CHANGE, SELECTOR_CHECKBOX, (event: Event) => {
      const checkbox = event.target as HTMLInputElement

      this.#cascadeDown(checkbox)
      this.#cascadeUp(checkbox)

      EventHandler.trigger(this._element, EVENT_CHANGED, {
        relatedTarget: checkbox,
        checked: this.checked,
      })
    })

    EventHandler.on(this._element, EVENT_CLICK, (event: Event) => {
      const target = event.target as HTMLElement

      if (target.closest(SELECTOR_CHECKBOX)) {
        return
      }

      const node = target.closest(SELECTOR_TOGGLE_NODE) as HTMLElement | null

      if (node) {
        this.#toggleFolder(node)
      }
    })
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
  get checked(): HTMLInputElement[] {
    return findCheckboxes(`${SELECTOR_CHECKBOX}:checked`, this._element)
  }

  // Private
  #cascadeDown(checkbox: HTMLInputElement): void {
    checkbox.indeterminate = false

    for (const child of findCheckboxes(SELECTOR_DESCENDANT_CHECKBOXES, checkbox.closest(SELECTOR_ITEM) ?? this._element)) {
      if (!child.disabled) {
        child.checked = checkbox.checked
        child.indeterminate = false
      }
    }
  }

  #cascadeUp(checkbox: HTMLInputElement): void {
    let item = checkbox.closest(SELECTOR_ITEM)?.parentElement?.closest(SELECTOR_ITEM)

    while (item && this._element.contains(item)) {
      const parent = SelectorEngine.findOne(SELECTOR_OWN_CHECKBOX, item) as HTMLInputElement | null

      if (parent) {
        this.#syncFromChildren(parent)
      }

      item = item.parentElement?.closest(SELECTOR_ITEM)
    }
  }

  #toggleFolder(node: HTMLElement): void {
    const button = SelectorEngine.findOne(SELECTOR_TOGGLE_BUTTON, node) as HTMLButtonElement | null
    const children = node.nextElementSibling as HTMLElement | null

    if (!button || !children) {
      return
    }

    const expanded = button.getAttribute('aria-expanded') === 'true'

    button.setAttribute('aria-expanded', String(!expanded))
    children.hidden = expanded
  }

  #syncFromChildren(checkbox: HTMLInputElement): void {
    const children = findCheckboxes(SELECTOR_DESCENDANT_CHECKBOXES, checkbox.closest(SELECTOR_ITEM) ?? this._element).filter((child) => !child.disabled)

    if (children.length === 0) {
      return
    }

    const checkedCount = children.filter((child) => child.checked).length
    const partial = children.some((child) => child.indeterminate) || (checkedCount > 0 && checkedCount < children.length)

    checkbox.checked = !partial && checkedCount === children.length
    checkbox.indeterminate = partial
  }
}

/**
 * Data API implementation
 */

// js-docs-start tree-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  Tree.getOrCreateInstance(element)
}
// js-docs-end tree-init

export default Tree
