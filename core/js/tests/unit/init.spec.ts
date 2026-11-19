import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import { init, dispose } from '../../src/init'
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

  it('ignores a root that was never initialised', () => {
    fixtureEl.innerHTML = markup

    expect(() => dispose(fixtureEl)).not.toThrow()
  })
})
