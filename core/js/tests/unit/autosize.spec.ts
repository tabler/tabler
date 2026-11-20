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

    it('should keep the scroll position of a scrolled ancestor', () => {
      fixtureEl.innerHTML = '<div style="height: 100px; overflow-y: auto"><div style="height: 100px"></div><textarea rows="1" style="width: 200px; line-height: 20px; padding: 0; border: 0"></textarea></div>'
      const scroller = fixtureEl.firstElementChild as HTMLElement
      textarea().value = lines(10)
      const instance = new Autosize(textarea())
      scroller.scrollTop = scroller.scrollHeight
      const before = scroller.scrollTop

      textarea().value = lines(11)
      instance.update()

      expect(height()).toBe(220)
      expect(scroller.scrollTop).toBe(before)
    })

    it('should still update a position: fixed field', () => {
      textarea().style.position = 'fixed'
      const instance = new Autosize(textarea())

      textarea().value = lines(3)
      instance.update()

      expect(height()).toBe(60)
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

  describe('width changes', () => {
    it('should measure the height again when the field changes width', async () => {
      textarea().value = 'word '.repeat(12).trim()
      new Autosize(textarea())
      const before = height()

      textarea().style.width = '60px'

      await vi.waitFor(() => expect(height()).toBeGreaterThan(before))
    })

    it('should not update again when only the height changes', async () => {
      const instance = new Autosize(textarea())
      await vi.waitFor(() => expect(instance._width).toBe(200))
      const update = vi.spyOn(instance, 'update')

      textarea().style.height = '300px'
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

      expect(update).not.toHaveBeenCalled()
    })
  })

  describe('fields that cannot be measured', () => {
    it('should leave a hidden field without a height', () => {
      textarea().style.display = 'none'
      textarea().value = lines(4)
      const resized = vi.fn()
      textarea().addEventListener('resized.bs.autosize', resized)

      new Autosize(textarea())

      expect(textarea().style.height).toBe('')
      expect(resized).not.toHaveBeenCalled()
    })

    it('should size a field once it is shown and updated', () => {
      textarea().style.display = 'none'
      textarea().value = lines(4)
      const instance = new Autosize(textarea())

      textarea().style.display = ''
      instance.update()

      expect(height()).toBe(80)
    })

    it('should not throw for a selector that matches nothing', () => {
      expect(() => new Autosize('#missing')).not.toThrow()
    })
  })

  describe('dispose without an inline style', () => {
    it('should remove the style attribute it added', () => {
      fixtureEl.innerHTML = '<textarea rows="1"></textarea>'
      const instance = new Autosize(textarea())
      expect(textarea().hasAttribute('style')).toBe(true)

      instance.dispose()

      expect(textarea().hasAttribute('style')).toBe(false)
    })

    it('should stop growing the field after dispose', () => {
      const instance = new Autosize(textarea())
      instance.dispose()

      textarea().value = lines(6)
      textarea().dispatchEvent(new Event('input', { bubbles: true }))

      expect(textarea().style.height).toBe('')
    })
  })
})
