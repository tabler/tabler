/**
 * --------------------------------------------------------------------------
 * Tabler map.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import Manipulator from './bootstrap/dom/manipulator'
import SelectorEngine from './bootstrap/dom/selector-engine'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

/**
 * Constants
 */

const NAME = 'map'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_LOAD = `load${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}.data-api`

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="map"], [data-tblr-toggle="map"]'
const SELECTOR_MARKER = ':scope > [data-bs-lng], :scope > [data-tblr-lng]'
const SELECTOR_THEME = '[data-bs-theme]'
const SELECTOR_ACTION = '[data-bs-map-action], [data-tblr-map-action]'

const CLASS_NAME_CONTROLS = 'map-controls'
const CLASS_NAME_CONTROL = 'btn btn-sm btn-icon'
const CLASS_NAME_CONTROL_GROUP = 'btn-group-vertical'

const LOCATE_ZOOM = 14

const STYLE_URL = 'https://tiles.openfreemap.org/styles/'

const POPUP_OFFSET = 16
const POPUP_OFFSET_PIN = 40

const SOURCE_DATA = 'tabler-data'
const SOURCE_ROUTE = 'tabler-route'
const SOURCE_ROUTE_REST = 'tabler-route-rest'

// The public API is typed with local copies of the MapLibre GL JS types.
// `maplibre-gl` is loaded separately as `window.maplibregl`, so the published
// `dist/types` must not import it: a project that never shows a map would
// otherwise fail to type-check.
type LngLat = [number, number]

/** The part of a MapLibre GL JS map the `map` getter promises. Cast it to `Map` from `maplibre-gl` for the full type. */
type MapInstance = {
  on(type: string, listener: () => void): unknown
  loaded(): boolean
  isStyleLoaded(): boolean | void
  remove(): void
  setStyle(style: string): unknown
  getStyle(): { layers: { id: string }[] }
  setPaintProperty(layer: string, name: string, value: string): unknown
  setProjection(projection: { type: string }): unknown
  zoomIn(): unknown
  zoomOut(): unknown
  resetNorthPitch(): unknown
  getZoom(): number
  flyTo(options: { center: LngLat; zoom: number }): unknown
  addSource(id: string, source: Record<string, unknown>): unknown
  addLayer(layer: Record<string, unknown>): unknown
}

/** The part of a MapLibre GL JS marker the `markers` getter promises. */
type MapMarkerInstance = {
  setLngLat(lngLat: LngLat): MapMarkerInstance
  setPopup(popup: unknown): MapMarkerInstance
  addTo(map: MapInstance): MapMarkerInstance
  togglePopup(): MapMarkerInstance
  getElement(): HTMLElement
  remove(): void
}

type MapPopupInstance = {
  setDOMContent(node: Node): MapPopupInstance
  setText(text: string): MapPopupInstance
}

type MapLibrary = {
  Map: new (options: Record<string, unknown>) => MapInstance
  Marker: new (options: Record<string, unknown>) => MapMarkerInstance
  Popup: new (options: Record<string, unknown>) => MapPopupInstance
}

type MapAction = 'zoom-in' | 'zoom-out' | 'north' | 'locate' | 'fullscreen'

type MapTheme = 'auto' | 'light' | 'dark'

