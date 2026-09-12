import { describe, expect, it } from 'vitest'
import { addPageModal, drainPageModals } from './page-modals'

describe('page-modals registry', () => {
  it('drains registrations in insertion order and empties the registry', () => {
    addPageModal('<div>a</div>')
    addPageModal('<div>b</div>')
    expect(drainPageModals()).toEqual(['<div>a</div>', '<div>b</div>'])
    expect(drainPageModals()).toEqual([])
  })

  it('dedupes identical registrations (same modal declared twice renders once)', () => {
    addPageModal('<div>same</div>')
    addPageModal('<div>same</div>')
    expect(drainPageModals()).toHaveLength(1)
  })
})
