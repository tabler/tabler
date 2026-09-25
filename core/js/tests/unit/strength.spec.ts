import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Strength from '../../src/strength'

const METER = `
  <div>
    <input type="password" id="password">
    <div class="strength" data-bs-strength>
      <span class="strength-segment"></span>
      <span class="strength-segment"></span>
      <span class="strength-segment"></span>
      <span class="strength-segment"></span>
    </div>
    <small class="strength-text"></small>
  </div>`

describe('Strength', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = METER
  })

  afterEach(() => {
    clearFixture()
  })

  const meter = (): HTMLElement => fixtureEl.querySelector('.strength')!
  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const text = (): HTMLElement => fixtureEl.querySelector('.strength-text')!
  const filled = (): number => fixtureEl.querySelectorAll('.strength-segment.active').length

  const type = (value: string): void => {
    input().value = value
    input().dispatchEvent(new Event('input'))
  }

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Strength.NAME).toBe('strength')
    })
  })

  describe('constructor', () => {
    it('should bind the password field in its own parent and start empty', () => {
      const instance = new Strength(meter())

      expect(instance._input).toBe(input())
      expect(instance.level).toBeNull()
      expect(filled()).toBe(0)
      expect(text().textContent).toBe('')
    })

    it('should read an existing value right away', () => {
      input().value = 'Sup3rSecret!Pass'
      new Strength(meter())

      expect(meter().dataset.bsStrength).toBe('strong')
    })

    it('should take the field from the input option', () => {
      fixtureEl.innerHTML = `<input type="password" id="remote"><div class="strength" data-bs-strength data-bs-input="#remote"><span class="strength-segment"></span></div>`

      const instance = new Strength(meter())

      expect(instance._input).toBe(fixtureEl.querySelector('#remote'))
    })

    it('should bind the password field before it, not a confirm field after it', () => {
      fixtureEl.innerHTML = `
        <div>
          <input type="password" id="pw">
          <div class="strength" data-bs-strength><span class="strength-segment"></span></div>
          <input type="password" id="pw2">
        </div>`

      const instance = new Strength(meter())

      expect(instance._input).toBe(fixtureEl.querySelector('#pw'))
    })

    it('should bind the last of several preceding fields, ignoring one after it', () => {
      fixtureEl.innerHTML = `
        <div>
          <input type="password" id="old">
          <input type="password" id="new">
          <div class="strength" data-bs-strength><span class="strength-segment"></span></div>
          <input type="password" id="confirm">
        </div>`

      const instance = new Strength(meter())

      expect(instance._input).toBe(fixtureEl.querySelector('#new'))
    })

    it('should not bind any field when none precedes it', () => {
      fixtureEl.innerHTML = `
        <div>
          <div class="strength" data-bs-strength><span class="strength-segment"></span></div>
          <input type="password" id="confirm">
        </div>`

      const instance = new Strength(meter())

      expect(instance._input).toBeNull()
    })
  })

  describe('levels', () => {
    it('should climb from weak to strong as the password improves', () => {
      new Strength(meter())

      type('abc')
      expect(meter().dataset.bsStrength).toBe('weak')
      expect(text().textContent).toBe('Weak')
      expect(filled()).toBe(1)

      type('abcdefghijkl')
      expect(meter().dataset.bsStrength).toBe('fair')
      expect(filled()).toBe(2)

      type('Abcdefgh1!')
      expect(meter().dataset.bsStrength).toBe('good')
      expect(filled()).toBe(3)

      type('Abcdefgh1!?x')
      expect(meter().dataset.bsStrength).toBe('strong')
      expect(filled()).toBe(4)
    })

    it('should put the markup text back when the field is emptied', () => {
      fixtureEl.innerHTML = METER.replace('<small class="strength-text"></small>', '<small class="strength-text">At least 8 characters</small>')

      new Strength(meter())
      expect(text().textContent).toBe('At least 8 characters')

      type('abc')
      expect(text().textContent).toBe('Weak')

      type('')
      expect(text().textContent).toBe('At least 8 characters')
    })

    it('should keep the trigger attribute when the field is emptied', () => {
      new Strength(meter())
      type('Abcdefgh1!?x')
      type('')

      expect(meter().dataset.bsStrength).toBe('')
      expect(text().textContent).toBe('')
      expect(filled()).toBe(0)
    })

    it('should fire change.bs.strength once per level, without the password', () => {
      const spy = vi.fn()
      meter().addEventListener('change.bs.strength', spy)
      new Strength(meter())

      type('abc')
      type('abcd')

      expect(spy).toHaveBeenCalledTimes(1)
      const event = spy.mock.calls[0][0] as CustomEvent & { strength: string; score: number; password?: string }
      expect(event.strength).toBe('weak')
      expect(event.score).toBe(1)
      expect(event.password).toBeUndefined()
    })
  })

  describe('config', () => {
    it('should use a custom scorer and messages', () => {
      new Strength(meter(), { scorer: () => 9, messages: { weak: 'Słabe', fair: 'Średnie', good: 'Dobre', strong: 'Mocne' } })

      type('x')

      expect(meter().dataset.bsStrength).toBe('strong')
      expect(text().textContent).toBe('Mocne')
    })

    it('should respect custom thresholds', () => {
      new Strength(meter(), { thresholds: [10, 20, 30] })

      type('Abcdefgh1!?x')

      expect(meter().dataset.bsStrength).toBe('weak')
    })

    it('should fill a meter with a different number of segments', () => {
      fixtureEl.innerHTML = `<div><input type="password"><div class="strength" data-bs-strength><span class="strength-segment"></span><span class="strength-segment"></span></div></div>`

      new Strength(meter())
      type('abc')

      expect(filled()).toBe(1)
    })
  })

  describe('accessibility', () => {
    it('should describe the meter and announce the label politely', () => {
      new Strength(meter())

      expect(meter().getAttribute('role')).toBe('progressbar')
      expect(meter().getAttribute('aria-valuemax')).toBe('4')
      expect(meter().getAttribute('aria-label')).toBe('Password strength')
      expect(text().getAttribute('aria-live')).toBe('polite')
      expect(fixtureEl.querySelector('.strength-segment')!.getAttribute('aria-hidden')).toBe('true')

      type('Abcdefgh1!?x')
      expect(meter().getAttribute('aria-valuenow')).toBe('4')
      expect(meter().getAttribute('aria-valuetext')).toBe('Strong')

      type('')
      expect(meter().getAttribute('aria-valuenow')).toBe('0')
      expect(meter().hasAttribute('aria-valuetext')).toBe(false)
    })

    it('should keep an aria-label from the markup', () => {
      meter().setAttribute('aria-label', 'Siła hasła')
      new Strength(meter())

      expect(meter().getAttribute('aria-label')).toBe('Siła hasła')
    })
  })

  describe('dispose', () => {
    it('should stop listening and remove the instance', () => {
      const instance = new Strength(meter())
      instance.dispose()
      type('Abcdefgh1!?x')

      expect(meter().dataset.bsStrength).toBe('')
      expect(Strength.getInstance(meter())).toBeNull()
    })
  })
})
