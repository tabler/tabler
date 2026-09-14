import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Clipboard from '../../src/clipboard'

const MARKUP = `
  <div>
    <input id="api-key" value="sk_live_1234">
    <button type="button" data-bs-toggle="clipboard" data-bs-target="#api-key">
      <span class="clipboard-label">Copy</span>
      <span class="clipboard-feedback">Copied</span>
    </button>
  </div>`

describe('Clipboard', () => {
  let fixtureEl: HTMLElement
  let written: string[]

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    written = []
    // The real clipboard needs a user gesture and a secure context.
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: (text: string) => {
          written.push(text)
          return Promise.resolve()
        },
      },
    })
    fixtureEl.innerHTML = MARKUP
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
    clearFixture()
  })

  const trigger = (): HTMLElement => fixtureEl.querySelector('button')!
  const label = (): HTMLElement => fixtureEl.querySelector('.clipboard-label')!
  const feedback = (): HTMLElement => fixtureEl.querySelector('.clipboard-feedback')!

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Clipboard.NAME).toBe('clipboard')
    })
  })

  describe('constructor', () => {
    it('should hide the feedback and mark it as a status', () => {
      new Clipboard(trigger())

      expect(feedback().hidden).toBe(true)
      expect(feedback().getAttribute('role')).toBe('status')
      expect(label().hidden).toBe(false)
    })
  })

  describe('copy', () => {
    it('should copy the value of the target field and show the copied state', async () => {
      const spy = vi.fn()
      trigger().addEventListener('copied.bs.clipboard', spy)
      const instance = new Clipboard(trigger(), { delay: 0 })

      await instance.copy()

      expect(written).toEqual(['sk_live_1234'])
      expect(trigger().classList.contains('copied')).toBe(true)
      expect(label().hidden).toBe(true)
      expect(feedback().hidden).toBe(false)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should read the text of a target that is not a field', async () => {
      fixtureEl.innerHTML = '<div><code id="snippet"> npm install @tabler/core </code><button data-bs-toggle="clipboard" data-bs-target="#snippet"></button></div>'

      await new Clipboard(trigger()).copy()

      expect(written).toEqual(['npm install @tabler/core'])
    })

    it('should prefer a literal text over the target', async () => {
      const instance = new Clipboard(trigger(), { text: 'literal' })

      await instance.copy()

      expect(written).toEqual(['literal'])
    })

    it('should copy on click', async () => {
      new Clipboard(trigger())
      trigger().click()
      await vi.waitFor(() => expect(written).toEqual(['sk_live_1234']))
    })

    it('should go back to the label after the delay', async () => {
      const instance = new Clipboard(trigger(), { delay: 50 })

      await instance.copy()
      expect(feedback().hidden).toBe(false)

      await vi.waitFor(() => expect(feedback().hidden).toBe(true))
      expect(trigger().classList.contains('copied')).toBe(false)
      expect(label().hidden).toBe(false)
    })
  })

  describe('failure', () => {
    it('should fire error.bs.clipboard when there is nothing to copy', async () => {
      fixtureEl.innerHTML = '<div><button data-bs-toggle="clipboard" data-bs-target="#missing"></button></div>'
      const spy = vi.fn()
      trigger().addEventListener('error.bs.clipboard', spy)

      await new Clipboard(trigger()).copy()

      expect(written).toEqual([])
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should fire error.bs.clipboard when the browser refuses', async () => {
      vi.stubGlobal('navigator', { clipboard: { writeText: () => Promise.reject(new Error('denied')) } })
      const spy = vi.fn()
      trigger().addEventListener('error.bs.clipboard', spy)

      await new Clipboard(trigger()).copy()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(trigger().classList.contains('copied')).toBe(false)
    })
  })

  describe('dispose', () => {
    it('should stop the timer and remove the instance', async () => {
      const instance = new Clipboard(trigger(), { delay: 50 })
      await instance.copy()
      instance.dispose()

      expect(Clipboard.getInstance(trigger())).toBeNull()
      expect(feedback().hidden).toBe(false)
    })
  })
})
