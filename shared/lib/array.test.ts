import { describe, expect, it } from 'vitest'
import { range, requireIndex } from './array'

describe('requireIndex', () => {
  it('returns the entry at the given index', () => {
    expect(requireIndex(['a', 'b', 'c'], 1)).toBe('b')
  })

  it('throws when the index is out of bounds', () => {
    expect(() => requireIndex(['a'], 5)).toThrow('Expected an entry at index 5')
  })
})

describe('range', () => {
  it('builds an inclusive integer range', () => {
    expect(range(1, 4)).toEqual([1, 2, 3, 4])
  })

  it('returns an empty array when from > to', () => {
    expect(range(3, 1)).toEqual([])
  })
})
