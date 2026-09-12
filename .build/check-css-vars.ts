// Fails when the css references a custom property that nothing defines.
//
// `color: var(--tblr-nav-link-active-color)` where that name is never declared
// is invalid at computed-value time: the browser drops the whole declaration and
// the element falls back to the inherited or initial value. Nothing reports it —
// not sass, not stylelint, not the browser console — so it renders wrong and
// quietly. Three shipped bugs came from exactly this: the button focus ring
// (#2662), the active nav link (#2287) and the disabled button border.
//
// A `var()` with a fallback cannot break, so those references are not checked.
//
// The scan compiles the same scss entry points the build does, so it needs no
// dist/ and sees what actually ships. Names that stay unprefixed belong to
// third-party stylesheets that declare them themselves (see cssVarIgnore), so
// only `--tblr-` names are checked.
//
// Known offenders are listed in css-vars-baseline.txt. Anything not on that list
// fails the check; so does a name on the list that no longer dangles, which
// keeps the file from going stale — delete the line when you fix one.
//
// Usage: tsx .build/check-css-vars.ts
/// <reference path="./modules.d.ts" />
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import { cssVarIgnore, cssVarPrefix, inlineValueComments } from './css-var-prefix'

const scssDir = 'core/scss'
const baselineFile = '.build/css-vars-baseline.txt'

const definition = /(--[\w-]+)\s*:/g
const reference = /var\(\s*(--[\w-]+)\s*([,)])/g
const registration = /@property\s+(--[\w-]+)/g

const defined = new Set<string>()
// name → stylesheets referencing it without a fallback
const referenced = new Map<string, Set<string>>()

async function scan(entry: string) {
  const compiled = compileSass(join(scssDir, entry), { loadPaths: ['node_modules'], style: 'expanded' })
  const { css } = await postcss([inlineValueComments, prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore })]).process(compiled.css, { from: undefined, map: false })
  const file = entry.replace('.scss', '.css')

  for (const [, name] of css.matchAll(definition)) defined.add(name)
  for (const [, name] of css.matchAll(registration)) defined.add(name)
  for (const [, name, next] of css.matchAll(reference)) {
    if (next !== ')') continue
    if (!name.startsWith(`--${cssVarPrefix}`)) continue
    const files = referenced.get(name) ?? new Set<string>()
    files.add(file)
    referenced.set(name, files)
  }
}

async function main() {
  const entries = readdirSync(scssDir).filter((file) => file.endsWith('.scss') && !file.startsWith('_'))
  for (const entry of entries) await scan(entry)

  const dangling = new Map([...referenced].filter(([name]) => !defined.has(name)).sort())
  const baseline = readFileSync(baselineFile, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('--'))

  const added = [...dangling.keys()].filter((name) => !baseline.includes(name))
  const fixed = baseline.filter((name) => !dangling.has(name))

  for (const name of added) {
    console.error(`✗ ${name} — referenced by ${[...dangling.get(name)!].join(', ')}, defined nowhere`)
  }
  if (added.length > 0) {
    console.error(`\n${added.length} new dangling custom ${added.length === 1 ? 'property' : 'properties'}. Define the property, give the var() a fallback, or drop the declaration.`)
  }
  if (fixed.length > 0) {
    console.error(`\n${fixed.join(', ')} no longer dangling — delete ${fixed.length === 1 ? 'that line' : 'those lines'} from ${baselineFile}.`)
  }
  if (added.length > 0 || fixed.length > 0) process.exit(1)

  console.log(`OK — ${referenced.size} custom properties referenced without a fallback, all defined (${baseline.length} known exceptions in ${baselineFile}).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