type ComponentConfig = {
  /**
   * URL of the MapLibre GL JS module, loaded when `window.maplibregl` is not set.
   * A relative URL is resolved against the Tabler script; `null` turns the loading off.
   */
  library: string | null
  /** `[longitude, latitude]`, or the two numbers as a `"13.4,52.5"` string */
  center: LngLat | string
  zoom: number
  /** style URL, or the name of an OpenFreeMap style such as `liberty` */
  mapStyle: string
  /** style used in dark mode; `null` keeps `mapStyle` in both modes */
  mapStyleDark: string | null
  /** `auto` follows the nearest `data-bs-theme` */
  mapTheme: MapTheme
  /** softer colors for the default `positron` and `dark` styles */
  palette: boolean
  /** buttons over the map: `true` for zoom, or a list of `zoom`, `north`, `locate` and `fullscreen` */
  controls: boolean | string
  /** accessible names of the buttons, by action: `zoom-in`, `zoom-out`, `north`, `locate`, `fullscreen` */
  labels: Partial<Record<MapAction, string>>
  /** draws the map as a 3D globe */
  globe: boolean
  /** a path drawn as a line: a list of `[longitude, latitude]` points */
  route: LngLat[] | null
  /** index of the route point reached so far: the path up to it is solid, the rest is dashed */
  routeProgress: number | null
  /** GeoJSON drawn over the map, as an object or the URL of a file: areas, lines and points */
  geojson: object | string | null
  /** color of the route and the GeoJSON shapes: a CSS color or a custom property */
  layerColor: string
  /** pass-through for any MapLibre GL JS map option */
  mapOptions: object
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

type PaletteRule = [RegExp, Record<string, string>]

const Default: ComponentConfig = {
  library: '../libs/maplibre-gl/dist/maplibre-gl.mjs',
  center: [0, 0],
  zoom: 1,
  mapStyle: 'positron',
  mapStyleDark: 'dark',
  mapTheme: 'auto',
  palette: true,
  controls: false,
  labels: {},
  globe: false,
  route: null,
  routeProgress: null,
  geojson: null,
  layerColor: '--tblr-primary',
  mapOptions: {},
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  library: '(null|string)',
  center: '(array|string)',
  zoom: 'number',
  mapStyle: 'string',
  mapStyleDark: '(null|string)',
  mapTheme: 'string',
  palette: 'boolean',
  controls: '(boolean|string)',
  labels: 'object',
  globe: 'boolean',
  route: '(null|array)',
  routeProgress: '(null|number)',
  geojson: '(null|object|string)',
  layerColor: 'string',
  mapOptions: 'object',
}

// The buttons each name in the `controls` option stands for
const Controls: Record<string, MapAction[]> = {
  zoom: ['zoom-in', 'zoom-out'],
  north: ['north'],
  locate: ['locate'],
  fullscreen: ['fullscreen'],
}

const Labels: Record<MapAction, string> = {
  'zoom-in': 'Zoom in',
  'zoom-out': 'Zoom out',
  'north': 'Reset north',
  'locate': 'Show my location',
  'fullscreen': 'Full screen',
}

// Paint values by layer id of the OpenFreeMap `positron` and `dark` styles:
// the first rule that matches a layer is used.
const WHITE_HALO = 'rgba(255, 255, 255, 0.8)'
const BLACK_HALO = 'rgba(0, 0, 0, 0.7)'

const Palette: Record<'light' | 'dark', PaletteRule[]> = {
  light: [
    [/^background$/, { 'background-color': '#fafaf8' }],
    [/^(park|landcover_wood)$/, { 'fill-color': 'rgba(234, 241, 233, 0.6)' }],
    [/^water$/, { 'fill-color': '#d4dadc' }],
    [/^waterway$/, { 'line-color': '#d1dbdf' }],
    [/^(landcover_(ice_shelf|glacier)|road_area_pier)$/, { 'fill-color': '#fafaf8' }],
    [/^landuse_residential$/, { 'fill-color': 'rgba(237, 237, 237, 0.5)' }],
    [/^building$/, { 'fill-color': '#ededed', 'fill-outline-color': '#dfdfdf' }],
    [/^(road_pier|railway.*dashline)$/, { 'line-color': '#fafaf8' }],
    [/^highway_path$/, { 'line-color': '#ededed' }],
    [/^highway_minor$|_subtle$/, { 'line-color': '#e6e6e6' }],
    [/_casing$/, { 'line-color': '#dddddd' }],
    [/^tunnel_.*_inner$/, { 'line-color': '#f3f3f3' }],
    [/^highway_.*_inner$/, { 'line-color': '#ffffff' }],
    [/^railway/, { 'line-color': '#e3e3e3' }],
    [/^boundary_/, { 'line-color': '#e3cdd0' }],
    [/^waterway_line_label$/, { 'text-color': '#7a96a0' }],
    [/^water_name/, { 'text-color': '#abb6be' }],
    [/^highway-name/, { 'text-color': '#9aa5ad', 'text-halo-color': WHITE_HALO }],
    [/^(airport|label_country|label_state)/, { 'text-color': '#8a99a4', 'text-halo-color': WHITE_HALO }],
    [/^label_/, { 'text-color': '#697b89', 'text-halo-color': WHITE_HALO }],
  ],
  dark: [
    [/^background$/, { 'background-color': '#0e0e0e' }],
    [/^water$/, { 'fill-color': '#2c353c' }],
    [/^waterway$/, { 'line-color': 'rgb(63, 90, 109)' }],
    [/^(landcover_(ice_shelf|glacier)|road_area_pier)$/, { 'fill-color': '#0e0e0e' }],
    [/^landuse_residential$/, { 'fill-color': 'rgba(0, 0, 0, 0.5)' }],
    [/^(landcover_wood|landuse_park)$/, { 'fill-color': '#121412' }],
    [/^building$/, { 'fill-color': '#1a1a1a' }],
    [/^(road_pier|railway.*dashline)$/, { 'line-color': '#0e0e0e' }],
    [/^highway_path$|_casing$/, { 'line-color': '#232323' }],
    [/^highway_minor$/, { 'line-color': 'rgba(65, 71, 88, 0.7)' }],
    [/^highway_major_inner$/, { 'line-color': 'rgb(65, 71, 88)' }],
    [/^highway_motorway_inner$/, { 'line-color': 'rgb(83, 86, 102)' }],
    [/_subtle$/, { 'line-color': 'rgba(65, 71, 88, 0.6)' }],
    [/^railway/, { 'line-color': '#262626' }],
    [/^boundary_/, { 'line-color': 'rgb(96, 96, 96)' }],
    [/^water_name$/, { 'text-color': 'rgb(109, 123, 129)', 'text-halo-color': BLACK_HALO }],
    [/^highway_name/, { 'text-color': 'rgb(120, 126, 137)', 'text-halo-color': BLACK_HALO }],
    [/^place_(country|state)/, { 'text-color': 'rgb(118, 126, 137)' }],
    [/^place_/, { 'text-color': 'rgb(204, 208, 228)' }],
  ],
}

/**
 * Class definition
 *
 * Wraps MapLibre GL JS (https://maplibre.org). It uses `window.maplibregl`
 * when a page has loaded the library itself, and otherwise imports the module
 * the `library` option points at, so the map is created a moment later.
 */

class MapView extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _map: MapInstance | null = null
  _markers: MapMarkerInstance[] = []
  _themeObserver: MutationObserver | null = null
  _readyCallbacks: ((map: MapInstance) => void)[] = []
  _styleCallbacks: ((map: MapInstance) => void)[] = []

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    const { library } = this._config

    if (window.maplibregl) {
      this._initMap(window.maplibregl)
    } else if (library) {
      // The specifier is only known at run time, so the bundler must leave this import alone
      import(/* @vite-ignore */ library).then(
        (module: MapLibrary) => {
          // Scripts on the page reach the library the same way as when the page loads it
          window.maplibregl ??= module

          // Disposed while the library was loading
          if (this._element) {
            this._initMap(window.maplibregl)
          }
        },
        () => console.warn(`Tabler map: could not load MapLibre GL JS from "${library}". Set window.maplibregl or the "library" option.`),
      )
    }
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  /** The MapLibre GL JS map, for everything the component does not expose. */
  get map(): MapInstance | null {
    return this._map
  }

  /** The markers created from the child elements, in document order. */
  get markers(): MapMarkerInstance[] {
    return this._markers
  }

  // Static

  /**
   * Turns a CSS color, or a custom property such as `--tblr-primary`, into a
   * plain `rgb()` color. MapLibre draws layers on a canvas, so it accepts
   * neither CSS variables nor the `oklch()` values Tabler colors are written in.
   */
  static color(value: string, element: HTMLElement = document.body): string {
    const context = document.createElement('canvas').getContext('2d')
    const probe = element.appendChild(document.createElement('span'))

    probe.style.color = value.startsWith('--') ? `var(${value})` : value

    const { color } = getComputedStyle(probe)

    probe.remove()

    if (!context) {
      return color
    }

    context.fillStyle = color
    context.fillRect(0, 0, 1, 1)

    const [red, green, blue] = context.getImageData(0, 0, 1, 1).data

    return `rgb(${red}, ${green}, ${blue})`
  }

  // Public

  /** Runs the callback once the MapLibre map exists: right away, or after the library has loaded. */
  ready(callback: (map: MapInstance) => void): void {
    if (this._map) {
      callback(this._map)
    } else {
      this._readyCallbacks.push(callback)
    }
  }

  /**
   * Runs the callback each time a map style loads, and right away if one already has.
   * Layers are part of the style, so this is the place to add them.
   */
  onStyle(callback: (map: MapInstance) => void): void {
    this._styleCallbacks.push(callback)

    if (this._map?.isStyleLoaded()) {
      callback(this._map)
    }
  }

  zoomIn(): void {
    this._map?.zoomIn()
  }

  zoomOut(): void {
    this._map?.zoomOut()
  }

  /** Turns the map back to north up, with no tilt. */
  resetNorth(): void {
    this._map?.resetNorthPitch()
  }

  /** Moves the map to the position of the device. The browser asks for permission first. */
  locate(): void {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      this._map?.flyTo({ center: [coords.longitude, coords.latitude], zoom: Math.max(this._map.getZoom(), LOCATE_ZOOM) })
    })
  }

  toggleFullscreen(): void {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void this._element.requestFullscreen()
    }
  }

  dispose(): void {
    this._themeObserver?.disconnect()
    this._themeObserver = null

    for (const marker of this._markers) {
      marker.remove()
    }

    this._markers = []
    this._readyCallbacks = []
    this._styleCallbacks = []
    this._map?.remove()
    this._map = null

    super.dispose()
  }

  // Private
  _initMap(library: MapLibrary): void {
    const { center, zoom, controls, globe, mapOptions } = this._config
    // The markers are read before MapLibre takes over the element
    const markerElements = [...this._element.querySelectorAll<HTMLElement>(SELECTOR_MARKER)]

    const map = new library.Map({
      container: this._element,
      style: this._getStyle(),
      center: this._parseLngLat(center),
      zoom,
      ...mapOptions,
    })

    this._map = map

    // The palette, the layers and the projection are part of the style, so they
    // are set again each time a style loads, for example after a theme change.
    map.on('style.load', () => {
      this._applyPalette()
      this._addLayers()

      if (globe) {
        map.setProjection({ type: 'globe' })
      }

      for (const callback of this._styleCallbacks) {
        callback(map)
      }
    })

    map.on('load', () => {
      EventHandler.trigger(this._element, EVENT_LOAD)
    })

    if (controls) {
      this._createControls(controls)
    }

    this._markers = markerElements.map((element) => this._createMarker(library, map, element))
    this._setupThemeObserver()

    for (const callback of this._readyCallbacks.splice(0)) {
      callback(map)
    }
  }

  // Tabler buttons over the map. The icons come from the stylesheet, by action.
  _createControls(controls: true | string): void {
    const container = document.createElement('div')

    container.className = CLASS_NAME_CONTROLS

    for (const name of controls === true ? ['zoom'] : controls.split(',')) {
      const buttons = Controls[name.trim()] ?? []
      const group = buttons.length > 1 ? container.appendChild(document.createElement('div')) : container

      if (group !== container) {
        group.className = CLASS_NAME_CONTROL_GROUP
      }

      for (const action of buttons) {
        const button = group.appendChild(document.createElement('button'))

        button.type = 'button'
        button.className = CLASS_NAME_CONTROL
        button.setAttribute('data-bs-map-action', action)
        button.setAttribute('aria-label', this._config.labels[action] ?? Labels[action])
      }
    }

    this._element.append(container)
  }

  _createMarker(library: MapLibrary, map: MapInstance, element: HTMLElement): MapMarkerInstance {
    const { lng, lat, anchor = 'center', draggable = false, popup: popupText, popupOpen = false } = Manipulator.getDataAttributes(element)
    const template = element.querySelector<HTMLTemplateElement>(':scope > template')
    const marker = new library.Marker({ element, anchor, draggable }).setLngLat([Number(lng), Number(lat)])

    // A data attribute is a string, a number or a boolean; anything else is no popup text
    const text = typeof popupText === 'object' ? '' : String(popupText ?? '')

    if (template || text) {
      const popup = new library.Popup({
        offset: anchor === 'bottom' ? POPUP_OFFSET_PIN : POPUP_OFFSET,
        className: template?.className ?? '',
        closeButton: Boolean(template && Manipulator.getDataAttribute(template, 'close-button')),
        maxWidth: 'none',
        // A popup that is open from the start must not move the focus to itself
        focusAfterOpen: !popupOpen,
      })

      if (template) {
        popup.setDOMContent(template.content)
        template.remove()
      } else {
        popup.setText(text)
      }

      marker.setPopup(popup)
    }

    marker.addTo(map)

    if (popupOpen && (template || text)) {
      marker.togglePopup()
    }

    return marker
  }

  _parseLngLat(value: LngLat | string): LngLat {
    const [lng = 0, lat = 0] = (typeof value === 'string' ? value.split(',') : value).map(Number)

    return [lng, lat]
  }

  _isDark(): boolean {
    const { mapTheme } = this._config

    if (mapTheme !== 'auto') {
      return mapTheme === 'dark'
    }

    return this._element.closest(SELECTOR_THEME)?.getAttribute('data-bs-theme') === 'dark'
  }

  _getStyleName(): string {
    const { mapStyle, mapStyleDark } = this._config

    return this._isDark() && mapStyleDark ? mapStyleDark : mapStyle
  }

  _getStyle(): string {
    const style = this._getStyleName()

    // A bare name is an OpenFreeMap style; anything else is a URL
    return /^[\w-]+$/.test(style) ? `${STYLE_URL}${style}` : style
  }

  _applyPalette(): void {
    const style = this._getStyleName()
    const rules = this._config.palette && (style === 'positron' ? Palette.light : style === 'dark' ? Palette.dark : null)

    if (!rules || !this._map) {
      return
    }

    for (const { id } of this._map.getStyle().layers) {
      const rule = rules.find(([pattern]) => pattern.test(id))

      for (const [property, value] of Object.entries(rule?.[1] ?? {})) {
        this._map.setPaintProperty(id, property, value)
      }
    }
  }

  // The `route` and `geojson` options, drawn in the layer color
  _addLayers(): void {
    const { route, routeProgress, geojson, layerColor } = this._config
    const map = this._map

    if (!map || (!route && !geojson)) {
      return
    }

    const color = MapView.color(layerColor, this._element)
    const layout = { 'line-cap': 'round', 'line-join': 'round' }

    if (geojson) {
      map.addSource(SOURCE_DATA, { type: 'geojson', data: geojson })
      map.addLayer({ id: `${SOURCE_DATA}-fill`, type: 'fill', source: SOURCE_DATA, filter: ['==', '$type', 'Polygon'], paint: { 'fill-color': color, 'fill-opacity': 0.16 } })
      map.addLayer({ id: `${SOURCE_DATA}-line`, type: 'line', source: SOURCE_DATA, filter: ['!=', '$type', 'Point'], layout, paint: { 'line-color': color, 'line-width': 2 } })
      map.addLayer({
        id: `${SOURCE_DATA}-point`,
        type: 'circle',
        source: SOURCE_DATA,
        filter: ['==', '$type', 'Point'],
        paint: { 'circle-color': color, 'circle-radius': 5, 'circle-stroke-width': 2, 'circle-stroke-color': MapView.color('--tblr-bg-surface', this._element) },
      })
    }

    if (route) {
      const line = (coordinates: LngLat[]): Record<string, unknown> => ({ type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates } } })
      const reached = routeProgress === null ? route.length : routeProgress + 1

      // The part still ahead is dashed, and added first so the solid part covers its start
      if (reached < route.length) {
        map.addSource(SOURCE_ROUTE_REST, line(route.slice(reached - 1)))
        map.addLayer({ id: SOURCE_ROUTE_REST, type: 'line', source: SOURCE_ROUTE_REST, paint: { 'line-color': color, 'line-width': 3, 'line-opacity': 0.6, 'line-dasharray': [1, 2] } })
      }

      map.addSource(SOURCE_ROUTE, line(route.slice(0, reached)))
      map.addLayer({ id: SOURCE_ROUTE, type: 'line', source: SOURCE_ROUTE, layout, paint: { 'line-color': color, 'line-width': 3, 'line-opacity': routeProgress === null ? 0.8 : 1 } })
    }
  }

  _setupThemeObserver(): void {
    // Watch the root element as well: `data-bs-theme` may be added to it
    // later, for example by the theme switcher.
    const ancestor = this._element.closest(SELECTOR_THEME) ?? document.documentElement

    if (this._config.mapTheme !== 'auto') {
      return
    }

    this._themeObserver = new MutationObserver(() => {
      this._map?.setStyle(this._getStyle())
    })

    this._themeObserver.observe(ancestor, {
      attributes: true,
      attributeFilter: ['data-bs-theme'],
    })
  }
}

/**
 * Data API implementation
 */

// js-docs-start map-init
initAll(SELECTOR_DATA_TOGGLE, MapView)

// A button with `data-bs-map-action` acts on the map it is in, or on the map
// its `data-bs-target` points at.
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_ACTION, function (this: HTMLElement) {
  const element = SelectorEngine.getElementFromSelector(this) ?? this.closest<HTMLElement>(SELECTOR_DATA_TOGGLE)
  const view = element && (MapView.getInstance(element) as MapView | null)
  const actions: Record<string, () => void> = {
    'zoom-in': () => view?.zoomIn(),
    'zoom-out': () => view?.zoomOut(),
    'north': () => view?.resetNorth(),
    'locate': () => view?.locate(),
    'fullscreen': () => view?.toggleFullscreen(),
  }

  actions[this.getAttribute('data-bs-map-action') ?? this.getAttribute('data-tblr-map-action') ?? '']?.()
})
// js-docs-end map-init

export default MapView
export type { ComponentConfig as MapConfig, MapInstance, MapLibrary, MapMarkerInstance }
