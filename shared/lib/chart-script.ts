// ApexCharts helpers: chartStyle() returns plain CSS text (rendered via set:html —
// inert, not executable). chartConfig() returns a JSON-serializable config object,
// rendered by Chart.astro via <script define:vars>.

type Serie = {
  'name'?: string
  /** overrides the chart type for this one serie — how a combination chart is built */
  'type'?: string
  'data'?: number[] | number
  'color'?: string
  'color-opacity'?: string
  'candlestick-data'?: { x: number; y: number[] }[]
  /** one row of a heatmap: { x: category label, y: intensity value } per cell */
  'heatmap-data'?: { x: string; y: number }[]
  /** one cell of a treemap: { x: label, y: value } — the value drives the cell size */
  'treemap-data'?: { x: string; y: number }[]
  /** one row of a rangeBar (timeline): { x: row label, y: [start, end] } */
  'range-data'?: { x: string; y: number[] }[]
  /** one box of a boxPlot: { x: category, y: [min, q1, median, q3, max] } */
  'box-data'?: { x: string; y: number[] }[]
  /** one point of a bubble chart — z is the bubble size */
  'bubble-data'?: { x: number; y: number; z: number }[]
}

export type ChartData = {
  'type'?: string
  'height'?: number
  'extend'?: string
  'series'?: Serie[]
  'categories'?: Array<string | number>
  'datetime'?: boolean
  'sparkline'?: boolean
  'stacked'?: boolean
  'animations'?: boolean
  'toolbar'?: boolean
  'horizontal'?: boolean
  'funnel'?: boolean
  'legend'?: boolean
  'title'?: string
  'color'?: string
  'colors'?: string[]
  'datalabels'?: boolean
  'fill-type'?: string
  'fill-gradient-shade'?: string
  'fill-gradient-type'?: string
  'fill-gradient-shade-intensity'?: number
  'fill-gradient-to-color'?: string
  'fill-gradient-inverse-colors'?: boolean
  'fill-gradient-opacity-from'?: number
  'fill-gradient-opacity-to'?: number
  'fill-gradient-stops'?: number[]
  'radial-start-angle'?: number
  'radial-end-angle'?: number
  'radial-hollow-margin'?: number
  'radial-hollow-size'?: string
  'radial-labels-show'?: boolean
  /** radar radius in px; ApexCharts picks one from the box when absent, leaving wide margins in a tall box */
  'radar-size'?: number
  'radial-name-show'?: boolean
  'radial-name-offset-y'?: number
  'radial-name-font-size'?: string
  'radial-name-color'?: string
  'radial-value-offset-y'?: number
  'radial-value-font-size'?: string
  'radial-value-font-weight'?: number
  'stroke-linecap'?: string
  'stroke-width'?: number[]
  'stroke-dash'?: number[]
  'stroke-curve'?: string
  'hide-grid'?: boolean
  'show-x'?: boolean
  'x-formatter'?: string
  'y-max'?: number
  'y-title'?: string
  'y-tooltip'?: boolean
  'show-data-labels'?: boolean
  'hide-tooltip'?: boolean
  'hide-points'?: boolean
  'show-markers'?: boolean
  'start-date'?: string
  /** horizontal threshold lines: a target, a limit, an SLA */
  'annotations-y'?: Annotation[]
  /** vertical marker lines: a release, a campaign start */
  'annotations-x'?: Annotation[]
  /** one entry per y axis — two of them put a second scale on the right */
  'y-axes'?: YAxis[]
  /** charts sharing a group name sync their tooltip and zoom */
  'group'?: string
  /** renders this chart as the range selector of the chart with that id */
  'brush-target'?: string
  'selection-from'?: number
  'selection-to'?: number
  [key: string]: unknown
}

type Annotation = {
  value: number | string
  label?: string
  color?: string
  dash?: number
}

type YAxis = {
  'series-name'?: string
  'title'?: string
  'opposite'?: boolean
  'min'?: number
  'max'?: number
}

/** One threshold or marker line, styled the same on either axis. */
function annotationOptions(annotation: Annotation, axis: 'x' | 'y') {
  const color = `var(--tblr-${annotation.color ?? 'red'})`
  return {
    [axis]: annotation.value,
    strokeDashArray: annotation.dash ?? 4,
    borderColor: color,
    label: annotation.label
      ? {
          text: annotation.label,
          borderWidth: 0,
          position: axis === 'y' ? 'left' : 'top',
          textAnchor: axis === 'y' ? 'start' : 'middle',
          offsetX: axis === 'y' ? 8 : 0,
          style: { background: color, color: 'var(--tblr-white)', fontSize: '11px', fontFamily: 'inherit' },
        }
      : undefined,
  }
}

