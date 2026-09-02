// Verifies WCAG contrast ratios of Tabler's semantic color tokens.
//
// Compiles scss/tabler.scss in-memory (no dist build needed), collects the
// custom-property declarations of the base (:root), dark-mode and
// high-contrast blocks, resolves var() / light-dark() / color-mix() chains the
// way a browser would, and checks a fixed list of foreground/background token
// pairs in every color-mode × contrast-mode combination.
//
// Thresholds: the default theme ("normal" profile) is reported as warnings
// only — pre-existing shortfalls must not break the build. The high-contrast
// profile is a hard gate: any required pair below its ratio exits non-zero.
//
// Usage: tsx ../.build/check-contrast.ts   (cwd = the package, e.g. core)
import { compile as compileSass } from 'sass'
import postcss, { type Container, type Rule } from 'postcss'

type Rgba = { r: number; g: number; b: number; a: number } // channels 0..1

type State = { dark: boolean; high: boolean }

type Pair = { fg: string; bg: string; normal: number | null; high: number | null; note: string }

// Ratios follow WCAG 2.2: 4.5 = AA text, 7 = AAA text, 3 = non-text UI
// (1.4.11). `null` = report-only (no requirement at that profile).
const PAIRS: Pair[] = [
  { fg: '--body-color', bg: '--bg-surface', normal: 4.5, high: 7, note: 'body text on cards' },
  { fg: '--body-color', bg: '--body-bg', normal: 4.5, high: 7, note: 'body text on page' },
  { fg: '--secondary', bg: '--bg-surface', normal: 4.5, high: 7, note: 'muted text on cards' },
  { fg: '--secondary', bg: '--body-bg', normal: 4.5, high: 7, note: 'muted text on page' },
  { fg: '--tertiary', bg: '--bg-forms', normal: null, high: 4.5, note: 'placeholder text' },
  { fg: '--link-color', bg: '--bg-surface', normal: 4.5, high: 7, note: 'links on cards' },
  { fg: '--link-color', bg: '--body-bg', normal: 4.5, high: 7, note: 'links on page' },
  { fg: '--link-hover-color', bg: '--bg-surface', normal: 4.5, high: 7, note: 'hovered links' },
  { fg: '--icon-color', bg: '--bg-surface', normal: null, high: 3, note: 'decorative icons' },
  { fg: '--border-color', bg: '--bg-surface', normal: null, high: 3, note: 'borders on cards' },
  { fg: '--border-color', bg: '--body-bg', normal: null, high: 3, note: 'borders on page' },
  { fg: '--border-active-color', bg: '--bg-forms', normal: null, high: 3, note: 'active control borders' },
  { fg: '--focus-ring-color', bg: '--body-bg', normal: null, high: 3, note: 'focus ring' },
  { fg: '--primary', bg: '--bg-surface', normal: 3, high: 3, note: 'primary UI (buttons)' },
  { fg: '--primary-fg', bg: '--primary', normal: 4.5, high: 4.5, note: 'text on primary buttons' },
  { fg: '--disabled-color', bg: '--bg-surface', normal: null, high: null, note: 'disabled text (WCAG-exempt)' },
]

// ---------------------------------------------------------------------------
// Collect custom properties from the compiled css

const compiled = compileSass('scss/tabler.scss', {
  loadPaths: ['node_modules'],
  style: 'expanded',
  logger: { warn: () => {}, debug: () => {} },
})

const baseProps = new Map<string, string>()
const darkProps = new Map<string, string>()
const highProps = new Map<string, string>()

function mediaChain(node: Container | undefined): string {
  let params = ''
  for (let cur = node; cur; cur = cur.parent as Container | undefined) {
    if (cur.type === 'atrule') params += ` ${(cur as postcss.AtRule).name} ${(cur as postcss.AtRule).params}`
  }
  return params
}

