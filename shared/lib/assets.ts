// Where shared demo assets (shared/static → <site>/static) are served from.
// The default is relative, so the downloadable preview package keeps working
// when opened from any folder. Apps with nested routes override the base with
// a vite `define` in their astro config — docs sets TABLER_STATIC_BASE to
// '/static' (see docs/astro.config.mjs).
declare const TABLER_STATIC_BASE: string | undefined

const base = typeof TABLER_STATIC_BASE === 'string' ? TABLER_STATIC_BASE : './static'

/** Url of a file from shared/static, e.g. staticPath('photos/cat.jpg'). */
export const staticPath = (file: string): string => `${base}/${file.replace(/^\/+/, '')}`

/**
 * Prefix for urls that already contain the static/ segment ("." for the
 * relative default, "" when the base is absolute) — see Avatar's `base` prop.
 */
export const assetRoot = base.replace(/\/static$/, '')
