import { describe, expect, it } from 'vitest'
import { beautifyHtml, highlightCode } from './code-example'

describe('beautifyHtml', () => {
  it('re-indents nested markup with two spaces', () => {
    expect(beautifyHtml('<div>\n<span>x</span>\n</div>')).toBe('<div>\n  <span>x</span>\n</div>')
  })

  it('gives inline elements their own line', () => {
    // Examples reach this function as a single line — MDX drops the whitespace
    // between sibling elements — so line breaks have to be added back.
    expect(beautifyHtml('<div><span>x</span></div>')).toBe('<div>\n  <span>x</span>\n</div>')
  })
})

describe('highlightCode', () => {
  it('renders shiki-highlighted html for the given language', async () => {
    const html = await highlightCode('<a href="#">x</a>', 'html')
    expect(html).toContain('<pre')
    expect(html).toContain('shiki')
  })
})
