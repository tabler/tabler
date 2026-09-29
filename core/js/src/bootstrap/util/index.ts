/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import type { JQueryPluginStatic, JQueryStaticLike } from '../types'

const MAX_UID = 1_000_000
const MILLISECONDS_MULTIPLIER = 1000
const TRANSITION_END = 'transitionend'

const parseSelector = (selector: string): string => {
  if (selector && typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`)
  }

  return selector
}

const toType = (object: unknown): string => {
  if (object === null || object === undefined) {
    return `${object}`
  }

  return Object.prototype.toString
    .call(object)
    .match(/\s([a-z]+)/i)![1]
    .toLowerCase()
}

const getUID = (prefix: string): string => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID)
  } while (document.getElementById(prefix))

  return prefix
}

const getTransitionDurationFromElement = (element: HTMLElement): number => {
  if (!element) {
    return 0
  }

  let { transitionDuration, transitionDelay } = window.getComputedStyle(element)

  const floatTransitionDuration = Number.parseFloat(transitionDuration)
  const floatTransitionDelay = Number.parseFloat(transitionDelay)

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0
  }

  transitionDuration = transitionDuration.split(',')[0]
  transitionDelay = transitionDelay.split(',')[0]

  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
}

const triggerTransitionEnd = (element: HTMLElement): void => {
  element.dispatchEvent(new Event(TRANSITION_END))
}

// A jQuery collection stands in for its first element, as in upstream Bootstrap.
const unwrapJQuery = (object: unknown): unknown => {
  if (object && typeof object === 'object' && typeof (object as { jquery?: unknown }).jquery !== 'undefined') {
    return (object as { 0?: unknown })[0]
  }

  return object
}

const isElement = (object: unknown): object is HTMLElement => {
  object = unwrapJQuery(object)

  if (!object || typeof object !== 'object') {
    return false
  }

  return typeof (object as HTMLElement).nodeType !== 'undefined'
}

const getElement = (object: unknown): HTMLElement | null => {
  object = unwrapJQuery(object)

  if (isElement(object)) {
    return object
  }

  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(parseSelector(object))
  }

  return null
}

const isVisible = (element: HTMLElement): boolean => {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false
  }

  const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'
  const closedDetails = element.closest('details:not([open])')

  if (!closedDetails) {
    return elementIsVisible
  }

  if (closedDetails !== element) {
    const summary = element.closest('summary')
    if (summary && summary.parentNode !== closedDetails) {
      return false
    }

    if (summary === null) {
      return false
    }
  }

  return elementIsVisible
}

const isDisabled = (element: HTMLElement | null | undefined): boolean => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true
  }

  if (element.classList.contains('disabled')) {
    return true
  }

  if ('disabled' in element && typeof element.disabled !== 'undefined') {
    return Boolean(element.disabled)
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
}

const findShadowRoot = (element: Node): ShadowRoot | null => {
  if (!document.documentElement.attachShadow) {
    return null
  }

  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode()
    return root instanceof ShadowRoot ? root : null
  }

  if (element instanceof ShadowRoot) {
    return element
  }

  if (!element.parentNode) {
    return null
  }

  return findShadowRoot(element.parentNode)
}

const noop = (): void => {}

/**
 * Trick to restart an element's animation
 *
 * @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = (element: HTMLElement): void => {
  element.offsetHeight // eslint-disable-line no-unused-expressions
}

const isRTL = (): boolean => document.documentElement.dir === 'rtl'

const getjQuery = (): JQueryStaticLike | null => {
  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') && !document.body.hasAttribute('data-tblr-no-jquery')) {
    return window.jQuery
  }

  return null
}

const DOMContentLoadedCallbacks: Array<() => void> = []

const onDOMContentLoaded = (callback: () => void): void => {
  if (document.readyState === 'loading') {
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const domCallback of DOMContentLoadedCallbacks) {
          domCallback()
        }
      })
    }

    DOMContentLoadedCallbacks.push(callback)
  } else {
    callback()
  }
}

const defineJQueryPlugin = (plugin: JQueryPluginStatic): void => {
  onDOMContentLoaded(() => {
    const $ = getjQuery()
    if ($) {
      const name = plugin.NAME
      const JQUERY_NO_CONFLICT = $.fn[name]
      $.fn[name] = plugin.jQueryInterface
      $.fn[name].Constructor = plugin
      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT
        return plugin.jQueryInterface
      }
    }
  })
}

const execute = (possibleCallback: unknown, args: unknown[] = [], defaultValue: unknown = possibleCallback): unknown => {
  return typeof possibleCallback === 'function' ? possibleCallback.call(args[0], ...args.slice(1)) : defaultValue
}

const executeAfterTransition = (callback: () => void, transitionElement: HTMLElement, waitForTransition = true): void => {
  if (!waitForTransition) {
    execute(callback)
    return
  }

  const durationPadding = 5
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding

  let called = false

  const handler = ({ target }: Event): void => {
    if (target !== transitionElement) {
      return
    }

    called = true
    transitionElement.removeEventListener(TRANSITION_END, handler)
    execute(callback)
  }

  transitionElement.addEventListener(TRANSITION_END, handler)
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement)
    }
  }, emulatedDuration)
}

const getNextActiveElement = <T>(list: T[], activeElement: T, shouldGetNext: boolean, isCycleAllowed: boolean): T => {
  const listLength = list.length
  let index = list.indexOf(activeElement)

  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0]
  }

  index += shouldGetNext ? 1 : -1

  if (isCycleAllowed) {
    index = (index + listLength) % listLength
  }

  return list[Math.max(0, Math.min(index, listLength - 1))]
}

export { defineJQueryPlugin, execute, executeAfterTransition, findShadowRoot, getElement, getjQuery, getNextActiveElement, getTransitionDurationFromElement, getUID, isDisabled, isElement, isRTL, isVisible, noop, onDOMContentLoaded, parseSelector, reflow, triggerTransitionEnd, toType }
