/**
 * --------------------------------------------------------------------------
 * Tabler autosize.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import autosize from 'autosize'

import BaseComponent from './bootstrap/base-component'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = Record<string, never>

type ComponentConfigInput = Record<string, unknown>

/**
 * Constants
 */

const NAME = 'autosize'

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

const Default: ComponentConfig = {}

const DefaultType: Record<keyof ComponentConfig, string> = {}

/**
 * Class definition
 *
 * Wraps the `autosize` plugin (https://github.com/jackmoore/autosize), bundled
 * with `tabler.js`.
 */

class Autosize extends BaseComponent {
  declare _element: HTMLTextAreaElement
  declare _config: ComponentConfig

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (this._element) {
      autosize(this._element)
    }
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
  update(): void {
    autosize.update(this._element)
  }

  dispose(): void {
    autosize.destroy(this._element)
    super.dispose()
  }
}

/**
 * Data API implementation
 */

// js-docs-start autosize-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  Autosize.getOrCreateInstance(element)
}
// js-docs-end autosize-init

export default Autosize
