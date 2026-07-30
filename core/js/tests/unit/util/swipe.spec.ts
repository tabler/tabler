import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import Swipe from '../../../src/bootstrap/util/swipe'
import { clearFixture, getFixture } from '../../helpers/fixture'

function mockTouchSupport() {
  Object.defineProperty(document.documentElement, 'ontouchstart', {
    value: () => {},
    configurable: true
  })
}

function clearTouchSupport() {
  delete (document.documentElement as Record<string, unknown>).ontouchstart
}

function createTouchEvent(type: string, touches: Array<{ clientX: number }>, target: EventTarget): TouchEvent {
  const touchList = touches.map((t, i) => ({
    identifier: i,
    target,
    clientX: t.clientX,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
    radiusX: 0,
    radiusY: 0,
    rotationAngle: 0,
    force: 0
  })) as unknown as Touch[]

  const event = new Event(type, { bubbles: true, cancelable: true }) as TouchEvent
  Object.defineProperty(event, 'touches', { value: touchList })
  Object.defineProperty(event, 'changedTouches', { value: touchList })
  return event
}

function createPointerEvent(type: string, opts: Partial<PointerEvent> = {}): PointerEvent {
  return new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: opts.clientX ?? 0,
    pointerType: (opts as Record<string, unknown>).pointerType as string ?? 'touch',
    ...opts
  })
}

