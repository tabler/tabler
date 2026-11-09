// Steps of `release:main`: refresh the SRI hashes for the version in core/package.json, and
// merge one branch into another through a temporary worktree, so the current checkout (and a
// dev server running from it) never switches branches.

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const repoRoot = join(__dirname, '..')
const sriFile = 'shared/data/sri.json'
// The public skill quotes the cdn snippet, hashes included, so it changes with the SRI data.
const skillsDir = 'skills'

export const git = (args: string[], cwd = repoRoot): string => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
export const run = (command: string, args: string[], cwd = repoRoot): void => {
  execFileSync(command, args, { cwd, stdio: 'inherit' })
}

export const coreVersion = (): string => {
  const { version } = JSON.parse(readFileSync(join(repoRoot, 'core', 'package.json'), 'utf8')) as { version: string }
  return version
}

/** Fails unless the checkout is on `branch` and clean. */
export const requireBranch = (script: string, branch: string): string => {
  const current = git(['branch', '--show-current'])
  if (current !== branch) {
    throw new Error(`${script}: run this on the \`${branch}\` branch`)
  }
  if (git(['status', '--porcelain', '--untracked-files=no']) !== '') {
    throw new Error(`${script}: the working tree has uncommitted changes - commit or stash them first`)
  }
  return current
}

/** Whether `origin` has `branch`; fetches it when it does, so `origin/<branch>` is current. */
export const fetchBranchIfExists = (branch: string): boolean => {
  if (git(['ls-remote', '--heads', 'origin', branch]) === '') return false
  git(['fetch', 'origin', branch])
  return true
}

/** Runs `generate:sri --wait`, regenerates the public skills and commits what changed. */
export const commitSriHashes = (script: string, version: string): void => {
  const tsx = join(repoRoot, 'node_modules', '.bin', 'tsx')
  run(tsx, [join('.build', 'generate-sri.ts'), '--wait'])
  run(tsx, [join('.build', 'generate-agent-skills.ts')])

  const changed = git(['status', '--porcelain', '--', sriFile, skillsDir])
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3))
  if (changed.length === 0) {
    console.log(`${script}: ${sriFile} and ${skillsDir}/ are already up to date`)
  } else {
    git(['commit', '-m', `Update SRI hashes for v${version}`, '--', sriFile, skillsDir])
    console.log(`${script}: committed ${changed.join(', ')}`)
  }
}

// Files two release lines always change on the same lines: the version fields and the top of
// the changelogs. On a conflict there the target branch is right (its version is newer, its
// changelog gets the entry from the GitHub release), so the merge keeps the target's side.
const versionFiles = /(^|\/)(package\.json|CHANGELOG\.md)$/

/**
 * Merges the local branch `source` into `origin/<target>` in a temporary worktree and pushes
 * the result to `target`. Conflicts in version files are resolved for the target; any other
 * conflict aborts the merge and throws before anything is pushed.
 */
export const mergeAndPush = (script: string, source: string, target: string, message: string): void => {
  const worktree = mkdtempSync(join(tmpdir(), `tabler-${target.replace(/\//g, '-')}-`))

  try {
    git(['worktree', 'add', '--detach', worktree, `origin/${target}`])
    try {
      git(['merge', '--no-edit', '-m', message, source], worktree)
    } catch {
      const conflicts = git(['diff', '--name-only', '--diff-filter=U'], worktree).split('\n').filter(Boolean)
      const other = conflicts.filter((file) => !versionFiles.test(file))
      if (other.length > 0) {
        git(['merge', '--abort'], worktree)
        throw new Error(`${script}: merging ${source} into ${target} has conflicts in ${other.join(', ')} - merge \`origin/${source}\` into \`${target}\` by hand, keep the version and the changelog of \`${target}\`, and push it`)
      }
      console.log(`${script}: keeping the ${target} side of ${conflicts.join(', ')}`)
      git(['checkout', '--ours', '--', ...conflicts], worktree)
      git(['add', '--', ...conflicts], worktree)
      git(['commit', '--no-edit', '-m', message], worktree)
    }
    run('git', ['push', 'origin', `HEAD:${target}`], worktree)
  } finally {
    git(['worktree', 'remove', '--force', worktree])
    rmSync(worktree, { recursive: true, force: true })
  }
}
