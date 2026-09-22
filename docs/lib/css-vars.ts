// The custom-property block a component declares, cut from the SCSS source the
// way the Bootstrap docs do it: everything between `// scss-docs-start <name>`
// and `// scss-docs-end <name>`, minus the comment lines.
import { globSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export interface CssVarsSource {
  /** repo-relative SCSS file the block comes from */
  path: string
  /** the rule the block sits in, e.g. `.badge`; undefined when the marker is not directly inside a rule */
  selector: string | undefined
  /** the lines between the markers, without comment lines, ` !default` and the common indent */
  code: string
}

const REPO_ROOT = new URL('../../', import.meta.url)

let cachedScss: { path: string; lines: string[] }[] | undefined

/** Every SCSS file of the framework, read once per build. */
function scssFiles() {
  cachedScss ??= globSync('core/scss/**/*.scss', { cwd: fileURLToPath(REPO_ROOT) })
    .sort()
    .map((path) => ({ path, lines: readFileSync(fileURLToPath(new URL(path, REPO_ROOT)), 'utf8').split('\n') }))
  return cachedScss
}

/**
 * The block named `<prefix>-css-vars`. When no file has that marker, the first
 * `<prefix>-*-css-vars` marker stands in (`spinner` → `spinner-border-css-vars`),
 * so a page can name the family without repeating Bootstrap's marker names.
 * Returns `undefined` when no file carries a marker for the prefix.
 */
export function cssVarsSource(prefix: string): CssVarsSource | undefined {
  const exact = `${prefix}-css-vars`
  const family = new RegExp(`^\\s*// scss-docs-start (${prefix}-[\\w-]*-css-vars)$`)

  let found: { path: string; name: string } | undefined
  for (const { path, lines } of scssFiles()) {
    for (const line of lines) {
      if (line.trim() === `// scss-docs-start ${exact}`) {
        found = { path, name: exact }
        break
      }
      const m = line.match(family)
      if (m && !found) found = { path, name: m[1]! }
    }
    if (found?.name === exact) break
  }
  if (!found) return undefined

  const lines = scssFiles().find((f) => f.path === found.path)!.lines
  const start = lines.findIndex((line) => line.trim() === `// scss-docs-start ${found.name}`)
  const end = lines.findIndex((line, i) => i > start && line.trim() === `// scss-docs-end ${found.name}`)
  if (start < 0 || end < 0) return undefined

  // the rule opener is the nearest non-comment line above the marker
  let j = start - 1
  while (j >= 0 && /^\s*\/\//.test(lines[j]!)) j--
  const opener = lines[j]?.trim()
  const selector = opener?.endsWith('{') ? opener.slice(0, -1).trim() : undefined

  // comment lines inside the block explain the source, not the API
  const block = lines
    .slice(start + 1, end)
    .filter((line) => !/^\s*\/\//.test(line))
    .map((line) => line.replaceAll(' !default', ''))
  const indent = Math.min(...block.filter((line) => line.trim()).map((line) => line.match(/^ */)![0].length))
  return { path: found.path, selector, code: block.map((line) => line.slice(indent)).join('\n') }
}
