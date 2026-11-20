import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'

// A `:has()` selector that ends in a part matching any element is expensive in
// Chrome: with `.steps:not(:has(> .step-item)) > :last-child` in the stylesheet,
// each DOM change in the page from #3453 recalculated the style of the whole page.
const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const entries = readdirSync(scssDir).filter((file) => /^tabler.*\.scss$/.test(file))

/** Splits on `separator` characters that are outside parentheses and brackets. */
function splitTopLevel(selector, separator) {
  const parts = ['']
  let depth = 0

  for (const char of selector) {
    if (char === '(' || char === '[') depth++
    if (char === ')' || char === ']') depth--

    if (depth === 0 && separator.test(char)) {
      parts.push('')
    } else {
      parts[parts.length - 1] += char
    }
  }

  return parts.map((part) => part.trim()).filter(Boolean)
}

/** The last compound selector with its functional pseudo-classes removed. */
function lastCompound(selector) {
  let compound = splitTopLevel(selector, /[\s>+~]/).at(-1)

  while (/\([^()]*\)/.test(compound)) {
    compound = compound.replace(/\([^()]*\)/g, '')
  }

  return compound
}

function universalHasSelectors(css) {
  const found = []

  postcss.parse(css).walkRules((rule) => {
    for (const selector of splitTopLevel(rule.selector, /,/)) {
      if (selector.includes(':has(') && !/^[a-z]|[.#[]/i.test(lastCompound(selector))) {
        found.push(selector)
      }
    }
  })

  return found
}

describe(':has() selectors', () => {
  it.each(entries)('%s ends every :has() selector in a part with a tag, class, id or attribute', (entry) => {
    const { css } = compileSass(path.join(scssDir, entry), { loadPaths: ['node_modules'], style: 'expanded' })
    expect(universalHasSelectors(css)).toEqual([])
  })
})
