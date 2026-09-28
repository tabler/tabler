// Fails when the build drops something the last release shipped.
//
// The README promises semver: a project on `^1.0.0` updates without touching its
// own code. A removed class, custom property, Sass variable or file breaks that
// promise, and nothing else notices — the build is green, the tests pass, and
// the first report comes from a user (#3108). This check downloads the last
// release of `@tabler/core` from npm and compares its public surface with the
// working tree:
//
//   css      classes and custom properties of every dist/css/*.css
//   sass     `$variables`, and `@function` / `@mixin` names and parameters, in scss/
//   sass-type  a variable that was a Sass colour and is now a string: `darken($x, 5%)`
//            in a project stops compiling, and no alias can fix a type
//   js       top-level exports of dist/js/tabler.esm.js
//   file     every path under dist/ (libs, images, types), and scss/ partials
//
// Known breaks are listed in compat-baseline.txt. A line ending in
// `# accepted: <why>` is a decision; a line without it is a break still to fix.
// The check fails on a break that is not listed, and on a listed one that no
// longer breaks, so fixing one means deleting its line. `--strict` also fails
// while any unaccepted line is left: the release runs it that way.
//
// Needs `core/dist`, so run it after the core build. See the `backward-compat`
// skill for how to fix what it reports.
//
// Usage: tsx .build/check-compat.ts [--strict]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { compileString } from 'sass'
import { pkgName, releasedPackage } from './released-package'

const coreDir = 'core'
const baselineFile = '.build/compat-baseline.txt'
const strict = process.argv.includes('--strict')

function walk(root: string, dir = root): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(root, path) : [relative(root, path)]
  })
}

const matches = (source: string, pattern: RegExp): Set<string> => new Set([...source.matchAll(pattern)].map((match) => match[1]!))

// --- css -------------------------------------------------------------------

// A class is a dot followed by an identifier; `1.5rem` and `url(a.svg)` are not.
const cssClass = /(?<![\w)\]"'-])\.(-?[a-zA-Z_][\w-]*)/g
// Every custom property, not only `--tblr-*`: a vendor name that gained the
// prefix (`--litepicker-*`) is as broken as one that disappeared.
const cssProperty = /(?<![\w-])(--[a-zA-Z][\w-]*)/g

const stripCssNoise = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, 'url()')

function cssBreaks(released: string, current: string): string[] {
  const breaks: string[] = []
  const sheets = walk(join(released, 'dist/css')).filter((file) => file.endsWith('.css') && !file.includes('.min.') && !file.includes('.rtl.'))

  for (const sheet of sheets) {
    const currentPath = join(current, 'dist/css', sheet)
    if (!existsSync(currentPath)) continue // reported by fileBreaks
    const before = stripCssNoise(readFileSync(join(released, 'dist/css', sheet), 'utf8'))
    const after = stripCssNoise(readFileSync(currentPath, 'utf8'))

    const classesAfter = matches(after, cssClass)
    for (const name of matches(before, cssClass)) {
      if (!classesAfter.has(name)) breaks.push(`css:${sheet}:.${name}`)
    }
    const propertiesAfter = matches(after, cssProperty)
    for (const name of matches(before, cssProperty)) {
      if (!propertiesAfter.has(name)) breaks.push(`css:${sheet}:${name}`)
    }
  }
  return breaks
}

// --- sass ------------------------------------------------------------------

type Callable = { kind: string; name: string; params: string[] }

