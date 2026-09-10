// Fails when the css references a custom property that nothing defines, or that
// nothing defines *in reach of the rule that reads it*.
//
// `color: var(--tblr-nav-link-active-color)` where that name is never declared
// is invalid at computed-value time: the browser drops the whole declaration and
// the element falls back to the inherited or initial value. Nothing reports it —
// not sass, not stylelint, not the browser console — so it renders wrong and
// quietly. Three shipped bugs came from exactly this: the button focus ring
// (#2662), the active nav link (#2287) and the disabled button border.
//
// A name can also be declared somewhere and still be out of reach. `--icon-size`
// is only ever set on `.icon`; `.input-icon-addon` read `var(--icon-size)` and
// got nothing, because it is neither `.icon` nor inside one (#3013). The
// existence check passed. `scopedProperties` lists the names that live inside one
// component's subtree so a read from outside it is caught too.
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
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile as compileSass } from 'sass'
import postcss from 'postcss'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import { cssVarIgnore, cssVarPrefix, inlineValueComments } from './css-var-prefix'

const scssDir = 'core/scss'
const baselineFile = '.build/css-vars-baseline.txt'

const definition = /(--[\w-]+)\s*:/g
const reference = /var\(\s*(--[\w-]+)\s*([,)])/g
const registration = /@property\s+(--[\w-]+)/g

// Custom properties that live only inside one component's subtree: declared on a
// component class, never on `:root`. Reading one from a selector that cannot
// inherit it is invalid at computed-value time, exactly like a dangling
// reference. Only the names listed here get the scope check; every other
// reference is checked for existence alone. name (unprefixed) → the class(es)
// whose subtree owns it.
export const scopedProperties: Record<string, string[]> = {
  'icon-size': ['icon'],
}

const globalRoot = /^(?::root|:host|html(?:\[[^\]]*\])*|\*)$/

const escapeClass = (name: string) => name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
const selectorOwnsClass = (selector: string, owner: string) => new RegExp(`\\.${escapeClass(owner)}(?![\\w-])`).test(selector)
const selectorIsGlobalRoot = (selector: string) => selector.split(',').some((part) => globalRoot.test(part.trim()))

export interface ScopeViolation {
  property: string
  selector: string
  owners: string[]
}

// Reads of a scoped custom property from a selector that cannot inherit it, plus
// `scoped` entries that no longer describe the css (wrong owner, never read, or
// declared on a global root so not scoped after all).
export function findScopeViolations(css: string, scoped: Record<string, string[]>) {
  const owners = new Map(Object.entries(scoped).map(([name, classes]) => [`--${cssVarPrefix}${name}`, classes]))

  const declaredOnOwner = new Set<string>()
  const declaredOnRoot = new Set<string>()
  const read = new Set<string>()
  const violations: ScopeViolation[] = []

  postcss.parse(css).walkRules((rule) => {
    const { selector } = rule
    rule.walkDecls((decl) => {
      const declClasses = owners.get(decl.prop)
      if (declClasses) {
        if (declClasses.some((owner) => selectorOwnsClass(selector, owner))) declaredOnOwner.add(decl.prop)
        if (selectorIsGlobalRoot(selector)) declaredOnRoot.add(decl.prop)
      }
      for (const [, name, next] of decl.value.matchAll(reference)) {
        const readClasses = owners.get(name)
        if (next !== ')' || !readClasses) continue
        read.add(name)
        const inScope = readClasses.some((owner) => selectorOwnsClass(selector, owner)) || rule.some((node) => node.type === 'decl' && node.prop === name)
        if (!inScope) violations.push({ property: name, selector, owners: readClasses })
      }
    })
  })

  const stale: string[] = []
  for (const [name, classes] of Object.entries(scoped)) {
    const prop = `--${cssVarPrefix}${name}`
    const list = classes.map((c) => `.${c}`).join(' / ')
    if (!declaredOnOwner.has(prop)) stale.push(`${name} — not declared on ${list}`)
    if (!read.has(prop)) stale.push(`${name} — never read without a fallback`)
    if (declaredOnRoot.has(prop)) stale.push(`${name} — also declared on a global root, so not component-scoped`)
  }

  return { violations, stale }
}

const defined = new Set<string>()
// name → stylesheets referencing it without a fallback
const referenced = new Map<string, Set<string>>()
let allCss = ''

async function scan(entry: string) {
  const compiled = compileSass(join(scssDir, entry), { loadPaths: ['node_modules'], style: 'expanded' })
  const { css } = await postcss([inlineValueComments, prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore })]).process(compiled.css, { from: undefined, map: false })
  const file = entry.replace('.scss', '.css')
  allCss += `${css}\n`

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

  const { violations, stale } = findScopeViolations(allCss, scopedProperties)
  for (const { property, selector, owners } of violations) {
    console.error(`✗ ${property} — read by ${selector}, which is not ${owners.map((owner) => `.${owner}`).join(' / ')} or inside one`)
  }
  if (violations.length > 0) {
    console.error(`\n${violations.length} out-of-scope ${violations.length === 1 ? 'reference' : 'references'} to a component-scoped custom property. Read it from inside its owning class, give the var() a fallback, or declare it where it is read.`)
  }
  if (stale.length > 0) {
    console.error(`\nscopedProperties in check-css-vars.ts is out of date:\n${stale.map((line) => `  ${line}`).join('\n')}`)
  }

  if (added.length > 0 || fixed.length > 0 || violations.length > 0 || stale.length > 0) process.exit(1)

  console.log(`OK — ${referenced.size} custom properties referenced without a fallback, all defined (${baseline.length} known exceptions in ${baselineFile}); ${Object.keys(scopedProperties).length} scoped, all read in scope.`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
