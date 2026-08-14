import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const sriPath = fileURLToPath(new URL('../data/sri.json', import.meta.url))

if (!existsSync(sriPath)) {
  throw new Error(
    'shared/data/sri.json is missing. Run `pnpm --filter @tabler/core build` before building the docs so SRI hashes are generated.',
  )
}

export const sri: Record<string, string> = JSON.parse(readFileSync(sriPath, 'utf8'))
