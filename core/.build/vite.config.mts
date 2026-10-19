import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper.mts'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const baseName = process.env.BASE_NAME || 'tabler'
const entryFile = baseName
// Some entries add to a global instead of creating their own, so they can be
// loaded next to the main bundle:
// - `tabler-map` and `tabler-vector-map` are add-ons, their UMD builds extend
//   the `tabler` global;
// - `maps/*` are map files, each adds its map to the `tablerVectorMaps` global.
const isMap = baseName.startsWith('maps/')
const isAddon = baseName === 'tabler-map' || baseName === 'tabler-vector-map'
const libraryName = isMap ? 'tablerVectorMaps' : isAddon ? 'tabler' : baseName

const bannerText = getBanner()

const entryPath = path.resolve(__dirname, `../js/${entryFile}`)
const entry = `${entryPath}.ts`

export default createViteConfig({
  entry: entry,
  name: libraryName,
  fileName: (format) => {
    const esmSuffix = format === 'es' ? '.esm' : ''
    return `${baseName}${esmSuffix}.js`
  },
  formats: ['es', 'umd'],
  outDir: path.resolve(__dirname, '../dist/js'),
  banner: bannerText,
  minify: false,
  extend: isMap || isAddon,
})
