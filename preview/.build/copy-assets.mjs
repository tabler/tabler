// Equivalent of the Eleventy passthrough copies: static assets are generated
// into public/ before dev/build (public/ is fully generated — see .gitignore).
import { cpSync, existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const repo = join(root, '..')
const publicDir = join(root, 'public')

// Always start from a clean public/ (mirrors @tabler/docs' and Bootstrap's own docs
// integration — see astro:config:done in bootstrap/site/src/libs/astro.ts): running
// this script twice in a row, or running it without a prior `pnpm run clean`, must
// never be able to accumulate stale/nested content. Without this, a previous run's
// output could get copied into a source directory and re-copied on the next run,
// growing without bound (this happened for real — see preview/.build/vite.config.mts).
rmSync(publicDir, { recursive: true, force: true })

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

const copies = [
  // @tabler/core dist (css/js/fonts/img/libs) — same as the Eleventy passthrough.
  // core's own `dev` builds this asynchronously (nodemon-driven watch), so in
  // `pnpm run dev` this script can start before it exists on a fresh clone — wait
  // for it instead of failing outright. See docs/.build/copy-assets.mjs for the same race.
  {
    from: join(root, 'node_modules', '@tabler', 'core', 'dist'),
    to: join(root, 'public', 'dist'),
    requiredFile: join(root, 'node_modules', '@tabler', 'core', 'dist', 'css', 'tabler.css'),
    packageName: '@tabler/core',
    required: true,
    allowDestinationFallback: true,
    waitForBuild: true,
  },
  // demo css/js built by this package's sass/vite pipeline. Source is tmp-assets/
  // (NOT dist/) on purpose — dist/ is Astro's own build output, and copying from a
  // path Astro also writes to caused unbounded growth across repeated builds (each
  // `astro build` re-seeds dist/ from public/, which the next `pnpm run assets`
  // would then copy right back in).
  { from: join(root, 'tmp-assets'), to: join(root, 'public', 'preview'), required: true },
  // docs.css built by the @tabler/docs sass pipeline (used by docs pages)
  { from: join(repo, 'docs', 'dist', 'css'), to: join(root, 'public', 'css'), required: false },
  // static assets (photos, avatars, tracks, brand svgs...).
  // Use the real source because preview/static is a symlink that may not survive deployment packaging.
  { from: join(repo, 'shared', 'static'), to: join(root, 'public', 'static'), required: true },
  // favicons (source assets of @tabler/preview)
  { from: join(root, 'assets', 'favicon.ico'), to: join(root, 'public', 'favicon.ico'), required: true },
  { from: join(root, 'assets', 'favicon-dev.ico'), to: join(root, 'public', 'favicon-dev.ico'), required: true },
]

for (const { from, to, required, allowDestinationFallback, requiredFile, packageName, waitForBuild } of copies) {
  if (waitForBuild) {
    await waitForBuildOutput(requiredFile, packageName)
  }
  if (!existsSync(from)) {
    const message = `copy-assets: missing ${from}`
    if (allowDestinationFallback && existsSync(to)) {
      console.warn(`${message} (using existing ${to})`)
      continue
    }
    if (required) throw new Error(`${message} — run the build of that package first`)
    console.warn(`${message} (skipped — build @tabler/preview or @tabler/docs to get it)`)
    continue
  }
  mkdirSync(dirname(to), { recursive: true })
  if (from.endsWith('.ico')) {
    copyFileSync(from, to)
  } else {
    // dereference: sources may be symlinks (e.g. preview/static → shared/static).
    // For fallback-enabled copies (core dist), keep existing destination as a safety net
    // in case source files disappear mid-copy during parallel clean/build tasks.
    if (!allowDestinationFallback) {
      // remove the target first so a stale symlink never survives
      try {
        rmSync(to, { recursive: true, force: true })
      } catch (error) {
        if (!(error && typeof error === 'object' && error.code === 'ENOTEMPTY')) {
          throw error
        }
      }
    }
    try {
      cpSync(from, to, {
        recursive: true,
        dereference: true,
        filter: (src) => !src.includes('/.vscode') && !src.includes('\\.vscode'),
      })
    } catch (error) {
      // In turbo dev, @tabler/core can clean dist while we copy it.
      // If fallback is allowed and destination exists, keep current assets.
      if (allowDestinationFallback && error && typeof error === 'object' && error.code === 'ENOENT' && existsSync(to)) {
        console.warn(`copy-assets: source changed during copy ${from} (using existing ${to})`)
        continue
      }
      throw error
    }
  }
}
console.log('copy-assets: done')
