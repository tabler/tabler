import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import VectorMap from '../../src/vector-map'
import type { VectorMapData } from '../../src/vector-map'
import { world } from '../../maps/world'

const squares: VectorMapData = {
  width: 30,
  height: 10,
  projection: { type: 'miller', scale: 1, translate: [0, 0] },
  regions: {
    AA: { name: 'First', path: 'M0 0l10 0 0 10-10 0z' },
    BB: { name: 'Second', path: 'M10 0l10 0 0 10-10 0z' },
    CC: { name: 'Third', path: 'M20 0l10 0 0 10-10 0z' },
  },
}

describe('VectorMap', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    VectorMap.maps = {}
    delete window.tablerVectorMaps
  })

  const el = (): HTMLElement => fixtureEl.querySelector('.vector-map')!
  const region = (code: string): SVGGeometryElement => el().querySelector<SVGGeometryElement>(`[data-region="${code}"]`)!
  const ratio = (code: string): string => region(code).style.getPropertyValue('--tblr-vector-map-value')

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(VectorMap.NAME).toBe('vector-map')
    })
  })

  describe('constructor', () => {
    it('should render one path per region of the map', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-map="squares"></div>'
      VectorMap.addMap('squares', squares)

      const spy = vi.fn()
      el().addEventListener('rendered.bs.vector-map', spy)
      new VectorMap(el())

      const svg = el().querySelector('svg')!
      expect(svg.getAttribute('viewBox')).toBe('0 0 30 10')
      expect(svg.querySelectorAll('path.vector-map-region').length).toBe(3)
      expect(region('BB').getAttribute('d')).toBe(squares.regions.BB.path)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should take the map as an object', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares })

      expect(el().querySelectorAll('path').length).toBe(3)
    })

    it('should find a map loaded with a script tag', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-map="squares"></div>'
      window.tablerVectorMaps = { squares }

      new VectorMap(el())

      expect(el().querySelectorAll('path').length).toBe(3)
    })

    it('should throw when the map is not loaded', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-map="nowhere"></div>'

      expect(() => new VectorMap(el())).toThrowError('VECTOR-MAP: Map "nowhere" is not loaded.')
    })

    it('should name the map for assistive technology when it has a label', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-label="Sales by country"></div>'

      new VectorMap(el(), { map: squares })

      const svg = el().querySelector('svg')!
      expect(svg.getAttribute('role')).toBe('img')
      expect(svg.getAttribute('aria-label')).toBe('Sales by country')
      expect(svg.hasAttribute('aria-hidden')).toBe(false)
    })

    it('should hide the map from assistive technology without a label', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares })

      expect(el().querySelector('svg')!.getAttribute('aria-hidden')).toBe('true')
    })
  })

  describe('values', () => {
    it('should shade regions by their place between the lowest and highest value', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-values='{"AA": 10, "BB": 20, "CC": 50}'></div>`

      new VectorMap(el(), { map: squares })

      expect(region('AA').getAttribute('data-value')).toBe('10')
      expect(ratio('AA')).toBe('0')
      expect(ratio('BB')).toBe('0.25')
      expect(ratio('CC')).toBe('1')
    })

    it('should leave a region without a value untouched', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 1, ZZ: 5 } })

      expect(region('BB').hasAttribute('data-value')).toBe(false)
      expect(ratio('BB')).toBe('')
    })

    it('should use the forced range and clamp values outside of it', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-min="0" data-bs-max="100"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 25, BB: 150, CC: -10 } })

      expect(ratio('AA')).toBe('0.25')
      expect(ratio('BB')).toBe('1')
      expect(ratio('CC')).toBe('0')
    })

    it('should give the full colour when all values are equal', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 7, BB: 7 } })

      expect(ratio('AA')).toBe('1')
      expect(ratio('BB')).toBe('1')
    })

    it('should ignore values that are not a number', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-values='{"AA": 10, "BB": null, "CC": "many"}'></div>`

      new VectorMap(el(), { map: squares })

      expect(region('AA').hasAttribute('data-value')).toBe(true)
      expect(region('BB').hasAttribute('data-value')).toBe(false)
      expect(region('CC').hasAttribute('data-value')).toBe(false)
    })
  })

  describe('update', () => {
    it('should replace the values without drawing the map again', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-values='{"AA": 10, "BB": 20}'></div>`

      const map = new VectorMap(el(), { map: squares })
      const svg = el().querySelector('svg')
      const spy = vi.fn()
      el().addEventListener('updated.bs.vector-map', spy)

      map.update({ BB: 1, CC: 3 })

      expect(el().querySelector('svg')).toBe(svg)
      expect(region('AA').hasAttribute('data-value')).toBe(false)
      expect(ratio('AA')).toBe('')
      expect(ratio('BB')).toBe('0')
      expect(ratio('CC')).toBe('1')
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('colors', () => {
    const colorVar = (index: number): string => el().style.getPropertyValue(`--tblr-vector-map-color-${index}`)

    it('should hand a scale of colors to the stylesheet', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-colors='["red", "yellow", "green"]'></div>`

      new VectorMap(el(), { map: squares, values: { AA: 1, BB: 2, CC: 3 } })

      expect(el().classList.contains('vector-map-colors')).toBe(true)
      expect(el().style.getPropertyValue('--tblr-vector-map-colors')).toBe('3')
      expect(colorVar(1)).toBe('red')
      expect(colorVar(2)).toBe('yellow')
      expect(colorVar(3)).toBe('green')
      expect(colorVar(4)).toBe('')
      // The share of a region stays the same, only the stylesheet reads it differently
      expect(ratio('BB')).toBe('0.5')
    })

    it('should keep the single color with fewer than two colors', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, colors: ['red'] })

      expect(el().classList.contains('vector-map-colors')).toBe(false)
      expect(el().style.getPropertyValue('--tblr-vector-map-colors')).toBe('')
      expect(colorVar(1)).toBe('')
    })

    it('should use the first five colors', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, colors: ['#111', '#222', '#333', '#444', '#555', '#666'] })

      expect(el().style.getPropertyValue('--tblr-vector-map-colors')).toBe('5')
      expect(colorVar(5)).toBe('#555')
      expect(colorVar(6)).toBe('')
    })

    it('should drop the scale when render() no longer has one, and on dispose', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-colors='["red", "green"]'></div>`

      const map = new VectorMap(el(), { map: squares })
      el().removeAttribute('data-bs-colors')
      map.render()

      expect(el().classList.contains('vector-map-colors')).toBe(false)
      expect(colorVar(1)).toBe('')

      el().setAttribute('data-bs-colors', '["red", "green"]')
      map.render()
      expect(colorVar(2)).toBe('green')

      map.dispose()
      expect(el().classList.contains('vector-map-colors')).toBe(false)
      expect(colorVar(2)).toBe('')
    })
  })

  describe('legend', () => {
    const legend = (): HTMLElement | null => el().querySelector<HTMLElement>('.vector-map-legend')
    const labels = (): string[] => [...el().querySelectorAll('.vector-map-legend-label')].map((label) => label.textContent ?? '')
    const steps = (): HTMLElement[] => [...el().querySelectorAll<HTMLElement>('.vector-map-legend-step')]

    it('should not be there by default', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 1, BB: 2 } })

      expect(legend()).toBeNull()
    })

    it('should show the lowest and the highest value around a bar that runs over the whole scale', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-legend="true"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 10, BB: 20, CC: 1500 } })

      expect(labels()).toEqual(['10', (1500).toLocaleString()])
      expect(steps().length).toBeGreaterThan(10)
      expect(steps()[0].style.getPropertyValue('--tblr-vector-map-value')).toBe('0')
      expect(steps().at(-1)!.style.getPropertyValue('--tblr-vector-map-value')).toBe('1')
      expect(el().querySelector('.vector-map-legend-scale')!.getAttribute('aria-hidden')).toBe('true')
      // The legend comes after the drawing
      expect(el().lastElementChild).toBe(legend())
    })

    it('should use the forced range', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-legend="true" data-bs-min="0" data-bs-max="100"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 25 } })

      expect(labels()).toEqual(['0', '100'])
    })

    it('should format the labels with a function', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 5, BB: 80 }, legend: (value) => `${value}%` })

      expect(labels()).toEqual(['5%', '80%'])
    })

    it('should follow the values on update(), with one legend at all times', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-legend="true"></div>'

      const map = new VectorMap(el(), { map: squares, values: { AA: 1, BB: 2 } })
      map.update({ AA: 3, CC: 9 })

      expect(labels()).toEqual(['3', '9'])
      expect(el().querySelectorAll('.vector-map-legend').length).toBe(1)
    })

    it('should stay away when the map has no values, and go on dispose', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-legend="true"></div>'

      const map = new VectorMap(el(), { map: squares })
      expect(legend()).toBeNull()

      map.update({ AA: 1 })
      expect(legend()).not.toBeNull()

      map.dispose()
      expect(legend()).toBeNull()
    })
  })

  describe('points', () => {
    const islands: VectorMapData = {
      ...squares,
      regions: { ZZ: { name: 'Island', path: 'M15 5h0', point: true }, ...squares.regions },
    }

    it('should draw a region that is a point as a dot with a ring, on top of the shapes', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: islands })

      const point = region('ZZ')
      expect(point.tagName).toBe('g')
      expect(point.classList.contains('vector-map-region-point')).toBe(true)
      expect(point.querySelector('.vector-map-region-point-halo')!.getAttribute('d')).toBe('M15 5h0')
      expect(point.querySelector('.vector-map-region-point-dot')!.getAttribute('d')).toBe('M15 5h0')
      expect(el().querySelector('svg')!.lastElementChild).toBe(point)
    })

    it('should give a point a value and a tooltip like any region', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: islands, values: { AA: 1, ZZ: 3 } })

      expect(region('ZZ').getAttribute('data-value')).toBe('3')
      expect(ratio('ZZ')).toBe('1')

      region('ZZ')
        .querySelector('.vector-map-region-point-dot')!
        .dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
      expect(el().querySelector('.vector-map-tooltip')!.textContent).toBe('Island: 3')
    })
  })

  describe('markers', () => {
    it('should place a marker by its coordinates', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-markers='[{"name": "Null Island", "lat": 0, "lng": 0}]'></div>`

      new VectorMap(el(), { map: world })

      const marker = el().querySelector('.vector-map-marker')!
      expect(marker.getAttribute('data-marker')).toBe('Null Island')
      expect(marker.querySelector('.vector-map-marker-halo')!.getAttribute('d')).toBe('M500 316h0')
      expect(marker.querySelector('.vector-map-marker-dot')!.getAttribute('d')).toBe('M500 316h0')
    })

    it('should put a marker inside the country it belongs to', () => {
      fixtureEl.innerHTML = '<div class="vector-map" style="width: 500px"></div>'

      new VectorMap(el(), { map: world, markers: [{ name: 'Warsaw', lat: 52.23, lng: 21.01 }] })

      const [x, y] = el().querySelector('.vector-map-marker-dot')!.getAttribute('d')!.slice(1, -2).split(' ').map(Number)
      const svg = el().querySelector('svg')!
      const point = svg.createSVGPoint()
      point.x = x
      point.y = y
      expect(region('PL').isPointInFill(point)).toBe(true)
      expect(region('DE').isPointInFill(point)).toBe(false)
    })

    it('should leave out a marker without real coordinates', () => {
      fixtureEl.innerHTML = `<div class="vector-map" data-bs-markers='[{"name": "A", "lat": 1, "lng": 2}, {"name": "B", "lat": "north"}, null]'></div>`

      new VectorMap(el(), { map: squares })

      expect(el().querySelectorAll('.vector-map-marker').length).toBe(1)
    })

    it('should draw a curve between two markers, under the markers', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), {
        map: world,
        markers: [
          { name: 'A', lat: 0, lng: 0 },
          { name: 'B', lat: 0, lng: 90 },
        ],
        lines: [{ from: 'A', to: 'B' }],
      })

      const line = el().querySelector('.vector-map-line')!
      expect(line.getAttribute('d')).toBe('M500 316Q625 266 750 316')
      expect(line.compareDocumentPosition(el().querySelector('.vector-map-marker')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    })

    it('should skip a line to a marker that does not exist', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, markers: [{ name: 'A', lat: 0, lng: 0 }], lines: [{ from: 'A', to: 'Nowhere' }] })

      expect(el().querySelector('.vector-map-line')).toBeNull()
    })
  })

  describe('tooltip', () => {
    const tooltip = (): HTMLElement | null => el().querySelector<HTMLElement>('.vector-map-tooltip')
    const moveOver = (target: Element): void => {
      target.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 10, clientY: 10 }))
    }

    it('should show the name of the region under the pointer, with its value', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, values: { AA: 5 } })
      expect(tooltip()).toBeNull()

      moveOver(region('AA'))
      expect(tooltip()!.textContent).toBe('First: 5')
      expect(tooltip()!.hidden).toBe(false)

      moveOver(region('BB'))
      expect(tooltip()!.textContent).toBe('Second')
      expect(el().querySelectorAll('.vector-map-tooltip').length).toBe(1)
    })

    it('should show the name of a marker', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares, markers: [{ name: 'Capital', lat: 0, lng: 0 }] })
      moveOver(el().querySelector('.vector-map-marker-dot')!)

      expect(tooltip()!.textContent).toBe('Capital')
    })

    it('should hide when the pointer leaves the map', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), { map: squares })
      moveOver(region('AA'))
      el().dispatchEvent(new PointerEvent('pointerleave'))

      expect(tooltip()!.hidden).toBe(true)
    })

    it('should not show when turned off', () => {
      fixtureEl.innerHTML = '<div class="vector-map" data-bs-tooltip="false"></div>'

      new VectorMap(el(), { map: squares })
      moveOver(region('AA'))

      expect(tooltip()).toBeNull()
    })

    it('should take the text from a function, as plain text', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      new VectorMap(el(), {
        map: squares,
        values: { AA: 5 },
        tooltip: (item) => (item.type === 'region' && item.value !== undefined ? `<b>${item.code}</b> ${item.value} %` : ''),
      })

      moveOver(region('AA'))
      expect(tooltip()!.textContent).toBe('<b>AA</b> 5 %')
      expect(tooltip()!.querySelector('b')).toBeNull()

      moveOver(region('BB'))
      expect(tooltip()!.hidden).toBe(true)
    })
  })

  describe('zoom', () => {
    const svg = (): SVGSVGElement => el().querySelector<SVGSVGElement>('.vector-map-svg')!
    const viewBox = (): number[] => svg().getAttribute('viewBox')!.split(' ').map(Number)
    const button = (action: string): HTMLButtonElement => el().querySelector<HTMLButtonElement>(`[data-bs-vector-map-action="${action}"]`)!
    const pointer = (type: string, x: number, y: number, pointerId = 1): void => {
      region('BB').dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId, pointerType: 'mouse', button: 0, clientX: x, clientY: y }))
    }

    const wheel = (deltaY: number, target: Element = region('BB')): WheelEvent => {
      const rect = target.getBoundingClientRect()
      const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 })
      target.dispatchEvent(event)
      return event
    }

    const zoomable = (config = {}): VectorMap => {
      fixtureEl.innerHTML = '<div class="vector-map" style="width: 300px" data-bs-zoom="true"></div>'
      return new VectorMap(el(), { map: squares, ...config })
    }

    it('should not react to the wheel or add buttons by default', () => {
      fixtureEl.innerHTML = '<div class="vector-map" style="width: 300px"></div>'
      new VectorMap(el(), { map: squares })

      const event = wheel(-500)

      expect(event.defaultPrevented).toBe(false)
      expect(viewBox()).toEqual([0, 0, 30, 10])
      expect(el().querySelector('.vector-map-controls')).toBeNull()
      expect(el().classList.contains('vector-map-zoomable')).toBe(false)
    })

    it('should add labelled buttons, with zoom out disabled on the whole map', () => {
      zoomable({ zoomInLabel: 'Closer' })

      expect(el().classList.contains('vector-map-zoomable')).toBe(true)
      expect(button('zoom-in').getAttribute('aria-label')).toBe('Closer')
      expect(button('zoom-out').getAttribute('aria-label')).toBe('Zoom out')
      expect(button('zoom-in').disabled).toBe(false)
      expect(button('zoom-out').disabled).toBe(true)
    })

    it('should zoom with the wheel around the pointer and keep the page from scrolling', () => {
      zoomable()

      // exp(500 * 0.002) is a little under 3 times
      const event = wheel(-500)

      expect(event.defaultPrevented).toBe(true)
      const [x, y, width, height] = viewBox()
      expect(width).toBeCloseTo(30 / Math.E, 1)
      expect(height).toBeCloseTo(10 / Math.E, 1)
      // The middle of the map was under the pointer, so it is still in the middle
      expect(x + width / 2).toBeCloseTo(15, 0)
      expect(y + height / 2).toBeCloseTo(5, 0)
      expect(button('zoom-out').disabled).toBe(false)
    })

    it('should leave the wheel alone with zoomOnScroll off', () => {
      zoomable({ zoomOnScroll: false })

      expect(wheel(-500).defaultPrevented).toBe(false)
      expect(viewBox()).toEqual([0, 0, 30, 10])
    })

    it('should stop at the largest zoom and at the whole map', () => {
      zoomable({ zoomMax: 2 })

      wheel(-5000)
      expect(viewBox()[2]).toBe(15)
      expect(button('zoom-in').disabled).toBe(true)

      wheel(5000)
      expect(viewBox()).toEqual([0, 0, 30, 10])
    })

    it('should zoom in steps with the buttons', async () => {
      zoomable()

      button('zoom-in').click()
      await vi.waitFor(() => {
        expect(viewBox()).toEqual([7.5, 2.5, 15, 5])
      })

      button('zoom-out').click()
      await vi.waitFor(() => {
        expect(viewBox()).toEqual([0, 0, 30, 10])
      })
    })

    it('should zoom in on a double click', async () => {
      zoomable()

      region('AA').dispatchEvent(new MouseEvent('dblclick', { bubbles: true, clientX: el().getBoundingClientRect().left, clientY: el().getBoundingClientRect().top }))

      // The top left corner was under the pointer, so it stays in the corner
      await vi.waitFor(() => {
        expect(viewBox()).toEqual([0, 0, 15, 5])
      })
    })

    it('should go back to the whole map on reset', async () => {
      const map = zoomable()
      wheel(-500)

      map.reset()

      await vi.waitFor(() => {
        expect(viewBox()).toEqual([0, 0, 30, 10])
      })
    })

    it('should drag the map with a pointer, but never out of sight', () => {
      zoomable({ zoomMax: 2 })
      wheel(-5000)
      expect(viewBox()).toEqual([7.5, 2.5, 15, 5])

      // 300px show 15 units, so 40px is 2 units
      pointer('pointerdown', 100, 50)
      pointer('pointermove', 60, 50)
      expect(viewBox()).toEqual([9.5, 2.5, 15, 5])
      expect(el().classList.contains('vector-map-dragging')).toBe(true)

      pointer('pointermove', -1000, 50)
      expect(viewBox()).toEqual([15, 2.5, 15, 5])

      pointer('pointerup', -1000, 50)
      expect(el().classList.contains('vector-map-dragging')).toBe(false)

      pointer('pointermove', 0, 50)
      expect(viewBox()).toEqual([15, 2.5, 15, 5])
    })

    it('should not drag a map that cannot be zoomed', () => {
      fixtureEl.innerHTML = '<div class="vector-map" style="width: 300px"></div>'
      new VectorMap(el(), { map: squares })

      pointer('pointerdown', 100, 50)
      pointer('pointermove', 60, 50)

      expect(el().classList.contains('vector-map-dragging')).toBe(false)
    })

    it('should zoom when two pointers move apart', () => {
      zoomable()
      const rect = el().getBoundingClientRect()
      const y = rect.top + 50

      pointer('pointerdown', rect.left + 140, y, 1)
      pointer('pointerdown', rect.left + 160, y, 2)
      pointer('pointermove', rect.left + 180, y, 2)

      // 20px between the fingers became 40px
      expect(viewBox()[2]).toBe(15)
    })

    it('should start from the whole map again after render()', () => {
      const map = zoomable()
      wheel(-500)

      map.render()

      expect(viewBox()).toEqual([0, 0, 30, 10])
      expect(el().querySelectorAll('.vector-map-controls').length).toBe(1)
    })
  })

  describe('render', () => {
    it('should replace the previous drawing', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      const map = new VectorMap(el(), { map: squares })
      map.render()

      expect(el().querySelectorAll('svg').length).toBe(1)
    })
  })

  describe('dispose', () => {
    it('should remove the drawing', () => {
      fixtureEl.innerHTML = '<div class="vector-map"></div>'

      const map = new VectorMap(el(), { map: squares, zoom: true })
      region('AA').dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
      map.dispose()

      expect(el().querySelector('svg')).toBeNull()
      expect(el().querySelector('.vector-map-tooltip')).toBeNull()
      expect(el().querySelector('.vector-map-controls')).toBeNull()
      expect(el().classList.contains('vector-map-zoomable')).toBe(false)
      expect(VectorMap.getInstance(el())).toBeNull()
    })
  })

  describe('world map', () => {
    it('should have countries by their ISO code, each with a shape', () => {
      expect(Object.keys(world.regions).length).toBeGreaterThan(170)
      expect(world.regions.PL.name).toBe('Poland')
      expect(world.regions.FR.name).toBe('France')
      expect(world.regions.AQ).toBeUndefined()

      for (const [code, { path, point }] of Object.entries(world.regions)) {
        expect(code).toMatch(/^[A-Z]{2}$/)
        expect(path).toMatch(point ? /^M[\d. ]+h0$/ : /^M[-\d. ]+l[-\d. ]+z/)
      }
    })

    it('should have the countries too small for a shape as points', () => {
      for (const code of ['AD', 'SM', 'MC', 'LI', 'VA', 'MT', 'SG', 'HK', 'MO']) {
        expect(world.regions[code].point).toBe(true)
      }

      expect(world.regions.PL.point).toBeUndefined()
      // Dependencies are left out
      expect(world.regions.GI).toBeUndefined()
    })

    it('should draw inside its viewBox', () => {
      fixtureEl.innerHTML = '<div class="vector-map" style="width: 500px"></div>'

      new VectorMap(el(), { map: world })

      const svg = el().querySelector('svg')!
      // The shapes are rounded to one decimal place
      const box = svg.getBBox()
      expect(box.x).toBeGreaterThanOrEqual(-0.05)
      expect(box.y).toBeGreaterThanOrEqual(-0.05)
      expect(box.x + box.width).toBeLessThanOrEqual(world.width + 0.05)
      expect(box.y + box.height).toBeLessThanOrEqual(world.height + 0.05)
    })
  })
})
