import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import SelectorEngine from '../../../src/bootstrap/dom/selector-engine'
import { clearFixture, getFixture } from '../../helpers/fixture'

vi.mock('../../../src/bootstrap/util/index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../src/bootstrap/util/index')>()
  return {
    ...actual,
    isVisible: () => true
  }
})

describe('SelectorEngine', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('find', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<div><span class="a"></span><span class="b"></span></div>'
    })

    it('should return an array of matched elements', () => {
      const result = SelectorEngine.find('span', fixtureEl)

      expect(result).toHaveLength(2)
      expect(result[0].classList.contains('a')).toBe(true)
      expect(result[1].classList.contains('b')).toBe(true)
    })

    it('should return an empty array when nothing matches', () => {
      expect(SelectorEngine.find('.missing', fixtureEl)).toEqual([])
    })

    it('should default to document.documentElement', () => {
      const result = SelectorEngine.find(`#${fixtureEl.id} span`)

      expect(result).toHaveLength(2)
    })
  })

  describe('findOne', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<div><span class="first"></span><span class="second"></span></div>'
    })

    it('should return the first matched element', () => {
      const result = SelectorEngine.findOne('span', fixtureEl)

      expect(result).not.toBeNull()
      expect(result!.classList.contains('first')).toBe(true)
    })

    it('should return null when nothing matches', () => {
      expect(SelectorEngine.findOne('.missing', fixtureEl)).toBeNull()
    })
  })

  describe('children', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<div><span class="match"></span><p></p><span class="match"></span></div>'
    })

    it('should return only direct children matching the selector', () => {
      const parent = fixtureEl.querySelector('div')!
      const result = SelectorEngine.children(parent, 'span')

      expect(result).toHaveLength(2)
      result.forEach(el => expect(el.tagName).toBe('SPAN'))
    })

    it('should return an empty array when no children match', () => {
      const parent = fixtureEl.querySelector('div')!

      expect(SelectorEngine.children(parent, 'button')).toEqual([])
    })
  })

  describe('parents', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<div class="outer"><div class="inner"><span id="target"></span></div></div>'
    })

    it('should return all ancestor elements matching the selector', () => {
      const target = fixtureEl.querySelector('#target')!
      const result = SelectorEngine.parents(target as HTMLElement, 'div')

      expect(result.length).toBeGreaterThanOrEqual(2)
      expect(result[0].classList.contains('inner')).toBe(true)
      expect(result[1].classList.contains('outer')).toBe(true)
    })

    it('should return an empty array when no ancestors match', () => {
      const target = fixtureEl.querySelector('#target')!

      expect(SelectorEngine.parents(target as HTMLElement, 'table')).toEqual([])
    })
  })

  describe('prev', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<div><span class="a"></span><p class="b"></p><span class="c"></span></div>'
    })

    it('should return the previous sibling matching the selector', () => {
      const el = fixtureEl.querySelector('.c')! as HTMLElement
      const result = SelectorEngine.prev(el, 'span')

      expect(result).toHaveLength(1)
      expect(result[0].classList.contains('a')).toBe(true)
    })

    it('should return an empty array if no previous sibling matches', () => {
      const el = fixtureEl.querySelector('.a')! as HTMLElement

      expect(SelectorEngine.prev(el, 'button')).toEqual([])
    })

    it('should skip non-matching siblings', () => {
      const el = fixtureEl.querySelector('.c')! as HTMLElement
      const result = SelectorEngine.prev(el, 'p')

      expect(result).toHaveLength(1)
      expect(result[0].classList.contains('b')).toBe(true)
    })
  })

  describe('next', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = '<div><span class="a"></span><p class="b"></p><span class="c"></span></div>'
    })

    it('should return the next sibling matching the selector', () => {
      const el = fixtureEl.querySelector('.a')! as HTMLElement
      const result = SelectorEngine.next(el, 'span')

      expect(result).toHaveLength(1)
      expect(result[0].classList.contains('c')).toBe(true)
    })

    it('should return an empty array if no next sibling matches', () => {
      const el = fixtureEl.querySelector('.c')! as HTMLElement

      expect(SelectorEngine.next(el, 'button')).toEqual([])
    })

    it('should skip non-matching siblings', () => {
      const el = fixtureEl.querySelector('.a')! as HTMLElement
      const result = SelectorEngine.next(el, 'p')

      expect(result).toHaveLength(1)
      expect(result[0].classList.contains('b')).toBe(true)
    })
  })

  describe('focusableChildren', () => {
    it('should return focusable children', () => {
      fixtureEl.innerHTML = '<div><button>OK</button><input type="text"><span>text</span></div>'
      const parent = fixtureEl.querySelector('div')!

      const result = SelectorEngine.focusableChildren(parent)

      expect(result.length).toBeGreaterThanOrEqual(1)
      const tags = result.map(el => el.tagName)
      expect(tags).toContain('BUTTON')
      expect(tags).toContain('INPUT')
      expect(tags).not.toContain('SPAN')
    })

    it('should exclude disabled elements', () => {
      fixtureEl.innerHTML = '<div><button disabled>No</button><button>Yes</button></div>'
      const parent = fixtureEl.querySelector('div')!

      const result = SelectorEngine.focusableChildren(parent)
      const texts = result.map(el => el.textContent)

      expect(texts).toContain('Yes')
      expect(texts).not.toContain('No')
    })

    it('should exclude elements with negative tabindex', () => {
      fixtureEl.innerHTML = '<div><button tabindex="-1">Hidden</button><button>Visible</button></div>'
      const parent = fixtureEl.querySelector('div')!

      const result = SelectorEngine.focusableChildren(parent)
      const texts = result.map(el => el.textContent)

      expect(texts).toContain('Visible')
      expect(texts).not.toContain('Hidden')
    })
  })

  describe('getSelector / getSelectorFromElement / getElementFromSelector', () => {
    it('should resolve data-tblr-target', () => {
      fixtureEl.innerHTML = '<div id="target"></div><a data-tblr-target="#target"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBe(fixtureEl.querySelector('#target'))
    })

    it('should resolve data-bs-target as fallback', () => {
      fixtureEl.innerHTML = '<div id="target"></div><a data-bs-target="#target"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBe(fixtureEl.querySelector('#target'))
    })

    it('should prioritize data-tblr-target over data-bs-target', () => {
      fixtureEl.innerHTML = '<div id="tblr"></div><div id="bs"></div><a data-tblr-target="#tblr" data-bs-target="#bs"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)!.id).toBe('tblr')
    })

    it('should resolve href as fallback', () => {
      fixtureEl.innerHTML = '<div id="target"></div><a href="#target"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBe(fixtureEl.querySelector('#target'))
    })

    it('should return null when no selector can be resolved', () => {
      fixtureEl.innerHTML = '<a></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBeNull()
    })

    it('should return null for href without hash or dot', () => {
      fixtureEl.innerHTML = '<a href="https://example.com"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBeNull()
    })

    it('should return null for href="#"', () => {
      fixtureEl.innerHTML = '<a href="#"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBeNull()
    })

    it('should extract hash from full URL href', () => {
      fixtureEl.innerHTML = '<div id="section"></div><a href="http://example.com/page#section"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBe(fixtureEl.querySelector('#section'))
    })

    it('should resolve class-based href selectors', () => {
      fixtureEl.innerHTML = '<div class="target"></div><a href=".target"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getElementFromSelector(trigger)).toBe(fixtureEl.querySelector('.target'))
    })

    it('getSelectorFromElement should return selector string when element exists', () => {
      fixtureEl.innerHTML = '<div id="target"></div><a data-tblr-target="#target"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getSelectorFromElement(trigger)).toBe('#target')
    })

    it('getSelectorFromElement should return null when target element does not exist', () => {
      fixtureEl.innerHTML = '<a data-tblr-target="#nonexistent"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getSelectorFromElement(trigger)).toBeNull()
    })

    it('getSelectorFromElement should return null when no selector', () => {
      fixtureEl.innerHTML = '<a></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getSelectorFromElement(trigger)).toBeNull()
    })
  })

  describe('getMultipleElementsFromSelector', () => {
    it('should return all matching elements', () => {
      fixtureEl.innerHTML = '<div class="item"></div><div class="item"></div><a data-tblr-target=".item"></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getMultipleElementsFromSelector(trigger)).toHaveLength(2)
    })

    it('should return an empty array when no selector', () => {
      fixtureEl.innerHTML = '<a></a>'
      const trigger = fixtureEl.querySelector('a')! as HTMLElement

      expect(SelectorEngine.getMultipleElementsFromSelector(trigger)).toEqual([])
    })
  })
})
