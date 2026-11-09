import { describe, it, expect, afterEach, vi } from 'vitest'
import { prefersReducedMotion } from '../../src/util/prefers-reduced-motion'

describe('prefersReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockMatchMedia = (matches: boolean) => vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ matches, media: query }) as MediaQueryList)

  it('should return true when the user prefers reduced motion', () => {
    const spy = mockMatchMedia(true)

    expect(prefersReducedMotion()).toBe(true)
    expect(spy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('should return false otherwise', () => {
    mockMatchMedia(false)

    expect(prefersReducedMotion()).toBe(false)
  })
})
