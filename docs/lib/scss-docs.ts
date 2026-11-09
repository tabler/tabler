// The "CSS" section of a component page, cut from the SCSS sources the way the
// Bootstrap docs do it: the custom-property block (`// scss-docs-start
// <prefix>-css-vars` in the component's file) and the Sass defaults
// (`<name>-variables` in `_variables.scss`). Shared by the page, which needs
// to know which headings exist for the table of contents, and by DocsCssVars,
// which renders them.
import { extractMarkedSnippet } from '@shared/lib/code-example'

// Vite inlines the sources at build time — `node:fs` paths would break once
// this module is bundled into dist/.prerender during `astro build`.
const scssSources = import.meta.glob('../../core/scss/**/*.scss', { query: '?raw', import: 'default' })

export interface ScssDocsBlock {
  /** repo-relative path of the file the block comes from */
  path: string
  /** the lines between the markers, minus comment lines, ` !default` and the common indent */
  code: string
  /** the rule the block sits in, e.g. `.badge`; undefined when the marker is not directly inside a rule */
  selector: string | undefined
}

export interface CssSection {
  css: ScssDocsBlock[]
  sass: ScssDocsBlock[]
}

let cachedSources: Promise<{ path: string; source: string }[]> | undefined

function sources() {
  cachedSources ??= Promise.all(
    Object.entries(scssSources)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(async ([key, load]) => ({ path: key.replace('../../', ''), source: await load() })),
  )
  return cachedSources
}

/** The block between the `<name>` markers in the first file that has it. */
export async function scssDocsBlock(name: string): Promise<ScssDocsBlock | undefined> {
  const file = (await sources()).find(({ source }) => source.includes(`// scss-docs-start ${name}\n`))
  if (!file) return undefined
  const snippet = extractMarkedSnippet(file.source.replaceAll(' !default', ''), 'scss-docs', name)
  if (snippet === null) throw new Error(`"${name}" has no matching scss-docs-end marker in ${file.path}`)
  const code = snippet
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
  // the rule the block sits in: the nearest non-comment lines above the marker,
  // joined when the selector list spans several lines (`.a,\n.b {`)
  const above = file.source
    .slice(0, file.source.indexOf(`// scss-docs-start ${name}`))
    .split('\n')
    .slice(0, -1)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('//'))
    .reverse()
  const opener = above[0]
  const parts = opener?.endsWith('{') ? [opener.slice(0, -1).trim()] : []
  for (const line of above.slice(1)) {
    if (!line.endsWith(',')) break
    parts.unshift(line.slice(0, -1).trim())
  }
  const selector = parts.length ? parts.join(', ') : undefined
  return { path: file.path, code, selector }
}

/** `spinner` has no `spinner-css-vars`; Bootstrap's marker is `spinner-border-css-vars`. */
async function familyCssVarsMarker(prefix: string) {
  const family = new RegExp(`^\\s*// scss-docs-start (${prefix}-[\\w-]*-css-vars)$`, 'm')
  for (const { source } of await sources()) {
    const match = source.match(family)
    if (match) return match[1]!
  }
  return undefined
}

const asList = (names: string | string[] | undefined) => (names === undefined ? [] : Array.isArray(names) ? names : [names])

/**
 * Resolves a page's `css-vars` and `sass-vars` front matter to the blocks to
 * show; either may name one block or a list of them. A missing `css-vars`
 * marker is an error, since the page asked for it by name; a missing
 * `<name>-variables` marker only drops that Sass part, because `sass-vars`
 * defaults to `css-vars` and not every component has one.
 */
export async function cssSection(cssVars?: string | string[], sassVars: string | string[] | undefined = cssVars): Promise<CssSection> {
  const css: ScssDocsBlock[] = []
  for (const name of asList(cssVars)) {
    const marker = (await scssDocsBlock(`${name}-css-vars`)) ? `${name}-css-vars` : await familyCssVarsMarker(name)
    const block = marker ? await scssDocsBlock(marker) : undefined
    if (!block) throw new Error(`css-vars: no "// scss-docs-start ${name}-css-vars" marker in core/scss`)
    css.push(block)
  }
  const sass: ScssDocsBlock[] = []
  const explicit = sassVars !== cssVars
  for (const name of asList(sassVars)) {
    const block = await scssDocsBlock(`${name}-variables`)
    if (block) sass.push(block)
    else if (explicit) throw new Error(`sass-vars: no "// scss-docs-start ${name}-variables" marker in core/scss`)
  }
  return { css, sass }
}
