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
  // A comment that follows an element stays glued to it — js-beautify never adds
  // the break itself. Icon examples arrive as one line, so every "Download SVG
  // icon" comment would sit on the closing tag of the icon before it.
  const withCommentBreaks = code.replace(/>\s*<!--/g, '>\n<!--')

  return beautify.html(withCommentBreaks, {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: 5,
    preserve_newlines: true,
    indent_scripts: 'normal',
    wrap_attributes: 'auto',
    end_with_newline: false,
    wrap_line_length: 0,
    indent_inner_html: false,
    indent_empty_lines: false,
    // The examples arrive as one line: MDX drops the whitespace between
    // sibling elements, and js-beautify will not add a line break where one
    // would be rendered as a space. Emptying the inline list lifts that
    // restriction, so every element goes on its own line — the demo markup
    // is written that way in the source.
    inline: [],
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
