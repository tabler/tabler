import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Tab from '../../src/bootstrap/tab'
import { clearFixture, createEvent, getFixture } from '../helpers/fixture'

describe('Tab', () => {
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
      expect(typeof Tab.VERSION).toBe('string')
    })
  })

  describe('constructor', () => {
    it('should accept element as CSS selector or DOM element', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav">',
        '  <li><a href="#home" role="tab">Home</a></li>',
        '</ul>',
        '<ul>',
        '  <li id="home"></li>',
        '</ul>'
      ].join('')

      const tabEl = fixtureEl.querySelector('[href="#home"]')!
      const tabBySelector = new Tab('[href="#home"]')
      const tabByElement = new Tab(tabEl)

      expect(tabBySelector._element).toBe(tabEl)
      expect(tabByElement._element).toBe(tabEl)
    })

    it('should not throw if no parent', () => {
      fixtureEl.innerHTML = '<div class=""><div class="nav-link"></div></div>'
      const navEl = fixtureEl.querySelector('.nav-link')!

      expect(() => {
        new Tab(navEl)
      }).not.toThrow()
    })
  })

  describe('show', () => {
    it('should activate element by tab id using buttons', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav" role="tablist">',
          '  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>',
          '  <li><button type="button" id="triggerProfile" data-bs-target="#profile" role="tab">Profile</button></li>',
          '</ul>',
          '<ul>',
          '  <li id="home" role="tabpanel"></li>',
          '  <li id="profile" role="tabpanel"></li>',
          '</ul>'
        ].join('')

        const profileTriggerEl = fixtureEl.querySelector('#triggerProfile')!
        const tab = new Tab(profileTriggerEl)

        profileTriggerEl.addEventListener('shown.bs.tab', () => {
          expect(fixtureEl.querySelector('#profile')!.classList.contains('active')).toBe(true)
          expect(profileTriggerEl.getAttribute('aria-selected')).toBe('true')
          resolve()
        })

        tab.show()
      })
    })

    it('should activate element by tab id using links', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav" role="tablist">',
          '  <li><a href="#home" role="tab">Home</a></li>',
          '  <li><a id="triggerProfile" href="#profile" role="tab">Profile</a></li>',
          '</ul>',
          '<ul>',
          '  <li id="home" role="tabpanel"></li>',
          '  <li id="profile" role="tabpanel"></li>',
          '</ul>'
        ].join('')

        const profileTriggerEl = fixtureEl.querySelector('#triggerProfile')!
        const tab = new Tab(profileTriggerEl)

        profileTriggerEl.addEventListener('shown.bs.tab', () => {
          expect(fixtureEl.querySelector('#profile')!.classList.contains('active')).toBe(true)
          expect(profileTriggerEl.getAttribute('aria-selected')).toBe('true')
          resolve()
        })

        tab.show()
      })
    })

    it('should activate element in list group', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="list-group" role="tablist">',
          '  <button type="button" data-bs-target="#home" role="tab">Home</button>',
          '  <button type="button" id="triggerProfile" data-bs-target="#profile" role="tab">Profile</button>',
          '</div>',
          '<div>',
          '  <div id="home" role="tabpanel"></div>',
          '  <div id="profile" role="tabpanel"></div>',
          '</div>'
        ].join('')

        const profileTriggerEl = fixtureEl.querySelector('#triggerProfile')!
        const tab = new Tab(profileTriggerEl)

        profileTriggerEl.addEventListener('shown.bs.tab', () => {
          expect(fixtureEl.querySelector('#profile')!.classList.contains('active')).toBe(true)
          resolve()
        })

        tab.show()
      })
    })

    it('should not fire shown when show is prevented', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = '<div class="nav"><div class="nav-link"></div></div>'

        const navEl = fixtureEl.querySelector('.nav > div')!
        const tab = new Tab(navEl)

        navEl.addEventListener('show.bs.tab', ev => {
          ev.preventDefault()
          setTimeout(resolve, 30)
        })

        navEl.addEventListener('shown.bs.tab', () => {
          reject(new Error('should not trigger shown'))
        })

        tab.show()
      })
    })

    it('should not fire shown when already active', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel"></div>',
          '  <div class="tab-pane" id="profile" role="tabpanel"></div>',
          '</div>'
        ].join('')

        const triggerActive = fixtureEl.querySelector('button.active')!
        const tab = new Tab(triggerActive)

        triggerActive.addEventListener('shown.bs.tab', () => {
          reject(new Error('should not trigger shown'))
        })

        tab.show()
        setTimeout(resolve, 30)
      })
    })

    it('show and shown events should reference correct relatedTarget', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>',
          '  <li class="nav-item" role="presentation"><button type="button" id="triggerProfile" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel"></div>',
          '  <div class="tab-pane" id="profile" role="tabpanel"></div>',
          '</div>'
        ].join('')

        const secondTabTrigger = fixtureEl.querySelector('#triggerProfile')!
        const secondTab = new Tab(secondTabTrigger)

        secondTabTrigger.addEventListener('show.bs.tab', ((ev: CustomEvent) => {
          expect(ev.relatedTarget!.getAttribute('data-bs-target')).toBe('#home')
        }) as EventListener)

        secondTabTrigger.addEventListener('shown.bs.tab', ((ev: CustomEvent) => {
          expect(ev.relatedTarget!.getAttribute('data-bs-target')).toBe('#home')
          expect(secondTabTrigger.getAttribute('aria-selected')).toBe('true')
          resolve()
        }) as EventListener)

        secondTab.show()
      })
    })

    it('should fire hide and hidden events', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav" role="tablist">',
          '  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>',
          '  <li><button type="button" data-bs-target="#profile" role="tab">Profile</button></li>',
          '</ul>'
        ].join('')

        const triggerList = fixtureEl.querySelectorAll('button')
        const firstTab = new Tab(triggerList[0])
        const secondTab = new Tab(triggerList[1])

        let hideCalled = false
        triggerList[0].addEventListener('shown.bs.tab', () => {
          secondTab.show()
        })

        triggerList[0].addEventListener('hide.bs.tab', ((ev: CustomEvent) => {
          hideCalled = true
          expect(ev.relatedTarget!.getAttribute('data-bs-target')).toBe('#profile')
        }) as EventListener)

        triggerList[0].addEventListener('hidden.bs.tab', ((ev: CustomEvent) => {
          expect(hideCalled).toBe(true)
          expect(ev.relatedTarget!.getAttribute('data-bs-target')).toBe('#profile')
          resolve()
        }) as EventListener)

        firstTab.show()
      })
    })

    it('should not fire hidden when hide is prevented', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<ul class="nav" role="tablist">',
          '  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>',
          '  <li><button type="button" data-bs-target="#profile" role="tab">Profile</button></li>',
          '</ul>'
        ].join('')

        const triggerList = fixtureEl.querySelectorAll('button')
        const firstTab = new Tab(triggerList[0])
        const secondTab = new Tab(triggerList[1])

        triggerList[0].addEventListener('shown.bs.tab', () => {
          secondTab.show()
        })

        triggerList[0].addEventListener('hide.bs.tab', ev => {
          ev.preventDefault()
          setTimeout(resolve, 30)
        })

        triggerList[0].addEventListener('hidden.bs.tab', () => {
          reject(new Error('should not trigger hidden'))
        })

        firstTab.show()
      })
    })
  })

  describe('dispose', () => {
    it('should dispose a tab', () => {
      fixtureEl.innerHTML = '<div class="nav"><div class="nav-link"></div></div>'

      const el = fixtureEl.querySelector('.nav > div')!
      const tab = new Tab(el)

      expect(Tab.getInstance(el)).not.toBeNull()

      tab.dispose()

      expect(Tab.getInstance(el)).toBeNull()
    })
  })

  describe('_activate', () => {
    it('should not be called if element is null', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav" role="tablist">',
        '  <li class="nav-link"></li>',
        '</ul>'
      ].join('')

      const tabEl = fixtureEl.querySelector('.nav-link')!
      const tab = new Tab(tabEl)
      const spy = vi.spyOn(tab, '_queueCallback')

      tab._activate(null)
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('_setInitialAttributes', () => {
    it('should set aria attributes', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav">',
        '  <li class="nav-link" id="foo" data-bs-target="#panel"></li>',
        '  <li class="nav-link" data-bs-target="#panel2"></li>',
        '</ul>',
        '<div id="panel"></div>',
        '<div id="panel2"></div>'
      ].join('')

      const tabEl = fixtureEl.querySelector('.nav-link')!
      const parent = fixtureEl.querySelector('.nav') as HTMLElement
      const children = Array.from(fixtureEl.querySelectorAll('.nav-link')) as HTMLElement[]
      const tabPanel = fixtureEl.querySelector('#panel')!
      const tabPanel2 = fixtureEl.querySelector('#panel2')!

      expect(parent.getAttribute('role')).toBeNull()

      const tab = new Tab(tabEl)
      tab._setInitialAttributes(parent, children)

      expect(parent.getAttribute('role')).toBe('tablist')
      expect(tabEl.getAttribute('role')).toBe('tab')
      expect(tabPanel.getAttribute('role')).toBe('tabpanel')
      expect(tabPanel2.getAttribute('role')).toBe('tabpanel')
      expect(tabPanel.getAttribute('aria-labelledby')).toBe('foo')
      expect(tabPanel2.hasAttribute('aria-labelledby')).toBe(false)
    })
  })

  describe('_keydown', () => {
    it('should ignore non-arrow keys', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav">',
        '  <li class="nav-link" data-bs-toggle="tab"></li>',
        '</ul>'
      ].join('')

      const tabEl = fixtureEl.querySelector('.nav-link')!
      const tab = new Tab(tabEl)

      const spyStop = vi.spyOn(Event.prototype, 'stopPropagation')
      const spyPrevent = vi.spyOn(Event.prototype, 'preventDefault')

      const keydown = createEvent('keydown') as any
      keydown.key = 'Enter'
      tabEl.dispatchEvent(keydown)

      expect(spyStop).not.toHaveBeenCalled()
      expect(spyPrevent).not.toHaveBeenCalled()
    })

    it('should handle right/down arrow', () => {
      fixtureEl.innerHTML = [
        '<div class="nav">',
        '  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab2" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab3" class="nav-link" data-bs-toggle="tab"></span>',
        '</div>'
      ].join('')

      const tabEl1 = fixtureEl.querySelector('#tab1')!
      const tabEl2 = fixtureEl.querySelector('#tab2')!
      const tabEl3 = fixtureEl.querySelector('#tab3')!
      new Tab(tabEl1)
      new Tab(tabEl2)
      new Tab(tabEl3)

      const spyFocus2 = vi.spyOn(tabEl2, 'focus')
      const spyFocus3 = vi.spyOn(tabEl3, 'focus')

      const keydown = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      tabEl1.dispatchEvent(keydown)

      expect(spyFocus2).toHaveBeenCalled()
    })

    it('should handle left/up arrow', () => {
      fixtureEl.innerHTML = [
        '<div class="nav">',
        '  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab2" class="nav-link" data-bs-toggle="tab"></span>',
        '</div>'
      ].join('')

      const tabEl1 = fixtureEl.querySelector('#tab1')!
      const tabEl2 = fixtureEl.querySelector('#tab2')!
      new Tab(tabEl1)
      new Tab(tabEl2)

      const spyFocus1 = vi.spyOn(tabEl1, 'focus')

      const keydown = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      tabEl2.dispatchEvent(keydown)

      expect(spyFocus1).toHaveBeenCalled()
    })

    it('should handle Home key', () => {
      fixtureEl.innerHTML = [
        '<div class="nav">',
        '  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab2" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab3" class="nav-link" data-bs-toggle="tab"></span>',
        '</div>'
      ].join('')

      const tabEl1 = fixtureEl.querySelector('#tab1')!
      const tabEl3 = fixtureEl.querySelector('#tab3')!
      new Tab(tabEl1)
      new Tab(tabEl3)

      const spyFocus1 = vi.spyOn(tabEl1, 'focus')

      const keydown = new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      tabEl3.dispatchEvent(keydown)

      expect(spyFocus1).toHaveBeenCalled()
    })

    it('should handle End key', () => {
      fixtureEl.innerHTML = [
        '<div class="nav">',
        '  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab2" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab3" class="nav-link" data-bs-toggle="tab"></span>',
        '</div>'
      ].join('')

      const tabEl1 = fixtureEl.querySelector('#tab1')!
      const tabEl3 = fixtureEl.querySelector('#tab3')!
      new Tab(tabEl1)
      new Tab(tabEl3)

      const spyFocus3 = vi.spyOn(tabEl3, 'focus')

      const keydown = new KeyboardEvent('keydown', { key: 'End', bubbles: true })
      tabEl1.dispatchEvent(keydown)

      expect(spyFocus3).toHaveBeenCalled()
    })

    it('should skip disabled elements', () => {
      fixtureEl.innerHTML = [
        '<div class="nav">',
        '  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>',
        '  <span id="tab2" class="nav-link" data-bs-toggle="tab" disabled></span>',
        '  <span id="tab3" class="nav-link disabled" data-bs-toggle="tab"></span>',
        '  <span id="tab4" class="nav-link" data-bs-toggle="tab"></span>',
        '</div>'
      ].join('')

      const tabEl1 = fixtureEl.querySelector('#tab1')!
      const tabEl4 = fixtureEl.querySelector('#tab4')!
      new Tab(tabEl1)
      new Tab(tabEl4)

      const spyFocus4 = vi.spyOn(tabEl4, 'focus')

      const keydown = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      tabEl1.dispatchEvent(keydown)

      expect(spyFocus4).toHaveBeenCalled()
    })
  })

  describe('getInstance', () => {
    it('should return null if no instance', () => {
      expect(Tab.getInstance(fixtureEl)).toBeNull()
    })

    it('should return this instance', () => {
      fixtureEl.innerHTML = '<div class="nav"><div class="nav-link"></div></div>'

      const divEl = fixtureEl.querySelector('.nav > div')!
      const tab = new Tab(divEl)

      expect(Tab.getInstance(divEl)).toBe(tab)
      expect(Tab.getInstance(divEl)).toBeInstanceOf(Tab)
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return tab instance', () => {
      fixtureEl.innerHTML = '<div class="nav"><div class="nav-link"></div></div>'

      const div = fixtureEl.querySelector('div')!
      const tab = new Tab(div)

      expect(Tab.getOrCreateInstance(div)).toBe(tab)
      expect(Tab.getOrCreateInstance(div)).toBeInstanceOf(Tab)
    })

    it('should return new instance when there is no tab instance', () => {
      fixtureEl.innerHTML = '<div class="nav"><div class="nav-link"></div></div>'

      const div = fixtureEl.querySelector('div')!

      expect(Tab.getInstance(div)).toBeNull()
      expect(Tab.getOrCreateInstance(div)).toBeInstanceOf(Tab)
    })
  })

  describe('data-api', () => {
    it('should create dynamically a tab', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>',
          '  <li class="nav-item" role="presentation"><button type="button" id="triggerProfile" data-bs-toggle="tab" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel"></div>',
          '  <div class="tab-pane" id="profile" role="tabpanel"></div>',
          '</div>'
        ].join('')

        const secondTabTrigger = fixtureEl.querySelector('#triggerProfile')!

        secondTabTrigger.addEventListener('shown.bs.tab', () => {
          expect(secondTabTrigger.classList.contains('active')).toBe(true)
          expect(fixtureEl.querySelector('#profile')!.classList.contains('active')).toBe(true)
          resolve()
        })

        ;(secondTabTrigger as HTMLElement).click()
      })
    })

    it('should prevent default when trigger is <a>', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav" role="tablist">',
          '  <li><a type="button" href="#test" class="active" role="tab" data-bs-toggle="tab">Home</a></li>',
          '  <li><a type="button" href="#test2" role="tab" data-bs-toggle="tab">Profile</a></li>',
          '</ul>'
        ].join('')

        const tabEl = fixtureEl.querySelector('[href="#test2"]') as HTMLElement
        const spy = vi.spyOn(Event.prototype, 'preventDefault')

        tabEl.addEventListener('shown.bs.tab', () => {
          expect(tabEl.classList.contains('active')).toBe(true)
          expect(spy).toHaveBeenCalled()
          resolve()
        })

        tabEl.click()
      })
    })

    it('should not fire shown for disabled button', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab">Home</button></li>',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#profile" class="nav-link" disabled role="tab" data-bs-toggle="tab">Profile</button></li>',
          '</ul>'
        ].join('')

        const triggerDisabled = fixtureEl.querySelector('button[disabled]')!
        triggerDisabled.addEventListener('shown.bs.tab', () => {
          reject(new Error('should not fire shown'))
        })

        ;(triggerDisabled as HTMLElement).click()
        setTimeout(resolve, 30)
      })
    })

    it('should not fire shown for disabled link', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation"><a href="#home" class="nav-link active" role="tab" data-bs-toggle="tab">Home</a></li>',
          '  <li class="nav-item" role="presentation"><a href="#profile" class="nav-link disabled" role="tab" data-bs-toggle="tab">Profile</a></li>',
          '</ul>'
        ].join('')

        const triggerDisabled = fixtureEl.querySelector('a.disabled')!
        triggerDisabled.addEventListener('shown.bs.tab', () => {
          reject(new Error('should not fire shown'))
        })

        ;(triggerDisabled as HTMLElement).click()
        setTimeout(resolve, 30)
      })
    })

    it('should handle nested tabs', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<nav class="nav nav-tabs" role="tablist">',
          '  <button type="button" id="tab1" data-bs-target="#x-tab1" class="nav-link" data-bs-toggle="tab" role="tab">Tab 1</button>',
          '  <button type="button" data-bs-target="#x-tab2" class="nav-link active" data-bs-toggle="tab" role="tab" aria-selected="true">Tab 2</button>',
          '</nav>',
          '<div class="tab-content">',
          '  <div class="tab-pane" id="x-tab1" role="tabpanel">',
          '    <nav class="nav nav-tabs" role="tablist">',
          '      <button type="button" data-bs-target="#nested-tab1" class="nav-link active" data-bs-toggle="tab" role="tab" aria-selected="true">Nested 1</button>',
          '      <button type="button" id="tabNested2" data-bs-target="#nested-tab2" class="nav-link" data-bs-toggle="tab" role="tab">Nested 2</button>',
          '    </nav>',
          '    <div class="tab-content">',
          '      <div class="tab-pane active" id="nested-tab1" role="tabpanel">Nested 1</div>',
          '      <div class="tab-pane" id="nested-tab2" role="tabpanel">Nested 2</div>',
          '    </div>',
          '  </div>',
          '  <div class="tab-pane active" id="x-tab2" role="tabpanel">Tab2</div>',
          '</div>'
        ].join('')

        const tab1El = fixtureEl.querySelector('#tab1') as HTMLElement
        const tabNested2El = fixtureEl.querySelector('#tabNested2') as HTMLElement
        const xTab1El = fixtureEl.querySelector('#x-tab1')!

        tabNested2El.addEventListener('shown.bs.tab', () => {
          expect(xTab1El.classList.contains('active')).toBe(true)
          resolve()
        })

        tab1El.addEventListener('shown.bs.tab', () => {
          expect(xTab1El.classList.contains('active')).toBe(true)
          tabNested2El.click()
        })

        tab1El.click()
      })
    })

    it('selected tab should deactivate previous selected link in dropdown', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav nav-tabs">',
        '  <li class="nav-item"><a class="nav-link" href="#home" data-bs-toggle="tab">Home</a></li>',
        '  <li class="nav-item"><a class="nav-link" href="#profile" data-bs-toggle="tab">Profile</a></li>',
        '  <li class="nav-item dropdown">',
        '    <a class="nav-link dropdown-toggle active" data-bs-toggle="dropdown" href="#">Dropdown</a>',
        '    <div class="dropdown-menu">',
        '      <a class="dropdown-item active" href="#dropdown1" id="dropdown1-tab" data-bs-toggle="tab">@fat</a>',
        '      <a class="dropdown-item" href="#dropdown2" id="dropdown2-tab" data-bs-toggle="tab">@mdo</a>',
        '    </div>',
        '  </li>',
        '</ul>'
      ].join('')

      const firstLiLinkEl = fixtureEl.querySelector('li:first-child a') as HTMLElement

      firstLiLinkEl.click()
      expect(firstLiLinkEl.classList.contains('active')).toBe(true)
      expect(fixtureEl.querySelector('li:last-child a')!.classList.contains('active')).toBe(false)
      expect(fixtureEl.querySelector('li:last-child .dropdown-menu a:first-child')!.classList.contains('active')).toBe(false)
    })

    it('selecting dropdown tab does not activate another nav', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav nav-tabs" id="nav1">',
        '  <li class="nav-item active"><a class="nav-link" href="#home" data-bs-toggle="tab">Home</a></li>',
        '  <li class="nav-item dropdown">',
        '    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>',
        '    <div class="dropdown-menu">',
        '      <a class="dropdown-item" href="#dropdown1" id="dropdown1-tab" data-bs-toggle="tab">@fat</a>',
        '    </div>',
        '  </li>',
        '</ul>',
        '<ul class="nav nav-tabs" id="nav2">',
        '  <li class="nav-item active"><a class="nav-link" href="#home2" data-bs-toggle="tab">Home</a></li>',
        '  <li class="nav-item dropdown">',
        '    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>',
        '    <div class="dropdown-menu">',
        '      <a class="dropdown-item" href="#dropdown2" id="dropdown2-tab" data-bs-toggle="tab">@fat</a>',
        '    </div>',
        '  </li>',
        '</ul>'
      ].join('')

      const firstDropItem = fixtureEl.querySelector('#nav1 .dropdown-item') as HTMLElement

      firstDropItem.click()
      expect(firstDropItem.classList.contains('active')).toBe(true)
      expect(fixtureEl.querySelector('#nav1 .dropdown-toggle')!.classList.contains('active')).toBe(true)
      expect(fixtureEl.querySelector('#nav2 .dropdown-toggle')!.classList.contains('active')).toBe(false)
      expect(fixtureEl.querySelector('#nav2 .dropdown-item')!.classList.contains('active')).toBe(false)
    })

    it('should support li > .dropdown-item', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav nav-tabs">',
        '  <li class="nav-item"><a class="nav-link active" href="#home" data-bs-toggle="tab">Home</a></li>',
        '  <li class="nav-item dropdown">',
        '    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>',
        '    <ul class="dropdown-menu">',
        '      <li><a class="dropdown-item" href="#dropdown1" data-bs-toggle="tab">@fat</a></li>',
        '      <li><a class="dropdown-item" href="#dropdown2" data-bs-toggle="tab">@mdo</a></li>',
        '    </ul>',
        '  </li>',
        '</ul>'
      ].join('')

      const dropItems = fixtureEl.querySelectorAll('.dropdown-item')

      ;(dropItems[1] as HTMLElement).click()
      expect(dropItems[0].classList.contains('active')).toBe(false)
      expect(dropItems[1].classList.contains('active')).toBe(true)
      expect(fixtureEl.querySelector('.nav-link')!.classList.contains('active')).toBe(false)
    })

    it('should add show class to pane without fade', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation">',
          '    <button type="button" class="nav-link" data-bs-target="#home" role="tab" data-bs-toggle="tab">Home</button>',
          '  </li>',
          '  <li class="nav-item" role="presentation">',
          '    <button type="button" id="secondNav" class="nav-link" data-bs-target="#profile" role="tab" data-bs-toggle="tab">Profile</button>',
          '  </li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div role="tabpanel" class="tab-pane" id="home">test 1</div>',
          '  <div role="tabpanel" class="tab-pane" id="profile">test 2</div>',
          '</div>'
        ].join('')

        const secondNavEl = fixtureEl.querySelector('#secondNav') as HTMLElement

        secondNavEl.addEventListener('shown.bs.tab', () => {
          expect(fixtureEl.querySelectorAll('.tab-content .show')).toHaveLength(1)
          resolve()
        })

        secondNavEl.click()
      })
    })
  })

  describe('data-tblr-toggle', () => {
    it('should create tab via data-tblr-toggle="tab"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-tabs" role="tablist">',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>',
          '  <li class="nav-item" role="presentation"><button type="button" id="triggerProfile" data-tblr-toggle="tab" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel"></div>',
          '  <div class="tab-pane" id="profile" role="tabpanel"></div>',
          '</div>'
        ].join('')

        const trigger = fixtureEl.querySelector('#triggerProfile') as HTMLElement

        trigger.addEventListener('shown.bs.tab', () => {
          expect(trigger.classList.contains('active')).toBe(true)
          expect(fixtureEl.querySelector('#profile')!.classList.contains('active')).toBe(true)
          resolve()
        })

        trigger.click()
      })
    })

    it('should create tab via data-tblr-toggle="pill"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav nav-pills" role="tablist">',
          '  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>',
          '  <li class="nav-item" role="presentation"><button type="button" id="triggerProfile" data-tblr-toggle="pill" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel"></div>',
          '  <div class="tab-pane" id="profile" role="tabpanel"></div>',
          '</div>'
        ].join('')

        const trigger = fixtureEl.querySelector('#triggerProfile') as HTMLElement

        trigger.addEventListener('shown.bs.tab', () => {
          expect(trigger.classList.contains('active')).toBe(true)
          resolve()
        })

        trigger.click()
      })
    })

    it('should initialize active tabs with data-tblr-toggle on load', () => {
      fixtureEl.innerHTML = [
        '<ul class="nav" role="tablist">',
        '  <li><button class="nav-link active" data-tblr-toggle="tab" data-bs-target="#home" role="tab">Home</button></li>',
        '</ul>',
        '<div id="home" role="tabpanel"></div>'
      ].join('')

      const trigger = fixtureEl.querySelector('button') as HTMLElement

      window.dispatchEvent(new Event('load'))

      expect(trigger.classList.contains('active')).toBe(true)
    })

    it('should create tab via data-tblr-toggle="list"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="list-group" role="tablist">',
          '  <a class="list-group-item list-group-item-action active" data-tblr-toggle="list" href="#home" role="tab">Home</a>',
          '  <a id="triggerProfile" class="list-group-item list-group-item-action" data-tblr-toggle="list" href="#profile" role="tab">Profile</a>',
          '</div>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel">Home</div>',
          '  <div class="tab-pane" id="profile" role="tabpanel">Profile</div>',
          '</div>'
        ].join('')

        const trigger = fixtureEl.querySelector('#triggerProfile') as HTMLElement

        trigger.addEventListener('shown.bs.tab', () => {
          expect(trigger.classList.contains('active')).toBe(true)
          resolve()
        })

        trigger.click()
      })
    })

    it('should switch tabs via data-tblr-toggle with data-tblr-target', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<ul class="nav" role="tablist">',
          '  <li><button class="nav-link active" data-tblr-toggle="tab" data-tblr-target="#home" role="tab">Home</button></li>',
          '  <li><button id="triggerProfile" class="nav-link" data-tblr-toggle="tab" data-tblr-target="#profile" role="tab">Profile</button></li>',
          '</ul>',
          '<div class="tab-content">',
          '  <div class="tab-pane active" id="home" role="tabpanel">Home</div>',
          '  <div class="tab-pane" id="profile" role="tabpanel">Profile</div>',
          '</div>'
        ].join('')

        const trigger = fixtureEl.querySelector('#triggerProfile') as HTMLElement

        trigger.addEventListener('shown.bs.tab', () => {
          expect(trigger.classList.contains('active')).toBe(true)
          resolve()
        })

        trigger.click()
      })
    })
  })
})
