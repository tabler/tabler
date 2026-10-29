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

interface Registration {
  selector: string
  Plugin: PluginComponent
  filter: ((element: HTMLElement) => boolean) | null
}

// Shared across the bundles, so `tabler.init()` also sees the plugins an
// add-on bundle such as `tabler-map.js` registered.
const REGISTRY_KEY = Symbol.for('tabler.plugins')
const registry: Registration[] = ((globalThis as unknown as Record<symbol, Registration[]>)[REGISTRY_KEY] ??= [])

const findIn = (selector: string, root: ParentNode): HTMLElement[] => {
  const elements = SelectorEngine.find(selector, root as Element)
  if (root instanceof HTMLElement && root.matches(selector)) {
    elements.unshift(root)
  }

  return elements
}

/**
 * Creates the component for every element that matches under `root`. One
 * element with a broken config must not stop the rest, so the error is
 * logged and the loop goes on.
 */
const initRegistration = ({ selector, Plugin, filter }: Registration, root: ParentNode): void => {
  for (const element of findIn(selector, root)) {
    if (filter && !filter(element)) {
      continue
    }

    try {
      Plugin.getOrCreateInstance(element)
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * Creates the component for every element that matches on page load and
 * remembers the plugin, so `init()` can repeat this for markup added later.
 */
const initAll = (selector: string, Plugin: PluginComponent, filter: ((element: HTMLElement) => boolean) | null = null): void => {
  const registration = { selector, Plugin, filter }
  if (!registry.some((entry) => entry.Plugin === Plugin && entry.selector === selector)) {
    registry.push(registration)
  }

  initRegistration(registration, document)
}

const getRegistry = (): readonly Registration[] => registry

export { enableDismissTrigger, eventAction, eventActionOnPlugin, getRegistry, initAll, initRegistration }
export type { PluginComponent, Registration }
