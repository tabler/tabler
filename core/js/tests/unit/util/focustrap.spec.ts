import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import FocusTrap from '../../../src/bootstrap/util/focustrap'
import { clearFixture, getFixture } from '../../helpers/fixture'

vi.mock('../../../src/bootstrap/util/index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../src/bootstrap/util/index')>()
  return {
    ...actual,
    isVisible: () => true
  }
})

describe('FocusTrap', () => {
  let fixtureEl: HTMLElement
  let trapEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML =
      '<div id="trap" tabindex="-1">' +
        '<button id="btn1">First</button>' +
        '<button id="btn2">Second</button>' +
      '</div>' +
      '<button id="outside">Outside</button>'
    trapEl = fixtureEl.querySelector('#trap')!
  })

  afterEach(() => {
    clearFixture()
  })

  describe('static', () => {
    it('NAME should return "focustrap"', () => {
      expect(FocusTrap.NAME).toBe('focustrap')
    })

    it('Default should have correct values', () => {
      expect(FocusTrap.Default).toEqual({
        autofocus: true,
        trapElement: null
      })
    })

    it('DefaultType should have correct values', () => {
      expect(FocusTrap.DefaultType).toEqual({
        autofocus: 'boolean',
        trapElement: 'element'
      })
    })
  })

  describe('activate', () => {
    it('should focus the trap element when autofocus is true', () => {
      const focusSpy = vi.spyOn(trapEl, 'focus')
      const trap = new FocusTrap({ trapElement: trapEl })

      trap.activate()

      expect(focusSpy).toHaveBeenCalledOnce()
      trap.deactivate()
    })

    it('should not focus the trap element when autofocus is false', () => {
      const focusSpy = vi.spyOn(trapEl, 'focus')
      const trap = new FocusTrap({ trapElement: trapEl, autofocus: false })

      trap.activate()

      expect(focusSpy).not.toHaveBeenCalled()
      trap.deactivate()
    })

    it('should set _isActive to true', () => {
      const trap = new FocusTrap({ trapElement: trapEl })

      trap.activate()

      expect(trap._isActive).toBe(true)
      trap.deactivate()
    })

    it('should not re-activate if already active', () => {
      const focusSpy = vi.spyOn(trapEl, 'focus')
      const trap = new FocusTrap({ trapElement: trapEl })

      trap.activate()
      trap.activate()

      expect(focusSpy).toHaveBeenCalledOnce()
      trap.deactivate()
    })
  })

  describe('deactivate', () => {
    it('should set _isActive to false', () => {
      const trap = new FocusTrap({ trapElement: trapEl })

      trap.activate()
      trap.deactivate()

      expect(trap._isActive).toBe(false)
    })

    it('should not throw if not active', () => {
      const trap = new FocusTrap({ trapElement: trapEl })

      expect(() => trap.deactivate()).not.toThrow()
    })
  })

  describe('_handleFocusin', () => {
    it('should do nothing if focus target is the trap element', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      const btn1 = fixtureEl.querySelector('#btn1')! as HTMLElement
      const focusSpy = vi.spyOn(btn1, 'focus')

      const event = new FocusEvent('focusin', { relatedTarget: null })
      Object.defineProperty(event, 'target', { value: trapEl })
      document.dispatchEvent(event)

      expect(focusSpy).not.toHaveBeenCalled()
      trap.deactivate()
    })

    it('should do nothing if focus target is inside the trap', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      const btn1 = fixtureEl.querySelector('#btn1')! as HTMLElement
      const event = new FocusEvent('focusin', { relatedTarget: null })
      Object.defineProperty(event, 'target', { value: btn1 })
      document.dispatchEvent(event)

      trap.deactivate()
    })

    it('should focus first focusable child when focus leaves trap (forward)', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      const btn1 = fixtureEl.querySelector('#btn1')! as HTMLElement
      const focusSpy = vi.spyOn(btn1, 'focus')
      const outside = fixtureEl.querySelector('#outside')! as HTMLElement

      const event = new FocusEvent('focusin', { relatedTarget: null })
      Object.defineProperty(event, 'target', { value: outside })
      document.dispatchEvent(event)

      expect(focusSpy).toHaveBeenCalled()
      trap.deactivate()
    })

    it('should focus last focusable child when tabbing backward', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      const btn2 = fixtureEl.querySelector('#btn2')! as HTMLElement
      const focusSpy = vi.spyOn(btn2, 'focus')
      const outside = fixtureEl.querySelector('#outside')! as HTMLElement

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }))

      const focusEvent = new FocusEvent('focusin', { relatedTarget: null })
      Object.defineProperty(focusEvent, 'target', { value: outside })
      document.dispatchEvent(focusEvent)

      expect(focusSpy).toHaveBeenCalled()
      trap.deactivate()
    })

    it('should focus trap element if no focusable children', () => {
      fixtureEl.innerHTML = '<div id="empty-trap" tabindex="-1"></div><button id="out">Out</button>'
      const emptyTrap = fixtureEl.querySelector('#empty-trap')! as HTMLElement
      const trap = new FocusTrap({ trapElement: emptyTrap })
      trap.activate()

      const focusSpy = vi.spyOn(emptyTrap, 'focus')
      focusSpy.mockClear()

      const out = fixtureEl.querySelector('#out')! as HTMLElement
      const event = new FocusEvent('focusin', { relatedTarget: null })
      Object.defineProperty(event, 'target', { value: out })
      document.dispatchEvent(event)

      expect(focusSpy).toHaveBeenCalled()
      trap.deactivate()
    })

    it('should do nothing if focus target is document', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      const event = new FocusEvent('focusin', { relatedTarget: null })
      Object.defineProperty(event, 'target', { value: document })
      document.dispatchEvent(event)

      trap.deactivate()
    })
  })

  describe('_handleKeydown', () => {
    it('should track forward tab direction', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))

      expect(trap._lastTabNavDirection).toBe('forward')
      trap.deactivate()
    })

    it('should track backward tab direction (Shift+Tab)', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }))

      expect(trap._lastTabNavDirection).toBe('backward')
      trap.deactivate()
    })

    it('should ignore non-Tab keys', () => {
      const trap = new FocusTrap({ trapElement: trapEl })
      trap.activate()

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

      expect(trap._lastTabNavDirection).toBeNull()
      trap.deactivate()
    })
  })
})
