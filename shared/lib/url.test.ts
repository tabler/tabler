import { describe, expect, it } from 'vitest'
import { isExternal } from './url'

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
