import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const entry = path.resolve(__dirname, '../js/demo.ts')

export default createViteConfig({
	entry,
	name: 'demo',
	fileName: () => 'demo.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/preview/js'),
	banner: getBanner('Demo'),
	minify: false,
})
