#!/usr/bin/env node
// Imports the flags from the tabler/tabler-flags repo: the source SVGs (plain
// variant, minified with svgo), the $flag-countries list and the demo data.
//
// A flag is keyed by its ISO code in lower case (`pl`, `sh-ac`) and, when it
// has none, by its slug (`african-union`). Aliases in flags.json (Svalbard
// flies the Norwegian flag) get a copy of the artwork under their own code.
//
// Run: pnpm run import:flags
// Then: pnpm run generate:tokens — refreshes FlagCountry in shared/lib/tokens.ts
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimizeSvgDir } from './optimize-svg.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const imgDir = join(repoRoot, 'core', 'img', 'flags')
const scssFile = join(repoRoot, 'core', 'scss', '_variables.scss')
const deprecatedScssFile = join(repoRoot, 'core', 'scss', '_variables-deprecated.scss')
const dataFile = join(repoRoot, 'shared', 'data', 'flags.json')

type FlagMeta = { name: string; category: string; iso?: string; alias?: string }
type Flag = { code: string; slug: string; name: string; category: string; iso: string | null }

let cloneDir: string | undefined

// In a git worktree the main checkout lives elsewhere, so also look next to it.
function mainCheckoutRoot(): string | undefined {
  try {
    const gitDir = execFileSync('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], { cwd: repoRoot, encoding: 'utf8' }).trim()
    return dirname(gitDir)
  } catch {
    return undefined
  }
}

function resolveSourceDir(): string {
  const mainRoot = mainCheckoutRoot()
  const candidates = [process.env.TABLER_FLAGS_DIR, join(repoRoot, '..', 'tabler-flags'), mainRoot && join(mainRoot, '..', 'tabler-flags')].filter((dir): dir is string => Boolean(dir))
  for (const dir of candidates) {
    if (existsSync(join(dir, 'src')) && existsSync(join(dir, 'flags.json'))) return dir
  }
  cloneDir = mkdtempSync(join(tmpdir(), 'tabler-flags-'))
  console.log('No local checkout found, cloning tabler/tabler-flags…')
  execFileSync('git', ['clone', '--depth', '1', 'https://github.com/tabler/tabler-flags.git', cloneDir], { stdio: 'inherit' })
  return cloneDir
}

const svgNames = (dir: string) =>
  readdirSync(dir)
    .filter((file) => file.endsWith('.svg'))
    .sort()
    .map((file) => file.slice(0, -'.svg'.length))

// Reads the `$name: (` … `);` map or list in a Sass file and returns its entries.
function readSassEntries(scss: string, name: string, file: string): string[] {
  const pattern = new RegExp(`\\$${name}: \\(\\n([\\s\\S]*?)\\n\\)( !default)?;`)
  const match = scss.match(pattern)
  if (!match) throw new Error(`import-flags: $${name} not found in ${file}`)
  return match[1]
    .split('\n')
    .map((line) => line.trim().replace(/,$/, ''))
    .filter(Boolean)
}

function replaceSassEntries(scss: string, name: string, entries: string[], file: string): string {
  const pattern = new RegExp(`(\\$${name}: \\(\\n)[\\s\\S]*?(\\n\\)(?: !default)?;)`)
  if (!pattern.test(scss)) throw new Error(`import-flags: $${name} not found in ${file}`)
  return scss.replace(pattern, `$1${entries.map((entry) => `  ${entry}`).join(',\n')}$2`)
}

try {
  const sourceDir = resolveSourceDir()
  const srcDir = join(sourceDir, 'src')
  const metaFile = join(sourceDir, 'flags.json')
  const meta = JSON.parse(readFileSync(metaFile, 'utf8')) as Record<string, FlagMeta>

  const flags: Flag[] = []
  const codes = new Map<string, string>()
  for (const [slug, { name, category, iso, alias }] of Object.entries(meta)) {
    const source = alias ?? slug
    if (!existsSync(join(srcDir, `${source}.svg`))) {
      console.warn(`import-flags: '${slug}' has no SVG in ${relative(repoRoot, srcDir)} — skipped`)
      continue
    }
    const code = (iso ?? slug).toLowerCase()
    const taken = codes.get(code)
    if (taken) throw new Error(`import-flags: code '${code}' is used by both '${taken}' and '${slug}'`)
    codes.set(code, slug)
    flags.push({ code, slug, name, category, iso: iso ?? null })
  }
  flags.sort((a, b) => a.code.localeCompare(b.code))

  const stray = svgNames(srcDir).filter((slug) => !meta[slug])
  if (stray.length) console.warn(`import-flags: SVGs not in flags.json, ignored: ${stray.join(', ')}`)

  // Old codes from before the tabler-flags import. They keep their class and
  // their file as copies of the flag that replaced them.
  const deprecatedScss = readFileSync(deprecatedScssFile, 'utf8')
  const aliases = readSassEntries(deprecatedScss, 'flag-country-aliases', deprecatedScssFile).map((entry) => {
    const match = entry.match(/^'([^']+)': '([^']+)'$/)
    if (!match) throw new Error(`import-flags: cannot parse $flag-country-aliases entry: ${entry}`)
    return { from: match[1], to: match[2] }
  })
  for (const { from, to } of aliases) {
    if (!codes.has(to)) throw new Error(`import-flags: alias '${from}' points to unknown flag '${to}'`)
    if (codes.has(from)) throw new Error(`import-flags: alias '${from}' is also a flag in flags.json — drop the alias`)
  }

  const previous = existsSync(imgDir) ? new Set(svgNames(imgDir)) : new Set<string>()
  rmSync(imgDir, { recursive: true, force: true })
  mkdirSync(imgDir, { recursive: true })
  for (const { code, slug } of flags) {
    copyFileSync(join(srcDir, `${meta[slug].alias ?? slug}.svg`), join(imgDir, `${code}.svg`))
  }
  for (const { from, to } of aliases) {
    copyFileSync(join(imgDir, `${to}.svg`), join(imgDir, `${from}.svg`))
  }
  optimizeSvgDir(imgDir)

  const scss = readFileSync(scssFile, 'utf8')
  writeFileSync(
    scssFile,
    replaceSassEntries(
      scss,
      'flag-countries',
      flags.map(({ code }) => `'${code}'`),
      scssFile,
    ),
  )

  const data = [...flags].sort((a, b) => a.name.localeCompare(b.name)).map(({ name, code, category }) => ({ name, flag: code, category }))
  writeFileSync(dataFile, `${JSON.stringify(data, null, 2)}\n`)

  const current = new Set(flags.map(({ code }) => code))
  const added = flags.filter(({ code }) => !previous.has(code)).map(({ code }) => code)
  const removed = [...previous].filter((code) => !current.has(code) && !aliases.some(({ from }) => from === code))
  console.log(`Imported ${flags.length} flags from ${relative(repoRoot, sourceDir)} (${added.length} added, ${removed.length} removed, ${aliases.length} deprecated aliases kept)`)
  if (added.length) console.log(`  added: ${added.join(', ')}`)
  if (removed.length) console.log(`  removed: ${removed.join(', ')}`)
  console.log('Now run `pnpm run generate:tokens` to refresh shared/lib/tokens.ts')
} finally {
  if (cloneDir) rmSync(cloneDir, { recursive: true, force: true })
}
