import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Autosize from '../../src/autosize'

describe('Autosize', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<textarea data-bs-toggle="autosize" rows="1" style="width: 200px; line-height: 20px; padding: 0; border: 0; box-sizing: border-box"></textarea>'
  })

  afterEach(() => {
    clearFixture()
  })

  const textarea = (): HTMLTextAreaElement => fixtureEl.querySelector('textarea')!
  const lines = (count: number): string => Array.from({ length: count }, (_, i) => `line ${i + 1}`).join('\n')
  const height = (): number => Number.parseFloat(textarea().style.height)

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Autosize.NAME).toBe('autosize')
    })
  })

  describe('constructor', () => {
    it('should size the field to its content and hide the resize handle', () => {
      textarea().value = lines(4)
      const instance = new Autosize(textarea())

      expect(Autosize.getInstance(textarea())).toBe(instance)
      expect(height()).toBe(80)
      expect(textarea().style.resize).toBe('none')
      expect(textarea().style.overflowY).toBe('hidden')
    })
  })

  describe('input', () => {
    it('should grow and shrink with the text', () => {
      new Autosize(textarea())
      const initial = height()

      textarea().value = lines(3)
      textarea().dispatchEvent(new Event('input'))
      expect(height()).toBe(60)

      textarea().value = ''
      textarea().dispatchEvent(new Event('input'))
      expect(height()).toBe(initial)
    })

    it('should fire resized.bs.autosize when the height changes', () => {
      new Autosize(textarea())
      const spy = vi.fn()
      textarea().addEventListener('resized.bs.autosize', spy)

      textarea().value = lines(2)
      textarea().dispatchEvent(new Event('input'))
      textarea().dispatchEvent(new Event('input'))

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('update', () => {
    it('should scroll again past max-height', () => {
      textarea().style.maxHeight = '40px'
      const instance = new Autosize(textarea())

      textarea().value = lines(5)
      instance.update()

      expect(textarea().clientHeight).toBe(40)
      expect(textarea().style.overflowY).toBe('auto')
    })

    it('should include the border when the box is border-box', () => {
      textarea().style.border = '3px solid red'
      textarea().value = lines(2)
      new Autosize(textarea())

      expect(height()).toBe(46)
    })
  })

  describe('dispose', () => {
    it('should restore the inline style and remove the instance', () => {
      const style = textarea().getAttribute('style')
      const instance = new Autosize(textarea())
      instance.dispose()

      expect(textarea().getAttribute('style')).toBe(style)
      expect(Autosize.getInstance(textarea())).toBeNull()
    })
  })
})
