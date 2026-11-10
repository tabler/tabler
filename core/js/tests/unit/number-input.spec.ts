import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import NumberInput from '../../src/number-input'

const markup = (inputAttributes = 'value="1" min="0" max="5"', wrapperAttributes = ''): string =>
  [
    `<div class="number-input" data-bs-toggle="number-input" ${wrapperAttributes}>`,
    '  <button type="button" class="btn" data-bs-number-input-action="decrement">-</button>',
    `  <input type="text" class="form-control" ${inputAttributes} />`,
    '  <button type="button" class="btn" data-bs-number-input-action="increment">+</button>',
    '</div>',
  ].join('')

describe('NumberInput', () => {
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

  const numberInput = (): HTMLElement => fixtureEl.querySelector('.number-input')!
  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const decrementButton = (): HTMLButtonElement => fixtureEl.querySelector('[data-bs-number-input-action="decrement"]')!
  const incrementButton = (): HTMLButtonElement => fixtureEl.querySelector('[data-bs-number-input-action="increment"]')!

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
      expect(NumberInput.NAME).toBe('numberInput')
    })
  })

  describe('Default', () => {
    it('should expose the default config', () => {
      expect(NumberInput.Default.min).toBeNull()
      expect(NumberInput.Default.repeat).toBe(true)
      expect(typeof NumberInput.DefaultType.step).toBe('string')
    })
  })

  describe('constructor', () => {
    it('should read the bounds from the input attributes', () => {
      const instance = new NumberInput(numberInput())
      expect(instance._min).toBe(0)
      expect(instance._max).toBe(5)
      expect(instance._step).toBe(1)
    })

    it('should let the config override the input attributes', () => {
      const instance = new NumberInput(numberInput(), { min: 2, max: 10, step: 2 })
      expect(instance._min).toBe(2)
      expect(instance._max).toBe(10)
      expect(instance._step).toBe(2)
      expect(input().value).toBe('2')
    })

    it('should read the config from data attributes', () => {
      fixtureEl.innerHTML = markup('value="1"', 'data-bs-min="1" data-bs-max="3" data-bs-step="0.5"')
      const instance = new NumberInput(numberInput())
      expect(instance._min).toBe(1)
      expect(instance._max).toBe(3)
      expect(instance._step).toBe(0.5)
    })

    it('should have no bounds when neither attributes nor config set them', () => {
      fixtureEl.innerHTML = markup('value="1"')
      const instance = new NumberInput(numberInput())
      expect(instance._min).toBe(Number.NEGATIVE_INFINITY)
      expect(instance._max).toBe(Number.POSITIVE_INFINITY)
    })

    it('should fall back to a step of 1 for a zero or negative step', () => {
      fixtureEl.innerHTML = markup('value="1" step="0"')
      expect(new NumberInput(numberInput())._step).toBe(1)
    })

    it('should clamp the initial value', () => {
      fixtureEl.innerHTML = markup('value="9" min="0" max="5"')
      new NumberInput(numberInput())
      expect(input().value).toBe('5')
    })

    it('should give a text input the spinbutton role and a numeric inputmode', () => {
      new NumberInput(numberInput())
      expect(input().getAttribute('role')).toBe('spinbutton')
      expect(input().getAttribute('inputmode')).toBe('numeric')
      expect(input().getAttribute('aria-valuemin')).toBe('0')
      expect(input().getAttribute('aria-valuemax')).toBe('5')
      expect(input().getAttribute('aria-valuenow')).toBe('1')
    })

    it('should use the decimal inputmode for a fractional step', () => {
      fixtureEl.innerHTML = markup('value="1" step="0.25"')
      new NumberInput(numberInput())
      expect(input().getAttribute('inputmode')).toBe('decimal')
    })

    it('should leave a number input alone', () => {
      fixtureEl.innerHTML = markup('type="number" value="1" min="0" max="5"').replace('type="text"', '')
      new NumberInput(numberInput())
      expect(input().hasAttribute('role')).toBe(false)
      expect(input().hasAttribute('aria-valuenow')).toBe(false)
    })

    it('should do nothing without an input', () => {
      fixtureEl.innerHTML = '<div class="number-input"></div>'
      const instance = new NumberInput(numberInput())
      expect(instance._input).toBeNull()
      expect(instance.getValue()).toBeNull()
    })

    it('should disable the buttons of a disabled input', () => {
      fixtureEl.innerHTML = markup('value="1" disabled')
      new NumberInput(numberInput())
      expect(decrementButton().disabled).toBe(true)
      expect(incrementButton().disabled).toBe(true)
    })
  })

  describe('buttons', () => {
    it('should step the value on click', () => {
      new NumberInput(numberInput())
      incrementButton().click()
      expect(input().value).toBe('2')
      decrementButton().click()
      decrementButton().click()
      expect(input().value).toBe('0')
    })

    it('should disable the button at a bound', () => {
      fixtureEl.innerHTML = markup('value="4" min="0" max="5"')
      new NumberInput(numberInput())
      expect(incrementButton().disabled).toBe(false)
      incrementButton().click()
      expect(input().value).toBe('5')
      expect(incrementButton().disabled).toBe(true)
      expect(decrementButton().disabled).toBe(false)
    })

    it('should never leave the bounds', () => {
      const instance = new NumberInput(numberInput(), { max: 2 })
      instance.increment()
      instance.increment()
      instance.increment()
      expect(input().value).toBe('2')
    })

    it('should keep stepping while a button is held', () => {
      vi.useFakeTimers()
      new NumberInput(numberInput(), { max: 100 })

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
      const instance = new NumberInput(numberInput(), { max: 3 })

      incrementButton().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }))
      vi.advanceTimersByTime(400 + 80 * 5)
      expect(input().value).toBe('3')
      expect(instance._repeatTimer).toBeNull()
    })

    it('should not repeat when the option is off', () => {
      vi.useFakeTimers()
      new NumberInput(numberInput(), { repeat: false, max: 100 })

      incrementButton().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }))
      vi.advanceTimersByTime(2000)
      expect(input().value).toBe('1')
    })
  })

  describe('keyboard', () => {
    it('should step with the arrow keys and jump with Home and End', () => {
      new NumberInput(numberInput())
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
      new NumberInput(numberInput())
      expect(keydown('End').defaultPrevented).toBe(false)
      expect(input().value).toBe('1')
    })

    it('should leave other keys alone', () => {
      new NumberInput(numberInput())
      expect(keydown('a').defaultPrevented).toBe(false)
    })
  })

  describe('typed value', () => {
    it('should clamp a typed value on change', () => {
      new NumberInput(numberInput())
      change('42')
      expect(input().value).toBe('5')
      expect(incrementButton().disabled).toBe(true)
    })

    it('should clamp on blur as well', () => {
      new NumberInput(numberInput())
      input().value = '125'
      input().dispatchEvent(new Event('blur'))
      expect(input().value).toBe('5')
    })

    it('should fire nothing when an untouched field is left', () => {
      new NumberInput(numberInput())
      const spy = vi.fn()
      input().addEventListener('change', spy)
      input().dispatchEvent(new Event('blur'))
      expect(spy).not.toHaveBeenCalled()
    })

    it('should restore the previous value after a non-numeric edit', () => {
      new NumberInput(numberInput())
      change('3')
      change('abc')
      expect(input().value).toBe('3')
    })

    it('should accept a decimal comma', () => {
      fixtureEl.innerHTML = markup('value="1" step="0.5"')
      new NumberInput(numberInput())
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
      new NumberInput(numberInput())
      expect(beforeInput('a').defaultPrevented).toBe(true)
      expect(beforeInput('7').defaultPrevented).toBe(false)
      expect(beforeInput('.').defaultPrevented).toBe(true)
      expect(beforeInput('-').defaultPrevented).toBe(true)
    })

    it('should allow the sign and the separator when the bounds and step need them', () => {
      fixtureEl.innerHTML = markup('value="0" min="-5" step="0.5"')
      new NumberInput(numberInput())
      expect(beforeInput('-').defaultPrevented).toBe(false)
      expect(beforeInput('.').defaultPrevented).toBe(false)
      expect(beforeInput(',').defaultPrevented).toBe(false)
      expect(beforeInput('e').defaultPrevented).toBe(true)
    })

    it('should keep only the digits of a pasted text', () => {
      new NumberInput(numberInput())
      input().value = ''
      input().setSelectionRange(0, 0)
      expect(beforeInput('4 pcs', 'insertFromPaste').defaultPrevented).toBe(true)
      expect(input().value).toBe('4')
    })

    it('should leave deletions alone', () => {
      new NumberInput(numberInput())
      expect(beforeInput('', 'deleteContentBackward').defaultPrevented).toBe(false)
    })
  })

  describe('precision', () => {
    it('should round to the precision of the step', () => {
      fixtureEl.innerHTML = markup('value="0.1" step="0.1"')
      const instance = new NumberInput(numberInput())
      instance.increment()
      instance.increment()
      expect(input().value).toBe('0.3')
      expect(instance.getValue()).toBe(0.3)
    })

    it('should step an empty field from the lower bound', () => {
      fixtureEl.innerHTML = markup('value="" min="2" max="9"')
      const instance = new NumberInput(numberInput())
      expect(instance.getValue()).toBeNull()
      expect(input().hasAttribute('aria-valuenow')).toBe(false)
      instance.increment()
      expect(input().value).toBe('3')
    })
  })

  describe('events', () => {
    it('should fire change.bs.numberInput with the values', () => {
      const instance = new NumberInput(numberInput())
      const spy = vi.fn()
      numberInput().addEventListener('change.bs.numberInput', spy)

      instance.increment()
      expect(spy).toHaveBeenCalledTimes(1)
      const event = spy.mock.calls[0][0] as Event & { value: number; previousValue: number }
      expect(event.value).toBe(2)
      expect(event.previousValue).toBe(1)
    })

    it('should fire input and change on the field', () => {
      const instance = new NumberInput(numberInput())
      const onInput = vi.fn()
      const onChange = vi.fn()
      input().addEventListener('input', onInput)
      input().addEventListener('change', onChange)

      instance.increment()
      expect(onInput).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should not fire when the value does not change', () => {
      const instance = new NumberInput(numberInput())
      const spy = vi.fn()
      numberInput().addEventListener('change.bs.numberInput', spy)

      instance.setValue(1)
      instance.decrement()
      instance.decrement()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('setValue', () => {
    it('should set and clamp the value', () => {
      const instance = new NumberInput(numberInput())
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
      const instance = new NumberInput(numberInput())
      instance.increment()
      expect(input().value).toBe('1')
      expect(incrementButton().disabled).toBe(true)
    })
  })

  describe('dispose', () => {
    it('should remove the listeners and the instance', () => {
      const instance = new NumberInput(numberInput())
      instance.dispose()
      incrementButton().click()
      expect(input().value).toBe('1')
      expect(NumberInput.getInstance(numberInput())).toBeNull()
    })
  })

  describe('bare input', () => {
    const bare = (attributes = 'value="1" min="0" max="5"'): HTMLInputElement => {
      fixtureEl.innerHTML = `<form><input type="text" class="form-control" data-bs-toggle="number-input" ${attributes} /></form>`
      return fixtureEl.querySelector('input')!
    }

    it('should wrap the input and render the two buttons', () => {
      const el = bare()
      new NumberInput(el)

      const wrapper = el.parentElement!
      expect(wrapper.classList.contains('number-input')).toBe(true)
      expect(wrapper.parentElement!.tagName).toBe('FORM')
      expect([...wrapper.children].map((child) => child.tagName)).toEqual(['BUTTON', 'INPUT', 'BUTTON'])
      expect(decrementButton().getAttribute('aria-label')).toBe('Decrease')
      expect(incrementButton().getAttribute('aria-label')).toBe('Increase')
      expect(incrementButton().type).toBe('button')
      expect(incrementButton().innerHTML).toBe('')
    })

    it('should step through the rendered buttons', () => {
      const el = bare()
      new NumberInput(el)
      incrementButton().click()
      expect(el.value).toBe('2')
    })

    it('should read the config from the input and label the buttons', () => {
      const el = bare('value="1" data-bs-max="2" data-bs-increment-label="More" data-bs-decrement-label="Fewer"')
      new NumberInput(el)
      expect(incrementButton().getAttribute('aria-label')).toBe('More')
      expect(decrementButton().getAttribute('aria-label')).toBe('Fewer')
      incrementButton().click()
      incrementButton().click()
      expect(el.value).toBe('2')
    })

    it('should map the size of the input to the box', () => {
      fixtureEl.innerHTML = '<input type="text" class="form-control form-control-sm" data-bs-toggle="number-input" value="1" />'
      const el = fixtureEl.querySelector('input')!
      new NumberInput(el)
      expect(el.parentElement!.classList.contains('number-input-sm')).toBe(true)
    })

    it('should fire change.bs.numberInput on the input', () => {
      const el = bare()
      const instance = new NumberInput(el)
      const spy = vi.fn()
      el.addEventListener('change.bs.numberInput', spy)
      instance.increment()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should unwrap the input on dispose', () => {
      const el = bare()
      new NumberInput(el).dispose()
      expect(el.parentElement!.tagName).toBe('FORM')
      expect(fixtureEl.querySelector('.number-input')).toBeNull()
      expect(fixtureEl.querySelectorAll('button')).toHaveLength(0)
    })
  })

  describe('data-api', () => {
    it('should initialise on getOrCreateInstance', () => {
      const instance = NumberInput.getOrCreateInstance(numberInput())
      expect(instance).toBeInstanceOf(NumberInput)
      expect(NumberInput.getOrCreateInstance(numberInput())).toBe(instance)
    })

    it('should accept the data-tblr-* action attributes', () => {
      fixtureEl.innerHTML = markup().replaceAll('data-bs-number-input-action', 'data-tblr-number-input-action')
      new NumberInput(numberInput())
      fixtureEl.querySelector<HTMLButtonElement>('[data-tblr-number-input-action="increment"]')!.click()
      expect(input().value).toBe('2')
    })
  })
})
