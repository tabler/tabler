#!/usr/bin/env node
// Publishes a release to docs.tabler.io, which is built from `main`. Run it on `dev` once the
// release workflow has put the new version on npm:
//
//   1. refreshes shared/data/sri.json for that version (`generate:sri --wait`),
//   2. commits it and pushes `dev`,
//   3. merges `dev` into `main` and pushes `main`.
//
// The merge happens in a temporary worktree, so the current checkout (and a dev server running
// from it) never switches branches.
//
// Run: pnpm run release:main             (does all of the above)
//      pnpm run release:main --dry-run   (refreshes and commits locally, pushes nothing)

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const sriFile = 'shared/data/sri.json'
const dryRun = process.argv.includes('--dry-run')

const git = (args: string[], cwd = repoRoot): string => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
const run = (command: string, args: string[]): void => {
  execFileSync(command, args, { cwd: repoRoot, stdio: 'inherit' })
}
const step = (message: string): void => {
  console.log(`\nrelease:main: ${message}`)
}

const { version } = JSON.parse(readFileSync(join(repoRoot, 'core', 'package.json'), 'utf8')) as { version: string }

const main = (): void => {
  if (git(['branch', '--show-current']) !== 'dev') {
    throw new Error('release:main: run this on the `dev` branch')
  }

  if (git(['status', '--porcelain', '--untracked-files=no']) !== '') {
    throw new Error('release:main: the working tree has uncommitted changes - commit or stash them first')
  }

  step('updating dev from origin')
  git(['fetch', 'origin', 'dev', 'main'])
  git(['merge', '--ff-only', 'origin/dev'])

  step(`refreshing the SRI hashes for @tabler/core v${version}`)
  run(join(repoRoot, 'node_modules', '.bin', 'tsx'), [join('.build', 'generate-sri.ts'), '--wait'])

  if (git(['status', '--porcelain', '--', sriFile]) === '') {
    console.log(`release:main: ${sriFile} is already up to date`)
  } else {
    git(['commit', '-m', `Update SRI hashes for v${version}`, '--', sriFile])
    console.log(`release:main: committed ${sriFile}`)
  }

  if (dryRun) {
    step('--dry-run: stopping before any push')
    return
  }

  step('pushing dev')
  run('git', ['push', 'origin', 'dev'])

  step('merging dev into main')
  const worktree = mkdtempSync(join(tmpdir(), 'tabler-main-'))

  try {
    git(['worktree', 'add', '--detach', worktree, 'origin/main'])
    git(['merge', '--no-edit', '-m', `Merge dev into main for v${version}`, 'dev'], worktree)
    execFileSync('git', ['push', 'origin', 'HEAD:main'], { cwd: worktree, stdio: 'inherit' })
  } finally {
    git(['worktree', 'remove', '--force', worktree])
    rmSync(worktree, { recursive: true, force: true })
  }

  step(`done - docs.tabler.io deploys v${version} from main`)
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
