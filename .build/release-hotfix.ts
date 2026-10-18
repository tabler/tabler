#!/usr/bin/env node
// Finishes a hotfix release. A hotfix branches off `main` (the last release) and merges back
// into `main`, where the Release workflow publishes the next patch version. `dev` keeps its
// pending minor changesets untouched. Run this on `main` once that workflow has put the new
// version on npm:
//
//   1. refreshes shared/data/sri.json for that version (`generate:sri --wait`),
//   2. commits it and pushes `main` (docs.tabler.io is built from `main`),
//   3. merges `main` into `dev` and pushes `dev`, so the fix, the new version and the
//      changelog entry reach the next minor.
//
// The merge happens in a temporary worktree, so the current checkout (and a dev server running
// from it) never switches branches. A merge conflict stops the script before any push to `dev`;
// merge `main` into `dev` by hand in that case and keep the version from `main`.
//
// Run: pnpm run release:hotfix             (does all of the above)
//      pnpm run release:hotfix --dry-run   (refreshes and commits locally, pushes nothing)

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
  console.log(`\nrelease:hotfix: ${message}`)
}

const { version } = JSON.parse(readFileSync(join(repoRoot, 'core', 'package.json'), 'utf8')) as { version: string }

const main = (): void => {
  if (git(['branch', '--show-current']) !== 'main') {
    throw new Error('release:hotfix: run this on the `main` branch')
  }

  if (git(['status', '--porcelain', '--untracked-files=no']) !== '') {
    throw new Error('release:hotfix: the working tree has uncommitted changes - commit or stash them first')
  }

  step('updating main from origin')
  git(['fetch', 'origin', 'dev', 'main'])
  git(['merge', '--ff-only', 'origin/main'])

  step(`refreshing the SRI hashes for @tabler/core v${version}`)
  run(join(repoRoot, 'node_modules', '.bin', 'tsx'), [join('.build', 'generate-sri.ts'), '--wait'])

  if (git(['status', '--porcelain', '--', sriFile]) === '') {
    console.log(`release:hotfix: ${sriFile} is already up to date`)
  } else {
    git(['commit', '-m', `Update SRI hashes for v${version}`, '--', sriFile])
    console.log(`release:hotfix: committed ${sriFile}`)
  }

  if (dryRun) {
    step('--dry-run: stopping before any push')
    return
  }

  step('pushing main')
  run('git', ['push', 'origin', 'main'])

  step('merging main into dev')
  const worktree = mkdtempSync(join(tmpdir(), 'tabler-dev-'))

  try {
    git(['worktree', 'add', '--detach', worktree, 'origin/dev'])
    try {
      git(['merge', '--no-edit', '-m', `Merge main into dev after v${version}`, 'main'], worktree)
    } catch {
      git(['merge', '--abort'], worktree)
      throw new Error(`release:hotfix: merging main into dev has conflicts - run \`git merge origin/main\` on dev, keep the version from main (v${version}), resolve CHANGELOG.md and push dev`)
    }
    execFileSync('git', ['push', 'origin', 'HEAD:dev'], { cwd: worktree, stdio: 'inherit' })
  } finally {
    git(['worktree', 'remove', '--force', worktree])
    rmSync(worktree, { recursive: true, force: true })
  }

  step(`done - docs.tabler.io deploys v${version} from main and dev carries the hotfix`)
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
