// String/number formatting helpers used by the demo data across components.
import { site } from './site'

/** Builds a docs.tabler.io URL from a path, e.g. "/ui/components/button#ghost-buttons". */
export function getDocsUrl(path: string): string {
  return `${site.docsUrl}${path}`
}

/** Uppercases the first char, lowercases the rest. */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

/** Uppercases only the first char, leaves the rest untouched. */
export function ucFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** Takes the first letter of each space-separated word (e.g. avatar initials). */
export function firstLetters(s: string): string {
  return (s || '')
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
}

/** Adds thousands separators to a number. */
export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** Lowercases and collapses non-alphanumeric runs into single dashes, trimming edge dashes (e.g. "Create your URL" -> "create-your-url"). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Strips slashes and joins segments: "/ui/getting-started/" -> "uigetting-started". */
export function pathSlug(u: string): string {
  return u.split('/').filter(Boolean).join('')
}

/** Formats a millisecond duration as "M:SS". */
export function millisecondsToMinutes(value: number): string {
  const minutes = Math.floor(value / 60000)
  const seconds = ((value % 60000) / 1000).toFixed(0)
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
}

/** Parses a "$1,234.56"-style currency string into a plain number. */
export function parseCurrency(s: string): number {
  return parseFloat(s.replace(/[$,]/g, ''))
}

/** Rounds to the given number of decimal digits, dropping trailing zeros. */
export function roundTo(x: number, digits = 8): number {
  return parseFloat(x.toFixed(digits))
}

/** Sorts items by a case-sensitive string key, without mutating the input array. */
export function sortBy<T>(items: T[], key: (item: T) => string): T[] {
  return [...items].sort((a, b) => {
    const l = key(a)
    const r = key(b)
    return l < r ? -1 : l > r ? 1 : 0
  })
}
