// Shared Astro integration that makes a package's public/ directory an exact
// copy of source and generated workspace assets, then keeps it in sync during dev.
// Used by @tabler/docs and @tabler/preview — each passes its own manifest
// from astro.config.mjs.
//
// Runs inside Astro's own lifecycle (astro:config:done) instead of a standalone
// pre-script, so the copy is ordered by Astro for both dev and build — mirrors
// Bootstrap's site/src/libs/astro.ts integration. Cross-package ordering (core
// before preview before docs) still comes from the turbo dev graph.
import { constants, copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
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
}

function isMissing(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'
}

export function copyAssets({ repo, publicDir, copies, syncDirs = [] }: CopyAssetsOptions): Integration {
  let command: string

  // Every destination file is listed with its source, then public/ is brought
  // in line with that list: stale files go, changed files are copied, the rest
  // stays untouched. The result equals a wipe-and-copy — running it twice, or
  // without a prior `pnpm run clean`, never accumulates stale/nested content
  // (see preview/.build/vite.config.mts for the unbounded-growth story) — but
  // a restart no longer rewrites tens of MB of unchanged static files.
  function syncPublicDir(logger: Logger) {
    const files = new Map<string, { src: string; size: number; mtimeMs: number; fallback: boolean }>()
    const keptDirs: string[] = []

    for (const { from, to, label, required = true, requiredFile, allowDestinationFallback = false } of copies) {
      if (!existsSync(from) || (requiredFile && !existsSync(requiredFile))) {
        const message = `copy-assets: missing ${requiredFile ?? from}`
        if (required) throw new Error(`${message} — build ${label} first`)
        logger.warn(`${message} (skipped — build ${label} to get it)`)
        continue
      }
      const found: [string, { src: string; size: number; mtimeMs: number; fallback: boolean }][] = []
      // statSync follows symlinks: sources may be links (e.g. node_modules/@tabler/core)
      const walk = (src: string, dest: string) => {
        const stat = statSync(src)
        if (!stat.isDirectory()) {
          found.push([dest, { src, size: stat.size, mtimeMs: stat.mtimeMs, fallback: allowDestinationFallback }])
          return
        }
        for (const name of readdirSync(src)) {
          if (name !== '.vscode') walk(join(src, name), join(dest, name))
        }
      }
      try {
        walk(from, to)
      } catch (error) {
        // In turbo dev, @tabler/core can clean dist while we read it.
        // If fallback is allowed and destination exists, keep current assets.
        if (allowDestinationFallback && isMissing(error) && existsSync(to)) {
          logger.warn(`copy-assets: source changed during copy ${from} (using existing ${to})`)
          keptDirs.push(to)
          continue
        }
        throw error
      }
      for (const [dest, file] of found) files.set(dest, file)
    }

    let removed = 0
    const prune = (dir: string): boolean => {
      let empty = true
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (keptDirs.some((kept) => path === kept || path.startsWith(kept + sep))) {
          empty = false
        } else if (entry.isDirectory() && !files.has(path)) {
          if (prune(path)) rmSync(path, { recursive: true, force: true })
          else empty = false
        } else if (entry.isFile() && files.has(path)) {
          empty = false
        } else {
          rmSync(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
          removed++
        }
      }
      return empty
    }
    mkdirSync(publicDir, { recursive: true })
    prune(publicDir)

    let copied = 0
    const madeDirs = new Set<string>()
    for (const [dest, { src, size, mtimeMs, fallback }] of files) {
      const current = statSync(dest, { throwIfNoEntry: false })
      if (current && current.size === size && current.mtimeMs >= mtimeMs) continue
      const dir = dirname(dest)
      if (!madeDirs.has(dir)) {
        mkdirSync(dir, { recursive: true })
        madeDirs.add(dir)
      }
      try {
        // copy-on-write clone where the filesystem has one (APFS, btrfs), plain copy elsewhere
        copyFileSync(src, dest, constants.COPYFILE_FICLONE)
        copied++
      } catch (error) {
        if (fallback && isMissing(error)) {
          logger.warn(`copy-assets: source changed during copy ${src}`)
          continue
        }
        throw error
      }
    }
    logger.info(`public/ synced from workspace assets (${copied} copied, ${removed} removed, ${files.size - copied} unchanged)`)
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
        syncPublicDir(logger)
      },
      'astro:server:setup': ({ server, logger }) => {
        if (command !== 'dev') return
        // The copy above runs once at startup, so edits rebuilt into the source
        // dirs during `pnpm run dev` (e.g. core/dist by core's watchers) would
        // never reach the served public/ copy. Watch them, sync changed files
        // into public/, and trigger a browser reload.
        server.watcher.add(syncDirs.map((dir) => dir.from))
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
        }
        // A file deleted from a source dir (a renamed bundle, a cleaned dist) must
        // leave public/ too, or the dev server keeps serving it until a restart.
        const remove = (file: string) => {
          for (const { from, to } of syncDirs) {
            if (!file.startsWith(from + sep)) continue
            rmSync(join(to, relative(from, file)), { force: true })
            scheduleReload(file)
            return
          }
        }
        server.watcher.on('add', sync)
        server.watcher.on('change', sync)
        server.watcher.on('unlink', remove)
      },
    },
  }
}
