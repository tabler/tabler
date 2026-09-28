#!/usr/bin/env node
// Keeps shared/data/open-source.json — the attribution table on the docs page
// /ui/getting-started/references — in step with the libraries Tabler actually
// ships. The list is hand-written, so without this check a new dependency
// lands unattributed and a removed one lingers as a claim that is no longer true.
//
// Two sources say what ships:
//   - core/libs.json: libraries copied to dist/libs or loaded from a CDN
//   - bare imports in core/js/src/**: packages bundled into tabler.js
//
// An attribution names its library with "npm" (a package) or "lib" (a key in
// core/libs.json, for a library loaded straight from a CDN). Vendored code has
// neither, so it is listed in BUNDLED_SOURCE; a libs.json entry that is not
// open source at all is listed in NOT_OPEN_SOURCE.
// Run: pnpm run check:open-source

import { readFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

// Attributed without a package: the source lives in this repo.
const BUNDLED_SOURCE = new Set(['Bootstrap'])

// Shipped, but nothing to attribute: a proprietary service loaded by url.
const NOT_OPEN_SOURCE = new Set(['google-maps'])

type Attribution = { name: string; npm?: string; lib?: string; url: string; description: string; license: string }
type Lib = { npm?: string }

const attributionsPath = join(repoRoot, 'shared', 'data', 'open-source.json')
const attributions = JSON.parse(readFileSync(attributionsPath, 'utf8')) as Attribution[]
const libs = JSON.parse(readFileSync(join(repoRoot, 'core', 'libs.json'), 'utf8')) as Record<string, Lib>

// A bare import names a package: `imask`, `@popperjs/core`, `plyr/dist/plyr.js`.
// Scoped packages keep two segments, everything else keeps the first.
const packageOf = (specifier: string): string => {
  const parts = specifier.split('/')
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : (parts[0] ?? specifier)
}

// A library is identified by its package name, or by its libs.json key when it
// has none, so the two kinds never collide.
const shipped = new Map<string, string>()
const ship = (id: string, source: string): void => {
  if (!shipped.has(id)) {
    shipped.set(id, source)
  }
}

for (const [key, lib] of Object.entries(libs)) {
  if (NOT_OPEN_SOURCE.has(key)) {
    continue
  }

  ship(lib.npm ? `npm:${lib.npm}` : `lib:${key}`, `core/libs.json (${key})`)
}

for (const file of sync(join(repoRoot, 'core', 'js', 'src', '**', '*.ts'))) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(/^\s*import\s[^'"]*from\s+['"]([^'".][^'"]*)['"]/gm)) {
    const specifier = match[1] ?? ''
    if (!specifier.startsWith('node:')) {
      ship(`npm:${packageOf(specifier)}`, relative(repoRoot, file))
    }
  }
}

const errors: string[] = []
const attributed = new Map<string, Attribution>()

for (const entry of attributions) {
  if (!entry.name || !entry.url || !entry.description || !entry.license) {
    errors.push(`${entry.name || '(unnamed entry)'}: name, url, description and license are all required`)
    continue
  }

  const id = entry.npm ? `npm:${entry.npm}` : entry.lib ? `lib:${entry.lib}` : null

  if (!id) {
    if (!BUNDLED_SOURCE.has(entry.name)) {
      errors.push(`${entry.name}: add an "npm" or "lib" field, or add the name to BUNDLED_SOURCE in this script`)
    }

    continue
  }

  if (attributed.has(id)) {
    errors.push(`${entry.name}: ${id} is attributed twice`)
    continue
  }

  attributed.set(id, entry)

  if (!shipped.has(id)) {
    errors.push(`${entry.name}: ${id} is not shipped any more — remove the entry`)
  }
}

for (const [id, source] of shipped) {
  if (!attributed.has(id)) {
    errors.push(`${id} ships from ${source} but has no entry in shared/data/open-source.json`)
  }
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} attribution problem(s):\n`)
  for (const error of errors.sort()) console.error(`  ${error}`)
  console.error('\nThe list renders on the docs page /ui/getting-started/references.')
  process.exit(1)
}

console.log(`OK — ${attributions.length} attributions, ${shipped.size} shipped packages, nothing missing or stale.`)
