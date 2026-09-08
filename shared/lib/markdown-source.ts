// A docs component whose output no MDX-to-markdown conversion could rebuild
// (a colour palette, a table built from a data file) can ship its own markdown
// next to its html, inside an html comment. docs/lib/llms.ts reads those
// comments out of the rendered page and puts each one where the component
// sits in the MDX source, so the .md mirror keeps the content instead of a gap.
// The component renders the comment only for that mirror render (it checks
// Astro.locals.markdownMirror), so the html a browser gets never carries it.

const OPEN = '<!--MARKDOWN:'
const CLOSE = '<!--/MARKDOWN-->'
const SOURCE_PATTERN = /<!--MARKDOWN:([A-Za-z]+)-->\n?([\s\S]*?)\n?<!--\/MARKDOWN-->/g

/** The comment a component renders; `name` must match the tag used in the MDX (`<Colors />` → "Colors"). */
export function markdownSource(name: string, markdown: string): string {
  // "-->" inside the markdown would end the comment early
  return `${OPEN}${name}-->\n${markdown.trim().replaceAll('-->', '--&gt;')}\n${CLOSE}`
}

/** Every markdown source in a rendered page, per component name, in document order. */
export function extractMarkdownSources(html: string): Map<string, string[]> {
  const sources = new Map<string, string[]>()
  for (const [, name, markdown] of html.matchAll(SOURCE_PATTERN)) {
    const list = sources.get(name!) ?? []
    list.push(markdown!.replaceAll('--&gt;', '-->'))
    sources.set(name!, list)
  }
  return sources
}

/** A GitHub-flavoured markdown table; pipes inside cells are escaped. */
export function markdownTable(headers: string[], rows: string[][]): string {
  const line = (cells: string[]) => `| ${cells.map((cell) => cell.replaceAll('|', '\\|')).join(' | ')} |`
  return [line(headers), line(headers.map(() => '---')), ...rows.map(line)].join('\n')
}
