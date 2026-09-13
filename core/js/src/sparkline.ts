/**
 * --------------------------------------------------------------------------
 * Tabler sparkline.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './bootstrap/base-component'
import EventHandler from './bootstrap/dom/event-handler'
import SelectorEngine from './bootstrap/dom/selector-engine'
import type { ComponentConfig as BaseConfig, ElementSelector } from './bootstrap/types'

type SparklineType = 'line' | 'bar' | 'circle'
type SparklineFill = 'none' | 'auto'
type SparklineSpot = 'none' | 'min' | 'max' | 'last'
type SparklineValuesInput = number[] | number | string

type ComponentConfig = {
  type: SparklineType
  values: number[]
  width: number
  height: number
  min: number | null
  max: number | null
  fill: SparklineFill
  spot: SparklineSpot
  pad: number
  barGap: number
  barRadius: number
  label: string | number | boolean | null
}

type ComponentConfigInput = Partial<Omit<ComponentConfig, 'values'>> & {
  values?: SparklineValuesInput
}

/**
 * Constants
 */

const NAME = 'sparkline'
const DATA_KEY = `bs.${NAME}`
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_RENDERED = `rendered${EVENT_KEY}`
const EVENT_UPDATED = `updated${EVENT_KEY}`

const CLASS_NAME_SVG = 'sparkline-svg'
const CLASS_NAME_LABEL = 'sparkline-label'

const SELECTOR_DATA_TOGGLE = `[data-bs-toggle="${NAME}"], [data-tblr-toggle="${NAME}"]`

// Custom properties are declared on `.sparkline` in scss/ui/_sparkline.scss and
// get the `--tblr-` prefix at build time.
const CSS_VAR_PREFIX = '--tblr-sparkline'
const SVG_NS = 'http://www.w3.org/2000/svg'

const Default: ComponentConfig = {
  type: 'line',
  values: [],
  width: 80,
  height: 24,
  min: null,
  max: null,
  fill: 'none',
  spot: 'none',
  pad: 2,
  barGap: 2,
  barRadius: 2,
  label: null,
}

const DefaultType: Record<keyof ComponentConfig, string> = {
  type: 'string',
  values: 'array',
  width: 'number',
  height: 'number',
  min: '(number|null)',
  max: '(number|null)',
  fill: 'string',
  spot: 'string',
  pad: 'number',
  barGap: 'number',
  barRadius: 'number',
  label: '(string|number|boolean|null)',
}

/**
 * Helpers
 */

const svgEl = <K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] => document.createElementNS(SVG_NS, tag)

const setAttr = (el: Element, attrs: Record<string, string | number | null | undefined>): void => {
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== null && value !== undefined) {
      el.setAttribute(key, String(value))
    }
  }
}

const cssVar = (name: string): string => `var(${CSS_VAR_PREFIX}-${name})`

const clampSpan = (min: number, max: number): number => {
  const span = max - min
  return span === 0 ? 1 : span
}

// Accepts "3,4,2" as well as a JSON array literal "[3,4,2]".
const parseNumberList = (input: unknown): number[] => {
  const raw = String(input ?? '').trim()
  if (!raw) {
    return []
  }

  if (raw.startsWith('[')) {
    try {
      const arr = JSON.parse(raw)
      return Array.isArray(arr) ? arr.map(Number).filter(Number.isFinite) : []
    } catch {
      return []
    }
  }

  return raw
    .split(',')
    .map((value) => Number(value.trim()))
    .filter(Number.isFinite)
}

const toValues = (input: unknown): number[] => {
  if (Array.isArray(input)) {
    return input.map(Number).filter(Number.isFinite)
  }

  if (typeof input === 'number') {
    return Number.isFinite(input) ? [input] : []
  }

  return parseNumberList(input)
}

const scaleY = (values: number[], height: number, pad: number, minForced: number | null, maxForced: number | null): number[] => {
  const min = minForced ?? Math.min(...values)
  const max = maxForced ?? Math.max(...values)
  const span = clampSpan(min, max)

  return values.map((value) => pad + (1 - (value - min) / span) * (height - pad * 2))
}

