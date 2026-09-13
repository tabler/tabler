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

type SparklineType = 'line' | 'bar' | 'circle' | 'tristate'
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
  threshold: number | null
  animation: number
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
  threshold: null,
  animation: 300,
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
  threshold: '(number|null)',
  animation: 'number',
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

// The value range a chart is drawn in: forced by `min` / `max`, otherwise the
// data itself, widened to include the threshold (and zero for bars) so those
// lines are always inside the chart.
const rangeOf = (values: number[], minForced: number | null, maxForced: number | null, ...include: number[]): { min: number; max: number; span: number } => {
  const min = minForced ?? Math.min(...values, ...include)
  const max = maxForced ?? Math.max(...values, ...include)
  return { min, max, span: clampSpan(min, max) }
}

const NUMBER_RE = /-?\d*\.?\d+(?:e[-+]?\d+)?/g

// Interpolates the numbers inside two attribute values with the same shape:
// "0,20 40,10" → "0,10 40,20", or a path `d`. Falls back to the target when
// the shapes differ.
const lerpAttr = (from: string, to: string, t: number): string => {
  const a = from.match(NUMBER_RE)
  const b = to.match(NUMBER_RE)
  if (!a || !b || a.length !== b.length || from.replace(NUMBER_RE, '#') !== to.replace(NUMBER_RE, '#')) {
    return to
  }

  let i = 0
  return to.replace(NUMBER_RE, () => {
    const value = Number(a[i]) + (Number(b[i]) - Number(a[i])) * t
    i++
    return String(Math.round(value * 1000) / 1000)
  })
}

