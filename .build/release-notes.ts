#!/usr/bin/env node
// Builds the body of the GitHub release for the version in core/package.json.
//
// `changesets` writes one changelog per package, and a changeset that touches
// several packages lands in each of them. So the entries are grouped by the
// package they belong to and shown once: core first, then whatever preview adds
// on top, then whatever is left in docs. The optional intro from
// .github/release-notes/<version>.md goes above everything.
//
// Run: pnpm run release-notes [outputFile]

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

const sections = [
  { dir: 'core', title: 'Core changes' },
  { dir: 'preview', title: 'Preview changes' },
  { dir: 'docs', title: 'Docs changes' },
]

interface PackageJson {
  version: string
}

const { version } = JSON.parse(readFileSync(join(repoRoot, 'core', 'package.json'), 'utf8')) as PackageJson

// The `## <version>` block of a changelog, without its heading.
const versionBlock = (changelog: string): string => {
  const lines = changelog.split('\n')
  const start = lines.findIndex((line) => line.trim() === `## ${version}`)
  if (start === -1) return ''

  const rest = lines.slice(start + 1)
  const end = rest.findIndex((line) => line.startsWith('## '))
  return (end === -1 ? rest : rest.slice(0, end)).join('\n')
}

// Every top-level bullet, with the lines `changelog.cjs` indented under it.
// The `### Minor Changes` / `### Patch Changes` split is dropped: the release
// lists a package's changes as one flat set.
const bullets = (block: string): string[] => {
  const entries: string[] = []

  for (const line of block.split('\n')) {
    if (line.startsWith('- ')) entries.push(line)
    else if (line.startsWith('  ') && entries.length > 0) entries[entries.length - 1] += `\n${line}`
  }

  return entries
}

const seen = new Set<string>()
const parts: string[] = []

const intro = join(repoRoot, '.github', 'release-notes', `${version}.md`)
if (existsSync(intro)) parts.push(readFileSync(intro, 'utf8').trim())

for (const { dir, title } of sections) {
  const changelog = join(repoRoot, dir, 'CHANGELOG.md')
  if (!existsSync(changelog)) continue

  const entries = bullets(versionBlock(readFileSync(changelog, 'utf8'))).filter((entry) => {
    if (seen.has(entry)) return false
    seen.add(entry)
    return true
  })

  if (entries.length > 0) parts.push(`## ${title}\n\n${entries.join('\n')}`)
}

const body = `${parts.join('\n\n')}\n`
const outputFile = process.argv[2]

if (outputFile) writeFileSync(outputFile, body)
else process.stdout.write(body)
