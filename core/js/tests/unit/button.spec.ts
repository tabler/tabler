import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Button from '../../src/bootstrap/button'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Button', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  it('should accept element as CSS selector or DOM element', () => {
    fixtureEl.innerHTML = '<button data-bs-toggle="button">Placeholder</button>'
    const buttonEl = fixtureEl.querySelector('[data-bs-toggle="button"]')!
    const buttonBySelector = new Button('[data-bs-toggle="button"]')
    const buttonByElement = new Button(buttonEl)

    expect(buttonBySelector._element).toBe(buttonEl)
    expect(buttonByElement._element).toBe(buttonEl)
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Button.VERSION).toBe('string')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Button.DATA_KEY).toBe('bs.button')
    })
  })

  describe('data-api', () => {
    it('should toggle active class on click', () => {
      fixtureEl.innerHTML = [
        '<button class="btn" data-bs-toggle="button">btn</button>',
        '<button class="btn testParent" data-bs-toggle="button"><div class="test"></div></button>'
      ].join('')

      const btn = fixtureEl.querySelector('.btn') as HTMLElement
      const divTest = fixtureEl.querySelector('.test') as HTMLElement
      const btnTestParent = fixtureEl.querySelector('.testParent') as HTMLElement

      expect(btn.classList.contains('active')).toBe(false)

      btn.click()
      expect(btn.classList.contains('active')).toBe(true)

      btn.click()
      expect(btn.classList.contains('active')).toBe(false)

      divTest.click()
      expect(btnTestParent.classList.contains('active')).toBe(true)
    })
  })

  describe('toggle', () => {
    it('should toggle aria-pressed', () => {
      fixtureEl.innerHTML = '<button class="btn" data-bs-toggle="button" aria-pressed="false"></button>'

      const btnEl = fixtureEl.querySelector('.btn')!
      const button = new Button(btnEl)

      expect(btnEl.getAttribute('aria-pressed')).toBe('false')
      expect(btnEl.classList.contains('active')).toBe(false)

      button.toggle()

      expect(btnEl.getAttribute('aria-pressed')).toBe('true')
      expect(btnEl.classList.contains('active')).toBe(true)
    })
  })

  describe('dispose', () => {
    it('should dispose a button', () => {
      fixtureEl.innerHTML = '<button class="btn" data-bs-toggle="button"></button>'

      const btnEl = fixtureEl.querySelector('.btn')!
      const button = new Button(btnEl)

      expect(Button.getInstance(btnEl)).not.toBeNull()

      button.dispose()

      expect(Button.getInstance(btnEl)).toBeNull()
    })
  })

  describe('data-tblr-toggle', () => {
    it('should toggle active class via data-tblr-toggle', () => {
      fixtureEl.innerHTML = '<button class="btn" data-tblr-toggle="button">btn</button>'

      const btn = fixtureEl.querySelector('.btn') as HTMLElement

      expect(btn.classList.contains('active')).toBe(false)

      btn.click()
      expect(btn.classList.contains('active')).toBe(true)

      btn.click()
      expect(btn.classList.contains('active')).toBe(false)
    })

    it('should toggle active on child click with data-tblr-toggle', () => {
      fixtureEl.innerHTML = '<button class="btn" data-tblr-toggle="button"><span class="inner">text</span></button>'

      const inner = fixtureEl.querySelector('.inner') as HTMLElement
      const btn = fixtureEl.querySelector('.btn') as HTMLElement

      inner.click()
      expect(btn.classList.contains('active')).toBe(true)
    })
  })

  describe('data-api edge cases', () => {
    it('should do nothing when closest returns null', () => {
      fixtureEl.innerHTML = '<div id="wrapper"><span data-bs-toggle="button"></span></div>'

      const span = fixtureEl.querySelector('span')!
      vi.spyOn(span, 'closest').mockReturnValue(null)

      span.click()

      expect(Button.getInstance(span)).toBeNull()
    })
  })

  describe('getInstance', () => {
    it('should return button instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const button = new Button(div)

      expect(Button.getInstance(div)).toBe(button)
      expect(Button.getInstance(div)).toBeInstanceOf(Button)
    })

    it('should return null when there is no button instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      expect(Button.getInstance(div)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return button instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const button = new Button(div)

      expect(Button.getOrCreateInstance(div)).toBe(button)
      expect(Button.getOrCreateInstance(div)).toBeInstanceOf(Button)
    })

    it('should return new instance when there is no button instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      expect(Button.getInstance(div)).toBeNull()
      expect(Button.getOrCreateInstance(div)).toBeInstanceOf(Button)
    })
  })
})
