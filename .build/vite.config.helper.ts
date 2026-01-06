import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type UserConfig } from 'vite'

interface CreateViteConfigOptions {
	entry: string
	name?: string
	fileName: string | ((format: string) => string)
	formats: ('es' | 'umd' | 'iife' | 'cjs')[]
	outDir: string
	banner?: string
	minify?: boolean | 'esbuild'
}

/**
 * Creates a Vite configuration for building libraries
 */
export function createViteConfig({
	entry,
	name,
	fileName,
	formats,
	outDir,
	banner,
	minify = false
}: CreateViteConfigOptions): UserConfig {
	const rollupOutput: {
		generatedCode: {
			constBindings: boolean
		}
		banner?: string
	} = {
		generatedCode: {
			constBindings: true
		}
	}

	// Add banner if provided
	if (banner) {
		rollupOutput.banner = banner
	}

	const config: UserConfig = {
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
			minify: minify
		},
		define: {
			'process.env.NODE_ENV': '"production"'
		},
		esbuild: {
			target: 'es2015',
			tsconfigRaw: {
				compilerOptions: {
					module: 'ES2020',
					target: 'ES2015'
				}
			}
		}
	}

	return defineConfig(config)
}

