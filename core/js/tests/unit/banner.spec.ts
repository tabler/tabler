import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Banner from '../../src/banner'

const STORAGE_KEY = 'tabler-banner'

describe('Banner', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    localStorage.clear()
    fixtureEl.innerHTML = '<div class="banner" data-bs-banner-id="release"><button type="button" data-bs-dismiss="banner"></button></div>'
  })

  afterEach(() => {
    localStorage.clear()
    clearFixture()
  })

  const banner = (): HTMLElement | null => fixtureEl.querySelector('.banner')
  const button = (): HTMLButtonElement => fixtureEl.querySelector('button')!

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Banner.NAME).toBe('banner')
    })
  })

  describe('data-api', () => {
    it('should close the banner and remember its id', () => {
      button().click()

      expect(banner()).toBeNull()
      expect(localStorage.getItem(STORAGE_KEY)).toBe('release')
    })

    it('should close the banner via data-tblr-dismiss', () => {
      fixtureEl.innerHTML = '<div class="banner"><button type="button" data-tblr-dismiss="banner"></button></div>'

      button().click()

      expect(banner()).toBeNull()
    })

    it('should store nothing for a banner without an id', () => {
      fixtureEl.innerHTML = '<div class="banner"><button type="button" data-bs-dismiss="banner"></button></div>'

      button().click()

      expect(banner()).toBeNull()
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe('close', () => {
    it('should fire close and closed events', () => {
      const element = banner()!
      const onClose = vi.fn()
      const onClosed = vi.fn()
      element.addEventListener('close.bs.banner', onClose)
      element.addEventListener('closed.bs.banner', onClosed)

      new Banner(element).close()

      expect(onClose).toHaveBeenCalledOnce()
      expect(onClosed).toHaveBeenCalledOnce()
    })

    it('should keep the banner when the close event is prevented', () => {
      const element = banner()!
      element.addEventListener('close.bs.banner', (event) => event.preventDefault())

      new Banner(element).close()

      expect(banner()).not.toBeNull()
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })

    it('should add to the ids already stored, without duplicates', () => {
      localStorage.setItem(STORAGE_KEY, 'trial release')

      new Banner(banner()!).close()

      expect(localStorage.getItem(STORAGE_KEY)).toBe('trial release')
    })

    it('should not remember an id that is not a plain token', () => {
      banner()!.setAttribute('data-bs-banner-id', 'Release 1.8')

      new Banner(banner()!).close()

      expect(banner()).toBeNull()
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe('isClosed and reset', () => {
    it('should report a closed banner', () => {
      expect(Banner.isClosed('release')).toBe(false)

      button().click()

      expect(Banner.isClosed('release')).toBe(true)
    })

    it('should forget one id', () => {
      localStorage.setItem(STORAGE_KEY, 'trial release')

      Banner.reset('trial')

      expect(localStorage.getItem(STORAGE_KEY)).toBe('release')
    })

    it('should forget every id', () => {
      localStorage.setItem(STORAGE_KEY, 'trial release')

      Banner.reset()

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })
})
