import { describe, expect, it } from 'vitest'
import { renderMarkdown } from './render-markdown'

describe('renderMarkdown', () => {
  it('renders markdown to html', () => {
    expect(renderMarkdown('some **bold** text')).toBe('<p>some <strong>bold</strong> text</p>\n')
  })

  it('passes raw html through (html: true)', () => {
    expect(renderMarkdown('<div class="x">y</div>')).toContain('<div class="x">y</div>')
  })

  it('does not treat indented lines as code blocks (code rule disabled)', () => {
    expect(renderMarkdown('    indented line')).not.toContain('<pre>')
  })
})
