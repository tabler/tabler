import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import MapView from '../../src/map'
import type { MapLibrary } from '../../src/map'

// A stand-in for MapLibre GL JS: it records what the component asks for,
// so the tests need no WebGL and no network.
type Listener = () => void

class FakeMap {
  static last: FakeMap
  options: Record<string, unknown>
  listeners: Record<string, Listener[]> = {}
  styles: string[] = []
  paint: Record<string, Record<string, string>> = {}
  calls: string[] = []
  sources: Record<string, Record<string, unknown>> = {}
  addedLayers: Record<string, unknown>[] = []
  flownTo: { center: [number, number]; zoom: number } | null = null
  projection: { type: string } | null = null
  removed = false
  layers = [{ id: 'background' }, { id: 'water' }, { id: 'label_city' }, { id: 'place_city' }, { id: 'unknown_layer' }]

  constructor(options: Record<string, unknown>) {
    this.options = options
    this.styles.push(options.style as string)
    FakeMap.last = this
  }

  on(type: string, listener: Listener): this {
    ;(this.listeners[type] ??= []).push(listener)
    return this
  }

  fire(type: string): void {
    for (const listener of this.listeners[type] ?? []) {
      listener()
    }
  }

  loaded(): boolean {
    return true
  }

  remove(): void {
    this.removed = true
  }

  setStyle(style: string): void {
    this.styles.push(style)
  }

  getStyle(): { layers: { id: string }[] } {
    return { layers: this.layers }
  }

  setPaintProperty(layer: string, name: string, value: string): void {
    ;(this.paint[layer] ??= {})[name] = value
  }

  setProjection(projection: { type: string }): void {
    this.projection = projection
  }

  zoomIn(): void {
    this.calls.push('zoomIn')
  }

  zoomOut(): void {
    this.calls.push('zoomOut')
  }

  resetNorthPitch(): void {
    this.calls.push('resetNorthPitch')
  }

  addSource(id: string, source: Record<string, unknown>): void {
    this.sources[id] = source
  }

  addLayer(layer: Record<string, unknown>): void {
    this.addedLayers.push(layer)
  }

  getZoom(): number {
    return this.options.zoom as number
  }

  flyTo(options: { center: [number, number]; zoom: number }): void {
    this.flownTo = options
  }
}

class FakePopup {
  options: Record<string, unknown>
  content: Node | null = null
  text: string | null = null

  constructor(options: Record<string, unknown>) {
    this.options = options
  }

  setDOMContent(node: Node): this {
    this.content = node
    return this
  }

  setText(text: string): this {
    this.text = text
    return this
  }
}

class FakeMarker {
  static all: FakeMarker[] = []
  options: Record<string, unknown>
  lngLat: [number, number] | null = null
  popup: FakePopup | null = null
  popupToggled = 0
  removed = false

  constructor(options: Record<string, unknown>) {
    this.options = options
    FakeMarker.all.push(this)
  }

  setLngLat(lngLat: [number, number]): this {
    this.lngLat = lngLat
    return this
  }

  setPopup(popup: unknown): this {
    this.popup = popup as FakePopup
    return this
  }

  addTo(): this {
    return this
  }

  togglePopup(): this {
    this.popupToggled++
    return this
  }

  getElement(): HTMLElement {
    return this.options.element as HTMLElement
  }

  remove(): void {
    this.removed = true
  }
}

const library = { Map: FakeMap, Marker: FakeMarker, Popup: FakePopup } as unknown as MapLibrary

