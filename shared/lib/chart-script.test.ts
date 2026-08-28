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

  it('adds fill variables for area charts', () => {
    const css = chartStyle({ id: 'a', data: { type: 'area', series: [] } })
    expect(css).toContain('--chart-a-fill-0')
    expect(css).toContain('--chart-a-fill-1')
  })
})

describe('chartConfig', () => {
  it('builds a config with the chart type and height in px', () => {
    const { config } = chartConfig({ id: 'demo', data: { type: 'line', series: [] }, height: 10 })
    expect(config.chart).toMatchObject({ type: 'line', height: 160 })
  })

  it('returns the x-formatter as a separate expression instead of embedding it', () => {
    const { config, xFormatterExpr } = chartConfig({ id: 'demo', data: { 'series': [], 'x-formatter': 'val + "K"' }, height: 10 })
    expect(xFormatterExpr).toBe('val + "K"')
    expect(JSON.stringify(config)).not.toContain('val + "K"')
  })
})
