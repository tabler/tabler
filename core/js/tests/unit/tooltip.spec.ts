import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Tooltip from '../../src/bootstrap/tooltip'
import { clearFixture, getFixture } from '../helpers/fixture'

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    setOptions: vi.fn()
  }))
}))

describe('Tooltip', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    for (const el of document.querySelectorAll('.tooltip')) {
      el.remove()
    }
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Tooltip.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Tooltip.Default).toBeDefined()
      expect(Tooltip.Default.animation).toBe(true)
      expect(Tooltip.Default.trigger).toBe('hover focus')
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type config', () => {
      expect(Tooltip.DefaultType).toBeDefined()
      expect(Tooltip.DefaultType.animation).toBe('boolean')
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Tooltip.NAME).toBe('tooltip')
    })
  })

  describe('constructor', () => {
    it('should create tooltip instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip).toBeInstanceOf(Tooltip)
      expect(Tooltip.getInstance(el)).toBe(tooltip)
    })

    it('should fix title on construction', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      new Tooltip(el)

      expect(el.getAttribute('title')).toBeNull()
      expect(el.getAttribute('data-bs-original-title')).toBe('Tooltip title')
    })

    it('should set aria-label when element has title but no text', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title"></a>'
      const el = fixtureEl.querySelector('a')!
      new Tooltip(el)

      expect(el.getAttribute('aria-label')).toBe('Tooltip title')
    })

    it('should not set aria-label when element has text content', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Link text</a>'
      const el = fixtureEl.querySelector('a')!
      new Tooltip(el)

      expect(el.getAttribute('aria-label')).toBeNull()
    })

    it('should not set aria-label when element already has aria-label', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title" aria-label="Existing label"></a>'
      const el = fixtureEl.querySelector('a')!
      new Tooltip(el)

      expect(el.getAttribute('aria-label')).toBe('Existing label')
    })
  })

  describe('enable', () => {
    it('should enable tooltip', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.disable()
      tooltip.enable()
      expect(tooltip._isEnabled).toBe(true)
    })
  })

  describe('disable', () => {
    it('should disable tooltip', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.disable()
      expect(tooltip._isEnabled).toBe(false)
    })
  })

  describe('toggleEnabled', () => {
    it('should toggle enabled state', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._isEnabled).toBe(true)
      tooltip.toggleEnabled()
      expect(tooltip._isEnabled).toBe(false)
      tooltip.toggleEnabled()
      expect(tooltip._isEnabled).toBe(true)
    })
  })

  describe('toggle', () => {
    it('should do nothing when disabled', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.disable()
      tooltip.toggle()
      expect(tooltip._isShown()).toBe(false)
    })

    it('should toggle tooltip visibility', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          expect(tooltip._isShown()).toBe(true)
          tooltip.toggle()
        })

        el.addEventListener('hidden.bs.tooltip', () => {
          expect(tooltip._isShown()).toBe(false)
          resolve()
        })

        tooltip.toggle()
      })
    })
  })

  describe('show', () => {
    it('should show tooltip', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          expect(tooltip.tip).not.toBeNull()
          expect(tooltip.tip!.classList.contains('show')).toBe(true)
          expect(el.getAttribute('aria-describedby')).not.toBeNull()
          resolve()
        })

        tooltip.show()
      })
    })

    it('should throw if element is hidden', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip" style="display: none">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(() => tooltip.show()).toThrow('Please use show on visible elements')
    })

    it('should not show if show event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('show.bs.tooltip', event => {
          event.preventDefault()
          setTimeout(() => {
            expect(tooltip._isShown()).toBe(false)
            resolve()
          }, 30)
        })

        tooltip.show()
      })
    })

    it('should not show without content', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.show()
      expect(tooltip._isShown()).toBe(false)
    })

    it('should fire inserted event', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('inserted.bs.tooltip', () => {
          resolve()
        })

        tooltip.show()
      })
    })
  })

  describe('hide', () => {
    it('should hide tooltip', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          tooltip.hide()
        })

        el.addEventListener('hidden.bs.tooltip', () => {
          expect(tooltip._isShown()).toBe(false)
          resolve()
        })

        tooltip.show()
      })
    })

    it('should not hide if not shown', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.hide()
      expect(tooltip._isShown()).toBe(false)
    })

    it('should not hide if hide event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          el.addEventListener('hide.bs.tooltip', event => {
            event.preventDefault()
            setTimeout(() => {
              expect(tooltip._isShown()).toBe(true)
              resolve()
            }, 30)
          })

          tooltip.hide()
        })

        tooltip.show()
      })
    })
  })

  describe('update', () => {
    it('should call popper update', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          tooltip.update()
          expect(tooltip._popper!.update).toHaveBeenCalled()
          resolve()
        })

        tooltip.show()
      })
    })

    it('should do nothing if popper is null', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(() => tooltip.update()).not.toThrow()
    })
  })

  describe('dispose', () => {
    it('should dispose tooltip', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.dispose()
      expect(Tooltip.getInstance(el)).toBeNull()
    })

    it('should restore original title on dispose', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(el.getAttribute('data-bs-original-title')).toBe('Tooltip title')
      tooltip.dispose()
      expect(el.getAttribute('title')).toBe('Tooltip title')
    })

    it('should destroy popper on dispose', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          const destroySpy = tooltip._popper!.destroy
          tooltip.dispose()
          expect(destroySpy).toHaveBeenCalled()
          resolve()
        })

        tooltip.show()
      })
    })
  })

  describe('setContent', () => {
    it('should set new content', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip.setContent({ '.tooltip-inner': 'New content' })
      expect(tooltip._newContent).toEqual({ '.tooltip-inner': 'New content' })
    })

    it('should update shown tooltip', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        let shownCount = 0
        el.addEventListener('shown.bs.tooltip', () => {
          shownCount++
          if (shownCount === 1) {
            tooltip.setContent({ '.tooltip-inner': 'Updated content' })
          } else {
            resolve()
          }
        })

        tooltip.show()
      })
    })
  })

  describe('_isWithContent', () => {
    it('should return true when title exists', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._isWithContent()).toBe(true)
    })

    it('should return false when no title', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._isWithContent()).toBe(false)
    })
  })

  describe('_getTitle', () => {
    it('should return config title', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { title: 'Config title' })

      expect(tooltip._getTitle()).toBe('Config title')
    })

    it('should return data-bs-original-title', () => {
      fixtureEl.innerHTML = '<a href="#" data-bs-original-title="Original title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._getTitle()).toBe('Original title')
    })

    it('should return data-tblr-original-title', () => {
      fixtureEl.innerHTML = '<a href="#" data-tblr-original-title="Tblr title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._getTitle()).toBe('Tblr title')
    })

    it('should prefer data-bs-original-title over data-tblr-original-title', () => {
      fixtureEl.innerHTML = '<a href="#" data-bs-original-title="BS title" data-tblr-original-title="Tblr title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._getTitle()).toBe('BS title')
    })

    it('should resolve function title', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { title: () => 'Function title' })

      expect(tooltip._getTitle()).toBe('Function title')
    })
  })

  describe('_isAnimated', () => {
    it('should return true when animation is enabled', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { animation: true })

      expect(tooltip._isAnimated()).toBe(true)
    })

    it('should return false when animation is disabled', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { animation: false })

      expect(tooltip._isAnimated()).toBe(false)
    })
  })

  describe('_configAfterMerge', () => {
    it('should convert number delay to object', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { delay: 200 })

      expect(tooltip._config.delay).toEqual({ show: 200, hide: 200 })
    })

    it('should convert number title to string', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { title: 123 })

      expect(tooltip._config.title).toBe('123')
    })

    it('should use document.body when container is false', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._config.container).toBe(document.body)
    })
  })

  describe('_getOffset', () => {
    it('should handle string offset', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { offset: '10,20' as any })

      expect(tooltip._getOffset()).toEqual([10, 20])
    })

    it('should handle function offset', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const offsetFn = vi.fn().mockReturnValue([5, 10])
      const tooltip = new Tooltip(el, { offset: offsetFn })

      const offset = tooltip._getOffset()
      expect(typeof offset).toBe('function')
    })

    it('should handle array offset', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { offset: [5, 15] })

      expect(tooltip._getOffset()).toEqual([5, 15])
    })
  })

  describe('_getDelegateConfig', () => {
    it('should return config with non-default values', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { placement: 'bottom' })

      const delegateConfig = tooltip._getDelegateConfig()
      expect(delegateConfig.selector).toBe(false)
      expect(delegateConfig.trigger).toBe('manual')
      expect(delegateConfig.placement).toBe('bottom')
    })
  })

  describe('_disposePopper', () => {
    it('should destroy popper and remove tip', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Tooltip title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const tooltip = new Tooltip(el, { animation: false })

        el.addEventListener('shown.bs.tooltip', () => {
          expect(tooltip._popper).not.toBeNull()
          expect(tooltip.tip).not.toBeNull()

          tooltip._disposePopper()

          expect(tooltip._popper).toBeNull()
          expect(tooltip.tip).toBeNull()
          resolve()
        })

        tooltip.show()
      })
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Tooltip.getInstance(fixtureEl)).toBeNull()
    })

    it('should return tooltip instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(Tooltip.getInstance(el)).toBe(tooltip)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return existing instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(Tooltip.getOrCreateInstance(el)).toBe(tooltip)
    })

    it('should create new instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!

      expect(Tooltip.getInstance(el)).toBeNull()
      expect(Tooltip.getOrCreateInstance(el)).toBeInstanceOf(Tooltip)
    })
  })

  describe('data-tblr-original-title', () => {
    it('should restore title from data-tblr-original-title on dispose', () => {
      fixtureEl.innerHTML = '<a href="#" data-tblr-original-title="Tblr tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { title: 'test' })

      tooltip.dispose()
      expect(el.getAttribute('title')).toBe('Tblr tooltip')
    })

    it('should use data-tblr-original-title as fallback for _getTitle', () => {
      fixtureEl.innerHTML = '<a href="#" data-tblr-original-title="Tblr tooltip title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._getTitle()).toBe('Tblr tooltip title')
    })
  })

  describe('_enter and _leave', () => {
    it('should set _isHovered on enter', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { delay: { show: 500, hide: 500 } })

      tooltip._enter()
      expect(tooltip._isHovered).toBe(true)
    })

    it('should not double-enter if already hovered', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { delay: { show: 500, hide: 500 } })

      tooltip._isHovered = true
      tooltip._enter()
      expect(tooltip._isHovered).toBe(true)
    })

    it('should set _isHovered to false on leave', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { delay: { show: 500, hide: 500 } })

      tooltip._leave()
      expect(tooltip._isHovered).toBe(false)
    })

    it('should not leave if active trigger exists', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip._activeTrigger.click = true
      tooltip._isHovered = true
      tooltip._leave()
      expect(tooltip._isHovered).toBe(true)
    })
  })

  describe('_isWithActiveTrigger', () => {
    it('should return false with no active triggers', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      expect(tooltip._isWithActiveTrigger()).toBe(false)
    })

    it('should return true with active trigger', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el)

      tooltip._activeTrigger.click = true
      expect(tooltip._isWithActiveTrigger()).toBe(true)
    })
  })

  describe('trigger listeners', () => {
    it('should set up click trigger', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { trigger: 'click', animation: false })

      expect(tooltip._config.trigger).toBe('click')
    })

    it('should set up manual trigger', () => {
      fixtureEl.innerHTML = '<a href="#" title="Tooltip">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const tooltip = new Tooltip(el, { trigger: 'manual' })

      expect(tooltip._config.trigger).toBe('manual')
    })
  })
})
