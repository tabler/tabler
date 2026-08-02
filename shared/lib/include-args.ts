/**
 * Returns how many of the given prop keys are explicitly set (not undefined).
 * Some components use this count as a class suffix when `size` (or similar) is
 * omitted, e.g. `spinner-border-2` or `nav-2`.
 */
export function includeArgCount(props: Record<string, unknown>, keys: readonly string[]): number {
  return keys.filter((k) => props[k] !== undefined).length
}
