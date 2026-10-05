/**
 * --------------------------------------------------------------------------
 * Tabler vector-map.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import { initAll } from './bootstrap/util/component-functions'
import type { ComponentConfig as BaseConfig, ElementSelector } from './bootstrap/types'

export type VectorMapRegion = {
  name: string
  /** SVG path data, already projected into the viewBox of the map */
  path: string
  /** Too small for a shape at the scale of the map: `path` is a single point, drawn as a dot */
  point?: boolean
}

export type VectorMapData = {
  width: number
  height: number
  /** How the shapes were projected, to place a point by its coordinates */
  projection: { type: 'miller'; scale: number; translate: number[] }
  /** Regions by their code, for example ISO 3166-1 alpha-2 for countries */
  regions: Record<string, VectorMapRegion>
}

export type VectorMapMarker = {
  /** Shown in the tooltip, and what a line refers to */
  name?: string
  lat: number
  lng: number
}

export type VectorMapLine = {
  /** Names of the two markers the line joins */
  from: string
  to: string
}

/** What the pointer is over when a tooltip is about to show */
export type VectorMapTooltipItem = { type: 'region'; code: string; name: string; value?: number } | { type: 'marker'; name: string }

type VectorMapValues = Record<string, number>
type VectorMapTooltip = boolean | ((item: VectorMapTooltipItem) => string)
type VectorMapLegend = boolean | ((value: number) => string)
type Point = [number, number]
// The part of the map in sight: its top left corner and how many times it is magnified
type View = { x: number; y: number; scale: number }

type ComponentConfig = {
  map: string | VectorMapData
  values: VectorMapValues
  min: number | null
  max: number | null
  colors: string[]
  markers: VectorMapMarker[]
  lines: VectorMapLine[]
  tooltip: VectorMapTooltip
  legend: VectorMapLegend
  zoom: boolean
  zoomMax: number
  zoomOnScroll: boolean
  zoomInLabel: string
  zoomOutLabel: string
  label: string | null
}

type ComponentConfigInput = Partial<ComponentConfig>

/**
 * Constants
 */

