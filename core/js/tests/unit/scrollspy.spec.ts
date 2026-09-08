import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import ScrollSpy from '../../src/bootstrap/scrollspy'
import { clearFixture, createEvent, getFixture } from '../helpers/fixture'

const observers: MockIntersectionObserver[] = []

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  callback: IntersectionObserverCallback
  options: IntersectionObserverInit | undefined
  observed = new Set<Element>()

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    this.root = (options?.root as Element | null) ?? null
    this.rootMargin = options?.rootMargin ?? ''
    this.thresholds = Array.isArray(options?.threshold) ? options!.threshold : [options?.threshold ?? 0]
    observers.push(this)
  }

  observe = vi.fn((el: Element) => {
    this.observed.add(el)
  })

  unobserve = vi.fn((el: Element) => {
    this.observed.delete(el)
  })

  disconnect = vi.fn(() => {
    this.observed.clear()
  })

  takeRecords = vi.fn().mockReturnValue([])
}

const entry = (target: Element, isIntersecting: boolean): IntersectionObserverEntry =>
  ({
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
  }) as unknown as IntersectionObserverEntry

const getDummyFixture = () =>
  ['<nav id="navBar" class="navbar">', '  <ul class="nav">', '    <li class="nav-item"><a id="li-jsm-1" class="nav-link" href="#div-jsm-1">div 1</a></li>', '  </ul>', '</nav>', '<div class="content" data-bs-target="#navBar" style="overflow-y: auto">', '  <div id="div-jsm-1">div 1</div>', '</div>'].join('')

const getMultiSectionFixture = () =>
  [
    '<nav id="navBar" class="navbar">',
    '  <ul class="nav">',
    '    <li class="nav-item"><a id="link-1" class="nav-link" href="#section-1">One</a></li>',
    '    <li class="nav-item"><a id="link-2" class="nav-link" href="#section-2">Two</a></li>',
    '    <li class="nav-item"><a id="link-3" class="nav-link" href="#section-3">Three</a></li>',
    '  </ul>',
    '</nav>',
    '<div class="content" data-bs-target="#navBar" style="height: 200px; overflow-y: auto">',
    '  <div id="section-1" style="height: 300px">one</div>',
    '  <div id="section-2" style="height: 300px">two</div>',
    '  <div id="section-3" style="height: 300px">three</div>',
    '</div>',
  ].join('')

