// Keeps Tabler 1.x responsive class names working after the infix → prefix move.
//
// 2.0 emits responsive classes as `.md\:d-none` instead of `.d-md-none` (see
// BOOTSTRAP-V6-MIGRATION.md, phase 8). Every template written against 1.x uses
// the old spelling, so rather than shipping two sets of rules this aliases the
// old name onto the new rule: one extra selector, same declarations, same
// `@media`, same cascade position and specificity.
//
//    .md\:d-none { display: none !important }
//    → .md\:d-none, .d-md-none { display: none !important }
//
// The alias list is frozen in legacy-responsive-classes.txt — it describes the
// class surface 1.x released, so it is not derived from the current build.
// Deleting the plugin from build-css.ts (and that file) drops the whole
// compatibility layer, one major after 2.0.
//
// Only names on that list are aliased, which is what makes the direction safe:
// a prefixed class has no single spot where the breakpoint segment belongs
// (`md:col-6` → `col-md-6`, but `md:list-group-horizontal` →
// `list-group-horizontal-md`), and for the `-down` variants a mechanical
// reverse would invent a name that never existed.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { PluginCreator, Rule } from 'postcss'

const LEGACY_CLASSES = resolve(__dirname, 'legacy-responsive-classes.txt')

// `2xl` is here for the breakpoint rename that phase 8 leaves open: nothing on
// the frozen list uses it today, but a renamed breakpoint must not silently
// fall out of the compatibility layer.
const BREAKPOINTS = ['sm', 'md', 'lg', 'xl', 'xxl', '2xl']

// `.md\:d-none` in a selector: a dot, then an identifier that may carry css
// escapes (`\:`, or `\32 ` for a name starting with a digit).
const ESCAPE = String.raw`\\[0-9a-fA-F]{1,6}[ \t\r\n\f]?|\\[^\n0-9a-fA-F]`
const CLASS_SELECTOR = new RegExp(String.raw`\.(-?(?:${ESCAPE}|[_a-zA-Z])(?:${ESCAPE}|[-\w])*)`, 'g')

const decodeIdent = (ident: string): string => ident.replace(/\\([0-9a-fA-F]{1,6})[ \t\r\n\f]?|\\(.)/g, (_, hex: string | undefined, char: string | undefined) => (hex === undefined ? char! : String.fromCodePoint(parseInt(hex, 16))))

// A 1.x class name back into a selector. No name on the frozen list needs
// escaping — they are all plain kebab-case — so this only guards against a
// stray character putting an unescaped `:` or `/` into the output.
const escapeIdent = (name: string): string => name.replace(/[^\w-]/g, (char) => `\\${char}`)

// `col-md-6` → `md:col-6`. Every name on the frozen list carries exactly one
// breakpoint segment, so removing it yields the prefixed spelling.
//
// Only defined over that list. Parsing alone cannot tell a breakpoint segment
// from a size modifier — `btn-sm` reads as `sm:btn` here, and `.card-md` as
// `md:card` — which is why list membership, not this function, decides what
// gets aliased. Anything reusing it (a codemod, say) needs the same guard.
export const prefixedNameOf = (legacy: string): string | null => {
  const segments = legacy.split('-')
  const at = segments.findIndex((segment) => BREAKPOINTS.includes(segment))
  if (at === -1) return null
  const rest = [...segments.slice(0, at), ...segments.slice(at + 1)]
  return `${segments[at]}:${rest.join('-')}`
}

export const readLegacyClasses = (file: string = LEGACY_CLASSES): string[] =>
  readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))

// prefixed spelling → the 1.x name it replaces
export const legacyAliases = (classes: string[] = readLegacyClasses()): Map<string, string> => {
  const aliases = new Map<string, string>()
  for (const legacy of classes) {
    const prefixed = prefixedNameOf(legacy)
    if (prefixed) aliases.set(prefixed, legacy)
  }
  return aliases
}

// Rewrites every prefixed class in one selector to its 1.x name. Returns null
// when the selector carries no aliased class, so untouched rules stay untouched.
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

const plugin: PluginCreator<{ classes?: string[] }> = (options = {}) => {
  const aliases = legacyAliases(options.classes)
  return {
    postcssPlugin: 'postcss-legacy-responsive',
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
