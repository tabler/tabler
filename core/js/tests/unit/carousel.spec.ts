import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Carousel from '../../src/bootstrap/carousel'
import EventHandler from '../../src/bootstrap/dom/event-handler'
import { clearFixture, createEvent, getFixture } from '../helpers/fixture'

describe('Carousel', () => {
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
      expect(typeof Carousel.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(typeof Carousel.Default).toBe('object')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Carousel.DATA_KEY).toBe('bs.carousel')
    })
  })

  describe('constructor', () => {
    it('should accept element as CSS selector or DOM element', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carouselBySelector = new Carousel('#myCarousel')
      const carouselByElement = new Carousel(carouselEl)

      expect(carouselBySelector._element).toBe(carouselEl)
      expect(carouselByElement._element).toBe(carouselEl)
    })

    it('should start cycling if ride=carousel', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide" data-bs-ride="carousel"></div>'

      const carousel = new Carousel('#myCarousel')
      expect(carousel._interval).not.toBeNull()
      carousel.dispose()
    })

    it('should not start cycling if ride!=carousel', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide" data-bs-ride="true"></div>'

      const carousel = new Carousel('#myCarousel')
      expect(carousel._interval).toBeNull()
    })

    it('should go to next item on right arrow key', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div class="carousel-item active">item 1</div>',
          '    <div id="item2" class="carousel-item">item 2</div>',
          '    <div class="carousel-item">item 3</div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const carousel = new Carousel(carouselEl, { keyboard: true })

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('.active')).toBe(fixtureEl.querySelector('#item2'))
          carousel.dispose()
          resolve()
        })

        const keydown = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
        carouselEl.dispatchEvent(keydown)
      })
    })

    it('should go to previous item on left arrow key', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div id="item1" class="carousel-item">item 1</div>',
          '    <div class="carousel-item active">item 2</div>',
          '    <div class="carousel-item">item 3</div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const carousel = new Carousel(carouselEl, { keyboard: true })

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('.active')).toBe(fixtureEl.querySelector('#item1'))
          carousel.dispose()
          resolve()
        })

        const keydown = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
        carouselEl.dispatchEvent(keydown)
      })
    })

    it('should not prevent keydown for non-arrow keys', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active">item 1</div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      new Carousel(carouselEl, { keyboard: true })

      const spy = vi.spyOn(Event.prototype, 'preventDefault')
      const keydown = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      carouselEl.dispatchEvent(keydown)

      expect(spy).not.toHaveBeenCalled()
    })

    it('should ignore keyboard in input/textarea', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active"><input type="text"></div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl, { keyboard: true })
      const slideSpy = vi.spyOn(carousel, '_slide')

      const input = fixtureEl.querySelector('input')!
      const keydown = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      Object.defineProperty(keydown, 'target', { value: input, configurable: true })
      carouselEl.dispatchEvent(keydown)

      expect(slideSpy).not.toHaveBeenCalled()
    })

    it('should not slide if already sliding', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)
      const triggerSpy = vi.spyOn(EventHandler, 'trigger')

      carousel._isSliding = true

      const keydown = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      carouselEl.dispatchEvent(keydown)

      expect(triggerSpy).not.toHaveBeenCalled()
    })
  })

  describe('next', () => {
    it('should slide to next item', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div class="carousel-item active">item 1</div>',
          '    <div id="item2" class="carousel-item">item 2</div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const carousel = new Carousel(carouselEl)

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('#item2')!.classList.contains('active')).toBe(true)
          carousel.dispose()
          resolve()
        })

        carousel.next()
      })
    })
  })

  describe('prev', () => {
    it('should stay at start when wrap is false', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div id="one" class="carousel-item active"></div>',
          '    <div id="two" class="carousel-item"></div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const carousel = new Carousel(carouselEl, { wrap: false })

        carouselEl.addEventListener('slid.bs.carousel', () => {
          reject(new Error('should not slide'))
        })

        carousel.prev()

        setTimeout(() => {
          expect(fixtureEl.querySelector('#one')!.classList.contains('active')).toBe(true)
          resolve()
        }, 50)
      })
    })
  })

  describe('pause', () => {
    it('should clear interval', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel.cycle()
      expect(carousel._interval).not.toBeNull()

      carousel.pause()
      expect(carousel._interval).toBeNull()
    })
  })

  describe('cycle', () => {
    it('should create an interval', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel.cycle()
      expect(carousel._interval).not.toBeNull()
      carousel.dispose()
    })
  })

  describe('to', () => {
    it('should go to specific index', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div class="carousel-item active">item 1</div>',
          '    <div id="item2" class="carousel-item">item 2</div>',
          '    <div id="item3" class="carousel-item">item 3</div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const carousel = new Carousel(carouselEl)

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('#item3')!.classList.contains('active')).toBe(true)
          carousel.dispose()
          resolve()
        })

        carousel.to(2)
      })
    })

    it('should ignore invalid index', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active">item 1</div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)
      const spy = vi.spyOn(EventHandler, 'trigger')

      carousel.to(-1)
      carousel.to(10)

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('dispose', () => {
    it('should dispose carousel', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      expect(Carousel.getInstance(carouselEl)).not.toBeNull()

      carousel.dispose()

      expect(Carousel.getInstance(carouselEl)).toBeNull()
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Carousel.getInstance(fixtureEl)).toBeNull()
    })

    it('should return carousel instance', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      expect(Carousel.getInstance(carouselEl)).toBe(carousel)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return carousel instance', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      expect(Carousel.getOrCreateInstance(carouselEl)).toBe(carousel)
    })

    it('should return new instance', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carouselEl = fixtureEl.querySelector('#myCarousel')!

      expect(Carousel.getInstance(carouselEl)).toBeNull()
      expect(Carousel.getOrCreateInstance(carouselEl)).toBeInstanceOf(Carousel)
    })
  })

  describe('_updateInterval', () => {
    it('should use data-bs-interval from active element', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active" data-bs-interval="2000">item 1</div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel._updateInterval()
      expect(carousel._config.interval).toBe(2000)
    })

    it('should use data-tblr-interval from active element', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active" data-tblr-interval="3000">item 1</div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel._updateInterval()
      expect(carousel._config.interval).toBe(3000)
    })

    it('should fall back to defaultInterval if no data-interval', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active">item 1</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel._updateInterval()
      expect(carousel._config.interval).toBe(carousel._config.defaultInterval)
    })
  })

  describe('_setActiveIndicatorElement', () => {
    it('should update indicator with data-bs-slide-to', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-indicators">',
        '    <button class="active" data-bs-slide-to="0" aria-current="true"></button>',
        '    <button data-bs-slide-to="1"></button>',
        '  </div>',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active">item 1</div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel._setActiveIndicatorElement(1)

      const indicators = fixtureEl.querySelectorAll('[data-bs-slide-to]')
      expect(indicators[0].classList.contains('active')).toBe(false)
      expect(indicators[1].classList.contains('active')).toBe(true)
      expect(indicators[1].getAttribute('aria-current')).toBe('true')
    })

    it('should update indicator with data-tblr-slide-to', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-indicators">',
        '    <button class="active" data-tblr-slide-to="0" aria-current="true"></button>',
        '    <button data-tblr-slide-to="1"></button>',
        '  </div>',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active">item 1</div>',
        '    <div class="carousel-item">item 2</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      carousel._setActiveIndicatorElement(1)

      const indicators = fixtureEl.querySelectorAll('[data-tblr-slide-to]')
      expect(indicators[0].classList.contains('active')).toBe(false)
      expect(indicators[1].classList.contains('active')).toBe(true)
    })

    it('should skip if no indicators element', () => {
      fixtureEl.innerHTML = [
        '<div id="myCarousel" class="carousel slide">',
        '  <div class="carousel-inner">',
        '    <div class="carousel-item active">item 1</div>',
        '  </div>',
        '</div>'
      ].join('')

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const carousel = new Carousel(carouselEl)

      expect(() => carousel._setActiveIndicatorElement(0)).not.toThrow()
    })
  })

  describe('_maybeEnableCycle', () => {
    it('should not cycle if ride is false', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carousel = new Carousel('#myCarousel', { ride: false })
      carousel._maybeEnableCycle()

      expect(carousel._interval).toBeNull()
    })

    it('should defer cycle if sliding', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide"></div>'

      const carousel = new Carousel('#myCarousel', { ride: true })
      carousel._isSliding = true

      const spy = vi.spyOn(EventHandler, 'one')
      carousel._maybeEnableCycle()

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('wrap', () => {
    it('should wrap from end to start', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div id="one" class="carousel-item active"></div>',
          '    <div id="two" class="carousel-item"></div>',
          '    <div id="three" class="carousel-item"></div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const carousel = new Carousel(carouselEl, { wrap: true })
        let slidCount = 0

        carouselEl.addEventListener('slid.bs.carousel', () => {
          slidCount++
          const activeId = carouselEl.querySelector('.carousel-item.active')!.id

          if (slidCount < 3) {
            carousel.next()
            return
          }

          // wrapped back to first
          expect(activeId).toBe('one')
          carousel.dispose()
          resolve()
        })

        carousel.next()
      })
    })
  })

  describe('data-api', () => {
    it('should auto-init via data-bs-ride="carousel"', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide" data-bs-ride="carousel"></div>'

      window.dispatchEvent(createEvent('load'))

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const instance = Carousel.getInstance(carouselEl)
      expect(instance).not.toBeNull()
      instance!.dispose()
    })
  })

  describe('data-tblr', () => {
    it('should auto-init via data-tblr-ride="carousel"', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide" data-tblr-ride="carousel"></div>'

      window.dispatchEvent(createEvent('load'))

      const carouselEl = fixtureEl.querySelector('#myCarousel')!
      const instance = Carousel.getInstance(carouselEl)
      expect(instance).not.toBeNull()
      instance!.dispose()
    })

    it('should start cycling via data-tblr-ride', () => {
      fixtureEl.innerHTML = '<div id="myCarousel" class="carousel slide" data-tblr-ride="carousel"></div>'

      const carousel = new Carousel('#myCarousel')
      expect(carousel._interval).not.toBeNull()
      carousel.dispose()
    })

    it('should navigate via data-tblr-slide="next"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div class="carousel-item active">item 1</div>',
          '    <div id="item2" class="carousel-item">item 2</div>',
          '  </div>',
          '  <button data-tblr-slide="next" data-bs-target="#myCarousel">Next</button>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const nextBtn = fixtureEl.querySelector('[data-tblr-slide="next"]') as HTMLElement

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('#item2')!.classList.contains('active')).toBe(true)
          resolve()
        })

        nextBtn.click()
      })
    })

    it('should navigate via data-tblr-slide="prev"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-inner">',
          '    <div id="item1" class="carousel-item">item 1</div>',
          '    <div class="carousel-item active">item 2</div>',
          '  </div>',
          '  <button data-tblr-slide="prev" data-bs-target="#myCarousel">Prev</button>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const prevBtn = fixtureEl.querySelector('[data-tblr-slide="prev"]') as HTMLElement

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('#item1')!.classList.contains('active')).toBe(true)
          resolve()
        })

        prevBtn.click()
      })
    })

    it('should handle data-tblr-slide-to in indicators', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="myCarousel" class="carousel slide">',
          '  <div class="carousel-indicators">',
          '    <button class="active" data-tblr-slide-to="0" data-bs-target="#myCarousel" aria-current="true"></button>',
          '    <button data-tblr-slide-to="1" data-bs-target="#myCarousel"></button>',
          '  </div>',
          '  <div class="carousel-inner">',
          '    <div class="carousel-item active">item 1</div>',
          '    <div id="item2" class="carousel-item">item 2</div>',
          '  </div>',
          '</div>'
        ].join('')

        const carouselEl = fixtureEl.querySelector('#myCarousel')!
        const trigger = fixtureEl.querySelectorAll('[data-tblr-slide-to]')[1] as HTMLElement

        carouselEl.addEventListener('slid.bs.carousel', () => {
          expect(fixtureEl.querySelector('#item2')!.classList.contains('active')).toBe(true)
          resolve()
        })

        trigger.click()
      })
    })
  })
})