const sassVariable = /^\$([\w-]+)\s*:/gm
const sassCallable = /^@(function|mixin)\s+([\w-]+)\s*(?:\(([\s\S]*?)\))?\s*\{/gm

function splitParams(source: string | undefined): string[] {
  if (!source) return []
  const params: string[] = []
  let depth = 0
  let current = ''
  for (const char of source) {
    if (char === '(') depth++
    if (char === ')') depth--
    if (char === ',' && depth === 0) {
      params.push(current)
      current = ''
    } else {
      current += char
    }
  }
  params.push(current)
  // `$color: rgba($white, 0.15)` → `$color`; `$args...` → `$args...`
  return params.map((param) => param.trim().split(':')[0]!.trim()).filter(Boolean)
}

function sassSurface(root: string): { variables: Set<string>; callables: Map<string, Callable> } {
  const variables = new Set<string>()
  const callables = new Map<string, Callable>()
  for (const file of walk(join(root, 'scss'))) {
    if (!file.endsWith('.scss') || file.startsWith('tests/')) continue
    const source = readFileSync(join(root, 'scss', file), 'utf8').replace(/\/\/.*$/gm, '')
    for (const name of matches(source, sassVariable)) variables.add(name)
    for (const [, kind, name, params] of source.matchAll(sassCallable)) {
      if (name!.startsWith('_') || name!.startsWith('-')) continue // private by convention
      callables.set(`${kind} ${name}`, { kind: kind!, name: name!, params: splitParams(params) })
    }
  }
  return { variables, callables }
}

function sassBreaks(released: string, current: string): string[] {
  const breaks: string[] = []
  const before = sassSurface(released)
  const after = sassSurface(current)

  for (const name of before.variables) {
    if (!after.variables.has(name)) breaks.push(`sass:$${name}`)
  }
  for (const [key, callable] of before.callables) {
    const now = after.callables.get(key)
    if (!now) {
      breaks.push(`sass:@${callable.kind} ${callable.name}`)
      continue
    }
    // A caller passes arguments by position or by keyword: an old parameter has
    // to keep both its name and its place. New ones go after it.
    callable.params.forEach((param, index) => {
      if (now.params[index] !== param) breaks.push(`sass:@${callable.kind} ${callable.name}(${param})`)
    })
  }
  return breaks
}

// --- sass types ------------------------------------------------------------

// The type of every variable the config module exposes, read by Sass itself.
function sassTypes(root: string): Map<string, string> {
  const source = `
    @use 'sass:meta';
    @use 'scss/config' as config;
    a {
      @each $name, $value in meta.module-variables('config') {
        --#{$name}: #{meta.type-of($value)};
      }
    }`
  const { css } = compileString(source, { loadPaths: [root, 'node_modules'], logger: { warn() {}, debug() {} } })
  return new Map([...css.matchAll(/--([\w-]+): (\w+);/g)].map((match) => [match[1]!, match[2]!]))
}

function sassTypeBreaks(released: string, current: string): string[] {
  const after = sassTypes(current)
  return [...sassTypes(released)].filter(([name, type]) => type === 'color' && after.has(name) && after.get(name) !== 'color').map(([name]) => `sass-type:$${name}`)
}

// --- js --------------------------------------------------------------------

function esmExports(file: string): Set<string> {
  if (!existsSync(file)) return new Set()
  const source = readFileSync(file, 'utf8')
  const names = new Set<string>()
  for (const [, list] of source.matchAll(/^export\s*\{([^}]*)\}/gm)) {
    for (const entry of list!.split(',')) {
      const name = entry
        .trim()
        .split(/\s+as\s+/)
        .pop()
      if (name) names.add(name)
    }
  }
  for (const name of matches(source, /^export\s+(?:const|let|var|function|class)\s+([\w$]+)/gm)) names.add(name)
  if (/^export\s+default\b/m.test(source)) names.add('default')
  return names
}

function jsBreaks(released: string, current: string): string[] {
  const breaks: string[] = []
  for (const bundle of ['tabler.esm.js', 'tabler-theme.esm.js']) {
    const after = esmExports(join(current, 'dist/js', bundle))
    for (const name of esmExports(join(released, 'dist/js', bundle))) {
      if (!after.has(name)) breaks.push(`js:${bundle}:${name}`)
    }
  }
  return breaks
}

// --- files -----------------------------------------------------------------

function fileBreaks(released: string, current: string): string[] {
  const now = new Set([...walk(join(current, 'dist')).map((file) => `dist/${file}`), ...walk(join(current, 'scss')).map((file) => `scss/${file}`)])
  const before = [...walk(join(released, 'dist')).map((file) => `dist/${file}`), ...walk(join(released, 'scss')).map((file) => `scss/${file}`)]
  return before.filter((file) => !file.endsWith('.map') && !file.startsWith('scss/tests/') && !now.has(file)).map((file) => `file:${file}`)
}

// --- main ------------------------------------------------------------------

async function main() {
  if (!existsSync(join(coreDir, 'dist/css/tabler.css'))) {
    throw new Error('core/dist is missing — build core first: pnpm --filter @tabler/core build')
  }

  const { dir: released, version } = await releasedPackage()
  const breaks = new Set([...cssBreaks(released, coreDir), ...sassBreaks(released, coreDir), ...sassTypeBreaks(released, coreDir), ...jsBreaks(released, coreDir), ...fileBreaks(released, coreDir)])

  const baseline = new Map<string, boolean>() // key → accepted
  for (const line of readFileSync(baselineFile, 'utf8').split('\n')) {
    const [entry, comment = ''] = line.split(' # ')
    const key = entry!.trim()
    if (!key || key.startsWith('#')) continue
    baseline.set(key, comment.trim().startsWith('accepted:'))
  }

  const added = [...breaks].filter((key) => !baseline.has(key)).sort()
  const fixed = [...baseline.keys()].filter((key) => !breaks.has(key))
  const todo = [...baseline].filter(([key, accepted]) => !accepted && breaks.has(key)).map(([key]) => key)

  for (const key of added) console.error(`✗ ${key}`)
  if (added.length > 0) {
    console.error(`\n${added.length} new ${added.length === 1 ? 'break' : 'breaks'} against ${pkgName}@${version}. Keep the old name working as a deprecated alias — see the backward-compat skill.`)
  }
  if (fixed.length > 0) {
    console.error(`\nNo longer ${fixed.length === 1 ? 'a break' : 'breaks'} — delete from ${baselineFile}:\n${fixed.map((key) => `  ${key}`).join('\n')}`)
  }
  if (strict && todo.length > 0) {
    console.error(`\n--strict: ${todo.length} listed ${todo.length === 1 ? 'break is' : 'breaks are'} neither fixed nor accepted:\n${todo.map((key) => `  ${key}`).join('\n')}`)
  }
  if (added.length > 0 || fixed.length > 0 || (strict && todo.length > 0)) process.exit(1)

  const accepted = baseline.size - todo.length
  console.log(`OK — nothing new is missing compared with ${pkgName}@${version} (${todo.length} known breaks still to fix, ${accepted} accepted, in ${baselineFile}).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
