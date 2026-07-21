import { describe, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { runSass } from 'sass-true'

const dir = path.dirname(fileURLToPath(import.meta.url))
// Auto-discover test files with recursive readdir (fs.globSync needs Node 22+,
// while the package supports Node >=20).
const files = readdirSync(dir, { recursive: true })
  .filter((f) => f.endsWith('.test.scss'))
  .sort()
  .map((f) => path.join(dir, f))

for (const file of files) {
  const data = readFileSync(file, 'utf8')
  // sass-true needs the "true" module; add it only when the file doesn't load it
  // itself. Anchored to the start of a line so a mention inside a comment can't
  // false-trigger and suppress the injection.
  const needsTrue = !/^\s*@(use|import)\s+["']true["']/m.test(data)
  const sass = (needsTrue ? '@use "true" as *;\n' : '') + data

  runSass(
    { describe, it, sourceType: 'string' },
    sass,
    { loadPaths: [path.dirname(file)] }, // lets test files use relative @use / @import
  )
}
