/**
 * --------------------------------------------------------------------------
 * Tabler util/color.ts
 * Licensed under MIT (https://github.com/tabler/tabler/blob/dev/LICENSE)
 * --------------------------------------------------------------------------
 */

/** sRGB channels 0-255, alpha 0-1 */
export type RGBA = { r: number; g: number; b: number; a: number }

/** hue 0-360, saturation and value 0-100, alpha 0-1 */
export type HSVA = { h: number; s: number; v: number; a: number }

/** hue 0-360, saturation and lightness 0-100, alpha 0-1 */
export type HSLA = { h: number; s: number; l: number; a: number }

/** lightness 0-100, chroma 0-0.4, hue 0-360, alpha 0-1 */
export type OKLCHA = { l: number; c: number; h: number; a: number }

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch'

const HEX_PATTERN = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i
// No `\s*` around the arguments: it would overlap with `[^)]*` and let a long
// run of spaces backtrack; the arguments are trimmed by `splitArguments` instead
const FUNCTION_PATTERN = /^(rgba?|hsla?|oklch)\(([^)]*)\)$/i

const NUMBER_PATTERN = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

/** `parseFloat` reads `255oops` as 255; a token counts only when all of it is a number. */
const toNumber = (token: string): number => (NUMBER_PATTERN.test(token) ? Number.parseFloat(token) : Number.NaN)

const round = (value: number, decimals = 0): number => {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

/** Reads one `rgb()` / `hsl()` / `oklch()` argument, scaling a percentage to `scale` and a bare number to itself. */
const channel = (token: string, scale: number, max: number): number | null => {
  if (token === 'none') {
    return 0
  }

  const percent = token.endsWith('%')
  const number = toNumber(percent ? token.slice(0, -1) : token)
  if (Number.isNaN(number)) {
    return null
  }

  return clamp(percent ? (number / 100) * scale : number, 0, max)
}

const hue = (token: string): number | null => {
  if (token === 'none') {
    return 0
  }

  const match = /^([^a-z]+)(deg|grad|rad|turn)?$/i.exec(token)
  const number = match ? toNumber(match[1]!) : Number.NaN
  if (!match || Number.isNaN(number)) {
    return null
  }

  const factor = { deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 }[(match[2] ?? 'deg').toLowerCase() as 'deg' | 'grad' | 'rad' | 'turn']

  return (((number * factor) % 360) + 360) % 360
}

const alphaChannel = (token: string | undefined): number | null => {
  if (token === undefined || token === '') {
    return 1
  }

  return channel(token, 1, 1)
}

/** Splits `r, g, b, a`, `r g b / a` and `r g b` into channel tokens and an alpha token. */
const splitArguments = (body: string): [string[], string | undefined] | null => {
  const [channels, alpha] = body.split('/').map((part) => part.trim())
  const tokens = channels!
    .split(/[\s,]+/)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)

  if (tokens.length === 4 && alpha === undefined) {
    return [tokens.slice(0, 3), tokens[3]]
  }

  if (tokens.length !== 3) {
    return null
  }

  return [tokens, alpha?.toLowerCase()]
}

const parseHex = (hex: string): RGBA => {
  let digits = hex.slice(1)
  if (digits.length < 6) {
    digits = [...digits].map((digit) => digit + digit).join('')
  }

  const value = Number.parseInt(digits.slice(0, 6), 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
    a: digits.length === 8 ? round(Number.parseInt(digits.slice(6), 16) / 255, 3) : 1,
  }
}

let canvasContext: CanvasRenderingContext2D | null | undefined

/**
 * Lets the browser read what the parser above does not know: named colours,
 * `color()`, `lab()`, ... A colour it rejects leaves the fill style untouched.
 */
const parseWithCanvas = (value: string): RGBA | null => {
  if (canvasContext === undefined) {
    canvasContext = typeof document === 'undefined' ? null : document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  }

  if (!canvasContext) {
    return null
  }

  // A rejected value leaves the previous fill in place, so the read-back is
  // trusted only once it differs from the probe; black and white each match
  // one probe, no colour matches both.
  for (const probe of ['#000000', '#ffffff']) {
    canvasContext.fillStyle = probe
    canvasContext.fillStyle = value
    const result = String(canvasContext.fillStyle)

    if (result !== probe) {
      return HEX_PATTERN.test(result) ? parseHex(result) : parseFunction(result)
    }
  }

  return null
}

