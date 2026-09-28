import { describe, expect, it } from 'vitest'
import { addPageModal, drainPageModals } from './page-modals'

describe('page-modals registry', () => {
  it('drains registrations in insertion order and empties the registry', () => {
    const render = {}
    addPageModal(render, '<div>a</div>')
    addPageModal(render, '<div>b</div>')
    expect(drainPageModals(render)).toEqual(['<div>a</div>', '<div>b</div>'])
    expect(drainPageModals(render)).toEqual([])
  })

  it('passes promises through untouched', async () => {
    const render = {}
    const pending = Promise.resolve('<div>later</div>')
    addPageModal(render, pending)
    const drained = drainPageModals(render)
    expect(drained[0]).toBe(pending)
    await expect(drained[0]).resolves.toBe('<div>later</div>')
  })

  it('keeps the modals of one render away from another', () => {
    const pageA = {}
    const pageB = {}
    addPageModal(pageA, '<div>a</div>')
    addPageModal(pageB, '<div>b</div>')
    expect(drainPageModals(pageB)).toEqual(['<div>b</div>'])
    expect(drainPageModals(pageA)).toEqual(['<div>a</div>'])
  })
})
