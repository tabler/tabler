import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ESM = process.env.ESM === 'true'
const THEME = process.env.THEME === 'true'

const destinationFile = `tabler${THEME ? '-theme' : ''}${ESM ? '.esm' : ''}`
const entryFile = `tabler${THEME ? '-theme' : ''}`
const libraryName = `tabler${THEME ? '-theme' : ''}`

const bannerText = getBanner()

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, `../js/${entryFile}.js`),
			name: ESM ? undefined : libraryName,
			fileName: () => `${destinationFile}.js`,
			formats: [ESM ? 'es' : 'umd']
		},
		outDir: path.resolve(__dirname, '../dist/js'),
		emptyOutDir: false,
		sourcemap: true,
		rollupOptions: {
			output: {
				banner: bannerText,
				generatedCode: {
					constBindings: true
				}
			}
		},
		target: 'es2015',
		minify: false // Minification is done by terser in a separate step
	},
	define: {
		'process.env.NODE_ENV': '"production"'
	},
	esbuild: {
		target: 'es2015'
	}
})

