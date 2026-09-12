/**
 * --------------------------------------------------------------------------
 * Tabler sortable.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = Record<string, unknown>

type ComponentConfigInput = Record<string, unknown>

/**
 * Constants
 */

const NAME = 'sortable'
const DATA_ATTRIBUTE = `data-${NAME}`

const SELECTOR_DATA_SORTABLE = `[${DATA_ATTRIBUTE}]`

const Default: ComponentConfig = {}

const DefaultType: Record<string, string> = {}

/**
 * Class definition
 *
 * Wraps SortableJS (https://sortablejs.github.io/Sortable/), loaded separately
 * as `window.Sortable`. Without the plugin the component is inert. Options come
 * from the `data-sortable` attribute as JSON, or from the config object.
 */

class Sortable extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _sortable: SortableInstance | null = null

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element || !window.Sortable) {
      return
    }

    this._sortable = new window.Sortable(this._element, this._config)
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<string, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  /** The SortableJS instance, for options the component does not expose. */
  get sortable(): SortableInstance | null {
    return this._sortable
  }

  // Public
  toArray(): string[] {
    return this._sortable?.toArray() ?? []
  }

  sort(order: string[], useAnimation?: boolean): void {
    this._sortable?.sort(order, useAnimation)
  }

  dispose(): void {
    this._sortable?.destroy()
    super.dispose()
  }

  // Private
  _mergeConfigObj(config?: Record<string, unknown>, element?: HTMLElement): Record<string, unknown> {
    // `data-sortable='{"animation":150}'` carries the options as JSON; a bare
    // `data-sortable` or invalid JSON means defaults.
    let dataOptions: Record<string, unknown> = {}
    const raw = element?.getAttribute(DATA_ATTRIBUTE)

    if (raw) {
      try {
        dataOptions = JSON.parse(raw)
      } catch {
        // ignore invalid JSON
      }
    }

    return super._mergeConfigObj({ ...dataOptions, ...config }, element)
  }
}

/**
 * Data API implementation
 */

// js-docs-start sortable-init
for (const element of SelectorEngine.find(SELECTOR_DATA_SORTABLE)) {
  Sortable.getOrCreateInstance(element)
}
// js-docs-end sortable-init

export default Sortable
