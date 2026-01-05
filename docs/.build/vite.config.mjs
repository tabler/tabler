import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, '../js/docs.js'),
			name: 'docs',
			fileName: () => 'docs.js',
			formats: ['es']
		},
		outDir: path.resolve(__dirname, '../dist/js'),
		emptyOutDir: false,
		sourcemap: true,
		rollupOptions: {
			output: {
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

