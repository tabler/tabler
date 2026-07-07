import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Modal from '../../src/bootstrap/modal'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Modal', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    document.body.classList.remove('modal-open')
    for (const el of document.querySelectorAll('.modal-backdrop')) {
      el.remove()
    }
  })

  const createModalHTML = () => [
    '<div class="modal" tabindex="-1">',
    '  <div class="modal-dialog">',
    '    <div class="modal-content">',
    '      <div class="modal-header">',
    '        <h5 class="modal-title">Modal</h5>',
    '        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>',
    '      </div>',
    '      <div class="modal-body"><p>Content</p></div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('')

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Modal.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Modal.Default).toBeDefined()
      expect(Modal.Default.backdrop).toBe(true)
      expect(Modal.Default.focus).toBe(true)
      expect(Modal.Default.keyboard).toBe(true)
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type config', () => {
      expect(Modal.DefaultType).toBeDefined()
      expect(Modal.DefaultType.backdrop).toBe('(boolean|string)')
    })
  })

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Modal.NAME).toBe('modal')
    })
  })

  describe('constructor', () => {
    it('should create modal instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal).toBeInstanceOf(Modal)
      expect(Modal.getInstance(modalEl)).toBe(modal)
    })

    it('should find dialog element', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal._dialog).not.toBeNull()
    })
  })

  describe('toggle', () => {
    it('should show when hidden', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modal._isShown).toBe(true)
          resolve()
        })

        modal.toggle()
      })
    })

    it('should hide when shown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modal._isShown).toBe(false)
            resolve()
          })

          modal.toggle()
        })

        modal.show()
      })
    })
  })

  describe('show', () => {
    it('should show modal', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modal._isShown).toBe(true)
          expect(modalEl.classList.contains('show')).toBe(true)
          expect(modalEl.getAttribute('aria-modal')).toBe('true')
          expect(modalEl.getAttribute('role')).toBe('dialog')
          expect(document.body.classList.contains('modal-open')).toBe(true)
          resolve()
        })

        modal.show()
      })
    })

    it('should not show if already shown', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.show()
          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should not show if show event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('show.bs.modal', event => {
          event.preventDefault()
          setTimeout(() => {
            expect(modal._isShown).toBe(false)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should pass relatedTarget in show event', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML() + '<button id="trigger">Open</button>'
        const modalEl = fixtureEl.querySelector('.modal')!
        const trigger = fixtureEl.querySelector('#trigger') as HTMLElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('show.bs.modal', (event: any) => {
          expect(event.relatedTarget).toBe(trigger)
          resolve()
        })

        modal.show(trigger)
      })
    })
  })

  describe('hide', () => {
    it('should hide modal', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.hide()
        })

        modalEl.addEventListener('hidden.bs.modal', () => {
          expect(modal._isShown).toBe(false)
          expect(modalEl.style.display).toBe('none')
          expect(modalEl.getAttribute('aria-hidden')).toBe('true')
          resolve()
        })

        modal.show()
      })
    })

    it('should not hide if not shown', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      modal.hide()
      expect(modal._isShown).toBe(false)
    })

    it('should not hide if hide event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hide.bs.modal', event => {
            event.preventDefault()
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modal.hide()
        })

        modal.show()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose modal', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      modal.dispose()
      expect(Modal.getInstance(modalEl)).toBeNull()
    })
  })

  describe('handleUpdate', () => {
    it('should call _adjustDialog', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      const spy = vi.spyOn(modal, '_adjustDialog')
      modal.handleUpdate()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('_isAnimated', () => {
    it('should return true when fade class is present', () => {
      fixtureEl.innerHTML = '<div class="modal fade"><div class="modal-dialog"></div></div>'
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal._isAnimated()).toBe(true)
    })

    it('should return false without fade class', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(modal._isAnimated()).toBe(false)
    })
  })

  describe('keyboard', () => {
    it('should close on Escape when keyboard is true', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: true })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modal._isShown).toBe(false)
            resolve()
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not close on Escape when keyboard is false', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should ignore non-Escape keys', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Modal.getInstance(fixtureEl)).toBeNull()
    })

    it('should return modal instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(Modal.getInstance(modalEl)).toBe(modal)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return existing instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(Modal.getOrCreateInstance(modalEl)).toBe(modal)
    })

    it('should create new instance', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!

      expect(Modal.getInstance(modalEl)).toBeNull()
      expect(Modal.getOrCreateInstance(modalEl)).toBeInstanceOf(Modal)
    })
  })

  describe('_triggerBackdropTransition', () => {
    it('should add and remove modal-static class', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not transition if hidePrevented is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', event => {
            event.preventDefault()
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should early return if overflowY is hidden', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.style.overflowY = 'hidden'

          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })

    it('should early return if already has modal-static class', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.classList.add('modal-static')

          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              expect(modal._isShown).toBe(true)
              resolve()
            }, 30)
          })

          modalEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        })

        modal.show()
      })
    })
  })

  describe('backdrop click', () => {
    it('should hide when clicking outside dialog with backdrop true', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { backdrop: true })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modal._isShown).toBe(false)
            resolve()
          })

          modalEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not hide when click starts inside dialog', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const dialog = modalEl.querySelector('.modal-dialog')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
          Object.defineProperty(mousedownEvent, 'target', { value: dialog })
          modalEl.dispatchEvent(mousedownEvent)

          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))

          setTimeout(() => {
            expect(modal._isShown).toBe(true)
            resolve()
          }, 50)
        })

        modal.show()
      })
    })

    it('should trigger backdrop transition with static backdrop', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl, { backdrop: 'static' })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            expect(modal._isShown).toBe(true)
            resolve()
          })

          modalEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        modal.show()
      })
    })
  })

  describe('_showElement', () => {
    it('should append to body if not already in DOM', () => {
      const modalEl = document.createElement('div')
      modalEl.classList.add('modal')
      modalEl.setAttribute('tabindex', '-1')
      modalEl.innerHTML = '<div class="modal-dialog"><div class="modal-content"></div></div>'

      const modal = new Modal(modalEl)

      return new Promise<void>(resolve => {
        modalEl.addEventListener('shown.bs.modal', () => {
          expect(document.body.contains(modalEl)).toBe(true)
          modal.dispose()
          modalEl.remove()
          resolve()
        })

        modal.show()
      })
    })

    it('should scroll modal body to top', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.scrollTop).toBe(0)
          resolve()
        })

        modal.show()
      })
    })
  })

  describe('data-tblr-toggle', () => {
    it('should open modal via data-tblr-toggle="modal"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button data-tblr-toggle="modal" data-bs-target="#testModal">Open</button>',
          '<div class="modal" id="testModal" tabindex="-1">',
          '  <div class="modal-dialog"><div class="modal-content"></div></div>',
          '</div>'
        ].join('')

        const modalEl = fixtureEl.querySelector('#testModal')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="modal"]') as HTMLElement

        modalEl.addEventListener('shown.bs.modal', () => {
          const modal = Modal.getInstance(modalEl) as Modal
          expect(modal._isShown).toBe(true)
          resolve()
        })

        btn.click()
      })
    })

    it('should open modal via data-tblr-toggle with data-tblr-target', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button data-tblr-toggle="modal" data-tblr-target="#testModal">Open</button>',
          '<div class="modal" id="testModal" tabindex="-1">',
          '  <div class="modal-dialog"><div class="modal-content"></div></div>',
          '</div>'
        ].join('')

        const modalEl = fixtureEl.querySelector('#testModal')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="modal"]') as HTMLElement

        modalEl.addEventListener('shown.bs.modal', () => {
          const modal = Modal.getInstance(modalEl) as Modal
          expect(modal._isShown).toBe(true)
          resolve()
        })

        btn.click()
      })
    })
  })

  describe('data-tblr-dismiss', () => {
    it('should close modal via data-tblr-dismiss="modal"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="modal" tabindex="-1">',
          '  <div class="modal-dialog">',
          '    <div class="modal-content">',
          '      <button type="button" class="btn-close" data-tblr-dismiss="modal"></button>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('')

        const modalEl = fixtureEl.querySelector('.modal')!
        const dismissBtn = fixtureEl.querySelector('[data-tblr-dismiss="modal"]') as HTMLElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          dismissBtn.click()
        })

        modalEl.addEventListener('hidden.bs.modal', () => {
          expect(modal._isShown).toBe(false)
          resolve()
        })

        modal.show()
      })
    })
  })
})
