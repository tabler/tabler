import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper.mjs'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MINIFY = process.env.MINIFY === 'true'
const bannerText = getBanner('Demo')

export default createViteConfig({
	entry: path.resolve(__dirname, '../js/demo.js'),
	name: 'demo',
	fileName: () => MINIFY ? 'demo.min.js' : 'demo.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/preview/js'),
	banner: bannerText,
	minify: MINIFY ? 'terser' : false
})

