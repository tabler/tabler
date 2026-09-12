/**
 * --------------------------------------------------------------------------
 * Tabler countup.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import { CountUp as CountUpPlugin, type CountUpOptions } from 'countup.js'

import BaseComponent from './bootstrap/base-component'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ElementSelector } from './bootstrap/types'

// Mapped copy of the plugin's interface, so it satisfies the `Record` base config
type ComponentConfig = { [K in keyof CountUpOptions]: CountUpOptions[K] } & {
  autoAnimate: boolean
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'countup'
const DATA_ATTRIBUTE = `data-${NAME}`

const SELECTOR_DATA_COUNTUP = `[${DATA_ATTRIBUTE}]`

const Default: ComponentConfig = {
  autoAnimate: true,
}

const DefaultType: Record<'autoAnimate', string> = {
  autoAnimate: 'boolean',
}

/**
 * Class definition
 *
 * Animates the number written inside the element with countUp.js
 * (https://github.com/inorganik/countUp.js), bundled with `tabler.js`. Options
 * come from the `data-countup` attribute as JSON, or from the config object.
 */

class CountUp extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _plugin: CountUpPlugin | null = null

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    // Strip thousands separators, currency symbols and other non-numeric
    // characters so formatted targets like "1,234", "1 234" or "$99.5" parse.
    const value = Number.parseFloat((this._element.textContent ?? '').replace(/[^0-9.-]/g, ''))

    if (Number.isNaN(value)) {
      return
    }

    this._plugin = new CountUpPlugin(this._element, value, this._config)

    // With `autoAnimate` the plugin starts itself once the element scrolls into
    // view, so only start by hand when it is off.
    if (!this._plugin.error && !this._config.autoAnimate && !this._config.enableScrollSpy) {
      this._plugin.start()
    }
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<'autoAnimate', string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  // Public
  start(): void {
    this._plugin?.start()
  }

  reset(): void {
    this._plugin?.reset()
  }

  update(value: number | string): void {
    this._plugin?.update(value)
  }

  pauseResume(): void {
    this._plugin?.pauseResume()
  }

  dispose(): void {
    this._plugin?.onDestroy()
    super.dispose()
  }

  // Private
  _mergeConfigObj(config?: Record<string, unknown>, element?: HTMLElement): Record<string, unknown> {
    // `data-countup='{"duration":4}'` carries the options as JSON; a bare
    // `data-countup` or invalid JSON means defaults.
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

// js-docs-start countup-init
for (const element of SelectorEngine.find(SELECTOR_DATA_COUNTUP)) {
  CountUp.getOrCreateInstance(element)
}
// js-docs-end countup-init

export default CountUp
