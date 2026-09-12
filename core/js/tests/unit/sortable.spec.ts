import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Sortable from '../../src/sortable'

describe('Sortable', () => {
  let fixtureEl: HTMLElement
  let plugin: ReturnType<typeof vi.fn>

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    plugin = vi.fn(function (this: Record<string, unknown>) {
      this.toArray = vi.fn(() => ['a', 'b'])
      this.sort = vi.fn()
      this.option = vi.fn()
      this.destroy = vi.fn()
    })
    window.Sortable = plugin as unknown as Window['Sortable']
    fixtureEl.innerHTML = '<ul data-sortable=\'{"animation":150}\'><li>a</li><li>b</li></ul>'
  })

  afterEach(() => {
    clearFixture()
    delete window.Sortable
  })

  const list = (): HTMLElement => fixtureEl.querySelector('ul')!
  const lastInstance = (): Record<string, ReturnType<typeof vi.fn>> => plugin.mock.instances[plugin.mock.instances.length - 1] as Record<string, ReturnType<typeof vi.fn>>

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Sortable.NAME).toBe('sortable')
    })
  })

  describe('constructor', () => {
    it('should create the plugin with options from data-sortable', () => {
      const instance = new Sortable(list())

      expect(plugin).toHaveBeenCalledTimes(1)
      expect(plugin.mock.calls[0][0]).toBe(list())
      expect(plugin.mock.calls[0][1]).toMatchObject({ animation: 150 })
      expect(instance.sortable).toBe(plugin.mock.instances[0])
    })

    it('should let the config object win over the attribute', () => {
      new Sortable(list(), { animation: 0, group: 'shared' })

      expect(plugin.mock.calls[0][1]).toMatchObject({ animation: 0, group: 'shared' })
    })

    it('should ignore invalid JSON', () => {
      fixtureEl.innerHTML = '<ul data-sortable="{oops"><li>a</li></ul>'

      expect(() => new Sortable(list())).not.toThrow()
      expect(plugin).toHaveBeenCalledTimes(1)
    })

    it('should stay inert when the plugin is not loaded', () => {
      delete window.Sortable

      expect(() => new Sortable(list())).not.toThrow()
      expect(Sortable.getInstance(list())).toBeInstanceOf(Sortable)
    })
  })

  describe('public API', () => {
    it('should forward toArray and sort to the plugin', () => {
      const instance = new Sortable(list())

      expect(instance.toArray()).toEqual(['a', 'b'])

      instance.sort(['b', 'a'], true)
      expect(lastInstance().sort).toHaveBeenCalledWith(['b', 'a'], true)
    })

    it('should destroy the plugin and remove the instance on dispose', () => {
      const instance = new Sortable(list())
      const element = list()
      const destroy = lastInstance().destroy

      instance.dispose()

      expect(destroy).toHaveBeenCalledTimes(1)
      expect(Sortable.getInstance(element)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should reuse the instance', () => {
      const first = Sortable.getOrCreateInstance(list())
      const second = Sortable.getOrCreateInstance(list())

      expect(second).toBe(first)
      expect(plugin).toHaveBeenCalledTimes(1)
    })
  })
})
