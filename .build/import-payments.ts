#!/usr/bin/env node
// Imports payment provider assets from the tabler/tabler-payments repo, so the
// payments plugin never drifts from the icon source of truth:
//   - core/img/payments/                       <- src/light/*.svg + src/dark/*.svg (as *-dark.svg)
//   - $payment-providers in core/scss/_variables.scss
//   - shared/data/payments.json                <- payments.json (name + logo, demo data)
//
// Source checkout resolution order:
//   1. TABLER_PAYMENTS_DIR env var
//   2. ../tabler-payments (sibling checkout)
//   3. fresh shallow clone into a temp dir (the repo is private — needs git auth)
//
// Run: pnpm run import-payments
// Then: pnpm run generate-tokens — refreshes PaymentProvider in shared/lib/tokens.ts
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const imgDir = join(repoRoot, 'core', 'img', 'payments')
const scssFile = join(repoRoot, 'core', 'scss', '_variables.scss')
const dataFile = join(repoRoot, 'shared', 'data', 'payments.json')

let cloneDir: string | undefined

function resolveSourceDir(): string {
  const candidates = [process.env.TABLER_PAYMENTS_DIR, join(repoRoot, '..', 'tabler-payments')].filter((dir): dir is string => Boolean(dir))
  for (const dir of candidates) {
    if (existsSync(join(dir, 'src', 'light'))) return dir
  }
  cloneDir = mkdtempSync(join(tmpdir(), 'tabler-payments-'))
  console.log('No local checkout found, cloning tabler/tabler-payments…')
  execFileSync('git', ['clone', '--depth', '1', 'https://github.com/tabler/tabler-payments.git', cloneDir], { stdio: 'inherit' })
  return cloneDir
}

// Provider order everywhere follows the SVG filename (with extension), so
// 'amazon-pay' sorts before 'amazon' — same as an `ls` of the source dir.
const svgNames = (dir: string) =>
  readdirSync(dir)
    .filter((file) => file.endsWith('.svg'))
    .sort()
    .map((file) => file.slice(0, -'.svg'.length))

try {
  const sourceDir = resolveSourceDir()
  const lightDir = join(sourceDir, 'src', 'light')
  const darkDir = join(sourceDir, 'src', 'dark')
  const metaFile = join(sourceDir, 'payments.json')
  for (const path of [lightDir, darkDir, metaFile]) {
    if (!existsSync(path)) throw new Error(`import-payments: missing ${path} — not a tabler-payments checkout?`)
  }

  const providers = svgNames(lightDir)
  const darkProviders = svgNames(darkDir)
  if (providers.join() !== darkProviders.join()) {
    const light = new Set(providers)
    const dark = new Set(darkProviders)
    const onlyLight = providers.filter((name) => !dark.has(name))
    const onlyDark = darkProviders.filter((name) => !light.has(name))
    throw new Error(`import-payments: light/dark sets differ (only light: ${onlyLight.join(', ') || '—'}; only dark: ${onlyDark.join(', ') || '—'})`)
  }

  // 1. core/img/payments — clean replace, dark variants get a `-dark` suffix
  const previous = existsSync(imgDir) ? new Set(svgNames(imgDir).map((name) => name.replace(/-dark$/, ''))) : new Set<string>()
  rmSync(imgDir, { recursive: true, force: true })
  mkdirSync(imgDir, { recursive: true })
  for (const name of providers) {
    copyFileSync(join(lightDir, `${name}.svg`), join(imgDir, `${name}.svg`))
    copyFileSync(join(darkDir, `${name}.svg`), join(imgDir, `${name}-dark.svg`))
  }

  // 2. $payment-providers in core/scss/_variables.scss
  const scss = readFileSync(scssFile, 'utf8')
  const listPattern = /(\$payment-providers: \(\n)[\s\S]*?(\n\);)/
  if (!listPattern.test(scss)) throw new Error(`import-payments: $payment-providers list not found in ${scssFile}`)
  const listBody = providers.map((name) => `  '${name}'`).join(',\n')
  writeFileSync(scssFile, scss.replace(listPattern, `$1${listBody}$2`))

  // 3. shared/data/payments.json — demo data keeps its `{ name, logo }` shape
  const meta = JSON.parse(readFileSync(metaFile, 'utf8')) as { name: string; logo: string }[]
  const names = new Map(meta.map((entry) => [entry.logo, entry.name]))
  for (const logo of names.keys()) {
    if (!providers.includes(logo)) console.warn(`import-payments: payments.json entry '${logo}' has no SVG — skipped`)
  }
  const data = providers.map((logo) => {
    const name = names.get(logo)
    if (!name) console.warn(`import-payments: no payments.json metadata for '${logo}' — using the slug as name`)
    return { name: name ?? logo, logo }
  })
  writeFileSync(dataFile, `${JSON.stringify(data, null, 2)}\n`)

  const added = providers.filter((name) => !previous.has(name))
  const removed = [...previous].filter((name) => !providers.includes(name))
  console.log(`Imported ${providers.length} payment providers from ${relative(repoRoot, sourceDir)} (${added.length} added, ${removed.length} removed)`)
  if (added.length) console.log(`  added: ${added.join(', ')}`)
  if (removed.length) console.log(`  removed: ${removed.join(', ')}`)
  console.log('Now run `pnpm run generate-tokens` to refresh shared/lib/tokens.ts')
} finally {
  if (cloneDir) rmSync(cloneDir, { recursive: true, force: true })
}
