import { describe, it, expect, beforeAll, vi } from 'vitest'
import { getFixture } from '../helpers/fixture'

// The module wires every [data-bs-toggle="switch-icon"] present at import
// time, so the fixture is mounted first and the module imported once after.
const button = (id: string, extra = '') => `<button type="button" id="${id}" class="switch-icon ${extra}" data-bs-toggle="switch-icon" aria-pressed="false"><span class="switch-icon-a">a</span><span class="switch-icon-b">b</span></button>`

const tick = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('switch-icon', () => {
  let fixtureEl: HTMLElement

  beforeAll(async () => {
    fixtureEl = getFixture()
    fixtureEl.innerHTML = [button('plain'), button('cancelled'), button('async'), button('failing'), button('loading', 'switch-icon-loading'), button('disabled', 'disabled')].join('')
    await import('../../src/switch-icon')
  })

  it('toggles the active class and aria-pressed on click', () => {
    const el = fixtureEl.querySelector<HTMLElement>('#plain')!

    el.click()
    expect(el.classList.contains('active')).toBe(true)
    expect(el.getAttribute('aria-pressed')).toBe('true')

    el.click()
    expect(el.classList.contains('active')).toBe(false)
    expect(el.getAttribute('aria-pressed')).toBe('false')
  })

  it('dispatches tabler:switch-icon-toggle with the requested state and can be cancelled', () => {
    const el = fixtureEl.querySelector<HTMLElement>('#cancelled')!
    const listener = vi.fn((event: Event) => event.preventDefault())
    el.addEventListener('tabler:switch-icon-toggle', listener)

    el.click()

    expect(listener).toHaveBeenCalledTimes(1)
    expect((listener.mock.calls[0]![0] as CustomEvent).detail.active).toBe(true)
    expect(el.classList.contains('active')).toBe(false)
    expect(el.getAttribute('aria-pressed')).toBe('false')
  })

  it('shows the loading state until a promise passed to wait() resolves', async () => {
    const el = fixtureEl.querySelector<HTMLElement>('#async')!
    let resolve!: () => void
    el.addEventListener('tabler:switch-icon-toggle', (event) => {
      ;(event as CustomEvent).detail.wait(new Promise<void>((r) => (resolve = r)))
    })

    el.click()
    expect(el.classList.contains('switch-icon-loading')).toBe(true)
    expect(el.getAttribute('aria-busy')).toBe('true')
    expect(el.classList.contains('active')).toBe(false)

    // a click while loading is ignored
    el.click()
    expect(el.classList.contains('switch-icon-loading')).toBe(true)

    resolve()
    await tick()
    expect(el.classList.contains('switch-icon-loading')).toBe(false)
    expect(el.hasAttribute('aria-busy')).toBe(false)
    expect(el.classList.contains('active')).toBe(true)
    expect(el.getAttribute('aria-pressed')).toBe('true')
  })

  it('keeps the previous state when the promise rejects', async () => {
    const el = fixtureEl.querySelector<HTMLElement>('#failing')!
    el.addEventListener('tabler:switch-icon-toggle', (event) => {
      ;(event as CustomEvent).detail.wait(Promise.reject(new Error('nope')))
    })

    el.click()
    expect(el.classList.contains('switch-icon-loading')).toBe(true)

    await tick()
    expect(el.classList.contains('switch-icon-loading')).toBe(false)
    expect(el.classList.contains('active')).toBe(false)
    expect(el.getAttribute('aria-pressed')).toBe('false')
  })

  it('ignores clicks on a button rendered in the loading state', () => {
    const el = fixtureEl.querySelector<HTMLElement>('#loading')!

    el.click()
    expect(el.classList.contains('active')).toBe(false)
  })

  it('ignores clicks on a button with the disabled class (keyboard still fires click)', () => {
    const el = fixtureEl.querySelector<HTMLElement>('#disabled')!

    el.click()
    expect(el.classList.contains('active')).toBe(false)
    expect(el.getAttribute('aria-pressed')).toBe('false')
  })
})
