import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import { Dropdown } from '../../src/bootstrap'

import '../../src/sidebar'

describe('sidebar folded toggle', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<button type="button" data-bs-toggle="sidebar-folded" aria-pressed="false">Toggle</button>'
  })

  afterEach(() => {
    clearFixture()
    document.documentElement.removeAttribute('data-bs-sidebar')
    localStorage.removeItem('tabler-sidebar')
  })

  const trigger = (): HTMLButtonElement => fixtureEl.querySelector('button')!

  it('folds the sidebar to the hover variant on first click', () => {
    trigger().click()

    expect(document.documentElement.getAttribute('data-bs-sidebar')).toBe('folded-hover')
    expect(localStorage.getItem('tabler-sidebar')).toBe('folded-hover')
    expect(trigger().getAttribute('aria-pressed')).toBe('true')
  })

  it('unfolds the sidebar on second click', () => {
    trigger().click()
    trigger().click()

    expect(document.documentElement.hasAttribute('data-bs-sidebar')).toBe(false)
    expect(localStorage.getItem('tabler-sidebar')).toBe('default')
    expect(trigger().getAttribute('aria-pressed')).toBe('false')
  })

  it('unfolds from the static folded state', () => {
    document.documentElement.setAttribute('data-bs-sidebar', 'folded')

    trigger().click()

    expect(document.documentElement.hasAttribute('data-bs-sidebar')).toBe(false)
    expect(localStorage.getItem('tabler-sidebar')).toBe('default')
  })

  it('dispatches tabler:sidebar-folded with the new state', () => {
    const listener = vi.fn()
    document.addEventListener('tabler:sidebar-folded', listener, { once: true })

    trigger().click()

    expect(listener).toHaveBeenCalledTimes(1)
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ folded: true })
  })

  it('closes an open sidebar dropdown on an outside click when folded', () => {
    document.documentElement.setAttribute('data-bs-sidebar', 'folded-hover')
    fixtureEl.innerHTML = ['<aside class="navbar navbar-vertical">', '  <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"></a><div class="dropdown-menu show"></div></div>', '</aside>', '<button type="button" id="outside">Outside</button>'].join('')
    const hide = vi.fn()
    vi.spyOn(Dropdown, 'getInstance').mockReturnValue({ hide } as never)

    fixtureEl.querySelector<HTMLButtonElement>('#outside')!.click()

    expect(hide).toHaveBeenCalledTimes(1)
    vi.restoreAllMocks()
  })

  it('keeps an open sidebar dropdown when clicking inside its menu when folded', () => {
    document.documentElement.setAttribute('data-bs-sidebar', 'folded-hover')
    fixtureEl.innerHTML = ['<aside class="navbar navbar-vertical">', '  <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"></a><div class="dropdown-menu show"><button type="button" id="inside">Item</button></div></div>', '</aside>'].join('')
    const hide = vi.fn()
    vi.spyOn(Dropdown, 'getInstance').mockReturnValue({ hide } as never)

    fixtureEl.querySelector<HTMLButtonElement>('#inside')!.click()

    expect(hide).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('ignores clicks outside a toggle', () => {
    fixtureEl.innerHTML = '<button type="button">Plain</button>'

    fixtureEl.querySelector('button')!.click()

    expect(document.documentElement.hasAttribute('data-bs-sidebar')).toBe(false)
    expect(localStorage.getItem('tabler-sidebar')).toBeNull()
  })
})
