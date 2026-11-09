import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { css } = compileSass(path.join(scssDir, 'tabler.scss'), { loadPaths: ['node_modules'], style: 'expanded', quietDeps: true, logger: { warn() {}, debug() {} } })
const flat = css.replace(/\s+/g, ' ')

const scope = { valid: "form[data-bs-validate='valid']", invalid: 'form[data-bs-validate]' }

describe('form[data-bs-validate]', () => {
  it.each(['valid', 'invalid'])('styles .form-control with :user-%s', (state) => {
    const selector = `${scope[state].replace(/'/g, '')} .form-control:is(:user-${state})`
    expect(flat.replace(/"/g, '')).toContain(selector)
  })

  it.each(['valid', 'invalid'])('shows .%s-feedback after :user-%s', (state) => {
    expect(flat.replace(/["']/g, '')).toMatch(new RegExp(`:is\\(:user-${state}\\) ~ \\.${state}-feedback`))
  })

  it('does not use :user-valid for the plain data-bs-validate mode', () => {
    expect(flat).not.toMatch(/form\[data-bs-validate\](?!=)[^{,]*:user-valid/)
  })

  it.each(['valid', 'invalid'])('gives the :user-%s icon the same size as .is-%s', (state) => {
    expect(flat.replace(/["']/g, '')).toMatch(new RegExp(`:is\\(:user-${state}\\)[^{]*\\{[^}]*--form-feedback-icon-size`))
  })

  it.each(['valid', 'invalid'])('keeps .was-validated and .is-%s selectors', (state) => {
    expect(flat).toContain(`.was-validated .form-control:${state}`)
    expect(flat).toContain(`.form-control.is-${state}`)
  })

  it('wraps the pseudo-class in :is() so older browsers drop only that rule', () => {
    expect(flat).not.toMatch(/form\[data-bs-validate[^{]*[^(]:user-(valid|invalid)/)
  })
})
