import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper.mjs'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ESM = process.env.ESM === 'true'
const THEME = process.env.THEME === 'true'

const destinationFile = `tabler${THEME ? '-theme' : ''}${ESM ? '.esm' : ''}`
const entryFile = `tabler${THEME ? '-theme' : ''}`
const libraryName = `tabler${THEME ? '-theme' : ''}`

const bannerText = getBanner()

export default createViteConfig({
	entry: path.resolve(__dirname, `../js/${entryFile}.js`),
	name: ESM ? undefined : libraryName,
	fileName: () => `${destinationFile}.js`,
	formats: [ESM ? 'es' : 'umd'],
	outDir: path.resolve(__dirname, '../dist/js'),
	banner: bannerText
})

