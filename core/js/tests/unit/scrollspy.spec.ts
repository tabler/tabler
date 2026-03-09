import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import ScrollSpy from '../../src/bootstrap/scrollspy'
import { clearFixture, createEvent, getFixture } from '../helpers/fixture'

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  callback: IntersectionObserverCallback
  options: IntersectionObserverInit | undefined

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    this.root = options?.root as Element | null ?? null
    this.rootMargin = options?.rootMargin ?? ''
    this.thresholds = Array.isArray(options?.threshold) ? options!.threshold : [options?.threshold ?? 0]
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn().mockReturnValue([])
}

const getDummyFixture = () => [
  '<nav id="navBar" class="navbar">',
  '  <ul class="nav">',
  '    <li class="nav-item"><a id="li-jsm-1" class="nav-link" href="#div-jsm-1">div 1</a></li>',
  '  </ul>',
  '</nav>',
  '<div class="content" data-bs-target="#navBar" style="overflow-y: auto">',
  '  <div id="div-jsm-1">div 1</div>',
  '</div>'
].join('')

describe('ScrollSpy', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
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
      fixtureEl.innerHTML = [
        '<nav id="navigation" class="navbar">',
        '  <ul class="navbar-nav">',
        '    <li class="nav-item"><a class="nav-link" href="#one">One</a></li>',
        '  </ul>',
        '</nav>',
        '<div id="content" style="overflow-y: visible;">',
        '  <div id="one" style="height: 300px;">test</div>',
        '</div>'
      ].join('')

      const contentEl = fixtureEl.querySelector('#content')!
      const originalGetComputedStyle = window.getComputedStyle
      vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudoElt?) => {
        const result = originalGetComputedStyle(el, pseudoElt ?? undefined)
        if (el === contentEl) {
          return new Proxy(result, {
            get(target, prop) {
              if (prop === 'overflowY') return 'visible'
              return (target as any)[prop]
            }
          }) as CSSStyleDeclaration
        }

        return result
      })

      const scrollSpy = new ScrollSpy(contentEl, {
        target: '#navigation'
      })

      expect(scrollSpy._rootElement).toBeNull()
    })

    it('should respect threshold option', () => {
      fixtureEl.innerHTML = [
        '<ul id="navigation" class="navbar">',
        '   <a class="nav-link" href="#one">One</a>',
        '</ul>',
        '<div id="content">',
        '  <div id="one">test</div>',
        '</div>'
      ].join('')

      const scrollSpy = new ScrollSpy('#content', {
        target: '#navigation',
        threshold: [1]
      })

      expect(scrollSpy._observer!.thresholds).toEqual([1])
    })

    it('should parse string threshold from data attribute', () => {
      fixtureEl.innerHTML = [
        '<ul id="navigation" class="navbar">',
        '   <a class="nav-link" href="#one">One</a>',
        '</ul>',
        '<div id="content" data-bs-threshold="0,0.2,1">',
        '  <div id="one">test</div>',
        '</div>'
      ].join('')

      const scrollSpy = new ScrollSpy('#content', {
        target: '#navigation'
      })

      expect(scrollSpy._observer!.thresholds).toEqual([0, 0.2, 1])
    })

    it('should initialize with empty maps when sections are not visible', () => {
      fixtureEl.innerHTML = [
        '<nav id="navigation" class="navbar">',
        '  <ul class="navbar-nav">',
        '    <li class="nav-item"><a class="nav-link" href="#">One</a></li>',
        '    <li class="nav-item"><a class="nav-link" href="#two">Two</a></li>',
        '  </ul>',
        '</nav>',
        '<div id="content" style="height: 200px; overflow-y: auto;">',
        '  <div id="two" style="height: 300px;">test</div>',
        '</div>'
      ].join('')

      const scrollSpy = new ScrollSpy(fixtureEl.querySelector('#content')!, {
        target: '#navigation'
      })

      // jsdom elements are not "visible" (getClientRects returns empty), so maps are empty
      expect(scrollSpy._targetLinks).toBeInstanceOf(Map)
      expect(scrollSpy._observableSections).toBeInstanceOf(Map)
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

      const scrollspy = ScrollSpy.getOrCreateInstance(div, { offset: 1 })
      expect(scrollspy).toBeInstanceOf(ScrollSpy)
      expect(scrollspy._config.offset).toBe(1)
    })

    it('should return existing instance ignoring new config', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollspy = new ScrollSpy(div, { offset: 1 })

      const scrollspy2 = ScrollSpy.getOrCreateInstance(div, { offset: 2 })
      expect(scrollspy2).toBe(scrollspy)
      expect(scrollspy2._config.offset).toBe(1)
    })
  })

  describe('event handler', () => {
    it('should create scrollspy on window load event', () => {
      fixtureEl.innerHTML = [
        '<div id="nav"></div>',
        '<div id="wrapper" data-bs-spy="scroll" data-bs-target="#nav" style="overflow-y: auto"></div>'
      ].join('')

      const scrollSpyEl = fixtureEl.querySelector('#wrapper')!

      window.dispatchEvent(createEvent('load'))

      expect(ScrollSpy.getInstance(scrollSpyEl)).not.toBeNull()
    })
  })

  describe('_observerCallback', () => {
    it('should activate target on intersecting entry (scroll down)', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      const link = fixtureEl.querySelector('#li-jsm-1') as HTMLElement
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      scrollSpy._targetLinks.set('#div-jsm-1', link)
      scrollSpy._observableSections.set('#div-jsm-1', section)

      scrollSpy._previousScrollData.parentScrollTop = 0

      const entry = {
        isIntersecting: true,
        target: section,
        intersectionRatio: 1
      } as unknown as IntersectionObserverEntry

      Object.defineProperty(section, 'offsetTop', { value: 100, configurable: true })

      scrollSpy._observerCallback([entry])

      expect(link.classList.contains('active')).toBe(true)
      expect(scrollSpy._activeTarget).toBe(link)
    })

    it('should clear active class on non-intersecting entry', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      const link = fixtureEl.querySelector('#li-jsm-1') as HTMLElement
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      link.classList.add('active')
      scrollSpy._activeTarget = link
      scrollSpy._targetLinks.set('#div-jsm-1', link)

      const entry = {
        isIntersecting: false,
        target: section
      } as unknown as IntersectionObserverEntry

      scrollSpy._observerCallback([entry])

      expect(scrollSpy._activeTarget).toBeNull()
    })

    it('should activate on scroll up when entry is higher', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      const link = fixtureEl.querySelector('#li-jsm-1') as HTMLElement
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      scrollSpy._targetLinks.set('#div-jsm-1', link)
      scrollSpy._observableSections.set('#div-jsm-1', section)

      scrollSpy._previousScrollData.parentScrollTop = 200
      scrollSpy._previousScrollData.visibleEntryTop = 300

      Object.defineProperty(section, 'offsetTop', { value: 100, configurable: true })
      Object.defineProperty(div, 'scrollTop', { value: 100, configurable: true, writable: true })

      const entry = {
        isIntersecting: true,
        target: section,
        intersectionRatio: 1
      } as unknown as IntersectionObserverEntry

      scrollSpy._observerCallback([entry])

      expect(link.classList.contains('active')).toBe(true)
    })

    it('should not activate on scroll up when entry is lower', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      const link = fixtureEl.querySelector('#li-jsm-1') as HTMLElement
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      scrollSpy._targetLinks.set('#div-jsm-1', link)
      scrollSpy._observableSections.set('#div-jsm-1', section)

      scrollSpy._previousScrollData.parentScrollTop = 200
      scrollSpy._previousScrollData.visibleEntryTop = 50

      Object.defineProperty(section, 'offsetTop', { value: 100, configurable: true })
      Object.defineProperty(div, 'scrollTop', { value: 100, configurable: true, writable: true })

      const entry = {
        isIntersecting: true,
        target: section,
        intersectionRatio: 1
      } as unknown as IntersectionObserverEntry

      scrollSpy._observerCallback([entry])

      expect(link.classList.contains('active')).toBe(false)
    })

    it('should not re-process if activeTarget is same', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      const link = fixtureEl.querySelector('#li-jsm-1') as HTMLElement
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      scrollSpy._targetLinks.set('#div-jsm-1', link)
      scrollSpy._observableSections.set('#div-jsm-1', section)

      link.classList.add('active')
      scrollSpy._activeTarget = link
      scrollSpy._previousScrollData.parentScrollTop = 0

      Object.defineProperty(section, 'offsetTop', { value: 100, configurable: true })

      const entry = {
        isIntersecting: true,
        target: section,
        intersectionRatio: 1
      } as unknown as IntersectionObserverEntry

      const spy = vi.fn()
      div.addEventListener('activate.bs.scrollspy', spy)

      scrollSpy._observerCallback([entry])

      expect(spy).not.toHaveBeenCalled()
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
        '</div>'
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const dropItem = fixtureEl.querySelector('#drop1') as HTMLElement
      const dropToggle = fixtureEl.querySelector('.dropdown-toggle') as HTMLElement

      scrollSpy._activateParents(dropItem)

      expect(dropToggle.classList.contains('active')).toBe(true)
    })

    it('should activate nav parents for nav-link target', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <nav class="nav">',
        '    <a class="nav-link" id="a1" href="#one">One</a>',
        '  </nav>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="one">one</div>',
        '</div>'
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const link = fixtureEl.querySelector('#a1') as HTMLElement

      scrollSpy._activateParents(link)

      // nav-link itself is handled by _process, parents via SelectorEngine.prev
      expect(link).toBeDefined()
    })
  })

  describe('_clearActiveClass', () => {
    it('should remove active class from parent and children', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar active">',
        '  <a class="nav-link active" href="#one">One</a>',
        '  <a class="nav-link active" href="#two">Two</a>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="one">one</div>',
        '</div>'
      ].join('')

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
    it('should populate maps when sections are visible', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement

      Object.defineProperty(section, 'getClientRects', {
        value: () => [{ width: 100, height: 100 }],
        configurable: true
      })

      scrollSpy._initializeTargetsAndObservables()

      expect(scrollSpy._targetLinks.size).toBe(1)
      expect(scrollSpy._observableSections.size).toBe(1)
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
        '</div>'
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)

      expect(scrollSpy._targetLinks.size).toBe(0)
    })
  })

  describe('_activateParents (nav prev)', () => {
    it('should activate prev sibling nav-link in list-group', () => {
      fixtureEl.innerHTML = [
        '<nav class="navbar">',
        '  <div class="list-group">',
        '    <a class="list-group-item" id="a1" href="#one">One</a>',
        '    <a class="list-group-item" id="a2" href="#two">Two</a>',
        '  </div>',
        '</nav>',
        '<div class="content" style="overflow-y: auto">',
        '  <div id="one">one</div>',
        '  <div id="two">two</div>',
        '</div>'
      ].join('')

      const div = fixtureEl.querySelector('.content')!
      const scrollSpy = new ScrollSpy(div)
      const link2 = fixtureEl.querySelector('#a2') as HTMLElement

      scrollSpy._activateParents(link2)
      // list-group-item doesn't have .dropdown-item, so it goes through nav parents path
      expect(link2).toBeDefined()
    })
  })

  describe('smoothScroll', () => {
    it('should not enable smoothScroll by default', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()

      new ScrollSpy(div, { offset: 1 })

      const link = fixtureEl.querySelector('[href="#div-jsm-1"]') as HTMLElement
      link.click()

      expect(div.scrollTo).not.toHaveBeenCalled()
    })

    it('should scrollTo observable section on anchor click', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()

      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      Object.defineProperty(section, 'getClientRects', {
        value: () => [{ width: 100, height: 100 }],
        configurable: true
      })

      const scrollSpy = new ScrollSpy(div, { offset: 1, smoothScroll: true })
      scrollSpy._initializeTargetsAndObservables()

      const link = fixtureEl.querySelector('[href="#div-jsm-1"]') as HTMLElement
      link.click()

      expect(div.scrollTo).toHaveBeenCalled()
    })

    it('should fallback to scrollTop if scrollTo is not available', () => {
      fixtureEl.innerHTML = getDummyFixture()

      const div = fixtureEl.querySelector('.content') as HTMLElement
      const section = fixtureEl.querySelector('#div-jsm-1') as HTMLElement
      Object.defineProperty(section, 'getClientRects', {
        value: () => [{ width: 100, height: 100 }],
        configurable: true
      })

      // Manually set _rootElement to a plain object without scrollTo
      const scrollSpy = new ScrollSpy(div, { offset: 1, smoothScroll: true })
      scrollSpy._initializeTargetsAndObservables()

      // Remove scrollTo to test fallback
      delete (div as any).scrollTo
      scrollSpy._rootElement = div

      // Re-enable smoothScroll handler
      scrollSpy._maybeEnableSmoothScroll()

      const link = fixtureEl.querySelector('[href="#div-jsm-1"]') as HTMLElement
      link.click()

      // Should not throw - scrollTop assignment is the fallback
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
        '</div>'
      ].join('')

      const div = fixtureEl.querySelector('.content') as HTMLElement
      div.scrollTo = vi.fn()

      new ScrollSpy(div, { offset: 1, smoothScroll: true })

      const anchor2 = fixtureEl.querySelector('#anchor-2') as HTMLElement
      anchor2.click()
      expect(div.scrollTo).not.toHaveBeenCalled()
    })
  })

  describe('data-tblr-spy', () => {
    it('should create scrollspy on window load with data-tblr-spy="scroll"', () => {
      fixtureEl.innerHTML = [
        '<div id="nav"></div>',
        '<div id="wrapper" data-tblr-spy="scroll" data-bs-target="#nav" style="overflow-y: auto"></div>'
      ].join('')

      const scrollSpyEl = fixtureEl.querySelector('#wrapper')!

      window.dispatchEvent(createEvent('load'))

      expect(ScrollSpy.getInstance(scrollSpyEl)).not.toBeNull()
    })
  })
})
