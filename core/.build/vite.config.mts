import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const baseName = process.env.BASE_NAME || 'tabler'
const entryFile = baseName
const libraryName = baseName

const bannerText = getBanner()

const entryPath = path.resolve(__dirname, `../js/${entryFile}`)
const entry = `${entryPath}.ts`

export default createViteConfig({
  entry: entry,
  name: libraryName,
  // ESM only (Tabler 2.0, like Bootstrap v6): one artifact per entry, no `.esm` suffix.
  fileName: () => `${baseName}.js`,
  formats: ['es'],
  outDir: path.resolve(__dirname, '../dist/js'),
  banner: bannerText,
  minify: false,
})
