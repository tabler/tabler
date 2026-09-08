// clean-css drops a bare `@layer a, b;` order statement and skips the rule
// after it. .build/build-css.ts lifts the statements out before minifying and
// puts them back at the top; this covers the two helpers and the clean-css
// behaviour they work around, so an upgrade that fixes it shows up here.
import { describe, expect, it } from 'vitest'
import CleanCSS from 'clean-css'
import { extractLayerOrder, prependLayerOrder } from '../../../.build/css-layer-order.ts'

const order = '@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;'
const source = `@charset "UTF-8";\n/* a comment */\n${order}\n:root {\n  --x: 0px 10px 15px -3px color-mix(in srgb, red 20%, transparent);\n  --y: 1;\n}\n.a {\n  color: red;\n}\n@layer components {\n  .b {\n    color: blue;\n  }\n}\n`

describe('extractLayerOrder', () => {
  it('lifts the order statement out and keeps the layer blocks', () => {
    const { css, statements } = extractLayerOrder(source)
    expect(statements).toEqual([order])
    expect(css).not.toContain(order)
    expect(css).toContain('@layer components {')
  })

  it('leaves a stylesheet without a statement alone', () => {
    const { css, statements } = extractLayerOrder('.a{color:red}')
    expect(statements).toEqual([])
    expect(css).toBe('.a{color:red}')
  })
})

describe('prependLayerOrder', () => {
  it('inserts after @charset and the banner, before the first rule', () => {
    const min = '@charset "UTF-8";/*!\n * banner\n */\n.a{color:red}'
    expect(prependLayerOrder(min, [order])).toBe(`@charset "UTF-8";/*!\n * banner\n */\n${order}.a{color:red}`)
  })

  it('inserts at the very top when there is no charset or banner', () => {
    expect(prependLayerOrder('.a{color:red}', [order])).toBe(`${order}.a{color:red}`)
  })
})

describe('clean-css and the order statement', () => {
  const options = { level: { 1: true } }

  it('still drops the statement and the following rule when given the raw css', () => {
    const { styles, warnings } = new CleanCSS(options).minify(source)
    expect(styles).not.toContain('@layer colors')
    expect(styles).not.toContain('--y:1')
    expect(warnings.length).toBeGreaterThan(0)
  })

  it('keeps every rule when the statement is lifted out and put back', () => {
    const { css, statements } = extractLayerOrder(source)
    const { styles, warnings } = new CleanCSS(options).minify(css)
    expect(warnings).toEqual([])
    const out = prependLayerOrder(styles, statements)
    expect(out.startsWith(`@charset "UTF-8";${order}`)).toBe(true)
    expect(out).toContain('--y:1')
    expect(out).toContain('@layer components{.b{color:#00f}}')
  })
})
