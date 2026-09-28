import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Confetti from '../../src/confetti'

describe('Confetti', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    // Let every burst land so one test's canvas never leaks into the next.
    for (const element of fixtureEl.querySelectorAll<HTMLElement>('button, div')) {
      Confetti.getInstance(element)?.dispose()
    }

    clearFixture()
    vi.restoreAllMocks()
    return vi.waitFor(() => expect(canvas()).toBeNull())
  })

  const button = (): HTMLElement => fixtureEl.querySelector('button')!
  const canvas = (): HTMLCanvasElement | null => document.querySelector('.confetti-canvas')

  // A short pour with fast pieces: the whole shower is over well within a second.
  const QUICK = { count: 5, duration: 20, speed: 60 }

  const reduceMotion = (matches: boolean): void => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({ matches, media: query }) as MediaQueryList)
  }

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Confetti.NAME).toBe('confetti')
    })
  })

  describe('Default', () => {
    it('should expose the defaults and their types', () => {
      expect(Confetti.Default.count).toBe(220)
      expect(Confetti.Default.colors).toBeNull()
      expect(Confetti.DefaultType.colors).toBe('(array|string|null)')
    })
  })

  describe('burst', () => {
    it('should mount one shared canvas and remove it after the pieces land', async () => {
      fixtureEl.innerHTML = '<button type="button"></button>'
      reduceMotion(false)

      const instance = new Confetti(button(), QUICK)
      instance.burst()

      const mounted = canvas()!
      expect(mounted).not.toBeNull()
      expect(mounted.getAttribute('aria-hidden')).toBe('true')
      expect(mounted.style.pointerEvents).toBe('none')

      instance.burst()
      expect(document.querySelectorAll('.confetti-canvas')).toHaveLength(1)

      await vi.waitFor(() => expect(canvas()).toBeNull(), { timeout: 3000 })
    })

    it('should fire start and end events', async () => {
      fixtureEl.innerHTML = '<button type="button"></button>'
      reduceMotion(false)

      const start = vi.fn()
      const end = vi.fn()
      button().addEventListener('start.bs.confetti', start)
      button().addEventListener('end.bs.confetti', end)

      new Confetti(button(), QUICK).burst()
      expect(start).toHaveBeenCalledTimes(1)
      expect(end).not.toHaveBeenCalled()

      await vi.waitFor(() => expect(end).toHaveBeenCalledTimes(1), { timeout: 3000 })
    })

    it('should not start when the start event is prevented', () => {
      fixtureEl.innerHTML = '<button type="button"></button>'
      reduceMotion(false)

      button().addEventListener('start.bs.confetti', (event) => event.preventDefault())
      new Confetti(button(), QUICK).burst()

      expect(canvas()).toBeNull()
    })

    it('should skip the animation but still end when the user prefers reduced motion', () => {
      fixtureEl.innerHTML = '<button type="button"></button>'
      reduceMotion(true)

      const end = vi.fn()
      button().addEventListener('end.bs.confetti', end)
      new Confetti(button(), QUICK).burst()

      expect(canvas()).toBeNull()
      expect(end).toHaveBeenCalledTimes(1)
    })
  })

  describe('stop', () => {
    it('should stop pouring and let the pieces in the air land', async () => {
      fixtureEl.innerHTML = '<button type="button"></button>'
      reduceMotion(false)

      const end = vi.fn()
      button().addEventListener('end.bs.confetti', end)

      const instance = new Confetti(button(), { count: 50, duration: 60_000, speed: 60 })
      instance.burst()
      expect(canvas()).not.toBeNull()

      instance.stop()
      await vi.waitFor(() => expect(end).toHaveBeenCalledTimes(1), { timeout: 3000 })
      expect(canvas()).toBeNull()
    })
  })

  describe('colors', () => {
    it('should accept a comma separated list from a data attribute', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-colors=" #f00, #0f0 ,#00f"></button>'

      const instance = new Confetti(button())
      expect(instance._config.colors).toEqual(['#f00', '#0f0', '#00f'])
    })

    it('should read the Tabler palette from custom properties by default', () => {
      fixtureEl.innerHTML = '<button type="button"></button>'
      document.documentElement.style.setProperty('--tblr-blue', 'rgb(1, 2, 3)')

      const colors = new Confetti(button())._colors()
      document.documentElement.style.removeProperty('--tblr-blue')

      expect(colors).toHaveLength(12)
      expect(colors[0]).toBe('rgb(1, 2, 3)')
      // No CSS is loaded in the test page: the other names fall back to hex.
      expect(colors[1]).toBe('#4299e1')
    })
  })

  describe('data-api', () => {
    it('should burst on click without instantiating manually', async () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="confetti" data-bs-count="5" data-bs-duration="20" data-bs-speed="60"></button>'
      reduceMotion(false)

      button().click()

      const instance = Confetti.getInstance(button()) as Confetti
      expect(instance).not.toBeNull()
      expect(instance._config.count).toBe(5)
      expect(canvas()).not.toBeNull()
    })

    it('should burst on the target of a data-tblr-toggle trigger and prevent the default on a link', () => {
      fixtureEl.innerHTML = '<a href="#" data-tblr-toggle="confetti" data-tblr-target="#party"></a><div id="party"></div>'
      reduceMotion(true)

      const start = vi.fn()
      const target = fixtureEl.querySelector('#party')!
      target.addEventListener('start.bs.confetti', start)

      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      fixtureEl.querySelector('a')!.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(true)
      expect(start).toHaveBeenCalledTimes(1)
      expect(Confetti.getInstance(fixtureEl.querySelector('a')!)).toBeNull()
    })

    it('should ignore a disabled trigger', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="confetti" disabled></button>'
      reduceMotion(true)

      const start = vi.fn()
      button().addEventListener('start.bs.confetti', start)
      button().click()

      expect(start).not.toHaveBeenCalled()
    })
  })
})
