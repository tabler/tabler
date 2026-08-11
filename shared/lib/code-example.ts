// Docs code-block pipeline: js-beautify + shiki (github-dark theme).
import beautify from 'js-beautify'
import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | undefined

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: ['github-dark'],
    langs: ['html', 'yaml', 'js', 'ts', 'shell', 'diff', 'scss', 'css'],
  })
  return highlighterPromise
}

export function beautifyHtml(code: string): string {
  return beautify.html(code, {
    indent_size: 2,
    wrap_line_length: 80,
  })
}

export async function highlightCode(code: string, lang = 'html'): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, { lang, theme: 'github-dark' })
}

/**
 * Extract the content between `// <marker>-start <name>` and `// <marker>-end <name>`
 * comments in a source file, dedented to the first column. Returns null when the
 * markers are missing.
 */
export function extractMarkedSnippet(source: string, marker: string, name: string): string | null {
  const match = source.match(new RegExp(`// ${marker}-start ${name}\\n((?:.|\\n)*?)// ${marker}-end ${name}`))
  if (!match?.[1]) {
    return null
  }
  const lines = match[1].split('\n')
  const spaceCounts = lines.filter((line) => line.trim().length > 0).map((line) => (line.match(/^ */)?.[0] ?? '').length)
  const minSpaces = spaceCounts.length ? Math.min(...spaceCounts) : 0
  return lines
    .map((line) => line.slice(minSpaces))
    .join('\n')
    .trim()
}

/** Replace href="#" with javascript:void(0) in example markup. */
export function removeHref(content: string): string {
  return content.replace(/href="#"/g, 'href="javascript:void(0)"')
}