/** The points of a serie: plain numbers, or the { x, y } shape a given chart type needs. */
function serieData(serie: Serie) {
  return serie['candlestick-data'] ?? serie['heatmap-data'] ?? serie['treemap-data'] ?? serie['range-data'] ?? serie['box-data'] ?? serie['bubble-data'] ?? (serie.data as number[])
}

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Consecutive days from start-date (YYYY-MM-DD). */
function datetimeLabels(startDate: string, count: number): string[] {
  const start = new Date(`${startDate}T00:00:00Z`)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start.getTime() + i * 86400_000)
    return d.toISOString().slice(0, 10)
  })
}

/** The :root custom-property block (chart series colors, area fill gradient). */
export function chartStyle(opts: { id: string; data: ChartData }): string {
  const { id, data } = opts
  const type = data.type ?? 'bar'
  const series = data.series ?? []

  let css = ''
  for (const [i, serie] of series.entries()) {
    const color = serie.color ?? data.color
    // With no color named in the data, the serie takes the next slot of the public
    // palette (--tblr-chart-1 … --tblr-chart-5), which an app can override in one place.
    const base = color ? `var(--tblr-${color})` : `var(--tblr-chart-${(i % 5) + 1})`
    const opacity = serie['color-opacity'] ?? '100%'
    css += `    --chart-${id}-color-${i}: color-mix(in srgb, transparent, ${base} ${opacity});\n`
    // An area is filled with a wash of its own line color.
    if (type === 'area') css += `    --chart-${id}-fill-${i}: color-mix(in srgb, transparent, ${base} 16%);\n`
  }
  if (type === 'boxPlot') {
    // The box is drawn in two halves — median..Q3 above, Q1..median below.
    const color = series[0]?.color ?? data.color ?? 'primary'
    css += `    --chart-${id}-box-upper: color-mix(in srgb, transparent, var(--tblr-${color}) 100%);\n`
    css += `    --chart-${id}-box-lower: color-mix(in srgb, transparent, var(--tblr-${color}) 40%);\n`
  }
  return `<style>\n  :root {\n${css}  }\n</style>`
}

/**
 * The ApexCharts config, as a real JSON-serializable object (rendered via
 * <script define:vars> — no string-built script). The one exception is
 * `x-formatter`: a handful of charts.json entries carry a raw JS expression for
 * the x-axis label formatter (e.g. `val + "K"`), which can't be represented as
 * data. It comes back as `xFormatterExpr` instead of being embedded in `config`,
 * for the caller to turn into a real function with `new Function` — see
 * Chart.astro. This is data-driven (from our own charts.json, not user input),
 * same trust level as everything else here.
 */
