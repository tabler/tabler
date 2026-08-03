import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pkgJson = path.join(__dirname, '../../core/package.json')
const pkg = JSON.parse(readFileSync(pkgJson, 'utf8'))

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
 * Tabler${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
 * Copyright 2018-${year} The Tabler Authors
 * Copyright 2018-${year} codecalm.net Paweł Kuna
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */`
}

// Plugin entrypoint → the name shown in its banner. The `.rtl` and `.min`
// variants of a file share the entrypoint's name; anything without an entry
// here (tabler, tabler-props, tabler-themes) gets the plain "Tabler" banner.
const plugins = {
  'tabler-flags': 'Flags',
  'tabler-marketing': 'Marketing',
  'tabler-payments': 'Payments',
  'tabler-socials': 'Socials',
  'tabler-vendors': 'Vendors',
}

// e.g. dist/css/tabler-flags.rtl.min.css → the "Tabler Flags" banner.
export function getBannerForFile(file) {
  const name = path.basename(file).replace(/(\.rtl)?(\.min)?\.css$/, '')

  return getBanner(plugins[name])
}

// Inserts the banner right after the `@charset` rule when there is one — it
// must stay the very first thing in the file — otherwise at the top.
export function addBanner(css, file) {
  const charset = /^(@charset ['"][a-zA-Z0-9-]+['"];?)\n?/i
  const banner = getBannerForFile(file)

  return charset.test(css) ? css.replace(charset, (_match, rule) => `${rule}\n${banner}\n`) : `${banner}\n${css}`
}

export default getBanner