describe('ScrollSpy', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    observers.length = 0
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  describe('VERSION', () => {
    it('should return plugin version', () => {
      expect(typeof ScrollSpy.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(typeof ScrollSpy.Default).toBe('object')
    })

    it('should default topMargin to a percentage and drop the deprecated offset option', () => {
      expect(ScrollSpy.Default.topMargin).toBe('12%')
      expect(ScrollSpy.Default.rootMargin).toBeNull()
      expect('offset' in ScrollSpy.Default).toBe(false)
      expect('offset' in ScrollSpy.DefaultType).toBe(false)
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(ScrollSpy.DATA_KEY).toBe('bs.scrollspy')
    })
  })

  describe('constructor', () => {
    it('should accept element as CSS selector or DOM element', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const sSpyEl = fixtureEl.querySelector('.content')!
      const sSpyBySelector = new ScrollSpy('.content')
      const sSpyByElement = new ScrollSpy(sSpyEl)

      expect(sSpyBySelector._element).toBe(sSpyEl)
      expect(sSpyByElement._element).toBe(sSpyEl)
    })

    it('should set _rootElement to null if overflowY is visible', () => {
      fixtureEl.innerHTML = ['<nav id="navigation" class="navbar">', '  <ul class="navbar-nav">', '    <li class="nav-item"><a class="nav-link" href="#one">One</a></li>', '  </ul>', '</nav>', '<div id="content" style="overflow-y: visible;">', '  <div id="one" style="height: 300px;">test</div>', '</div>'].join('')

      const contentEl = fixtureEl.querySelector('#content')!
      const originalGetComputedStyle = window.getComputedStyle
      vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudoElt?) => {
        const result = originalGetComputedStyle(el, pseudoElt ?? undefined)
        if (el === contentEl) {
          return new Proxy(result, {
            get(target, prop) {
              if (prop === 'overflowY') return 'visible'
              return (target as any)[prop]
            },
          }) as CSSStyleDeclaration
        }

        return result
      })

      const scrollSpy = new ScrollSpy(contentEl, {
        target: '#navigation',
      })

      expect(scrollSpy._rootElement).toBeNull()
    })

    it('should respect threshold option', () => {
      fixtureEl.innerHTML = ['<ul id="navigation" class="navbar">', '   <a class="nav-link" href="#one">One</a>', '</ul>', '<div id="content">', '  <div id="one">test</div>', '</div>'].join('')

      const scrollSpy = new ScrollSpy('#content', {
        target: '#navigation',
        threshold: [1],
      })

      expect(scrollSpy._observer!.thresholds).toEqual([1])
    })

    it('should parse string threshold from data attribute', () => {
      fixtureEl.innerHTML = ['<ul id="navigation" class="navbar">', '   <a class="nav-link" href="#one">One</a>', '</ul>', '<div id="content" data-bs-threshold="0,0.2,1">', '  <div id="one">test</div>', '</div>'].join('')

      const scrollSpy = new ScrollSpy('#content', {
        target: '#navigation',
      })

      expect(scrollSpy._observer!.thresholds).toEqual([0, 0.2, 1])
    })

    it('should build the observer from the derived activation line', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!, { topMargin: '25%' })

      expect(scrollSpy._observer!.rootMargin).toBe('0px 0px -75% 0px')
    })

    it('should pass an explicit rootMargin straight through, ignoring topMargin', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!, {
        rootMargin: '0px 0px -40%',
        topMargin: '25%',
      })

      expect(scrollSpy._observer!.rootMargin).toBe('0px 0px -40%')
    })

    it('should initialize with empty state when sections are not present', () => {
      fixtureEl.innerHTML = [
        '<nav id="navigation" class="navbar">',
        '  <ul class="navbar-nav">',
        '    <li class="nav-item"><a class="nav-link" href="#">One</a></li>',
        '    <li class="nav-item"><a class="nav-link" href="#missing">Missing</a></li>',
        '  </ul>',
        '</nav>',
        '<div id="content" style="height: 200px; overflow-y: auto;"></div>',
      ].join('')

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('#content')!, {
        target: '#navigation',
      })

      expect(scrollSpy._sections).toEqual([])
      expect(scrollSpy._linkBySection).toBeInstanceOf(Map)
      expect(scrollSpy._sectionByLink).toBeInstanceOf(Map)
    })
  })

  describe('refresh', () => {
    it('should disconnect existing observer', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const el = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(el)

      const spy = vi.spyOn(scrollSpy._observer!, 'disconnect')

      scrollSpy.refresh()

      expect(spy).toHaveBeenCalled()
    })

    it('should observe every section', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)

      expect(scrollSpy._sections).toHaveLength(3)
      expect(scrollSpy._observer!.observe).toHaveBeenCalledTimes(3)
    })
  })

  describe('dispose', () => {
    it('should dispose a scrollspy', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const el = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(el)

      expect(ScrollSpy.getInstance(el)).not.toBeNull()

      scrollSpy.dispose()

      expect(ScrollSpy.getInstance(el)).toBeNull()
    })

    it('should remove the bottom sentinel', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const el = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(el)

      const sentinel = scrollSpy._sentinel
      expect(sentinel).not.toBeNull()
      expect(el.contains(sentinel!)).toBe(true)

      scrollSpy.dispose()

      expect(el.contains(sentinel!)).toBe(false)
    })
  })

  describe('getInstance', () => {
    it('should return scrollspy instance', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div, { target: fixtureEl.querySelector('#navBar')! })

      expect(ScrollSpy.getInstance(div)).toBe(scrollSpy)
      expect(ScrollSpy.getInstance(div)).toBeInstanceOf(ScrollSpy)
    })

    it('should return null if no instance', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      expect(ScrollSpy.getInstance(div)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return scrollspy instance', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      expect(ScrollSpy.getOrCreateInstance(div)).toBe(scrollSpy)
      expect(ScrollSpy.getOrCreateInstance(div)).toBeInstanceOf(ScrollSpy)
    })

    it('should return new instance when there is no scrollspy instance', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!

      expect(ScrollSpy.getInstance(div)).toBeNull()
      expect(ScrollSpy.getOrCreateInstance(div)).toBeInstanceOf(ScrollSpy)
    })

    it('should return new instance with given configuration', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!

      const scrollspy = ScrollSpy.getOrCreateInstance(div, { topMargin: '30%' })
      expect(scrollspy).toBeInstanceOf(ScrollSpy)
      expect(scrollspy._config.topMargin).toBe('30%')
    })

    it('should return existing instance ignoring new config', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollspy = new ScrollSpy(div, { topMargin: '30%' })

      const scrollspy2 = ScrollSpy.getOrCreateInstance(div, { topMargin: '50%' })
      expect(scrollspy2).toBe(scrollspy)
      expect(scrollspy2._config.topMargin).toBe('30%')
    })
  })

  describe('event handler', () => {
    it('should create scrollspy on window load event', () => {
      fixtureEl.innerHTML = ['<div id="nav"></div>', '<div id="wrapper" data-bs-spy="scroll" data-bs-target="#nav" style="overflow-y: auto"></div>'].join('')

      const scrollSpyEl = fixtureEl.querySelector('#wrapper')!

      window.dispatchEvent(createEvent('load'))

      expect(ScrollSpy.getInstance(scrollSpyEl)).not.toBeNull()
    })
  })

  describe('data-tblr-spy', () => {
    it('should create scrollspy on window load with data-tblr-spy="scroll"', () => {
      fixtureEl.innerHTML = ['<div id="nav"></div>', '<div id="wrapper" data-tblr-spy="scroll" data-bs-target="#nav" style="overflow-y: auto"></div>'].join('')

      const scrollSpyEl = fixtureEl.querySelector('#wrapper')!

      window.dispatchEvent(createEvent('load'))

      expect(ScrollSpy.getInstance(scrollSpyEl)).not.toBeNull()
    })
  })

  describe('activation line', () => {
    it('_parseTopMargin should split value and unit', () => {
      fixtureEl.innerHTML = getDummyFixture()
      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)

      scrollSpy._config.topMargin = '12%'
      expect(scrollSpy._parseTopMargin()).toEqual({ value: 12, unit: '%' })

      scrollSpy._config.topMargin = '96px'
      expect(scrollSpy._parseTopMargin()).toEqual({ value: 96, unit: 'px' })

      scrollSpy._config.topMargin = 'garbage'
      expect(scrollSpy._parseTopMargin()).toEqual({ value: 0, unit: 'px' })
    })

    it('_getDerivedRootMargin should turn a percentage into a bottom inset', () => {
      fixtureEl.innerHTML = getDummyFixture()
      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)

      scrollSpy._config.topMargin = '20%'
      expect(scrollSpy._getDerivedRootMargin()).toBe('0px 0px -80% 0px')
    })

    it('_getDerivedRootMargin should express a pixel line as a percentage of the root height', () => {
      fixtureEl.innerHTML = getDummyFixture()
      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)

      scrollSpy._rootElement = { clientHeight: 500 } as HTMLElement
      scrollSpy._config.topMargin = '50px'

      // 50 / 500 = 10% -> bottom inset 90%
      expect(scrollSpy._getDerivedRootMargin()).toBe('0px 0px -90% 0px')
    })

    it('_usesPixelMargin should be true only for a px topMargin without an explicit rootMargin', () => {
      fixtureEl.innerHTML = getDummyFixture()
      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)

      scrollSpy._config.rootMargin = null
      scrollSpy._config.topMargin = '96px'
      expect(scrollSpy._usesPixelMargin()).toBe(true)

      scrollSpy._config.topMargin = '12%'
      expect(scrollSpy._usesPixelMargin()).toBe(false)

      scrollSpy._config.rootMargin = '0px 0px -30%'
      scrollSpy._config.topMargin = '96px'
      expect(scrollSpy._usesPixelMargin()).toBe(false)
    })

    it('should register a resize listener that is removed on dispose', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!, { topMargin: '12%' })
      expect(scrollSpy._resizeHandler).not.toBeNull()

      scrollSpy.dispose()
      expect(scrollSpy._resizeHandler).toBeNull()
    })

    it('should re-measure on resize, and rebuild the observer (debounced) for a px line', () => {
      vi.useFakeTimers()
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!, { topMargin: '80px' })
      const rebuild = vi.spyOn(scrollSpy, '_rebuildObserver')
      const measure = vi.spyOn(scrollSpy, '_measure')

      window.dispatchEvent(createEvent('resize'))
      window.dispatchEvent(createEvent('resize'))
      expect(rebuild).not.toHaveBeenCalled()

      vi.runAllTimers()
      expect(rebuild).toHaveBeenCalledTimes(1)
      expect(measure).toHaveBeenCalledTimes(1)

      scrollSpy.dispose()
      vi.useRealTimers()
    })

    it('should re-measure but not rebuild the observer on resize for a percentage line', () => {
      vi.useFakeTimers()
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!, { topMargin: '12%' })
      const rebuild = vi.spyOn(scrollSpy, '_rebuildObserver')
      const measure = vi.spyOn(scrollSpy, '_measure')

      window.dispatchEvent(createEvent('resize'))
      vi.runAllTimers()

      expect(measure).toHaveBeenCalledTimes(1)
      expect(rebuild).not.toHaveBeenCalled()

      scrollSpy.dispose()
      vi.useRealTimers()
    })
  })

  describe('_onIntersect / _computeActive', () => {
    it('should activate the deepest section crossing the line', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)
      const [s1, s2] = scrollSpy._sections

      scrollSpy._onIntersect([entry(s1, true), entry(s2, true)])

      expect(fixtureEl.querySelector('#link-2')!.classList.contains('active')).toBe(true)
      expect(fixtureEl.querySelector('#link-1')!.classList.contains('active')).toBe(false)
    })

    it('should keep the last active section when nothing crosses the line', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)
      const [s1] = scrollSpy._sections

      scrollSpy._onIntersect([entry(s1, true)])
      expect(fixtureEl.querySelector('#link-1')!.classList.contains('active')).toBe(true)

      scrollSpy._onIntersect([entry(s1, false)])
      expect(fixtureEl.querySelector('#link-1')!.classList.contains('active')).toBe(true)
      expect(scrollSpy._lastActive).toBe(s1)
    })

    it('should fall back to the first section at the top of the page', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)

      scrollSpy._onIntersect([])

      expect(fixtureEl.querySelector('#link-1')!.classList.contains('active')).toBe(true)
    })

    it('should not re-process the same target', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)
      const [s1] = scrollSpy._sections

      const spy = vi.fn()
      scrollSpy._element.addEventListener('activate.bs.scrollspy', spy)

      scrollSpy._onIntersect([entry(s1, true)])
      scrollSpy._onIntersect([entry(s1, true)])

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('bottom sentinel', () => {
    it('should append a hidden sentinel inside the observable container', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const el = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(el)

      expect(scrollSpy._sentinel).not.toBeNull()
      expect(scrollSpy._sentinel!.getAttribute('aria-hidden')).toBe('true')
      expect(el.lastElementChild).toBe(scrollSpy._sentinel)
    })

    it('should arm the bottom scroll watch (and re-measure) while the sentinel is visible', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)
      const measure = vi.spyOn(scrollSpy, '_measure')

      scrollSpy._onSentinel([entry(scrollSpy._sentinel!, true)])
      expect(scrollSpy._sentinelVisible).toBe(true)
      expect(scrollSpy._bottomScrollHandler).not.toBeNull()
      expect(measure).toHaveBeenCalled()

      scrollSpy._onSentinel([entry(scrollSpy._sentinel!, false)])
      expect(scrollSpy._sentinelVisible).toBe(false)
      expect(scrollSpy._bottomScrollHandler).toBeNull()
    })
  })

  describe('_tailActiveIndex', () => {
    const makeSpy = (count: number, { armed = true } = {}) => {
      fixtureEl.innerHTML = getMultiSectionFixture()
      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('.content')!)
      scrollSpy._sections = Array.from({ length: count }, () => document.createElement('div'))
      if (armed) {
        scrollSpy._bottomScrollHandler = () => {}
      }

      return scrollSpy
    }

    const atScrollTop = (scrollSpy: ScrollSpy, scrollTop: number) => {
      vi.spyOn(scrollSpy, '_scroller').mockReturnValue({ scrollTop } as HTMLElement)
    }

    it('returns -1 when the bottom watch is not armed', () => {
      const scrollSpy = makeSpy(3, { armed: false })
      scrollSpy._triggers = [0, 100, 9999]
      scrollSpy._maxScroll = 500

      expect(scrollSpy._tailActiveIndex()).toBe(-1)
    })

    it('returns -1 when every section can reach the activation line', () => {
      const scrollSpy = makeSpy(3)
      scrollSpy._triggers = [0, 100, 200]
      scrollSpy._maxScroll = 500
      atScrollTop(scrollSpy, 480)

      expect(scrollSpy._tailActiveIndex()).toBe(-1)
    })

    it('returns -1 before the scroll enters the tail zone', () => {
      const scrollSpy = makeSpy(4)
      scrollSpy._triggers = [0, 400, 900, 1100]
      scrollSpy._maxScroll = 800
      atScrollTop(scrollSpy, 200)

      expect(scrollSpy._tailActiveIndex()).toBe(-1)
    })

    it('spreads the leftover scroll across the unreachable trailing sections', () => {
      const scrollSpy = makeSpy(4)
      // triggers 900 and 1100 sit past the 800px max scroll -> anchor is index 1
      scrollSpy._triggers = [0, 400, 900, 1100]
      scrollSpy._maxScroll = 800

      atScrollTop(scrollSpy, 400)
      expect(scrollSpy._tailActiveIndex()).toBe(1)

      atScrollTop(scrollSpy, 600)
      expect(scrollSpy._tailActiveIndex()).toBe(2)

      atScrollTop(scrollSpy, 800)
      expect(scrollSpy._tailActiveIndex()).toBe(3)
    })
  })

  describe('_process', () => {
    it('should add active class and trigger event', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      const link = fixtureEl.querySelector('#li-jsm-1') as HTMLElement

      const spy = vi.fn()
      div.addEventListener('activate.bs.scrollspy', spy)

      scrollSpy._process(link)

      expect(link.classList.contains('active')).toBe(true)
      expect(scrollSpy._activeTarget).toBe(link)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('_activateParents', () => {
    it('should activate dropdown-toggle for dropdown-item target', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <div class="dropdown">',
        '    <a class="dropdown-toggle" href="#">Dropdown</a>',
        '    <div class="dropdown-menu">',
        '      <a class="dropdown-item" id="drop1" href="#one">One</a>',
        '    </div>',
        '  </div>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="one">one</div>',
        '</div>',
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const dropItem = fixtureEl.querySelector('#drop1') as HTMLElement
      const dropToggle = fixtureEl.querySelector('.dropdown-toggle') as HTMLElement

      scrollSpy._activateParents(dropItem)

      expect(dropToggle.classList.contains('active')).toBe(true)
    })

    it('should activate prev-sibling link for a nav parent', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <a class="nav-link" id="parent-link" href="#one">Parent</a>',
        '  <nav class="nav">',
        '    <a class="nav-link" id="child-link" href="#one-a">Child</a>',
        '  </nav>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="one">one</div>',
        '  <div id="one-a">one a</div>',
        '</div>',
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const childLink = fixtureEl.querySelector('#child-link') as HTMLElement

      scrollSpy._activateParents(childLink)

      expect(fixtureEl.querySelector('#parent-link')!.classList.contains('active')).toBe(true)
    })

    it('should activate prev-sibling link for a list-group parent', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <a class="list-group-item" id="lg-parent" href="#one">Parent</a>',
        '  <div class="list-group">',
        '    <a class="list-group-item" id="lg-child" href="#one-a">Child</a>',
        '  </div>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="one">one</div>',
        '  <div id="one-a">one a</div>',
        '</div>',
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const childLink = fixtureEl.querySelector('#lg-child') as HTMLElement

      scrollSpy._activateParents(childLink)

      expect(fixtureEl.querySelector('#lg-parent')!.classList.contains('active')).toBe(true)
    })
  })

  describe('_clearActiveClass', () => {
    it('should remove active class from parent and children', () => {
      fixtureEl.innerHTML = ['<nav class="navbar active">', '  <a class="nav-link active" href="#one">One</a>', '  <a class="nav-link active" href="#two">Two</a>', '</nav>', '<div class="content" style="overflow-y: auto">', '  <div id="one">one</div>', '</div>'].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const navbar = fixtureEl.querySelector('.navbar') as HTMLElement

      scrollSpy._clearActiveClass(navbar)

      expect(navbar.classList.contains('active')).toBe(false)
      const activeLinks = fixtureEl.querySelectorAll('.nav-link.active')
      expect(activeLinks).toHaveLength(0)
    })
  })

  describe('_initializeTargetsAndObservables', () => {
    it('should collect visible sections in DOM order', () => {
      fixtureEl.innerHTML = getMultiSectionFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      expect(scrollSpy._sections.map((section) => section.id)).toEqual(['section-1', 'section-2', 'section-3'])
      expect(scrollSpy._linkBySection.size).toBe(3)
      expect(scrollSpy._sectionByLink.size).toBe(3)
    })

    it('should skip disabled anchors', () => {
      fixtureEl.innerHTML = [
        '<nav id="navBar" class="navbar">',
        '  <ul class="nav">',
        '    <a class="nav-link" href="#div1" disabled>div 1</a>',
        '    <a class="nav-link disabled" href="#div2">div 2</a>',
        '  </ul>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="div1">div 1</div>',
        '  <div id="div2">div 2</div>',
        '</div>',
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      expect(scrollSpy._sections).toEqual([])
    })

    it('should ignore anchors whose section is outside the observable container', () => {
      fixtureEl.innerHTML = [
        '<nav id="navBar" class="navbar">',
        '  <ul class="nav">',
        '    <a class="nav-link" href="#inside">Inside</a>',
        '    <a class="nav-link" href="#outside">Outside</a>',
        '  </ul>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="inside">inside</div>',
        '</div>',
        '<div id="outside">outside</div>',
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      expect(scrollSpy._sections.map((section) => section.id)).toEqual(['inside'])
    })
  })

  describe('smoothScroll', () => {
    it('should not enable smoothScroll by default', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()

      new ScrollSpy(div)

      const link = fixtureEl.querySelector('[href="#div-jsm-1"]') as HTMLElement
      link.click()

      expect(div.scrollTo).not.toHaveBeenCalled()
    })

    it('should scrollTo observable section on anchor click', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()

      new ScrollSpy(div, { smoothScroll: true })

      const link = fixtureEl.querySelector('[href="#div-jsm-1"]') as HTMLElement
      link.click()

      expect(div.scrollTo).toHaveBeenCalled()
    })

    it('should fall back to scrollTop if scrollTo is not available', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement

      const scrollSpy = new ScrollSpy(div, { smoothScroll: true })

      delete (div as any).scrollTo
      scrollSpy._rootElement = div
      scrollSpy._maybeEnableSmoothScroll()

      const link = fixtureEl.querySelector('[href="#div-jsm-1"]') as HTMLElement
      link.click()

      expect(ScrollSpy.getInstance(div)).not.toBeNull()
    })

    it('should not scroll if section not found in observables', () => {
      fixtureEl.innerHTML = [
        '<nav id="navBar" class="navbar">',
        '  <ul class="nav">',
        '    <a id="anchor-1" href="#div-jsm-1">div 1</a>',
        '    <a id="anchor-2" href="#foo">div 2</a>',
        '  </ul>',
        '</nav>',
        '<div class="content" data-bs-target="#navBar" style="overflow-y: auto">',
        '  <div id="div-jsm-1">div 1</div>',
        '</div>',
      ].join('')

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()

      new ScrollSpy(div, { smoothScroll: true })

      const anchor2 = fixtureEl.querySelector('#anchor-2') as HTMLElement
      anchor2.click()
      expect(div.scrollTo).not.toHaveBeenCalled()
    })

    it('should settle a pending navigation on the scrollend event', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      const replaceState = vi.spyOn(window.history, 'replaceState')

      const scrollSpy = new ScrollSpy(div, { smoothScroll: true })
      scrollSpy._rootElement = div
      scrollSpy._pendingNavigation = { hash: '#div-jsm-1', section }
      scrollSpy._armSettle()

      div.dispatchEvent(createEvent('scrollend'))

      expect(replaceState).toHaveBeenCalledWith(null, '', '#div-jsm-1')
      expect(scrollSpy._pendingNavigation).toBeNull()
    })

    it('should restore the hash and focus the section once the scroll settles', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      const replaceState = vi.spyOn(window.history, 'replaceState')
      const focus = vi.spyOn(section, 'focus')

      const scrollSpy = new ScrollSpy(div, { smoothScroll: true })
      scrollSpy._settleNavigation('#div-jsm-1', section)

      expect(replaceState).toHaveBeenCalledWith(null, '', '#div-jsm-1')
      expect(section.getAttribute('tabindex')).toBe('-1')
      expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    })
  })

  describe('real IntersectionObserver — full-page scroll', () => {
    beforeEach(() => {
      vi.unstubAllGlobals()
      window.scrollTo(0, 0)
    })

    afterEach(() => {
      document.getElementById('rio')?.remove()
      window.scrollTo(0, 0)
    })

    const settle = () => new Promise((resolve) => setTimeout(resolve, 60))
    const activeHref = () => document.querySelector('#rio-nav .nav-link.active')?.getAttribute('href') ?? null

    it('walks sections near the bottom instead of jumping straight to the last one', async () => {
      const wrap = document.createElement('div')
      wrap.id = 'rio'
      wrap.innerHTML = [
        '<nav><ul class="nav" id="rio-nav">',
        [1, 2, 3, 4, 5].map((i) => `<li class="nav-item"><a class="nav-link" href="#rio-s${i}">S${i}</a></li>`).join(''),
        '</ul></nav>',
        '<div id="rio-content">',
        [1, 2, 3, 4].map((i) => `<h3 id="rio-s${i}" style="margin:0">S${i}</h3><div style="height:400px"></div>`).join(''),
        '<h3 id="rio-s5" style="margin:0">S5</h3><div style="height:24px"></div>',
        '</div>',
        '<div style="height:280px">page footer below the spied container</div>',
      ].join('')
      document.body.prepend(wrap)

      const content = document.getElementById('rio-content') as HTMLElement
      const scrollSpy = new ScrollSpy(content, { target: '#rio-nav', topMargin: '12%' })

      const scroller = document.scrollingElement || document.documentElement
      const maxScroll = scroller.scrollHeight - scroller.clientHeight
      expect(maxScroll).toBeGreaterThan(1200)

      await settle()
      expect(activeHref()).toBe('#rio-s1')

      const s3Top = document.getElementById('rio-s3')!.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, s3Top - 8)
      await settle()
      expect(activeHref()).toBe('#rio-s3')

      // Near the bottom the sentinel is on screen and the trailing sections
      // (s4, s5) can't be scrolled up to the line — but a mid-list link must
      // still be active here rather than snapping straight to the last one.
      window.scrollTo(0, maxScroll - 250)
      await settle()
      expect(scrollSpy._sentinelVisible).toBe(true)
      expect(activeHref()).not.toBe('#rio-s5')
      expect(['#rio-s3', '#rio-s4']).toContain(activeHref())

      // All the way down: the short last section wins.
      window.scrollTo(0, maxScroll)
      await settle()
      expect(activeHref()).toBe('#rio-s5')

      scrollSpy.dispose()
    })
  })

  describe('target ids', () => {
    it('should accept anchors whose target id starts with a digit', () => {
      fixtureEl.innerHTML = ['<ul id="navigation" class="navbar">', '   <a class="nav-link" href="#1-intro">Intro</a>', '</ul>', '<div id="content">', '  <div id="1-intro">test</div>', '</div>'].join('')

      expect(() => new ScrollSpy('#content', { target: '#navigation' })).not.toThrow()
    })

    it('should accept anchors whose target id contains special characters', () => {
      fixtureEl.innerHTML = ['<ul id="navigation" class="navbar">', '   <a class="nav-link" href="#a.b:c">Dotted</a>', '</ul>', '<div id="content">', '  <div id="a.b:c">test</div>', '</div>'].join('')

      const scrollSpy = new ScrollSpy('#content', { target: '#navigation' })

      expect(scrollSpy._sections.map((section) => section.id)).toEqual(['a.b:c'])
    })
  })
})
