import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MINIFY = process.env.MINIFY === 'true'

export default createViteConfig({
	entry: path.resolve(__dirname, '../js/docs.js'),
	name: 'docs',
	fileName: () => MINIFY ? 'docs.min.js' : 'docs.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/js'),
	banner: undefined,
	minify: MINIFY
})

