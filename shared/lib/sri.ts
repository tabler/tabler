import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

// Resolved from process.cwd() (the calling package's directory, e.g. docs/ or preview/),
// not import.meta.url: Vite/Rollup emit this module's compiled output into a different
// directory (e.g. dist/.prerender/chunks/), which would break a file-relative path.
const sriPath = path.resolve(process.cwd(), '../shared/data/sri.json')

if (!existsSync(sriPath)) {
  throw new Error('shared/data/sri.json is missing. Run `pnpm --filter @tabler/core build` before building the docs so SRI hashes are generated.')
}

export const sri: Record<string, string> = JSON.parse(readFileSync(sriPath, 'utf8'))
