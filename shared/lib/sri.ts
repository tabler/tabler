import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

// Resolved from process.cwd() (the calling package's directory, e.g. docs/ or preview/),
// not import.meta.url: Vite/Rollup emit this module's compiled output into a different
// directory (e.g. dist/.prerender/chunks/), which would break a file-relative path.
const sriPath = path.resolve(process.cwd(), '../shared/data/sri.json')

let hashes: Record<string, string> | null = null
let warned = false

function loadHashes(): Record<string, string> {
  // Read lazily and keep re-checking until the file shows up: in dev it may be written by a
  // `core build` running after the docs server started.
  if (!hashes && existsSync(sriPath)) {
    hashes = JSON.parse(readFileSync(sriPath, 'utf8')) as Record<string, string>
  }

  return hashes ?? {}
}

/**
 * Returns the `integrity` and `crossorigin` attributes for a CDN file, ready to be interpolated
 * into a code snippet. Keys match `shared/data/sri.json`, written by `core build`: `css`, `js`,
 * `css-flags`, and so on.
 *
 * A missing file or key fails the build instead of emitting `integrity="undefined"`. In dev the
 * attributes are dropped instead, because `dev-prepare` only builds unminified files, so there is
 * nothing to hash yet.
 */
export function sriAttributes(key: string): string {
  const hash = loadHashes()[key]

  if (!hash) {
    if (import.meta.env.PROD) {
      throw new Error(`Missing SRI hash "${key}" in shared/data/sri.json. Run \`pnpm --filter @tabler/core build\` before building the docs so SRI hashes are generated.`)
    }

    if (!warned) {
      warned = true
      console.warn('[sri] No SRI hashes found in shared/data/sri.json — CDN snippets are shown without `integrity`. Run `pnpm --filter @tabler/core build` to generate them.')
    }

    return ''
  }

  return ` integrity="${hash}" crossorigin="anonymous"`
}
