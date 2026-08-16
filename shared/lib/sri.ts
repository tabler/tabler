import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { site } from './site.ts'

interface SriData {
  version: string
  hashes: Record<string, string>
}

// Resolved from process.cwd() (the calling package's directory, e.g. docs/ or preview/),
// not import.meta.url: Vite/Rollup emit this module's compiled output into a different
// directory (e.g. dist/.prerender/chunks/), which would break a file-relative path.
const sriPath = path.resolve(process.cwd(), '../shared/data/sri.json')

let data: SriData | null = null
let warned = false

function loadData(): SriData | null {
  if (!data && existsSync(sriPath)) {
    data = JSON.parse(readFileSync(sriPath, 'utf8')) as SriData
  }

  return data
}

/**
 * Returns the `integrity` and `crossorigin` attributes for a CDN file, ready to be interpolated
 * into a code snippet. Keys match `shared/data/sri.json`, written by `core generate-sri`: `css`,
 * `js`, `css-flags`, and so on.
 *
 * The hashes only describe the published release the snippets link to, so between a version bump
 * and the npm publish there is nothing to pin: the snippet then goes out without `integrity`
 * rather than with a hash the browser would reject. A key missing from a file that does match the
 * current version means the file list in `generate-sri.ts` drifted from what the docs render, so
 * that one fails the build instead of emitting `integrity="undefined"`.
 */
export function sriAttributes(key: string): string {
  const sri = loadData()

  if (sri?.version !== site.version) {
    if (!warned) {
      warned = true
      console.warn(`[sri] No SRI hashes for @tabler/core@${site.version} in shared/data/sri.json — CDN snippets are shown without \`integrity\`. Run \`pnpm --filter @tabler/core generate-sri\` once the release is published.`)
    }

    return ''
  }

  const hash = sri.hashes[key]

  if (!hash) {
    throw new Error(`Missing SRI hash "${key}" in shared/data/sri.json. Add the file to core/.build/generate-sri.ts and run \`pnpm --filter @tabler/core generate-sri\`.`)
  }

  return ` integrity="${hash}" crossorigin="anonymous"`
}
