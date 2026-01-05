import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default createViteConfig({
	entry: path.resolve(__dirname, '../js/docs.js'),
	name: 'docs',
	fileName: () => 'docs.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/js'),
	banner: undefined
})

