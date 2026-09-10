// Guards the cascade layer contract. The layer order is the only thing making
// utilities beat components now that `!important` is gone from them, so a rule
// that lands in the wrong layer — or a partial that forgets to wrap itself —
// changes the cascade for every user without changing a single declaration.
import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { css } = compileSass(path.join(scssDir, 'tabler.scss'), { loadPaths: ['node_modules'], style: 'expanded' })

const LAYER_ORDER = ['colors', 'config', 'root', 'reboot', 'layout', 'content', 'forms', 'components', 'custom', 'helpers', 'utilities']

/** Drops CSS block comments, which otherwise glue onto the next rule's prelude. */
const withoutComments = (source) => {
  let output = ''
  let index = 0
  while (index < source.length) {
    const char = source[index]
    if (char === '"' || char === "'") {
      const end = source.indexOf(char, index + 1)
      output += source.slice(index, end + 1)
      index = end + 1
      continue
    }
    if (char === '/' && source[index + 1] === '*') {
      index = source.indexOf('*/', index) + 2
      continue
    }
    output += char
    index++
  }
  return output
}

// Every style rule of the compiled sheet, tagged with the layer it lands in
// (`null` when it sits outside every layer). `@keyframes` and `@property` are
// recorded as leaves — their children are steps and descriptors, not rules.
const rules = []
const layerStatements = []
let firstBlockIndex = Infinity

const parse = (source, layer, top) => {
  let index = 0
  let start = 0
  let depth = 0
  let blockStart = 0
  while (index < source.length) {
    const char = source[index]
    if (char === '{') {
      if (depth === 0) blockStart = index
      depth++
    } else if (char === '}') {
      depth--
      if (depth === 0) {
        const prelude = source.slice(start, blockStart).trim()
        const body = source.slice(blockStart + 1, index)
        if (top && firstBlockIndex === Infinity) firstBlockIndex = start
        if (prelude.startsWith('@layer ')) parse(body, prelude.slice(7).trim(), false)
        else if (/^@(keyframes|property)\b/.test(prelude)) rules.push({ selector: prelude, layer, declarations: [] })
        else if (prelude.startsWith('@')) parse(body, layer, false)
        else rules.push({ selector: prelude.replace(/\s+/g, ' '), layer, declarations: body.split(';').map((part) => part.trim()) })
        start = index + 1
      }
    } else if (char === ';' && depth === 0) {
      const statement = source.slice(start, index).trim()
      if (top && statement.startsWith('@layer '))
        layerStatements.push({
          index: start,
          names: statement
            .slice(7)
            .split(',')
            .map((name) => name.trim()),
        })
      start = index + 1
    }
    index++
  }
}
parse(withoutComments(css), null, true)

/** The layers a selector appears in, matching whole comma-separated parts. */
const layersOf = (selector) => [...new Set(rules.filter((rule) => rule.selector.split(',').some((part) => part.trim() === selector)).map((rule) => rule.layer))]

describe('layer order', () => {
  it('is declared once, before any rule, in the Bootstrap v6 order', () => {
    expect(layerStatements).toHaveLength(1)
    expect(layerStatements[0].names).toEqual(LAYER_ORDER)
    expect(layerStatements[0].index).toBeLessThan(firstBlockIndex)
  })

  it('uses no layer that the order statement does not name', () => {
    const used = new Set(rules.map((rule) => rule.layer).filter(Boolean))
    expect([...used].filter((name) => !LAYER_ORDER.includes(name))).toEqual([])
  })
})

describe('a utility beats a component without !important', () => {
  // `.d-none` and `.card` both weigh 0-1-0, so before layers only the source
  // order — and `!important` — decided this. Now the layer does.
  it('puts the utility in a later layer than the component it has to override', () => {
    expect(layersOf('.d-none')).toEqual(['utilities'])
    expect(layersOf('.card')).toEqual(['components'])
    expect(LAYER_ORDER.indexOf('utilities')).toBeGreaterThan(LAYER_ORDER.indexOf('components'))
  })

  it('emits no !important in the utilities layer', () => {
    const important = rules.filter((rule) => rule.layer === 'utilities').flatMap((rule) => rule.declarations.filter((declaration) => declaration.endsWith('!important')).map((declaration) => `${rule.selector} { ${declaration} }`))
    // `.touch .scrollable` is the one survivor: it overrides `.scrollable.hover`
    // inside the same layer, where specificity — not layer order — decides.
    expect(important).toEqual(['.touch .scrollable { overflow-y: auto !important }'])
  })

  it('keeps a component in a later layer than the element rules it restyles', () => {
    expect(layersOf('.btn')).toEqual(['components'])
    expect(layersOf('.page-title')).toEqual(['components'])
    expect(layersOf('h1')).toEqual(['reboot', 'content'])
  })
})

describe('unlayered by design', () => {
  it('leaves @keyframes and @property outside every layer', () => {
    const animations = rules.filter((rule) => rule.selector.startsWith('@keyframes') || rule.selector.startsWith('@property'))
    expect(animations.length).toBeGreaterThan(0)
    expect(animations.filter((rule) => rule.layer !== null)).toEqual([])
  })

  it('layers every rule that is not a keyframe or a custom property definition', () => {
    expect(rules.filter((rule) => rule.layer === null && !rule.selector.startsWith('@'))).toEqual([])
  })
})
