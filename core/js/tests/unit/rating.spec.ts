import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import Rating from '../../src/rating'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Rating', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof Rating.VERSION).toBe('string')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Rating.DATA_KEY).toBe('bs.rating')
    })
  })

  describe('constructor', () => {
    it('renders max stars, defaulting to 5', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el)

      expect(el.querySelectorAll('.rating-star')).toHaveLength(5)
    })

    it('respects a custom max', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el, { max: 10 })

      expect(el.querySelectorAll('.rating-star')).toHaveLength(10)
    })

    it('reflects the initial input value as active stars', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el)

      const stars = el.querySelectorAll('.rating-star')
      expect(Array.from(stars).filter((star) => star.classList.contains('rating-star-active'))).toHaveLength(3)
    })

    it('renders one radio per star by default, two when half is enabled', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el, { max: 5, half: true })

      expect(el.querySelectorAll('.rating-star-input')).toHaveLength(10)
    })

    it('renders no radios in readonly mode', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3.7"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el, { readonly: true })

      expect(el.querySelectorAll('.rating-star-input')).toHaveLength(0)
      expect(el.classList.contains('rating-readonly')).toBe(true)
    })
  })

  describe('interaction', () => {
    it('sets the value and fires input/change on the real input when a star is clicked', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement
      const input = el.querySelector('input') as HTMLInputElement

      const rating = new Rating(el)

      let inputFired = false
      let changeFired = false
      input.addEventListener('input', () => (inputFired = true))
      input.addEventListener('change', () => (changeFired = true))

      const thirdStarRadio = el.querySelectorAll('.rating-star-input')[2] as HTMLInputElement
      thirdStarRadio.dispatchEvent(new Event('click', { bubbles: true }))

      expect(rating.getValue()).toBe(3)
      expect(input.value).toBe('3')
      expect(inputFired).toBe(true)
      expect(changeFired).toBe(true)
    })

    it('supports half-star steps', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      const rating = new Rating(el, { half: true })

      const halfStepRadio = el.querySelectorAll('.rating-star-input')[4] as HTMLInputElement // 2.5
      halfStepRadio.dispatchEvent(new Event('click', { bubbles: true }))

      expect(rating.getValue()).toBe(2.5)
      expect(el.querySelectorAll('.rating-star')[2].classList.contains('rating-star-half')).toBe(true)
    })

    it('clears the value when clicking the already-selected star with clearable', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      const rating = new Rating(el, { clearable: true })

      const thirdStarRadio = el.querySelectorAll('.rating-star-input')[2] as HTMLInputElement
      thirdStarRadio.dispatchEvent(new Event('click', { bubbles: true }))

      expect(rating.getValue()).toBe(0)
    })

    it('does not clear the value on repeat click without clearable', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      const rating = new Rating(el)

      const thirdStarRadio = el.querySelectorAll('.rating-star-input')[2] as HTMLInputElement
      thirdStarRadio.dispatchEvent(new Event('click', { bubbles: true }))

      expect(rating.getValue()).toBe(3)
    })
  })

  describe('readonly fill', () => {
    it('sets a fractional --tblr-rating-fill on the partially-filled star', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3.7"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el, { readonly: true, max: 5 })

      const stars = el.querySelectorAll<HTMLElement>('.rating-star')
      expect(stars[2].style.getPropertyValue('--tblr-rating-fill')).toBe('100%')
      expect(stars[3].style.getPropertyValue('--tblr-rating-fill')).toBe('70%')
      expect(stars[4].style.getPropertyValue('--tblr-rating-fill')).toBe('0%')
    })

    it('redraws the fill and the label on setValue() and clear()', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="1"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      const rating = new Rating(el, { readonly: true, max: 5 })
      rating.setValue(2.5)

      const stars = el.querySelectorAll<HTMLElement>('.rating-star')
      expect(stars[1].style.getPropertyValue('--tblr-rating-fill')).toBe('100%')
      expect(stars[2].style.getPropertyValue('--tblr-rating-fill')).toBe('50%')
      expect(el.getAttribute('aria-label')).toBe('2.5 out of 5')

      rating.clear()

      expect(stars[0].style.getPropertyValue('--tblr-rating-fill')).toBe('0%')
      expect(el.getAttribute('aria-label')).toBe('0 out of 5')
    })
  })

  describe('change.bs.rating', () => {
    it('fires on the wrapper with the current value', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      new Rating(el)

      let received: number | undefined
      el.addEventListener('change.bs.rating', (event) => {
        received = (event as Event & { value: number }).value
      })

      const fourthStarRadio = el.querySelectorAll('.rating-star-input')[3] as HTMLInputElement
      fourthStarRadio.dispatchEvent(new Event('click', { bubbles: true }))

      expect(received).toBe(4)
    })
  })

  describe('setValue/clear', () => {
    it('setValue updates the input and re-renders the stars', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="0"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement
      const input = el.querySelector('input') as HTMLInputElement

      const rating = new Rating(el)
      rating.setValue(4)

      expect(input.value).toBe('4')
      expect(el.querySelectorAll('.rating-star-active')).toHaveLength(4)
    })

    it('clear empties the value', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement
      const input = el.querySelector('input') as HTMLInputElement

      const rating = new Rating(el)
      rating.clear()

      expect(input.value).toBe('')
      expect(rating.getValue()).toBe(0)
    })
  })

  describe('dispose', () => {
    it('removes the rendered stars', () => {
      fixtureEl.innerHTML = '<div class="rating"><input type="hidden" value="3"></div>'
      const el = fixtureEl.querySelector('.rating') as HTMLElement

      const rating = new Rating(el)
      rating.dispose()

      expect(el.querySelectorAll('.rating-star')).toHaveLength(0)
      expect(el.classList.contains('rating-rendered')).toBe(false)
    })
  })
})
