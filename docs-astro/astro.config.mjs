// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { fileURLToPath } from 'node:url'

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.tabler.io',
  // pages live at the package root (./pages) — content-first layout like the
  // Eleventy docs; components/lib/data stay under ./src (see @pkg alias)
  srcDir: '.',
  vite: {
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
        // Astro components/lib shared with preview-astro (single source of truth)
        '@shared': fileURLToPath(new URL('../shared/astro', import.meta.url)),
        // this package's src — used FROM shared code for the one deliberately
        // package-specific file (components/InlineScript.astro)
        '@pkg': fileURLToPath(new URL('./src', import.meta.url)),
        // this package's pages dir — used by @shared/lib/docs-children's glob
        '@pages': fileURLToPath(new URL('./pages', import.meta.url)),
      },
    },
  },
  integrations: [mdx()],
  markdown: {
    smartypants: false,
    shikiConfig: {
      theme: 'github-dark',
    },
  },
})