postcss.parse(compiled.css).walkRules((rule: Rule) => {
  const media = mediaChain(rule.parent as Container | undefined)
  const inPrefersContrast = media.includes('prefers-contrast')
  // Ignore breakpoint/print/supports blocks — only the contrast media query
  // carries color tokens we track.
  if (media.trim() && !inPrefersContrast) return

  const selector = rule.selector
  let target: Map<string, string> | undefined
  if (inPrefersContrast || /theme-contrast=['"]?high/.test(selector)) {
    target = highProps
  } else if (/data-(?:bs-)?theme=['"]?dark|\.theme-dark/.test(selector)) {
    target = darkProps
  } else if (rule.selectors.some((s) => [':root', ':host'].includes(s.trim()) || /^\[data-(?:bs-)?theme=['"]?light/.test(s.trim()))) {
    target = baseProps
  }
  if (!target) return

  rule.walkDecls((decl) => {
    if (decl.prop.startsWith('--')) target!.set(decl.prop, decl.value.trim())
  })
})

if (baseProps.size === 0 || highProps.size === 0) {
  console.error(`check-contrast: token collection failed (base: ${baseProps.size}, high-contrast: ${highProps.size})`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Value resolution: var() substitution + color evaluation

function lookupProp(name: string, state: State): string | undefined {
  const key = baseProps.has(name) || darkProps.has(name) || highProps.has(name) ? name : name.replace(/^--tblr-/, '--')
  if (state.high && highProps.has(key)) return highProps.get(key)
  if (state.dark && darkProps.has(key)) return darkProps.get(key)
  return baseProps.get(key)
}

// Split on top-level commas (ignores commas inside nested parens)
function splitArgs(str: string): string[] {
  const parts: string[] = []
  let depth = 0
  let cur = ''
  for (const ch of str) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim())
      cur = ''
    } else {
      cur += ch
    }
  }
  if (cur.trim()) parts.push(cur.trim())
  return parts
}

// Find `fn(` in str and return the span of its balanced argument list
function findCall(str: string, fn: string): { start: number; end: number; inner: string } | null {
  const start = str.indexOf(`${fn}(`)
  if (start === -1) return null
  let depth = 0
  for (let i = start + fn.length; i < str.length; i++) {
    if (str[i] === '(') depth++
    if (str[i] === ')') {
      depth--
      if (depth === 0) return { start, end: i + 1, inner: str.slice(start + fn.length + 1, i) }
    }
  }
  throw new Error(`unbalanced parens in: ${str}`)
}

function substituteVars(value: string, state: State, seen: string[] = []): string {
  let out = value
  for (let call = findCall(out, 'var'); call; call = findCall(out, 'var')) {
    const [name, ...fallback] = splitArgs(call.inner)
    if (seen.includes(name)) throw new Error(`var() cycle: ${[...seen, name].join(' → ')}`)
    const raw = lookupProp(name, state)
    const replacement = raw !== undefined ? substituteVars(raw, state, [...seen, name]) : fallback.length ? substituteVars(fallback.join(','), state, seen) : undefined
    if (replacement === undefined) throw new Error(`unresolvable ${name}`)
    out = out.slice(0, call.start) + replacement + out.slice(call.end)
  }
  return out
}

const NAMED: Record<string, Rgba> = {
  transparent: { r: 0, g: 0, b: 0, a: 0 },
  white: { r: 1, g: 1, b: 1, a: 1 },
  black: { r: 0, g: 0, b: 0, a: 1 },
}

function parseLiteral(str: string): Rgba {
  const s = str.trim().toLowerCase()
  if (NAMED[s]) return NAMED[s]
  const hex = s.match(/^#([0-9a-f]{3,8})$/)
  if (hex) {
    let h = hex[1]
    if (h.length <= 4) h = [...h].map((c) => c + c).join('')
    const n = (i: number) => parseInt(h.slice(i, i + 2), 16) / 255
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 }
  }
  const fn = s.match(/^rgba?\((.*)\)$/)
  if (fn) {
    const body = fn[1].replace('/', ' ')
    const parts = body.split(/[\s,]+/).filter(Boolean)
    const chan = (p: string, scale: number) => (p.endsWith('%') ? parseFloat(p) / 100 : parseFloat(p) / scale)
    return {
      r: chan(parts[0], 255),
      g: chan(parts[1], 255),
      b: chan(parts[2], 255),
      a: parts[3] !== undefined ? chan(parts[3], 1) : 1,
    }
  }
  throw new Error(`cannot parse color: ${str}`)
}

// -- oklab <-> srgb (standard matrices), needed for `color-mix(in oklab, …)`
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const unlinear = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055)

function toOklab({ r, g, b }: Rgba): [number, number, number] {
  const [lr, lg, lb] = [linear(r), linear(g), linear(b)]
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]
}

function fromOklab([L, A, B]: [number, number, number]): Omit<Rgba, 'a'> {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  const clamp = (c: number) => Math.min(1, Math.max(0, c))
  return {
    r: clamp(unlinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    g: clamp(unlinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    b: clamp(unlinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  }
}

function colorMix(space: string, c1: Rgba, w1: number, c2: Rgba, w2: number): Rgba {
  // css-color-5 §3: normalize weights; a sum below 100% multiplies the alpha
  const sum = w1 + w2
  const alphaScale = sum < 1 ? sum : 1
  const [n1, n2] = [w1 / sum, w2 / sum]
  const a = c1.a * n1 + c2.a * n2
  const mixPre = (v1: number, v2: number) => (a === 0 ? v1 * n1 + v2 * n2 : (v1 * c1.a * n1 + v2 * c2.a * n2) / a)
  if (space === 'srgb') {
    return { r: mixPre(c1.r, c2.r), g: mixPre(c1.g, c2.g), b: mixPre(c1.b, c2.b), a: a * alphaScale }
  }
  if (space === 'oklab') {
    const [l1, l2] = [toOklab(c1), toOklab(c2)]
    const lab: [number, number, number] = [mixPre(l1[0], l2[0]), mixPre(l1[1], l2[1]), mixPre(l1[2], l2[2])]
    return { ...fromOklab(lab), a: a * alphaScale }
  }
  throw new Error(`unsupported color-mix space: ${space}`)
}

function evalColor(expr: string, state: State): Rgba {
  const s = expr.trim()
  if (s.startsWith('light-dark(')) {
    const [light, dark] = splitArgs(findCall(s, 'light-dark')!.inner)
    return evalColor(state.dark ? dark : light, state)
  }
  if (s.startsWith('color-mix(')) {
    const args = splitArgs(findCall(s, 'color-mix')!.inner)
    const space = args[0].replace(/^in\s+/, '').trim()
    const parseComponent = (arg: string): { color: string; pct: number | null } => {
      const m = arg.match(/^(.*?)\s+([\d.]+)%$/s) ?? arg.match(/^([\d.]+)%\s+(.*)$/s)
      if (!m) return { color: arg, pct: null }
      return /%$/.test(arg) ? { color: m[1], pct: parseFloat(m[2]) } : { color: m[2], pct: parseFloat(m[1]) }
    }
    const [p1, p2] = [parseComponent(args[1]), parseComponent(args[2])]
    let [w1, w2] = [p1.pct, p2.pct]
    if (w1 === null && w2 === null) [w1, w2] = [50, 50]
    else if (w1 === null) w1 = 100 - w2!
    else if (w2 === null) w2 = 100 - w1
    return colorMix(space, evalColor(p1.color, state), w1! / 100, evalColor(p2.color, state), w2! / 100)
  }
  return parseLiteral(s)
}

function resolveToken(name: string, state: State): Rgba {
  const raw = lookupProp(name, state)
  if (raw === undefined) throw new Error(`token not found: ${name}`)
  return evalColor(substituteVars(raw, state), state)
}

// ---------------------------------------------------------------------------
// WCAG math

function flatten(fg: Rgba, bg: Rgba): Rgba {
  if (fg.a >= 1) return fg
  const over = (f: number, b: number) => f * fg.a + b * (1 - fg.a)
  return { r: over(fg.r, bg.r), g: over(fg.g, bg.g), b: over(fg.b, bg.b), a: 1 }
}

function luminance({ r, g, b }: Rgba): number {
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

function contrast(fg: Rgba, bg: Rgba): number {
  const [l1, l2] = [luminance(fg), luminance(bg)]
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

const toHex = ({ r, g, b }: Rgba) =>
  '#' +
  [r, g, b]
    .map((c) =>
      Math.round(c * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')

// ---------------------------------------------------------------------------
// Run every color-mode × contrast-mode combination

const STATES: { label: string; state: State }[] = [
  { label: 'light · normal', state: { dark: false, high: false } },
  { label: 'light · high-contrast', state: { dark: false, high: true } },
  { label: 'dark · normal', state: { dark: true, high: false } },
  { label: 'dark · high-contrast', state: { dark: true, high: true } },
]

let errors = 0
let warnings = 0

for (const { label, state } of STATES) {
  console.log(`\n${label}`)
  for (const pair of PAIRS) {
    const required = state.high ? pair.high : pair.normal
    let line: string
    try {
      const bgToken = resolveToken(pair.bg, state)
      const pageBg = flatten(resolveToken('--body-bg', state), NAMED.white)
      const bg = flatten(bgToken, pageBg)
      const fg = flatten(resolveToken(pair.fg, state), bg)
      const ratio = contrast(fg, bg)
      const ok = required === null || ratio >= required
      if (!ok) state.high ? errors++ : warnings++
      const mark = required === null ? '·' : ok ? '✓' : state.high ? '✗' : '!'
      line = `  ${mark} ${pair.fg} on ${pair.bg}`.padEnd(50) + `${ratio.toFixed(2).padStart(6)}${required === null ? '   (report)' : `   (>= ${required})`}  ${toHex(fg)} on ${toHex(bg)}  ${pair.note}`
    } catch (err) {
      errors++
      line = `  ✗ ${pair.fg} on ${pair.bg}`.padEnd(50) + `  ${err instanceof Error ? err.message : err}`
    }
    console.log(line)
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s) — high-contrast failures are errors, default-theme failures are warnings`)
process.exit(errors > 0 ? 1 : 0)
