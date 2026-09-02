// Inline-SVG preparation helpers: filler-path strip, a11y attribute/class swap
// and the illustration attribute rewrites.
import icons from '../data/icons.json'
import freeIllustrations from '../data/free-illustrations.json'

/** Names of the illustrations bundled in @data/free-illustrations.json. */
export type FreeIllustration = keyof typeof freeIllustrations.autodark

/** How an illustration is named in markup — with or without the ".svg" suffix. */
export type IllustrationImage = FreeIllustration | `${FreeIllustration}.svg`

/** Source SVG of a bundled illustration, in its auto-dark variant. */
export function freeIllustrationSource(image: IllustrationImage): string {
  return freeIllustrations.autodark[image.replaceAll('.svg', '') as FreeIllustration] ?? ''
}

type IconRecord = { svg: Record<string, string | null | undefined> }

const FILLER_PATH = /<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/

/**
 * Processed inline SVG for a Tabler icon, or undefined when the icon is not
 * in @data/icons.json. The original class attribute is replaced with
 * aria-hidden="true" focusable="false" and the given classes.
 */
export function iconSvg(name: string, { filled = false, classes = 'icon' }: { filled?: boolean | undefined; classes?: string | undefined } = {}): string | undefined {
  const icon = (icons as unknown as Record<string, IconRecord>)[name]
  if (!icon) return undefined
  let svg = icon.svg?.[filled ? 'filled' : 'outline'] ?? ''
  svg = svg.replace(FILLER_PATH, '')
  svg = svg.replace(/class="[^"]+"/, `aria-hidden="true" focusable="false" class="${classes}"`)
  return svg
}

/** "Download SVG icon" comment emitted before inline icons in demo markup. */
export function iconSourceComment(name: string): string {
  return `<!-- Download SVG icon from http://tabler.io/icons/icon/${name} -->`
}

/** Rewrites a free-illustration SVG source: injects classes and/or swaps the fixed 800x600 size for a height. */
export function illustrationSvg(source: string, { classes, height }: { classes?: string; height?: number | string } = {}): string {
  let svg = classes ? source.replaceAll('<svg ', `<svg class="${classes}" `) : source
  if (height !== undefined) svg = svg.replaceAll('width="800" height="600"', `height="${height}"`)
  return svg
}
