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
  css?: ScssDocsBlock | undefined
  sass?: ScssDocsBlock | undefined
}

let cachedSources: Promise<{ path: string; source: string }[]> | undefined

function sources() {
  cachedSources ??= Promise.all(
    Object.entries(scssSources)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(async ([key, load]) => ({ path: key.replace('../../', ''), source: (await load()) as string })),
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
  // the rule the block sits in: the nearest non-comment line above the marker
  const above = file.source
    .slice(0, file.source.indexOf(`// scss-docs-start ${name}`))
    .split('\n')
    .reverse()
  const opener = above
    .slice(1)
    .find((line) => line.trim() && !/^\s*\/\//.test(line))
    ?.trim()
  const selector = opener?.endsWith('{') ? opener.slice(0, -1).trim() : undefined
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

/**
 * Resolves a page's `css-vars` and `sass-vars` front matter to the blocks to
 * show. A missing `css-vars` marker is an error, since the page asked for it
 * by name; a missing `<name>-variables` marker only drops the Sass part,
 * because `sass-vars` defaults to `css-vars` and not every component has one.
 */
export async function cssSection(cssVars?: string, sassVars: string | undefined = cssVars): Promise<CssSection> {
  let css: ScssDocsBlock | undefined
  if (cssVars) {
    const marker = (await scssDocsBlock(`${cssVars}-css-vars`)) ? `${cssVars}-css-vars` : await familyCssVarsMarker(cssVars)
    css = marker ? await scssDocsBlock(marker) : undefined
    if (!css) throw new Error(`css-vars: no "// scss-docs-start ${cssVars}-css-vars" marker in core/scss`)
  }
  const sass = sassVars ? await scssDocsBlock(`${sassVars}-variables`) : undefined
  if (sassVars && !sass && sassVars !== cssVars) throw new Error(`sass-vars: no "// scss-docs-start ${sassVars}-variables" marker in core/scss`)
  return { css, sass }
}
