import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

/**
 * Creates a Vite configuration for building libraries
 * @param {Object} options - Configuration options
 * @param {string} options.entry - Path to the entry file
 * @param {string|undefined} options.name - Library name (undefined for ESM)
 * @param {string|Function} options.fileName - Output file name or function returning it
 * @param {string[]} options.formats - Output formats (e.g., ['es'], ['umd'], ['es', 'umd'])
 * @param {string} options.outDir - Output directory path
 * @param {string|undefined} options.banner - Optional banner text to add to output
 * @returns {import('vite').UserConfig} Vite configuration
 */
export function createViteConfig({
	entry,
	name,
	fileName,
	formats,
	outDir,
	banner
}) {
	const rollupOutput = {
		generatedCode: {
			constBindings: true
		}
	}

	// Add banner if provided
	if (banner) {
		rollupOutput.banner = banner
	}

	return defineConfig({
		build: {
			lib: {
				entry: path.resolve(entry),
				name: name,
				fileName: typeof fileName === 'function' ? fileName : () => fileName,
				formats: formats
			},
			outDir: path.resolve(outDir),
			emptyOutDir: false,
			sourcemap: true,
			rollupOptions: {
				output: rollupOutput
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
}

