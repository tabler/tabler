import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import Backdrop from '../../../src/bootstrap/util/backdrop'
import { clearFixture, getFixture } from '../../helpers/fixture'

const CLASS_BACKDROP = '.modal-backdrop'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'

describe('Backdrop', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    for (const el of document.querySelectorAll(CLASS_BACKDROP)) {
      el.remove()
    }
  })

  describe('show', () => {
    it('should append the backdrop and include the "show" class', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, isAnimated: false })
        const getElements = () => document.querySelectorAll(CLASS_BACKDROP)

        expect(getElements()).toHaveLength(0)

        instance.show()
        instance.show(() => {
          expect(getElements()).toHaveLength(1)
          for (const el of getElements()) {
            expect(el.classList.contains(CLASS_NAME_SHOW)).toBe(true)
          }

          resolve()
        })
      })
    })

    it('should not append the backdrop if not visible', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: false, isAnimated: true })
        const getElements = () => document.querySelectorAll(CLASS_BACKDROP)

        expect(getElements()).toHaveLength(0)
        instance.show(() => {
          expect(getElements()).toHaveLength(0)
          resolve()
        })
      })
    })

    it('should include the "fade" class if animated', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, isAnimated: true })
        const getElements = () => document.querySelectorAll(CLASS_BACKDROP)

        expect(getElements()).toHaveLength(0)
        instance.show(() => {
          expect(getElements()).toHaveLength(1)
          for (const el of getElements()) {
            expect(el.classList.contains(CLASS_NAME_FADE)).toBe(true)
          }

          resolve()
        })
      })
    })
  })

  describe('hide', () => {
    it('should remove the backdrop html', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, isAnimated: true })
        const getElements = () => document.body.querySelectorAll(CLASS_BACKDROP)

        expect(getElements()).toHaveLength(0)
        instance.show(() => {
          expect(getElements()).toHaveLength(1)
          instance.hide(() => {
            expect(getElements()).toHaveLength(0)
            resolve()
          })
        })
      })
    })

    it('should remove the "show" class', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, isAnimated: true })
        const elem = instance._getElement()

        instance.show()
        instance.hide(() => {
          expect(elem.classList.contains(CLASS_NAME_SHOW)).toBe(false)
          resolve()
        })
      })
    })

    it('should not try to remove if not visible', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: false, isAnimated: true })
        const getElements = () => document.querySelectorAll(CLASS_BACKDROP)

        expect(getElements()).toHaveLength(0)
        expect(instance._isAppended).toBe(false)
        instance.show(() => {
          instance.hide(() => {
            expect(getElements()).toHaveLength(0)
            expect(instance._isAppended).toBe(false)
            resolve()
          })
        })
      })
    })
  })

  describe('click callback', () => {
    it('should execute callback on click', () => {
      return new Promise<void>(resolve => {
        let called = false
        const instance = new Backdrop({
          isVisible: true,
          isAnimated: false,
          clickCallback: () => { called = true }
        })

        instance.show(() => {
          const clickEvent = new Event('mousedown', { bubbles: true, cancelable: true })
          document.querySelector(CLASS_BACKDROP)!.dispatchEvent(clickEvent)
          setTimeout(() => {
            expect(called).toBe(true)
            resolve()
          }, 10)
        })
      })
    })
  })

  describe('Config', () => {
    it('should be appended on document.body by default', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true })
        instance.show(() => {
          expect(document.querySelector(CLASS_BACKDROP)!.parentElement).toBe(document.body)
          resolve()
        })
      })
    })

    it('should find rootElement if passed as a string', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, rootElement: 'body' })
        instance.show(() => {
          expect(document.querySelector(CLASS_BACKDROP)!.parentElement).toBe(document.body)
          resolve()
        })
      })
    })

    it('should be appended on custom rootElement', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div id="wrapper"></div>'
        const wrapper = fixtureEl.querySelector('#wrapper')!

        const instance = new Backdrop({ isVisible: true, rootElement: wrapper })
        instance.show(() => {
          expect(document.querySelector(CLASS_BACKDROP)!.parentElement).toBe(wrapper)
          resolve()
        })
      })
    })

    it('should allow configuring className', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, className: 'foo' })
        instance.show(() => {
          expect(document.querySelector('.foo')).toBe(instance._getElement())
          instance.dispose()
          resolve()
        })
      })
    })
  })

  describe('dispose', () => {
    it('should do nothing if not appended', () => {
      const instance = new Backdrop({ isVisible: true, isAnimated: false })
      expect(instance._isAppended).toBe(false)
      instance.dispose()
      expect(instance._isAppended).toBe(false)
    })

    it('should remove element and reset _isAppended after show', () => {
      return new Promise<void>(resolve => {
        const instance = new Backdrop({ isVisible: true, isAnimated: false })
        instance.show(() => {
          expect(instance._isAppended).toBe(true)
          instance.dispose()
          expect(instance._isAppended).toBe(false)
          expect(document.querySelectorAll(CLASS_BACKDROP)).toHaveLength(0)
          resolve()
        })
      })
    })
  })
})