describe('Swipe', () => {
  let fixtureEl: HTMLElement
  let div: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    mockTouchSupport()
    fixtureEl.innerHTML = '<div style="width:300px;height:300px;"></div>'
    div = fixtureEl.querySelector('div')!
  })

  afterEach(() => {
    clearTouchSupport()
    clearFixture()
  })

  describe('constructor', () => {
    it('should create a Swipe instance', () => {
      const swipe = new Swipe(div)

      expect(swipe).toBeInstanceOf(Swipe)
      swipe.dispose()
    })

    it('should not init events when touch is not supported', () => {
      vi.spyOn(Swipe, 'isSupported').mockReturnValue(false)

      const swipe = new Swipe(div)

      expect(swipe._deltaX).toBeUndefined()

      vi.restoreAllMocks()
    })
  })

  describe('static', () => {
    it('NAME should return "swipe"', () => {
      expect(Swipe.NAME).toBe('swipe')
    })

    it('isSupported should return true when ontouchstart exists', () => {
      expect(Swipe.isSupported()).toBe(true)
    })

    it('isSupported should check ontouchstart and maxTouchPoints', () => {
      expect(typeof Swipe.isSupported()).toBe('boolean')
    })
  })

  describe('dispose', () => {
    it('should remove event listeners', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      swipe.dispose()

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 300 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 100 }))

      expect(leftCallback).not.toHaveBeenCalled()
    })
  })

  describe('pointer events', () => {
    it('should detect a left swipe', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 300 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 100 }))

      expect(leftCallback).toHaveBeenCalledOnce()
      swipe.dispose()
    })

    it('should detect a right swipe', () => {
      const rightCallback = vi.fn()
      const swipe = new Swipe(div, { rightCallback })

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 100 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 300 }))

      expect(rightCallback).toHaveBeenCalledOnce()
      swipe.dispose()
    })

    it('should call endCallback after swipe', () => {
      const endCallback = vi.fn()
      const swipe = new Swipe(div, { endCallback })

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 300 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 100 }))

      expect(endCallback).toHaveBeenCalledOnce()
      swipe.dispose()
    })

    it('should not trigger callback when swipe is below threshold', () => {
      const leftCallback = vi.fn()
      const rightCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback, rightCallback })

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 100 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 120 }))

      expect(leftCallback).not.toHaveBeenCalled()
      expect(rightCallback).not.toHaveBeenCalled()
      swipe.dispose()
    })

    it('should ignore non-touch/pen pointer types', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      div.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 300,
        pointerType: 'mouse'
      }))
      div.dispatchEvent(new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 100,
        pointerType: 'mouse'
      }))

      expect(leftCallback).not.toHaveBeenCalled()
      swipe.dispose()
    })

    it('should accept pen pointer type', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      div.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 300,
        pointerType: 'pen'
      }))
      div.dispatchEvent(new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 100,
        pointerType: 'pen'
      }))

      expect(leftCallback).toHaveBeenCalledOnce()
      swipe.dispose()
    })

    it('should add pointer-event class to element', () => {
      const swipe = new Swipe(div)

      expect(div.classList.contains('pointer-event')).toBe(true)
      swipe.dispose()
    })
  })

  describe('_handleSwipe edge cases', () => {
    it('should not trigger callbacks when deltaX is zero', () => {
      const leftCallback = vi.fn()
      const rightCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback, rightCallback })

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 200 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 200 }))

      expect(leftCallback).not.toHaveBeenCalled()
      expect(rightCallback).not.toHaveBeenCalled()
      swipe.dispose()
    })

    it('should reset deltaX after handling swipe', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 300 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 100 }))

      expect(leftCallback).toHaveBeenCalledOnce()

      div.dispatchEvent(createPointerEvent('pointerdown', { clientX: 300 }))
      div.dispatchEvent(createPointerEvent('pointerup', { clientX: 100 }))

      expect(leftCallback).toHaveBeenCalledTimes(2)
      swipe.dispose()
    })
  })

  describe('touch events (no PointerEvent)', () => {
    const origPointerEvent = globalThis.PointerEvent

    beforeEach(() => {
      // @ts-expect-error removing PointerEvent to test touch fallback
      delete globalThis.PointerEvent
    })

    afterEach(() => {
      globalThis.PointerEvent = origPointerEvent
    })

    it('should detect a left swipe via touch events', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      div.dispatchEvent(createTouchEvent('touchstart', [{ clientX: 300 }], div))
      div.dispatchEvent(createTouchEvent('touchmove', [{ clientX: 100 }], div))
      div.dispatchEvent(createTouchEvent('touchend', [], div))

      expect(leftCallback).toHaveBeenCalledOnce()
      swipe.dispose()
    })

    it('should detect a right swipe via touch events', () => {
      const rightCallback = vi.fn()
      const swipe = new Swipe(div, { rightCallback })

      div.dispatchEvent(createTouchEvent('touchstart', [{ clientX: 100 }], div))
      div.dispatchEvent(createTouchEvent('touchmove', [{ clientX: 300 }], div))
      div.dispatchEvent(createTouchEvent('touchend', [], div))

      expect(rightCallback).toHaveBeenCalledOnce()
      swipe.dispose()
    })

    it('should reset deltaX to 0 on multi-touch move', () => {
      const leftCallback = vi.fn()
      const swipe = new Swipe(div, { leftCallback })

      div.dispatchEvent(createTouchEvent('touchstart', [{ clientX: 300 }], div))
      div.dispatchEvent(createTouchEvent('touchmove', [{ clientX: 200 }, { clientX: 250 }], div))
      div.dispatchEvent(createTouchEvent('touchend', [], div))

      expect(leftCallback).not.toHaveBeenCalled()
      swipe.dispose()
    })

    it('should not add pointer-event class', () => {
      const swipe = new Swipe(div)

      expect(div.classList.contains('pointer-event')).toBe(false)
      swipe.dispose()
    })
  })

  describe('Default / DefaultType', () => {
    it('should have correct Default values', () => {
      expect(Swipe.Default).toEqual({
        endCallback: null,
        leftCallback: null,
        rightCallback: null
      })
    })

    it('should have correct DefaultType values', () => {
      expect(Swipe.DefaultType).toEqual({
        endCallback: '(function|null)',
        leftCallback: '(function|null)',
        rightCallback: '(function|null)'
      })
    })
  })
})
