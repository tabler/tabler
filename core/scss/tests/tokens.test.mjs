// End-to-end check that a compile-time `$card-tokens` override reaches the
// compiled `.card` rule. The sass-true suite in _tokens.test.scss covers
// `defaults()` and `tokens()` in isolation; this one wires them together the
// way ui/_cards.scss does and drives it through `@use … with ()`.
import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileString } from 'sass'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function compileCardRule(overrides) {
  const src = `@use 'ui/cards' with ($card-tokens: (${overrides}));`
  const { css } = compileString(src, { loadPaths: [scssDir, 'node_modules'], style: 'expanded' })
  // The base `.card { … }` rule that ui/_cards.scss renders `$card-tokens` on.
  return css.match(/\n\.card \{\n[\s\S]*?\n\}/)[0]
}

describe('$card-tokens compile-time override', () => {
  it('replaces the value of an existing token on .card', () => {
    const rule = compileCardRule('--card-bg: rgb(1 2 3)')
    expect(rule).toContain('--card-bg: rgb(1, 2, 3);')
    // untouched tokens keep their defaults
    expect(rule).toContain('--card-spacer-y: 1.25rem;')
  })

  it('drops a token whose override value is null', () => {
    const rule = compileCardRule('--card-box-shadow: null')
    expect(rule).not.toContain('--card-box-shadow:')
  })

  it('adds a brand-new token to .card', () => {
    const rule = compileCardRule('--card-accent: hotpink')
    expect(rule).toContain('--card-accent: hotpink;')
  })
})

describe('other components render from their token map', () => {
  // Spot-check a component whose default map holds a Sass function call
  // (`color-transparent(...)`), not just a plain variable.
  it('renders $alert-tokens on .alert and takes an override', () => {
    const src = `@use 'ui/alerts' with ($alert-tokens: (--alert-padding-x: 2rem));`
    const { css } = compileString(src, { loadPaths: [scssDir, 'node_modules'], style: 'expanded' })
    const rule = css.match(/\n\.alert \{\n[\s\S]*?\n\}/)[0]
    expect(rule).toContain('--alert-padding-x: 2rem;')
    expect(rule).toMatch(/--alert-bg: color-mix\(/)
  })
})
