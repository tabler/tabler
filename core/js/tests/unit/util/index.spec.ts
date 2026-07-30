import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import {
  execute,
  executeAfterTransition,
  findShadowRoot,
  getElement,
  getNextActiveElement,
  getTransitionDurationFromElement,
  getUID,
  isDisabled,
  isElement,
  isRTL,
  isVisible,
  noop,
  parseSelector,
  reflow,
  toType,
  triggerTransitionEnd
} from '../../../src/bootstrap/util/index'
import { clearFixture, getFixture } from '../../helpers/fixture'

describe('util/index', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('parseSelector', () => {
    it('should return the selector as-is for simple selectors', () => {
      expect(parseSelector('.my-class')).toBe('.my-class')
    })

    it('should escape ID selectors with special characters', () => {
      const result = parseSelector('#my.id')
      expect(result).toContain('#')
    })

    it('should use CSS.escape when available', () => {
      const original = window.CSS
      Object.defineProperty(window, 'CSS', {
        value: { escape: vi.fn((s: string) => s) },
        configurable: true
      })
      parseSelector('#test-id')
      expect(window.CSS.escape).toHaveBeenCalledWith('test-id')
      Object.defineProperty(window, 'CSS', { value: original, configurable: true })
    })
  })

  describe('toType', () => {
    it('should return "null" for null', () => {
      expect(toType(null)).toBe('null')
    })

    it('should return "undefined" for undefined', () => {
      expect(toType(undefined)).toBe('undefined')
    })

    it('should return "string" for strings', () => {
      expect(toType('hello')).toBe('string')
    })

    it('should return "number" for numbers', () => {
      expect(toType(42)).toBe('number')
    })

    it('should return "object" for objects', () => {
      expect(toType({})).toBe('object')
    })

    it('should return "array" for arrays', () => {
      expect(toType([])).toBe('array')
    })

    it('should return "boolean" for booleans', () => {
      expect(toType(true)).toBe('boolean')
    })

    it('should return "function" for functions', () => {
      expect(toType(() => {})).toBe('function')
    })

    it('should return "regexp" for regexps', () => {
      expect(toType(/test/)).toBe('regexp')
    })
  })

  describe('getUID', () => {
    it('should return a string starting with the prefix', () => {
      const uid = getUID('test')
      expect(uid.startsWith('test')).toBe(true)
    })

    it('should return unique values', () => {
      const a = getUID('uid')
      const b = getUID('uid')
      expect(a).not.toBe(b)
    })
  })

  describe('getTransitionDurationFromElement', () => {
    it('should return 0 for null-like element', () => {
      expect(getTransitionDurationFromElement(null as unknown as HTMLElement)).toBe(0)
    })

    it('should return 0 when no transition is set', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      expect(getTransitionDurationFromElement(div)).toBe(0)
    })

    it('should return duration + delay in ms', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        transitionDuration: '0.3s',
        transitionDelay: '0.1s'
      } as CSSStyleDeclaration)
      expect(getTransitionDurationFromElement(div)).toBe(400)
      vi.restoreAllMocks()
    })

    it('should handle comma-separated values (use first)', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        transitionDuration: '0.5s, 0.2s',
        transitionDelay: '0.1s, 0s'
      } as CSSStyleDeclaration)
      expect(getTransitionDurationFromElement(div)).toBe(600)
      vi.restoreAllMocks()
    })
  })

  describe('triggerTransitionEnd', () => {
    it('should dispatch a transitionend event', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      const handler = vi.fn()

      div.addEventListener('transitionend', handler)
      triggerTransitionEnd(div)

      expect(handler).toHaveBeenCalledOnce()
    })
  })

  describe('isElement', () => {
    it('should return true for DOM elements', () => {
      expect(isElement(document.createElement('div'))).toBe(true)
    })

    it('should return false for null', () => {
      expect(isElement(null)).toBe(false)
    })

    it('should return false for strings', () => {
      expect(isElement('div')).toBe(false)
    })

    it('should return false for plain objects', () => {
      expect(isElement({})).toBe(false)
    })

    it('should return false for non-objects', () => {
      expect(isElement(42)).toBe(false)
    })
  })

  describe('getElement', () => {
    it('should return the element if given an HTMLElement', () => {
      const el = document.createElement('div')
      expect(getElement(el)).toBe(el)
    })

    it('should query by string selector', () => {
      fixtureEl.innerHTML = '<div id="test-el"></div>'
      const el = getElement('#test-el')

      expect(el).not.toBeNull()
      expect(el!.id).toBe('test-el')
    })

    it('should return null for empty string', () => {
      expect(getElement('')).toBeNull()
    })

    it('should return null for null', () => {
      expect(getElement(null)).toBeNull()
    })

    it('should return null for numbers', () => {
      expect(getElement(42)).toBeNull()
    })
  })

  describe('isVisible', () => {
    it('should return false for non-element', () => {
      expect(isVisible(null as unknown as HTMLElement)).toBe(false)
    })

    it('should return false when getClientRects is empty', () => {
      fixtureEl.innerHTML = '<div style="display:none"></div>'
      const div = fixtureEl.querySelector('div')!
      expect(isVisible(div)).toBe(false)
    })

    it('should return true for visible element', () => {
      fixtureEl.innerHTML = '<div style="visibility:visible">text</div>'
      const div = fixtureEl.querySelector('div')!
      vi.spyOn(div, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(div)).toBe(true)
    })

    it('should return false for hidden visibility', () => {
      fixtureEl.innerHTML = '<div style="visibility:hidden">text</div>'
      const div = fixtureEl.querySelector('div')!
      vi.spyOn(div, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(div)).toBe(false)
    })

    it('should return false for element inside closed details', () => {
      fixtureEl.innerHTML = '<details><div id="inside">text</div></details>'
      const inside = fixtureEl.querySelector('#inside')!
      vi.spyOn(inside, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(inside as HTMLElement)).toBe(false)
    })

    it('should return true for element inside open details', () => {
      fixtureEl.innerHTML = '<details open><div id="inside">text</div></details>'
      const inside = fixtureEl.querySelector('#inside')!
      vi.spyOn(inside, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(inside as HTMLElement)).toBe(true)
    })

    it('should return visible for direct summary in closed details', () => {
      fixtureEl.innerHTML = '<details><summary id="sum">title</summary></details>'
      const sum = fixtureEl.querySelector('#sum')!
      vi.spyOn(sum, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(sum as HTMLElement)).toBe(true)
    })

    it('should return false for nested summary inside closed details', () => {
      fixtureEl.innerHTML = '<details><div><summary id="sum">title</summary></div></details>'
      const sum = fixtureEl.querySelector('#sum')!
      vi.spyOn(sum, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(sum as HTMLElement)).toBe(false)
    })

    it('should return false for non-summary element inside closed details', () => {
      fixtureEl.innerHTML = '<details><span id="inner">content</span></details>'
      const inner = fixtureEl.querySelector('#inner')!
      vi.spyOn(inner, 'getClientRects').mockReturnValue([{ width: 100, height: 100 }] as unknown as DOMRectList)
      expect(isVisible(inner as HTMLElement)).toBe(false)
    })
  })

  describe('isDisabled', () => {
    it('should return true for null', () => {
      expect(isDisabled(null)).toBe(true)
    })

    it('should return true for undefined', () => {
      expect(isDisabled(undefined)).toBe(true)
    })

    it('should return true for element with disabled class', () => {
      fixtureEl.innerHTML = '<div class="disabled"></div>'
      expect(isDisabled(fixtureEl.querySelector('div')!)).toBe(true)
    })

    it('should return true for disabled button', () => {
      fixtureEl.innerHTML = '<button disabled></button>'
      expect(isDisabled(fixtureEl.querySelector('button')!)).toBe(true)
    })

    it('should return false for enabled button', () => {
      fixtureEl.innerHTML = '<button></button>'
      expect(isDisabled(fixtureEl.querySelector('button')!)).toBe(false)
    })

    it('should return true for element with disabled attribute', () => {
      fixtureEl.innerHTML = '<div disabled></div>'
      expect(isDisabled(fixtureEl.querySelector('div')!)).toBe(true)
    })

    it('should return false for disabled="false"', () => {
      fixtureEl.innerHTML = '<div disabled="false"></div>'
      expect(isDisabled(fixtureEl.querySelector('div')!)).toBe(false)
    })

    it('should return false for a normal div', () => {
      fixtureEl.innerHTML = '<div></div>'
      expect(isDisabled(fixtureEl.querySelector('div')!)).toBe(false)
    })
  })

  describe('findShadowRoot', () => {
    it('should return null when element has no shadow root', () => {
      fixtureEl.innerHTML = '<div></div>'
      expect(findShadowRoot(fixtureEl.querySelector('div')!)).toBeNull()
    })

    it('should return null for orphan node', () => {
      const orphan = document.createTextNode('text')
      expect(findShadowRoot(orphan)).toBeNull()
    })

    it('should return null if attachShadow is not supported', () => {
      const original = document.documentElement.attachShadow
      Object.defineProperty(document.documentElement, 'attachShadow', { value: undefined, configurable: true })
      fixtureEl.innerHTML = '<div></div>'
      expect(findShadowRoot(fixtureEl.querySelector('div')!)).toBeNull()
      Object.defineProperty(document.documentElement, 'attachShadow', { value: original, configurable: true })
    })

    it('should return shadow root via getRootNode', () => {
      const host = document.createElement('div')
      document.body.appendChild(host)
      const shadowRoot = host.attachShadow({ mode: 'open' })
      const inner = document.createElement('span')
      shadowRoot.appendChild(inner)

      expect(findShadowRoot(inner)).toBe(shadowRoot)
      host.remove()
    })

    it('should fallback to parentNode traversal if getRootNode is not available', () => {
      const host = document.createElement('div')
      document.body.appendChild(host)
      const shadowRoot = host.attachShadow({ mode: 'open' })
      const inner = document.createElement('span')
      shadowRoot.appendChild(inner)

      const originalGetRootNode = inner.getRootNode
      Object.defineProperty(inner, 'getRootNode', { value: undefined, configurable: true })

      expect(findShadowRoot(inner)).toBe(shadowRoot)

      Object.defineProperty(inner, 'getRootNode', { value: originalGetRootNode, configurable: true })
      host.remove()
    })
  })

  describe('noop', () => {
    it('should be a function that does nothing', () => {
      expect(typeof noop).toBe('function')
      expect(noop()).toBeUndefined()
    })
  })

  describe('reflow', () => {
    it('should access offsetHeight on the element', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      expect(() => reflow(div)).not.toThrow()
    })
  })

  describe('isRTL', () => {
    afterEach(() => {
      document.documentElement.dir = ''
    })

    it('should return false by default (LTR)', () => {
      expect(isRTL()).toBe(false)
    })

    it('should return true when dir is rtl', () => {
      document.documentElement.dir = 'rtl'
      expect(isRTL()).toBe(true)
    })
  })

  describe('execute', () => {
    it('should call a function and return its result', () => {
      const fn = () => 42
      expect(execute(fn)).toBe(42)
    })

    it('should return defaultValue if not a function', () => {
      expect(execute('not a fn', [], 'default')).toBe('default')
    })

    it('should return the value itself as default if no defaultValue', () => {
      expect(execute('hello')).toBe('hello')
    })

    it('should pass args to the function', () => {
      const fn = vi.fn((..._args: unknown[]) => {})
      execute(fn, ['context', 'arg1', 'arg2'])

      expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('executeAfterTransition', () => {
    it('should execute callback immediately when waitForTransition is false', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      const callback = vi.fn()

      executeAfterTransition(callback, div, false)

      expect(callback).toHaveBeenCalledOnce()
    })

    it('should execute callback after transitionend event', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      const callback = vi.fn()

      executeAfterTransition(callback, div, true)

      expect(callback).not.toHaveBeenCalled()

      div.dispatchEvent(new Event('transitionend'))

      expect(callback).toHaveBeenCalledOnce()
    })

    it('should ignore transitionend from a different target', () => {
      fixtureEl.innerHTML = '<div id="parent"><span id="child"></span></div>'
      const parent = fixtureEl.querySelector('#parent')!
      const child = fixtureEl.querySelector('#child')!
      const callback = vi.fn()

      executeAfterTransition(callback, parent, true)

      child.dispatchEvent(new Event('transitionend', { bubbles: true }))
      expect(callback).not.toHaveBeenCalled()

      parent.dispatchEvent(new Event('transitionend'))
      expect(callback).toHaveBeenCalledOnce()
    })

    it('should execute via setTimeout fallback', async () => {
      vi.useFakeTimers()
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      const callback = vi.fn()

      executeAfterTransition(callback, div, true)

      expect(callback).not.toHaveBeenCalled()

      vi.advanceTimersByTime(10)

      expect(callback).toHaveBeenCalledOnce()
      vi.useRealTimers()
    })
  })

  describe('getNextActiveElement', () => {
    const list = ['a', 'b', 'c', 'd']

    it('should return next element', () => {
      expect(getNextActiveElement(list, 'b', true, false)).toBe('c')
    })

    it('should return previous element', () => {
      expect(getNextActiveElement(list, 'c', false, false)).toBe('b')
    })

    it('should cycle to first when at end', () => {
      expect(getNextActiveElement(list, 'd', true, true)).toBe('a')
    })

    it('should cycle to last when at start going back', () => {
      expect(getNextActiveElement(list, 'a', false, true)).toBe('d')
    })

    it('should clamp to last when at end without cycling', () => {
      expect(getNextActiveElement(list, 'd', true, false)).toBe('d')
    })

    it('should clamp to first when at start without cycling', () => {
      expect(getNextActiveElement(list, 'a', false, false)).toBe('a')
    })

    it('should return first element when active is not in list', () => {
      expect(getNextActiveElement(list, 'z', true, false)).toBe('a')
    })

    it('should return last element when active is not in list and going back with cycle', () => {
      expect(getNextActiveElement(list, 'z', false, true)).toBe('d')
    })
  })
})
