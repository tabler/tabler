import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import Data from '../../../src/bootstrap/dom/data'
import { clearFixture, getFixture } from '../../helpers/fixture'

describe('Data', () => {
  const TEST_KEY = 'bs.test'
  const UNKNOWN_KEY = 'bs.unknown'
  const TEST_DATA = { test: 'bsData' }

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
    Data.remove(div, TEST_KEY)
    clearFixture()
  })

  it('should return null for unknown elements', () => {
    Data.set(div, TEST_KEY, { ...TEST_DATA })

    expect(Data.get(document.createElement('div'), TEST_KEY)).toBeNull()
  })

  it('should return null for unknown keys', () => {
    Data.set(div, TEST_KEY, { ...TEST_DATA })

    expect(Data.get(div, UNKNOWN_KEY)).toBeNull()
  })

  it('should store data for an element with a given key and return it', () => {
    const data = { ...TEST_DATA }

    Data.set(div, TEST_KEY, data)

    expect(Data.get(div, TEST_KEY)).toEqual(data)
  })

  it('should overwrite data if something is already stored', () => {
    const data = { ...TEST_DATA }
    const copy = { ...data }

    Data.set(div, TEST_KEY, data)
    Data.set(div, TEST_KEY, copy)

    expect(Data.get(div, TEST_KEY)).not.toBe(data)
    expect(Data.get(div, TEST_KEY)).toBe(copy)
  })

  it('should do nothing when an element has nothing stored', () => {
    Data.remove(div, TEST_KEY)
  })

  it('should remove nothing for an unknown key', () => {
    const data = { ...TEST_DATA }

    Data.set(div, TEST_KEY, data)
    Data.remove(div, UNKNOWN_KEY)

    expect(Data.get(div, TEST_KEY)).toEqual(data)
  })

  it('should remove data for a given key', () => {
    const data = { ...TEST_DATA }

    Data.set(div, TEST_KEY, data)
    Data.remove(div, TEST_KEY)

    expect(Data.get(div, TEST_KEY)).toBeNull()
  })

  it('should console.error if called with multiple keys', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    Data.set(div, TEST_KEY, { ...TEST_DATA })
    Data.set(div, UNKNOWN_KEY, { ...TEST_DATA })

    expect(spy).toHaveBeenCalled()
    expect(Data.get(div, UNKNOWN_KEY)).toBeNull()

    spy.mockRestore()
  })

  it('should include the bound key name in error message', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    Data.set(div, TEST_KEY, { ...TEST_DATA })
    Data.set(div, UNKNOWN_KEY, { ...TEST_DATA })

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(TEST_KEY)
    )

    spy.mockRestore()
  })

  it('should not modify the first instance when a second key is rejected', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const original = { ...TEST_DATA }

    Data.set(div, TEST_KEY, original)
    Data.set(div, UNKNOWN_KEY, { other: true })

    expect(Data.get(div, TEST_KEY)).toBe(original)

    spy.mockRestore()
  })

  it('should handle set-remove-set cycle on the same element', () => {
    const first = { v: 1 }
    const second = { v: 2 }

    Data.set(div, TEST_KEY, first)
    Data.remove(div, TEST_KEY)
    Data.set(div, TEST_KEY, second)

    expect(Data.get(div, TEST_KEY)).toBe(second)
  })

  it('should handle multiple elements independently', () => {
    const div2 = document.createElement('div')
    const data1 = { el: 1 }
    const data2 = { el: 2 }

    Data.set(div, TEST_KEY, data1)
    Data.set(div2, TEST_KEY, data2)

    expect(Data.get(div, TEST_KEY)).toBe(data1)
    expect(Data.get(div2, TEST_KEY)).toBe(data2)

    Data.remove(div, TEST_KEY)

    expect(Data.get(div, TEST_KEY)).toBeNull()
    expect(Data.get(div2, TEST_KEY)).toBe(data2)

    Data.remove(div2, TEST_KEY)
  })

  it('should return null for an element that was never stored', () => {
    const fresh = document.createElement('span')

    expect(Data.get(fresh, TEST_KEY)).toBeNull()
  })

  it('should clean up element entry when last key is removed', () => {
    Data.set(div, TEST_KEY, { ...TEST_DATA })
    Data.remove(div, TEST_KEY)

    Data.set(div, UNKNOWN_KEY, { other: true })
    expect(Data.get(div, UNKNOWN_KEY)).toEqual({ other: true })

    Data.remove(div, UNKNOWN_KEY)
  })

  it('should allow overwriting the same key multiple times', () => {
    const a = { v: 'a' }
    const b = { v: 'b' }
    const c = { v: 'c' }

    Data.set(div, TEST_KEY, a)
    Data.set(div, TEST_KEY, b)
    Data.set(div, TEST_KEY, c)

    expect(Data.get(div, TEST_KEY)).toBe(c)
  })

  it('should return the exact reference that was stored', () => {
    const ref = { unique: Symbol('test') }

    Data.set(div, TEST_KEY, ref)

    expect(Data.get(div, TEST_KEY)).toBe(ref)
  })
})
