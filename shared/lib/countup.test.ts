import { describe, expect, it } from 'vitest'
import { countupOptions } from './countup'

describe('countupOptions', () => {
  it('turns a currency into a prefix', () => {
    expect(countupOptions('$2,847')).toEqual({ prefix: '$' })
  })

  it('turns a unit into a suffix and counts the decimals', () => {
    expect(countupOptions('42.7 hrs')).toEqual({ suffix: ' hrs', decimalPlaces: 1 })
    expect(countupOptions('18.4%')).toEqual({ suffix: '%', decimalPlaces: 1 })
  })

  it('returns an empty object for a plain integer', () => {
    expect(countupOptions('30000')).toEqual({})
  })

  it('keeps a negative sign inside the number', () => {
    expect(countupOptions('-12.5%')).toEqual({ suffix: '%', decimalPlaces: 1 })
  })

  it('recognizes an h:mm time', () => {
    expect(countupOptions('3:28 hrs')).toEqual({ format: 'time', suffix: ' hrs' })
    expect(countupOptions('~12:05')).toEqual({ format: 'time', prefix: '~' })
  })

  it('returns null when there is no number', () => {
    expect(countupOptions('soon')).toBeNull()
    expect(countupOptions('')).toBeNull()
  })
})
