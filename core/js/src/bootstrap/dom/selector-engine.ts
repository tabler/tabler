/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/selector-engine.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { isDisabled, isVisible, parseSelector } from '../util/index'

const getSelector = (element: HTMLElement): string | null => {
  let selector = element.getAttribute('data-tblr-target') || element.getAttribute('data-bs-target')

  if (!selector || selector === '#') {
    let hrefAttribute = element.getAttribute('href')

    if (!hrefAttribute || (!hrefAttribute.includes('#') && !hrefAttribute.startsWith('.'))) {
      return null
    }

    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = `#${hrefAttribute.split('#')[1]}`
    }

    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null
  }

  return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null
}

const SelectorEngine = {
  find(selector: string, element: Element = document.documentElement): HTMLElement[] {
    return Array.from(element.querySelectorAll<HTMLElement>(selector))
  },

  findOne(selector: string, element: Element = document.documentElement): HTMLElement | null {
    return element.querySelector<HTMLElement>(selector)
  },

  children(element: HTMLElement, selector: string): HTMLElement[] {
    return Array.from(element.children).filter(child => child.matches(selector)) as HTMLElement[]
  },

  parents(element: HTMLElement, selector: string): HTMLElement[] {
    const parents: HTMLElement[] = []
    let ancestor = element.parentNode && (element.parentNode as HTMLElement).closest(selector)

    while (ancestor) {
      parents.push(ancestor as HTMLElement)
      ancestor = ancestor.parentNode && (ancestor.parentNode as HTMLElement).closest(selector)
    }

    return parents
  },

  prev(element: HTMLElement, selector: string): HTMLElement[] {
    let previous = element.previousElementSibling

    while (previous) {
      if (previous.matches(selector)) {
        return [previous as HTMLElement]
      }

      previous = previous.previousElementSibling
    }

    return []
  },

  next(element: HTMLElement, selector: string): HTMLElement[] {
    let next = element.nextElementSibling

    while (next) {
      if (next.matches(selector)) {
        return [next as HTMLElement]
      }

      next = next.nextElementSibling
    }

    return []
  },

  focusableChildren(element: HTMLElement): HTMLElement[] {
    const focusables = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'details',
      '[tabindex]',
      '[contenteditable="true"]'
    ].map(selector => `${selector}:not([tabindex^="-"])`).join(',')

    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el))
  },

  getSelectorFromElement(element: HTMLElement): string | null {
    const selector = getSelector(element)

    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null
    }

    return null
  },

  getElementFromSelector(element: HTMLElement): HTMLElement | null {
    const selector = getSelector(element)

    return selector ? SelectorEngine.findOne(selector) : null
  },

  getMultipleElementsFromSelector(element: HTMLElement): HTMLElement[] {
    const selector = getSelector(element)

    return selector ? SelectorEngine.find(selector) : []
  }
}

export default SelectorEngine
