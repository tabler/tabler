// Keeps Tabler 1.x class names working after the 2.0 move to prefixes.
//
// 2.0 spells a variant as a prefix rather than a fragment inside the name:
// `.d-md-none` → `.md\:d-none`, `.d-print-none` → `.print\:d-none`,
// `.link-opacity-50-hover` → `.hover\:link-opacity-50` (see
// BOOTSTRAP-V6-MIGRATION.md, phase 8). Every template written against 1.x uses
// the old spelling, so rather than shipping two sets of rules this aliases the
// old name onto the new rule: one extra selector, same declarations, same
// `@media`, same cascade position and specificity.
//
//    .md\:d-none { display: none !important }
//    → .md\:d-none, .d-md-none { display: none !important }
//
// The pairs live in legacy-class-map.txt, written out rather than derived. The
// breakpoint variants could be worked out by removing a segment, but print and
// state variants sit in different places, and no rule separates `.btn-sm` (a
// size, untouched) from `.col-md-6` (a breakpoint) by looking at the name. A
// written-down map cannot get that wrong.
//
// Deleting the plugin from build-css.ts, together with that file, drops the
// whole compatibility layer one major after 2.0.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { PluginCreator, Rule } from 'postcss'

const CLASS_MAP = resolve(__dirname, 'legacy-class-map.txt')

// `.md\:d-none` in a selector: a dot, then an identifier that may carry css
// escapes (`\:`, or `\32 ` for a name starting with a digit).
const ESCAPE = String.raw`\\[0-9a-fA-F]{1,6}[ \t\r\n\f]?|\\[^\n0-9a-fA-F]`
const CLASS_SELECTOR = new RegExp(String.raw`\.(-?(?:${ESCAPE}|[_a-zA-Z])(?:${ESCAPE}|[-\w])*)`, 'g')

const decodeIdent = (ident: string): string => ident.replace(/\\([0-9a-fA-F]{1,6})[ \t\r\n\f]?|\\(.)/g, (_, hex: string | undefined, char: string | undefined) => (hex === undefined ? char! : String.fromCodePoint(parseInt(hex, 16))))

// A 1.x class name back into a selector: everything css needs escaped, which
// for these names is nothing — they are all plain kebab-case.
const escapeIdent = (name: string): string => name.replace(/[^\w-]/g, (char) => `\\${char}`)

// Each line is `<2.0 name> <1.x name>`; `#` starts a comment.
export const readClassMap = (file: string = CLASS_MAP): Map<string, string> => {
  const pairs = new Map<string, string>()
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const text = line.trim()
    if (!text || text.startsWith('#')) continue
    const [prefixed, legacy] = text.split(/\s+/)
    if (!prefixed || !legacy) throw new Error(`${file}: expected "<2.0 name> <1.x name>", got "${text}"`)
    pairs.set(prefixed, legacy)
  }
  return pairs
}

// Rewrites every renamed class in one selector to its 1.x name. Returns null
// when the selector carries none, so untouched rules stay untouched.
const legacySelector = (selector: string, aliases: Map<string, string>): string | null => {
  let matched = false
  const rewritten = selector.replace(CLASS_SELECTOR, (whole, ident: string) => {
    const legacy = aliases.get(decodeIdent(ident))
    if (legacy === undefined) return whole
    matched = true
    return `.${escapeIdent(legacy)}`
  })
  return matched ? rewritten : null
}

const plugin: PluginCreator<{ classes?: Map<string, string> }> = (options = {}) => {
  const aliases = options.classes ?? readClassMap()
  return {
    postcssPlugin: 'postcss-legacy-classes',
    Rule(rule: Rule) {
      const selectors = rule.selectors
      const added: string[] = []
      for (const selector of selectors) {
        const legacy = legacySelector(selector, aliases)
        if (legacy !== null && !selectors.includes(legacy) && !added.includes(legacy)) added.push(legacy)
      }
      if (added.length > 0) rule.selectors = [...selectors, ...added]
    },
  }
}

plugin.postcss = true

export default plugin
