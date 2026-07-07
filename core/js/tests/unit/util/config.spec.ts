import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Config from '../../../src/bootstrap/util/config'
import { clearFixture, getFixture } from '../../helpers/fixture'

class DummyConfigClass extends Config {
  static get NAME(): string {
    return 'dummy'
  }
}

describe('Config', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('NAME', () => {
    it('should return plugin NAME', () => {
      expect(DummyConfigClass.NAME).toBe('dummy')
    })
  })

  describe('Default', () => {
    it('should return plugin defaults', () => {
      expect(typeof DummyConfigClass.Default).toBe('object')
    })
  })

  describe('DefaultType', () => {
    it('should return plugin default type', () => {
      expect(typeof DummyConfigClass.DefaultType).toBe('object')
    })
  })

  describe('mergeConfigObj', () => {
    it('should parse data attributes and merge with defaults, data attributes excel defaults', () => {
      fixtureEl.innerHTML = '<div id="test" data-bs-test-bool="false" data-bs-test-int="8" data-bs-test-string1="bar"></div>'

      vi.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testBool: true,
        testString: 'foo',
        testString1: 'foo',
        testInt: 7
      })

      const instance = new DummyConfigClass()
      const result = instance._mergeConfigObj({}, fixtureEl.querySelector('#test')!)

      expect(result.testBool).toBe(false)
      expect(result.testString).toBe('foo')
      expect(result.testString1).toBe('bar')
      expect(result.testInt).toBe(8)

      vi.restoreAllMocks()
    })

    it('should let programmatic config excel data attributes', () => {
      fixtureEl.innerHTML = '<div id="test" data-bs-test-bool="false" data-bs-test-int="8" data-bs-test-string-1="bar"></div>'

      vi.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testBool: true,
        testString: 'foo',
        testString1: 'foo',
        testInt: 7
      })

      const instance = new DummyConfigClass()
      const result = instance._mergeConfigObj({
        testString1: 'test',
        testInt: 3
      }, fixtureEl.querySelector('#test')!)

      expect(result.testBool).toBe(false)
      expect(result.testString).toBe('foo')
      expect(result.testString1).toBe('test')
      expect(result.testInt).toBe(3)

      vi.restoreAllMocks()
    })

    it('should omit data-bs-config if it is not an object', () => {
      fixtureEl.innerHTML = '<div id="test" data-bs-config="foo" data-bs-test-int="8"></div>'

      vi.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testInt: 7,
        testInt2: 79
      })

      const instance = new DummyConfigClass()
      const result = instance._mergeConfigObj({}, fixtureEl.querySelector('#test')!)

      expect(result.testInt).toBe(8)
      expect(result.testInt2).toBe(79)

      vi.restoreAllMocks()
    })
  })

  describe('typeCheckConfig', () => {
    it('should throw TypeError for wrong config types', () => {
      vi.spyOn(DummyConfigClass, 'DefaultType', 'get').mockReturnValue({
        toggle: 'boolean',
        parent: '(string|element)'
      })

      const obj = new DummyConfigClass()
      expect(() => {
        obj._typeCheckConfig({ toggle: true, parent: 777 })
      }).toThrow(TypeError)

      vi.restoreAllMocks()
    })

    it('should accept null when type includes null', () => {
      vi.spyOn(DummyConfigClass, 'DefaultType', 'get').mockReturnValue({
        toggle: 'boolean',
        parent: '(null|element)'
      })

      const obj = new DummyConfigClass()
      expect(() => {
        obj._typeCheckConfig({ toggle: true, parent: null })
      }).not.toThrow()

      vi.restoreAllMocks()
    })

    it('should accept undefined when type includes undefined', () => {
      vi.spyOn(DummyConfigClass, 'DefaultType', 'get').mockReturnValue({
        toggle: 'boolean',
        parent: '(undefined|element)'
      })

      const obj = new DummyConfigClass()
      expect(() => {
        obj._typeCheckConfig({ toggle: true, parent: undefined })
      }).not.toThrow()

      vi.restoreAllMocks()
    })
  })
})
