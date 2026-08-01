// Equivalent of the Eleventy passthrough copies: static assets are generated
// into public/ before dev/build (public/ is fully generated — see .gitignore).
// Runs as an Astro integration (astro:config:done) instead of a standalone
// pre-script, so the copy is ordered by Astro's own lifecycle for both dev and
// build — mirrors Bootstrap's site/src/libs/astro.ts integration.
import { cpSync, existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const repo = join(root, '..')
const publicDir = join(root, 'public')

const copies = [
  // @tabler/core dist (css/js/fonts/img/libs) — same as the Eleventy passthrough
  {
    from: join(root, 'node_modules', '@tabler', 'core', 'dist'),
    to: join(root, 'public', 'dist'),
    required: true,
    allowDestinationFallback: true,
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

function rebuildPublicDir(logger) {
  // Always start from a clean public/ (mirrors @tabler/docs' and Bootstrap's own docs
  // integration — see astro:config:done in bootstrap/site/src/libs/astro.ts): running
  // this twice in a row, or running it without a prior `pnpm run clean`, must
  // never be able to accumulate stale/nested content. Without this, a previous run's
  // output could get copied into a source directory and re-copied on the next run,
  // growing without bound (this happened for real — see preview/.build/vite.config.mts).
  rmSync(publicDir, { recursive: true, force: true })

  for (const { from, to, required, allowDestinationFallback } of copies) {
    if (!existsSync(from)) {
      const message = `copy-assets: missing ${from}`
      if (allowDestinationFallback && existsSync(to)) {
        logger.warn(`${message} (using existing ${to})`)
        continue
      }
      if (required) throw new Error(`${message} — run the build of that package first`)
      logger.warn(`${message} (skipped — build @tabler/preview or @tabler/docs to get it)`)
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
          logger.warn(`copy-assets: source changed during copy ${from} (using existing ${to})`)
          continue
        }
        throw error
      }
    }
  }
  logger.info('public/ rebuilt from workspace assets')
}

/** @returns {import('astro').AstroIntegration} */
export function copyAssets() {
  /** @type {string} */
  let command
  return {
    name: 'copy-assets',
    hooks: {
      'astro:config:setup': (options) => {
        command = options.command
      },
      'astro:config:done': ({ logger }) => {
        // `astro check`/`astro sync` (command 'sync') runs these hooks too, but
        // only needs types — public/ is irrelevant there and CI's type-check
        // job has no built workspace assets to copy.
        if (command === 'sync') return
        rebuildPublicDir(logger)
      },
    },
  }
}
