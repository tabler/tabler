/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import SelectorEngine from '../dom/selector-engine.js'
import { isDisabled } from './index'

type ComponentInstance = unknown

interface PluginComponent {
  NAME: string
  getOrCreateInstance(element: HTMLElement | string | null): ComponentInstance
}

interface EventActionData {
  targets: HTMLElement[]
  event: Event
}

interface PluginEventActionData extends EventActionData {
  instances: ComponentInstance[]
}

interface DismissibleComponent {
  EVENT_KEY: string
  NAME: string
  getOrCreateInstance(element: HTMLElement | string | null): ComponentInstance
}

const callMethod = (instance: ComponentInstance, method: string): void => {
  const callable = (instance as Record<string, unknown>)[method]

  if (typeof callable === 'function') {
    callable.call(instance)
  }
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
    callMethod(component.getOrCreateInstance(target), method)
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
      callMethod(instance, method)
    }
  })
}

export { enableDismissTrigger, eventAction, eventActionOnPlugin }
