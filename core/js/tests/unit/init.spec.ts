import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import { init, dispose } from '../../src/init'
import Autosize from '../../src/autosize'
import SwitchIcon from '../../src/switch-icon'
import Tooltip from '../../src/bootstrap/tooltip'

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
