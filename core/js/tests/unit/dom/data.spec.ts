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
})
