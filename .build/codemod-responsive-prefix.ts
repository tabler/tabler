// Rewrites 1.x responsive class names to the 2.0 prefix, in markup.
//
//    class="col-md-6 d-md-none"  ->  class="md:col-6 md:d-none"
//
// Both spellings work at runtime — .build/postcss-legacy-responsive.ts keeps the
// old ones alive — so this is a tidy-up, not a repair. It exists mainly for
// people upgrading their own templates: point it at a directory and it edits
// the files in place.
//
//    tsx .build/codemod-responsive-prefix.ts --dry            # every tracked file
//    tsx .build/codemod-responsive-prefix.ts src/ templates/  # or given paths
//
// The names come from legacy-responsive-classes.txt, matched whole-word, so
// `col-md-6` is rewritten and `btn-sm` is not. Nothing else in the file is
// touched: the text either matches a name on that list or it is left alone.
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { readLegacyClasses } from './postcss-legacy-responsive'
import { prefixedNameOf } from './postcss-legacy-responsive'

// Files where a 1.x name is the subject rather than markup: the migration
// plan's before/after table, the compatibility layer and its test, the
// changesets describing the rename, and the two agent files that state policy
// about the naming (those say what the rule *is*, so they are edited by hand).
// Rewriting any of these would erase the thing they document.
const KEEPS_LEGACY_NAMES = [/^BOOTSTRAP-V6-MIGRATION\.md$/, /^\.changeset\//, /^\.build\/postcss-legacy-responsive\.ts$/, /^\.build\/codemod-responsive-prefix\.ts$/, /^core\/scss\/tests\/legacy-responsive\.test\.mjs$/, /^\.agents\/rules\/v2\.mdc$/, /^\.agents\/agents\/v2-policy-reviewer\.md$/]

const MARKUP = /\.(astro|mdx|md|mdc|json|html|ts|mts|mjs|js)$/

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const paths = args.filter((a) => !a.startsWith('--'))

const tracked = execSync('git ls-files', { encoding: 'utf8' }).trim().split('\n')
const files = (paths.length === 0 ? tracked : tracked.filter((f) => paths.some((p) => f === p || f.startsWith(p.replace(/\/?$/, '/'))))).filter((f) => MARKUP.test(f) && !KEEPS_LEGACY_NAMES.some((re) => re.test(f)))

const renames = new Map(readLegacyClasses().map((name) => [name, prefixedNameOf(name)!]))
// Longest first so `col-md-6` is offered before `col-md`; the boundaries below
// make that unambiguous anyway, but the order keeps the intent obvious.
const names = [...renames.keys()].sort((a, b) => b.length - a.length)
const pattern = new RegExp(String.raw`(?<![\w-])(${names.join('|')})(?![\w-])`, 'g')

let touched = 0
let total = 0
for (const file of files) {
  if (!statSync(file).isFile()) continue
  const before = readFileSync(file, 'utf8')
  let count = 0
  const after = before.replace(pattern, (name) => {
    count++
    return renames.get(name)!
  })
  if (count === 0) continue
  touched++
  total += count
  if (!dry) writeFileSync(file, after)
  console.log(`${count.toString().padStart(4)}  ${file}`)
}
console.log(`\n${dry ? 'would rewrite' : 'rewrote'} ${total} class name(s) in ${touched} file(s)`)
