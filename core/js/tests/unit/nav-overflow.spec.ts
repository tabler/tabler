import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import NavOverflow from '../../src/bootstrap/nav-overflow'
import Dropdown from '../../src/bootstrap/dropdown'
import { clearFixture, getFixture } from '../helpers/fixture'

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    setOptions: vi.fn(),
  })),
}))

const STYLE = `<style>
  .nav, .navbar-nav { display: flex; margin: 0; padding: 0; list-style: none; }
  .nav-item { flex-shrink: 0; width: 100px; }
  .nav-overflow-item { width: 50px; }
  .d-none { display: none !important; }
  .dropdown-menu { display: none; }
  .dropdown-menu.show { display: block; }
</style>`

const links = (count: number, extra: Record<number, string> = {}): string => Array.from({ length: count }, (_, index) => extra[index] ?? `<li class="nav-item"><a class="nav-link" href="#">Link ${index + 1}</a></li>`).join('')

const nav = (width: number, items: string, attributes = ''): string => `${STYLE}<div class="nav-overflow" style="width: ${width}px" ${attributes}><ul class="nav">${items}</ul></div>`

describe('NavOverflow', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  const wrapper = (): HTMLElement => fixtureEl.querySelector('.nav-overflow')!
  const hidden = (): HTMLElement[] => [...fixtureEl.querySelectorAll<HTMLElement>('.nav-overflow > ul > .nav-item[data-bs-nav-overflow="true"]')]
  const menuItems = (): HTMLElement[] => [...fixtureEl.querySelectorAll<HTMLElement>('.nav-overflow-menu > .dropdown-item')]
  const toggleItem = (): HTMLElement => fixtureEl.querySelector('.nav-overflow-item')!

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(NavOverflow.Default).toEqual(
        expect.objectContaining({
          collapseBelow: 0,
          iconPlacement: 'start',
          menuPlacement: 'bottom-end',
          moreText: 'More',
          threshold: 0,
        }),
      )
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(NavOverflow.DATA_KEY).toEqual('bs.navoverflow')
    })
  })

  describe('constructor', () => {
    it('should accept a selector or an element', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      const bySelector = new NavOverflow('.nav-overflow')
      expect(bySelector._element).toEqual(wrapper())
      bySelector.dispose()

      const byElement = new NavOverflow(wrapper())
      expect(byElement._element).toEqual(wrapper())
    })

    it('should throw when the wrapper has no child nav', () => {
      fixtureEl.innerHTML = '<div class="nav-overflow"></div>'

      expect(() => new NavOverflow(wrapper())).toThrowError(TypeError)
    })

    it('should add the wrapper and initialized classes', () => {
      fixtureEl.innerHTML = nav(1000, links(3)).replace('class="nav-overflow"', '')

      const element = fixtureEl.querySelector<HTMLElement>('div')!
      new NavOverflow(element)

      expect(element).toHaveClass('nav-overflow')
      expect(element).toHaveClass('nav-overflow-initialized')
    })

    it('should create a dropdown toggle and menu inside the nav', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      new NavOverflow(wrapper())

      const toggle = fixtureEl.querySelector('.nav > .nav-overflow-item > .nav-overflow-toggle')!
      expect(toggle.getAttribute('data-bs-toggle')).toEqual('dropdown')
      expect(toggle.nextElementSibling).toHaveClass('dropdown-menu')
      expect(toggle.nextElementSibling).toHaveClass('nav-overflow-menu')
      expect(toggle.nextElementSibling).toHaveClass('dropdown-menu-end')
    })

    it('should add the wrapper class and remove it on dispose when it was missing', () => {
      fixtureEl.innerHTML = `${STYLE}<div id="bare" style="width: 1000px"><ul class="nav">${links(3)}</ul></div>`

      const bare = fixtureEl.querySelector<HTMLElement>('#bare')!
      const navOverflow = new NavOverflow(bare)
      expect(bare).toHaveClass('nav-overflow')

      navOverflow.dispose()
      expect(bare).not.toHaveClass('nav-overflow')
    })
  })

  describe('overflow', () => {
    it('should hide the toggle when every item fits', () => {
      fixtureEl.innerHTML = nav(1000, links(5))

      new NavOverflow(wrapper())

      expect(hidden()).toHaveLength(0)
      expect(toggleItem()).toHaveClass('d-none')
    })

    it('should not reserve room for the toggle when every item fits without it', () => {
      fixtureEl.innerHTML = nav(520, links(5))

      new NavOverflow(wrapper())

      expect(hidden()).toHaveLength(0)
      expect(toggleItem()).toHaveClass('d-none')
    })

    it('should move items that do not fit into the menu', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      new NavOverflow(wrapper())

      expect(hidden().map((item) => item.textContent)).toEqual(['Link 4', 'Link 5', 'Link 6'])
      expect(menuItems().map((item) => item.textContent)).toEqual(['Link 4', 'Link 5', 'Link 6'])
      expect(toggleItem()).not.toHaveClass('d-none')
    })

    it('should collapse a .navbar-nav', () => {
      fixtureEl.innerHTML = nav(360, links(6)).replace('class="nav"', 'class="navbar-nav"')

      new NavOverflow(wrapper())

      expect(hidden()).toHaveLength(3)
    })

    it('should not collapse a vertical nav', () => {
      fixtureEl.innerHTML = nav(360, links(6)).replace('class="nav"', 'class="nav" style="flex-direction: column"')

      new NavOverflow(wrapper())

      expect(hidden()).toHaveLength(0)
      expect(toggleItem()).toHaveClass('d-none')
    })

    it('should copy the active state from the nav item', () => {
      fixtureEl.innerHTML = nav(160, links(3, { 2: '<li class="nav-item active"><a class="nav-link" href="#">Current</a></li>' }))

      new NavOverflow(wrapper())

      expect(menuItems().at(-1)).toHaveClass('active')
    })

    it('should keep nav-overflow-keep items visible', () => {
      fixtureEl.innerHTML = nav(360, links(6, { 5: '<li class="nav-item nav-overflow-keep"><a class="nav-link" href="#">Keep</a></li>' }))

      new NavOverflow(wrapper())

      expect(fixtureEl.querySelector('.nav-overflow-keep')).not.toHaveClass('d-none')
      expect(menuItems().map((item) => item.textContent)).toEqual(['Link 3', 'Link 4', 'Link 5'])
    })

    it('should preserve active and disabled states', () => {
      fixtureEl.innerHTML = nav(
        160,
        links(3, {
          1: '<li class="nav-item"><a class="nav-link active" id="active" href="#">Active</a></li>',
          2: '<li class="nav-item"><a class="nav-link disabled" aria-disabled="true">Disabled</a></li>',
        }),
      )

      new NavOverflow(wrapper())

      const [active, disabled] = menuItems()
      expect(active).toHaveClass('dropdown-item')
      expect(active).toHaveClass('active')
      expect(active.hasAttribute('id')).toBe(false)
      expect(disabled).toHaveClass('disabled')
    })

    it('should fire the overflow event with counts', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      const listener = vi.fn()
      wrapper().addEventListener('overflow.bs.navoverflow', listener)
      new NavOverflow(wrapper())

      const event = listener.mock.calls[0][0] as Event & { overflowCount: number; visibleCount: number }
      expect(event.overflowCount).toEqual(3)
      expect(event.visibleCount).toEqual(3)
    })

    it('should restore items when the wrapper grows', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      const navOverflow = new NavOverflow(wrapper())
      expect(hidden()).toHaveLength(3)

      wrapper().style.width = '1000px'
      navOverflow.update()

      expect(hidden()).toHaveLength(0)
      expect(menuItems()).toHaveLength(0)
    })

    it('should fire the update event', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      const listener = vi.fn()
      wrapper().addEventListener('update.bs.navoverflow', listener)
      new NavOverflow(wrapper()).update()

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should recalculate when the wrapper is resized', async () => {
      fixtureEl.innerHTML = nav(1000, links(6))

      new NavOverflow(wrapper())
      expect(hidden()).toHaveLength(0)

      wrapper().style.width = '360px'
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

      expect(hidden()).toHaveLength(3)
    })

    it('should keep an open menu open when nothing moves', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      const navOverflow = new NavOverflow(wrapper())
      const toggle = fixtureEl.querySelector<HTMLElement>('.nav-overflow-toggle')!
      toggle.click()
      expect(fixtureEl.querySelector('.nav-overflow-menu')).toHaveClass('show')

      wrapper().style.height = '200px'
      wrapper().style.width = '365px'
      navOverflow.update()

      expect(fixtureEl.querySelector('.nav-overflow-menu')).toHaveClass('show')
      expect(toggle.getAttribute('aria-expanded')).toEqual('true')
      expect(hidden()).toHaveLength(3)
      expect(menuItems()).toHaveLength(3)
    })

    it('should rebuild the menu when the overflowing items change', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      const navOverflow = new NavOverflow(wrapper())
      fixtureEl.querySelector<HTMLElement>('.nav-overflow-toggle')!.click()

      wrapper().style.width = '460px'
      navOverflow.update()

      expect(fixtureEl.querySelector('.nav-overflow-menu')).not.toHaveClass('show')
      expect(menuItems().map((item) => item.textContent)).toEqual(['Link 5', 'Link 6'])
    })

    it('should reuse a toggle written in the markup', () => {
      fixtureEl.innerHTML = nav(360, links(6) + '<li class="nav-item dropdown nav-overflow-item"><button class="nav-link nav-overflow-toggle" type="button" data-bs-toggle="dropdown" aria-label="Show more">…</button><div class="dropdown-menu nav-overflow-menu"></div></li>')

      const navOverflow = new NavOverflow(wrapper())

      expect(fixtureEl.querySelectorAll('.nav-overflow-toggle')).toHaveLength(1)
      expect(menuItems()).toHaveLength(3)

      navOverflow.dispose()
      expect(fixtureEl.querySelector('.nav-overflow-toggle')).not.toBeNull()
    })
  })

  describe('config', () => {
    it('should keep a minimum number of visible items with threshold', () => {
      fixtureEl.innerHTML = nav(100, links(6))

      new NavOverflow(wrapper(), { threshold: 2 })

      expect(hidden()).toHaveLength(4)
    })

    it('should drop the text and label the toggle when moreText is false', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      new NavOverflow(wrapper(), { moreText: false })

      const toggle = fixtureEl.querySelector('.nav-overflow-toggle')!
      expect(toggle.querySelector('.nav-overflow-text')).toBeNull()
      expect(toggle.getAttribute('aria-label')).toEqual('More')
    })

    it('should read moreText from data attributes', () => {
      fixtureEl.innerHTML = nav(1000, links(3), 'data-bs-more-text="See all"')

      new NavOverflow(wrapper())

      const toggle = fixtureEl.querySelector('.nav-overflow-toggle')!
      expect(toggle.querySelector('.nav-overflow-text')!.textContent).toEqual('See all')
      expect(toggle.hasAttribute('aria-label')).toBe(false)
    })

    it('should treat moreText as plain text', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      new NavOverflow(wrapper(), { moreText: '<img src=x onerror=alert(1)>' })

      expect(fixtureEl.querySelector('.nav-overflow-text img')).toBeNull()
    })

    it('should place the icon after the text when iconPlacement is end', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      new NavOverflow(wrapper(), { iconPlacement: 'end' })

      const toggle = fixtureEl.querySelector('.nav-overflow-toggle')!
      expect(toggle.firstElementChild).toHaveClass('nav-overflow-text')
      expect(toggle.lastElementChild).toHaveClass('nav-overflow-icon')
    })

    it('should sanitize moreIcon', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      new NavOverflow(wrapper(), { moreIcon: '<svg viewBox="0 0 24 24" onload="alert(1)"><path d="M0 0"/></svg><script>alert(1)</script>' })

      const icon = fixtureEl.querySelector('.nav-overflow-icon')!
      expect(icon.querySelector('script')).toBeNull()
      expect(icon.querySelector('svg')!.hasAttribute('onload')).toBe(false)
      expect(icon.querySelector('svg')!.getAttribute('viewBox')).toEqual('0 0 24 24')
    })

    it('should use a child [data-bs-overflow-icon] element as the icon', () => {
      fixtureEl.innerHTML = nav(1000, links(3)).replace('</ul>', '</ul><svg data-bs-overflow-icon class="custom-icon" onclick="alert(1)"></svg>')

      new NavOverflow(wrapper(), { moreIcon: '<svg class="config-icon"></svg>' })

      const icon = fixtureEl.querySelector('.nav-overflow-icon > svg')!
      expect(icon).toHaveClass('custom-icon')
      expect(icon.hasAttribute('data-bs-overflow-icon')).toBe(false)
      expect(icon.hasAttribute('onclick')).toBe(false)
      expect(fixtureEl.querySelectorAll('.custom-icon')).toHaveLength(1)
    })

    it('should map menuPlacement to dropdown classes', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      new NavOverflow(wrapper(), { menuPlacement: 'top-start' })

      expect(toggleItem()).toHaveClass('dropup')
      expect(fixtureEl.querySelector('.nav-overflow-menu')).not.toHaveClass('dropdown-menu-end')
    })

    it('should pass menuStrategy to the overflow dropdown', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      new NavOverflow(wrapper(), { menuStrategy: 'fixed' })

      const dropdown = Dropdown.getInstance(fixtureEl.querySelector<HTMLElement>('.nav-overflow-toggle')!) as Dropdown
      expect(dropdown._config.popperConfig).toEqual({ strategy: 'fixed' })
    })
  })

  describe('collapseBelow', () => {
    it('should collapse every item below a pixel value', () => {
      fixtureEl.innerHTML = nav(600, links(3))

      new NavOverflow(wrapper(), { collapseBelow: 700 })

      expect(hidden()).toHaveLength(3)
    })

    it('should not collapse above a pixel value', () => {
      fixtureEl.innerHTML = nav(600, links(3))

      new NavOverflow(wrapper(), { collapseBelow: 500 })

      expect(hidden()).toHaveLength(0)
    })

    it('should resolve a breakpoint name from --tblr-breakpoint-{name}', () => {
      document.documentElement.style.setProperty('--tblr-breakpoint-md', '768px')
      fixtureEl.innerHTML = nav(600, links(3), 'data-bs-collapse-below="md"')

      new NavOverflow(wrapper())

      expect(hidden()).toHaveLength(3)
      document.documentElement.style.removeProperty('--tblr-breakpoint-md')
    })

    it('should keep nav-overflow-keep items when collapsing all', () => {
      fixtureEl.innerHTML = nav(600, links(3, { 0: '<li class="nav-item nav-overflow-keep"><a class="nav-link" href="#">Keep</a></li>' }))

      new NavOverflow(wrapper(), { collapseBelow: 700 })

      expect(hidden()).toHaveLength(2)
    })
  })

  describe('dropdowns', () => {
    const DROPDOWN_ITEM = '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="products" href="#" data-bs-toggle="dropdown" aria-expanded="false">Products</a><div class="dropdown-menu" id="products-menu"><a class="dropdown-item" href="#">Laptops</a></div></li>'

    it('should move an overflowing dropdown into the menu as a nested dropstart', () => {
      fixtureEl.innerHTML = nav(260, links(4, { 3: DROPDOWN_ITEM }))

      new NavOverflow(wrapper())

      const submenu = fixtureEl.querySelector('.nav-overflow-menu > .dropstart')!
      const toggle = submenu.firstElementChild as HTMLElement
      expect(toggle).toHaveClass('dropdown-item')
      expect(toggle).toHaveClass('dropdown-toggle')
      expect(toggle.getAttribute('data-bs-toggle')).toEqual('dropdown')
      expect(toggle.getAttribute('data-bs-auto-close')).toEqual('outside')
      expect(toggle.getAttribute('role')).toEqual('button')
      expect(toggle.hasAttribute('href')).toBe(false)
      expect(submenu.querySelector('#products-menu')).not.toBeNull()

      const overflow = Dropdown.getInstance(fixtureEl.querySelector<HTMLElement>('.nav-overflow-toggle')!) as Dropdown
      expect(overflow._config.autoClose).toEqual('outside')
    })

    it('should open submenus towards the end when the menu is start-aligned', () => {
      fixtureEl.innerHTML = nav(260, links(4, { 3: DROPDOWN_ITEM }))

      new NavOverflow(wrapper(), { menuPlacement: 'bottom-start' })

      expect(fixtureEl.querySelector('.nav-overflow-menu > .dropend')).not.toBeNull()
      expect(fixtureEl.querySelector('.nav-overflow-menu > .dropstart')).toBeNull()
    })

    it('should open the nested dropdown from the overflow menu', () => {
      fixtureEl.innerHTML = nav(260, links(4, { 3: DROPDOWN_ITEM }))

      new NavOverflow(wrapper())

      const toggle = fixtureEl.querySelector<HTMLElement>('.nav-overflow-menu > .dropstart > .dropdown-toggle')!
      toggle.click()

      expect(fixtureEl.querySelector('#products-menu')).toHaveClass('show')
    })

    it('should move the menu back to its nav item on restore', () => {
      fixtureEl.innerHTML = nav(260, links(4, { 3: DROPDOWN_ITEM }))

      const navOverflow = new NavOverflow(wrapper())
      wrapper().style.width = '1000px'
      navOverflow.update()

      const menu = fixtureEl.querySelector('#products-menu')!
      expect(menu.previousElementSibling!.id).toEqual('products')
      expect(fixtureEl.querySelector('.nav-overflow-menu .dropstart')).toBeNull()
    })
  })

  describe('proxy links', () => {
    const tabs = (): string => links(6, { 5: '<li class="nav-item"><a class="nav-link" id="last" href="#pane" data-bs-toggle="tab">Last</a></li>' })

    it('should send a click on a moved plugin link to the original', () => {
      fixtureEl.innerHTML = nav(360, tabs())

      new NavOverflow(wrapper())
      const original = fixtureEl.querySelector<HTMLElement>('#last')!
      const spy = vi.fn()
      original.addEventListener('click', spy)

      const cloned = menuItems().at(-1)!
      expect(cloned.hasAttribute('data-bs-toggle')).toBe(false)

      cloned.click()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should copy the active state to the menu after the click', () => {
      fixtureEl.innerHTML = nav(360, tabs())

      new NavOverflow(wrapper())
      const original = fixtureEl.querySelector<HTMLElement>('#last')!
      original.addEventListener('click', () => original.classList.add('active'))

      const cloned = menuItems().at(-1)!
      cloned.click()

      expect(cloned).toHaveClass('active')
    })

    it('should keep plain links as they are', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      new NavOverflow(wrapper())

      expect(menuItems().at(-1)!.getAttribute('href')).toEqual('#')
    })
  })

  describe('jQueryInterface', () => {
    it('should create an instance and call a method', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      const element = wrapper()
      const collection = { each: (callback: (this: HTMLElement) => void) => callback.call(element) }

      NavOverflow.jQueryInterface.call(collection as never, 'update')

      expect(NavOverflow.getInstance(element)).not.toBeNull()
      expect(() => NavOverflow.jQueryInterface.call(collection as never, 'nope')).toThrow(TypeError)
    })
  })

  describe('dispose', () => {
    it('should restore items and remove the generated toggle', () => {
      fixtureEl.innerHTML = nav(360, links(6))

      const navOverflow = new NavOverflow(wrapper())
      navOverflow.dispose()

      expect(hidden()).toHaveLength(0)
      expect(fixtureEl.querySelector('.d-none')).toBeNull()
      expect(fixtureEl.querySelector('.nav-overflow-item')).toBeNull()
      expect(NavOverflow.getInstance(wrapper())).toBeNull()
    })

    it('should disconnect the ResizeObserver', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      const navOverflow = new NavOverflow(wrapper())
      const spy = vi.spyOn(navOverflow._resizeObserver!, 'disconnect')
      navOverflow.dispose()

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return the existing instance', () => {
      fixtureEl.innerHTML = nav(1000, links(3))

      const navOverflow = new NavOverflow(wrapper())

      expect(NavOverflow.getOrCreateInstance(wrapper())).toEqual(navOverflow)
    })
  })
})
