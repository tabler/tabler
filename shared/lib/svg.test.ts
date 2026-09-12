import { describe, expect, it } from 'vitest'
import { freeIllustrationSource, iconSvg, iconSourceComment, illustrationSvg } from './svg'

describe('iconSvg', () => {
  it('returns the processed outline svg with a11y attributes and the given classes', () => {
    const svg = iconSvg('chevron-left', { classes: 'icon icon-sm' })
    expect(svg).toContain('<svg ')
    expect(svg).toContain('aria-hidden="true" focusable="false" class="icon icon-sm"')
  })

  it('strips the 24x24 filler path', () => {
    expect(iconSvg('chevron-left')).not.toContain('M0 0h24v24H0z')
  })

  it('defaults to the "icon" class', () => {
    expect(iconSvg('chevron-left')).toContain('class="icon"')
  })

  it('picks the filled variant when requested', () => {
    const outline = iconSvg('heart')
    const filled = iconSvg('heart', { filled: true })
    expect(filled).toBeTruthy()
    expect(filled).not.toBe(outline)
  })

  it('returns undefined for an unknown icon', () => {
    expect(iconSvg('definitely-not-an-icon')).toBeUndefined()
  })
})

describe('iconSourceComment', () => {
  it('links the tabler.io icon page', () => {
    expect(iconSourceComment('heart')).toBe('<!-- Download SVG icon from http://tabler.io/icons/icon/heart -->')
  })
})

describe('freeIllustrationSource', () => {
  it('returns the same svg with and without the ".svg" suffix', () => {
    expect(freeIllustrationSource('boy-girl.svg')).toBe(freeIllustrationSource('boy-girl'))
  })

  it('returns the auto-dark source of a bundled illustration', () => {
    expect(freeIllustrationSource('not-found')).toContain('<svg ')
  })
})

describe('illustrationSvg', () => {
  const source = '<svg width="800" height="600" viewBox="0 0 800 600"><path /></svg>'

  it('injects classes into the svg tag', () => {
    expect(illustrationSvg(source, { classes: 'w-100 h-auto' })).toContain('<svg class="w-100 h-auto" width="800"')
  })

  it('swaps the fixed 800x600 size for a height', () => {
    const svg = illustrationSvg(source, { height: 128 })
    expect(svg).toContain('<svg height="128" viewBox')
    expect(svg).not.toContain('width="800"')
  })

  it('returns the source untouched without options', () => {
    expect(illustrationSvg(source)).toBe(source)
  })
})
