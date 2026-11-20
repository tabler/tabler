import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Dropdown from '../../src/bootstrap/dropdown'
import Popover from '../../src/bootstrap/popover'
import Tooltip from '../../src/bootstrap/tooltip'
import { clearFixture, getFixture } from '../helpers/fixture'

// The init modules query the document at import time, so each case mounts its
// markup first and then imports a fresh copy. The query string forces a new
// evaluation, because the browser caches a module per URL.
let run = 0
async function runInit(name: 'dropdown' | 'popover' | 'tooltip'): Promise<void> {
  run += 1
  await import(/* @vite-ignore */ `../../src/${name}.ts?run=${run}`)
}

describe('data-toggle init', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    clearFixture()
  })

  const el = (selector: string): HTMLElement => fixtureEl.querySelector<HTMLElement>(selector)!

  describe('dropdown', () => {
    it('creates an instance for data-bs-toggle and for the data-tblr-toggle alias', async () => {
      fixtureEl.innerHTML = ['<div class="dropdown"><button id="bs" data-bs-toggle="dropdown">One</button><div class="dropdown-menu"></div></div>', '<div class="dropdown"><button id="tblr" data-tblr-toggle="dropdown">Two</button><div class="dropdown-menu"></div></div>'].join('')

      await runInit('dropdown')

      expect(Dropdown.getInstance(el('#bs'))).not.toBeNull()
      expect(Dropdown.getInstance(el('#tblr'))).not.toBeNull()
    })

    it('uses clippingParents as the boundary by default', async () => {
      fixtureEl.innerHTML = '<div class="dropdown"><button data-bs-toggle="dropdown">One</button><div class="dropdown-menu"></div></div>'

      await runInit('dropdown')

      expect((Dropdown.getInstance(el('button')) as Dropdown)._config.boundary).toBe('clippingParents')
    })

    it('uses the document element as the boundary for data-bs-boundary="viewport"', async () => {
      fixtureEl.innerHTML = '<div class="dropdown"><button data-bs-toggle="dropdown" data-bs-boundary="viewport">One</button><div class="dropdown-menu"></div></div>'

      await runInit('dropdown')

      expect((Dropdown.getInstance(el('button')) as Dropdown)._config.boundary).toBe(document.documentElement)
    })

    it('keeps going when one element has a broken config', async () => {
      fixtureEl.innerHTML = ['<div class="dropdown"><button id="broken" data-bs-toggle="dropdown" data-bs-auto-close="5">One</button><div class="dropdown-menu"></div></div>', '<div class="dropdown"><button id="fine" data-bs-toggle="dropdown">Two</button><div class="dropdown-menu"></div></div>'].join('')
      const error = vi.spyOn(console, 'error').mockImplementation(() => {})

      await runInit('dropdown')

      expect(error).toHaveBeenCalledTimes(1)
      expect(Dropdown.getInstance(el('#fine'))).not.toBeNull()
    })
  })

  for (const [name, Component] of [
    ['tooltip', Tooltip],
    ['popover', Popover],
  ] as const) {
    const instance = (selector: string) => Component.getInstance(el(selector)) as Tooltip | null

    describe(name, () => {
      it('creates an instance for data-bs-toggle and for the data-tblr-toggle alias', async () => {
        fixtureEl.innerHTML = `<a id="bs" href="#" data-bs-toggle="${name}" title="One">One</a><a id="tblr" href="#" data-tblr-toggle="${name}" title="Two">Two</a>`

        await runInit(name)

        expect(instance('#bs')).not.toBeNull()
        expect(instance('#tblr')).not.toBeNull()
      })

      it('uses a short delay and automatic placement by default', async () => {
        fixtureEl.innerHTML = `<a href="#" data-bs-toggle="${name}" title="One">One</a>`

        await runInit(name)

        expect(instance('a')!._config.delay).toEqual({ show: 50, hide: 50 })
        expect(instance('a')!._config.placement).toBe('auto')
      })

      it('lets data-bs-delay and data-bs-placement win over the defaults', async () => {
        fixtureEl.innerHTML = `<a href="#" data-bs-toggle="${name}" data-bs-delay="200" data-bs-placement="top" title="One">One</a>`

        await runInit(name)

        expect(instance('a')!._config.delay).toEqual({ show: 200, hide: 200 })
        expect(instance('a')!._config.placement).toBe('top')
      })

      it('keeps going when one element has a broken config', async () => {
        fixtureEl.innerHTML = `<a id="broken" href="#" data-bs-toggle="${name}" data-bs-animation="5" title="One">One</a><a id="fine" href="#" data-bs-toggle="${name}" title="Two">Two</a>`
        const error = vi.spyOn(console, 'error').mockImplementation(() => {})

        await runInit(name)

        expect(error).toHaveBeenCalledTimes(1)
        expect(instance('#broken')).toBeNull()
        expect(instance('#fine')).not.toBeNull()
      })
    })
  }
})
