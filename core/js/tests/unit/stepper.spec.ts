import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Stepper from '../../src/stepper'

const markup = (inputAttributes = 'value="1" min="0" max="5"', wrapperAttributes = ''): string =>
  [
    `<div class="stepper" data-bs-toggle="stepper" ${wrapperAttributes}>`,
    '  <button type="button" class="btn" data-bs-stepper-action="decrement">-</button>',
    `  <input type="text" class="form-control" ${inputAttributes} />`,
    '  <button type="button" class="btn" data-bs-stepper-action="increment">+</button>',
    '</div>',
  ].join('')

describe('Stepper', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = markup()
  })

  afterEach(() => {
    clearFixture()
    vi.useRealTimers()
  })

  const stepper = (): HTMLElement => fixtureEl.querySelector('.stepper')!
  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const decrementButton = (): HTMLButtonElement => fixtureEl.querySelector('[data-bs-stepper-action="decrement"]')!
  const incrementButton = (): HTMLButtonElement => fixtureEl.querySelector('[data-bs-stepper-action="increment"]')!

  const change = (value: string): void => {
    input().value = value
    input().dispatchEvent(new Event('change', { bubbles: true }))
  }

  const keydown = (key: string): KeyboardEvent => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
    input().dispatchEvent(event)
    return event
  }

  describe('NAME', () => {
    it('should return the plugin name', () => {
      expect(Stepper.NAME).toBe('stepper')
    })
  })

  describe('Default', () => {
    it('should expose the default config', () => {
      expect(Stepper.Default.min).toBeNull()
      expect(Stepper.Default.repeat).toBe(true)
      expect(typeof Stepper.DefaultType.step).toBe('string')
    })
  })

  describe('constructor', () => {
    it('should read the bounds from the input attributes', () => {
      const instance = new Stepper(stepper())
      expect(instance._min).toBe(0)
      expect(instance._max).toBe(5)
      expect(instance._step).toBe(1)
    })

    it('should let the config override the input attributes', () => {
      const instance = new Stepper(stepper(), { min: 2, max: 10, step: 2 })
      expect(instance._min).toBe(2)
      expect(instance._max).toBe(10)
      expect(instance._step).toBe(2)
      expect(input().value).toBe('2')
    })

    it('should read the config from data attributes', () => {
      fixtureEl.innerHTML = markup('value="1"', 'data-bs-min="1" data-bs-max="3" data-bs-step="0.5"')
      const instance = new Stepper(stepper())
      expect(instance._min).toBe(1)
      expect(instance._max).toBe(3)
      expect(instance._step).toBe(0.5)
    })

    it('should have no bounds when neither attributes nor config set them', () => {
      fixtureEl.innerHTML = markup('value="1"')
      const instance = new Stepper(stepper())
      expect(instance._min).toBe(Number.NEGATIVE_INFINITY)
      expect(instance._max).toBe(Number.POSITIVE_INFINITY)
    })

    it('should fall back to a step of 1 for a zero or negative step', () => {
      fixtureEl.innerHTML = markup('value="1" step="0"')
      expect(new Stepper(stepper())._step).toBe(1)
    })

    it('should clamp the initial value', () => {
      fixtureEl.innerHTML = markup('value="9" min="0" max="5"')
      new Stepper(stepper())
      expect(input().value).toBe('5')
    })

    it('should give a text input the spinbutton role and a numeric inputmode', () => {
      new Stepper(stepper())
      expect(input().getAttribute('role')).toBe('spinbutton')
      expect(input().getAttribute('inputmode')).toBe('numeric')
      expect(input().getAttribute('aria-valuemin')).toBe('0')
      expect(input().getAttribute('aria-valuemax')).toBe('5')
      expect(input().getAttribute('aria-valuenow')).toBe('1')
    })

    it('should use the decimal inputmode for a fractional step', () => {
      fixtureEl.innerHTML = markup('value="1" step="0.25"')
      new Stepper(stepper())
      expect(input().getAttribute('inputmode')).toBe('decimal')
    })

    it('should leave a number input alone', () => {
      fixtureEl.innerHTML = markup('type="number" value="1" min="0" max="5"').replace('type="text"', '')
      new Stepper(stepper())
      expect(input().hasAttribute('role')).toBe(false)
      expect(input().hasAttribute('aria-valuenow')).toBe(false)
    })

    it('should do nothing without an input', () => {
      fixtureEl.innerHTML = '<div class="stepper"></div>'
      const instance = new Stepper(stepper())
      expect(instance._input).toBeNull()
      expect(instance.getValue()).toBeNull()
    })

    it('should disable the buttons of a disabled input', () => {
      fixtureEl.innerHTML = markup('value="1" disabled')
      new Stepper(stepper())
      expect(decrementButton().disabled).toBe(true)
      expect(incrementButton().disabled).toBe(true)
    })
  })

  describe('buttons', () => {
    it('should step the value on click', () => {
      new Stepper(stepper())
      incrementButton().click()
      expect(input().value).toBe('2')
      decrementButton().click()
      decrementButton().click()
      expect(input().value).toBe('0')
    })

    it('should disable the button at a bound', () => {
      fixtureEl.innerHTML = markup('value="4" min="0" max="5"')
      new Stepper(stepper())
      expect(incrementButton().disabled).toBe(false)
      incrementButton().click()
      expect(input().value).toBe('5')
      expect(incrementButton().disabled).toBe(true)
      expect(decrementButton().disabled).toBe(false)
    })

    it('should never leave the bounds', () => {
      const instance = new Stepper(stepper(), { max: 2 })
      instance.increment()
      instance.increment()
      instance.increment()
      expect(input().value).toBe('2')
    })

    it('should keep stepping while a button is held', () => {
      vi.useFakeTimers()
      new Stepper(stepper(), { max: 100 })

      incrementButton().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }))
      vi.advanceTimersByTime(400)
      expect(input().value).toBe('2')
      vi.advanceTimersByTime(80 * 3)
      expect(input().value).toBe('5')

      incrementButton().dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
      vi.advanceTimersByTime(1000)
      expect(input().value).toBe('5')

      // The click that ends the hold is not one more step
      incrementButton().click()
      expect(input().value).toBe('5')
    })

    it('should stop a hold at a bound', () => {
      vi.useFakeTimers()
      const instance = new Stepper(stepper(), { max: 3 })

      incrementButton().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }))
      vi.advanceTimersByTime(400 + 80 * 5)
      expect(input().value).toBe('3')
      expect(instance._repeatTimer).toBeNull()
    })

    it('should not repeat when the option is off', () => {
      vi.useFakeTimers()
      new Stepper(stepper(), { repeat: false, max: 100 })

      incrementButton().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }))
      vi.advanceTimersByTime(2000)
      expect(input().value).toBe('1')
    })
  })

  describe('keyboard', () => {
    it('should step with the arrow keys and jump with Home and End', () => {
      new Stepper(stepper())
      expect(keydown('ArrowUp').defaultPrevented).toBe(true)
      expect(input().value).toBe('2')
      keydown('ArrowDown')
      expect(input().value).toBe('1')
      keydown('End')
      expect(input().value).toBe('5')
      keydown('Home')
      expect(input().value).toBe('0')
    })

    it('should ignore Home and End without a bound', () => {
      fixtureEl.innerHTML = markup('value="1"')
      new Stepper(stepper())
      expect(keydown('End').defaultPrevented).toBe(false)
      expect(input().value).toBe('1')
    })

    it('should leave other keys alone', () => {
      new Stepper(stepper())
      expect(keydown('a').defaultPrevented).toBe(false)
    })
  })

  describe('typed value', () => {
    it('should clamp a typed value on change', () => {
      new Stepper(stepper())
      change('42')
      expect(input().value).toBe('5')
      expect(incrementButton().disabled).toBe(true)
    })

    it('should clamp on blur as well', () => {
      new Stepper(stepper())
      input().value = '125'
      input().dispatchEvent(new Event('blur'))
      expect(input().value).toBe('5')
    })

    it('should fire nothing when an untouched field is left', () => {
      new Stepper(stepper())
      const spy = vi.fn()
      input().addEventListener('change', spy)
      input().dispatchEvent(new Event('blur'))
      expect(spy).not.toHaveBeenCalled()
    })

    it('should restore the previous value after a non-numeric edit', () => {
      new Stepper(stepper())
      change('3')
      change('abc')
      expect(input().value).toBe('3')
    })

    it('should accept a decimal comma', () => {
      fixtureEl.innerHTML = markup('value="1" step="0.5"')
      new Stepper(stepper())
      change('2,5')
      expect(input().value).toBe('2.5')
    })
  })

  describe('character filter', () => {
    const beforeInput = (data: string, inputType = 'insertText'): InputEvent => {
      const event = new InputEvent('beforeinput', { data, inputType, bubbles: true, cancelable: true })
      input().dispatchEvent(event)
      return event
    }

    it('should drop a typed letter and keep a digit', () => {
      new Stepper(stepper())
      expect(beforeInput('a').defaultPrevented).toBe(true)
      expect(beforeInput('7').defaultPrevented).toBe(false)
      expect(beforeInput('.').defaultPrevented).toBe(true)
      expect(beforeInput('-').defaultPrevented).toBe(true)
    })

    it('should allow the sign and the separator when the bounds and step need them', () => {
      fixtureEl.innerHTML = markup('value="0" min="-5" step="0.5"')
      new Stepper(stepper())
      expect(beforeInput('-').defaultPrevented).toBe(false)
      expect(beforeInput('.').defaultPrevented).toBe(false)
      expect(beforeInput(',').defaultPrevented).toBe(false)
      expect(beforeInput('e').defaultPrevented).toBe(true)
    })

    it('should keep only the digits of a pasted text', () => {
      new Stepper(stepper())
      input().value = ''
      input().setSelectionRange(0, 0)
      expect(beforeInput('4 pcs', 'insertFromPaste').defaultPrevented).toBe(true)
      expect(input().value).toBe('4')
    })

    it('should leave deletions alone', () => {
      new Stepper(stepper())
      expect(beforeInput('', 'deleteContentBackward').defaultPrevented).toBe(false)
    })
  })

  describe('precision', () => {
    it('should round to the precision of the step', () => {
      fixtureEl.innerHTML = markup('value="0.1" step="0.1"')
      const instance = new Stepper(stepper())
      instance.increment()
      instance.increment()
      expect(input().value).toBe('0.3')
      expect(instance.getValue()).toBe(0.3)
    })

    it('should step an empty field from the lower bound', () => {
      fixtureEl.innerHTML = markup('value="" min="2" max="9"')
      const instance = new Stepper(stepper())
      expect(instance.getValue()).toBeNull()
      expect(input().hasAttribute('aria-valuenow')).toBe(false)
      instance.increment()
      expect(input().value).toBe('3')
    })
  })

  describe('events', () => {
    it('should fire change.bs.stepper with the values', () => {
      const instance = new Stepper(stepper())
      const spy = vi.fn()
      stepper().addEventListener('change.bs.stepper', spy)

      instance.increment()
      expect(spy).toHaveBeenCalledTimes(1)
      const event = spy.mock.calls[0][0] as Event & { value: number; previousValue: number }
      expect(event.value).toBe(2)
      expect(event.previousValue).toBe(1)
    })

    it('should fire input and change on the field', () => {
      const instance = new Stepper(stepper())
      const onInput = vi.fn()
      const onChange = vi.fn()
      input().addEventListener('input', onInput)
      input().addEventListener('change', onChange)

      instance.increment()
      expect(onInput).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should not fire when the value does not change', () => {
      const instance = new Stepper(stepper())
      const spy = vi.fn()
      stepper().addEventListener('change.bs.stepper', spy)

      instance.setValue(1)
      instance.decrement()
      instance.decrement()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('setValue', () => {
    it('should set and clamp the value', () => {
      const instance = new Stepper(stepper())
      instance.setValue(3)
      expect(input().value).toBe('3')
      instance.setValue('99')
      expect(input().value).toBe('5')
      instance.setValue('nope')
      expect(input().value).toBe('5')
    })
  })

  describe('disabled', () => {
    it('should not step a disabled or readonly input', () => {
      fixtureEl.innerHTML = markup('value="1" readonly')
      const instance = new Stepper(stepper())
      instance.increment()
      expect(input().value).toBe('1')
      expect(incrementButton().disabled).toBe(true)
    })
  })

  describe('dispose', () => {
    it('should remove the listeners and the instance', () => {
      const instance = new Stepper(stepper())
      instance.dispose()
      incrementButton().click()
      expect(input().value).toBe('1')
      expect(Stepper.getInstance(stepper())).toBeNull()
    })
  })

  describe('data-api', () => {
    it('should initialise on getOrCreateInstance', () => {
      const instance = Stepper.getOrCreateInstance(stepper())
      expect(instance).toBeInstanceOf(Stepper)
      expect(Stepper.getOrCreateInstance(stepper())).toBe(instance)
    })

    it('should accept the data-tblr-* action attributes', () => {
      fixtureEl.innerHTML = markup().replaceAll('data-bs-stepper-action', 'data-tblr-stepper-action')
      new Stepper(stepper())
      fixtureEl.querySelector<HTMLButtonElement>('[data-tblr-stepper-action="increment"]')!.click()
      expect(input().value).toBe('2')
    })
  })
})
