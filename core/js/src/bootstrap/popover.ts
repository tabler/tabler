/**
 * --------------------------------------------------------------------------
 * Bootstrap popover.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Tooltip from './tooltip'
import type { TooltipConfig, TooltipContent, TooltipContentMap } from './tooltip'
import { defineJQueryPlugin } from './util/index'
import type { ComponentConfig as BaseComponentConfig, JQueryCollectionLike } from './types'

/**
 * Constants
 */

const NAME = 'popover'

const SELECTOR_TITLE = '.popover-header'
const SELECTOR_CONTENT = '.popover-body'

type ComponentConfig = TooltipConfig & {
  content: TooltipContent
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

const Default: ComponentConfig = {
  ...Tooltip.Default,
  content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
  trigger: 'click',
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  ...Tooltip.DefaultType,
  content: '(null|string|element|function)',
}

/**
 * Class definition
 */

class Popover extends Tooltip {
  declare _element: HTMLElement
  declare _config: ComponentConfig

  constructor(element: HTMLElement | string, config?: ComponentConfigInput) {
    super(element, config)
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  _isWithContent(): boolean {
    return Boolean(this._getTitle() || this._getContent())
  }

  _getContentForTemplate(): TooltipContentMap {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent(),
    }
  }

  _getContent(): string | HTMLElement | null {
    return this._resolvePossibleFunction(this._config.content)
  }

  static jQueryInterface(this: JQueryCollectionLike, config?: unknown): unknown {
    return this.each(function (this: HTMLElement) {
      const data = Popover.getOrCreateInstance(this, config as BaseComponentConfig) as unknown as Record<string, (arg?: unknown) => unknown>

      if (typeof config !== 'string') {
        return
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config]()
    })
  }
}

defineJQueryPlugin(Popover)

export default Popover