const findIndexByMode = (values: number[], mode: SparklineSpot): number => {
  if (values.length === 0 || mode === 'none') {
    return -1
  }

  if (mode === 'last') {
    return values.length - 1
  }

  let idx = 0
  for (let i = 1; i < values.length; i++) {
    if (mode === 'min' ? values[i] < values[idx] : values[i] > values[idx]) {
      idx = i
    }
  }

  return idx
}

const getCssNumber = (element: Element, name: string, fallback: number): number => {
  const raw = getComputedStyle(element).getPropertyValue(`${CSS_VAR_PREFIX}-${name}`).trim()
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

/**
 * Class definition
 *
 * Tiny inline SVG chart (line, bar or circle) rendered from data attributes:
 *
 *   <span class="sparkline" data-bs-toggle="sparkline" data-bs-type="line" data-bs-values="3,4,2,6,5,8,7"></span>
 *
 * Colours and stroke widths come from the `--tblr-sparkline-*` custom
 * properties, so a text colour utility on the element themes the chart.
 */

class Sparkline extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig
  _userConfig: ComponentConfigInput = {}

  constructor(element: ElementSelector, config?: ComponentConfigInput) {
    super(element, config)

    if (!this._element) {
      return
    }

    // Kept so that render() can re-read the data attributes on top of it.
    this._userConfig = { ...config }
    this.render()
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

  // Public
  update(values: SparklineValuesInput): void {
    const serialized = Array.isArray(values) ? values.join(',') : String(values)
    const attribute = this._element.hasAttribute('data-tblr-values') ? 'data-tblr-values' : 'data-bs-values'
    this._element.setAttribute(attribute, serialized)

    // The attribute is now the source of truth for the values.
    delete this._userConfig.values
    this.render()
    EventHandler.trigger(this._element, EVENT_UPDATED)
  }

  render(): void {
    this._config = this._getConfig(this._userConfig) as ComponentConfig
    this._element.innerHTML = ''

    if (this._config.values.length === 0) {
      return
    }

    let svg: SVGSVGElement
    switch (this._config.type) {
      case 'bar':
        svg = this._renderBars()
        break
      case 'circle':
        svg = this._renderCircle()
        break
      default:
        svg = this._renderLine()
        break
    }

    this._element.append(svg)

    // A text label centered over the chart, mainly for the circle type. Plain
    // HTML rather than SVG text, so it keeps the page font and is not
    // stretched with the viewBox.
    const text = this._labelText()
    if (text !== '') {
      const label = document.createElement('span')
      label.className = CLASS_NAME_LABEL
      label.textContent = text
      this._element.append(label)
    }

    EventHandler.trigger(this._element, EVENT_RENDERED)
  }

  dispose(): void {
    this._element.innerHTML = ''
    super.dispose()
  }

  // Private
  _configAfterMerge(config: BaseConfig): BaseConfig {
    config.values = toValues(config.values)
    return config
  }

  // `auto` (or `true`) derives the label from the data: the share of `max`
  // for a circle, the last value otherwise. Anything else is printed as is.
  _labelText(): string {
    const { label, values, type } = this._config
    if (label === null || label === false || label === '') {
      return ''
    }

    if (label !== 'auto' && label !== true) {
      return String(label)
    }

    if (type === 'circle') {
      return `${Math.round(this._circleRatio() * 100)}%`
    }

    return String(values[values.length - 1])
  }

  // A single value is a share of `max` (default 100); a second value may be
  // passed as the maximum instead: data-bs-values="72,100".
  _circleRatio(): number {
    const cfg = this._config
    const value = cfg.values[0] ?? 0
    const max = cfg.max ?? (cfg.values.length > 1 ? cfg.values[1] : 100)
    const min = cfg.min ?? 0
    return Math.max(0, Math.min(1, (value - min) / clampSpan(min, max)))
  }

  _createSvg(): SVGSVGElement {
    const { width, height } = this._config
    const svg = svgEl('svg')
    setAttr(svg, {
      'viewBox': `0 0 ${width} ${height}`,
      'preserveAspectRatio': 'none',
      'width': width,
      'height': height,
      'class': CLASS_NAME_SVG,
      'aria-hidden': 'true',
    })
    return svg
  }

  _renderLine(): SVGSVGElement {
    const cfg = this._config
    const svg = this._createSvg()

    const ys = scaleY(cfg.values, cfg.height, cfg.pad, cfg.min, cfg.max)
    const step = ys.length > 1 ? cfg.width / (ys.length - 1) : cfg.width

    if (cfg.fill === 'auto') {
      const area = svgEl('path')
      setAttr(area, {
        d: this._areaPath(ys, step, cfg.height),
        fill: cssVar('fill'),
        stroke: 'none',
      })
      svg.append(area)
    }

    const line = svgEl('polyline')
    setAttr(line, {
      'points': ys.map((y, i) => `${i * step},${y}`).join(' '),
      'fill': 'none',
      'stroke': cssVar('stroke'),
      'stroke-width': cssVar('stroke-width'),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    })
    svg.append(line)

    const spotIndex = findIndexByMode(cfg.values, cfg.spot)
    if (spotIndex >= 0) {
      const spot = svgEl('circle')
      setAttr(spot, {
        cx: spotIndex * step,
        cy: ys[spotIndex],
        r: getCssNumber(this._element, 'spot-size', 2),
        fill: cssVar('spot'),
      })
      svg.append(spot)
    }

    return svg
  }

  _areaPath(ys: number[], step: number, height: number): string {
    const top = ys.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${y}`).join(' ')
    const lastX = (ys.length - 1) * step
    return `${top} L ${lastX} ${height} L 0 ${height} Z`
  }

  _renderBars(): SVGSVGElement {
    const cfg = this._config
    const svg = this._createSvg()

    const min = cfg.min ?? Math.min(0, ...cfg.values)
    const max = cfg.max ?? Math.max(0, ...cfg.values)
    const span = clampSpan(min, max)

    const count = cfg.values.length
    const barWidth = (cfg.width - cfg.barGap * (count - 1)) / count
    // Bars grow from the zero line: upwards for positive values, downwards
    // (in the "negative" color) for negative ones. With no negative values the
    // zero line is the bottom edge; otherwise it is drawn as a hairline.
    const zeroY = cfg.height - ((0 - min) / span) * cfg.height

    if (min < 0) {
      const zeroLine = svgEl('line')
      setAttr(zeroLine, {
        'x1': 0,
        'x2': cfg.width,
        'y1': zeroY,
        'y2': zeroY,
        'stroke': cssVar('zero'),
        'stroke-width': 1,
        'vector-effect': 'non-scaling-stroke',
      })
      svg.append(zeroLine)
    }

    cfg.values.forEach((value, i) => {
      const barHeight = (Math.abs(value) / span) * cfg.height
      const bar = svgEl('rect')
      setAttr(bar, {
        x: i * (barWidth + cfg.barGap),
        y: value < 0 ? zeroY : zeroY - barHeight,
        width: barWidth,
        height: barHeight,
        rx: cfg.barRadius,
        fill: cssVar(value < 0 ? 'negative' : 'stroke'),
      })
      svg.append(bar)
    })

    return svg
  }

  _renderCircle(): SVGSVGElement {
    const cfg = this._config
    const svg = this._createSvg()

    const strokeWidth = getCssNumber(this._element, 'stroke-width', 3)
    const radius = Math.max(0, Math.min(cfg.width, cfg.height) / 2 - strokeWidth / 2)
    const cx = cfg.width / 2
    const cy = cfg.height / 2

    const ratio = this._circleRatio()
    const circumference = 2 * Math.PI * radius

    const track = svgEl('circle')
    setAttr(track, {
      'cx': cx,
      'cy': cy,
      'r': radius,
      'fill': 'none',
      'stroke': cssVar('track'),
      'stroke-width': strokeWidth,
    })
    svg.append(track)

    const ring = svgEl('circle')
    setAttr(ring, {
      'cx': cx,
      'cy': cy,
      'r': radius,
      'fill': 'none',
      'stroke': cssVar('stroke'),
      'stroke-width': strokeWidth,
      'stroke-linecap': 'round',
      'stroke-dasharray': circumference,
      'stroke-dashoffset': circumference * (1 - ratio),
      'transform': `rotate(-90 ${cx} ${cy})`,
    })
    svg.append(ring)

    return svg
  }
}

/**
 * Data API implementation
 */

// js-docs-start sparkline-init
for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE)) {
  Sparkline.getOrCreateInstance(element)
}
// js-docs-end sparkline-init

export default Sparkline
