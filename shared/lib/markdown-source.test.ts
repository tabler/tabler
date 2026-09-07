import { describe, expect, it } from 'vitest'
import { extractMarkdownSources, markdownSource, markdownTable } from './markdown-source'

describe('markdownSource', () => {
  it('wraps the markdown in a named comment', () => {
    expect(markdownSource('Colors', '| a |\n')).toBe('<!--MARKDOWN:Colors-->\n| a |\n<!--/MARKDOWN-->')
  })

  it('keeps a "-->" in the markdown from closing the comment', () => {
    const html = markdownSource('Arrows', 'a --> b')
    expect(html.indexOf('-->')).toBe(html.indexOf('<!--MARKDOWN:Arrows-->') + '<!--MARKDOWN:Arrows'.length)
    expect(extractMarkdownSources(html).get('Arrows')).toEqual(['a --> b'])
  })
})

describe('extractMarkdownSources', () => {
  it('collects sources per component name in document order', () => {
    const html = `<p>x</p>${markdownSource('Colors', 'first')}<div>${markdownSource('Flags', 'flags')}</div>${markdownSource('Colors', 'second')}`
    const sources = extractMarkdownSources(html)
    expect(sources.get('Colors')).toEqual(['first', 'second'])
    expect(sources.get('Flags')).toEqual(['flags'])
  })

  it('returns an empty map for a page without sources', () => {
    expect(extractMarkdownSources('<p>nothing</p>').size).toBe(0)
  })
})

describe('markdownTable', () => {
  it('renders a header row, a separator and the rows', () => {
    expect(markdownTable(['Name', 'Class'], [['Blue', '`.bg-blue`']])).toBe('| Name | Class |\n| --- | --- |\n| Blue | `.bg-blue` |')
  })

  it('escapes pipes inside cells', () => {
    expect(markdownTable(['a'], [['x | y']])).toContain('| x \\| y |')
  })
})
