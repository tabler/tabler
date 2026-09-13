import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import CountUp from '../../src/countup'

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

describe('CountUp', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<h1 data-countup>30000</h1>'
  })

  afterEach(() => {
    clearFixture()
  })

  const element = (): HTMLElement => fixtureEl.querySelector('h1')!
  // The fixture sits off screen, so an auto-animated countup never starts on its own.
  const quick = (config: Record<string, unknown> = {}): CountUp => new CountUp(element(), { autoAnimate: false, duration: 0.1, ...config })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(CountUp.NAME).toBe('countup')
    })
  })

  describe('constructor', () => {
    it('should print the start value and wait for the viewport with autoAnimate', async () => {
      new CountUp(element())
      await wait(50)

      expect(element().textContent).toBe('0')
    })

    it('should count to the parsed number when autoAnimate is off', async () => {
      const spy = vi.fn()
      element().addEventListener('complete.bs.countup', spy)
      quick()
      await wait(300)

      expect(element().textContent).toBe('30,000')
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should read options from the data-countup JSON', () => {
      fixtureEl.innerHTML = '<h1 data-countup=\'{"duration":4,"suffix":"%"}\'>300</h1>'

      const instance = new CountUp(element())

      expect(instance._config.duration).toBe(4)
      expect(element().textContent).toBe('0%')
    })

    it('should let the config object win over the attribute', () => {
      fixtureEl.innerHTML = '<h1 data-countup=\'{"duration":4}\'>300</h1>'

      const instance = new CountUp(element(), { duration: 6 })

      expect(instance._config.duration).toBe(6)
    })

    it('should ignore invalid JSON', () => {
      fixtureEl.innerHTML = '<h1 data-countup="{oops">300</h1>'

      expect(() => new CountUp(element())).not.toThrow()
      expect(element().textContent).toBe('0')
    })

    it('should parse formatted numbers', async () => {
      fixtureEl.innerHTML = '<h1 data-countup>$1,234.5</h1>'

      quick({ decimalPlaces: 1, prefix: '$' })
      await wait(300)

      expect(element().textContent).toBe('$1,234.5')
    })

    it('should leave text alone when it is not a number', () => {
      fixtureEl.innerHTML = '<h1 data-countup>soon</h1>'

      new CountUp(element())

      expect(element().textContent).toBe('soon')
    })
  })

  describe('autoAnimate', () => {
    it('should start on its own once the element is in view', async () => {
      const visible = document.createElement('h1')
      visible.dataset.countup = '{"duration":0.1}'
      visible.textContent = '500'
      document.body.append(visible)

      try {
        new CountUp(visible)
        await wait(400)

        expect(visible.textContent).toBe('500')
      } finally {
        visible.remove()
      }
    })

    it('should animate update() at once, even before the element is in view', async () => {
      const instance = new CountUp(element(), { duration: 0.1 })
      instance.update(77)
      await wait(300)

      expect(element().textContent).toBe('77')
    })
  })

  describe('data-tblr-countup', () => {
    it('should read options from the aliased attribute', () => {
      fixtureEl.innerHTML = '<h1 data-tblr-countup=\'{"suffix":"%"}\'>300</h1>'

      new CountUp(element())

      expect(element().textContent).toBe('0%')
    })
  })

  describe('events', () => {
    it('should fire start.bs.countup once per animation, not on resume', async () => {
      const spy = vi.fn()
      element().addEventListener('start.bs.countup', spy)
      const instance = quick({ duration: 0.3 })
      await wait(50)
      instance.pauseResume()
      instance.pauseResume()
      await wait(400)
      instance.update(5)

      expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('reduced motion', () => {
    it('should show the final value at once', () => {
      const spy = vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)

      try {
        quick({ duration: 5 })
        expect(element().textContent).toBe('30,000')
      } finally {
        spy.mockRestore()
      }
    })
  })

  describe('formatting', () => {
    it('should round to the decimal places', async () => {
      fixtureEl.innerHTML = '<h1 data-countup>3.6</h1>'

      quick()
      await wait(300)

      expect(element().textContent).toBe('4')
    })

    it('should count at a steady pace without easing', async () => {
      fixtureEl.innerHTML = '<h1 data-countup>1000</h1>'

      quick({ useEasing: false, useGrouping: false, duration: 0.4 })
      await wait(200)
      const midway = Number(element().textContent)

      expect(midway).toBeGreaterThan(350)
      expect(midway).toBeLessThan(650)
    })

    it('should apply grouping, decimals, separators, prefix and suffix', async () => {
      fixtureEl.innerHTML = '<h1 data-countup>-1234567.891</h1>'

      quick({ decimalPlaces: 2, separator: ' ', decimal: ',', prefix: '€', suffix: ' net' })
      await wait(300)

      expect(element().textContent).toBe('-€1 234 567,89 net')
    })

    it('should skip grouping when asked', async () => {
      quick({ useGrouping: false })
      await wait(300)

      expect(element().textContent).toBe('30000')
    })

    it('should count down from a higher start value', () => {
      const instance = quick({ startVal: 50000, duration: 10 })

      expect(element().textContent).toBe('50,000')
      instance.reset()
      expect(element().textContent).toBe('50,000')
    })
  })

  describe('format', () => {
    it('should count a time in minutes and print it as h:mm', async () => {
      fixtureEl.innerHTML = '<h1 data-countup=\'{"format":"time","suffix":" hrs"}\'>3:28</h1>'

      const instance = new CountUp(element(), { autoAnimate: false, duration: 0.1 })
      expect(instance._endVal).toBe(208)
      expect(element().textContent).toBe('0:00 hrs')

      await wait(300)
      expect(element().textContent).toBe('3:28 hrs')
    })

    it('should use a formatter function from the config', async () => {
      quick({ formatter: (value: number) => `${Math.round(value / 1000)}k` })
      await wait(300)

      expect(element().textContent).toBe('30k')
    })
  })

  describe('public API', () => {
    it('should animate to a new value with update()', async () => {
      const instance = quick()
      await wait(300)
      instance.update('42')
      await wait(300)

      expect(element().textContent).toBe('42')
    })

    it('should pause and resume', async () => {
      const instance = quick({ duration: 0.3 })
      await wait(100)
      instance.pauseResume()
      const paused = element().textContent
      await wait(100)

      expect(element().textContent).toBe(paused)
      expect(paused).not.toBe('30,000')

      instance.pauseResume()
      await wait(400)
      expect(element().textContent).toBe('30,000')
    })

    it('should reset to the start value', async () => {
      const instance = quick()
      await wait(300)
      instance.reset()

      expect(element().textContent).toBe('0')
    })

    it('should stop a running animation on reset()', async () => {
      const instance = quick({ duration: 0.3 })
      await wait(100)
      instance.reset()
      await wait(300)

      expect(element().textContent).toBe('0')
    })

    it('should ignore an update() that is not a number', async () => {
      const instance = quick()
      await wait(300)
      instance.update('soon')
      await wait(100)

      expect(element().textContent).toBe('30,000')
    })

    it('should stop and remove the instance on dispose', async () => {
      const instance = quick({ duration: 1 })
      await wait(50)
      instance.dispose()
      const frozen = element().textContent
      await wait(100)

      expect(element().textContent).toBe(frozen)
      expect(CountUp.getInstance(element())).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should reuse the instance', () => {
      const first = CountUp.getOrCreateInstance(element())
      const second = CountUp.getOrCreateInstance(element())

      expect(second).toBe(first)
    })
  })
})
