import { describe, it, expect, beforeAll, beforeEach, afterAll, afterEach, vi } from 'vitest'
import ScrollBarHelper from '../../../src/bootstrap/util/scrollbar'
import Manipulator from '../../../src/bootstrap/dom/manipulator'
import { clearBodyAndDocument, clearFixture, getFixture } from '../../helpers/fixture'

describe('ScrollBar', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
    fixtureEl.removeAttribute('style')
  })

  afterAll(() => {
    fixtureEl.remove()
  })

  beforeEach(() => {
    clearBodyAndDocument()
  })

  afterEach(() => {
    clearFixture()
    clearBodyAndDocument()
    vi.restoreAllMocks()
  })

  describe('getWidth', () => {
    it('should return the difference between innerWidth and clientWidth', () => {
      const scrollBar = new ScrollBarHelper()
      const expected = Math.abs(window.innerWidth - document.documentElement.clientWidth)
      expect(scrollBar.getWidth()).toBe(expected)
    })

    it('should return 0 when innerWidth equals clientWidth', () => {
      vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(window.innerWidth)
      expect(new ScrollBarHelper().getWidth()).toBe(0)
    })
  })

  describe('isOverflowing', () => {
    it('should return true when getWidth > 0', () => {
      const scrollBar = new ScrollBarHelper()
      vi.spyOn(scrollBar, 'getWidth').mockReturnValue(15)
      expect(scrollBar.isOverflowing()).toBe(true)
    })

    it('should return false when getWidth is 0', () => {
      const scrollBar = new ScrollBarHelper()
      vi.spyOn(scrollBar, 'getWidth').mockReturnValue(0)
      expect(scrollBar.isOverflowing()).toBe(false)
    })
  })

  describe('hide', () => {
    it('should set overflow hidden on body', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(0)

      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      expect(document.body.style.overflow).toBe('hidden')
      scrollBar.reset()
    })

    it('should adjust body padding-right by scrollbar width', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      document.body.style.paddingRight = '5px'
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      expect(document.body.style.paddingRight).toBe('20px')
      scrollBar.reset()
    })

    it('should save initial padding-right as data attribute', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      document.body.style.paddingRight = '5px'
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      expect(Manipulator.getDataAttribute(document.body, 'padding-right')).toBe('5px')
      scrollBar.reset()
    })

    it('should adjust fixed elements padding', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      fixtureEl.innerHTML = '<div class="fixed-top" style="padding-right: 0px; width: 100vw"></div>'
      document.body.appendChild(fixtureEl)

      const fixedEl = fixtureEl.querySelector('.fixed-top')! as HTMLElement
      // jsdom doesn't compute layout, so mock clientWidth to simulate full-width element
      vi.spyOn(fixedEl, 'clientWidth', 'get').mockReturnValue(window.innerWidth - 15)
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      expect(fixedEl.style.paddingRight).toBe('15px')
      scrollBar.reset()
    })
  })

  describe('reset', () => {
    it('should restore overflow on body', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(0)

      document.body.style.overflow = 'scroll'
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()
      expect(document.body.style.overflow).toBe('hidden')

      scrollBar.reset()
      expect(document.body.style.overflow).toBe('scroll')
    })

    it('should restore body padding-right', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      document.body.style.paddingRight = '5px'
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()
      expect(document.body.style.paddingRight).toBe('20px')

      scrollBar.reset()
      expect(document.body.style.paddingRight).toBe('5px')
    })

    it('should remove padding-right if it was not set before', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      document.body.style.removeProperty('padding-right')
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      scrollBar.reset()
      expect(document.body.style.paddingRight).toBe('')
    })

    it('should remove data attribute after reset', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      document.body.style.paddingRight = '5px'
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()
      scrollBar.reset()

      expect(Manipulator.getDataAttribute(document.body, 'padding-right')).toBeNull()
    })

    it('should preserve other inline styles', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(0)

      document.body.style.color = 'red'
      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()
      expect(document.body.style.color).toBe('red')

      scrollBar.reset()
      expect(document.body.style.color).toBe('red')
    })

    it('should reset sticky elements margin', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      fixtureEl.innerHTML = '<div class="sticky-top" style="margin-right: 10px; width: 100vw"></div>'
      document.body.appendChild(fixtureEl)

      const stickyEl = fixtureEl.querySelector('.sticky-top')! as HTMLElement
      vi.spyOn(stickyEl, 'clientWidth', 'get').mockReturnValue(window.innerWidth - 15)

      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      expect(Manipulator.getDataAttribute(stickyEl, 'margin-right')).toBe('10px')

      scrollBar.reset()
      expect(stickyEl.style.marginRight).toBe('10px')
      expect(Manipulator.getDataAttribute(stickyEl, 'margin-right')).toBeNull()
    })

    it('should skip non-full-width elements', () => {
      vi.spyOn(ScrollBarHelper.prototype, 'getWidth').mockReturnValue(15)

      fixtureEl.innerHTML = '<div class="sticky-top" style="margin-right: 0px; padding-right: 0px; width: 50vw"></div>'
      document.body.appendChild(fixtureEl)

      const stickyEl = fixtureEl.querySelector('.sticky-top')! as HTMLElement
      // clientWidth 0 (jsdom default) + scrollbarWidth 15 = 15, which is < innerWidth 1024
      // So this element will be skipped

      const scrollBar = new ScrollBarHelper()
      scrollBar.hide()

      expect(stickyEl.style.paddingRight).toBe('0px')
      expect(stickyEl.style.marginRight).toBe('0px')

      scrollBar.reset()
    })
  })
})
