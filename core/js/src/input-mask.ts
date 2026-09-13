/**
 * --------------------------------------------------------------------------
 * Tabler input-mask.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

type ComponentConfig = {
  mask: string
  lazy: boolean
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'input-mask'

const ATTRIBUTE_MASK = 'data-mask'
const ATTRIBUTE_VISIBLE = 'data-mask-visible'

const SELECTOR_DATA_MASK = `[${ATTRIBUTE_MASK}]`

const Default: ComponentConfig = {
  mask: '',
  lazy: true,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  mask: 'string',
  lazy: 'boolean',
}

/**
 * Class definition
 *
 * Wraps the IMask plugin (https://imask.js.org), loaded separately as
 * `window.IMask`. Without the plugin the component is inert.
 */

class InputMask extends BaseComponent {
  declare _element: HTMLInputElement
  declare _config: ComponentConfig
  _mask: IMaskInstance | null = null

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element || !this._config.mask || !window.IMask) {
      return
    }

    this._mask = new window.IMask(this._element, {
      mask: this._config.mask,
      lazy: this._config.lazy,
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

  /** The IMask instance, for options the component does not expose. */
  get mask(): IMaskInstance | null {
    return this._mask
  }

  // Public
  update(): void {
    this._mask?.updateValue()
  }

  dispose(): void {
    this._mask?.destroy()
    super.dispose()
  }

  // Private
  _mergeConfigObj(config?: Record<string, unknown>, element?: HTMLElement): Record<string, unknown> {
    // `data-mask` holds the pattern; `data-mask-visible="true"` shows it
    // before typing, which is IMask's `lazy: false`.
    const dataOptions: Record<string, unknown> = {}
    const mask = element?.getAttribute(ATTRIBUTE_MASK)

    if (mask) {
      dataOptions.mask = mask
    }

    if (element?.hasAttribute(ATTRIBUTE_VISIBLE)) {
      dataOptions.lazy = element.getAttribute(ATTRIBUTE_VISIBLE) !== 'true'
    }

    return super._mergeConfigObj({ ...dataOptions, ...config }, element)
  }
}

/**
 * Data API implementation
 */

// js-docs-start input-mask-init
for (const element of SelectorEngine.find(SELECTOR_DATA_MASK)) {
  InputMask.getOrCreateInstance(element)
}
// js-docs-end input-mask-init

export default InputMask
