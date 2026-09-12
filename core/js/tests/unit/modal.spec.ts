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
    document.documentElement.classList.remove('modal-open')
  })

  const createModalHTML = () =>
    [
      '<dialog class="modal">',
      '  <div class="modal-dialog">',
      '    <div class="modal-content">',
      '      <div class="modal-header">',
      '        <h5 class="modal-title">Modal</h5>',
      '        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>',
      '      </div>',
      '      <div class="modal-body"><p>Content</p></div>',
      '    </div>',
      '  </div>',
      '</dialog>',
    ].join('')

  const dispatchCancel = (element: Element) => element.dispatchEvent(new Event('cancel', { cancelable: true, bubbles: true }))

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Modal.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(Modal.Default).toBeDefined()
      expect(Modal.Default.backdrop).toBe(true)
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
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.open).toBe(true)
          resolve()
        })

        modal.toggle()
      })
    })

    it('should hide when shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modalEl.open).toBe(false)
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
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.open).toBe(true)
          expect(modalEl.classList.contains('show')).toBe(true)
          expect(document.documentElement.classList.contains('modal-open')).toBe(true)
          resolve()
        })

        modal.show()
      })
    })

    it('should not show if already shown', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.show()
          setTimeout(() => {
            expect(modalEl.open).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should not show if show event is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('show.bs.modal', (event) => {
          event.preventDefault()
          setTimeout(() => {
            expect(modalEl.open).toBe(false)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should pass relatedTarget in show event', () => {
      return new Promise<void>((resolve) => {
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
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.hide()
        })

        modalEl.addEventListener('hidden.bs.modal', () => {
          expect(modalEl.open).toBe(false)
          expect(modalEl.classList.contains('show')).toBe(false)
          resolve()
        })

        modal.show()
      })
    })

    it('should not hide if not shown', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
      const modal = new Modal(modalEl)

      modal.hide()
      expect(modalEl.open).toBe(false)
    })

    it('should not hide if hide event is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hide.bs.modal', (event) => {
            event.preventDefault()
            setTimeout(() => {
              expect(modalEl.open).toBe(true)
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

    it('should close the dialog and restore scroll when disposed while open', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          modal.dispose()
          expect(modalEl.open).toBe(false)
          expect(document.documentElement.classList.contains('modal-open')).toBe(false)
          resolve()
        })

        modal.show()
      })
    })
  })

  describe('handleUpdate', () => {
    it('should not throw', () => {
      fixtureEl.innerHTML = createModalHTML()
      const modalEl = fixtureEl.querySelector('.modal')!
      const modal = new Modal(modalEl)

      expect(() => modal.handleUpdate()).not.toThrow()
    })
  })

  describe('_isAnimated', () => {
    it('should return true when fade class is present', () => {
      fixtureEl.innerHTML = '<dialog class="modal fade"><div class="modal-dialog"></div></dialog>'
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
    it('should close on native cancel (Escape) when keyboard is true', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { keyboard: true })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modalEl.open).toBe(false)
            resolve()
          })

          dispatchCancel(modalEl)
        })

        modal.show()
      })
    })

    it('should not close on cancel when keyboard is false', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          dispatchCancel(modalEl)

          setTimeout(() => {
            expect(modalEl.open).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })

    it('should always preventDefault on cancel so the browser never closes the dialog itself', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true })
          modalEl.dispatchEvent(cancelEvent)

          expect(cancelEvent.defaultPrevented).toBe(true)
          resolve()
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
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            setTimeout(() => {
              expect(modalEl.classList.contains('modal-static')).toBe(false)
              resolve()
            }, 30)
          })

          dispatchCancel(modalEl)
          expect(modalEl.classList.contains('modal-static')).toBe(true)
        })

        modal.show()
      })
    })

    it('should not transition if hidePrevented is prevented', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { keyboard: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', (event) => {
            event.preventDefault()
            setTimeout(() => {
              expect(modalEl.open).toBe(true)
              expect(modalEl.classList.contains('modal-static')).toBe(false)
              resolve()
            }, 30)
          })

          dispatchCancel(modalEl)
        })

        modal.show()
      })
    })
  })

  describe('backdrop click', () => {
    it('should hide when the click targets the dialog itself (::backdrop click)', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { backdrop: true })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidden.bs.modal', () => {
            expect(modalEl.open).toBe(false)
            resolve()
          })

          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not hide when the click targets content inside the dialog', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const content = modalEl.querySelector('.modal-content')!
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          content.dispatchEvent(new MouseEvent('click', { bubbles: true }))

          setTimeout(() => {
            expect(modalEl.open).toBe(true)
            resolve()
          }, 50)
        })

        modal.show()
      })
    })

    it('should trigger backdrop transition with static backdrop', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { backdrop: 'static' })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.addEventListener('hidePrevented.bs.modal', () => {
            expect(modalEl.open).toBe(true)
            resolve()
          })

          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        modal.show()
      })
    })

    it('should not hide when backdrop is false', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const modal = new Modal(modalEl, { backdrop: false })

        modalEl.addEventListener('shown.bs.modal', () => {
          modalEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))

          setTimeout(() => {
            expect(modalEl.open).toBe(true)
            resolve()
          }, 30)
        })

        modal.show()
      })
    })
  })

  describe('show behavior', () => {
    it('should append to body if not already in DOM', () => {
      const modalEl = document.createElement('dialog')
      modalEl.classList.add('modal')
      modalEl.innerHTML = '<div class="modal-dialog"><div class="modal-content"></div></div>'

      const modal = new Modal(modalEl)

      return new Promise<void>((resolve) => {
        modalEl.addEventListener('shown.bs.modal', () => {
          expect(document.body.contains(modalEl)).toBe(true)
          modal.dispose()
          modalEl.remove()
          resolve()
        })

        modal.show()
      })
    })

    it('should scroll the modal and its body to top', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = createModalHTML()
        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const body = modalEl.querySelector('.modal-body') as HTMLElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.scrollTop).toBe(0)
          expect(body.scrollTop).toBe(0)
          resolve()
        })

        modal.show()
      })
    })
  })

  describe('data-tblr-toggle', () => {
    it('should open modal via data-tblr-toggle="modal"', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<button data-tblr-toggle="modal" data-bs-target="#testModal">Open</button>', '<dialog class="modal" id="testModal">', '  <div class="modal-dialog"><div class="modal-content"></div></div>', '</dialog>'].join('')

        const modalEl = fixtureEl.querySelector('#testModal')! as HTMLDialogElement
        const btn = fixtureEl.querySelector('[data-tblr-toggle="modal"]') as HTMLElement

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.open).toBe(true)
          resolve()
        })

        btn.click()
      })
    })

    it('should open modal via data-tblr-toggle with data-tblr-target', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<button data-tblr-toggle="modal" data-tblr-target="#testModal">Open</button>', '<dialog class="modal" id="testModal">', '  <div class="modal-dialog"><div class="modal-content"></div></div>', '</dialog>'].join('')

        const modalEl = fixtureEl.querySelector('#testModal')! as HTMLDialogElement
        const btn = fixtureEl.querySelector('[data-tblr-toggle="modal"]') as HTMLElement

        modalEl.addEventListener('shown.bs.modal', () => {
          expect(modalEl.open).toBe(true)
          resolve()
        })

        btn.click()
      })
    })
  })

  describe('data-tblr-dismiss', () => {
    it('should close modal via data-tblr-dismiss="modal"', () => {
      return new Promise<void>((resolve) => {
        fixtureEl.innerHTML = ['<dialog class="modal">', '  <div class="modal-dialog">', '    <div class="modal-content">', '      <button type="button" class="btn-close" data-tblr-dismiss="modal"></button>', '    </div>', '  </div>', '</dialog>'].join('')

        const modalEl = fixtureEl.querySelector('.modal')! as HTMLDialogElement
        const dismissBtn = fixtureEl.querySelector('[data-tblr-dismiss="modal"]') as HTMLElement
        const modal = new Modal(modalEl)

        modalEl.addEventListener('shown.bs.modal', () => {
          dismissBtn.click()
        })

        modalEl.addEventListener('hidden.bs.modal', () => {
          expect(modalEl.open).toBe(false)
          resolve()
        })

        modal.show()
      })
    })
  })
})
