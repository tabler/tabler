#!/usr/bin/env node
// Adds the release date under the heading `changeset version` has just written,
// so every entry in a changelog reads:
//
//   ## 1.5.0
//
//   _2026-09-05_
//
// The date is a line of its own, not part of the heading: changesets/action
// builds the version pull request body from the block under the heading whose
// text is exactly the version, and a `## 1.5.0 - 2026-09-05` heading made it
// fall back to the whole file, which blew the body size limit (#2960).
//
// The date is the day the version pull request was last regenerated, which the
// bot redoes on every push to dev. It can therefore be a day or two before the
// release when nothing lands in between.
//
// Run: pnpm run stamp-changelog-dates (part of `pnpm run version`)

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

const packages = ['core', 'preview', 'docs']

interface PackageJson {
  version: string
}

const today = new Date().toISOString().slice(0, 10)
const stamped: string[] = []

for (const name of packages) {
  const changelog = join(repoRoot, name, 'CHANGELOG.md')
  if (!existsSync(changelog)) continue

  const { version } = JSON.parse(readFileSync(join(repoRoot, name, 'package.json'), 'utf8')) as PackageJson
  const content = readFileSync(changelog, 'utf8')

  const lines = content.split('\n')
  const index = lines.findIndex((line) => line.trim() === `## ${version}`)
  if (index === -1) continue

  // Already stamped, so running this twice changes nothing.
  if (/^_\d{4}-\d{2}-\d{2}_$/.test(lines[index + 2] ?? '')) continue

  lines.splice(index + 1, 0, '', `_${today}_`)
  writeFileSync(changelog, lines.join('\n'))
  stamped.push(`${name}/CHANGELOG.md: ## ${version} (${today})`)
}

console.log(stamped.length > 0 ? stamped.join('\n') : 'Nothing to stamp.')
