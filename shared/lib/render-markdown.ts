// Renders markdown to HTML with markdown-it (html: true, indented code blocks off).

// @ts-ignore -- markdown-it ships no type declarations and @types/markdown-it
// is intentionally not added (build-time helper only).
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: true })

md.disable('code')

/** Render a markdown string to HTML. */
export function renderMarkdown(src: string): string {
  return md.render(src)
}
