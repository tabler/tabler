/**
 * Helpers kept only so that projects written for an older 1.x release keep
 * working. They are exported as the `tabler` namespace: `tabler.tabler.getColor()`
 * from the bundle, `import { tabler } from '@tabler/core'` from the module.
 *
 * Removed in 2.0, together with this file. Read the custom property yourself,
 * and mix the opacity in with `color-mix()`.
 */

export const prefix: string = 'tblr-'

export const hexToRgba = (hex: string, opacity: number): string | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? `rgba(${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}, ${opacity})` : null
}

export const getColor = (color: string, opacity: number = 1): string | null => {
  const c = getComputedStyle(document.body).getPropertyValue(`--${prefix}${color}`).trim()

  if (opacity === 1) {
    return c
  }

  // The palette is written in `oklch()` since 1.6, which `hexToRgba()` cannot
  // read, so anything that is not a hex colour gets its opacity from the browser.
  return hexToRgba(c, opacity) ?? (c ? `color-mix(in srgb, ${c} ${opacity * 100}%, transparent)` : null)
}
