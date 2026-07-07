import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import TemplateFactory from '../../../src/bootstrap/util/template-factory'
import { clearFixture, getFixture } from '../../helpers/fixture'

describe('TemplateFactory', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('NAME', () => {
    it('should return plugin NAME', () => {
      expect(TemplateFactory.NAME).toBe('TemplateFactory')
    })
  })

  describe('Default', () => {
    it('should return plugin default config', () => {
      expect(typeof TemplateFactory.Default).toBe('object')
    })
  })

  describe('toHtml', () => {
    describe('Sanitization', () => {
      it('should sanitize template by default', () => {
        const factory = new TemplateFactory({
          sanitize: true,
          template: '<div><a href="javascript:alert(7)">Click me</a></div>'
        })
        expect(factory.toHtml().innerHTML).not.toContain('href="javascript:alert(7)')
      })

      it('should not sanitize template if disabled', () => {
        const factory = new TemplateFactory({
          sanitize: false,
          template: '<div><a href="javascript:alert(7)">Click me</a></div>'
        })
        expect(factory.toHtml().innerHTML).toContain('href="javascript:alert(7)')
      })

      it('should sanitize html content', () => {
        const factory = new TemplateFactory({
          sanitize: true,
          html: true,
          template: '<div id="foo"></div>',
          content: { '#foo': '<a href="javascript:alert(7)">Click me</a>' }
        })
        expect(factory.toHtml().innerHTML).not.toContain('href="javascript:alert(7)')
      })

      it('should not sanitize content when disabled', () => {
        const factory = new TemplateFactory({
          sanitize: false,
          html: true,
          template: '<div id="foo"></div>',
          content: { '#foo': '<a href="javascript:alert(7)">Click me</a>' }
        })
        expect(factory.toHtml().innerHTML).toContain('href="javascript:alert(7)')
      })
    })

    describe('Extra Class', () => {
      it('should add extra class', () => {
        const factory = new TemplateFactory({ extraClass: 'testClass' })
        expect(factory.toHtml().classList.contains('testClass')).toBe(true)
      })

      it('should add multiple extra classes', () => {
        const factory = new TemplateFactory({ extraClass: 'testClass testClass2' })
        const el = factory.toHtml()
        expect(el.classList.contains('testClass')).toBe(true)
        expect(el.classList.contains('testClass2')).toBe(true)
      })

      it('should resolve class from function', () => {
        const factory = new TemplateFactory({
          extraClass() {
            return 'testClass'
          }
        })
        expect(factory.toHtml().classList.contains('testClass')).toBe(true)
      })
    })
  })

  describe('Content', () => {
    it('should add simple text content', () => {
      const template = '<div><div class="foo"></div><div class="foo2"></div></div>'
      const factory = new TemplateFactory({
        template,
        content: { '.foo': 'bar', '.foo2': 'bar2' }
      })

      const html = factory.toHtml()
      expect(html.querySelector('.foo')!.textContent).toBe('bar')
      expect(html.querySelector('.foo2')!.textContent).toBe('bar2')
    })

    it('should not fill template if selector does not exist', () => {
      const factory = new TemplateFactory({
        sanitize: true,
        html: true,
        template: '<div id="foo"></div>',
        content: { '#bar': 'test' }
      })
      expect(factory.toHtml().outerHTML).toBe('<div id="foo"></div>')
    })

    it('should remove template selector if content is null', () => {
      const factory = new TemplateFactory({
        sanitize: true,
        html: true,
        template: '<div><div id="foo"></div></div>',
        content: { '#foo': null }
      })
      expect(factory.toHtml().outerHTML).toBe('<div></div>')
    })

    it('should resolve content from function', () => {
      const factory = new TemplateFactory({
        sanitize: true,
        html: true,
        template: '<div><div id="foo"></div></div>',
        content: { '#foo': () => null }
      })
      expect(factory.toHtml().outerHTML).toBe('<div></div>')
    })

    it('should use textContent when html is false and content is element', () => {
      fixtureEl.innerHTML = '<div>foo<span>bar</span></div>'
      const contentElement = fixtureEl.querySelector('div')!

      const factory = new TemplateFactory({
        html: false,
        template: '<div><div id="foo"></div></div>',
        content: { '#foo': contentElement }
      })

      const fooEl = factory.toHtml().querySelector('#foo')!
      expect(fooEl.innerHTML).not.toBe(contentElement.innerHTML)
      expect(fooEl.textContent).toBe(contentElement.textContent)
      expect(fooEl.textContent).toBe('foobar')
    })

    it('should use outerHTML when html is true and content is element', () => {
      fixtureEl.innerHTML = '<div>foo<span>bar</span></div>'
      const contentElement = fixtureEl.querySelector('div')!

      const factory = new TemplateFactory({
        html: true,
        template: '<div><div id="foo"></div></div>',
        content: { '#foo': contentElement }
      })

      const fooEl = factory.toHtml().querySelector('#foo')!
      expect(fooEl.innerHTML).toBe(contentElement.outerHTML)
    })
  })

  describe('getContent', () => {
    it('should get content as array', () => {
      const factory = new TemplateFactory({
        content: { '.foo': 'bar', '.foo2': 'bar2' }
      })
      expect(factory.getContent()).toEqual(['bar', 'bar2'])
    })

    it('should filter empties', () => {
      const factory = new TemplateFactory({
        content: {
          '.foo': 'bar',
          '.foo2': '',
          '.foo3': null,
          '.foo4': () => 2,
          '.foo5': () => null
        }
      })
      expect(factory.getContent()).toEqual(['bar', 2])
    })
  })

  describe('hasContent', () => {
    it('should return true if it has content', () => {
      const factory = new TemplateFactory({
        content: { '.foo': 'bar', '.foo2': 'bar2', '.foo3': '' }
      })
      expect(factory.hasContent()).toBe(true)
    })

    it('should return false if all content is empty', () => {
      const factory = new TemplateFactory({
        content: { '.foo2': '', '.foo3': null, '.foo4': () => null }
      })
      expect(factory.hasContent()).toBe(false)
    })
  })

  describe('changeContent', () => {
    it('should change content', () => {
      const template = '<div><div class="foo"></div><div class="foo2"></div></div>'
      const factory = new TemplateFactory({
        template,
        content: { '.foo': 'bar', '.foo2': 'bar2' }
      })

      const text = (sel: string) => factory.toHtml().querySelector(sel)!.textContent
      expect(text('.foo')).toBe('bar')
      expect(text('.foo2')).toBe('bar2')

      factory.changeContent({ '.foo': 'test', '.foo2': 'test2' })
      expect(text('.foo')).toBe('test')
      expect(text('.foo2')).toBe('test2')
    })

    it('should change only specified content', () => {
      const template = '<div><div class="foo"></div><div class="foo2"></div></div>'
      const factory = new TemplateFactory({
        template,
        content: { '.foo': 'bar', '.foo2': 'bar2' }
      })

      const text = (sel: string) => factory.toHtml().querySelector(sel)!.textContent
      factory.changeContent({ '.foo': 'test' })
      expect(text('.foo')).toBe('test')
      expect(text('.foo2')).toBe('bar2')
    })
  })
})
