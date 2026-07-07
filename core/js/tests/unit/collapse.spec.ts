import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Collapse from '../../src/bootstrap/collapse'
import EventHandler from '../../src/bootstrap/dom/event-handler'
import { clearFixture, getFixture } from '../helpers/fixture'

describe('Collapse', () => {
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
      expect(typeof Collapse.VERSION).toBe('string')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(typeof Collapse.Default).toBe('object')
    })
  })

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Collapse.DATA_KEY).toBe('bs.collapse')
    })
  })

  describe('constructor', () => {
    it('should accept element as CSS selector or DOM element', () => {
      fixtureEl.innerHTML = '<div class="my-collapse"></div>'

      const collapseEl = fixtureEl.querySelector('div.my-collapse')!
      const collapseBySelector = new Collapse('div.my-collapse')
      const collapseByElement = new Collapse(collapseEl)

      expect(collapseBySelector._element).toBe(collapseEl)
      expect(collapseByElement._element).toBe(collapseEl)
    })

    it('should allow DOM element in parent config', () => {
      fixtureEl.innerHTML = [
        '<div class="my-collapse">',
        '  <div class="item">',
        '    <a data-bs-toggle="collapse" href="#">Toggle</a>',
        '    <div class="collapse">Lorem ipsum</div>',
        '  </div>',
        '</div>'
      ].join('')

      const collapseEl = fixtureEl.querySelector('div.collapse')!
      const myCollapseEl = fixtureEl.querySelector('.my-collapse')!

      const collapse = new Collapse(collapseEl, { parent: myCollapseEl })
      expect(collapse._config.parent).toBe(myCollapseEl)
    })

    it('should allow string selector in parent config', () => {
      fixtureEl.innerHTML = [
        '<div class="my-collapse">',
        '  <div class="item">',
        '    <a data-bs-toggle="collapse" href="#">Toggle</a>',
        '    <div class="collapse">Lorem ipsum</div>',
        '  </div>',
        '</div>'
      ].join('')

      const collapseEl = fixtureEl.querySelector('div.collapse')!
      const myCollapseEl = fixtureEl.querySelector('.my-collapse')!

      const collapse = new Collapse(collapseEl, { parent: 'div.my-collapse' })
      expect(collapse._config.parent).toBe(myCollapseEl)
    })
  })

  describe('toggle', () => {
    it('should call show if not shown', () => {
      fixtureEl.innerHTML = '<div></div>'

      const collapseEl = fixtureEl.querySelector('div')!
      const collapse = new Collapse(collapseEl)
      const spy = vi.spyOn(collapse, 'show')

      collapse.toggle()
      expect(spy).toHaveBeenCalled()
    })

    it('should call hide if shown', () => {
      fixtureEl.innerHTML = '<div class="show"></div>'

      const collapseEl = fixtureEl.querySelector('.show')!
      const collapse = new Collapse(collapseEl, { toggle: false })
      const spy = vi.spyOn(collapse, 'hide')

      collapse.toggle()
      expect(spy).toHaveBeenCalled()
    })

    it('should collapse children with parent', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="my-collapse">',
          '  <div class="item">',
          '    <a data-bs-toggle="collapse" href="#">Toggle 1</a>',
          '    <div id="collapse1" class="collapse show">Lorem ipsum 1</div>',
          '  </div>',
          '  <div class="item">',
          '    <a data-bs-toggle="collapse" href="#">Toggle 2</a>',
          '    <div id="collapse2" class="collapse">Lorem ipsum 2</div>',
          '  </div>',
          '</div>'
        ].join('')

        const parent = fixtureEl.querySelector('.my-collapse')!
        const collapseEl1 = fixtureEl.querySelector('#collapse1')!
        const collapseEl2 = fixtureEl.querySelector('#collapse2')!

        const collapseList = Array.from(fixtureEl.querySelectorAll('.collapse'))
          .map(el => new Collapse(el, { parent, toggle: false }))

        collapseEl2.addEventListener('shown.bs.collapse', () => {
          expect(collapseEl2.classList.contains('show')).toBe(true)
          expect(collapseEl1.classList.contains('show')).toBe(false)
          resolve()
        })

        collapseList[1].toggle()
      })
    })
  })

  describe('show', () => {
    it('should do nothing if transitioning', () => {
      fixtureEl.innerHTML = '<div></div>'

      const spy = vi.spyOn(EventHandler, 'trigger')
      const collapseEl = fixtureEl.querySelector('div')!
      const collapse = new Collapse(collapseEl, { toggle: false })

      collapse._isTransitioning = true
      collapse.show()

      expect(spy).not.toHaveBeenCalled()
    })

    it('should do nothing if already shown', () => {
      fixtureEl.innerHTML = '<div class="show"></div>'

      const spy = vi.spyOn(EventHandler, 'trigger')
      const collapseEl = fixtureEl.querySelector('div')!
      const collapse = new Collapse(collapseEl, { toggle: false })

      collapse.show()
      expect(spy).not.toHaveBeenCalled()
    })

    it('should show a collapsed element', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div class="collapse" style="height: 0px;"></div>'

        const collapseEl = fixtureEl.querySelector('div')!
        const collapse = new Collapse(collapseEl, { toggle: false })

        collapseEl.addEventListener('show.bs.collapse', () => {
          expect(collapseEl.style.height).toBe('0px')
        })

        collapseEl.addEventListener('shown.bs.collapse', () => {
          expect(collapseEl.classList.contains('show')).toBe(true)
          expect(collapseEl.style.height).toBe('')
          resolve()
        })

        collapse.show()
      })
    })

    it('should show a collapsed element on width', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div class="collapse collapse-horizontal" style="width: 0px;"></div>'

        const collapseEl = fixtureEl.querySelector('div')!
        const collapse = new Collapse(collapseEl, { toggle: false })

        collapseEl.addEventListener('show.bs.collapse', () => {
          expect(collapseEl.style.width).toBe('0px')
        })

        collapseEl.addEventListener('shown.bs.collapse', () => {
          expect(collapseEl.classList.contains('show')).toBe(true)
          expect(collapseEl.style.width).toBe('')
          resolve()
        })

        collapse.show()
      })
    })

    it('should collapse only the first collapse', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div class="card" id="accordion1">',
          '  <div id="collapse1" class="collapse"></div>',
          '</div>',
          '<div class="card" id="accordion2">',
          '  <div id="collapse2" class="collapse show"></div>',
          '</div>'
        ].join('')

        const el1 = fixtureEl.querySelector('#collapse1')!
        const el2 = fixtureEl.querySelector('#collapse2')!
        const collapse = new Collapse(el1, { toggle: false })

        el1.addEventListener('shown.bs.collapse', () => {
          expect(el1.classList.contains('show')).toBe(true)
          expect(el2.classList.contains('show')).toBe(true)
          resolve()
        })

        collapse.show()
      })
    })

    it('should handle toggling children siblings in accordion', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="parentGroup" class="accordion">',
          '  <div class="accordion-header">',
          '    <button data-bs-target="#parentContent" data-bs-toggle="collapse">Parent</button>',
          '  </div>',
          '  <div id="parentContent" class="accordion-collapse collapse" data-bs-parent="#parentGroup">',
          '    <div class="accordion-body">',
          '      <div id="childGroup" class="accordion">',
          '        <div class="accordion-item">',
          '          <button data-bs-target="#childContent1" data-bs-toggle="collapse">Child 1</button>',
          '          <div id="childContent1" class="accordion-collapse collapse" data-bs-parent="#childGroup">content</div>',
          '        </div>',
          '        <div class="accordion-item">',
          '          <button data-bs-target="#childContent2" data-bs-toggle="collapse">Child 2</button>',
          '          <div id="childContent2" class="accordion-collapse collapse" data-bs-parent="#childGroup">content</div>',
          '        </div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('')

        const el = (s: string) => fixtureEl.querySelector(s) as HTMLElement

        const parentBtn = el('[data-bs-target="#parentContent"]')
        const childBtn1 = el('[data-bs-target="#childContent1"]')
        const childBtn2 = el('[data-bs-target="#childContent2"]')
        const parentCollapseEl = el('#parentContent')
        const childCollapseEl1 = el('#childContent1')
        const childCollapseEl2 = el('#childContent2')

        parentCollapseEl.addEventListener('shown.bs.collapse', () => {
          expect(parentCollapseEl.classList.contains('show')).toBe(true)
          childBtn1.click()
        })

        childCollapseEl1.addEventListener('shown.bs.collapse', () => {
          expect(childCollapseEl1.classList.contains('show')).toBe(true)
          childBtn2.click()
        })

        childCollapseEl2.addEventListener('shown.bs.collapse', () => {
          expect(childCollapseEl2.classList.contains('show')).toBe(true)
          expect(childCollapseEl1.classList.contains('show')).toBe(false)
          resolve()
        })

        parentBtn.click()
      })
    })

    it('should not show if active children are transitioning', () => {
      fixtureEl.innerHTML = [
        '<div id="accordion">',
        '  <div id="collapse1" class="collapse show" data-bs-parent="#accordion"></div>',
        '  <div id="collapse2" class="collapse" data-bs-parent="#accordion"></div>',
        '</div>'
      ].join('')

      const el1 = fixtureEl.querySelector('#collapse1')!
      const el2 = fixtureEl.querySelector('#collapse2')!

      const collapse1 = new Collapse(el1, { toggle: false })
      const collapse2 = new Collapse(el2, { toggle: false })

      collapse1._isTransitioning = true

      const spy = vi.spyOn(EventHandler, 'trigger')
      collapse2.show()

      expect(spy).not.toHaveBeenCalled()
    })

    it('should not fire shown when show is prevented', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = '<div class="collapse"></div>'

        const collapseEl = fixtureEl.querySelector('div')!
        const collapse = new Collapse(collapseEl, { toggle: false })

        collapseEl.addEventListener('show.bs.collapse', event => {
          event.preventDefault()
          setTimeout(() => {
            resolve()
          }, 10)
        })

        collapseEl.addEventListener('shown.bs.collapse', () => {
          reject(new Error('should not fire shown'))
        })

        collapse.show()
      })
    })
  })

  describe('hide', () => {
    it('should do nothing if transitioning', () => {
      fixtureEl.innerHTML = '<div></div>'

      const spy = vi.spyOn(EventHandler, 'trigger')
      const collapseEl = fixtureEl.querySelector('div')!
      const collapse = new Collapse(collapseEl, { toggle: false })

      collapse._isTransitioning = true
      collapse.hide()

      expect(spy).not.toHaveBeenCalled()
    })

    it('should do nothing if not shown', () => {
      fixtureEl.innerHTML = '<div></div>'

      const spy = vi.spyOn(EventHandler, 'trigger')
      const collapseEl = fixtureEl.querySelector('div')!
      const collapse = new Collapse(collapseEl, { toggle: false })

      collapse.hide()
      expect(spy).not.toHaveBeenCalled()
    })

    it('should hide a collapse element', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = '<div class="collapse show"></div>'

        const collapseEl = fixtureEl.querySelector('div')!
        const collapse = new Collapse(collapseEl, { toggle: false })

        collapseEl.addEventListener('hidden.bs.collapse', () => {
          expect(collapseEl.classList.contains('show')).toBe(false)
          expect(collapseEl.style.height).toBe('')
          resolve()
        })

        collapse.hide()
      })
    })

    it('should not fire hidden when hide is prevented', () => {
      return new Promise<void>((resolve, reject) => {
        fixtureEl.innerHTML = '<div class="collapse show"></div>'

        const collapseEl = fixtureEl.querySelector('div')!
        const collapse = new Collapse(collapseEl, { toggle: false })

        collapseEl.addEventListener('hide.bs.collapse', event => {
          event.preventDefault()
          setTimeout(resolve, 10)
        })

        collapseEl.addEventListener('hidden.bs.collapse', () => {
          reject(new Error('should not fire hidden'))
        })

        collapse.hide()
      })
    })
  })

  describe('dispose', () => {
    it('should destroy a collapse', () => {
      fixtureEl.innerHTML = '<div class="collapse show"></div>'

      const collapseEl = fixtureEl.querySelector('div')!
      const collapse = new Collapse(collapseEl, { toggle: false })

      expect(Collapse.getInstance(collapseEl)).toBe(collapse)

      collapse.dispose()

      expect(Collapse.getInstance(collapseEl)).toBeNull()
    })
  })

  describe('data-api', () => {
    it('should prevent url change on nested elements', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a role="button" data-bs-toggle="collapse" class="collapsed" href="#collapse">',
          '  <span id="nested"></span>',
          '</a>',
          '<div id="collapse" class="collapse"></div>'
        ].join('')

        const triggerEl = fixtureEl.querySelector('a')!
        const nestedTriggerEl = fixtureEl.querySelector('#nested')!

        const spy = vi.spyOn(Event.prototype, 'preventDefault')

        triggerEl.addEventListener('click', event => {
          expect((event.target as Element).isEqualNode(nestedTriggerEl)).toBe(true)
          expect(spy).toHaveBeenCalled()
          resolve()
        })

        nestedTriggerEl.click()
      })
    })

    it('should show multiple collapsed elements', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a role="button" data-bs-toggle="collapse" class="collapsed" href=".multi"></a>',
          '<div id="collapse1" class="collapse multi"></div>',
          '<div id="collapse2" class="collapse multi"></div>'
        ].join('')

        const trigger = fixtureEl.querySelector('a')!
        const collapse1 = fixtureEl.querySelector('#collapse1')!
        const collapse2 = fixtureEl.querySelector('#collapse2')!

        collapse2.addEventListener('shown.bs.collapse', () => {
          expect(trigger.getAttribute('aria-expanded')).toBe('true')
          expect(trigger.classList.contains('collapsed')).toBe(false)
          expect(collapse1.classList.contains('show')).toBe(true)
          expect(collapse2.classList.contains('show')).toBe(true)
          resolve()
        })

        trigger.click()
      })
    })

    it('should hide multiple collapsed elements', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a role="button" data-bs-toggle="collapse" href=".multi"></a>',
          '<div id="collapse1" class="collapse multi show"></div>',
          '<div id="collapse2" class="collapse multi show"></div>'
        ].join('')

        const trigger = fixtureEl.querySelector('a')!
        const collapse1 = fixtureEl.querySelector('#collapse1')!
        const collapse2 = fixtureEl.querySelector('#collapse2')!

        collapse2.addEventListener('hidden.bs.collapse', () => {
          expect(trigger.getAttribute('aria-expanded')).toBe('false')
          expect(trigger.classList.contains('collapsed')).toBe(true)
          expect(collapse1.classList.contains('show')).toBe(false)
          expect(collapse2.classList.contains('show')).toBe(false)
          resolve()
        })

        trigger.click()
      })
    })

    it('should show collapse via data-tblr-target', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a role="button" data-bs-toggle="collapse" class="collapsed" data-tblr-target="#test1"></a>',
          '<div id="test1" class="collapse"></div>'
        ].join('')

        const trigger = fixtureEl.querySelector('a') as HTMLElement
        const collapseEl = fixtureEl.querySelector('#test1')!

        collapseEl.addEventListener('shown.bs.collapse', () => {
          expect(collapseEl.classList.contains('show')).toBe(true)
          expect(trigger.classList.contains('collapsed')).toBe(false)
          expect(trigger.getAttribute('aria-expanded')).toBe('true')
          resolve()
        })

        trigger.click()
      })
    })

    it('should hide collapse via data-tblr-target', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a role="button" data-bs-toggle="collapse" data-tblr-target="#test1"></a>',
          '<div id="test1" class="collapse show"></div>'
        ].join('')

        const trigger = fixtureEl.querySelector('a') as HTMLElement
        const collapseEl = fixtureEl.querySelector('#test1')!

        collapseEl.addEventListener('hidden.bs.collapse', () => {
          expect(collapseEl.classList.contains('show')).toBe(false)
          expect(trigger.classList.contains('collapsed')).toBe(true)
          expect(trigger.getAttribute('aria-expanded')).toBe('false')
          resolve()
        })

        trigger.click()
      })
    })

    it('should remove collapsed class from trigger on show', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a id="link1" role="button" data-bs-toggle="collapse" class="collapsed" href="#" data-bs-target="#test1"></a>',
          '<a id="link2" role="button" data-bs-toggle="collapse" class="collapsed" href="#" data-bs-target="#test1"></a>',
          '<div id="test1"></div>'
        ].join('')

        const link1 = fixtureEl.querySelector('#link1')!
        const link2 = fixtureEl.querySelector('#link2')!
        const collapseEl = fixtureEl.querySelector('#test1')!

        collapseEl.addEventListener('shown.bs.collapse', () => {
          expect(link1.getAttribute('aria-expanded')).toBe('true')
          expect(link2.getAttribute('aria-expanded')).toBe('true')
          expect(link1.classList.contains('collapsed')).toBe(false)
          expect(link2.classList.contains('collapsed')).toBe(false)
          resolve()
        })

        ;(link1 as HTMLElement).click()
      })
    })

    it('should add collapsed class to trigger on hide', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<a id="link1" role="button" data-bs-toggle="collapse" href="#" data-bs-target="#test1"></a>',
          '<a id="link2" role="button" data-bs-toggle="collapse" href="#" data-bs-target="#test1"></a>',
          '<div id="test1" class="show"></div>'
        ].join('')

        const link1 = fixtureEl.querySelector('#link1')!
        const link2 = fixtureEl.querySelector('#link2')!
        const collapseEl = fixtureEl.querySelector('#test1')!

        collapseEl.addEventListener('hidden.bs.collapse', () => {
          expect(link1.getAttribute('aria-expanded')).toBe('false')
          expect(link2.getAttribute('aria-expanded')).toBe('false')
          expect(link1.classList.contains('collapsed')).toBe(true)
          expect(link2.classList.contains('collapsed')).toBe(true)
          resolve()
        })

        ;(link1 as HTMLElement).click()
      })
    })

    it('should allow accordion with non-card children', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="accordion">',
          '  <div class="item">',
          '    <a id="linkTrigger" data-bs-toggle="collapse" href="#collapseOne"></a>',
          '    <div id="collapseOne" class="collapse" data-bs-parent="#accordion"></div>',
          '  </div>',
          '  <div class="item">',
          '    <a id="linkTriggerTwo" data-bs-toggle="collapse" href="#collapseTwo"></a>',
          '    <div id="collapseTwo" class="collapse show" data-bs-parent="#accordion"></div>',
          '  </div>',
          '</div>'
        ].join('')

        const trigger = fixtureEl.querySelector('#linkTrigger') as HTMLElement
        const triggerTwo = fixtureEl.querySelector('#linkTriggerTwo') as HTMLElement
        const collapseOne = fixtureEl.querySelector('#collapseOne')!
        const collapseTwo = fixtureEl.querySelector('#collapseTwo')!

        collapseOne.addEventListener('shown.bs.collapse', () => {
          expect(collapseOne.classList.contains('show')).toBe(true)
          expect(collapseTwo.classList.contains('show')).toBe(false)

          collapseTwo.addEventListener('shown.bs.collapse', () => {
            expect(collapseOne.classList.contains('show')).toBe(false)
            expect(collapseTwo.classList.contains('show')).toBe(true)
            resolve()
          })

          triggerTwo.click()
        })

        trigger.click()
      })
    })

    it('should not prevent event for input', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<input type="checkbox" data-bs-toggle="collapse" data-bs-target="#collapsediv1">',
          '<div id="collapsediv1"></div>'
        ].join('')

        const target = fixtureEl.querySelector('input') as HTMLInputElement
        const collapseEl = fixtureEl.querySelector('#collapsediv1')!

        collapseEl.addEventListener('shown.bs.collapse', () => {
          expect(collapseEl.classList.contains('show')).toBe(true)
          expect(target.checked).toBe(true)
          resolve()
        })

        target.click()
      })
    })

    it('should allow accordion with nested elements', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="accordion">',
          '  <div class="row">',
          '    <div class="col-lg-6">',
          '      <div class="item">',
          '        <a id="linkTrigger" data-bs-toggle="collapse" href="#collapseOne"></a>',
          '        <div id="collapseOne" class="collapse" data-bs-parent="#accordion"></div>',
          '      </div>',
          '    </div>',
          '    <div class="col-lg-6">',
          '      <div class="item">',
          '        <a id="linkTriggerTwo" data-bs-toggle="collapse" href="#collapseTwo"></a>',
          '        <div id="collapseTwo" class="collapse show" data-bs-parent="#accordion"></div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('')

        const triggerEl = fixtureEl.querySelector('#linkTrigger') as HTMLElement
        const triggerTwoEl = fixtureEl.querySelector('#linkTriggerTwo') as HTMLElement
        const collapseOneEl = fixtureEl.querySelector('#collapseOne')!
        const collapseTwoEl = fixtureEl.querySelector('#collapseTwo')!

        collapseOneEl.addEventListener('shown.bs.collapse', () => {
          expect(collapseOneEl.classList.contains('show')).toBe(true)
          expect(triggerEl.classList.contains('collapsed')).toBe(false)
          expect(triggerEl.getAttribute('aria-expanded')).toBe('true')

          expect(collapseTwoEl.classList.contains('show')).toBe(false)
          expect(triggerTwoEl.classList.contains('collapsed')).toBe(true)
          expect(triggerTwoEl.getAttribute('aria-expanded')).toBe('false')

          collapseTwoEl.addEventListener('shown.bs.collapse', () => {
            expect(collapseOneEl.classList.contains('show')).toBe(false)
            expect(triggerEl.classList.contains('collapsed')).toBe(true)
            expect(triggerEl.getAttribute('aria-expanded')).toBe('false')

            expect(collapseTwoEl.classList.contains('show')).toBe(true)
            expect(triggerTwoEl.classList.contains('collapsed')).toBe(false)
            expect(triggerTwoEl.getAttribute('aria-expanded')).toBe('true')
            resolve()
          })

          triggerTwoEl.click()
        })

        triggerEl.click()
      })
    })

    it('should collapse accordion children but not nested accordion', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<div id="accordion">',
          '  <div class="item">',
          '    <a id="linkTrigger" data-bs-toggle="collapse" href="#collapseOne"></a>',
          '    <div id="collapseOne" data-bs-parent="#accordion" class="collapse">',
          '      <div id="nestedAccordion">',
          '        <div class="item">',
          '          <a id="nestedLinkTrigger" data-bs-toggle="collapse" href="#nestedCollapseOne"></a>',
          '          <div id="nestedCollapseOne" data-bs-parent="#nestedAccordion" class="collapse"></div>',
          '        </div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '  <div class="item">',
          '    <a id="linkTriggerTwo" data-bs-toggle="collapse" href="#collapseTwo"></a>',
          '    <div id="collapseTwo" data-bs-parent="#accordion" class="collapse show"></div>',
          '  </div>',
          '</div>'
        ].join('')

        const trigger = fixtureEl.querySelector('#linkTrigger') as HTMLElement
        const triggerTwo = fixtureEl.querySelector('#linkTriggerTwo') as HTMLElement
        const nestedTrigger = fixtureEl.querySelector('#nestedLinkTrigger') as HTMLElement
        const collapseOne = fixtureEl.querySelector('#collapseOne')!
        const collapseTwo = fixtureEl.querySelector('#collapseTwo')!
        const nestedCollapseOne = fixtureEl.querySelector('#nestedCollapseOne')!

        function handlerCollapseOne() {
          expect(collapseOne.classList.contains('show')).toBe(true)
          expect(collapseTwo.classList.contains('show')).toBe(false)
          expect(nestedCollapseOne.classList.contains('show')).toBe(false)

          nestedCollapseOne.addEventListener('shown.bs.collapse', handlerNestedCollapseOne)
          nestedTrigger.click()
          collapseOne.removeEventListener('shown.bs.collapse', handlerCollapseOne)
        }

        function handlerNestedCollapseOne() {
          expect(collapseOne.classList.contains('show')).toBe(true)
          expect(collapseTwo.classList.contains('show')).toBe(false)
          expect(nestedCollapseOne.classList.contains('show')).toBe(true)

          collapseTwo.addEventListener('shown.bs.collapse', () => {
            expect(collapseOne.classList.contains('show')).toBe(false)
            expect(collapseTwo.classList.contains('show')).toBe(true)
            expect(nestedCollapseOne.classList.contains('show')).toBe(true)
            resolve()
          })

          triggerTwo.click()
          nestedCollapseOne.removeEventListener('shown.bs.collapse', handlerNestedCollapseOne)
        }

        collapseOne.addEventListener('shown.bs.collapse', handlerCollapseOne)
        trigger.click()
      })
    })
  })

  describe('getInstance', () => {
    it('should return collapse instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const collapse = new Collapse(div)

      expect(Collapse.getInstance(div)).toBe(collapse)
      expect(Collapse.getInstance(div)).toBeInstanceOf(Collapse)
    })

    it('should return null when there is no collapse instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!
      expect(Collapse.getInstance(div)).toBeNull()
    })
  })

  describe('getOrCreateInstance', () => {
    it('should return collapse instance', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')!
      const collapse = new Collapse(div)

      expect(Collapse.getOrCreateInstance(div)).toBe(collapse)
      expect(Collapse.getOrCreateInstance(div)).toBeInstanceOf(Collapse)
    })

    it('should return new instance when there is no collapse instance', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      expect(Collapse.getInstance(div)).toBeNull()
      expect(Collapse.getOrCreateInstance(div)).toBeInstanceOf(Collapse)
    })

    it('should return new instance with given configuration', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      const collapse = Collapse.getOrCreateInstance(div, { toggle: false })
      expect(collapse).toBeInstanceOf(Collapse)
      expect(collapse._config.toggle).toBe(false)
    })

    it('should return existing instance ignoring new configuration', () => {
      fixtureEl.innerHTML = '<div></div>'
      const div = fixtureEl.querySelector('div')!

      const collapse = new Collapse(div, { toggle: false })
      const collapse2 = Collapse.getOrCreateInstance(div, { toggle: true })

      expect(collapse2).toBe(collapse)
      expect(collapse2._config.toggle).toBe(false)
    })
  })

  describe('data-tblr-toggle', () => {
    it('should show collapse via data-tblr-toggle="collapse"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button data-tblr-toggle="collapse" data-bs-target="#test1">Toggle</button>',
          '<div id="test1" class="collapse">Content</div>'
        ].join('')

        const target = fixtureEl.querySelector('#test1')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="collapse"]') as HTMLElement

        target.addEventListener('shown.bs.collapse', () => {
          expect(target.classList.contains('show')).toBe(true)
          resolve()
        })

        btn.click()
      })
    })

    it('should hide collapse via data-tblr-toggle="collapse"', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button data-tblr-toggle="collapse" data-bs-target="#test1">Toggle</button>',
          '<div id="test1" class="collapse show">Content</div>'
        ].join('')

        const target = fixtureEl.querySelector('#test1')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="collapse"]') as HTMLElement

        target.addEventListener('hidden.bs.collapse', () => {
          expect(target.classList.contains('show')).toBe(false)
          resolve()
        })

        btn.click()
      })
    })

    it('should show collapse via data-tblr-toggle with data-tblr-target', () => {
      return new Promise<void>(resolve => {
        fixtureEl.innerHTML = [
          '<button data-tblr-toggle="collapse" data-tblr-target="#test1">Toggle</button>',
          '<div id="test1" class="collapse">Content</div>'
        ].join('')

        const target = fixtureEl.querySelector('#test1')!
        const btn = fixtureEl.querySelector('[data-tblr-toggle="collapse"]') as HTMLElement

        target.addEventListener('shown.bs.collapse', () => {
          expect(target.classList.contains('show')).toBe(true)
          resolve()
        })

        btn.click()
      })
    })
  })
})
