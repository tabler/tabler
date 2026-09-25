import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import OtpInput from '../../src/otp-input'

const beforeInput = (input: HTMLInputElement, options: { inputType: string; data?: string }): InputEvent => {
  const event = new InputEvent('beforeinput', { cancelable: true, bubbles: true, ...options })
  input.dispatchEvent(event)
  return event
}

const typeInto = (input: HTMLInputElement, value: string): void => {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

const pointerDownOnSlot = (input: HTMLInputElement, slot: HTMLElement): void => {
  const rect = slot.getBoundingClientRect()
  input.dispatchEvent(new PointerEvent('pointerdown', { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, cancelable: true, bubbles: true }))
}

// The test page loads no stylesheet, so `.otp-slot` has no real flex layout;
// force a horizontal row of fixed-width slots for coordinate-based hit tests.
const layoutSlotsHorizontally = (container: HTMLElement, slotWidth = 40): void => {
  container.style.display = 'inline-flex'
  for (const slot of container.querySelectorAll<HTMLElement>('.otp-slot')) {
    slot.style.display = 'inline-block'
    slot.style.flex = 'none'
    slot.style.width = `${slotWidth}px`
  }
}

describe('OtpInput', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<div class="otp" data-bs-toggle="otp"><input type="text" /></div>'
  })

  afterEach(() => {
    clearFixture()
  })

  const otp = (): HTMLElement => fixtureEl.querySelector('.otp')!
  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const slots = (): HTMLElement[] => [...fixtureEl.querySelectorAll('.otp-slot')]

  describe('NAME', () => {
    it('should return the plugin name', () => {
      expect(OtpInput.NAME).toBe('otpInput')
    })
  })

  describe('constructor', () => {
    it('should default the length to 6 with no maxlength or option', () => {
      new OtpInput(otp())
      expect(slots()).toHaveLength(6)
      expect(input().getAttribute('maxlength')).toBe('6')
    })

    it('should read the length from the native maxlength', () => {
      input().setAttribute('maxlength', '4')
      new OtpInput(otp())
      expect(slots()).toHaveLength(4)
    })

    it('should let data-bs-length override maxlength', () => {
      input().setAttribute('maxlength', '4')
      otp().setAttribute('data-bs-length', '8')
      new OtpInput(otp())
      expect(slots()).toHaveLength(8)
      expect(input().getAttribute('maxlength')).toBe('8')
    })

    it('should default the length to the sum of groups when length is not set', () => {
      otp().setAttribute('data-bs-groups', '[4,4]')
      new OtpInput(otp())
      expect(slots()).toHaveLength(8)
      expect(input().getAttribute('maxlength')).toBe('8')
    })

    it('should let the native maxlength override the sum of groups', () => {
      input().setAttribute('maxlength', '6')
      otp().setAttribute('data-bs-groups', '[3]')
      new OtpInput(otp())
      expect(slots()).toHaveLength(6)
    })

    it('should set inputmode and pattern from the type option', () => {
      otp().setAttribute('data-bs-type', 'alphanumeric')
      new OtpInput(otp())
      expect(input().getAttribute('inputmode')).toBe('text')
      expect(input().getAttribute('pattern')).toBe('[A-Za-z0-9]*')
    })

    it('should default autocomplete to one-time-code', () => {
      new OtpInput(otp())
      expect(input().getAttribute('autocomplete')).toBe('one-time-code')
    })

    it('should keep an author-supplied autocomplete', () => {
      input().setAttribute('autocomplete', 'off')
      new OtpInput(otp())
      expect(input().getAttribute('autocomplete')).toBe('off')
    })

    it('should mark the wrapper as rendered', () => {
      new OtpInput(otp())
      expect(otp().classList.contains('otp-rendered')).toBe(true)
    })

    it('should sanitize a pre-filled value', () => {
      input().value = '12-34'
      new OtpInput(otp())
      expect(input().value).toBe('1234')
    })

    it('should do nothing without an inner input', () => {
      fixtureEl.innerHTML = '<div class="otp" data-bs-toggle="otp"></div>'
      expect(() => new OtpInput(otp())).not.toThrow()
    })
  })

  describe('value handling', () => {
    it('getValue should reflect the input value', () => {
      const instance = new OtpInput(otp())
      typeInto(input(), '123456')
      expect(instance.getValue()).toBe('123456')
    })

    it('setValue should render into the slots', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123456')
      expect(slots().map((slot) => slot.textContent)).toEqual(['1', '2', '3', '4', '5', '6'])
    })

    it('setValue should sanitize and truncate', () => {
      const instance = new OtpInput(otp())
      instance.setValue('1a2b3c4d5e6f7g')
      expect(instance.getValue()).toBe('123456')
    })

    it('setValue should accept a number', () => {
      const instance = new OtpInput(otp())
      instance.setValue(123)
      expect(instance.getValue()).toBe('123')
    })

    it('clear should empty the value and focus the input', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123456')
      instance.clear()
      expect(instance.getValue()).toBe('')
      expect(document.activeElement).toBe(input())
    })
  })

  describe('input handling', () => {
    it('should strip disallowed characters from a pasted value', () => {
      new OtpInput(otp())
      typeInto(input(), '123-456')
      expect(input().value).toBe('123456')
    })

    it('should keep letters for an alphanumeric type', () => {
      otp().setAttribute('data-bs-type', 'alphanumeric')
      new OtpInput(otp())
      typeInto(input(), 'aB3-xZ9')
      expect(input().value).toBe('aB3xZ9')
    })

    it('should truncate a pasted value to the slot count', () => {
      otp().setAttribute('data-bs-length', '4')
      new OtpInput(otp())
      typeInto(input(), '123456')
      expect(input().value).toBe('1234')
    })
  })

  describe('interaction', () => {
    it('should overwrite the active slot when typing', () => {
      new OtpInput(otp())
      input().focus()
      beforeInput(input(), { inputType: 'insertText', data: '1' })
      beforeInput(input(), { inputType: 'insertText', data: '2' })
      expect(input().value).toBe('12')
      expect(input().selectionStart).toBe(2)
    })

    it('should swallow a disallowed character on beforeinput', () => {
      new OtpInput(otp())
      input().focus()
      const event = beforeInput(input(), { inputType: 'insertText', data: '#' })
      expect(event.defaultPrevented).toBe(true)
      expect(input().value).toBe('')
    })

    it('should delete the previous character on backspace with a collapsed caret', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123')
      input().setSelectionRange(3, 3)
      beforeInput(input(), { inputType: 'deleteContentBackward' })
      expect(input().value).toBe('12')
      expect(input().selectionStart).toBe(2)
    })

    it('should clear a selected slot on backspace', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123')
      input().setSelectionRange(1, 2)
      beforeInput(input(), { inputType: 'deleteContentBackward' })
      expect(input().value).toBe('13')
      expect(input().selectionStart).toBe(1)
    })

    it('should do nothing on backspace at the start of an empty field', () => {
      new OtpInput(otp())
      input().setSelectionRange(0, 0)
      const event = beforeInput(input(), { inputType: 'deleteContentBackward' })
      expect(event.defaultPrevented).toBe(true)
      expect(input().value).toBe('')
    })

    it('should clear a selected slot on delete without shifting the caret', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123456')
      input().setSelectionRange(3, 4)
      beforeInput(input(), { inputType: 'deleteContentForward' })
      expect(input().value).toBe('12356')
      expect(input().selectionStart).toBe(3)
    })

    it('should delete the next character on delete with a collapsed caret', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123')
      input().setSelectionRange(1, 1)
      beforeInput(input(), { inputType: 'deleteContentForward' })
      expect(input().value).toBe('13')
      expect(input().selectionStart).toBe(1)
    })

    it('should do nothing on delete at the end of the value', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123')
      input().setSelectionRange(3, 3)
      const event = beforeInput(input(), { inputType: 'deleteContentForward' })
      expect(event.defaultPrevented).toBe(true)
      expect(input().value).toBe('123')
    })

    it('should select the first empty slot on keyboard focus', () => {
      const instance = new OtpInput(otp())
      instance.setValue('12')
      input().focus()
      expect(input().selectionStart).toBe(2)
      expect(input().selectionEnd).toBe(2)
    })

    it('should select the last slot on focus when the value is full', () => {
      const instance = new OtpInput(otp())
      instance.setValue('123456')
      input().focus()
      expect(input().selectionStart).toBe(5)
      expect(input().selectionEnd).toBe(6)
    })

    it('should position the caret from a tap on a slot', () => {
      const instance = new OtpInput(otp())
      layoutSlotsHorizontally(otp())
      instance.setValue('123456')
      input().focus()
      pointerDownOnSlot(input(), slots()[2])
      expect(input().selectionStart).toBe(2)
    })

    it('should clamp a tap past the filled slots to the first empty one', () => {
      const instance = new OtpInput(otp())
      layoutSlotsHorizontally(otp())
      instance.setValue('12')
      input().focus()
      pointerDownOnSlot(input(), slots()[5])
      expect(input().selectionStart).toBe(2)
    })

    it('should mirror the tap position in RTL', () => {
      otp().setAttribute('dir', 'rtl')
      const instance = new OtpInput(otp())
      layoutSlotsHorizontally(otp())
      instance.setValue('123456')
      input().focus()
      pointerDownOnSlot(input(), slots()[4])
      expect(input().selectionStart).toBe(4)
    })
  })

  describe('mask', () => {
    it('should render slots as the mask character while keeping the real value', () => {
      otp().setAttribute('data-bs-mask', 'true')
      const instance = new OtpInput(otp())
      instance.setValue('123456')
      expect(instance.getValue()).toBe('123456')
      expect(slots().every((slot) => slot.textContent === '•')).toBe(true)
    })

    it('should never switch the input to type=password', () => {
      otp().setAttribute('data-bs-mask', 'true')
      new OtpInput(otp())
      expect(input().type).toBe('text')
    })
  })

  describe('groups and separator', () => {
    it('should render one separator between two groups', () => {
      otp().setAttribute('data-bs-groups', '[3,3]')
      new OtpInput(otp())
      expect(slots()).toHaveLength(6)
      expect(fixtureEl.querySelectorAll('.otp-separator')).toHaveLength(1)
    })

    it('should use a custom separator character', () => {
      otp().setAttribute('data-bs-groups', '[3,3]')
      otp().setAttribute('data-bs-separator', '-')
      new OtpInput(otp())
      expect(fixtureEl.querySelector('.otp-separator')!.textContent).toBe('-')
    })
  })

  describe('events', () => {
    it('should trigger complete.bs.otpInput when the value fills every slot', () => {
      new OtpInput(otp())
      const spy = vi.fn()
      otp().addEventListener('complete.bs.otpInput', spy)

      typeInto(input(), '123456')

      expect(spy).toHaveBeenCalledTimes(1)
      expect((spy.mock.calls[0][0] as Event & { value: string }).value).toBe('123456')
    })

    it('should trigger input.bs.otpInput on every change', () => {
      new OtpInput(otp())
      const spy = vi.fn()
      otp().addEventListener('input.bs.otpInput', spy)

      typeInto(input(), '12')

      expect(spy).toHaveBeenCalledTimes(1)
      expect((spy.mock.calls[0][0] as Event & { value: string }).value).toBe('12')
    })

    it('should not trigger input.bs.otpInput from setValue', () => {
      const instance = new OtpInput(otp())
      const spy = vi.fn()
      otp().addEventListener('input.bs.otpInput', spy)

      instance.setValue('123456')

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('dispose', () => {
    it('should remove the rendered slots and instance', () => {
      const instance = new OtpInput(otp())
      instance.dispose()

      expect(OtpInput.getInstance(otp())).toBeNull()
      expect(fixtureEl.querySelectorAll('.otp-slot')).toHaveLength(0)
      expect(otp().classList.contains('otp-rendered')).toBe(false)
    })

    it('should stop reacting to input after dispose', () => {
      const instance = new OtpInput(otp())
      instance.dispose()

      const event = beforeInput(input(), { inputType: 'insertText', data: '1' })
      expect(event.defaultPrevented).toBe(false)
    })
  })
})
