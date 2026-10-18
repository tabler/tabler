#!/usr/bin/env node
// Finishes a patch release of an older minor, made from a `release/<major>.<minor>` branch
// (for example `release/1.7` once 1.8.0 is the latest release). Run it on that branch once
// the release workflow has put the new version on npm:
//
//   1. refreshes shared/data/sri.json for that version (`generate:sri --wait`),
//   2. commits it and pushes the release branch,
//   3. merges the release branch into `main` when `main` is still on the same minor
//      (docs.tabler.io is built from `main`; a newer minor there keeps its version),
//   4. merges the release branch into `dev`, so the fix and the changelog entry reach the
//      current line.
//
// The merges happen in a temporary worktree, so the current checkout never switches branches.
// A merge conflict stops the script before that push; the error says how to finish by hand.
//
// Run: pnpm run release:hotfix             (does all of the above)
//      pnpm run release:hotfix --dry-run   (refreshes and commits locally, pushes nothing)

import { commitSriHashes, coreVersion, git, mergeAndPush, requireBranch, run } from './release-merge'

const script = 'release:hotfix'
const dryRun = process.argv.includes('--dry-run')

const step = (message: string): void => {
  console.log(`\n${script}: ${message}`)
}

const minorOf = (version: string): string => version.split('.').slice(0, 2).join('.')

const main = (): void => {
  const branch = requireBranch(script, /^release\/\d+\.\d+$/)
  const version = coreVersion()

  if (branch !== `release/${minorOf(version)}`) {
    throw new Error(`${script}: ${branch} holds @tabler/core v${version} - the branch name and the version do not match`)
  }

  step(`updating ${branch} from origin`)
  git(['fetch', 'origin', branch, 'dev', 'main'])
  git(['merge', '--ff-only', `origin/${branch}`])

  step(`refreshing the SRI hashes for @tabler/core v${version}`)
  commitSriHashes(script, version)

  if (dryRun) {
    step('--dry-run: stopping before any push')
    return
  }

  step(`pushing ${branch}`)
  run('git', ['push', 'origin', branch])

  const mainVersion = (JSON.parse(git(['show', 'origin/main:core/package.json'])) as { version: string }).version
  if (minorOf(mainVersion) === minorOf(version)) {
    step(`merging ${branch} into main`)
    mergeAndPush(script, branch, 'main', `Merge ${branch} into main for v${version}`)
  } else {
    step(`main is on v${mainVersion} - skipping the merge into main`)
  }

  step(`merging ${branch} into dev`)
  mergeAndPush(script, branch, 'dev', `Merge ${branch} into dev after v${version}`)

  step(`done - v${version} is released and dev carries the fix`)
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
