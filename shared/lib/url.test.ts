import { describe, expect, it } from 'vitest'
import { isExternal, relativeBase } from './url'

describe('isExternal', () => {
  it('is true for absolute http(s) urls', () => {
    expect(isExternal('https://tabler.io')).toBe(true)
    expect(isExternal('http://example.com/page')).toBe(true)
  })

  it('is false for relative urls and anchors', () => {
    expect(isExternal('./dashboard')).toBe(false)
    expect(isExternal('dashboard.html')).toBe(false)
    expect(isExternal('#section')).toBe(false)
  })

  it('is false for undefined and empty values', () => {
    expect(isExternal(undefined)).toBe(false)
    expect(isExternal('')).toBe(false)
  })
})

describe('isExternal (anchored)', () => {
  it('is false when http(s) appears mid-string', () => {
    expect(isExternal('/redirect?to=https://example.com')).toBe(false)
  })
})

describe('relativeBase', () => {
  it('is "." for top-level pages, including a folder index built as a root file', () => {
    expect(relativeBase('/')).toBe('.')
    expect(relativeBase('/marketing')).toBe('.')
    expect(relativeBase('/marketing/')).toBe('.')
    expect(relativeBase('/marketing.html')).toBe('.')
  })

  it('climbs one level per folder', () => {
    expect(relativeBase('/marketing/about')).toBe('..')
    expect(relativeBase('/marketing/about.html')).toBe('..')
    expect(relativeBase('/a/b/c.html')).toBe('../..')
  })
})
