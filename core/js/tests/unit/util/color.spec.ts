import { describe, it, expect } from 'vitest'
import { detectColorFormat, formatColor, hslaToRgba, hsvaToRgba, oklchaToRgba, parseColor, rgbaToHsla, rgbaToHsva, rgbaToOklcha } from '../../../src/util/color'

const blue = { r: 6, g: 111, b: 209, a: 1 }

describe('util/color', () => {
  describe('parseColor', () => {
    it('reads hex in every length', () => {
      expect(parseColor('#066fd1')).toEqual(blue)
      expect(parseColor('#FFF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
      expect(parseColor('#0008')).toEqual({ r: 0, g: 0, b: 0, a: 0.533 })
      expect(parseColor('#066fd180')).toEqual({ ...blue, a: 0.502 })
    })

    it('reads rgb() in legacy and modern syntax', () => {
      expect(parseColor('rgb(6, 111, 209)')).toEqual(blue)
      expect(parseColor('rgba(6, 111, 209, 0.5)')).toEqual({ ...blue, a: 0.5 })
      expect(parseColor('rgb(6 111 209 / 50%)')).toEqual({ ...blue, a: 0.5 })
      expect(parseColor('rgb(100% 0% 0%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    })

    it('reads hsl() with hue units', () => {
      expect(parseColor('hsl(120, 100%, 50%)')).toEqual({ r: 0, g: 255, b: 0, a: 1 })
      expect(parseColor('hsl(0.5turn 100% 50% / 0.25)')).toEqual({ r: 0, g: 255, b: 255, a: 0.25 })
      expect(parseColor('hsla(-120deg, 100%, 50%, 1)')).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    })

    it('reads oklch() as written in the Tabler tokens', () => {
      const parsed = parseColor('oklch(54.6% 0.1724 254.2deg)')!
      expect(Math.abs(parsed.r - blue.r)).toBeLessThanOrEqual(2)
      expect(Math.abs(parsed.g - blue.g)).toBeLessThanOrEqual(2)
      expect(Math.abs(parsed.b - blue.b)).toBeLessThanOrEqual(2)
      expect(parseColor('oklch(0 0 0)')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
      expect(parseColor('oklch(100% 0 0 / 0.5)')).toEqual({ r: 255, g: 255, b: 255, a: 0.5 })
    })

    it('clips an out of gamut oklch() to sRGB', () => {
      const parsed = parseColor('oklch(90% 0.4 140)')!
      expect(parsed.g).toBe(255)
      expect(parsed.r).toBeGreaterThanOrEqual(0)
    })

    it('falls back to the browser for named colours', () => {
      expect(parseColor('red')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColor('transparent')).toEqual({ r: 0, g: 0, b: 0, a: 0 })
      expect(parseColor('black')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    })

    it('rejects what is not a colour', () => {
      expect(parseColor('')).toBeNull()
      expect(parseColor('nope')).toBeNull()
      expect(parseColor('#12345')).toBeNull()
      expect(parseColor('rgb(1 2)')).toBeNull()
      expect(parseColor('var(--tblr-blue)')).toBeNull()
    })
  })

  describe('detectColorFormat', () => {
    it('names the notation', () => {
      expect(detectColorFormat('#fff')).toBe('hex')
      expect(detectColorFormat(' RGBA(1,2,3,1) ')).toBe('rgb')
      expect(detectColorFormat('hsl(1 2% 3%)')).toBe('hsl')
      expect(detectColorFormat('oklch(50% 0.1 20)')).toBe('oklch')
      expect(detectColorFormat('red')).toBeNull()
    })
  })

  describe('formatColor', () => {
    it('writes hex, with alpha only when it is not 1', () => {
      expect(formatColor(blue, 'hex')).toBe('#066fd1')
      expect(formatColor({ ...blue, a: 0.5 }, 'hex')).toBe('#066fd180')
      expect(formatColor({ ...blue, a: 0.5 }, 'hex', false)).toBe('#066fd1')
    })

    it('writes rgb and hsl in modern syntax', () => {
      expect(formatColor(blue, 'rgb')).toBe('rgb(6 111 209)')
      expect(formatColor({ ...blue, a: 0.25 }, 'rgb')).toBe('rgb(6 111 209 / 0.25)')
      expect(formatColor({ r: 0, g: 255, b: 0, a: 1 }, 'hsl')).toBe('hsl(120 100% 50%)')
      expect(formatColor({ r: 0, g: 255, b: 0, a: 0.5 }, 'hsl')).toBe('hsl(120 100% 50% / 0.5)')
    })

    it('writes oklch that parses back to the same colour', () => {
      const written = formatColor(blue, 'oklch')
      expect(written).toMatch(/^oklch\(\d+(\.\d+)?% 0\.\d+ \d+(\.\d+)?\)$/)
      expect(parseColor(written)).toEqual(blue)
      expect(formatColor({ ...blue, a: 0.5 }, 'oklch')).toMatch(/ \/ 0\.5\)$/)
    })
  })

  describe('conversions', () => {
    it('round-trips through HSV', () => {
      const hsva = rgbaToHsva(blue)
      expect(Math.round(hsva.h)).toBe(209)
      expect(hsvaToRgba(hsva)).toEqual(blue)
      expect(rgbaToHsva({ r: 128, g: 128, b: 128, a: 1 })).toEqual({ h: 0, s: 0, v: (128 / 255) * 100, a: 1 })
    })

    it('round-trips through HSL', () => {
      expect(hslaToRgba(rgbaToHsla(blue))).toEqual(blue)
      expect(rgbaToHsla({ r: 255, g: 255, b: 255, a: 1 })).toEqual({ h: 0, s: 0, l: 100, a: 1 })
    })

    it('round-trips through OKLCH', () => {
      for (const color of [blue, { r: 255, g: 0, b: 0, a: 1 }, { r: 0, g: 0, b: 0, a: 1 }, { r: 255, g: 255, b: 255, a: 1 }, { r: 40, g: 200, b: 90, a: 0.3 }]) {
        expect(oklchaToRgba(rgbaToOklcha(color))).toEqual(color)
      }

      expect(rgbaToOklcha({ r: 128, g: 128, b: 128, a: 1 }).c).toBe(0)
    })
  })
})
