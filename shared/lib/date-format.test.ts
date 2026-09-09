import { describe, expect, it } from 'vitest'
import { formatCommitDate, formatShortDate, formatLongDate, formatUtcTimestamp, toUnixSeconds } from './date-format'

describe('formatCommitDate', () => {
  it('reformats a full timestamp to "D Mon YYYY"', () => {
    expect(formatCommitDate('Thu Nov 28 08:48:33 2025 +0100')).toBe('28 Nov 2025')
  })

  it('returns the input unchanged when it does not match the expected shape', () => {
    expect(formatCommitDate('not a date')).toBe('not a date')
  })
})

describe('toUnixSeconds', () => {
  it('shifts the wall-clock epoch by the local timezone offset', () => {
    const date = new Date(Date.UTC(2024, 0, 1, 0, 0, 0))
    expect(toUnixSeconds(date)).toBe(Math.floor(date.getTime() / 1000) + date.getTimezoneOffset() * 60)
  })
})

describe('formatLongDate', () => {
  it('formats a date using its UTC components', () => {
    const date = new Date(Date.UTC(2025, 10, 28))
    expect(formatLongDate(date)).toBe('November 28, 2025')
  })

  it('pads single-digit days', () => {
    const date = new Date(Date.UTC(2025, 0, 5))
    expect(formatLongDate(date)).toBe('January 05, 2025')
  })
})

describe('formatUtcTimestamp', () => {
  it('formats a date as "YYYY-MM-DD HH:MM +0000"', () => {
    const date = new Date(Date.UTC(2025, 10, 28, 8, 5))
    expect(formatUtcTimestamp(date)).toBe('2025-11-28 08:05 +0000')
  })
})

describe('formatShortDate', () => {
  it('formats the UTC day and short month', () => {
    expect(formatShortDate(new Date('2025-08-27T11:49:00Z'))).toBe('27 Aug')
    expect(formatShortDate(new Date('2025-01-01T00:30:00Z'))).toBe('1 Jan')
  })
})
