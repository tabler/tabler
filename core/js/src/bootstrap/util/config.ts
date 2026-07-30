/**
 * --------------------------------------------------------------------------
 * Bootstrap util/config.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Manipulator from '../dom/manipulator.js'
import { isElement, toType } from './index.js'
import type { ComponentConfig, ComponentConfigType, ConfigStatic } from '../types'

class Config {
  static get Default(): ComponentConfig {
    return {}
  }

  static get DefaultType(): ComponentConfigType {
    return {}
  }

  static get NAME(): string {
    throw new Error('You have to implement the static method "NAME", for each component!')
  }

  _getConfig(config?: ComponentConfig): ComponentConfig {
    config = this._mergeConfigObj(config)
    config = this._configAfterMerge(config)
    this._typeCheckConfig(config)
    return config
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    return config
  }

  _mergeConfigObj(config?: ComponentConfig, element?: HTMLElement): ComponentConfig {
    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element!, 'config') : {}
    const ctor = this.constructor as unknown as ConfigStatic

    return {
      ...ctor.Default,
      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
      ...(isElement(element) ? Manipulator.getDataAttributes(element!) : {}),
      ...(typeof config === 'object' ? config : {})
    }
  }

  _typeCheckConfig(config: ComponentConfig, configTypes?: ComponentConfigType): void {
    const ctor = this.constructor as unknown as ConfigStatic
    const types = configTypes || ctor.DefaultType

    for (const [property, expectedTypes] of Object.entries(types)) {
      const value = config[property]
      const valueType = isElement(value) ? 'element' : toType(value)

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          `${ctor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
        )
      }
    }
  }
}

export default Config
