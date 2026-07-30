/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/event-handler.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

type EventCallback = (this: EventTarget, ...args: unknown[]) => void

interface BootstrapHandler {
  (event: Event): void
  oneOff?: boolean
  delegationSelector?: string | null
  callable?: EventCallback
  uidEvent?: string | number
}

interface EventableElement extends EventTarget {
  uidEvent?: string | number
}

const namespaceRegex = /[^.]*(?=\..*)\.|.*/
const stripNameRegex = /\..*/
const stripUidRegex = /::\d+$/
const eventRegistry: Record<string | number, Record<string, Record<string | number, BootstrapHandler>>> = {}
let uidEvent = 1
const customEvents: Record<string, string> = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
}

const nativeEvents = new Set([
  'click',
  'dblclick',
  'mouseup',
  'mousedown',
  'contextmenu',
  'mousewheel',
  'DOMMouseScroll',
  'mouseover',
  'mouseout',
  'mousemove',
  'selectstart',
  'selectend',
  'keydown',
  'keypress',
  'keyup',
  'orientationchange',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'pointercancel',
  'gesturestart',
  'gesturechange',
  'gestureend',
  'focus',
  'blur',
  'change',
  'reset',
  'select',
  'submit',
  'focusin',
  'focusout',
  'load',
  'unload',
  'beforeunload',
  'resize',
  'move',
  'DOMContentLoaded',
  'readystatechange',
  'error',
  'abort',
  'scroll'
])

function makeEventUid(element: EventableElement | EventCallback, uid?: string): string | number {
  return (uid && `${uid}::${uidEvent++}`) || (element as EventableElement).uidEvent || uidEvent++
}

function getElementEvents(element: EventableElement): Record<string, Record<string | number, BootstrapHandler>> {
  const uid = makeEventUid(element)

  element.uidEvent = uid
  eventRegistry[uid] = eventRegistry[uid] || {}

  return eventRegistry[uid]
}

function bootstrapHandler(element: EventTarget, fn: EventCallback): BootstrapHandler {
  return function handler(event: Event) {
    hydrateObj(event, { delegateTarget: element })

    if ((handler as BootstrapHandler).oneOff) {
      EventHandler.off(element, event.type, fn)
    }

    return fn.apply(element, [event])
  } as BootstrapHandler
}

function bootstrapDelegationHandler(element: EventTarget, selector: string, fn: EventCallback): BootstrapHandler {
  return function handler(this: EventTarget, event: Event) {
    const domElements = (element as HTMLElement).querySelectorAll(selector)

    for (let { target } = event; target && target !== this; target = (target as HTMLElement).parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue
        }

        hydrateObj(event, { delegateTarget: target })

        if ((handler as BootstrapHandler).oneOff) {
          EventHandler.off(element, event.type, selector, fn)
        }

        return fn.apply(target, [event])
      }
    }
  } as BootstrapHandler
}

function findHandler(
  events: Record<string | number, BootstrapHandler>,
  callable: EventCallback,
  delegationSelector: string | null = null
): BootstrapHandler | undefined {
  return Object.values(events)
    .find(event => event.callable === callable && event.delegationSelector === delegationSelector)
}

function normalizeParameters(
  originalTypeEvent: string,
  handler: string | EventCallback | undefined,
  delegationFunction: EventCallback | undefined
): [boolean, EventCallback, string] {
  const isDelegated = typeof handler === 'string'
  const callable = isDelegated ? delegationFunction! : (handler || delegationFunction)!
  let typeEvent = getTypeEvent(originalTypeEvent)

  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent
  }

  return [isDelegated, callable, typeEvent]
}

function addHandler(
  element: EventTarget | null,
  originalTypeEvent: string,
  handler: string | EventCallback | undefined,
  delegationFunction: EventCallback | undefined,
  oneOff: boolean
): void {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return
  }

  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction)

  if (originalTypeEvent in customEvents) {
    const wrapFunction = (fn: EventCallback): EventCallback => {
      return function (this: EventTarget, event: unknown) {
        const evt = event as MouseEvent & { delegateTarget: HTMLElement }
        if (!evt.relatedTarget || (evt.relatedTarget !== evt.delegateTarget && !evt.delegateTarget.contains(evt.relatedTarget as Node))) {
          return fn.call(this, event)
        }
      }
    }

    callable = wrapFunction(callable)
  }

  const events = getElementEvents(element)
  const handlers = events[typeEvent] || (events[typeEvent] = {})
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler as string : null)

  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff

    return
  }

  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''))
  const fn: BootstrapHandler = isDelegated ?
    bootstrapDelegationHandler(element, handler as string, callable) :
    bootstrapHandler(element, callable)

  fn.delegationSelector = isDelegated ? handler as string : null
  fn.callable = callable
  fn.oneOff = oneOff
  fn.uidEvent = uid
  handlers[uid] = fn

  element.addEventListener(typeEvent, fn, isDelegated)
}

function removeHandler(
  element: EventTarget,
  events: Record<string, Record<string | number, BootstrapHandler>>,
  typeEvent: string,
  handler: EventCallback,
  delegationSelector?: string | null
): void {
  const fn = findHandler(events[typeEvent], handler, delegationSelector ?? null)

  if (!fn) {
    return
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector))
  delete events[typeEvent][fn.uidEvent!]
}

function removeNamespacedHandlers(
  element: EventTarget,
  events: Record<string, Record<string | number, BootstrapHandler>>,
  typeEvent: string,
  namespace: string
): void {
  const storeElementEvent = events[typeEvent] || {}

  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable!, event.delegationSelector)
    }
  }
}

function getTypeEvent(event: string): string {
  event = event.replace(stripNameRegex, '')
  return customEvents[event] || event
}

const EventHandler = {
  on(element: EventTarget | null, event: string, handler: string | EventCallback, delegationFunction?: EventCallback): void {
    addHandler(element, event, handler, delegationFunction, false)
  },

  one(element: EventTarget | null, event: string, handler: string | EventCallback, delegationFunction?: EventCallback): void {
    addHandler(element, event, handler, delegationFunction, true)
  },

  off(element: EventTarget | null, originalTypeEvent: string, handler?: string | EventCallback, delegationFunction?: EventCallback): void {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return
    }

    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction)
    const inNamespace = typeEvent !== originalTypeEvent
    const events = getElementEvents(element)
    const storeElementEvent = events[typeEvent] || {}
    const isNamespace = originalTypeEvent.startsWith('.')

    if (typeof callable !== 'undefined') {
      if (!Object.keys(storeElementEvent).length) {
        return
      }

      removeHandler(element, events, typeEvent, callable, isDelegated ? handler as string : null)
      return
    }

    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1))
      }
    }

    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, '')

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable!, event.delegationSelector)
      }
    }
  },

  trigger(element: EventTarget | null, event: string, args?: Record<string, unknown>): Event | null {
    if (typeof event !== 'string' || !element) {
      return null
    }

    const evt = hydrateObj(new Event(event, { bubbles: true, cancelable: true }), args)

    element.dispatchEvent(evt)

    return evt
  }
}

function hydrateObj<T extends object>(obj: T, meta: Record<string, unknown> = {}): T {
  for (const [key, value] of Object.entries(meta)) {
    try {
      (obj as Record<string, unknown>)[key] = value
    } catch {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value
        }
      })
    }
  }

  return obj
}

export default EventHandler
