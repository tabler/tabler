/**
 * --------------------------------------------------------------------------
 * Bootstrap util/backdrop.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import Config from './config'
import {
  execute, executeAfterTransition, getElement, reflow
} from './index'
import type { ComponentConfig, ComponentConfigType } from '../types'

const NAME = 'backdrop'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`

interface BackdropConfig {
  className: string
  clickCallback: (() => void) | null
  isAnimated: boolean
  isVisible: boolean
  rootElement: HTMLElement | string
}

const Default: BackdropConfig = {
  className: 'modal-backdrop',
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  rootElement: 'body'
}

const DefaultType: ComponentConfigType = {
  className: 'string',
  clickCallback: '(function|null)',
  isAnimated: 'boolean',
  isVisible: 'boolean',
  rootElement: '(element|string)'
}

class Backdrop extends Config {
  declare _config: BackdropConfig & ComponentConfig
  _isAppended: boolean
  _element: HTMLElement | null

  constructor(config?: ComponentConfig) {
    super()
    this._config = this._getConfig(config) as BackdropConfig & ComponentConfig
    this._isAppended = false
    this._element = null
  }

  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): ComponentConfigType {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  show(callback?: () => void): void {
    if (!this._config.isVisible) {
      execute(callback)
      return
    }

    this._append()

    const element = this._getElement()
    if (this._config.isAnimated) {
      reflow(element)
    }

    element.classList.add(CLASS_NAME_SHOW)

    this._emulateAnimation(() => {
      execute(callback)
    })
  }

  hide(callback?: () => void): void {
    if (!this._config.isVisible) {
      execute(callback)
      return
    }

    this._getElement().classList.remove(CLASS_NAME_SHOW)

    this._emulateAnimation(() => {
      this.dispose()
      execute(callback)
    })
  }

  dispose(): void {
    if (!this._isAppended) {
      return
    }

    EventHandler.off(this._element, EVENT_MOUSEDOWN)

    this._element!.remove()
    this._isAppended = false
  }

  _getElement(): HTMLElement {
    if (!this._element) {
      const backdrop = document.createElement('div')
      backdrop.className = this._config.className
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE)
      }

      this._element = backdrop
    }

    return this._element
  }

  _configAfterMerge(config: ComponentConfig): ComponentConfig {
    config.rootElement = getElement(config.rootElement)
    return config
  }

  _append(): void {
    if (this._isAppended) {
      return
    }

    const element = this._getElement()
    ;(this._config.rootElement as HTMLElement).append(element)

    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback)
    })

    this._isAppended = true
  }

  _emulateAnimation(callback: () => void): void {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated)
  }
}

export default Backdrop
