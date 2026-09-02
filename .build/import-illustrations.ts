#!/usr/bin/env node
// Imports illustrations from the tabler/tabler-illustrations repo: the light and
// dark PNGs, the name list and the version. The free inline SVGs in
// shared/data/free-illustrations.json are hand-picked and stay as they are.
//
// Run: pnpm run import:illustrations
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const imageDir = join(repoRoot, 'shared', 'static', 'illustrations')
const dataFile = join(repoRoot, 'shared', 'data', 'illustrations.json')
const infoFile = join(repoRoot, 'shared', 'data', 'illustrations-info.json')

let cloneDir: string | undefined

function resolveSourceDir(): string {
  const candidates = [process.env.TABLER_ILLUSTRATIONS_DIR, join(repoRoot, '..', 'tabler-illustrations')].filter((dir): dir is string => Boolean(dir))
  for (const dir of candidates) {
    if (existsSync(join(dir, 'dist', 'png', 'light'))) return dir
  }
  cloneDir = mkdtempSync(join(tmpdir(), 'tabler-illustrations-'))
  console.log('No local checkout found, cloning tabler/tabler-illustrations…')
  execFileSync('git', ['clone', '--depth', '1', 'https://github.com/tabler/tabler-illustrations.git', cloneDir], { stdio: 'inherit' })
  return cloneDir
}

const pngNames = (dir: string) =>
  readdirSync(dir)
    .filter((file) => file.endsWith('.png'))
    .sort()
    .map((file) => file.slice(0, -'.png'.length))

try {
  const sourceDir = resolveSourceDir()
  const lightDir = join(sourceDir, 'dist', 'png', 'light')
  const darkDir = join(sourceDir, 'dist', 'png', 'dark')
  const packageFile = join(sourceDir, 'package.json')
  for (const path of [lightDir, darkDir, packageFile]) {
    if (!existsSync(path)) throw new Error(`import-illustrations: missing ${path} — not a tabler-illustrations checkout?`)
  }

  const illustrations = pngNames(lightDir)
  const darkIllustrations = pngNames(darkDir)
  if (illustrations.join() !== darkIllustrations.join()) {
    const light = new Set(illustrations)
    const dark = new Set(darkIllustrations)
    const onlyLight = illustrations.filter((name) => !dark.has(name))
    const onlyDark = darkIllustrations.filter((name) => !light.has(name))
    throw new Error(`import-illustrations: light/dark sets differ (only light: ${onlyLight.join(', ') || '—'}; only dark: ${onlyDark.join(', ') || '—'})`)
  }

  const previous = existsSync(join(imageDir, 'light')) ? new Set(pngNames(join(imageDir, 'light'))) : new Set<string>()
  for (const variant of ['light', 'dark'] as const) {
    const targetDir = join(imageDir, variant)
    rmSync(targetDir, { recursive: true, force: true })
    mkdirSync(targetDir, { recursive: true })
    for (const name of illustrations) {
      copyFileSync(join(variant === 'light' ? lightDir : darkDir, `${name}.png`), join(targetDir, `${name}.png`))
    }
  }

  writeFileSync(dataFile, JSON.stringify(illustrations))

  const { version }: { version: string } = JSON.parse(readFileSync(packageFile, 'utf8'))
  writeFileSync(infoFile, JSON.stringify({ version, count: illustrations.length }))

  const added = illustrations.filter((name) => !previous.has(name))
  const removed = [...previous].filter((name) => !illustrations.includes(name))
  console.log(`Imported ${illustrations.length} illustrations v${version} from ${relative(repoRoot, sourceDir)} (${added.length} added, ${removed.length} removed)`)
  if (added.length) console.log(`  added: ${added.join(', ')}`)
  if (removed.length) console.log(`  removed: ${removed.join(', ')}`)
} finally {
  if (cloneDir) rmSync(cloneDir, { recursive: true, force: true })
}
