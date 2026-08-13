import { describe, expect, it } from 'vitest'
import { beautifyHtml, highlightCode } from './code-example'

describe('beautifyHtml', () => {
  it('re-indents nested markup with two spaces', () => {
    expect(beautifyHtml('<div><span>x</span></div>')).toBe('<div><span>x</span></div>')
    expect(beautifyHtml('<div>\n<span>x</span>\n</div>')).toBe('<div>\n  <span>x</span>\n</div>')
  })
})

describe('highlightCode', () => {
  it('renders shiki-highlighted html for the given language', async () => {
    const html = await highlightCode('<a href="#">x</a>', 'html')
    expect(html).toContain('<pre')
    expect(html).toContain('shiki')
  })
})
