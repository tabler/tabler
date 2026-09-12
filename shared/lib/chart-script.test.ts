import { describe, expect, it } from 'vitest'
import { chartStyle, chartConfig, type ChartData } from './chart-script'

describe('chartStyle', () => {
  it('emits an id-scoped color custom property per serie', () => {
    const data: ChartData = {
      series: [
        { name: 'A', data: [1, 2], color: 'red' },
        { name: 'B', data: [3] },
      ],
      color: 'green',
    }
    const css = chartStyle({ id: 'demo', data })
    expect(css).toContain('--chart-demo-color-0: color-mix(in srgb, transparent, var(--tblr-red) 100%)')
    expect(css).toContain('--chart-demo-color-1: color-mix(in srgb, transparent, var(--tblr-green) 100%)')
    expect(css.startsWith('<style>')).toBe(true)
  })

  it('fills an area with a wash of each serie color', () => {
    const css = chartStyle({
      id: 'a',
      data: {
        type: 'area',
        series: [
          { name: 'A', data: [1], color: 'green' },
          { name: 'B', data: [2], color: 'pink' },
        ],
      },
    })
    expect(css).toContain('--chart-a-fill-0: color-mix(in srgb, transparent, var(--tblr-green) 16%)')
    expect(css).toContain('--chart-a-fill-1: color-mix(in srgb, transparent, var(--tblr-pink) 16%)')
  })

  it('falls back to the public palette when a serie names no color', () => {
    const css = chartStyle({
      id: 'p',
      data: {
        series: [
          { name: 'A', data: [1] },
          { name: 'B', data: [2] },
          { name: 'C', data: [3] },
        ],
      },
    })
    expect(css).toContain('--chart-p-color-0: color-mix(in srgb, transparent, var(--tblr-chart-1) 100%)')
    expect(css).toContain('--chart-p-color-1: color-mix(in srgb, transparent, var(--tblr-chart-2) 100%)')
    expect(css).toContain('--chart-p-color-2: color-mix(in srgb, transparent, var(--tblr-chart-3) 100%)')
  })

  it('adds box variables for box plots', () => {
    const css = chartStyle({ id: 'b', data: { type: 'boxPlot', series: [{ 'name': 'A', 'color': 'green', 'box-data': [{ x: 'Jan', y: [1, 2, 3, 4, 5] }] }] } })
    expect(css).toContain('--chart-b-box-upper: color-mix(in srgb, transparent, var(--tblr-green) 100%)')
    expect(css).toContain('--chart-b-box-lower: color-mix(in srgb, transparent, var(--tblr-green) 40%)')
  })
})

describe('chartConfig', () => {
  it('builds a config with the chart type and height in px', () => {
    const { config } = chartConfig({ id: 'demo', data: { type: 'line', series: [] }, height: 10 })
    expect(config.chart).toMatchObject({ type: 'line', height: 160 })
  })

  it('renders a polar area from plain numbers and labels, like a pie', () => {
    const { config } = chartConfig({
      id: 'demo',
      data: {
        type: 'polarArea',
        series: [
          { name: 'A', data: 12 },
          { name: 'B', data: 8 },
        ],
      },
      height: 10,
    })
    expect(config.series).toEqual([12, 8])
    expect(config.labels).toEqual(['A', 'B'])
    expect(config.yaxis).toBeUndefined()
  })

  it('turns a bar chart into a funnel', () => {
    const { config } = chartConfig({ id: 'demo', data: { type: 'bar', funnel: true, series: [{ name: 'Pipeline', data: [3, 2, 1] }] }, height: 10 })
    expect(config.plotOptions).toMatchObject({ bar: { isFunnel: true, horizontal: true, distributed: true } })
  })

  it('passes the { x, y } points of the newer chart types straight through', () => {
    const points = [{ x: 'Research', y: [1, 2] }]
    const { config } = chartConfig({ id: 'demo', data: { type: 'rangeBar', series: [{ 'name': 'Roadmap', 'range-data': points }] }, height: 10 })
    expect(config.series).toEqual([{ name: 'Roadmap', data: points }])
  })

  it('builds threshold and marker lines from the annotation shorthand', () => {
    const { config } = chartConfig({
      id: 'demo',
      data: { 'series': [], 'annotations-y': [{ value: 99.9, label: 'SLA 99.9%' }], 'annotations-x': [{ value: 'Apr', color: 'azure' }] },
      height: 10,
    })
    expect(config.annotations).toMatchObject({
      yaxis: [{ y: 99.9, borderColor: 'var(--tblr-red)', label: { text: 'SLA 99.9%' } }],
      xaxis: [{ x: 'Apr', borderColor: 'var(--tblr-azure)' }],
    })
  })

  it('puts the second y axis on the right and binds each axis to its serie', () => {
    const { config } = chartConfig({
      id: 'demo',
      data: {
        'series': [
          { name: 'Revenue', data: [1] },
          { name: 'Orders', data: [2] },
        ],
        'y-axes': [{ 'series-name': 'Revenue' }, { 'series-name': 'Orders', 'opposite': true }],
      },
      height: 10,
    })
    expect(config.yaxis).toMatchObject([
      { seriesName: 'Revenue', opposite: undefined },
      { seriesName: 'Orders', opposite: true },
    ])
  })

  it('points a brush chart at its target and names every chart', () => {
    const { config } = chartConfig({
      id: 'traffic-brush',
      data: { 'series': [], 'brush-target': 'traffic-zoom', 'selection-from': 1, 'selection-to': 2 },
      height: 10,
    })
    expect(config.chart).toMatchObject({
      id: 'traffic-brush',
      brush: { enabled: true, target: 'traffic-zoom' },
      selection: { enabled: true, xaxis: { min: 1, max: 2 } },
    })
  })

  it('returns the x-formatter as a separate expression instead of embedding it', () => {
    const { config, xFormatterExpr } = chartConfig({ id: 'demo', data: { 'series': [], 'x-formatter': 'val + "K"' }, height: 10 })
    expect(xFormatterExpr).toBe('val + "K"')
    expect(JSON.stringify(config)).not.toContain('val + "K"')
  })
})
