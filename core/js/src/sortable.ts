/**
 * --------------------------------------------------------------------------
 * Tabler sortable.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

// The part of a SortableJS instance the component uses
interface SortableInstance {
  option(name: string, value?: unknown): unknown
  toArray(): string[]
  sort(order: string[], useAnimation?: boolean): void
  destroy(): void
}

type ComponentConfig = Record<string, unknown>

type ComponentConfigInput = Record<string, unknown>

/**
 * Constants
 */

const NAME = 'sortable'
const DATA_ATTRIBUTE = `data-${NAME}`

const SELECTOR_DATA_SORTABLE = `[${DATA_ATTRIBUTE}]`

// SortableJS defaults apply. Set `forceFallback: true` to drag an HTML copy that
// `.sortable-drag` can style, instead of the browser's drag image.
const Default: ComponentConfig = {}

const DefaultType: Record<string, string> = {}

/**
 * Class definition
 *
 * Wraps SortableJS (https://sortablejs.github.io/Sortable/), loaded separately
 * as `window.Sortable`. Without the plugin the component is inert. Options come
 * from the `data-sortable` attribute as JSON, or from the config object.
 * Turn `forceFallback` on so the dragged copy can be styled with `.sortable-drag`.
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
        const parsed: unknown = JSON.parse(raw)
        // Only an object carries options; `null`, a number or an array is ignored.
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          dataOptions = parsed as Record<string, unknown>
        }
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
initAll(SELECTOR_DATA_SORTABLE, Sortable)
// js-docs-end sortable-init

export default Sortable
export type { SortableInstance }
