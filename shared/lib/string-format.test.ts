import { describe, expect, it } from 'vitest'
import { capitalize, firstLetters, formatNumber, millisecondsToMinutes, parseCurrency, parsePercentage, pathSlug, roundTo, slugifyWord, sortBy, ucFirst } from './string-format'
import { requireIndex } from './array'

describe('capitalize', () => {
  it('uppercases the first char and lowercases the rest', () => {
    expect(capitalize('DISABLED')).toBe('Disabled')
    expect(capitalize('checkbox input')).toBe('Checkbox input')
  })
})

describe('ucFirst', () => {
  it('uppercases only the first char, leaving the rest untouched', () => {
    expect(ucFirst('default')).toBe('Default')
    expect(ucFirst('dark')).toBe('Dark')
  })
})

describe('firstLetters', () => {
  it('takes the first letter of every word', () => {
    expect(firstLetters('Paweł Kuna')).toBe('PK')
  })

  it('handles undefined/empty input', () => {
    expect(firstLetters('')).toBe('')
    expect(firstLetters(undefined as unknown as string)).toBe('')
  })
})

describe('formatNumber', () => {
  it('adds thousands separators', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
    expect(formatNumber(42)).toBe('42')
  })
})

describe('slugifyWord', () => {
  it('lowercases the input', () => {
    expect(slugifyWord('Settings')).toBe('settings')
  })
})

describe('pathSlug', () => {
  it('strips slashes and joins segments', () => {
    expect(pathSlug('/ui/getting-started/')).toBe('uigetting-started')
  })
})

describe('parsePercentage', () => {
  it('strips a trailing "%"', () => {
    expect(parsePercentage('42%')).toBe('42')
  })

  it('defaults to "0" when empty or undefined', () => {
    expect(parsePercentage(undefined)).toBe('0')
    expect(parsePercentage('')).toBe('0')
  })

  it('passes through numeric input', () => {
    expect(parsePercentage(75)).toBe('75')
  })
})

describe('millisecondsToMinutes', () => {
  it('formats sub-minute durations', () => {
    expect(millisecondsToMinutes(45000)).toBe('0:45')
  })

  it('pads seconds under 10', () => {
    expect(millisecondsToMinutes(65000)).toBe('1:05')
  })

  it('formats multi-minute durations', () => {
    expect(millisecondsToMinutes(225000)).toBe('3:45')
  })
})

describe('parseCurrency', () => {
  it('strips "$" and "," before parsing', () => {
    expect(parseCurrency('$23,077.05')).toBeCloseTo(23077.05)
  })
})

describe('roundTo', () => {
  it('rounds to the given number of digits, dropping trailing zeros', () => {
    expect(roundTo(1 / 3, 4)).toBe(0.3333)
    expect(roundTo(2, 8)).toBe(2)
  })
})

describe('sortBy', () => {
  it('sorts by the given key using case-sensitive string comparison', () => {
    const people = [{ last_name: 'Smith' }, { last_name: 'Adams' }, { last_name: 'jones' }]
    expect(sortBy(people, (p) => p.last_name).map((p) => p.last_name)).toEqual(['Adams', 'Smith', 'jones'])
  })

  it('does not mutate the input array', () => {
    const people = [{ last_name: 'Smith' }, { last_name: 'Adams' }]
    sortBy(people, (p) => p.last_name)
    expect(requireIndex(people, 0).last_name).toBe('Smith')
  })
})
