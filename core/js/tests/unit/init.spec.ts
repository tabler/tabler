import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import { init, dispose } from '../../src/init'
import * as tabler from '../../tabler'
import { getRegistry } from '../../src/bootstrap/util/component-functions'
import Banner from '../../src/banner'
import Confetti from '../../src/confetti'
import Carousel from '../../src/bootstrap/carousel'
import Offcanvas from '../../src/bootstrap/offcanvas'
import ScrollSpy from '../../src/bootstrap/scrollspy'
import Tab from '../../src/bootstrap/tab'
import Modal from '../../src/bootstrap/modal'
import Autosize from '../../src/autosize'
import SwitchIcon from '../../src/switch-icon'
import Datepicker from '../../src/datepicker'
import Dropdown from '../../src/bootstrap/dropdown'
import Popover from '../../src/bootstrap/popover'
import Tooltip from '../../src/bootstrap/tooltip'
import '../../src/dropdown'
import '../../src/popover'
import '../../src/tooltip'

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    setOptions: vi.fn(),
  })),
}))

describe('init and dispose', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  const markup = '<div id="fragment"><textarea data-bs-toggle="autosize"></textarea><button data-bs-toggle="switch-icon">x</button></div>'

  it('creates the registered plugins under the root only', () => {
    fixtureEl.innerHTML = `${markup}<textarea id="outside" data-bs-toggle="autosize"></textarea>`
    const fragment = fixtureEl.querySelector<HTMLElement>('#fragment')!

    init(fragment)

    expect(Autosize.getInstance(fragment.querySelector('textarea')!)).not.toBeNull()
    expect(SwitchIcon.getInstance(fragment.querySelector('button')!)).not.toBeNull()
    expect(Autosize.getInstance(fixtureEl.querySelector('#outside')!)).toBeNull()
  })

  it('includes a root that matches itself and defaults to the document', () => {
    fixtureEl.innerHTML = '<textarea data-bs-toggle="autosize"></textarea>'
    const textarea = fixtureEl.querySelector('textarea')!

    init(textarea)
    expect(Autosize.getInstance(textarea)).not.toBeNull()

    fixtureEl.insertAdjacentHTML('beforeend', '<button data-bs-toggle="switch-icon">x</button>')
    init()
    expect(SwitchIcon.getInstance(fixtureEl.querySelector('button')!)).not.toBeNull()
  })

  it('creates tooltips, popovers and dropdowns with the Tabler options', () => {
    fixtureEl.innerHTML = [
      '<span id="tip" data-bs-toggle="tooltip" title="Hi">?</span>',
      '<span id="slow" data-bs-toggle="tooltip" data-bs-delay="300" data-bs-placement="top" title="Hi">?</span>',
      '<a id="pop" data-bs-toggle="popover" data-bs-content="Body">?</a>',
      '<div class="dropdown"><a id="drop" href="#" data-bs-toggle="dropdown" data-bs-boundary="viewport">Menu</a><div class="dropdown-menu"></div></div>',
    ].join('')

    init(fixtureEl)

    const config = (instance: unknown) => (instance as { _config: Record<string, unknown> })._config
    expect(config(Tooltip.getInstance(fixtureEl.querySelector('#tip')!))).toMatchObject({ delay: { show: 50, hide: 50 }, placement: 'auto' })
    expect(config(Tooltip.getInstance(fixtureEl.querySelector('#slow')!))).toMatchObject({ delay: { show: 300, hide: 300 }, placement: 'top' })
    expect(config(Popover.getInstance(fixtureEl.querySelector('#pop')!))).toMatchObject({ delay: { show: 50, hide: 50 }, placement: 'auto' })
    expect(config(Dropdown.getInstance(fixtureEl.querySelector('#drop')!)).boundary).toBe(document.documentElement)
  })

  it('applies the filter of the plugin', () => {
    fixtureEl.innerHTML = '<input id="lazy" data-bs-toggle="datepicker"><input id="eager" data-bs-toggle="datepicker" value="2026-01-15">'

    init(fixtureEl)

    expect(Datepicker.getInstance(fixtureEl.querySelector('#lazy')!)).toBeNull()
    expect(Datepicker.getInstance(fixtureEl.querySelector('#eager')!)).not.toBeNull()
  })

  it('keeps an existing instance', () => {
    fixtureEl.innerHTML = markup
    const textarea = fixtureEl.querySelector('textarea')!
    const existing = new Autosize(textarea)

    init(fixtureEl)

    expect(Autosize.getInstance(textarea)).toBe(existing)
  })

  it('disposes plugin and Bootstrap instances under the root', () => {
    fixtureEl.innerHTML = `${markup}<span id="tip" title="Hi">?</span>`
    const fragment = fixtureEl.querySelector<HTMLElement>('#fragment')!
    const tip = fixtureEl.querySelector<HTMLElement>('#tip')!
    init(fragment)
    const tooltip = new Tooltip(tip)
    const spy = vi.spyOn(tooltip, 'dispose')

    dispose(fragment)

    expect(Autosize.getInstance(fragment.querySelector('textarea')!)).toBeNull()
    expect(SwitchIcon.getInstance(fragment.querySelector('button')!)).toBeNull()
    expect(Tooltip.getInstance(tip)).toBe(tooltip)

    dispose()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(Tooltip.getInstance(tip)).toBeNull()
  })

  it.each([
    ['a riding carousel', '<div class="carousel" data-bs-ride="carousel" data-bs-interval="false"><div class="carousel-inner"><div class="carousel-item active"></div></div></div>', '.carousel', Carousel],
    ['a scrollspy', '<nav id="spy-nav"><a href="#spy-one">One</a></nav><div data-bs-spy="scroll" data-bs-target="#spy-nav"><div id="spy-one"></div></div>', '[data-bs-spy]', ScrollSpy],
    ['an active tab', '<ul class="nav"><li><a class="nav-link active" data-bs-toggle="tab" href="#tab-pane">Tab</a></li></ul><div class="tab-content"><div class="tab-pane active" id="tab-pane"></div></div>', '[data-bs-toggle="tab"]', Tab],
  ] as const)('creates %s under the root, as the page start does', (_name, html, selector, Plugin) => {
    fixtureEl.innerHTML = `<div id="fragment">${html}</div>`

    init(fixtureEl.querySelector('#fragment')!)

    expect(Plugin.getInstance(fixtureEl.querySelector<HTMLElement>(selector)!)).not.toBeNull()
  })

  it('shows an offcanvas that is open in the markup', () => {
    fixtureEl.innerHTML = '<div class="offcanvas offcanvas-end show" style="position: fixed"></div><div class="offcanvas show" id="static"></div>'
    const show = vi.spyOn(Offcanvas.prototype, 'show')

    init(fixtureEl)
    init(fixtureEl)

    expect(show).toHaveBeenCalledTimes(1)
    expect(Offcanvas.getInstance(fixtureEl.querySelector<HTMLElement>('#static')!)).toBeNull()
    dispose(fixtureEl)
    show.mockRestore()
  })

  it('removes a remembered closed banner under the root', () => {
    localStorage.setItem('tabler-banner', 'release')
    fixtureEl.innerHTML = '<div class="banner" data-bs-banner-id="release"></div><div class="banner" data-bs-banner-id="trial"></div>'

    init(fixtureEl)

    expect(fixtureEl.querySelector('[data-bs-banner-id="release"]')).toBeNull()
    expect(fixtureEl.querySelector('[data-bs-banner-id="trial"]')).not.toBeNull()
    localStorage.clear()
  })

  it('disposes plugins that only start from a trigger', () => {
    fixtureEl.innerHTML = '<div class="banner" id="banner"></div><button id="burst"></button><div class="modal" id="modal"></div>'
    const banner = Banner.getOrCreateInstance(fixtureEl.querySelector<HTMLElement>('#banner')!)
    const confetti = Confetti.getOrCreateInstance(fixtureEl.querySelector<HTMLElement>('#burst')!)
    const modal = Modal.getOrCreateInstance(fixtureEl.querySelector<HTMLElement>('#modal')!)
    const spies = [banner, confetti, modal].map((instance) => vi.spyOn(instance as { dispose(): void }, 'dispose'))

    dispose(fixtureEl)

    for (const spy of spies) {
      expect(spy).toHaveBeenCalledTimes(1)
    }
  })

  it('has a registration for every plugin class the bundle exports', () => {
    const registered = new Set(getRegistry().map((registration) => registration.Plugin as unknown))
    const plugins = Object.entries(tabler).filter(([, value]) => typeof value === 'function' && 'getOrCreateInstance' in value)

    expect(plugins.length).toBeGreaterThan(20)
    for (const [name, Plugin] of plugins) {
      expect(registered.has(Plugin), name).toBe(true)
    }
  })

  it('ignores a root that was never initialised', () => {
    fixtureEl.innerHTML = markup

    expect(() => dispose(fixtureEl)).not.toThrow()
  })
})
