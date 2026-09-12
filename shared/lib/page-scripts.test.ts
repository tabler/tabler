import { describe, expect, it } from 'vitest'
import { addPageScript, drainPageScripts } from './page-scripts'

describe('page-scripts registry', () => {
  it('drains registrations in insertion order and empties the registry', () => {
    const render = {}
    addPageScript(render, '<script>a</script>')
    addPageScript(render, '<script>b</script>')
    expect(drainPageScripts(render)).toEqual(['<script>a</script>', '<script>b</script>'])
    expect(drainPageScripts(render)).toEqual([])
  })

  it('keeps byte-identical registrations (no dedup)', () => {
    const render = {}
    addPageScript(render, '<script>same</script>')
    addPageScript(render, '<script>same</script>')
    expect(drainPageScripts(render)).toHaveLength(2)
  })

  it('passes promises through untouched', async () => {
    const render = {}
    const pending = Promise.resolve('<script>later</script>')
    addPageScript(render, pending)
    const drained = drainPageScripts(render)
    expect(drained[0]).toBe(pending)
    await expect(drained[0]).resolves.toBe('<script>later</script>')
  })

  it('keeps the registrations of one render away from another', () => {
    const page = {}
    const endpoint = {}
    addPageScript(endpoint, '<script>leak</script>')
    addPageScript(page, '<script>mine</script>')
    expect(drainPageScripts(page)).toEqual(['<script>mine</script>'])
  })
})
