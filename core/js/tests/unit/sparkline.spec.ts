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

    it('should draw negative bars below the zero line in the negative color', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="2,-2" data-bs-height="20" data-bs-bar-gap="0"></span>'

      new Sparkline(el())

      const [up, down] = Array.from(el().querySelectorAll('rect'))
      expect(up.getAttribute('y')).toBe('0')
      expect(up.getAttribute('height')).toBe('10')
      expect(up.getAttribute('fill')).toBe('var(--tblr-sparkline-stroke)')
      expect(down.getAttribute('y')).toBe('10')
      expect(down.getAttribute('height')).toBe('10')
      expect(down.getAttribute('fill')).toBe('var(--tblr-sparkline-negative)')

      const zero = el().querySelector('line')!
      expect(zero.getAttribute('y1')).toBe('10')
      expect(zero.getAttribute('stroke')).toBe('var(--tblr-sparkline-zero)')
    })

    it('should not draw a zero line without negative values', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="1,2,3"></span>'

      new Sparkline(el())

      expect(el().querySelector('line')).toBeNull()
    })

    it('should draw win, loss and tie bars for the tristate type', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="tristate" data-bs-values="5,-1,0" data-bs-height="20"></span>'

      new Sparkline(el())

      const [win, loss, tie] = Array.from(el().querySelectorAll('rect'))
      expect([win.getAttribute('y'), win.getAttribute('height'), win.getAttribute('fill')]).toEqual(['0', '10', 'var(--tblr-sparkline-stroke)'])
      expect([loss.getAttribute('y'), loss.getAttribute('height'), loss.getAttribute('fill')]).toEqual(['10', '10', 'var(--tblr-sparkline-negative)'])
      expect([tie.getAttribute('y'), tie.getAttribute('height'), tie.getAttribute('fill')]).toEqual(['9', '2', 'var(--tblr-sparkline-track)'])
      expect(el().querySelector('line')!.getAttribute('y1')).toBe('10')
    })

    it('should clip bars to the chart when min is above zero', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="99,100" data-bs-min="98" data-bs-max="100" data-bs-height="20"></span>'

      new Sparkline(el())

      const bars = Array.from(el().querySelectorAll('rect')).map((rect) => [rect.getAttribute('y'), rect.getAttribute('height')])
      expect(bars).toEqual([
        ['10', '10'],
        ['0', '20'],
      ])
    })

    it('should draw a threshold line and color the bars below it', () => {
      fixtureEl.innerHTML = '<span class="sparkline" id="line" data-bs-toggle="sparkline" data-bs-values="2,4,6" data-bs-threshold="8" data-bs-height="24" data-bs-pad="2"></span>' + '<span class="sparkline" id="bars" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="2,4,6" data-bs-threshold="5"></span>'

      new Sparkline('#line')
      new Sparkline('#bars')

      // The range widens to include the threshold, so its line sits at the top padding.
      const guide = fixtureEl.querySelector('#line line')!
      expect(guide.getAttribute('y1')).toBe('2')
      expect(guide.getAttribute('stroke')).toBe('var(--tblr-sparkline-threshold)')

      const fills = Array.from(fixtureEl.querySelectorAll('#bars rect')).map((rect) => rect.getAttribute('fill'))
      expect(fills).toEqual(['var(--tblr-sparkline-negative)', 'var(--tblr-sparkline-negative)', 'var(--tblr-sparkline-stroke)'])
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

    it('should derive an auto label from the data', () => {
      fixtureEl.innerHTML = '<span class="sparkline" id="ring" data-bs-toggle="sparkline" data-bs-type="circle" data-bs-values="3" data-bs-max="4" data-bs-label="auto"></span>' + '<span class="sparkline" id="bars" data-bs-toggle="sparkline" data-bs-type="bar" data-bs-values="1,2,7" data-bs-label="auto"></span>'

      new Sparkline('#ring')
      new Sparkline('#bars')

      expect(fixtureEl.querySelector('#ring .sparkline-label')!.textContent).toBe('75%')
      expect(fixtureEl.querySelector('#bars .sparkline-label')!.textContent).toBe('7')
    })

    it('should add a text label when asked', () => {
      fixtureEl.innerHTML = '<span class="sparkline" data-bs-toggle="sparkline" data-bs-type="circle" data-bs-values="72" data-bs-label="72%"></span>'

      new Sparkline(el())

      const label = el().querySelector('.sparkline-label')!
      expect(label.textContent).toBe('72%')
      expect(el().querySelector('svg')).not.toBeNull()
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

  describe('animation', () => {
    it('should keep the svg and tween its attributes on an update of the same shape', async () => {
      fixtureEl.innerHTML = '<span class="sparkline"></span>'

      const sparkline = new Sparkline(el(), { type: 'bar', values: [1, 2], animation: 50, barGap: 0 })
      const svg = el().querySelector('svg')!
      sparkline.update([2, 1])

      expect(el().querySelector('svg')).toBe(svg)
      await new Promise((resolve) => setTimeout(resolve, 200))

      const heights = Array.from(svg.querySelectorAll('rect')).map((rect) => rect.getAttribute('height'))
      expect(heights).toEqual(['24', '12'])
    })

    it('should replace the svg when the shape changes or animation is off', () => {
      fixtureEl.innerHTML = '<span class="sparkline"></span>'

      const sparkline = new Sparkline(el(), { type: 'bar', values: [1, 2], animation: 0 })
      const svg = el().querySelector('svg')!
      sparkline.update([2, 1])

      expect(el().querySelector('svg')).not.toBe(svg)
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
