import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import Alert from '../../src/bootstrap/alert'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Alert', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  it('should accept element as CSS selector or DOM element', () => {
    fixtureEl.innerHTML = '<div class="alert"></div>'

    const alertEl = fixtureEl.querySelector('.alert')!
    const alertBySelector = new Alert('.alert')
    const alertByElement = new Alert(alertEl)

    expect(alertBySelector._element).toBe(alertEl)
    expect(alertByElement._element).toBe(alertEl)
  })

  it('should return version', () => {
    expect(typeof Alert.VERSION).toBe('string')
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Alert.DATA_KEY).toBe('bs.alert')
    })
  })

  describe('data-api', () => {
    it('should close an alert without instantiating manually', () => {
      fixtureEl.innerHTML = [
        '<div class="alert">',
        '  <button type="button" data-bs-dismiss="alert">x</button>',
        '</div>'
      ].join('')

      const button = document.querySelector('button')!
      button.click()
      expect(document.querySelectorAll('.alert')).toHaveLength(0)
    })

    it('should close an alert with parent selector', () => {
      fixtureEl.innerHTML = [
        '<div class="alert">',
        '  <button type="button" data-bs-target=".alert" data-bs-dismiss="alert">x</button>',
        '</div>'
      ].join('')

      const button = document.querySelector('button')!
      button.click()
      expect(document.querySelectorAll('.alert')).toHaveLength(0)
    })

    it('should close an alert via data-tblr-dismiss', () => {
      fixtureEl.innerHTML = [
        '<div class="alert">',
        '  <button type="button" data-tblr-dismiss="alert">x</button>',
        '</div>'
      ].join('')

      const button = document.querySelector('button')!
      button.click()
      expect(document.querySelectorAll('.alert')).toHaveLength(0)
    })

    it('should close an alert via data-tblr-dismiss with data-tblr-target', () => {
      fixtureEl.innerHTML = [
        '<div class="alert">',
        '  <button type="button" data-tblr-target=".alert" data-tblr-dismiss="alert">x</button>',
        '</div>'
      ].join('')

      const button = document.querySelector('button')!
      button.click()
      expect(document.querySelectorAll('.alert')).toHaveLength(0)
    })
  })

  describe('close', () => {
    it('should close an alert', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div class="alert"></div>'

        const alertEl = document.querySelector('.alert')!
        const alert = new Alert(alertEl)

        alertEl.addEventListener('closed.bs.alert', () => {
          expect(document.querySelectorAll('.alert')).toHaveLength(0)
          resolve()
        })

        alert.close()
      })
    })

    it('should close alert with fade class', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div class="alert fade"></div>'

        const alertEl = document.querySelector('.alert')!
        const alert = new Alert(alertEl)

        alertEl.addEventListener('closed.bs.alert', () => {
          expect(document.querySelectorAll('.alert')).toHaveLength(0)
          resolve()
        })

        alert.close()
      })
    })

    it('should not remove alert if close event is prevented', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div class="alert"></div>'

        const alertEl = document.querySelector('.alert')!
        const alert = new Alert(alertEl)

        alertEl.addEventListener('close.bs.alert', event => {
          event.preventDefault()
          setTimeout(() => {
            expect(document.querySelector('.alert')).not.toBeNull()
            resolve()
          }, 10)
        })

        alert.close()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose an alert', () => {
      fixtureEl.innerHTML = '<div class="alert"></div>'

      const alertEl = document.querySelector('.alert')!
      const alert = new Alert(alertEl)

      expect(Alert.getInstance(alertEl)).not.toBeNull()

      alert.dispose()

      expect(Alert.getInstance(alertEl)).toBeNull()
    })
  })

  describe('getInstance', () => {
    it('should return alert instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const alert = new Alert(div)

      expect(Alert.getInstance(div)).toBe(alert)
      expect(Alert.getInstance(div)).toBeInstanceOf(Alert)
    })

    it('should return null when there is no alert instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      expect(Alert.getInstance(div)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return alert instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const alert = new Alert(div)

      expect(Alert.getOrCreateInstance(div)).toBe(alert)
      expect(Alert.getOrCreateInstance(div)).toBeInstanceOf(Alert)
    })

    it('should return new instance when there is no alert instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      expect(Alert.getInstance(div)).toBeNull()
      expect(Alert.getOrCreateInstance(div)).toBeInstanceOf(Alert)
    })
  })
})
