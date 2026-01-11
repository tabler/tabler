import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const entryPath = path.resolve(__dirname, '../js/docs')
const entry = `${entryPath}.ts`

export default createViteConfig({
	entry: entry,
	name: 'docs',
	fileName: () => 'docs.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/js'),
	banner: undefined,
	minify: false
})

