/**
 * --------------------------------------------------------------------------
 * Bootstrap util/focustrap.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import SelectorEngine from '../dom/selector-engine.js'
import Config from './config'
import type { ComponentConfig, ComponentConfigType } from '../types'

const NAME = 'focustrap'
const DATA_KEY = 'bs.focustrap'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`

const TAB_KEY = 'Tab'
const TAB_NAV_FORWARD = 'forward'
const TAB_NAV_BACKWARD = 'backward'

interface FocusTrapConfig {
  autofocus: boolean
  trapElement: HTMLElement | null
}

const Default: FocusTrapConfig = {
  autofocus: true,
  trapElement: null
}

const DefaultType: ComponentConfigType = {
  autofocus: 'boolean',
  trapElement: 'element'
}

class FocusTrap extends Config {
  declare _config: FocusTrapConfig & ComponentConfig
  _isActive: boolean
  _lastTabNavDirection: string | null

  constructor(config?: ComponentConfig) {
    super()
    this._config = this._getConfig(config) as FocusTrapConfig & ComponentConfig
    this._isActive = false
    this._lastTabNavDirection = null
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

  activate(): void {
    if (this._isActive) {
      return
    }

    if (this._config.autofocus) {
      this._config.trapElement!.focus()
    }

    EventHandler.off(document, EVENT_KEY)
    EventHandler.on(document, EVENT_FOCUSIN, (event: FocusEvent) => this._handleFocusin(event))
    EventHandler.on(document, EVENT_KEYDOWN_TAB, (event: KeyboardEvent) => this._handleKeydown(event))

    this._isActive = true
  }

  deactivate(): void {
    if (!this._isActive) {
      return
    }

    this._isActive = false
    EventHandler.off(document, EVENT_KEY)
  }

  _handleFocusin(event: FocusEvent): void {
    const { trapElement } = this._config

    if (event.target === document || event.target === trapElement || trapElement!.contains(event.target as Node)) {
      return
    }

    const elements = SelectorEngine.focusableChildren(trapElement)

    if (elements.length === 0) {
      trapElement!.focus()
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus()
    } else {
      elements[0].focus()
    }
  }

  _handleKeydown(event: KeyboardEvent): void {
    if (event.key !== TAB_KEY) {
      return
    }

    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD
  }
}

export default FocusTrap
