import { describe, it, expect } from 'vitest'
import { sanitizeHtml, DefaultAllowlist } from '../../../src/bootstrap/util/sanitizer'

describe('sanitizer', () => {
  describe('DefaultAllowlist', () => {
    it('should have a wildcard entry with common attributes', () => {
      expect(DefaultAllowlist['*']).toBeDefined()
      const wildcardStrings = DefaultAllowlist['*'].filter(a => typeof a === 'string')
      expect(wildcardStrings).toContain('class')
      expect(wildcardStrings).toContain('id')
      expect(wildcardStrings).toContain('role')
    })

    it('should allow safe tags', () => {
      for (const tag of ['a', 'b', 'br', 'div', 'em', 'h1', 'img', 'li', 'ol', 'p', 'span', 'strong', 'ul']) {
        expect(tag in DefaultAllowlist).toBe(true)
      }
    })

    it('should allow href/target/title/rel for <a>', () => {
      expect(DefaultAllowlist.a).toEqual(expect.arrayContaining(['href', 'target', 'title', 'rel']))
    })
  })

  describe('sanitizeHtml', () => {
    it('should return empty string for empty input', () => {
      expect(sanitizeHtml('', DefaultAllowlist)).toBe('')
    })

    it('should use custom sanitize function when provided', () => {
      const customFn = (html: string) => html.toUpperCase()
      expect(sanitizeHtml('<b>test</b>', DefaultAllowlist, customFn)).toBe('<B>TEST</B>')
    })

    it('should keep allowed elements', () => {
      const result = sanitizeHtml('<b>bold</b>', DefaultAllowlist)
      expect(result).toContain('<b>')
      expect(result).toContain('bold')
    })

    it('should remove disallowed elements', () => {
      const result = sanitizeHtml('<script>alert("xss")</script><b>safe</b>', DefaultAllowlist)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('alert')
      expect(result).toContain('<b>')
    })

    it('should keep allowed attributes', () => {
      const result = sanitizeHtml('<a href="https://example.com" title="link">click</a>', DefaultAllowlist)
      expect(result).toContain('href')
      expect(result).toContain('title')
    })

    it('should remove disallowed attributes', () => {
      const result = sanitizeHtml('<b onclick="alert(1)">bold</b>', DefaultAllowlist)
      expect(result).not.toContain('onclick')
      expect(result).toContain('<b>')
    })

    it('should allow class attribute via wildcard', () => {
      const result = sanitizeHtml('<div class="my-class">content</div>', DefaultAllowlist)
      expect(result).toContain('class="my-class"')
    })

    it('should allow aria-* attributes via regex', () => {
      const result = sanitizeHtml('<div aria-label="test" aria-hidden="true">content</div>', DefaultAllowlist)
      expect(result).toContain('aria-label')
      expect(result).toContain('aria-hidden')
    })

    it('should block javascript: URIs in href', () => {
      const result = sanitizeHtml('<a href="javascript:alert(1)">xss</a>', DefaultAllowlist)
      expect(result).not.toContain('javascript:')
    })

    it('should allow safe URIs in href', () => {
      const result = sanitizeHtml('<a href="https://example.com">link</a>', DefaultAllowlist)
      expect(result).toContain('href="https://example.com"')
    })

    it('should allow relative URIs', () => {
      const result = sanitizeHtml('<a href="/path/to/page">link</a>', DefaultAllowlist)
      expect(result).toContain('href="/path/to/page"')
    })

    it('should block javascript: URIs in src', () => {
      const result = sanitizeHtml('<img src="javascript:alert(1)">', DefaultAllowlist)
      expect(result).not.toContain('javascript:')
    })

    it('should allow safe img src', () => {
      const result = sanitizeHtml('<img src="image.png" alt="pic">', DefaultAllowlist)
      expect(result).toContain('src="image.png"')
      expect(result).toContain('alt="pic"')
    })

    it('should handle nested allowed elements', () => {
      const result = sanitizeHtml('<div><p><strong>text</strong></p></div>', DefaultAllowlist)
      expect(result).toContain('<div>')
      expect(result).toContain('<p>')
      expect(result).toContain('<strong>')
    })

    it('should strip disallowed elements but keep text content', () => {
      const result = sanitizeHtml('<custom-tag>text</custom-tag><b>bold</b>', DefaultAllowlist)
      expect(result).not.toContain('<custom-tag>')
      expect(result).toContain('<b>bold</b>')
    })

    it('should work with custom allowList', () => {
      const customList = { b: [], i: [] }
      const result = sanitizeHtml('<b>bold</b><div>removed</div><i>italic</i>', customList)
      expect(result).toContain('<b>')
      expect(result).toContain('<i>')
      expect(result).not.toContain('<div>')
    })
  })
})
