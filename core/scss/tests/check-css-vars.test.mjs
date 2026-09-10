// Guards the token-scope pass in .build/check-css-vars.ts.
//
// The existence check in that gate only proves a `--tblr-` custom property is
// declared somewhere. `scopedProperties` names the ones that live inside a
// single component's subtree, and `findScopeViolations` flags a read from a
// selector that cannot inherit them — the bug class from #3013, where
// `.input-icon-addon` read `--icon-size` while only `.icon` ever set it.
//
// This test runs the pass over the real compiled main bundle (it must stay clean
// and the seed list must keep describing the css), then over a synthetic
// stylesheet to prove an out-of-scope read is actually caught.
import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import { cssVarIgnore, cssVarPrefix, inlineValueComments } from '../../../.build/css-var-prefix.ts'
import { findScopeViolations, scopedProperties } from '../../../.build/check-css-vars.ts'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// The same two passes build-css.ts runs before autoprefixer, on the main bundle.
// The gate itself (`pnpm run check:css-vars`, part of the lint job) covers every
// entry point; compiling one here keeps this test off the vitest timeout.
async function mainBundleCss() {
  const { css } = compileSass(path.join(scssDir, 'tabler.scss'), { loadPaths: ['node_modules'], style: 'expanded' })
  const result = await postcss([inlineValueComments, prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore })]).process(css, { from: undefined })
  return result.css
}

describe('check-css-vars token scope', () => {
  it('the shipped css has no out-of-scope reads and the seed list is current', async () => {
    const { violations, stale } = findScopeViolations(await mainBundleCss(), scopedProperties)
    expect(violations).toEqual([])
    expect(stale).toEqual([])
  }, 30_000)

  it('flags a scoped property read from a selector that cannot inherit it', () => {
    const css = `
      .icon { --${cssVarPrefix}icon-size: 1rem; width: var(--${cssVarPrefix}icon-size); }
      .icon-lg { --${cssVarPrefix}icon-size: 2rem; }
      .input-icon .icon { height: var(--${cssVarPrefix}icon-size); }
      .input-icon-addon { font-size: var(--${cssVarPrefix}icon-size); }
    `
    const { violations } = findScopeViolations(css, { 'icon-size': ['icon'] })
    expect(violations).toEqual([{ property: `--${cssVarPrefix}icon-size`, selector: '.input-icon-addon', owners: ['icon'] }])
  })

  it('accepts a read whose own rule redeclares the property', () => {
    const css = `.thing { --${cssVarPrefix}icon-size: 3rem; width: var(--${cssVarPrefix}icon-size); }`
    const { violations } = findScopeViolations(css, { 'icon-size': ['icon'] })
    expect(violations).toEqual([])
  })

  it('reports a stale entry: declared on a global root, or never read', () => {
    const css = `:root { --${cssVarPrefix}ghost: 1; } .icon { color: red; }`
    const { stale } = findScopeViolations(css, { 'ghost': ['icon'], 'icon-size': ['icon'] })
    expect(stale).toContain('ghost — not declared on .icon')
    expect(stale).toContain('ghost — never read without a fallback')
    expect(stale).toContain('ghost — also declared on a global root, so not component-scoped')
    expect(stale).toContain('icon-size — never read without a fallback')
  })
})
