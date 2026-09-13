import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Sparkline from '../../src/sparkline'

describe('Sparkline', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  const el = (): HTMLElement => fixtureEl.querySelector('.sparkline')!

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Sparkline.NAME).toBe('sparkline')
    })
  })

  describe('constructor', () => {
    it('should render a line chart from data-bs-values', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-values="3,4,2,6"></span>'

      const spy = vi.fn()
      el().addEventListener('rendered.bs.sparkline', spy)
      new Sparkline(el())

      const svg = el().querySelector('svg')!
      expect(svg.getAttribute('viewBox')).toBe('0 0 80 24')
      expect(svg.querySelector('polyline')).not.toBeNull()
      expect(svg.querySelector('path')).toBeNull()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should render an area and a spot when asked', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-fill="auto" data-bs-spot="max" data-bs-values="1,5,2"></span>'

      new Sparkline(el())

      const svg = el().querySelector('svg')!
      expect(svg.querySelector('path')).not.toBeNull()
      const spot = svg.querySelector('circle')!
      expect(spot.getAttribute('cx')).toBe('40')
      expect(spot.getAttribute('cy')).toBe('2')
    })

    it('should render one rect per value for bars', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="[1, 2, 3]"></span>'

      new Sparkline(el())

      expect(el().querySelectorAll('rect').length).toBe(3)
    })

    it('should render a ring for the circle type', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="circle" data-bs-values="50" data-bs-width="32" data-bs-height="32"></span>'

      new Sparkline(el())

      const circles = el().querySelectorAll('circle')
      expect(circles.length).toBe(2)
      const dash = Number(circles[1].getAttribute('stroke-dasharray'))
      const offset = Number(circles[1].getAttribute('stroke-dashoffset'))
      expect(offset).toBeCloseTo(dash / 2, 5)
    })

    it('should render nothing without values', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline"></span>'

      new Sparkline(el())

      expect(el().innerHTML).toBe('')
    })

    it('should accept values from the config object', () => {
      fixtureEl.innerHTML = '<span class="sparkline"></span>'

      new Sparkline(el(), { type: 'bar', values: [1, 2] })

      expect(el().querySelectorAll('rect').length).toBe(2)
    })
  })

  describe('update', () => {
    it('should write the values back and re-render', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="1,2"></span>'

      const spy = vi.fn()
      el().addEventListener('updated.bs.sparkline', spy)
      const sparkline = new Sparkline(el())
      sparkline.update([1, 2, 3, 4])

      expect(el().getAttribute('data-bs-values')).toBe('1,2,3,4')
      expect(el().querySelectorAll('rect').length).toBe(4)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should override values given to the constructor', () => {
      fixtureEl.innerHTML = '<span class="sparkline"></span>'

      const sparkline = new Sparkline(el(), { type: 'bar', values: [1, 2] })
      sparkline.update('1,2,3')

      expect(el().querySelectorAll('rect').length).toBe(3)
    })
  })

  describe('dispose', () => {
    it('should empty the element and drop the instance', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-values="1,2"></span>'

      const sparkline = new Sparkline(el())
      sparkline.dispose()

      expect(el().innerHTML).toBe('')
      expect(Sparkline.getInstance(el())).toBeNull()
    })
  })
})
