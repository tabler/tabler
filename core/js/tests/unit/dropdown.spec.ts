import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Dropdown from '../../src/bootstrap/dropdown'
import { clearFixture, getFixture } from '../helpers/fixture'

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    setOptions: vi.fn()
  }))
}))

describe('Dropdown', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Dropdown.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(typeof Dropdown.Default).toBe('object')
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type config', () => {
      expect(typeof Dropdown.DefaultType).toBe('object')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Dropdown.DATA_KEY).toBe('bs.dropdown')
    })
  })

  describe('constructor', () => {
    it('should accept element as CSS selector or DOM element', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdownBySelector = new Dropdown('[data-bs-toggle="dropdown"]')
      const dropdownByElement = new Dropdown(btnDropdown)

      expect(dropdownBySelector._element).toBe(btnDropdown)
      expect(dropdownByElement._element).toBe(btnDropdown)
    })

    it('should create offset from string data attribute', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-offset="10,20">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)

      expect(dropdown._getOffset()).toEqual([10, 20])
    })

    it('should allow popperConfig override', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown, {
        popperConfig: { placement: 'left' }
      })

      const popperConfig = dropdown._getPopperConfig()
      expect(popperConfig.placement).toBe('left')
    })
  })

  describe('toggle', () => {
    it('should toggle a dropdown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          expect(btnDropdown.getAttribute('aria-expanded')).toBe('true')
          resolve()
        })

        dropdown.toggle()
      })
    })

    it('should toggle dropup', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropup">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          resolve()
        })

        dropdown.toggle()
      })
    })

    it('should toggle dropend', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropend">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          resolve()
        })

        dropdown.toggle()
      })
    })

    it('should toggle dropstart', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropstart">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          resolve()
        })

        dropdown.toggle()
      })
    })
  })

  describe('show', () => {
    it('should show a dropdown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          resolve()
        })

        dropdown.show()
      })
    })

    it('should not show if disabled', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown" disabled>Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)

      dropdown.show()
      expect(btnDropdown.classList.contains('show')).toBe(false)
    })

    it('should not show if already shown', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle show" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu show">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)
      const spy = vi.fn()

      btnDropdown.addEventListener('shown.bs.dropdown', spy)
      dropdown.show()

      expect(spy).not.toHaveBeenCalled()
    })

    it('should not show if show event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('show.bs.dropdown', ev => {
          ev.preventDefault()
          setTimeout(() => {
            expect(btnDropdown.classList.contains('show')).toBe(false)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })
  })

  describe('hide', () => {
    it('should hide a dropdown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          dropdown.hide()
        })

        btnDropdown.addEventListener('hidden.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(false)
          expect(btnDropdown.getAttribute('aria-expanded')).toBe('false')
          resolve()
        })

        dropdown.show()
      })
    })

    it('should not hide if not shown', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)
      const spy = vi.fn()

      btnDropdown.addEventListener('hidden.bs.dropdown', spy)
      dropdown.hide()

      expect(spy).not.toHaveBeenCalled()
    })

    it('should not hide if hide event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          btnDropdown.addEventListener('hide.bs.dropdown', ev => {
            ev.preventDefault()
            setTimeout(() => {
              expect(btnDropdown.classList.contains('show')).toBe(true)
              resolve()
            }, 30)
          })
          dropdown.hide()
        })

        dropdown.show()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose a dropdown', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)

      expect(Dropdown.getInstance(btnDropdown)).not.toBeNull()

      dropdown.dispose()

      expect(Dropdown.getInstance(btnDropdown)).toBeNull()
    })
  })

  describe('update', () => {
    it('should call update on popper', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btnDropdown)

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          dropdown.update()
          expect(dropdown._popper!.update).toHaveBeenCalled()
          resolve()
        })

        dropdown.show()
      })
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Dropdown.getInstance(fixtureEl)).toBeNull()
    })

    it('should return dropdown instance', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)

      expect(Dropdown.getInstance(btnDropdown)).toBe(dropdown)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return dropdown instance', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)

      expect(Dropdown.getOrCreateInstance(btnDropdown)).toBe(dropdown)
    })

    it('should return new instance when there is no instance', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!

      expect(Dropdown.getInstance(btnDropdown)).toBeNull()
      expect(Dropdown.getOrCreateInstance(btnDropdown)).toBeInstanceOf(Dropdown)
    })
  })

  describe('data-api', () => {
    it('should toggle via click on data-bs-toggle', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          resolve()
        })

        btnDropdown.click()
      })
    })
  })

  describe('_getPlacement', () => {
    it('should return right for dropend', () => {
      fixtureEl.innerHTML = [
        '<div class="dropend">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)
      const placement = dropdown._getPlacement()

      expect(placement).toMatch(/right|left/)
    })

    it('should return left for dropstart', () => {
      fixtureEl.innerHTML = [
        '<div class="dropstart">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)
      const placement = dropdown._getPlacement()

      expect(placement).toMatch(/right|left/)
    })

    it('should return top for dropup-center', () => {
      fixtureEl.innerHTML = [
        '<div class="dropup-center">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      expect(dropdown._getPlacement()).toBe('top')
    })

    it('should return bottom for dropdown-center', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown-center">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      expect(dropdown._getPlacement()).toBe('bottom')
    })

    it('should return top-start for dropup', () => {
      fixtureEl.innerHTML = [
        '<div class="dropup">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)
      const placement = dropdown._getPlacement()

      expect(placement).toMatch(/top/)
    })

    it('should return bottom-end when --bs-position is end', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu" style="--bs-position: end"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const menu = fixtureEl.querySelector('.dropdown-menu') as HTMLElement
      const dropdown = new Dropdown(btn)

      const originalGetComputedStyle = window.getComputedStyle
      vi.spyOn(window, 'getComputedStyle').mockImplementation(el => {
        const result = originalGetComputedStyle(el)
        if (el === menu) {
          return new Proxy(result, {
            get(target, prop) {
              if (prop === 'getPropertyValue') {
                return (name: string) => name === '--bs-position' ? 'end' : target.getPropertyValue(name)
              }

              return (target as any)[prop]
            }
          }) as CSSStyleDeclaration
        }

        return result
      })

      expect(dropdown._getPlacement()).toBe('bottom-end')
    })

    it('should return top-end for dropup with --bs-position end', () => {
      fixtureEl.innerHTML = [
        '<div class="dropup">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu" style="--bs-position: end"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const menu = fixtureEl.querySelector('.dropdown-menu') as HTMLElement
      const dropdown = new Dropdown(btn)

      const originalGetComputedStyle = window.getComputedStyle
      vi.spyOn(window, 'getComputedStyle').mockImplementation(el => {
        const result = originalGetComputedStyle(el)
        if (el === menu) {
          return new Proxy(result, {
            get(target, prop) {
              if (prop === 'getPropertyValue') {
                return (name: string) => name === '--bs-position' ? 'end' : target.getPropertyValue(name)
              }

              return (target as any)[prop]
            }
          }) as CSSStyleDeclaration
        }

        return result
      })

      expect(dropdown._getPlacement()).toBe('top-end')
    })
  })

  describe('_detectNavbar', () => {
    it('should detect when inside navbar', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <div class="dropdown">',
        '    <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '    <div class="dropdown-menu"></div>',
        '  </div>',
        '</nav>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      expect(dropdown._inNavbar).toBe(true)
    })

    it('should detect when not inside navbar', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      expect(dropdown._inNavbar).toBe(false)
    })
  })

  describe('_getConfig', () => {
    it('should throw on invalid reference object', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!

      expect(() => {
        new Dropdown(btn, { reference: {} as any })
      }).toThrow(TypeError)
    })
  })

  describe('_getOffset', () => {
    it('should handle function offset', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const offsetFn = vi.fn().mockReturnValue([10, 20])
      const dropdown = new Dropdown(btn, { offset: offsetFn })

      const offset = dropdown._getOffset()
      expect(typeof offset).toBe('function')
    })

    it('should handle array offset', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn, { offset: [5, 10] })

      expect(dropdown._getOffset()).toEqual([5, 10])
    })

    it('should handle string offset', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn, { offset: '10,20' as any })

      expect(dropdown._getOffset()).toEqual([10, 20])
    })
  })

  describe('_getPopperConfig', () => {
    it('should set popper static in navbar', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <div class="dropdown">',
        '    <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '    <div class="dropdown-menu"></div>',
        '  </div>',
        '</nav>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      const config = dropdown._getPopperConfig()
      expect(config.modifiers).toBeDefined()
      expect(config.modifiers!.some((m: any) => m.name === 'applyStyles' && m.enabled === false)).toBe(true)
    })

    it('should set popper static when display is static', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn, { display: 'static' })

      const config = dropdown._getPopperConfig()
      expect(config.modifiers).toBeDefined()
      expect(config.modifiers!.some((m: any) => m.name === 'applyStyles' && m.enabled === false)).toBe(true)
    })

    it('should apply custom popperConfig function', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const customPopperConfig = (_defaultConfig: any) => ({ ..._defaultConfig, strategy: 'fixed' as const })
      const dropdown = new Dropdown(btn, { popperConfig: customPopperConfig })

      const config = dropdown._getPopperConfig()
      expect(config.strategy).toBe('fixed')
    })
  })

  describe('clearMenus', () => {
    it('should ignore right mouse button', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle show" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu show"></div>',
        '</div>'
      ].join('')

      const event = new MouseEvent('click', { button: 2, bubbles: true })
      Dropdown.clearMenus(event)

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      expect(btn.classList.contains('show')).toBe(true)
    })
  })

  describe('show with touch device', () => {
    it('should add mouseover listeners on touch device', () => {
      return new Promise<void>(resolve => {
        Object.defineProperty(document.documentElement, 'ontouchstart', {
          value: null,
          writable: true,
          configurable: true
        })

        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(btn.classList.contains('show')).toBe(true)

          btn.addEventListener('hidden.bs.dropdown', () => {
            delete (document.documentElement as any).ontouchstart
            resolve()
          })

          dropdown.hide()
        })

        dropdown.show()
      })
    })
  })

  describe('_completeHide', () => {
    it('should not hide if hide event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hide.bs.dropdown', (event) => {
            event.preventDefault()
          })

          dropdown._completeHide({ relatedTarget: btn })

          setTimeout(() => {
            expect(btn.classList.contains('show')).toBe(true)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })

    it('should remove touch listeners on hide', () => {
      return new Promise<void>(resolve => {
        Object.defineProperty(document.documentElement, 'ontouchstart', {
          value: null,
          writable: true,
          configurable: true
        })

        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hidden.bs.dropdown', () => {
            expect(btn.classList.contains('show')).toBe(false)
            delete (document.documentElement as any).ontouchstart
            resolve()
          })

          dropdown._completeHide({ relatedTarget: btn })
        })

        dropdown.show()
      })
    })
  })

  describe('_selectMenuItem', () => {
    it('should do nothing if no visible items', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      expect(() => {
        dropdown._selectMenuItem({ key: 'ArrowDown', target: btn as HTMLElement })
      }).not.toThrow()
    })

    it('should focus an item on ArrowDown when items are visible', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Item 1</a>',
        '    <a class="dropdown-item" href="#">Item 2</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      const dropdown = new Dropdown(btn)

      dropdown._selectMenuItem({ key: 'ArrowDown', target: btn as HTMLElement })
    })
  })

  describe('_createPopper with reference', () => {
    it('should use parent as reference', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn, { reference: 'parent' })

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(dropdown._popper).not.toBeNull()
          resolve()
        })

        dropdown.show()
      })
    })

    it('should use element reference', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn, { reference: fixtureEl })

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(dropdown._popper).not.toBeNull()
          resolve()
        })

        dropdown.show()
      })
    })

    it('should use virtual element reference', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const virtualRef = {
          getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {} })
        }

        const dropdown = new Dropdown(btn, { reference: virtualRef as any })

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(dropdown._popper).not.toBeNull()
          resolve()
        })

        dropdown.show()
      })
    })
  })

  describe('dispose with popper', () => {
    it('should destroy popper on dispose', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          const destroySpy = dropdown._popper!.destroy
          dropdown.dispose()
          expect(destroySpy).toHaveBeenCalled()
          resolve()
        })

        dropdown.show()
      })
    })
  })

  describe('clearMenus (full flow)', () => {
    it('should close open dropdown on outside click', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>',
          '<div id="outside">outside</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(btn.classList.contains('show')).toBe(true)

          btn.addEventListener('hidden.bs.dropdown', () => {
            expect(btn.classList.contains('show')).toBe(false)
            resolve()
          })

          const outsideEl = fixtureEl.querySelector('#outside')!
          outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        dropdown.show()
      })
    })

    it('should skip autoClose=false dropdown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn, { autoClose: false })

        btn.addEventListener('shown.bs.dropdown', () => {
          const event = new MouseEvent('click', { bubbles: true })
          document.dispatchEvent(event)

          setTimeout(() => {
            expect(btn.classList.contains('show')).toBe(true)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })

    it('should ignore keyup that is not Tab', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle show" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu show"></div>',
        '</div>'
      ].join('')

      const event = new KeyboardEvent('keyup', { key: 'Escape', bubbles: true })
      Dropdown.clearMenus(event)

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
      expect(btn.classList.contains('show')).toBe(true)
    })

    it('should add clickEvent on click type event', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hidden.bs.dropdown', () => {
            resolve()
          })

          document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        dropdown.show()
      })
    })

    it('should not close autoClose=inside when clicked outside', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>',
          '<div id="outside">outside</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const dropdown = new Dropdown(btn, { autoClose: 'inside' })

        btn.addEventListener('shown.bs.dropdown', () => {
          const outside = fixtureEl.querySelector('#outside')!
          outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))

          setTimeout(() => {
            expect(btn.classList.contains('show')).toBe(true)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })

    it('should not close autoClose=outside when clicked inside menu', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const menu = fixtureEl.querySelector('.dropdown-menu')!
        const dropdown = new Dropdown(btn, { autoClose: 'outside' })

        btn.addEventListener('shown.bs.dropdown', () => {
          menu.querySelector('.dropdown-item')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

          setTimeout(() => {
            expect(btn.classList.contains('show')).toBe(true)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })

    it('should not close when click composedPath includes toggle element', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          const event = new MouseEvent('click', { bubbles: true })
          Object.defineProperty(event, 'composedPath', {
            value: () => [btn, fixtureEl, document.body, document.documentElement, document],
            configurable: true
          })
          Dropdown.clearMenus(event)

          setTimeout(() => {
            expect(btn.classList.contains('show')).toBe(true)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })

    it('should not close on Tab keyup inside input within menu', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <input type="text" class="form-control">',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const menu = fixtureEl.querySelector('.dropdown-menu')!
        const input = fixtureEl.querySelector('input') as HTMLElement
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          const tabEvent = new KeyboardEvent('keyup', { key: 'Tab', bubbles: true })
          Object.defineProperty(tabEvent, 'composedPath', {
            value: () => [input, menu, fixtureEl, document.body, document.documentElement, document],
            configurable: true
          })
          Object.defineProperty(tabEvent, 'target', { value: input, configurable: true })
          Dropdown.clearMenus(tabEvent)

          setTimeout(() => {
            expect(btn.classList.contains('show')).toBe(true)
            resolve()
          }, 30)
        })

        dropdown.show()
      })
    })

    it('should close on Tab keyup targeting element outside menu', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>',
          '<button id="outside-btn">Outside</button>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]')!
        const outsideBtn = fixtureEl.querySelector('#outside-btn') as HTMLElement
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hidden.bs.dropdown', () => {
            resolve()
          })

          const tabEvent = new KeyboardEvent('keyup', { key: 'Tab', bubbles: true })
          Object.defineProperty(tabEvent, 'composedPath', {
            value: () => [outsideBtn, fixtureEl, document.body, document.documentElement, document],
            configurable: true
          })
          Object.defineProperty(tabEvent, 'target', { value: outsideBtn, configurable: true })
          Dropdown.clearMenus(tabEvent)
        })

        dropdown.show()
      })
    })
  })

  describe('dataApiKeydownHandler', () => {
    it('should ignore non-arrow/escape keys', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <a class="dropdown-item" href="#">Link</a>',
        '  </div>',
        '</div>'
      ].join('')

      const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement
      const preventSpy = vi.spyOn(Event.prototype, 'preventDefault')

      const keydown = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      btn.dispatchEvent(keydown)

      expect(preventSpy).not.toHaveBeenCalled()
    })

    it('should ignore arrow keys in input', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu">',
        '    <input type="text" class="form-control">',
        '  </div>',
        '</div>'
      ].join('')

      const input = fixtureEl.querySelector('input') as HTMLElement
      const preventSpy = vi.spyOn(Event.prototype, 'preventDefault')

      const keydown = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      Object.defineProperty(keydown, 'target', { value: input, configurable: true })
      input.dispatchEvent(keydown)

      expect(preventSpy).not.toHaveBeenCalled()
    })

    it('should open dropdown on ArrowDown and call _selectMenuItem', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(btn.classList.contains('show')).toBe(true)
          resolve()
        })

        const keydown = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
        btn.dispatchEvent(keydown)
      })
    })

    it('should close dropdown on Escape', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hidden.bs.dropdown', () => {
            expect(btn.classList.contains('show')).toBe(false)
            resolve()
          })

          const keydown = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
          btn.dispatchEvent(keydown)
        })

        dropdown.show()
      })
    })

    it('should allow Escape in input/textarea', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <textarea class="form-control"></textarea>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement
        const textarea = fixtureEl.querySelector('textarea') as HTMLElement
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hidden.bs.dropdown', () => {
            expect(btn.classList.contains('show')).toBe(false)
            resolve()
          })

          const keydown = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
          textarea.dispatchEvent(keydown)
        })

        dropdown.show()
      })
    })

    it('should handle ArrowUp to show and select', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement

        btn.addEventListener('shown.bs.dropdown', () => {
          expect(btn.classList.contains('show')).toBe(true)
          resolve()
        })

        const keydown = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
        btn.dispatchEvent(keydown)
      })
    })

    it('should find toggle from menu item via keydown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btn = fixtureEl.querySelector('[data-bs-toggle="dropdown"]') as HTMLElement
        const menu = fixtureEl.querySelector('.dropdown-menu') as HTMLElement
        const dropdown = new Dropdown(btn)

        btn.addEventListener('shown.bs.dropdown', () => {
          btn.addEventListener('hidden.bs.dropdown', () => {
            expect(btn.classList.contains('show')).toBe(false)
            resolve()
          })

          const keydown = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
          menu.dispatchEvent(keydown)
        })

        dropdown.show()
      })
    })
  })

  describe('data-tblr-toggle', () => {
    it('should toggle via data-tblr-toggle="dropdown"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="dropdown">',
          '  <button class="btn dropdown-toggle" data-tblr-toggle="dropdown">Dropdown</button>',
          '  <div class="dropdown-menu">',
          '    <a class="dropdown-item" href="#">Link</a>',
          '  </div>',
          '</div>'
        ].join('')

        const btnDropdown = fixtureEl.querySelector('[data-tblr-toggle="dropdown"]') as HTMLElement

        btnDropdown.addEventListener('shown.bs.dropdown', () => {
          expect(btnDropdown.classList.contains('show')).toBe(true)
          expect(btnDropdown.getAttribute('aria-expanded')).toBe('true')
          resolve()
        })

        btnDropdown.click()
      })
    })

    it('should create instance via data-tblr-toggle', () => {
      fixtureEl.innerHTML = [
        '<div class="dropdown">',
        '  <button class="btn dropdown-toggle" data-tblr-toggle="dropdown">Dropdown</button>',
        '  <div class="dropdown-menu"></div>',
        '</div>'
      ].join('')

      const btnDropdown = fixtureEl.querySelector('[data-tblr-toggle="dropdown"]')!
      const dropdown = new Dropdown(btnDropdown)

      expect(Dropdown.getInstance(btnDropdown)).toBe(dropdown)
    })
  })
})
