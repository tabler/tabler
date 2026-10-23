#!/usr/bin/env node
// Publishes a release to docs.tabler.io, which is built from `main`. Run it on `dev` once the
// release workflow has put the new version on npm:
//
//   1. refreshes shared/data/sri.json for that version (`generate:sri --wait`) and the public
//      skills in skills/ that quote those hashes,
//   2. commits them and pushes `dev`,
//   3. merges `dev` into `main` and pushes `main`,
//   4. merges `dev` into `next`, when that branch exists, so the next minor carries the fix.
//
// The merges happen in a temporary worktree, so the current checkout (and a dev server running
// from it) never switches branches. A merge conflict stops the script before that push; the
// error says how to finish the merge by hand.
//
// Run: pnpm run release:main             (does all of the above)
//      pnpm run release:main --dry-run   (refreshes and commits locally, pushes nothing)

import { commitSriHashes, coreVersion, fetchBranchIfExists, git, mergeAndPush, requireBranch, run } from './release-merge'

const script = 'release:main'
const dryRun = process.argv.includes('--dry-run')

const step = (message: string): void => {
  console.log(`\n${script}: ${message}`)
}

const main = (): void => {
  requireBranch(script, 'dev')
  const version = coreVersion()

  step('updating dev from origin')
  git(['fetch', 'origin', 'dev', 'main'])
  git(['merge', '--ff-only', 'origin/dev'])

  step(`refreshing the SRI hashes for @tabler/core v${version}`)
  commitSriHashes(script, version)

  if (dryRun) {
    step('--dry-run: stopping before any push')
    return
  }

  step('pushing dev')
  run('git', ['push', 'origin', 'dev'])

  step('merging dev into main')
  mergeAndPush(script, 'dev', 'main', `Merge dev into main for v${version}`)

  if (fetchBranchIfExists('next')) {
    step('merging dev into next')
    mergeAndPush(script, 'dev', 'next', `Merge dev into next after v${version}`)
  } else {
    step('no next branch - skipping the merge into next')
  }

  step(`done - docs.tabler.io deploys v${version} from main`)
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