export function chartConfig(opts: { id: string; data: ChartData; height: number }): { config: Record<string, unknown>; xFormatterExpr?: string | undefined } {
  const { id, data, height } = opts
  const type = data.type ?? 'bar'
  const series = data.series ?? []
  const isRound = type === 'pie' || type === 'donut' || type === 'radialBar' || type === 'polarArea'

  const config: Record<string, unknown> = {}

  config.chart = {
    // Named so other charts can point at it — a brush needs its target's id, and
    // `ApexCharts.exec(id, ...)` reaches the chart from anywhere on the page.
    id,
    type,
    fontFamily: 'inherit',
    height: height * 16,
    ...(data.sparkline ? { sparkline: { enabled: true } } : { parentHeightOffset: 0, toolbar: { show: Boolean(data.toolbar) } }),
    animations: data.animations ? undefined : { enabled: false },
    stacked: data.stacked ? true : undefined,
    group: data.group,
    brush: data['brush-target'] ? { enabled: true, target: data['brush-target'] } : undefined,
    selection: data['brush-target']
      ? {
          enabled: true,
          xaxis: { min: data['selection-from'], max: data['selection-to'] },
          fill: { color: 'var(--tblr-primary)', opacity: 0.16 },
          stroke: { color: 'var(--tblr-primary)', width: 1, opacity: 1, dashArray: 0 },
        }
      : undefined,
  }

  if (type === 'bar' || type === 'rangeBar') {
    config.plotOptions = {
      bar: data.funnel
        ? // A funnel is a horizontal bar with `isFunnel` on. Every stage is one point of a
          // single serie, so its color comes from the per-point `colors` array in charts.json.
          { horizontal: true, barHeight: '80%', isFunnel: true, isFunnel3d: false, distributed: true }
        : data.horizontal
          ? { barHeight: '50%', horizontal: true }
          : { columnWidth: '50%' },
    }
  }

  if (type === 'radialBar') {
    config.plotOptions = {
      radialBar: {
        startAngle: data['radial-start-angle'] ?? -120,
        endAngle: data['radial-end-angle'] ?? 120,
        hollow: {
          margin: data['radial-hollow-margin'] ?? 16,
          size: data['radial-hollow-size'] ?? '50%',
        },
        dataLabels: {
          show: data['radial-labels-show'] !== false,
          name: {
            show: Boolean(data['radial-name-show']),
            offsetY: data['radial-name-offset-y'] ?? 0,
            fontSize: data['radial-name-font-size'] ?? '16px',
            color: data['radial-name-color'] ?? 'inherit',
          },
          value: {
            offsetY: data['radial-value-offset-y'] ?? -8,
            fontSize: data['radial-value-font-size'] ?? '24px',
            fontWeight: data['radial-value-font-weight'] ?? 600,
          },
        },
      },
    }
  }

  if (type === 'bar' || type === 'area') {
    config.dataLabels = { enabled: Boolean(data.datalabels) }
  }

  if (type === 'heatmap') {
    // Rounded cells + a hairline gap read less like a spreadsheet, more like
    // a deliberate "contribution graph" grid. Single-hue intensity shading
    // (light -> the series color) is ApexCharts' own default once `colors`
    // is set below, so no colorScale.ranges override is needed here.
    config.plotOptions = { heatmap: { radius: 3 } }
    config.dataLabels = { enabled: false }
  }

  if (type === 'treemap') {
    // Same single-hue shading as the heatmap: a cell gets lighter as its value drops.
    config.plotOptions = { treemap: { distributed: false, enableShades: true, shadeIntensity: 0.4 } }
    config.dataLabels = { enabled: true }
  }

  if (type === 'radar') {
    config.plotOptions = {
      radar: {
        size: data['radar-size'],
        polygons: {
          // The rings are the one piece of chrome the --apx-grid token does not reach.
          strokeColors: 'var(--apx-grid)',
          connectorColors: 'var(--apx-grid)',
          fill: { colors: ['transparent', 'transparent'] },
        },
      },
    }
    config.markers = { size: 3 }
  }

  if (type === 'polarArea') {
    config.plotOptions = {
      polarArea: {
        rings: { strokeColor: 'var(--apx-grid)' },
        spokes: { connectorColors: 'var(--apx-grid)' },
      },
    }
  }

  if (type === 'boxPlot') {
    config.plotOptions = {
      boxPlot: { colors: { upper: `var(--chart-${id}-box-upper)`, lower: `var(--chart-${id}-box-lower)` } },
    }
    // Whiskers and box outlines: the ApexCharts default (#24292e) vanishes on a dark
    // background, while the border color is too faint to read on a light one.
    config.stroke = { colors: ['var(--tblr-secondary)'] }
  }

  if (type === 'bubble') {
    config.fill = { opacity: 0.8 }
    config.dataLabels = { enabled: false }
  }

  if (data['fill-type']) {
    config.fill = {
      type: data['fill-type'],
      gradient:
        data['fill-type'] === 'gradient'
          ? {
              shade: data['fill-gradient-shade'] ?? 'light',
              type: data['fill-gradient-type'] ?? 'horizontal',
              shadeIntensity: data['fill-gradient-shade-intensity'] ?? 0.5,
              gradientToColors: [data['fill-gradient-to-color'] ?? '#9ec2fb'],
              inverseColors: Boolean(data['fill-gradient-inverse-colors']),
              opacityFrom: data['fill-gradient-opacity-from'] ?? 1,
              opacityTo: data['fill-gradient-opacity-to'] ?? 1,
              stops: data['fill-gradient-stops'] ?? [0, 100],
            }
          : undefined,
    }
  } else if (type === 'area') {
    config.fill = {
      colors: series.map((_, i) => `var(--chart-${id}-fill-${i})`),
      type: 'solid',
    }
  } else if (type === 'radar') {
    config.fill = { opacity: 0.15 }
  }

  if (data.title) {
    config.title = {
      text: escapeHtml(data.title),
      margin: 0,
      floating: true,
      offsetX: 10,
      style: { fontSize: '18px' },
    }
  }

  if (type === 'radialBar' && data['stroke-linecap']) {
    config.stroke = { lineCap: data['stroke-linecap'] }
  } else if (type === 'area' || type === 'line') {
    config.stroke = {
      width: data['stroke-width'] ?? 2,
      dashArray: data['stroke-dash'],
      lineCap: 'round',
      curve: data['stroke-curve'] ?? 'smooth',
    }
  }

  if (series.length > 0) {
    if (isRound) {
      config.series = series.map((s) => s.data)
      config.labels = series.map((s) => s.name ?? '')
    } else {
      config.series = series.map((s) => ({
        name: s.name ?? '',
        type: s.type,
        data: serieData(s),
      }))
    }
  }

  if (data['annotations-x'] || data['annotations-y']) {
    config.annotations = {
      xaxis: data['annotations-x']?.map((annotation) => annotationOptions(annotation, 'x')),
      yaxis: data['annotations-y']?.map((annotation) => annotationOptions(annotation, 'y')),
    }
  }

  // No `theme` here on purpose: the tooltip is styled in core/scss/vendor/_apexcharts.scss
  // so it follows the color mode, while ApexCharts' own dark theme would paint its title
  // row in a light color on top of that.

  // The negative padding pulls a cartesian plot flush to the edges of its card. Radial
  // and block layouts draw their labels outside the plot, so they keep the default room.
  const looseLayout = type === 'radar' || type === 'polarArea' || type === 'treemap' || Boolean(data.funnel) || Boolean(data['y-axes'])

  config.grid = {
    padding: data.sparkline || looseLayout ? undefined : { top: -20, right: 0, left: -4, bottom: -4 },
    show: data['hide-grid'] ? false : undefined,
    strokeDashArray: data['hide-grid'] ? undefined : 4,
    xaxis: !data['hide-grid'] && data['show-x'] ? { lines: { show: true } } : undefined,
  }

  if (data['show-data-labels']) {
    // Reassign dataLabels (shadows earlier config) — plain assignment, not a merge.
    config.dataLabels = { enabled: true }
  }

  if (data.categories || data.datetime || type === 'heatmap' || type === 'bubble' || type === 'boxPlot' || type === 'rangeBar') {
    config.xaxis = {
      labels: { padding: 0 },
      tooltip: { enabled: false },
      axisBorder: type === 'area' || type === 'bar' ? { show: false } : undefined,
      categories: data.categories?.map(String),
      type: data.datetime ? 'datetime' : undefined,
    }
  }

  if (type === 'radar') {
    // The radar's value rings label themselves right across the plot — noise at card size.
    config.yaxis = { show: false }
  } else if (data['y-axes']) {
    // Two scales in one plot: each axis binds to a serie by name, and the second one
    // sits on the right. Without `seriesName` ApexCharts draws one axis per serie.
    config.yaxis = data['y-axes'].map((axis) => ({
      seriesName: axis['series-name'],
      opposite: axis.opposite,
      min: axis.min,
      max: axis.max,
      // Nudged left of the value labels, which ApexCharts lets the title overlap by a few
      // pixels. Its default title color is the same light-mode-only gray as the labels.
      title: axis.title ? { text: escapeHtml(axis.title), offsetX: axis.opposite ? 8 : -8, style: { fontSize: '11px', fontWeight: 500, fontFamily: 'inherit' } } : undefined,
      labels: { padding: 4 },
    }))
  } else if (!isRound) {
    config.yaxis = {
      labels: { padding: 4 },
      max: data['y-max'],
      title: data['y-title'] ? { text: escapeHtml(data['y-title']), style: { fontSize: '11px', fontWeight: 500, fontFamily: 'inherit' } } : undefined,
      tooltip: data['y-tooltip'] ? { enabled: true } : undefined,
    }
  }

  if (data.datetime) {
    const count = Array.isArray(series[0]?.data) ? (series[0].data as number[]).length : 0
    config.labels = datetimeLabels(data['start-date'] ?? '2020-06-20', count)
  }

  if (data.colors) {
    config.colors = data.colors
  } else if (series.length > 0) {
    config.colors = series.map((_, i) => `var(--chart-${id}-color-${i})`)
  }

  config.legend = data.legend
    ? {
        show: true,
        position: 'bottom',
        offsetY: 12,
        markers: { width: 10, height: 10, radius: 100 },
        itemMargin: { horizontal: 8, vertical: 8 },
      }
    : { show: false }

  if (data['hide-tooltip'] || type === 'pie' || type === 'donut') {
    // Same reassignment-not-merge behavior as dataLabels above — earlier `theme: 'dark'` is intentionally dropped.
    config.tooltip = {
      enabled: data['hide-tooltip'] ? false : undefined,
      fillSeriesColor: type === 'pie' || type === 'donut' ? false : undefined,
    }
  }

  if (data['hide-points']) {
    config.point = { show: false }
  }

  if (data['show-markers']) {
    config.markers = { size: 2 }
  }

  return { config, xFormatterExpr: data['x-formatter'] }
}