const parseFunction = (value: string): RGBA | null => {
  const match = FUNCTION_PATTERN.exec(value)
  if (!match) {
    return null
  }

  const split = splitArguments(match[2]!)
  if (!split) {
    return null
  }

  const [tokens, alphaToken] = split
  const a = alphaChannel(alphaToken)
  if (a === null) {
    return null
  }

  const name = match[1]!.toLowerCase()

  if (name.startsWith('rgb')) {
    const r = channel(tokens[0]!, 255, 255)
    const g = channel(tokens[1]!, 255, 255)
    const b = channel(tokens[2]!, 255, 255)
    return r === null || g === null || b === null ? null : { r: round(r), g: round(g), b: round(b), a }
  }

  if (name.startsWith('hsl')) {
    const h = hue(tokens[0]!)
    const s = channel(tokens[1]!, 100, 100)
    const l = channel(tokens[2]!, 100, 100)
    return h === null || s === null || l === null ? null : hslaToRgba({ h, s, l, a })
  }

  const l = channel(tokens[0]!, 100, 100)
  const c = channel(tokens[1]!, 0.4, 0.5)
  const h = hue(tokens[2]!)
  // A bare lightness in `oklch()` is 0-1, a percentage is 0-100
  return l === null || c === null || h === null ? null : oklchaToRgba({ l: tokens[0]!.endsWith('%') ? l : l * 100, c, h, a })
}

/**
 * Reads any CSS colour into sRGB. Returns `null` when the string is not a colour.
 */
export const parseColor = (value: string): RGBA | null => {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  if (HEX_PATTERN.test(trimmed)) {
    return parseHex(trimmed)
  }

  return parseFunction(trimmed) ?? parseWithCanvas(trimmed)
}

/**
 * Names the notation a colour string is written in, or `null` for a string
 * whose notation the picker cannot write back (named colours, `color()`).
 */
export const detectColorFormat = (value: string): ColorFormat | null => {
  const trimmed = value.trim().toLowerCase()

  if (HEX_PATTERN.test(trimmed)) {
    return 'hex'
  }

  const match = FUNCTION_PATTERN.exec(trimmed)
  if (!match) {
    return null
  }

  const name = match[1]!
  return name.startsWith('rgb') ? 'rgb' : name.startsWith('hsl') ? 'hsl' : 'oklch'
}

const hex2 = (value: number): string =>
  Math.round(clamp(value, 0, 255))
    .toString(16)
    .padStart(2, '0')

/**
 * Writes a colour in the given notation. Alpha is left out when it is 1, or
 * always when `alpha` is false.
 */
export const formatColor = (rgba: RGBA, format: ColorFormat, alpha = true): string => {
  const a = alpha ? clamp(rgba.a, 0, 1) : 1
  const opaque = a >= 1

  switch (format) {
    case 'rgb': {
      const rgb = `${Math.round(rgba.r)} ${Math.round(rgba.g)} ${Math.round(rgba.b)}`
      return opaque ? `rgb(${rgb})` : `rgb(${rgb} / ${round(a, 3)})`
    }

    case 'hsl': {
      const { h, s, l } = rgbaToHsla(rgba)
      const hsl = `${round(h)} ${round(s)}% ${round(l)}%`
      return opaque ? `hsl(${hsl})` : `hsl(${hsl} / ${round(a, 3)})`
    }

    case 'oklch': {
      const { l, c, h } = rgbaToOklcha(rgba)
      const oklch = `${round(l, 2)}% ${round(c, 4)} ${round(h, 2)}`
      return opaque ? `oklch(${oklch})` : `oklch(${oklch} / ${round(a, 3)})`
    }

    default: {
      const hex = `#${hex2(rgba.r)}${hex2(rgba.g)}${hex2(rgba.b)}`
      return opaque ? hex : `${hex}${hex2(a * 255)}`
    }
  }
}

