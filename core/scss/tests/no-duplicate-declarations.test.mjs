import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'

// stylelint only sees the source, so a declaration that a loop or a mixin emits
// a second time gets past `declaration-block-no-duplicate-properties`.
const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const entries = readdirSync(scssDir).filter((file) => /^tabler.*\.scss$/.test(file))

function duplicates(css) {
  const found = []
  postcss.parse(css).walkRules((rule) => {
    const seen = new Set()
    rule.each((node) => {
      if (node.type !== 'decl') return
      const key = `${node.prop}: ${node.value}${node.important ? ' !important' : ''}`
      if (seen.has(key)) found.push(`${rule.selector} { ${key} }`)
      seen.add(key)
    })
  })
  return found
}

describe('compiled css', () => {
  it.each(entries)('%s declares nothing twice in one rule', (entry) => {
    const { css } = compileSass(path.join(scssDir, entry), { loadPaths: ['node_modules'], style: 'expanded' })
    expect(duplicates(css)).toEqual([])
  })
})
