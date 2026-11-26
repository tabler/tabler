import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import { Dropdown, Popover, Tooltip } from '../../src/bootstrap'
import '../../src/dropdown'
import '../../src/tooltip'
import '../../src/popover'

const bubble = (el: Element, type: string): void => {
  el.dispatchEvent(new Event(type, { bubbles: true }))
}

describe('lazy data API initialisers', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  it('creates a tooltip on first hover with the Tabler defaults', () => {
    fixtureEl.innerHTML = '<button data-bs-toggle="tooltip" title="Hi">x</button>'
    const el = fixtureEl.querySelector('button')!

    expect(Tooltip.getInstance(el)).toBeNull()

    bubble(el, 'mouseover')

    const tooltip = Tooltip.getInstance(el) as Tooltip & { _config: { delay: unknown; placement: string } }
    expect(tooltip).not.toBeNull()
    expect(tooltip._config.delay).toEqual({ show: 50, hide: 50 })
    expect(tooltip._config.placement).toBe('auto')
  })

  it('lets data attributes win and accepts the data-tblr alias', () => {
    fixtureEl.innerHTML = '<button data-tblr-toggle="tooltip" data-bs-delay="0" data-bs-placement="bottom" title="Hi"><span>x</span></button>'
    const el = fixtureEl.querySelector('button')!

    bubble(el.querySelector('span')!, 'focusin')

    const tooltip = Tooltip.getInstance(el) as Tooltip & { _config: { delay: unknown; placement: string } }
    expect(tooltip._config.delay).toEqual({ show: 0, hide: 0 })
    expect(tooltip._config.placement).toBe('bottom')
  })

  it('creates a popover on first click', () => {
    fixtureEl.innerHTML = '<button data-bs-toggle="popover" data-bs-content="Hi">x</button>'
    const el = fixtureEl.querySelector('button')!

    expect(Popover.getInstance(el)).toBeNull()

    bubble(el, 'click')

    expect(Popover.getInstance(el)).not.toBeNull()
  })

  it('creates a dropdown with the viewport boundary on first click', () => {
    fixtureEl.innerHTML = '<div class="dropdown"><button data-bs-toggle="dropdown" data-bs-boundary="viewport">x</button><div class="dropdown-menu"></div></div>'
    const el = fixtureEl.querySelector('button')!

    expect(Dropdown.getInstance(el)).toBeNull()

    bubble(el, 'click')

    const dropdown = Dropdown.getInstance(el) as Dropdown & { _config: { boundary: unknown } }
    expect(dropdown).not.toBeNull()
    expect(dropdown._config.boundary).toBe(document.documentElement)
  })

  it('keeps an existing instance untouched', () => {
    fixtureEl.innerHTML = '<button data-bs-toggle="tooltip" title="Hi">x</button>'
    const el = fixtureEl.querySelector('button')!
    const tooltip = new Tooltip(el, { placement: 'left' })

    bubble(el, 'mouseover')

    expect(Tooltip.getInstance(el)).toBe(tooltip)
  })
})
