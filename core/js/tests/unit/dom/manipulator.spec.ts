import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import Manipulator from '../../../src/bootstrap/dom/manipulator'
import { clearFixture, getFixture } from '../../helpers/fixture'

describe('Manipulator', () => {
  let fixtureEl: HTMLElement
  let div: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = '<div></div>'
    div = fixtureEl.querySelector('div')!
  })

  afterEach(() => {
    clearFixture()
  })

  describe('setDataAttribute', () => {
    it('should set a data-tblr-* attribute', () => {
      Manipulator.setDataAttribute(div, 'key', 'value')

      expect(div.getAttribute('data-tblr-key')).toBe('value')
    })

    it('should convert camelCase keys to kebab-case', () => {
      Manipulator.setDataAttribute(div, 'testKey', '123')

      expect(div.getAttribute('data-tblr-test-key')).toBe('123')
    })

    it('should overwrite existing value', () => {
      Manipulator.setDataAttribute(div, 'key', 'old')
      Manipulator.setDataAttribute(div, 'key', 'new')

      expect(div.getAttribute('data-tblr-key')).toBe('new')
    })
  })

  describe('removeDataAttribute', () => {
    it('should remove data-tblr-* attribute', () => {
      div.setAttribute('data-tblr-key', 'value')
      Manipulator.removeDataAttribute(div, 'key')

      expect(div.getAttribute('data-tblr-key')).toBeNull()
    })

    it('should remove data-bs-* attribute', () => {
      div.setAttribute('data-bs-key', 'value')
      Manipulator.removeDataAttribute(div, 'key')

      expect(div.getAttribute('data-bs-key')).toBeNull()
    })

    it('should remove both prefixes at once', () => {
      div.setAttribute('data-tblr-key', 'a')
      div.setAttribute('data-bs-key', 'b')
      Manipulator.removeDataAttribute(div, 'key')

      expect(div.getAttribute('data-tblr-key')).toBeNull()
      expect(div.getAttribute('data-bs-key')).toBeNull()
    })

    it('should handle camelCase keys', () => {
      div.setAttribute('data-tblr-some-thing', 'x')
      Manipulator.removeDataAttribute(div, 'someThing')

      expect(div.getAttribute('data-tblr-some-thing')).toBeNull()
    })
  })

  describe('getDataAttribute', () => {
    it('should prioritize data-tblr-* over data-bs-*', () => {
      div.setAttribute('data-tblr-key', 'tblr-value')
      div.setAttribute('data-bs-key', 'bs-value')

      expect(Manipulator.getDataAttribute(div, 'key')).toBe('tblr-value')
    })

    it('should fall back to data-bs-* if data-tblr-* is absent', () => {
      div.setAttribute('data-bs-key', 'bs-value')

      expect(Manipulator.getDataAttribute(div, 'key')).toBe('bs-value')
    })

    it('should return null if neither prefix exists', () => {
      expect(Manipulator.getDataAttribute(div, 'missing')).toBeNull()
    })

    it('should normalize "true" to boolean true', () => {
      div.setAttribute('data-tblr-flag', 'true')

      expect(Manipulator.getDataAttribute(div, 'flag')).toBe(true)
    })

    it('should normalize "false" to boolean false', () => {
      div.setAttribute('data-tblr-flag', 'false')

      expect(Manipulator.getDataAttribute(div, 'flag')).toBe(false)
    })

    it('should normalize numeric strings to numbers', () => {
      div.setAttribute('data-tblr-count', '42')

      expect(Manipulator.getDataAttribute(div, 'count')).toBe(42)
    })

    it('should normalize "null" to null', () => {
      div.setAttribute('data-tblr-val', 'null')

      expect(Manipulator.getDataAttribute(div, 'val')).toBeNull()
    })

    it('should normalize empty string to null', () => {
      div.setAttribute('data-tblr-val', '')

      expect(Manipulator.getDataAttribute(div, 'val')).toBeNull()
    })

    it('should parse JSON-encoded values', () => {
      div.setAttribute('data-tblr-obj', '{"a":1}')

      expect(Manipulator.getDataAttribute(div, 'obj')).toEqual({ a: 1 })
    })

    it('should return raw string for non-parseable values', () => {
      div.setAttribute('data-tblr-val', 'hello world')

      expect(Manipulator.getDataAttribute(div, 'val')).toBe('hello world')
    })

    it('should handle camelCase key lookup', () => {
      div.setAttribute('data-tblr-my-key', 'yes')

      expect(Manipulator.getDataAttribute(div, 'myKey')).toBe('yes')
    })
  })

  describe('getDataAttributes', () => {
    it('should return empty object for null element', () => {
      expect(Manipulator.getDataAttributes(null)).toEqual({})
    })

    it('should return empty object when no data attributes exist', () => {
      expect(Manipulator.getDataAttributes(div)).toEqual({})
    })

    it('should collect data-tblr-* attributes', () => {
      div.setAttribute('data-tblr-name', 'test')
      div.setAttribute('data-tblr-count', '5')

      const attrs = Manipulator.getDataAttributes(div)

      expect(attrs.name).toBe('test')
      expect(attrs.count).toBe(5)
    })

    it('should collect data-bs-* attributes', () => {
      div.setAttribute('data-bs-toggle', 'modal')

      const attrs = Manipulator.getDataAttributes(div)

      expect(attrs.toggle).toBe('modal')
    })

    it('should prioritize tblr over bs for the same key', () => {
      div.setAttribute('data-tblr-key', 'tblr')
      div.setAttribute('data-bs-key', 'bs')

      const attrs = Manipulator.getDataAttributes(div)

      expect(attrs.key).toBe('tblr')
    })

    it('should exclude *Config attributes', () => {
      div.setAttribute('data-tblr-config', '{}')
      div.setAttribute('data-bs-config', '{}')
      div.setAttribute('data-tblr-name', 'hello')

      const attrs = Manipulator.getDataAttributes(div)

      expect(attrs.name).toBe('hello')
      expect('config' in attrs).toBe(false)
    })

    it('should normalize all values', () => {
      div.setAttribute('data-tblr-flag', 'true')
      div.setAttribute('data-tblr-num', '10')
      div.setAttribute('data-tblr-nil', 'null')

      const attrs = Manipulator.getDataAttributes(div)

      expect(attrs.flag).toBe(true)
      expect(attrs.num).toBe(10)
      expect(attrs.nil).toBeNull()
    })
  })
})
