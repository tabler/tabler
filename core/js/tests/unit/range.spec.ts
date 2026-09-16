import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import Range from '../../src/bootstrap/range'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Range', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Range.VERSION).toBe('string')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Range.DATA_KEY).toBe('bs.range')
    })
  })

  describe('constructor', () => {
    it('wraps a bare input in a .form-range container', () => {
      fixtureEl.innerHTML = '<input type="range" class="form-range" min="0" max="100" value="40">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      new Range(input)

      const wrapper = fixtureEl.querySelector<HTMLElement>('div.form-range')
      expect(wrapper).not.toBeNull()
      expect(wrapper!.querySelector('.form-range-input')).toBe(input)
      expect(input.classList.contains('form-range')).toBe(false)
    })

    it('renders a value tooltip by default', () => {
      fixtureEl.innerHTML = '<input type="range" class="form-range" min="0" max="100" value="40">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      new Range(input)

      expect(fixtureEl.querySelector('.form-range-tooltip')).not.toBeNull()
    })

    it('skips the tooltip when disabled via config', () => {
      fixtureEl.innerHTML = '<input type="range" class="form-range" min="0" max="100" value="40">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      new Range(input, { tooltip: false })

      expect(fixtureEl.querySelector('.form-range-tooltip')).toBeNull()
    })

    it('treats a pre-built wrapper with two inputs as a dual-handle range', () => {
      fixtureEl.innerHTML = `
        <div class="form-range" data-bs-toggle="range">
          <input type="range" class="form-range-input" min="0" max="100" value="20">
          <input type="range" class="form-range-input" min="0" max="100" value="80">
        </div>
      `
      const wrapper = fixtureEl.querySelector('div.form-range') as HTMLElement

      const range = new Range(wrapper)

      expect((range as unknown as { _isDual: boolean })._isDual).toBe(true)
      expect(fixtureEl.querySelectorAll('.form-range-tooltip')).toHaveLength(2)
    })

    it('reads a color utility on the wrapper into --tblr-range-thumb-bg on the wrapper and the input', () => {
      const style = document.createElement('style')
      style.textContent = '.text-green-fixture { color: rgb(9, 133, 68); }'
      document.head.append(style)

      // `_wrapInput` moves the input's classes to the wrapper it creates, same as
      // a `.text-green` utility written on the original `<input class="form-range">`.
      fixtureEl.innerHTML = '<input type="range" class="form-range text-green-fixture" min="0" max="100" value="40">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      new Range(input)

      const wrapper = fixtureEl.querySelector<HTMLElement>('div.form-range')!
      expect(wrapper.style.getPropertyValue('--tblr-range-thumb-bg')).toBe('rgb(9, 133, 68)')
      expect(wrapper.querySelector<HTMLElement>('.form-range-input')!.style.getPropertyValue('--tblr-range-thumb-bg')).toBe('rgb(9, 133, 68)')

      style.remove()
    })
  })

  describe('fill track', () => {
    it('sets --range-fill-end to the value percentage on input', () => {
      fixtureEl.innerHTML = '<input type="range" class="form-range" min="0" max="100" value="0">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      new Range(input)

      input.value = '25'
      input.dispatchEvent(new Event('input', { bubbles: true }))

      const wrapper = fixtureEl.querySelector<HTMLElement>('div.form-range')!
      expect(wrapper.style.getPropertyValue('--tblr-range-fill-start')).toBe('0%')
      expect(wrapper.style.getPropertyValue('--tblr-range-fill-end')).toBe('25%')
    })
  })

  describe('dual handle', () => {
    it('clamps the other handle instead of letting the values cross', () => {
      fixtureEl.innerHTML = `
        <div class="form-range" data-bs-toggle="range">
          <input type="range" class="form-range-input" min="0" max="100" value="20">
          <input type="range" class="form-range-input" min="0" max="100" value="80">
        </div>
      `
      new Range(fixtureEl.querySelector('div.form-range') as HTMLElement)

      const [low, high] = Array.from(fixtureEl.querySelectorAll('input'))
      low.value = '90'
      low.dispatchEvent(new Event('input', { bubbles: true }))

      expect(Number(low.value)).toBe(90)
      expect(Number(high.value)).toBe(90)
    })

    it('clears .active (and its tooltip) once the pointer is released', () => {
      fixtureEl.innerHTML = `
        <div class="form-range" data-bs-toggle="range">
          <input type="range" class="form-range-input" min="0" max="100" value="20">
          <input type="range" class="form-range-input" min="0" max="100" value="80">
        </div>
      `
      new Range(fixtureEl.querySelector('div.form-range') as HTMLElement)

      const [low] = Array.from(fixtureEl.querySelectorAll('input'))
      low.dispatchEvent(new Event('pointerdown', { bubbles: true }))
      expect(low.classList.contains('active')).toBe(true)

      low.dispatchEvent(new Event('pointerup', { bubbles: true }))
      expect(low.classList.contains('active')).toBe(false)
    })
  })

  describe('change.bs.range', () => {
    it('fires on the wrapper with the current values', () => {
      fixtureEl.innerHTML = '<input type="range" class="form-range" min="0" max="100" value="40">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      new Range(input)

      const wrapper = fixtureEl.querySelector<HTMLElement>('div.form-range')!
      let received: number[] | undefined
      wrapper.addEventListener('change.bs.range', (event) => {
        received = (event as Event & { values: number[] }).values
      })

      input.value = '60'
      input.dispatchEvent(new Event('change', { bubbles: true }))

      expect(received).toEqual([60])
    })
  })

  describe('dispose', () => {
    it('unwraps the input it wrapped', () => {
      fixtureEl.innerHTML = '<input type="range" class="form-range" min="0" max="100" value="40">'
      const input = fixtureEl.querySelector('input') as HTMLInputElement

      const range = new Range(input)
      range.dispose()

      expect(fixtureEl.querySelector('div.form-range')).toBeNull()
      expect(fixtureEl.querySelector('input.form-range')).toBe(input)
    })
  })
})