export const rgbaToHsva = ({ r, g, b, a }: RGBA): HSVA => {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === red) {
      h = ((green - blue) / delta) % 6
    } else if (max === green) {
      h = (blue - red) / delta + 2
    } else {
      h = (red - green) / delta + 4
    }

    h = (((h * 60) % 360) + 360) % 360
  }

  return { h, s: max === 0 ? 0 : (delta / max) * 100, v: max * 100, a }
}

export const hsvaToRgba = ({ h, s, v, a }: HSVA): RGBA => {
  const saturation = clamp(s, 0, 100) / 100
  const value = clamp(v, 0, 100) / 100
  const chroma = value * saturation
  const sector = (((h % 360) + 360) % 360) / 60
  const x = chroma * (1 - Math.abs((sector % 2) - 1))
  const m = value - chroma

  const [red, green, blue] = sector < 1 ? [chroma, x, 0] : sector < 2 ? [x, chroma, 0] : sector < 3 ? [0, chroma, x] : sector < 4 ? [0, x, chroma] : sector < 5 ? [x, 0, chroma] : [chroma, 0, x]

  return { r: round((red + m) * 255), g: round((green + m) * 255), b: round((blue + m) * 255), a }
}

export const rgbaToHsla = (rgba: RGBA): HSLA => {
  const { h, s, v, a } = rgbaToHsva(rgba)
  const l = (v * (200 - s)) / 200
  const divisor = Math.min(l, 100 - l)

  return { h, s: divisor === 0 ? 0 : ((v - l) / divisor) * 100, l, a }
}

export const hslaToRgba = ({ h, s, l, a }: HSLA): RGBA => {
  const saturation = clamp(s, 0, 100) / 100
  const lightness = clamp(l, 0, 100) / 100
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const sector = (((h % 360) + 360) % 360) / 60
  const x = chroma * (1 - Math.abs((sector % 2) - 1))
  const m = lightness - chroma / 2

  const [red, green, blue] = sector < 1 ? [chroma, x, 0] : sector < 2 ? [x, chroma, 0] : sector < 3 ? [0, chroma, x] : sector < 4 ? [0, x, chroma] : sector < 5 ? [x, 0, chroma] : [chroma, 0, x]

  return { r: round((red + m) * 255), g: round((green + m) * 255), b: round((blue + m) * 255), a }
}

const toLinear = (channel: number): number => {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

const fromLinear = (channel: number): number => {
  const c = channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055
  return c * 255
}

export const rgbaToOklcha = ({ r, g, b, a }: RGBA): OKLCHA => {
  const red = toLinear(r)
  const green = toLinear(g)
  const blue = toLinear(b)

  const l = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue)
  const m = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue)
  const s = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue)

  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const aAxis = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bAxis = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s

  const chroma = Math.hypot(aAxis, bAxis)
  // Grey has no hue; a tiny chroma is rounding noise from the matrices
  const h = chroma < 0.0001 ? 0 : ((Math.atan2(bAxis, aAxis) * 180) / Math.PI + 360) % 360

  return { l: clamp(lightness * 100, 0, 100), c: chroma < 0.0001 ? 0 : chroma, h, a }
}

/**
 * Converts to sRGB and clips what is out of gamut channel by channel, so a
 * vivid `oklch()` still lands on its nearest displayable colour.
 */
export const oklchaToRgba = ({ l, c, h, a }: OKLCHA): RGBA => {
  const lightness = clamp(l, 0, 100) / 100
  const radians = (h * Math.PI) / 180
  const aAxis = c * Math.cos(radians)
  const bAxis = c * Math.sin(radians)

  const l_ = (lightness + 0.3963377774 * aAxis + 0.2158037573 * bAxis) ** 3
  const m_ = (lightness - 0.1055613458 * aAxis - 0.0638541728 * bAxis) ** 3
  const s_ = (lightness - 0.0894841775 * aAxis - 1.291485548 * bAxis) ** 3

  const red = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
  const green = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
  const blue = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_

  return {
    r: round(clamp(fromLinear(clamp(red, 0, 1)), 0, 255)),
    g: round(clamp(fromLinear(clamp(green, 0, 1)), 0, 255)),
    b: round(clamp(fromLinear(clamp(blue, 0, 1)), 0, 255)),
    a,
  }
}
