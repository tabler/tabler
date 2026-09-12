/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import SelectorEngine from '../dom/selector-engine.js'
import { isDisabled } from './index'

interface PluginComponent {
  NAME: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOrCreateInstance(element: HTMLElement | string | null): any
}

interface EventActionData {
  targets: HTMLElement[]
  event: Event
}

interface PluginEventActionData extends EventActionData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instances: any[]
}

interface DismissibleComponent {
  EVENT_KEY: string
  NAME: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOrCreateInstance(element: HTMLElement | string | null): any
}

const enableDismissTrigger = (component: DismissibleComponent, method = 'hide'): void => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`
  const name = component.NAME

  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"], [data-tblr-dismiss="${name}"]`, function (this: HTMLElement, event: Event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault()
    }

    if (isDisabled(this)) {
      return
    }

    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`)
    const instance = component.getOrCreateInstance(target)

    instance[method]()
  })
}

const eventAction = (onEvent: string, stringSelector: string, callback: (data: EventActionData) => void): void => {
  const selector = `${stringSelector}:not(.disabled):not(:disabled)`

  EventHandler.on(document, onEvent, selector, function (this: HTMLElement, event: Event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault()
    }

    const targetSelector = SelectorEngine.getSelectorFromElement(this)
    const targets = targetSelector ? SelectorEngine.find(targetSelector) : [this]

    callback({ targets, event })
  })
}

const eventActionOnPlugin = (Plugin: PluginComponent, onEvent: string, stringSelector: string, method: string, callback: ((data: PluginEventActionData) => void) | null = null): void => {
  eventAction(`${onEvent}.${Plugin.NAME}`, stringSelector, (data) => {
    const instances = data.targets.filter(Boolean).map((element) => Plugin.getOrCreateInstance(element))

    if (typeof callback === 'function') {
      callback({ ...data, instances })
    }

    for (const instance of instances) {
      instance[method]()
    }
  })
}

export { enableDismissTrigger, eventAction, eventActionOnPlugin }
