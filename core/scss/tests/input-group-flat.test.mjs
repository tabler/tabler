import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { css } = compileSass(path.join(scssDir, 'ui', '_forms.scss'), { loadPaths: ['node_modules'], style: 'expanded' })
const flat = css.replace(/\s+/g, ' ')

describe('input-group-flat validation', () => {
  it.each(['valid', 'invalid'])('carries the %s border color over to the input-group-text', (state) => {
    expect(flat).toContain(`.input-group-flat:has(.form-control.is-${state}) .input-group-text`)
  })

  it.each(['valid', 'invalid'])('follows .was-validated for the :%s pseudo-class', (state) => {
    expect(flat).toContain(`.was-validated .input-group-flat:has(.form-control:${state}) .input-group-text`)
  })

  it.each(['valid', 'invalid'])('keeps the %s color while the group has focus', (state) => {
    expect(flat).toMatch(new RegExp(`\\.input-group-flat:has\\(\\.form-control\\.is-${state}\\):focus-within[^{]*\\{ outline-color: [^;]+; \\}`))
    expect(flat).toMatch(new RegExp(`\\.input-group-flat:has\\(\\.form-control\\.is-${state}\\):focus-within \\.form-control,[^{]*\\.input-group-text \\{ border-color: [^;]+ !important; \\}`))
  })
})
