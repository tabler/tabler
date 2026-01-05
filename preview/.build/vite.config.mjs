import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import getBanner from '../../shared/banner/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const bannerText = getBanner('Demo')

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, '../js/demo.js'),
			name: 'demo',
			fileName: () => 'demo.js',
			formats: ['es']
		},
		outDir: path.resolve(__dirname, '../dist/preview/js'),
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

