import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { createViteConfig } from '../../.build/vite.config.helper'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MINIFY = process.env.MINIFY === 'true'
const bannerText = getBanner('Demo')

// Try .ts first, fallback to .js for gradual migration
const entryPath = path.resolve(__dirname, '../js/demo')
const entry = existsSync(`${entryPath}.ts`) ? `${entryPath}.ts` : `${entryPath}.js`

export default createViteConfig({
	entry: entry,
	name: 'demo',
	fileName: () => MINIFY ? 'demo.min.js' : 'demo.js',
	formats: ['es'],
	outDir: path.resolve(__dirname, '../dist/preview/js'),
	banner: bannerText,
	minify: MINIFY
})

