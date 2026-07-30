import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Popover from '../../src/bootstrap/popover'
import Tooltip from '../../src/bootstrap/tooltip'
import { clearFixture, getFixture } from '../helpers/fixture'

vi.mock('@popperjs/core', () => ({
  createPopper: vi.fn(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    setOptions: vi.fn()
  }))
}))

describe('Popover', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    for (const el of document.querySelectorAll('.popover')) {
      el.remove()
    }
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Popover.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Popover.Default).toBeDefined()
      expect(Popover.Default.trigger).toBe('click')
      expect(Popover.Default.placement).toBe('right')
      expect(Popover.Default.content).toBe('')
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type config', () => {
      expect(Popover.DefaultType).toBeDefined()
      expect(Popover.DefaultType.content).toBe('(null|string|element|function)')
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Popover.NAME).toBe('popover')
    })
  })

  describe('extends Tooltip', () => {
    it('should be an instance of Tooltip', () => {
      fixtureEl.innerHTML = '<a href="#" title="Popover" data-bs-content="Content">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      expect(popover).toBeInstanceOf(Tooltip)
    })
  })

  describe('constructor', () => {
    it('should create popover instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Popover title" data-bs-content="Content">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      expect(popover).toBeInstanceOf(Popover)
      expect(Popover.getInstance(el)).toBe(popover)
    })
  })

  describe('show', () => {
    it('should show popover', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Popover title" data-bs-content="Content">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const popover = new Popover(el, { animation: false })

        el.addEventListener('shown.bs.popover', () => {
          expect(popover.tip).not.toBeNull()
          expect(popover.tip!.classList.contains('show')).toBe(true)
          resolve()
        })

        popover.show()
      })
    })

    it('should show popover with only content', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const popover = new Popover(el, { content: 'Only content', animation: false })

        el.addEventListener('shown.bs.popover', () => {
          expect(popover._isShown()).toBe(true)
          resolve()
        })

        popover.show()
      })
    })

    it('should show popover with only title', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Only title">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const popover = new Popover(el, { animation: false })

        el.addEventListener('shown.bs.popover', () => {
          expect(popover._isShown()).toBe(true)
          resolve()
        })

        popover.show()
      })
    })
  })

  describe('hide', () => {
    it('should hide popover', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<a href="#" title="Popover" data-bs-content="Content">Trigger</a>'
        const el = fixtureEl.querySelector('a')!
        const popover = new Popover(el, { animation: false })

        el.addEventListener('shown.bs.popover', () => {
          popover.hide()
        })

        el.addEventListener('hidden.bs.popover', () => {
          expect(popover._isShown()).toBe(false)
          resolve()
        })

        popover.show()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose popover', () => {
      fixtureEl.innerHTML = '<a href="#" title="Popover" data-bs-content="Content">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      popover.dispose()
      expect(Popover.getInstance(el)).toBeNull()
    })
  })

  describe('_isWithContent', () => {
    it('should return true with title and content', () => {
      fixtureEl.innerHTML = '<a href="#" title="Title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el, { content: 'Content' })

      expect(popover._isWithContent()).toBe(true)
    })

    it('should return true with only content', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el, { content: 'Content only' })

      expect(popover._isWithContent()).toBe(true)
    })

    it('should return true with only title', () => {
      fixtureEl.innerHTML = '<a href="#" title="Title only">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      expect(popover._isWithContent()).toBe(true)
    })

    it('should return false without title or content', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      expect(popover._isWithContent()).toBe(false)
    })
  })

  describe('_getContentForTemplate', () => {
    it('should return object with header and body selectors', () => {
      fixtureEl.innerHTML = '<a href="#" title="Title">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el, { content: 'Body content' })

      const templateContent = popover._getContentForTemplate()
      expect(templateContent['.popover-header']).toBeDefined()
      expect(templateContent['.popover-body']).toBe('Body content')
    })
  })

  describe('_getContent', () => {
    it('should return string content', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el, { content: 'Test content' })

      expect(popover._getContent()).toBe('Test content')
    })

    it('should resolve function content', () => {
      fixtureEl.innerHTML = '<a href="#">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el, { content: () => 'Function content' })

      expect(popover._getContent()).toBe('Function content')
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Popover.getInstance(fixtureEl)).toBeNull()
    })

    it('should return popover instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Popover" data-bs-content="Content">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      expect(Popover.getInstance(el)).toBe(popover)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return existing instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Popover" data-bs-content="Content">Trigger</a>'
      const el = fixtureEl.querySelector('a')!
      const popover = new Popover(el)

      expect(Popover.getOrCreateInstance(el)).toBe(popover)
    })

    it('should create new instance', () => {
      fixtureEl.innerHTML = '<a href="#" title="Popover" data-bs-content="Content">Trigger</a>'
      const el = fixtureEl.querySelector('a')!

      expect(Popover.getInstance(el)).toBeNull()
      expect(Popover.getOrCreateInstance(el)).toBeInstanceOf(Popover)
    })
  })
})
