// Shared Astro integration that rebuilds a package's public/ directory from
// source and generated workspace assets (the Eleventy passthrough-copy
// equivalent), then keeps it in sync during dev. Used by @tabler/docs and
// @tabler/preview — each passes its own manifest from astro.config.mjs.
//
// Runs inside Astro's own lifecycle (astro:config:done) instead of a standalone
// pre-script, so the copy is ordered by Astro for both dev and build — mirrors
// Bootstrap's site/src/libs/astro.ts integration. Cross-package ordering (core
// before preview before docs) still comes from the turbo dev graph.
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'

// Structural stand-ins for the astro/vite types used here. The real `astro`
// package is not resolvable from the repo root (it lives in docs/ and preview/
// node_modules), and `astro check` verifies the produced object against the
// real AstroIntegration type at the usage site in each astro.config.mjs anyway.
interface Logger {
  info(message: string): void
  warn(message: string): void
}
interface DevServer {
  watcher: {
    add(paths: string[]): void
    on(event: string, callback: (file: string) => void): void
  }
  hot: { send(payload: { type: string }): void }
}
interface Integration {
  name: string
  hooks: {
    'astro:config:setup'?: (options: { command: string }) => void
    'astro:config:done'?: (options: { logger: Logger }) => void
    'astro:server:setup'?: (options: { server: DevServer; logger: Logger }) => void
  }
}

/**
 * A directory (or single file) to copy into publicDir. `requiredFile` guards
 * against a present-but-stale source; `required: false` only warns when the
 * source is missing; `allowDestinationFallback` keeps the existing destination
 * when the source disappears mid-copy (e.g. @tabler/core rebuilding
 * concurrently).
 */
interface CopyEntry {
  from: string
  to: string
  label: string
  required?: boolean
  requiredFile?: string
  allowDestinationFallback?: boolean
}

interface CopyAssetsOptions {
  /** repo root, for log-friendly relative paths */
  repo: string
  /** the package's public/ directory (fully generated) */
  publicDir: string
  copies: CopyEntry[]
  /** generated source dirs to live-sync into publicDir while `astro dev` runs */
  syncDirs?: { from: string; to: string }[]
  /** dirs written to directly by watchers — already in place, only trigger a browser reload */
  reloadDirs?: string[]
}

export function copyAssets({ repo, publicDir, copies, syncDirs = [], reloadDirs = [] }: CopyAssetsOptions): Integration {
  let command: string

  function rebuildPublicDir(logger: Logger) {
    // Always start from a clean public/ (mirrors Bootstrap's own docs
    // integration): running this twice in a row, or without a prior
    // `pnpm run clean`, must never accumulate stale/nested content —
    // see preview/.build/vite.config.mts for the unbounded-growth story.
    rmSync(publicDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
    mkdirSync(publicDir, { recursive: true })

    for (const { from, to, label, required = true, requiredFile, allowDestinationFallback } of copies) {
      if (!existsSync(from) || (requiredFile && !existsSync(requiredFile))) {
        const message = `copy-assets: missing ${requiredFile ?? from}`
        if (required) throw new Error(`${message} — build ${label} first`)
        logger.warn(`${message} (skipped — build ${label} to get it)`)
        continue
      }
      mkdirSync(dirname(to), { recursive: true })
      if (statSync(from).isFile()) {
        copyFileSync(from, to)
        continue
      }
      try {
        // dereference: sources may be symlinks (e.g. preview/static → shared/static)
        cpSync(from, to, {
          recursive: true,
          dereference: true,
          filter: (src) => !src.includes('/.vscode') && !src.includes('\\.vscode'),
        })
      } catch (error) {
        // In turbo dev, @tabler/core can clean dist while we copy it.
        // If fallback is allowed and destination exists, keep current assets.
        if (allowDestinationFallback && error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT' && existsSync(to)) {
          logger.warn(`copy-assets: source changed during copy ${from} (using existing ${to})`)
          continue
        }
        throw error
      }
    }
    logger.info('public/ rebuilt from workspace assets')
  }

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
      'astro:server:setup': ({ server, logger }) => {
        if (command !== 'dev') return
        // The copy above runs once at startup, so edits rebuilt into the source
        // dirs during `pnpm run dev` (e.g. core/dist by core's watchers) would
        // never reach the served public/ copy. Watch them, sync changed files
        // into public/, and trigger a browser reload.
        server.watcher.add([...syncDirs.map((dir) => dir.from), ...reloadDirs])
        let reloadTimer: ReturnType<typeof setTimeout> | undefined
        const scheduleReload = (file: string) => {
          // Source maps piggyback on their css/js file's reload. build-css.ts
          // buffers all writes into one tight burst, so a short quiet window is
          // enough to coalesce a whole rebuild into a single reload.
          if (file.endsWith('.map')) return
          clearTimeout(reloadTimer)
          reloadTimer = setTimeout(() => {
            server.hot.send({ type: 'full-reload' })
            logger.info(`reloaded after change in ${relative(repo, file)}`)
          }, 250)
        }
        const sync = (file: string) => {
          for (const { from, to } of syncDirs) {
            if (!file.startsWith(from + sep)) continue
            const dest = join(to, relative(from, file))
            mkdirSync(dirname(dest), { recursive: true })
            copyFileSync(file, dest)
            scheduleReload(file)
            return
          }
          if (reloadDirs.some((dir) => file.startsWith(dir + sep))) scheduleReload(file)
        }
        server.watcher.on('add', sync)
        server.watcher.on('change', sync)
      },
    },
  }
}
