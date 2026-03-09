/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Data from './dom/data.js'
import EventHandler from './dom/event-handler.js'
import Config from './util/config'
import { executeAfterTransition, getElement } from './util/index.js'
import type { BaseComponentStatic, ComponentConfig, ElementSelector } from './types'

const VERSION = '5.3.8'

class BaseComponent extends Config {
  _element!: HTMLElement
  _config!: ComponentConfig

  constructor(element: ElementSelector, config?: ComponentConfig) {
    super()

    const resolved = getElement(element)
    if (!resolved) {
      return
    }

    this._element = resolved
    this._config = this._getConfig(config)

    const ctor = this.constructor as unknown as BaseComponentStatic
    Data.set(this._element, ctor.DATA_KEY, this)
  }

  dispose(): void {
    const ctor = this.constructor as unknown as BaseComponentStatic
    Data.remove(this._element, ctor.DATA_KEY)
    EventHandler.off(this._element, ctor.EVENT_KEY)

    for (const propertyName of Object.getOwnPropertyNames(this)) {
      (this as Record<string, unknown>)[propertyName] = null
    }
  }

  _queueCallback(callback: () => void, element: HTMLElement, isAnimated = true): void {
    executeAfterTransition(callback, element, isAnimated)
  }

  _getConfig(config?: ComponentConfig): ComponentConfig {
    config = this._mergeConfigObj(config, this._element)
    config = this._configAfterMerge(config)
    this._typeCheckConfig(config)
    return config
  }

  static getInstance(element: ElementSelector): BaseComponent | null {
    return Data.get(getElement(element)!, this.DATA_KEY)
  }

  static getOrCreateInstance(element: ElementSelector, config: ComponentConfig = {}): BaseComponent {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
  }

  static get VERSION(): string {
    return VERSION
  }

  static get DATA_KEY(): string {
    return `bs.${this.NAME}`
  }

  static get EVENT_KEY(): string {
    return `.${this.DATA_KEY}`
  }

  static eventName(name: string): string {
    return `${name}${this.EVENT_KEY}`
  }
}

export default BaseComponent
