// Guards the build-time `--tblr-` prefixing configured in .build/css-var-prefix.ts.
//
// Custom properties are authored bare in scss, so a name Tabler owns and a name
// a vendor library owns look identical in source — only `cssVarIgnore` tells
// them apart. Get that wrong and nothing fails: the vendor's variable quietly
// becomes `--tblr-fc-border-color`, the library never reads it, and the theming
// is simply gone.
//
// tabler-vendors.scss is where every foreign name lives, so its full set of
// custom-property names is snapshotted. A vendor override added without the
// matching `cssVarIgnore` entry shows up in the snapshot diff as a `--tblr-`
// name that plainly belongs to someone else.
import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import { cssVarIgnore, cssVarPrefix, inlineValueComments } from '../../../.build/css-var-prefix.ts'

const scssDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// The same two passes build-css.ts runs before autoprefixer.
async function buildCustomPropertyNames(entry) {
  const { css } = compileSass(path.join(scssDir, entry), { loadPaths: ['node_modules'], style: 'expanded' })
  const result = await postcss([
    inlineValueComments,
    prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore }),
  ]).process(css, { from: undefined })

  const names = new Set()
  result.root.walkDecls((decl) => {
    if (decl.prop.startsWith('--')) names.add(decl.prop)
    for (const [, name] of decl.value.matchAll(/var\(\s*(--[\w-]+)/g)) names.add(name)
  })
  result.root.walkAtRules('property', (atRule) => names.add(atRule.params.trim()))

  return [...names].sort()
}

describe('css custom-property prefixing', () => {
  it('leaves vendor-owned names alone and prefixes everything else', async () => {
    await expect(buildCustomPropertyNames('tabler-vendors.scss')).resolves.toMatchSnapshot()
  })

  it('has no dead entries in the ignore list', async () => {
    // A pattern matching nothing means the vendor it protected is gone, or the
    // name drifted — either way the entry no longer guards anything.
    // Every entry point, since foreign names are spread across the bundles.
    const entries = readdirSync(scssDir).filter((file) => file.endsWith('.scss') && !file.startsWith('_'))
    const perEntry = await Promise.all(entries.map(buildCustomPropertyNames))
    const all = [...new Set(perEntry.flat())]

    for (const pattern of cssVarIgnore) {
      const matches =
        pattern instanceof RegExp ? all.some((name) => pattern.test(name)) : all.includes(pattern)
      expect(matches, `unused cssVarIgnore entry: ${pattern}`).toBe(true)
    }
  })
})
