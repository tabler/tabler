import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const bannerText = getBanner('Demo')

const entryPath = path.resolve(__dirname, '../js/demo')
const entry = `${entryPath}.ts`

export default createViteConfig({
	entry: entry,
	name: 'demo',
	fileName: () => 'demo.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/preview/js'),
	banner: bannerText,
	minify: false
})

