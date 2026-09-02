import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const entry = path.resolve(__dirname, '../js/demo.ts')

// Build mode (default): tmp-assets/js, copied into public/preview by copy-assets.mjs.
// Outside dist/ (Astro's build output) on purpose: dist/ is copied from public/ on
// every `astro build`, so an outDir inside dist/ would get re-seeded with whatever
// public/ already contained and re-copied back on the next `pnpm run assets`,
// growing without bound across repeated builds (see copy-assets.mjs). Not
// dot-prefixed either — terser's CLI --source-map option parser chokes on a
// leading-dot path segment (e.g. ".build/out/...") with a spurious "not a supported
// option" error; a plain relative dir avoids that entirely.
//
// Watch mode (pnpm run watch:js, via PREVIEW_JS_OUT_DIR): writes straight to
// public/preview/js. `astro dev` never touches public/, so there's no dist/
// collision to avoid there, and this lets edits show up on refresh without an
// extra copy-assets.mjs pass.
const outDir = process.env.PREVIEW_JS_OUT_DIR ? path.resolve(__dirname, '..', process.env.PREVIEW_JS_OUT_DIR) : path.resolve(__dirname, '../tmp-assets/js')

export default createViteConfig({
  entry,
  name: 'demo',
  fileName: () => 'demo.js',
  formats: ['es'],
  outDir,
  banner: getBanner('Demo'),
  minify: false,
})
