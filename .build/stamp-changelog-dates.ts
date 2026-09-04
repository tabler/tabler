#!/usr/bin/env node
// Adds the release date to the heading `changeset version` has just written, so
// every entry in a changelog reads `## 1.5.0 - 2026-09-05`.
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

  // Only a heading without a date, so running this twice changes nothing.
  const lines = content.split('\n')
  const index = lines.findIndex((line) => line.trim() === `## ${version}`)
  if (index === -1) continue

  lines[index] = `## ${version} - ${today}`
  writeFileSync(changelog, lines.join('\n'))
  stamped.push(`${name}/CHANGELOG.md: ## ${version} - ${today}`)
}

console.log(stamped.length > 0 ? stamped.join('\n') : 'Nothing to stamp.')