const easeOut = (t: number): number => 1 - (1 - t) ** 3

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
  _frame = 0

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
    const previous = this._element.querySelector<SVGSVGElement>('svg')
    this._element.querySelector(`.${CLASS_NAME_LABEL}`)?.remove()

    if (this._config.values.length === 0) {
      this._element.innerHTML = ''
      return
    }

    let svg: SVGSVGElement
    switch (this._config.type) {
      case 'bar':
        svg = this._renderBars()
        break
      case 'tristate':
        svg = this._renderTristate()
        break
      case 'circle':
        svg = this._renderCircle()
        break
      default:
        svg = this._renderLine()
        break
    }

    // On an update with the same shape (type and number of values) the old
    // SVG stays in place and its attributes are tweened to the new ones.
    if (previous && this._canAnimate(previous, svg)) {
      this._animate(previous, svg)
    } else {
      cancelAnimationFrame(this._frame)
      previous?.remove()
      this._element.append(svg)
    }

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
    cancelAnimationFrame(this._frame)
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

  _canAnimate(from: SVGSVGElement, to: SVGSVGElement): boolean {
    if (this._config.animation <= 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false
    }

    if (from.getAttribute('viewBox') !== to.getAttribute('viewBox') || from.children.length !== to.children.length) {
      return false
    }

    return Array.from(from.children).every((child, i) => child.tagName === to.children[i].tagName)
  }

  _animate(from: SVGSVGElement, to: SVGSVGElement): void {
    cancelAnimationFrame(this._frame)

    const pairs = Array.from(to.children).map((target, i) => {
      const source = from.children[i]
      const tweens: [string, string, string][] = []
      for (const { name, value } of Array.from(target.attributes)) {
        const start = source.getAttribute(name)
        if (start === null || start === value) {
          source.setAttribute(name, value)
        } else {
          tweens.push([name, start, value])
        }
      }

      return { source, tweens }
    })

    const duration = this._config.animation
    const started = performance.now()
    const step = (now: number): void => {
      const t = easeOut(Math.min(1, (now - started) / duration))
      for (const { source, tweens } of pairs) {
        for (const [name, start, end] of tweens) {
          source.setAttribute(name, t >= 1 ? end : lerpAttr(start, end, t))
        }
      }

      if (t < 1) {
        this._frame = requestAnimationFrame(step)
      }
    }

    this._frame = requestAnimationFrame(step)
  }

  // A 1px horizontal guide: solid for the zero line, dashed for the threshold.
  _hairline(svg: SVGSVGElement, y: number, color: string, dashed = false): void {
    const line = svgEl('line')
    setAttr(line, {
      'x1': 0,
      'x2': this._config.width,
      'y1': y,
      'y2': y,
      'stroke': cssVar(color),
      'stroke-width': 1,
      'stroke-dasharray': dashed ? '3 2' : null,
      'vector-effect': 'non-scaling-stroke',
    })
    svg.append(line)
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

    const { min, span } = rangeOf(cfg.values, cfg.min, cfg.max, ...(cfg.threshold === null ? [] : [cfg.threshold]))
    const yOf = (value: number): number => cfg.pad + (1 - (value - min) / span) * (cfg.height - cfg.pad * 2)
    const ys = cfg.values.map(yOf)
    const step = ys.length > 1 ? cfg.width / (ys.length - 1) : cfg.width

    if (cfg.threshold !== null) {
      this._hairline(svg, yOf(cfg.threshold), 'threshold', true)
    }

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

    const { min, span } = rangeOf(cfg.values, cfg.min, cfg.max, 0, ...(cfg.threshold === null ? [] : [cfg.threshold]))
    const yOf = (value: number): number => cfg.height - ((value - min) / span) * cfg.height

    const count = cfg.values.length
    const barWidth = (cfg.width - cfg.barGap * (count - 1)) / count
    // Bars grow from the zero line: upwards for positive values, downwards
    // (in the "negative" color) for negative ones. With no negative values the
    // zero line is the bottom edge; otherwise it is drawn as a hairline.
    const zeroY = yOf(0)

    if (min < 0) {
      this._hairline(svg, zeroY, 'zero')
    }

    // With a threshold, the bars below it take the "negative" color instead.
    if (cfg.threshold !== null) {
      this._hairline(svg, yOf(cfg.threshold), 'threshold', true)
    }

    // A bar spans from the zero line to its value, clipped to the chart when a
    // forced `min` / `max` puts part of it (or the zero line) outside.
    const clip = (y: number): number => Math.max(0, Math.min(cfg.height, y))

    cfg.values.forEach((value, i) => {
      const top = clip(yOf(Math.max(value, 0)))
      const bottom = clip(yOf(Math.min(value, 0)))
      const below = cfg.threshold === null ? value < 0 : value < cfg.threshold
      const bar = svgEl('rect')
      setAttr(bar, {
        x: i * (barWidth + cfg.barGap),
        y: top,
        width: barWidth,
        height: bottom - top,
        rx: cfg.barRadius,
        fill: cssVar(below ? 'negative' : 'stroke'),
      })
      svg.append(bar)
    })

    return svg
  }

  // Win/loss: every value is a full bar up (positive), down (negative) or a
  // short tick on the zero line (zero), regardless of its size.
  _renderTristate(): SVGSVGElement {
    const cfg = this._config
    const svg = this._createSvg()

    const count = cfg.values.length
    const barWidth = (cfg.width - cfg.barGap * (count - 1)) / count
    const zeroY = cfg.height / 2
    const tick = Math.min(2, zeroY)

    this._hairline(svg, zeroY, 'zero')

    cfg.values.forEach((value, i) => {
      const bar = svgEl('rect')
      const attrs = value > 0 ? { y: 0, height: zeroY, fill: 'stroke' } : value < 0 ? { y: zeroY, height: zeroY, fill: 'negative' } : { y: zeroY - tick / 2, height: tick, fill: 'track' }
      setAttr(bar, {
        x: i * (barWidth + cfg.barGap),
        y: attrs.y,
        width: barWidth,
        height: attrs.height,
        rx: cfg.barRadius,
        fill: cssVar(attrs.fill),
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
