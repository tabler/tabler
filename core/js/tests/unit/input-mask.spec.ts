import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import InputMask from '../../src/input-mask'

describe('InputMask', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<input type="text" data-mask="(00) 0000-0000">'
  })

  afterEach(() => {
    clearFixture()
  })

  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!

  const type = (el: HTMLInputElement, value: string, inputType = 'insertText', caret = value.length): void => {
    el.value = value
    el.setSelectionRange(caret, caret)
    el.dispatchEvent(new InputEvent('input', { inputType, bubbles: true }))
  }

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(InputMask.NAME).toBe('input-mask')
    })
  })

  describe('formatting', () => {
    it('should add literals as the user types', () => {
      const el = input()
      const instance = new InputMask(el)

      type(el, '1')
      expect(el.value).toBe('(1')

      type(el, '(12')
      type(el, '(123')
      expect(el.value).toBe('(12) 3')
      expect(instance.unmaskedValue).toBe('123')
    })

    it('should drop characters the token does not accept', () => {
      const el = input()
      new InputMask(el)

      type(el, 'a1b2')
      expect(el.value).toBe('(12')
    })

    it('should format a pasted value and cut it to the mask', () => {
      const el = input()
      const instance = new InputMask(el)

      type(el, '+48 (12) 3456-7890 1234', 'insertFromPaste')
      expect(el.value).toBe('(48) 1234-5678')
      expect(instance.unmaskedValue).toBe('4812345678')
    })

    it('should mask a value set before the component was created', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask="00/00/0000" value="31122026">'
      new InputMask(input())

      expect(input().value).toBe('31/12/2026')
    })

    it('should re-apply the mask on update()', () => {
      const instance = new InputMask(input())

      input().value = '1234567890'
      instance.update()

      expect(input().value).toBe('(12) 3456-7890')
    })

    it('should keep the caret after the typed character in the middle', () => {
      const el = input()
      new InputMask(el)
      el.focus()

      type(el, '(12) 3456-7890')
      type(el, '(192) 3456-7890', 'insertText', 3)

      expect(el.value).toBe('(19) 2345-6789')
      expect(el.selectionStart).toBe(3)
    })
  })

  describe('deleting', () => {
    it('should remove the digit before a deleted literal', () => {
      const el = input()
      const instance = new InputMask(el)

      type(el, '(12) 3')
      type(el, '(12)3', 'deleteContentBackward', 4)

      expect(instance.unmaskedValue).toBe('13')
      expect(el.value).toBe('(13')
    })

    it('should clear a lazy mask when the value is emptied', () => {
      const el = input()
      new InputMask(el)

      type(el, '(1')
      type(el, '', 'deleteContentBackward', 0)

      expect(el.value).toBe('')
    })
  })

  describe('visible mask', () => {
    it('should show placeholders from the start', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask="00/00" data-mask-visible="true">'
      new InputMask(input())

      expect(input().value).toBe('__/__')
    })

    it('should fill the slots and treat a bare attribute as visible', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask="00/00" data-mask-visible>'
      const el = input()
      const instance = new InputMask(el)

      type(el, '1__/__')
      expect(el.value).toBe('1_/__')
      expect(instance.unmaskedValue).toBe('1')
    })

    it('should use the placeholder character from the attribute', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask="00" data-mask-visible data-mask-placeholder-char="#">'
      new InputMask(input())

      expect(input().value).toBe('##')
    })
  })

  describe('tokens', () => {
    it('should support letters and any character', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask="aa-**">'
      const el = input()
      new InputMask(el)

      type(el, '1ab-9z')
      expect(el.value).toBe('ab-9z')
    })

    it('should use custom tokens', () => {
      const el = input()
      new InputMask(el, { mask: 'HH', tokens: { H: /[0-9a-f]/i } })

      type(el, 'fg9')
      expect(el.value).toBe('f9')
    })

    it('should treat an escaped token as a literal', () => {
      fixtureEl.innerHTML = ''
      const el = fixtureEl.appendChild(document.createElement('input'))
      new InputMask(el, { mask: '\\000', lazy: false })

      expect(el.value).toBe('0__')
    })
  })

  describe('dynamic mask', () => {
    it('should pick the mask from the unmasked value', () => {
      const el = input()
      new InputMask(el, { mask: (value: string) => (value.startsWith('34') || value.startsWith('37') ? '0000 000000 00000' : '0000 0000 0000 0000') })

      type(el, '3782822463100005')
      expect(el.value).toBe('3782 822463 10000')
    })
  })

  describe('number type', () => {
    const number = (attributes: string): HTMLInputElement => {
      fixtureEl.innerHTML = `<input type="text" data-mask-type="number" ${attributes}>`
      new InputMask(input())

      return input()
    }

    it('should group thousands and cut the fraction to the scale', () => {
      const el = number('data-mask-thousands-separator=" "')

      type(el, '1234567.891')

      expect(el.value).toBe('1 234 567.89')
      expect(InputMask.getInstance(el)!.unmaskedValue).toBe('1234567.89')
    })

    it('should map the other separator to the radix', () => {
      const el = number('data-mask-radix="," data-mask-thousands-separator=" "')

      type(el, '1234.5')

      expect(el.value).toBe('1 234,5')
      expect(InputMask.getInstance(el)!.unmaskedValue).toBe('1234.5')
    })

    it('should keep a typed radix and the minus sign', () => {
      const el = number('')

      type(el, '-')
      expect(el.value).toBe('-')

      type(el, '-12.')
      expect(el.value).toBe('-12.')

      type(el, '.5')
      expect(el.value).toBe('0.5')
    })

    it('should support integers with a scale of 0', () => {
      const el = number('data-mask-scale="0"')

      type(el, '12.5')

      expect(el.value).toBe('125')
    })

    it('should forbid the minus sign when min is not negative', () => {
      const el = number('data-mask-min="0"')

      type(el, '-5')

      expect(el.value).toBe('5')
    })

    it('should cut the value down to max', () => {
      const el = number('data-mask-max="100"')

      type(el, '250')

      expect(el.value).toBe('100')
    })

    it('should wrap the number in a prefix and a suffix', () => {
      const el = number('data-mask-prefix="$" data-mask-suffix=" USD" data-mask-thousands-separator=","')

      type(el, '$1234.5 USD')

      expect(el.value).toBe('$1,234.5 USD')
      expect(InputMask.getInstance(el)!.unmaskedValue).toBe('1234.5')
    })

    it('should pad the fraction and raise to min on blur', () => {
      const el = number('data-mask-pad-fractional-zeros="true" data-mask-min="10"')

      type(el, '5')
      el.dispatchEvent(new Event('blur'))

      expect(el.value).toBe('10.00')
    })

    it('should remove the digit next to a deleted separator', () => {
      const el = number('data-mask-thousands-separator=" "')

      type(el, '1234')
      expect(el.value).toBe('1 234')

      type(el, '1234', 'deleteContentBackward', 1)

      expect(el.value).toBe('234')
    })

    it('should format a value set before the component was created', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask-type="number" data-mask-thousands-separator=" " value="1234.5">'
      new InputMask(input())

      expect(input().value).toBe('1 234.5')
    })
  })

  describe('events', () => {
    it('should fire accept with the values', () => {
      const el = input()
      new InputMask(el)
      const spy = vi.fn()
      el.addEventListener('accept.bs.input-mask', ((event: CustomEvent) => spy(event)) as EventListener)

      type(el, '12')

      expect(spy).toHaveBeenCalledTimes(1)
      const event = spy.mock.calls[0][0] as Event & { value: string; unmaskedValue: string }
      expect(event.value).toBe('(12')
      expect(event.unmaskedValue).toBe('12')
    })

    it('should fire complete once when every slot is filled', () => {
      const el = input()
      const instance = new InputMask(el)
      const spy = vi.fn()
      el.addEventListener('complete.bs.input-mask', spy)

      type(el, '(12) 3456-789')
      expect(spy).not.toHaveBeenCalled()
      expect(instance.isComplete).toBe(false)

      type(el, '(12) 3456-7890')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(instance.isComplete).toBe(true)
    })
  })

  describe('constructor', () => {
    it('should let the config object win over the attributes', () => {
      const el = input()
      new InputMask(el, { mask: '0000' })

      type(el, '12345')
      expect(el.value).toBe('1234')
    })

    it('should stay inert without a mask', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask>'
      const instance = new InputMask(input())

      type(input(), 'abc')
      expect(input().value).toBe('abc')
      expect(instance.mask).toBeNull()
    })

    it('should warn and stay inert for an IMask object mask without IMask', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      fixtureEl.innerHTML = '<input type="text">'
      new InputMask(input(), { mask: Number as unknown as string })

      expect(warn).toHaveBeenCalled()
      warn.mockRestore()
    })
  })

  describe('legacy IMask fallback', () => {
    afterEach(() => {
      delete window.IMask
    })

    it('should hand an object mask to IMask when it is loaded', () => {
      const plugin = vi.fn(function (this: Record<string, unknown>) {
        this.updateValue = vi.fn()
        this.destroy = vi.fn()
      })
      window.IMask = plugin as unknown as Window['IMask']
      fixtureEl.innerHTML = '<input type="text">'

      const instance = new InputMask(input(), { mask: Number as unknown as string })

      expect(plugin).toHaveBeenCalledTimes(1)
      expect(instance.mask).toBe(plugin.mock.instances[0])
    })
  })

  describe('public API', () => {
    it('should remove the listeners and the instance on dispose', () => {
      const el = input()
      const instance = new InputMask(el)

      instance.dispose()
      type(el, 'abc')

      expect(el.value).toBe('abc')
      expect(InputMask.getInstance(el)).toBeNull()
    })

    it('should answer the IMask member names', () => {
      const instance = new InputMask(input())

      expect(instance.mask).toBe(instance)
      expect(typeof instance.updateValue).toBe('function')
      expect(typeof instance.destroy).toBe('function')
    })
  })

  describe('getOrCreateInstance', () => {
    it('should reuse the instance', () => {
      const first = InputMask.getOrCreateInstance(input())
      const second = InputMask.getOrCreateInstance(input())

      expect(second).toBe(first)
    })
  })
})
