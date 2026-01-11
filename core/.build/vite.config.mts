import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ESM = process.env.ESM === 'true'
const THEME = process.env.THEME === 'true'

const MINIFY = process.env.MINIFY === 'true'
const destinationFile = `tabler${THEME ? '-theme' : ''}${ESM ? '.esm' : ''}`
const entryFile = `tabler${THEME ? '-theme' : ''}`
const libraryName = `tabler${THEME ? '-theme' : ''}`

const bannerText = getBanner()

// Try .ts first, fallback to .js for gradual migration
const entryPath = path.resolve(__dirname, `../js/${entryFile}`)
const entry = existsSync(`${entryPath}.ts`) ? `${entryPath}.ts` : `${entryPath}.js`

export default createViteConfig({
	entry: entry,
	name: ESM ? undefined : libraryName,
	fileName: () => MINIFY ? `${destinationFile}.min.js` : `${destinationFile}.js`,
	formats: [ESM ? 'es' : 'umd'],
	outDir: path.resolve(__dirname, '../dist/js'),
	banner: bannerText,
	minify: MINIFY ? true : false
})

