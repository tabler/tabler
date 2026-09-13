import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import autosize from 'autosize'
import { clearFixture, getFixture } from '../helpers/fixture'
import Autosize from '../../src/autosize'

vi.mock('autosize', () => ({
  default: Object.assign(vi.fn(), { update: vi.fn(), destroy: vi.fn() }),
}))

const plugin = vi.mocked(autosize)

describe('Autosize', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    fixtureEl.innerHTML = '<textarea data-bs-toggle="autosize"></textarea>'
  })

  afterEach(() => {
    clearFixture()
  })

  const textarea = (): HTMLTextAreaElement => fixtureEl.querySelector('textarea')!

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Autosize.NAME).toBe('autosize')
    })
  })

  describe('constructor', () => {
    it('should call the autosize plugin with the element', () => {
      const instance = new Autosize(textarea())

      expect(plugin).toHaveBeenCalledWith(textarea())
      expect(Autosize.getInstance(textarea())).toBe(instance)
    })
  })

  describe('update', () => {
    it('should call autosize.update with the element', () => {
      const instance = new Autosize(textarea())
      instance.update()

      expect(plugin.update).toHaveBeenCalledWith(textarea())
    })
  })

  describe('dispose', () => {
    it('should call autosize.destroy and remove the instance', () => {
      const instance = new Autosize(textarea())
      const element = textarea()
      instance.dispose()

      expect(plugin.destroy).toHaveBeenCalledWith(element)
      expect(Autosize.getInstance(element)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should reuse the instance and not initialise the plugin twice', () => {
      const first = Autosize.getOrCreateInstance(textarea())
      const second = Autosize.getOrCreateInstance(textarea())

      expect(second).toBe(first)
      expect(plugin).toHaveBeenCalledTimes(1)
    })
  })
})
