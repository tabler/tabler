import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper.mjs'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const bannerText = getBanner('Demo')

export default createViteConfig({
	entry: path.resolve(__dirname, '../js/demo.js'),
	name: 'demo',
	fileName: () => 'demo.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/preview/js'),
	banner: bannerText
})

