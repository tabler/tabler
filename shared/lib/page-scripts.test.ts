import { describe, expect, it } from 'vitest'
import { addPageScript, drainPageScripts } from './page-scripts'

describe('page-scripts registry', () => {
  it('drains registrations in insertion order and empties the registry', () => {
    addPageScript('<script>a</script>')
    addPageScript('<script>b</script>')
    expect(drainPageScripts()).toEqual(['<script>a</script>', '<script>b</script>'])
    expect(drainPageScripts()).toEqual([])
  })

  it('keeps byte-identical registrations (no dedup)', () => {
    addPageScript('<script>same</script>')
    addPageScript('<script>same</script>')
    expect(drainPageScripts()).toHaveLength(2)
  })

  it('passes promises through untouched', async () => {
    const pending = Promise.resolve('<script>later</script>')
    addPageScript(pending)
    const drained = drainPageScripts()
    expect(drained[0]).toBe(pending)
    await expect(drained[0]).resolves.toBe('<script>later</script>')
  })
})
