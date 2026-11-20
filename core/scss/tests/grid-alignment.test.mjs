import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from 'sass'
import postcss from 'postcss'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { css } = compile(path.join(scssDir, 'tabler.scss'), { loadPaths: ['node_modules'] })
const rules = new Map()
postcss.parse(css).walkRules((rule) => rules.set(rule.selector, rule))

describe('justify-self utilities', () => {
  it.each([
    ['', null],
    ['-sm', '(min-width: 576px)'],
    ['-md', '(min-width: 768px)'],
    ['-lg', '(min-width: 992px)'],
    ['-xl', '(min-width: 1200px)'],
    ['-xxl', '(min-width: 1400px)'],
  ])('generates grid alignment rules for the "%s" breakpoint', (infix, media) => {
    for (const value of ['start', 'end', 'center']) {
      const rule = rules.get(`.justify-self${infix}-${value}`)
      expect(rule).toBeDefined()
      const declaration = rule.nodes.find((node) => node.type === 'decl' && node.prop === 'justify-self')
      expect(declaration?.value).toBe(value)
      expect(declaration?.important).toBe(true)
      const parentMedia = rule.parent.type === 'atrule' && rule.parent.name === 'media' ? rule.parent.params : null
      expect(parentMedia).toBe(media)
    }
  })
})
