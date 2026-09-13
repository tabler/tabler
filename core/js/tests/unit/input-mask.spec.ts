import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import InputMask from '../../src/input-mask'

describe('InputMask', () => {
  let fixtureEl: HTMLElement
  let plugin: ReturnType<typeof vi.fn>

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    plugin = vi.fn(function (this: Record<string, unknown>) {
      this.updateValue = vi.fn()
      this.destroy = vi.fn()
    })
    window.IMask = plugin as unknown as Window['IMask']
    fixtureEl.innerHTML = '<input type="text" data-mask="00/00/0000" data-mask-visible="true">'
  })

  afterEach(() => {
    clearFixture()
    delete window.IMask
  })

  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const lastInstance = (): Record<string, ReturnType<typeof vi.fn>> => plugin.mock.instances[plugin.mock.instances.length - 1] as Record<string, ReturnType<typeof vi.fn>>

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(InputMask.NAME).toBe('input-mask')
    })
  })

  describe('constructor', () => {
    it('should create the mask from data-mask and data-mask-visible', () => {
      const instance = new InputMask(input())

      expect(plugin).toHaveBeenCalledWith(input(), { mask: '00/00/0000', lazy: false })
      expect(instance.mask).toBe(plugin.mock.instances[0])
    })

    it('should default to a lazy mask', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask="(00) 0000-0000">'

      new InputMask(input())

      expect(plugin).toHaveBeenCalledWith(input(), { mask: '(00) 0000-0000', lazy: true })
    })

    it('should let the config object win over the attributes', () => {
      new InputMask(input(), { mask: '0000', lazy: true })

      expect(plugin).toHaveBeenCalledWith(input(), { mask: '0000', lazy: true })
    })

    it('should stay inert without a mask', () => {
      fixtureEl.innerHTML = '<input type="text" data-mask>'

      const instance = new InputMask(input())

      expect(plugin).not.toHaveBeenCalled()
      expect(instance.mask).toBeNull()
    })

    it('should stay inert when the plugin is not loaded', () => {
      delete window.IMask

      expect(() => new InputMask(input())).not.toThrow()
      expect(InputMask.getInstance(input())).toBeInstanceOf(InputMask)
    })
  })

  describe('public API', () => {
    it('should forward update to the mask', () => {
      const instance = new InputMask(input())
      instance.update()

      expect(lastInstance().updateValue).toHaveBeenCalledTimes(1)
    })

    it('should destroy the mask and remove the instance on dispose', () => {
      const instance = new InputMask(input())
      const element = input()
      const destroy = lastInstance().destroy

      instance.dispose()

      expect(destroy).toHaveBeenCalledTimes(1)
      expect(InputMask.getInstance(element)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should reuse the instance', () => {
      const first = InputMask.getOrCreateInstance(input())
      const second = InputMask.getOrCreateInstance(input())

      expect(second).toBe(first)
      expect(plugin).toHaveBeenCalledTimes(1)
    })
  })
})
