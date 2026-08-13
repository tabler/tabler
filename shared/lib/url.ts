// URL helpers shared by navigation components.

/** True for absolute http(s) urls — used to decide between raw and relative hrefs. */
export function isExternal(url?: string): boolean {
  return !!url && /^https?:\/\//.test(url)
}
