import { describe, expect, it } from 'vitest'
import { requireIndex } from './array'

describe('requireIndex', () => {
  it('returns the entry at the given index', () => {
    expect(requireIndex(['a', 'b', 'c'], 1)).toBe('b')
  })

  it('throws when the index is out of bounds', () => {
    expect(() => requireIndex(['a'], 5)).toThrow('Expected an entry at index 5')
  })
})