describe('MapView', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    window.maplibregl = library
    FakeMarker.all = []
  })

  afterEach(() => {
    delete window.maplibregl
    document.documentElement.removeAttribute('data-bs-theme')
    clearFixture()
  })

  const mount = (markup: string): HTMLElement => {
    fixtureEl.innerHTML = markup
    return fixtureEl.firstElementChild as HTMLElement
  }

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(MapView.NAME).toBe('map')
    })
  })

  describe('constructor', () => {
    it('should stay inert without the library', () => {
      delete window.maplibregl

      const view = new MapView(mount('<div></div>'))

      expect(view.map).toBeNull()
      expect(view.markers).toEqual([])
    })

    it('should create a map with the default style and the options from data attributes', () => {
      const element = mount('<div data-bs-center="13.405,52.52" data-bs-zoom="12"></div>')
      const view = new MapView(element)

      expect(view.map).toBe(FakeMap.last)
      expect(FakeMap.last.options.container).toBe(element)
      expect(FakeMap.last.options.center).toEqual([13.405, 52.52])
      expect(FakeMap.last.options.zoom).toBe(12)
      expect(FakeMap.last.options.style).toBe('https://tiles.openfreemap.org/styles/positron')
    })

    it('should accept the center as an array and pass map options through', () => {
      new MapView(mount('<div></div>'), { center: [1, 2], mapOptions: { pitch: 30 } })

      expect(FakeMap.last.options.center).toEqual([1, 2])
      expect(FakeMap.last.options.pitch).toBe(30)
    })

    it('should use a style URL as it is', () => {
      new MapView(mount('<div></div>'), { mapStyle: 'https://example.com/style.json' })

      expect(FakeMap.last.options.style).toBe('https://example.com/style.json')
    })

    it('should fire the load event when the map has loaded', () => {
      const element = mount('<div></div>')
      let loaded = 0

      element.addEventListener('load.bs.map', () => loaded++)
      new MapView(element)
      FakeMap.last.fire('load')

      expect(loaded).toBe(1)
    })
  })

  describe('theme', () => {
    it('should start with the dark style under a dark theme', () => {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      new MapView(mount('<div></div>'))

      expect(FakeMap.last.options.style).toBe('https://tiles.openfreemap.org/styles/dark')
    })

    it('should change the style when the theme changes', async () => {
      new MapView(mount('<div></div>'))

      document.documentElement.setAttribute('data-bs-theme', 'dark')
      await Promise.resolve()

      expect(FakeMap.last.styles.at(-1)).toBe('https://tiles.openfreemap.org/styles/dark')

      document.documentElement.removeAttribute('data-bs-theme')
      await Promise.resolve()

      expect(FakeMap.last.styles.at(-1)).toBe('https://tiles.openfreemap.org/styles/positron')
    })

    it('should keep a fixed theme', async () => {
      new MapView(mount('<div data-bs-map-theme="dark"></div>'))

      expect(FakeMap.last.options.style).toBe('https://tiles.openfreemap.org/styles/dark')

      document.documentElement.setAttribute('data-bs-theme', 'light')
      await Promise.resolve()

      expect(FakeMap.last.styles).toHaveLength(1)
    })

    it('should keep one style in both modes when the dark style is off', () => {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      new MapView(mount('<div></div>'), { mapStyle: 'liberty', mapStyleDark: null })

      expect(FakeMap.last.options.style).toBe('https://tiles.openfreemap.org/styles/liberty')
    })
  })

  describe('style load', () => {
    it('should recolor the layers of the default style', () => {
      new MapView(mount('<div></div>'))
      FakeMap.last.fire('style.load')

      expect(FakeMap.last.paint.background).toEqual({ 'background-color': '#fafaf8' })
      expect(FakeMap.last.paint.water).toEqual({ 'fill-color': '#d4dadc' })
      expect(FakeMap.last.paint.label_city?.['text-color']).toBe('#697b89')
      expect(FakeMap.last.paint.unknown_layer).toBeUndefined()
    })

    it('should use the dark palette for the dark style', () => {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      new MapView(mount('<div></div>'))
      FakeMap.last.fire('style.load')

      expect(FakeMap.last.paint.background).toEqual({ 'background-color': '#0e0e0e' })
      expect(FakeMap.last.paint.place_city).toEqual({ 'text-color': 'rgb(204, 208, 228)' })
    })

    it('should leave other styles and a disabled palette alone', () => {
      new MapView(mount('<div></div>'), { mapStyle: 'liberty' })
      FakeMap.last.fire('style.load')
      expect(FakeMap.last.paint).toEqual({})

      new MapView(mount('<div></div>'), { palette: false })
      FakeMap.last.fire('style.load')
      expect(FakeMap.last.paint).toEqual({})
    })

    it('should set the globe projection each time a style loads', () => {
      new MapView(mount('<div data-bs-globe="true"></div>'))

      expect(FakeMap.last.projection).toBeNull()

      FakeMap.last.fire('style.load')

      expect(FakeMap.last.projection).toEqual({ type: 'globe' })
    })
  })

  describe('markers', () => {
    it('should turn child elements with coordinates into markers', () => {
      const element = mount(`
        <div>
          <span class="map-marker" data-bs-lng="13.4" data-bs-lat="52.5"></span>
          <span class="map-marker map-marker-pin" data-bs-lng="2.35" data-bs-lat="48.85" data-bs-anchor="bottom" data-bs-draggable="true"></span>
          <p>Not a marker</p>
        </div>`)
      const view = new MapView(element)

      expect(view.markers).toHaveLength(2)
      expect(FakeMarker.all[0]?.lngLat).toEqual([13.4, 52.5])
      expect(FakeMarker.all[0]?.options).toMatchObject({ anchor: 'center', draggable: false })
      expect(FakeMarker.all[1]?.options).toMatchObject({ anchor: 'bottom', draggable: true })
      expect(FakeMarker.all[1]?.options.element).toBe(element.querySelector('.map-marker-pin'))
      expect(FakeMarker.all[0]?.popup).toBeNull()
    })

    it('should build a text popup from the popup attribute', () => {
      new MapView(mount('<div><span data-bs-lng="1" data-bs-lat="2" data-bs-popup="Vienna"></span></div>'))

      const popup = FakeMarker.all[0]?.popup

      expect(popup?.text).toBe('Vienna')
      expect(popup?.options).toMatchObject({ offset: 16, closeButton: false, focusAfterOpen: true })
      expect(FakeMarker.all[0]?.popupToggled).toBe(0)
    })

    it('should build a popup from a template and open it when asked', () => {
      const element = mount(`
        <div>
          <span data-bs-lng="1" data-bs-lat="2" data-bs-anchor="bottom" data-bs-popup-open="true">
            <template class="map-popup-card" data-bs-close-button="true"><strong>Museum</strong></template>
          </span>
        </div>`)

      new MapView(element)

      const marker = FakeMarker.all[0]

      expect(marker?.popup?.options).toMatchObject({ offset: 40, className: 'map-popup-card', closeButton: true, focusAfterOpen: false })
      expect((marker?.popup?.content as DocumentFragment).querySelector('strong')?.textContent).toBe('Museum')
      expect(marker?.popupToggled).toBe(1)
      expect(element.querySelector('template')).toBeNull()
    })
  })

  describe('controls', () => {
    const actions = (element: HTMLElement): (string | null)[] => [...element.querySelectorAll('.map-controls button')].map((button) => button.getAttribute('data-bs-map-action'))

    it('should add no buttons by default', () => {
      const element = mount('<div></div>')

      new MapView(element)

      expect(element.querySelector('.map-controls')).toBeNull()
    })

    it('should add the zoom buttons as a group', () => {
      const element = mount('<div data-bs-controls="true"></div>')

      new MapView(element)

      expect(actions(element)).toEqual(['zoom-in', 'zoom-out'])
      expect(element.querySelectorAll('.map-controls > .btn-group-vertical > .btn.btn-sm.btn-icon')).toHaveLength(2)
      expect(element.querySelector('[data-bs-map-action="zoom-in"]')?.getAttribute('aria-label')).toBe('Zoom in')
      expect((element.querySelector('.map-controls button') as HTMLButtonElement).type).toBe('button')
    })

    it('should add the buttons named in a list and skip unknown names', () => {
      const element = mount('<div data-bs-controls="zoom, north,locate,fullscreen,unknown"></div>')

      new MapView(element)

      expect(actions(element)).toEqual(['zoom-in', 'zoom-out', 'north', 'locate', 'fullscreen'])
      expect(element.querySelectorAll('.map-controls > .btn')).toHaveLength(3)
    })

    it('should use the labels from the options', () => {
      const element = mount('<div></div>')

      new MapView(element, { controls: 'zoom', labels: { 'zoom-in': 'Przybliż' } })

      expect(element.querySelector('[data-bs-map-action="zoom-in"]')?.getAttribute('aria-label')).toBe('Przybliż')
      expect(element.querySelector('[data-bs-map-action="zoom-out"]')?.getAttribute('aria-label')).toBe('Zoom out')
    })

    it('should run the action of a clicked button on its map', () => {
      const element = mount('<div data-bs-toggle="map" data-bs-controls="zoom,north"></div>')

      new MapView(element)

      for (const action of ['zoom-in', 'zoom-out', 'north']) {
        element.querySelector<HTMLElement>(`[data-bs-map-action="${action}"]`)!.click()
      }

      expect(FakeMap.last.calls).toEqual(['zoomIn', 'zoomOut', 'resetNorthPitch'])
    })

    it('should let a button outside the map point at it', () => {
      fixtureEl.innerHTML = '<div id="target-map" data-bs-toggle="map"></div><button type="button" data-bs-map-action="zoom-in" data-bs-target="#target-map"></button>'
      new MapView(fixtureEl.querySelector<HTMLElement>('#target-map')!)

      fixtureEl.querySelector('button')!.click()

      expect(FakeMap.last.calls).toEqual(['zoomIn'])
    })

    it('should ignore a button with no map', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-map-action="zoom-in"></button>'

      expect(() => fixtureEl.querySelector('button')!.click()).not.toThrow()
    })

    it('should fly to the position of the device, at least at street level', () => {
      const view = new MapView(mount('<div data-bs-zoom="4"></div>'))
      const original = navigator.geolocation.getCurrentPosition.bind(navigator.geolocation)

      navigator.geolocation.getCurrentPosition = (success) => success({ coords: { longitude: 21.01, latitude: 52.23 } } as GeolocationPosition)
      view.locate()
      navigator.geolocation.getCurrentPosition = original

      expect(FakeMap.last.flownTo).toEqual({ center: [21.01, 52.23], zoom: 14 })
    })
  })

  describe('layers', () => {
    it('should add nothing without a route or GeoJSON', () => {
      new MapView(mount('<div></div>'))
      FakeMap.last.fire('style.load')

      expect(FakeMap.last.sources).toEqual({})
      expect(FakeMap.last.addedLayers).toEqual([])
    })

    it('should draw the route as a line each time a style loads', () => {
      new MapView(mount('<div data-bs-route="[[13.3,52.5],[13.4,52.6]]"></div>'))
      FakeMap.last.fire('style.load')

      expect(FakeMap.last.sources['tabler-route']).toEqual({
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [13.3, 52.5],
              [13.4, 52.6],
            ],
          },
        },
      })
      expect(FakeMap.last.addedLayers).toHaveLength(1)
      expect(FakeMap.last.addedLayers[0]).toMatchObject({ id: 'tabler-route', type: 'line', source: 'tabler-route' })

      FakeMap.last.fire('style.load')

      expect(FakeMap.last.addedLayers).toHaveLength(2)
    })

    it('should draw GeoJSON as fill, line and point layers in the layer color', () => {
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 0],
            ],
          ],
        },
      }

      new MapView(mount('<div></div>'), { geojson, layerColor: '#ff0000' })
      FakeMap.last.fire('style.load')

      expect(FakeMap.last.sources['tabler-data']).toEqual({ type: 'geojson', data: geojson })
      expect(FakeMap.last.addedLayers.map((layer) => layer.type)).toEqual(['fill', 'line', 'circle'])
      expect(FakeMap.last.addedLayers[0]?.paint).toMatchObject({ 'fill-color': 'rgb(255, 0, 0)' })
    })

    it('should pass a GeoJSON URL through', () => {
      new MapView(mount('<div data-bs-geojson="/data/zones.geojson"></div>'))
      FakeMap.last.fire('style.load')

      expect(FakeMap.last.sources['tabler-data']?.data).toBe('/data/zones.geojson')
    })
  })

  describe('color', () => {
    it('should turn a custom property into an rgb color', () => {
      document.documentElement.style.setProperty('--test-map-color', 'oklch(54.6% 0.1724 254.2deg)')

      expect(MapView.color('--test-map-color')).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
      expect(MapView.color('#ff0000')).toBe('rgb(255, 0, 0)')

      document.documentElement.style.removeProperty('--test-map-color')
    })
  })

  describe('dispose', () => {
    it('should remove the map, the markers and the theme observer', async () => {
      const view = new MapView(mount('<div><span data-bs-lng="1" data-bs-lat="2"></span></div>'))
      const map = FakeMap.last

      view.dispose()

      expect(map.removed).toBe(true)
      expect(FakeMarker.all[0]?.removed).toBe(true)

      document.documentElement.setAttribute('data-bs-theme', 'dark')
      await Promise.resolve()

      expect(map.styles).toHaveLength(1)
    })
  })

  describe('data api', () => {
    it('should give the same instance for the same element', () => {
      const element = mount('<div data-bs-toggle="map"></div>')

      expect(MapView.getOrCreateInstance(element)).toBe(MapView.getOrCreateInstance(element))
    })
  })
})
