import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import FloatingUi from '../../../src/bootstrap/util/floating-ui'
import { clearFixture, getFixture } from '../../helpers/fixture'

describe('FloatingUi', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
  })

  describe('parseOffset', () => {
    it('should turn a skidding/distance array into named axes', () => {
      expect(FloatingUi.parseOffset([5, 10], fixtureEl)).toEqual({ mainAxis: 10, crossAxis: 5 })
    })

    it('should parse a comma separated string', () => {
      expect(FloatingUi.parseOffset('10,20', fixtureEl)).toEqual({ mainAxis: 20, crossAxis: 10 })
    })

    it('should keep a plain number', () => {
      expect(FloatingUi.parseOffset(8, fixtureEl)).toBe(8)
    })

    it('should wrap a function and pass the element as second argument', () => {
      const offsetFn = vi.fn().mockReturnValue([5, 10])
      const parsed = FloatingUi.parseOffset(offsetFn, fixtureEl)

      expect(typeof parsed).toBe('function')
      expect((parsed as (state: unknown) => unknown)({ placement: 'top' })).toEqual({ mainAxis: 10, crossAxis: 5 })
      expect(offsetFn).toHaveBeenCalledWith({ placement: 'top' }, fixtureEl)
    })

    it('should fall back to no offset', () => {
      expect(FloatingUi.parseOffset(null, fixtureEl)).toBe(0)
    })
  })

  describe('getBoundary', () => {
    it('should map Popper string boundaries to clippingAncestors', () => {
      expect(FloatingUi.getBoundary('clippingParents')).toBe('clippingAncestors')
      expect(FloatingUi.getBoundary(undefined)).toBe('clippingAncestors')
    })

    it('should keep an element boundary', () => {
      expect(FloatingUi.getBoundary(fixtureEl)).toBe(fixtureEl)
    })
  })

  describe('getReferenceElement', () => {
    it('should return the parent for "parent"', () => {
      fixtureEl.innerHTML = '<div class="parent"><button>Toggle</button></div>'
      const parent = fixtureEl.querySelector('.parent') as HTMLElement
      const button = fixtureEl.querySelector('button') as HTMLElement

      expect(FloatingUi.getReferenceElement('parent', button, parent)).toBe(parent)
    })

    it('should return a given element', () => {
      fixtureEl.innerHTML = '<div class="parent"><button>Toggle</button></div>'
      const parent = fixtureEl.querySelector('.parent') as HTMLElement
      const button = fixtureEl.querySelector('button') as HTMLElement

      expect(FloatingUi.getReferenceElement(fixtureEl, button, parent)).toBe(fixtureEl)
    })

    it('should return a virtual element', () => {
      fixtureEl.innerHTML = '<div class="parent"><button>Toggle</button></div>'
      const parent = fixtureEl.querySelector('.parent') as HTMLElement
      const button = fixtureEl.querySelector('button') as HTMLElement
      const virtualElement = { getBoundingClientRect: () => new DOMRect() }

      expect(FloatingUi.getReferenceElement(virtualElement, button, parent)).toBe(virtualElement)
    })

    it('should fall back to the default element', () => {
      fixtureEl.innerHTML = '<div class="parent"><button>Toggle</button></div>'
      const parent = fixtureEl.querySelector('.parent') as HTMLElement
      const button = fixtureEl.querySelector('button') as HTMLElement

      expect(FloatingUi.getReferenceElement('toggle', button, parent)).toBe(button)
    })
  })

  describe('calculate', () => {
    it('should position the floating element and set the placement attribute', async () => {
      fixtureEl.innerHTML = '<button>Toggle</button><div class="floating">Floating</div>'
      const button = fixtureEl.querySelector('button') as HTMLElement
      const floating = fixtureEl.querySelector('.floating') as HTMLElement
      const floatingUi = new FloatingUi()

      floatingUi.calculate(button, floating, { placement: 'bottom-start' })
      await vi.waitFor(() => expect(floating.getAttribute('data-popper-placement')).toBe('bottom-start'))

      expect(floating.style.position).toBe('absolute')
      expect(floating.style.top).not.toBe('')
      expect(floating.style.left).not.toBe('')

      floatingUi.stop()
    })

    it('should reposition on its own when the reference moves', async () => {
      fixtureEl.innerHTML = '<div style="position: relative; height: 400px"><button style="position: absolute; top: 20px; left: 20px">Toggle</button><div class="floating" style="width: 50px; height: 20px">Floating</div></div>'
      const button = fixtureEl.querySelector('button') as HTMLElement
      const floating = fixtureEl.querySelector('.floating') as HTMLElement
      const floatingUi = new FloatingUi()

      floatingUi.calculate(button, floating, { placement: 'bottom-start' })
      await vi.waitFor(() => expect(floating.style.left).not.toBe(''))

      const initialLeft = floating.style.left
      button.style.left = '160px'

      await vi.waitFor(() => expect(floating.style.left).not.toBe(initialLeft))

      floatingUi.stop()
    })

    it('should stop the auto update listeners', () => {
      fixtureEl.innerHTML = '<button>Toggle</button><div class="floating">Floating</div>'
      const button = fixtureEl.querySelector('button') as HTMLElement
      const floating = fixtureEl.querySelector('.floating') as HTMLElement
      const floatingUi = new FloatingUi()

      floatingUi.calculate(button, floating, { placement: 'top' })
      expect(floatingUi._cleanup).not.toBeNull()

      floatingUi.stop()

      expect(floatingUi._cleanup).toBeNull()
      expect(floatingUi._compute).toBeNull()
    })

    it('should do nothing on update when it was never started', () => {
      const floatingUi = new FloatingUi()

      expect(() => floatingUi.update()).not.toThrow()
    })
  })
})