const NAME = 'vector-map'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_RENDERED = `rendered${EVENT_KEY}`
const EVENT_UPDATED = `updated${EVENT_KEY}`
const EVENT_POINTERMOVE = `pointermove${EVENT_KEY}`
const EVENT_POINTERLEAVE = `pointerleave${EVENT_KEY}`
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`
const EVENT_POINTERUP = `pointerup${EVENT_KEY}`
const EVENT_POINTERCANCEL = `pointercancel${EVENT_KEY}`
const EVENT_DBLCLICK = `dblclick${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`

const CLASS_NAME_SVG = 'vector-map-svg'
const CLASS_NAME_REGION = 'vector-map-region'
const CLASS_NAME_POINT = 'vector-map-region-point'
const CLASS_NAME_POINT_HALO = 'vector-map-region-point-halo'
const CLASS_NAME_POINT_DOT = 'vector-map-region-point-dot'
const CLASS_NAME_LINE = 'vector-map-line'
const CLASS_NAME_MARKER = 'vector-map-marker'
const CLASS_NAME_MARKER_HALO = 'vector-map-marker-halo'
const CLASS_NAME_MARKER_DOT = 'vector-map-marker-dot'
const CLASS_NAME_TOOLTIP = 'vector-map-tooltip'
const CLASS_NAME_COLORS = 'vector-map-colors'
const CLASS_NAME_LEGEND = 'vector-map-legend'
const CLASS_NAME_LEGEND_LABEL = 'vector-map-legend-label'
const CLASS_NAME_LEGEND_SCALE = 'vector-map-legend-scale'
const CLASS_NAME_LEGEND_STEP = 'vector-map-legend-step'
const CLASS_NAME_ZOOMABLE = 'vector-map-zoomable'
const CLASS_NAME_DRAGGING = 'vector-map-dragging'
const CLASS_NAME_CONTROLS = 'vector-map-controls'
const CLASS_NAME_CONTROL_GROUP = 'btn-group-vertical'
const CLASS_NAME_CONTROL = 'btn btn-sm btn-icon'

const ATTRIBUTE_REGION = 'data-region'
const ATTRIBUTE_VALUE = 'data-value'
const ATTRIBUTE_MARKER = 'data-marker'
const ATTRIBUTE_ACTION = 'data-bs-vector-map-action'

const SELECTOR_TOOLTIP_TARGET = `.${CLASS_NAME_REGION}, .${CLASS_NAME_MARKER}`
const SELECTOR_ACTION = `[${ATTRIBUTE_ACTION}]`

const ACTION_ZOOM_IN = 'zoom-in'
const ACTION_ZOOM_OUT = 'zoom-out'

// One step of a button or a double click
const ZOOM_STEP = 2
const ZOOM_DURATION = 200
// How much one unit of wheel movement magnifies. A pinch on a trackpad comes
// as a wheel event with `ctrlKey` and much smaller numbers.
const WHEEL_SPEED = 0.002
const WHEEL_SPEED_PINCH = 0.01

const ICON_ZOOM_IN = 'M12 5v14M5 12h14'
const ICON_ZOOM_OUT = 'M5 12h14'

// How far a line bends away from the straight one, as a share of its length
const LINE_CURVE = 0.2
const RADIANS = Math.PI / 180

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

// Declared on `.vector-map-region` in scss/ui/_vector-map.scss, where it gets
// the `--tblr-` prefix at build time.
const CSS_VAR_VALUE = '--tblr-vector-map-value'
// The colours of a scale, numbered from 1, and how many of them there are.
// scss/ui/_vector-map.scss mixes them, for at most this many.
const CSS_VAR_COLOR = '--tblr-vector-map-color-'
const CSS_VAR_COLORS = '--tblr-vector-map-colors'
const COLORS_MAX = 5
// Enough slices for the bar of the legend to read as one smooth gradient
const LEGEND_STEPS = 24
const SVG_NS = 'http://www.w3.org/2000/svg'

const Default: ComponentConfig = {
  map: 'world',
  values: {},
  min: null,
  max: null,
  colors: [],
  markers: [],
  lines: [],
  tooltip: true,
  legend: false,
  zoom: false,
  zoomMax: 8,
  zoomOnScroll: true,
  zoomInLabel: 'Zoom in',
  zoomOutLabel: 'Zoom out',
  label: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  map: '(string|object)',
  values: 'object',
  min: '(number|null)',
  max: '(number|null)',
  colors: 'array',
  markers: 'array',
  lines: 'array',
  tooltip: '(boolean|function)',
  legend: '(boolean|function)',
  zoom: 'boolean',
  zoomMax: 'number',
  zoomOnScroll: 'boolean',
  zoomInLabel: 'string',
  zoomOutLabel: 'string',
  label: '(string|null)',
}

/**
 * Helpers
 */

const svgEl = <K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] => document.createElementNS(SVG_NS, tag)

// Keeps the entries that are a real number, so a `null` or a typo in the data
// leaves that region without a value instead of painting it as zero.
const toValues = (input: unknown): VectorMapValues => {
  const values: VectorMapValues = {}
  if (typeof input !== 'object' || input === null) {
    return values
  }

  for (const [code, value] of Object.entries(input)) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      values[code] = value
    }
  }

  return values
}

const isRecord = (input: unknown): input is Record<string, unknown> => typeof input === 'object' && input !== null

// Keeps the markers with real coordinates; one with a typo is left out.
const toMarkers = (input: unknown): VectorMapMarker[] => {
  const markers: VectorMapMarker[] = []
  for (const item of Array.isArray(input) ? (input as unknown[]) : []) {
    if (isRecord(item) && typeof item.lat === 'number' && typeof item.lng === 'number' && Number.isFinite(item.lat) && Number.isFinite(item.lng)) {
      markers.push({ lat: item.lat, lng: item.lng, ...(typeof item.name === 'string' ? { name: item.name } : {}) })
    }
  }

  return markers
}

// A scale needs two colours at least; with one, or none, the map keeps the
// single colour of `--tblr-vector-map-color`.
const toColors = (input: unknown): string[] => {
  const colors = (Array.isArray(input) ? (input as unknown[]) : []).filter((color): color is string => typeof color === 'string' && color.trim() !== '')
  return colors.length < 2 ? [] : colors.slice(0, COLORS_MAX)
}

const toLines = (input: unknown): VectorMapLine[] => {
  const lines: VectorMapLine[] = []
  for (const item of Array.isArray(input) ? (input as unknown[]) : []) {
    if (isRecord(item) && typeof item.from === 'string' && typeof item.to === 'string') {
      lines.push({ from: item.from, to: item.to })
    }
  }

  return lines
}

// The same projection the map file was generated with (.build/generate-maps.ts)
const project = ({ projection }: VectorMapData, lng: number, lat: number): Point => {
  const { scale, translate } = projection
  const y = 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RADIANS))
  return [lng * RADIANS * scale + translate[0], translate[1] - y * scale]
}

const round = (value: number): number => Math.round(value * 10) / 10

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Class definition
 *
 * A map drawn as inline SVG from a map file, with regions shaded by value,
 * markers placed by their coordinates and lines between them:
 *
 *   <div class="vector-map" data-bs-toggle="vector-map" data-bs-map="world" data-bs-values='{"PL": 80, "DE": 45}'></div>
 *
 * The shapes come projected from the map file (`dist/js/maps/world.js`), so
 * only the markers are projected here. Colours and sizes come from the
 * `--tblr-vector-map-*` custom properties.
 *
 * With `data-bs-zoom="true"` the map can be magnified with its buttons, the
 * wheel, a double click or a pinch, and dragged around.
 */

class VectorMap extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _userConfig: ComponentConfigInput = {}
  _map: VectorMapData | null = null
  _tooltip: HTMLElement | null = null
  _view: View = { x: 0, y: 0, scale: 1 }
  _frame = 0
  // Pointers that are down on the map, with where each was last seen
  _pointers = new Map<number, Point>()

  /** Maps added with `addMap()`, by name */
  static maps: Record<string, VectorMapData> = {}

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    // Kept so that render() can re-read the data attributes on top of it.
    this._userConfig = { ...config }
    this.render()

    EventHandler.on(this._element, EVENT_POINTERMOVE, (event: PointerEvent) => {
      this._onPointerMove(event)
    })
    EventHandler.on(this._element, EVENT_POINTERLEAVE, () => {
      this._hideTooltip()
    })
    EventHandler.on(this._element, EVENT_POINTERDOWN, (event: PointerEvent) => {
      this._onPointerDown(event)
    })
    for (const eventName of [EVENT_POINTERUP, EVENT_POINTERCANCEL]) {
      EventHandler.on(this._element, eventName, (event: PointerEvent) => {
        this._onPointerUp(event)
      })
    }

    // `wheel` is not among the native events EventHandler knows, and the
    // listener must not be passive to keep the page from scrolling.
    this._element.addEventListener('wheel', this._onWheel, { passive: false })
    EventHandler.on(this._element, EVENT_DBLCLICK, (event: MouseEvent) => {
      if (this._config.zoom && this._isOnMap(event)) {
        this._zoomBy(ZOOM_STEP, this._toMapPoint(event.clientX, event.clientY), true)
      }
    })
    EventHandler.on(this._element, EVENT_CLICK, SELECTOR_ACTION, (event: Event) => {
      const button = (event.target as Element).closest(SELECTOR_ACTION)
      if (button?.getAttribute(ATTRIBUTE_ACTION) === ACTION_ZOOM_IN) {
        this.zoomIn()
      } else {
        this.zoomOut()
      }
    })
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

  // Static
  static addMap(name: string, data: VectorMapData): void {
    VectorMap.maps[name] = data
  }

  // Public
  render(): void {
    this._config = this._getConfig(this._userConfig) as ComponentConfig
    const map = (this._map = this._getMap())
    const { label } = this._config

    const svg = svgEl('svg')
    svg.setAttribute('class', CLASS_NAME_SVG)
    svg.setAttribute('viewBox', `0 0 ${map.width} ${map.height}`)

    // Without a label the map says nothing to a screen reader, so it is hidden
    // rather than announced as an unnamed image.
    if (label) {
      svg.setAttribute('role', 'img')
      svg.setAttribute('aria-label', label)
    } else {
      svg.setAttribute('aria-hidden', 'true')
    }

    // The points go in after the shapes, so a small country shows on top of
    // the large one around it.
    const regions = Object.entries(map.regions)
    for (const [code, region] of [...regions.filter(([, { point }]) => !point), ...regions.filter(([, { point }]) => point)]) {
      svg.append(region.point ? this._createPoint(code, region) : this._createShape(code, region))
    }

    this._renderMarkers(svg, map)

    cancelAnimationFrame(this._frame)
    this._pointers.clear()
    this._hideTooltip()
    this._getSvg()?.remove()
    this._element.append(svg)
    this._renderControls()
    this._applyColors()
    this._setView({ x: 0, y: 0, scale: 1 })
    this._applyValues()

    EventHandler.trigger(this._element, EVENT_RENDERED)
  }

  update(values: VectorMapValues): void {
    this._userConfig.values = values
    this._config = this._getConfig(this._userConfig) as ComponentConfig
    this._applyValues()

    EventHandler.trigger(this._element, EVENT_UPDATED)
  }

  zoomIn(): void {
    this._zoomBy(ZOOM_STEP, null, true)
  }

  zoomOut(): void {
    this._zoomBy(1 / ZOOM_STEP, null, true)
  }

  // Back to the whole map
  reset(): void {
    this._animateTo({ x: 0, y: 0, scale: 1 })
  }

  dispose(): void {
    cancelAnimationFrame(this._frame)
    this._getSvg()?.remove()
    this._getControls()?.remove()
    this._getLegend()?.remove()
    this._tooltip?.remove()
    this._config.colors = []
    this._applyColors()
    this._element.classList.remove(CLASS_NAME_ZOOMABLE, CLASS_NAME_DRAGGING)
    this._element.removeEventListener('wheel', this._onWheel)
    super.dispose()
  }

  // Private
  _configAfterMerge(config: BaseConfig): BaseConfig {
    config.values = toValues(config.values)
    config.colors = toColors(config.colors)
    config.markers = toMarkers(config.markers)
    config.lines = toLines(config.lines)
    return config
  }

  _getSvg(): SVGSVGElement | null {
    return this._element.querySelector<SVGSVGElement>(`.${CLASS_NAME_SVG}`)
  }

  _getMap(): VectorMapData {
    const { map } = this._config
    if (typeof map !== 'string') {
      return map
    }

    // `tablerVectorMaps` is what a map file loaded with a `<script>` tag fills.
    const data = VectorMap.maps[map] ?? window.tablerVectorMaps?.[map]
    if (!data) {
      throw new TypeError(`${NAME.toUpperCase()}: Map "${map}" is not loaded. Add its file from "dist/js/maps/" or call VectorMap.addMap().`)
    }

    return data
  }

  _createShape(code: string, region: VectorMapRegion): SVGElement {
    const path = svgEl('path')
    path.setAttribute('class', CLASS_NAME_REGION)
    path.setAttribute(ATTRIBUTE_REGION, code)
    path.setAttribute('d', region.path)
    return path
  }

  // A region like any other, so it takes a value and a tooltip. It is drawn
  // the way a marker is: a dot with a ring that sets it apart from the land.
  _createPoint(code: string, region: VectorMapRegion): SVGElement {
    const group = svgEl('g')
    group.setAttribute('class', `${CLASS_NAME_REGION} ${CLASS_NAME_POINT}`)
    group.setAttribute(ATTRIBUTE_REGION, code)

    for (const className of [CLASS_NAME_POINT_HALO, CLASS_NAME_POINT_DOT]) {
      const path = svgEl('path')
      path.setAttribute('class', className)
      path.setAttribute('d', region.path)
      group.append(path)
    }

    return group
  }

  // Lines go in first, so the markers they join sit on top of their ends.
  _renderMarkers(svg: SVGSVGElement, map: VectorMapData): void {
    const { markers, lines } = this._config
    const points = markers.map((marker) => project(map, marker.lng, marker.lat))
    const pointOf = (name: string): Point | undefined => points[markers.findIndex((marker) => marker.name === name)]

    for (const line of lines) {
      const from = pointOf(line.from)
      const to = pointOf(line.to)
      if (!from || !to) {
        continue
      }

      // A curve through a point pushed sideways from the middle of the line
      const controlX = (from[0] + to[0]) / 2 + (to[1] - from[1]) * LINE_CURVE
      const controlY = (from[1] + to[1]) / 2 - (to[0] - from[0]) * LINE_CURVE
      const path = svgEl('path')
      path.setAttribute('class', CLASS_NAME_LINE)
      path.setAttribute('d', `M${round(from[0])} ${round(from[1])}Q${round(controlX)} ${round(controlY)} ${round(to[0])} ${round(to[1])}`)
      svg.append(path)
    }

    for (const [index, marker] of markers.entries()) {
      // A line of no length with round caps is drawn as a dot, and unlike a
      // circle it keeps its size in pixels however large the map is.
      const d = `M${round(points[index][0])} ${round(points[index][1])}h0`
      const group = svgEl('g')
      group.setAttribute('class', CLASS_NAME_MARKER)
      group.setAttribute(ATTRIBUTE_MARKER, marker.name ?? '')

      for (const className of [CLASS_NAME_MARKER_HALO, CLASS_NAME_MARKER_DOT]) {
        const path = svgEl('path')
        path.setAttribute('class', className)
        path.setAttribute('d', d)
        group.append(path)
      }

      svg.append(group)
    }
  }

  _tooltipText(target: Element): string {
    const { tooltip, values } = this._config
    if (!tooltip) {
      return ''
    }

    let item: VectorMapTooltipItem
    const code = target.getAttribute(ATTRIBUTE_REGION)
    if (code === null) {
      item = { type: 'marker', name: target.getAttribute(ATTRIBUTE_MARKER) ?? '' }
    } else {
      const value = values[code]
      item = { type: 'region', code, name: this._map?.regions[code]?.name ?? code, ...(value === undefined ? {} : { value }) }
    }

    if (typeof tooltip === 'function') {
      return tooltip(item)
    }

    return item.type === 'region' && item.value !== undefined ? `${item.name}: ${item.value}` : item.name
  }

  _getControls(): HTMLElement | null {
    return this._element.querySelector<HTMLElement>(`.${CLASS_NAME_CONTROLS}`)
  }

  // The zoom buttons, laid over a corner of the map
  _renderControls(): void {
    const { zoom, zoomInLabel, zoomOutLabel } = this._config
    this._getControls()?.remove()
    this._element.classList.toggle(CLASS_NAME_ZOOMABLE, zoom)

    if (!zoom) {
      return
    }

    const controls = document.createElement('div')
    controls.className = `${CLASS_NAME_CONTROLS} ${CLASS_NAME_CONTROL_GROUP}`

    for (const [action, label, icon] of [
      [ACTION_ZOOM_IN, zoomInLabel, ICON_ZOOM_IN],
      [ACTION_ZOOM_OUT, zoomOutLabel, ICON_ZOOM_OUT],
    ]) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = CLASS_NAME_CONTROL
      button.setAttribute(ATTRIBUTE_ACTION, action)
      button.setAttribute('aria-label', label)

      const svg = svgEl('svg')
      svg.setAttribute('class', 'icon')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('aria-hidden', 'true')
      const path = svgEl('path')
      path.setAttribute('d', icon)
      svg.append(path)
      button.append(svg)
      controls.append(button)
    }

    this._element.append(controls)
  }

  // Shows the given part of the map, kept inside the zoom range and the map
  // itself, so the map can never be dragged out of sight.
  _setView({ x, y, scale }: View): void {
    const svg = this._getSvg()
    if (!this._map || !svg) {
      return
    }

    const { width, height } = this._map
    const max = Math.max(this._config.zoomMax, 1)
    scale = clamp(scale, 1, max)
    const viewWidth = width / scale
    const viewHeight = height / scale
    x = clamp(x, 0, width - viewWidth)
    y = clamp(y, 0, height - viewHeight)

    this._view = { x, y, scale }
    svg.setAttribute('viewBox', `${round(x)} ${round(y)} ${round(viewWidth)} ${round(viewHeight)}`)

    for (const button of this._element.querySelectorAll<HTMLButtonElement>(SELECTOR_ACTION)) {
      button.disabled = button.getAttribute(ATTRIBUTE_ACTION) === ACTION_ZOOM_IN ? scale >= max : scale <= 1
    }
  }

  // Moves to a view over a few frames. The corner and the size of the view
  // change at the same pace, which keeps the point being zoomed at in place.
  _animateTo(target: View): void {
    cancelAnimationFrame(this._frame)

    if (!this._map || reducedMotion()) {
      this._setView(target)
      return
    }

    const { width } = this._map
    const from = this._view
    const start = performance.now()

    const step = (now: number): void => {
      const t = Math.min((now - start) / ZOOM_DURATION, 1)
      const eased = 1 - (1 - t) ** 3
      const viewWidth = width / from.scale + (width / target.scale - width / from.scale) * eased
      this._setView({ x: from.x + (target.x - from.x) * eased, y: from.y + (target.y - from.y) * eased, scale: width / viewWidth })

      if (t < 1) {
        this._frame = requestAnimationFrame(step)
      }
    }

    this._frame = requestAnimationFrame(step)
  }

  // Magnifies by a factor around a point of the map, which stays where it is
  // on the screen. Without a point, around the middle of the view.
  _zoomBy(factor: number, anchor: Point | null = null, animate = false): void {
    if (!this._map) {
      return
    }

    const { width, height } = this._map
    const { x, y, scale } = this._view
    const next = clamp(scale * factor, 1, Math.max(this._config.zoomMax, 1))
    const [anchorX, anchorY] = anchor ?? [x + width / scale / 2, y + height / scale / 2]
    const target = { x: anchorX - ((anchorX - x) * scale) / next, y: anchorY - ((anchorY - y) * scale) / next, scale: next }

    if (animate) {
      this._animateTo(target)
    } else {
      cancelAnimationFrame(this._frame)
      this._setView(target)
    }
  }

  // A point of the screen in the coordinates of the map
  _toMapPoint(clientX: number, clientY: number): Point {
    const matrix = this._getSvg()?.getScreenCTM()
    if (!matrix) {
      return [0, 0]
    }

    const point = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse())
    return [point.x, point.y]
  }

  // Whether an event happened on the drawing, not on a button over it
  _isOnMap(event: Event): boolean {
    return event.target instanceof Element && event.target.closest(`.${CLASS_NAME_SVG}`) !== null
  }

  _onPointerDown(event: PointerEvent): void {
    if (!this._config.zoom || !this._isOnMap(event) || (event.pointerType === 'mouse' && event.button !== 0)) {
      return
    }

    this._pointers.set(event.pointerId, [event.clientX, event.clientY])
    cancelAnimationFrame(this._frame)

    // The map keeps getting the moves of this pointer when it leaves the map.
    // Capturing throws for a pointer the browser does not know, which is what
    // an event made in a script has.
    try {
      this._getSvg()?.setPointerCapture(event.pointerId)
    } catch {
      // The drag still works while the pointer stays over the map
    }
  }

  _onPointerUp(event: PointerEvent): void {
    this._pointers.delete(event.pointerId)
    if (this._pointers.size === 0) {
      this._element.classList.remove(CLASS_NAME_DRAGGING)
    }
  }

  // One pointer drags the map, two pinch it.
  _drag(event: PointerEvent): void {
    const previous = this._pointers.get(event.pointerId)
    const matrix = this._getSvg()?.getScreenCTM()
    if (!previous || !matrix) {
      return
    }

    const current: Point = [event.clientX, event.clientY]
    this._pointers.set(event.pointerId, current)
    this._element.classList.add(CLASS_NAME_DRAGGING)
    this._hideTooltip()

    if (this._pointers.size === 1) {
      // `matrix.a` is how many pixels one unit of the map takes
      const { x, y, scale } = this._view
      this._setView({ x: x - (current[0] - previous[0]) / matrix.a, y: y - (current[1] - previous[1]) / matrix.d, scale })
      return
    }

    const other = [...this._pointers].find(([id]) => id !== event.pointerId)?.[1]
    if (!other) {
      return
    }

    const before = Math.hypot(previous[0] - other[0], previous[1] - other[1])
    const after = Math.hypot(current[0] - other[0], current[1] - other[1])
    if (before > 0 && after > 0) {
      this._zoomBy(after / before, this._toMapPoint((current[0] + other[0]) / 2, (current[1] + other[1]) / 2))
    }
  }

  _onWheel = (event: WheelEvent): void => {
    const { zoom, zoomOnScroll } = this._config
    if (!zoom || !zoomOnScroll || !this._isOnMap(event)) {
      return
    }

    // The page must not scroll while the wheel zooms the map
    event.preventDefault()
    this._hideTooltip()
    const speed = event.ctrlKey ? WHEEL_SPEED_PINCH : WHEEL_SPEED
    this._zoomBy(Math.exp(-event.deltaY * speed), this._toMapPoint(event.clientX, event.clientY))
  }

  _onPointerMove(event: PointerEvent): void {
    if (this._pointers.has(event.pointerId)) {
      this._drag(event)
      return
    }

    const target = event.target instanceof Element ? event.target.closest(SELECTOR_TOOLTIP_TARGET) : null
    const text = target ? this._tooltipText(target) : ''
    if (!text) {
      this._hideTooltip()
      return
    }

    if (!this._tooltip) {
      // For the eye only: the text repeats what the pointer is over
      this._tooltip = document.createElement('div')
      this._tooltip.className = CLASS_NAME_TOOLTIP
      this._tooltip.setAttribute('aria-hidden', 'true')
      this._element.append(this._tooltip)
    }

    const rect = this._element.getBoundingClientRect()
    this._tooltip.textContent = text
    this._tooltip.hidden = false
    this._tooltip.style.left = `${event.clientX - rect.left}px`
    this._tooltip.style.top = `${event.clientY - rect.top}px`
  }

  _hideTooltip(): void {
    if (this._tooltip) {
      this._tooltip.hidden = true
    }
  }

  _getLegend(): HTMLElement | null {
    return this._element.querySelector<HTMLElement>(`.${CLASS_NAME_LEGEND}`)
  }

  // A bar with the colours of the scale between the lowest and the highest
  // value. Every slice of the bar carries a share, like a region does, so the
  // stylesheet colours it with the very rule it colours the map with.
  _renderLegend(min: number, max: number): void {
    const { legend } = this._config
    this._getLegend()?.remove()

    if (!legend || !Number.isFinite(min) || !Number.isFinite(max)) {
      return
    }

    const format = typeof legend === 'function' ? legend : (value: number): string => value.toLocaleString()
    const label = (value: number): HTMLElement => {
      const element = document.createElement('span')
      element.className = CLASS_NAME_LEGEND_LABEL
      element.textContent = format(value)
      return element
    }

    const scale = document.createElement('span')
    scale.className = CLASS_NAME_LEGEND_SCALE
    scale.setAttribute('aria-hidden', 'true')
    for (let index = 0; index < LEGEND_STEPS; index++) {
      const step = document.createElement('span')
      step.className = CLASS_NAME_LEGEND_STEP
      step.style.setProperty(CSS_VAR_VALUE, String(Math.round((index / (LEGEND_STEPS - 1)) * 1000) / 1000))
      scale.append(step)
    }

    const element = document.createElement('div')
    element.className = CLASS_NAME_LEGEND
    element.append(label(min), scale, label(max))
    this._element.append(element)
  }

  // Hands the colours of the scale to the stylesheet, which mixes the colour
  // of every region from them and from its share. Nothing is computed here.
  _applyColors(): void {
    const { colors } = this._config
    const { style } = this._element

    for (let index = 0; index < COLORS_MAX; index++) {
      const color = colors[index]
      if (color === undefined) {
        style.removeProperty(`${CSS_VAR_COLOR}${index + 1}`)
      } else {
        style.setProperty(`${CSS_VAR_COLOR}${index + 1}`, color)
      }
    }

    if (colors.length > 0) {
      style.setProperty(CSS_VAR_COLORS, String(colors.length))
    } else {
      style.removeProperty(CSS_VAR_COLORS)
    }

    this._element.classList.toggle(CLASS_NAME_COLORS, colors.length > 0)
  }

  // Shades every region by where its value sits between `min` and `max`. Only
  // that 0 to 1 ratio is written here; the colour is mixed in CSS.
  _applyValues(): void {
    const { values, min: minForced, max: maxForced } = this._config
    const numbers = Object.values(values)
    const min = minForced ?? Math.min(...numbers)
    const max = maxForced ?? Math.max(...numbers)
    const span = max - min

    this._renderLegend(min, max)

    for (const path of this._element.querySelectorAll<SVGElement>(`.${CLASS_NAME_REGION}`)) {
      const value = values[path.getAttribute(ATTRIBUTE_REGION) ?? '']

      if (value === undefined) {
        path.removeAttribute(ATTRIBUTE_VALUE)
        path.style.removeProperty(CSS_VAR_VALUE)
        continue
      }

      // With a single value, or all of them equal, everything gets the full colour.
      const ratio = span === 0 ? 1 : Math.min(Math.max((value - min) / span, 0), 1)
      path.setAttribute(ATTRIBUTE_VALUE, String(value))
      path.style.setProperty(CSS_VAR_VALUE, String(Math.round(ratio * 1000) / 1000))
    }
  }
}

/**
 * Data API implementation
 */

// A map file may come later in the page than this script, also when both are
// deferred, so the maps are drawn once the document is parsed and not before.
// The `load` listener covers a script added after that point; drawing twice is
// harmless, an element keeps its one instance.
// js-docs-start vector-map-init
const init = (): void => {
  initAll(SELECTOR_DATA_TOGGLE, VectorMap)
}

if (document.readyState === 'complete') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init, { once: true })
  window.addEventListener('load', init, { once: true })
}
// js-docs-end vector-map-init

export default VectorMap
