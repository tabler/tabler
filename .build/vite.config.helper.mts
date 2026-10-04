import path from 'node:path'
import { defineConfig, type UserConfig } from 'vite'

interface CreateViteConfigOptions {
  entry: string
  name?: string
  fileName: string | ((format: string) => string)
  formats: ('es' | 'umd' | 'iife' | 'cjs')[]
  outDir: string
  banner?: string
  minify?: boolean | 'esbuild'
  /** UMD only: add the exports to an existing global of the same name instead of replacing it */
  extend?: boolean
}

/**
 * Creates a Vite configuration for building libraries
 */
export function createViteConfig({ entry, name, fileName, formats, outDir, banner, minify = false, extend = false }: CreateViteConfigOptions): UserConfig {
  // Vite 8 (Rolldown) always emits const bindings and no longer accepts the
  // Rollup-only generatedCode.constBindings option
  const rollupOutput: { banner?: string; extend?: boolean } = {}

  if (banner) {
    rollupOutput.banner = banner
  }

  if (extend) {
    rollupOutput.extend = true
  }

  const config: UserConfig = {
    // Library builds: never copy <root>/public into outDir (see copy-assets.ts).
    publicDir: false,
    build: {
      lib: {
        entry: path.resolve(entry),
        name: name,
        fileName: typeof fileName === 'function' ? fileName : () => fileName,
        formats: formats,
      },
      outDir: path.resolve(outDir),
      emptyOutDir: false,
      sourcemap: true,
      rollupOptions: {
        output: rollupOutput,
      },
      target: 'es2022',
      minify: minify,
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  }

  return defineConfig(config)
}
