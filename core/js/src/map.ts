/**
 * --------------------------------------------------------------------------
 * Tabler map.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import Manipulator from './bootstrap/dom/manipulator'
import { initAll } from './bootstrap/util/component-functions'
import type { ElementSelector } from './bootstrap/types'

/**
 * Constants
 */

const NAME = 'map'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_LOAD = `load${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="map"], [data-tblr-toggle="map"]'
const SELECTOR_MARKER = ':scope > [data-bs-lng], :scope > [data-tblr-lng]'
const SELECTOR_THEME = '[data-bs-theme]'

const STYLE_URL = 'https://tiles.openfreemap.org/styles/'

const POPUP_OFFSET = 16
const POPUP_OFFSET_PIN = 40

// The public API is typed with local copies of the MapLibre GL JS types.
// `maplibre-gl` is loaded separately as `window.maplibregl`, so the published
// `dist/types` must not import it: a project that never shows a map would
// otherwise fail to type-check.
type LngLat = [number, number]

/** The part of a MapLibre GL JS map the `map` getter promises. Cast it to `Map` from `maplibre-gl` for the full type. */
type MapInstance = {
  on(type: string, listener: () => void): unknown
  loaded(): boolean
  remove(): void
  setStyle(style: string): unknown
  getStyle(): { layers: { id: string }[] }
  setPaintProperty(layer: string, name: string, value: string): unknown
  setProjection(projection: { type: string }): unknown
  addControl(control: unknown): unknown
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
  NavigationControl: new () => unknown
}

type MapTheme = 'auto' | 'light' | 'dark'

type ComponentConfig = {
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
  /** zoom and compass buttons */
  controls: boolean
  /** draws the map as a 3D globe */
  globe: boolean
  /** pass-through for any MapLibre GL JS map option */
  mapOptions: object
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

type PaletteRule = [RegExp, Record<string, string>]

const Default: ComponentConfig = {
  center: [0, 0],
  zoom: 1,
  mapStyle: 'positron',
  mapStyleDark: 'dark',
  mapTheme: 'auto',
  palette: true,
  controls: false,
  globe: false,
  mapOptions: {},
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  center: '(array|string)',
  zoom: 'number',
  mapStyle: 'string',
  mapStyleDark: '(null|string)',
  mapTheme: 'string',
  palette: 'boolean',
  controls: 'boolean',
  globe: 'boolean',
  mapOptions: 'object',
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
 * Wraps MapLibre GL JS (https://maplibre.org), loaded separately as
 * `window.maplibregl`. Without the library the component is inert.
 */

class MapView extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _map: MapInstance | null = null
  _markers: MapMarkerInstance[] = []
  _themeObserver: MutationObserver | null = null

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element || !window.maplibregl) {
      return
    }

    this._initMap(window.maplibregl)
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
  dispose(): void {
    this._themeObserver?.disconnect()
    this._themeObserver = null

    for (const marker of this._markers) {
      marker.remove()
    }

    this._markers = []
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

    // The palette and the projection are part of the style, so they are set
    // again each time a style loads, for example after a theme change.
    map.on('style.load', () => {
      this._applyPalette()

      if (globe) {
        map.setProjection({ type: 'globe' })
      }
    })

    map.on('load', () => {
      EventHandler.trigger(this._element, EVENT_LOAD)
    })

    if (controls) {
      map.addControl(new library.NavigationControl())
    }

    this._markers = markerElements.map((element) => this._createMarker(library, map, element))
    this._setupThemeObserver()
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
// js-docs-end map-init

export default MapView
export type { ComponentConfig as MapConfig, MapInstance, MapLibrary, MapMarkerInstance }
