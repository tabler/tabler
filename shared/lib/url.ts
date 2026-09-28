// URL helpers shared by navigation components.

/** True for absolute http(s) urls — used to decide between raw and relative hrefs. */
export function isExternal(url?: string): boolean {
  return !!url && /^https?:\/\//.test(url)
}

/**
 * Relative path from a page back to the site root: "." for a top-level page, ".." one level deep.
 * Pages are built with `format: 'file'`, so "/marketing" (or "/marketing.html") is a root file.
 */
export function relativeBase(pathname: string): string {
  const depth = pathname.split('/').filter(Boolean).length - 1
  return depth > 0 ? Array.from({ length: depth }, () => '..').join('/') : '.'
}
