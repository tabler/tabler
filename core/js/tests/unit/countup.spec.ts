import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { CountUp as CountUpPlugin } from 'countup.js'
import { clearFixture, getFixture } from '../helpers/fixture'
import CountUp from '../../src/countup'

vi.mock('countup.js', () => ({
  CountUp: vi.fn(function (this: Record<string, unknown>) {
    this.error = ''
    this.start = vi.fn()
    this.reset = vi.fn()
    this.update = vi.fn()
    this.pauseResume = vi.fn()
    this.onDestroy = vi.fn()
  }),
}))

const plugin = vi.mocked(CountUpPlugin)

const lastInstance = (): Record<string, ReturnType<typeof vi.fn>> => plugin.mock.instances[plugin.mock.instances.length - 1] as unknown as Record<string, ReturnType<typeof vi.fn>>

describe('CountUp', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    fixtureEl.innerHTML = '<h1 data-countup>30000</h1>'
  })

  afterEach(() => {
    clearFixture()
  })

  const element = (): HTMLElement => fixtureEl.querySelector('h1')!

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(CountUp.NAME).toBe('countup')
    })
  })

  describe('constructor', () => {
    it('should create the plugin with the parsed number and autoAnimate on', () => {
      new CountUp(element())

      expect(plugin).toHaveBeenCalledTimes(1)
      expect(plugin.mock.calls[0][0]).toBe(element())
      expect(plugin.mock.calls[0][1]).toBe(30000)
      expect(plugin.mock.calls[0][2]).toMatchObject({ autoAnimate: true })
      expect(lastInstance().start).not.toHaveBeenCalled()
    })

    it('should read options from the data-countup JSON', () => {
      fixtureEl.innerHTML = '<h1 data-countup=\'{"duration":4,"suffix":"%"}\'>300</h1>'

      const instance = new CountUp(element())

      expect(plugin.mock.calls[0][2]).toMatchObject({ duration: 4, suffix: '%', autoAnimate: true })
      expect(instance._config.duration).toBe(4)
    })

    it('should let the config object win over the attribute', () => {
      fixtureEl.innerHTML = '<h1 data-countup=\'{"duration":4}\'>300</h1>'

      new CountUp(element(), { duration: 6 })

      expect(plugin.mock.calls[0][2]).toMatchObject({ duration: 6 })
    })

    it('should ignore invalid JSON', () => {
      fixtureEl.innerHTML = '<h1 data-countup="{oops">300</h1>'

      expect(() => new CountUp(element())).not.toThrow()
      expect(plugin).toHaveBeenCalledTimes(1)
    })

    it('should parse formatted numbers', () => {
      fixtureEl.innerHTML = '<h1 data-countup>$1,234.5</h1>'

      new CountUp(element())

      expect(plugin.mock.calls[0][1]).toBe(1234.5)
    })

    it('should not create the plugin when the text is not a number', () => {
      fixtureEl.innerHTML = '<h1 data-countup>soon</h1>'

      new CountUp(element())

      expect(plugin).not.toHaveBeenCalled()
    })

    it('should start by hand when autoAnimate is off', () => {
      new CountUp(element(), { autoAnimate: false })

      expect(lastInstance().start).toHaveBeenCalledTimes(1)
    })
  })

  describe('public API', () => {
    it('should forward start, reset, update and pauseResume to the plugin', () => {
      const instance = new CountUp(element())

      instance.start()
      instance.reset()
      instance.update(42)
      instance.pauseResume()

      expect(lastInstance().start).toHaveBeenCalledTimes(1)
      expect(lastInstance().reset).toHaveBeenCalledTimes(1)
      expect(lastInstance().update).toHaveBeenCalledWith(42)
      expect(lastInstance().pauseResume).toHaveBeenCalledTimes(1)
    })

    it('should destroy the plugin and remove the instance on dispose', () => {
      const instance = new CountUp(element())
      const el = element()
      const destroy = lastInstance().onDestroy

      instance.dispose()

      expect(destroy).toHaveBeenCalledTimes(1)
      expect(CountUp.getInstance(el)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should reuse the instance', () => {
      const first = CountUp.getOrCreateInstance(element())
      const second = CountUp.getOrCreateInstance(element())

      expect(second).toBe(first)
      expect(plugin).toHaveBeenCalledTimes(1)
    })
  })
})
