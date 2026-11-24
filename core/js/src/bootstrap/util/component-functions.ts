/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import EventHandler from '../dom/event-handler.js'
import SelectorEngine from '../dom/selector-engine.js'
import { isDisabled, onDOMContentLoaded } from './index'

type ComponentInstance = unknown

interface PluginComponent {
  NAME: string
  getOrCreateInstance(element: HTMLElement | string | null, config?: object): ComponentInstance
}

interface RegisteredPlugin extends PluginComponent {
  getInstance(element: HTMLElement): { dispose(): void } | null
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

const enableDismissTrigger = (component: DismissibleComponent, method = 'hide', closestSelector = `.${component.NAME}`): void => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`
  const name = component.NAME

  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"], [data-tblr-dismiss="${name}"]`, function (this: HTMLElement, event: Event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault()
    }

    if (isDisabled(this)) {
      return
    }

    const target = SelectorEngine.getElementFromSelector(this) || this.closest(closestSelector)
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

type ElementFilter = (element: HTMLElement) => boolean
type ElementConfig = (element: HTMLElement) => object
type StartTime = 'import' | 'ready' | 'load'

interface RegistrationOptions {
  selector?: string | null
  filter?: ElementFilter | null
  config?: ElementConfig | null
  when?: StartTime
  onCreate?: ((instance: ComponentInstance, element: HTMLElement) => void) | null
  onInit?: ((root: ParentNode) => void) | null
}

interface Registration {
  Plugin: RegisteredPlugin
  selector: string | null
  filter: ElementFilter | null
  config: ElementConfig | null
  onCreate?: RegistrationOptions['onCreate']
  onInit?: RegistrationOptions['onInit']
}

const REGISTRY_KEY = Symbol.for('tabler.plugins')
const registry: Registration[] = ((globalThis as unknown as Record<symbol, Registration[]>)[REGISTRY_KEY] ??= [])

const withDescendants = (root: ParentNode, selector = '*'): HTMLElement[] => {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(selector))
  if (root instanceof Element && root.matches(selector)) {
    elements.unshift(root as HTMLElement)
  }

  return elements
}

const logErrors = (callback: () => void): void => {
  try {
    callback()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Starts one registration for the markup under `root`: creates the plugin on
 * every matching element and runs `onInit`. One element with a broken config
 * must not stop the rest, so the error is logged and the loop goes on.
 */
const initRegistration = ({ selector, Plugin, filter, config, onCreate, onInit }: Registration, root: ParentNode): void => {
  if (selector) {
    for (const element of withDescendants(root, selector)) {
      if (filter && !filter(element)) {
        continue
      }

      logErrors(() => {
        const isNew = !Plugin.getInstance(element)
        const instance = Plugin.getOrCreateInstance(element, config?.(element))
        if (isNew) {
          onCreate?.(instance, element)
        }
      })
    }
  }

  if (onInit) {
    logErrors(() => onInit(root))
  }
}

/**
 * Remembers the plugin, so `init()` and `dispose()` cover it, and starts it
 * for the whole page at the `when` moment. Without a `selector` the plugin
 * only starts from its triggers, and the registration lets `dispose()` find it.
 */
const registerPlugin = (Plugin: RegisteredPlugin, options: RegistrationOptions = {}): void => {
  const { when = 'import', ...rest } = options
  const registration: Registration = { Plugin, selector: null, filter: null, config: null, ...rest }
  if (!registry.some((entry) => entry.Plugin === Plugin && entry.selector === registration.selector)) {
    registry.push(registration)
  }

  if (!registration.selector && !registration.onInit) {
    return
  }

  const start = (): void => initRegistration(registration, document)

  if (when === 'load') {
    window.addEventListener('load', start)
  } else if (when === 'ready') {
    onDOMContentLoaded(start)
  } else {
    start()
  }
}

const getRegistry = (): readonly Registration[] => registry

export { enableDismissTrigger, eventAction, eventActionOnPlugin, getRegistry, initRegistration, registerPlugin, withDescendants }
export type { PluginComponent, RegisteredPlugin, Registration, RegistrationOptions }
