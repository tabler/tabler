import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'

// The sidebar module reads the folded state at import time, so each case
// mounts its markup first and then imports a fresh copy. It lives in its own
// file because every import also adds the document click listeners again.
let run = 0
async function runSidebarScript(): Promise<void> {
  run += 1
  await import(/* @vite-ignore */ `../../src/sidebar.ts?run=${run}`)
}

const sidebarHTML = [
  '<aside class="navbar navbar-vertical">',
  '  <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"></a><div class="dropdown-menu show"></div></div>',
  '</aside>',
  '<button type="button" data-bs-toggle="sidebar-folded" aria-pressed="false">Toggle</button>',
  '<button type="button" data-tblr-toggle="sidebar-folded">Toggle</button>',
].join('')

describe('sidebar init', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    document.documentElement.removeAttribute('data-bs-sidebar')
  })

  const pressed = (): Array<string | null> => [...fixtureEl.querySelectorAll('button')].map((button) => button.getAttribute('aria-pressed'))

  for (const state of ['folded', 'folded-hover']) {
    it(`closes server-rendered open submenus and marks the toggles as pressed for ${state}`, async () => {
      document.documentElement.setAttribute('data-bs-sidebar', state)
      fixtureEl.innerHTML = sidebarHTML

      await runSidebarScript()

      expect(fixtureEl.querySelector('.dropdown-menu')!.classList.contains('show')).toBe(false)
      expect(fixtureEl.querySelector('.dropdown-toggle')!.getAttribute('aria-expanded')).toBe('false')
      expect(pressed()).toEqual(['true', 'true'])
    })
  }

  it('keeps open submenus and marks the toggles as not pressed when the sidebar is expanded', async () => {
    fixtureEl.innerHTML = sidebarHTML

    await runSidebarScript()

    expect(fixtureEl.querySelector('.dropdown-menu')!.classList.contains('show')).toBe(true)
    expect(fixtureEl.querySelector('.dropdown-toggle')!.getAttribute('aria-expanded')).toBe('true')
    expect(pressed()).toEqual(['false', 'false'])
  })

  it('leaves an open dropdown outside the sidebar alone', async () => {
    document.documentElement.setAttribute('data-bs-sidebar', 'folded')
    fixtureEl.innerHTML = '<div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"></a><div class="dropdown-menu show"></div></div>'

    await runSidebarScript()

    expect(fixtureEl.querySelector('.dropdown-menu')!.classList.contains('show')).toBe(true)
  })
})
