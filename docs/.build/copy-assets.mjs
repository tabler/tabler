// Rebuild Astro's public directory from source and generated workspace assets.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const repo = join(root, '..')
const publicDir = join(root, 'public')

const copies = [
  {
    from: join(root, 'assets'),
    to: publicDir,
    packageName: '@tabler/docs',
    requiredFile: join(root, 'assets', 'css', 'docs.css'),
  },
  {
    // core's own `dev` builds this asynchronously (nodemon-driven watch), so in
    // `pnpm run dev` this script can start before it exists — wait for it instead
    // of failing outright. See preview/.build/copy-assets.mjs for the same race.
    from: join(repo, 'core', 'dist'),
    to: join(publicDir, 'dist'),
    packageName: '@tabler/core',
    requiredFile: join(repo, 'core', 'dist', 'css', 'tabler.css'),
    waitForBuild: true,
  },
  {
    // Sourced from preview's isolated tmp-assets/ (not dist/) — dist/ is Astro's own
    // build output there, and reading demo assets from it caused unbounded growth
    // across repeated builds. See preview/.build/copy-assets.mjs.
    from: join(repo, 'preview', 'tmp-assets'),
    to: join(publicDir, 'preview'),
    packageName: '@tabler/preview',
    requiredFile: join(repo, 'preview', 'tmp-assets', 'css', 'demo.css'),
    waitForBuild: true,
  },
  {
    from: join(repo, 'shared', 'static'),
    to: join(publicDir, 'static'),
    packageName: 'shared assets',
    requiredFile: join(repo, 'shared', 'static', 'logo.svg'),
  },
]

const BUILD_WAIT_TIMEOUT_MS = 120_000
const BUILD_WAIT_POLL_MS = 200

async function waitForBuildOutput(requiredFile, packageName) {
  if (existsSync(requiredFile)) return
  console.log(`copy-assets: waiting for ${packageName} to finish its first build (${requiredFile})...`)
  const deadline = Date.now() + BUILD_WAIT_TIMEOUT_MS
  while (!existsSync(requiredFile)) {
    if (Date.now() > deadline) {
      throw new Error(`copy-assets: timed out waiting for ${requiredFile} — is ${packageName}'s dev/build running?`)
    }
    await sleep(BUILD_WAIT_POLL_MS)
  }
}

rmSync(publicDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
mkdirSync(publicDir, { recursive: true })

for (const { from, to, packageName, requiredFile, waitForBuild } of copies) {
  if (waitForBuild) {
    await waitForBuildOutput(requiredFile, packageName)
  } else if (!existsSync(from) || !existsSync(requiredFile)) {
    throw new Error(`copy-assets: missing ${requiredFile} — build ${packageName} first`)
  }

  cpSync(from, to, {
    recursive: true,
    dereference: true,
    filter: (src) => !src.includes('/.vscode') && !src.includes('\\.vscode'),
  })
}

console.log('copy-assets: done')
