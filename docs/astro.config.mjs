// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { satteri } from '@astrojs/markdown-satteri'
import { fileURLToPath } from 'node:url'

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.tabler.io',
  // pages live at the package root (./pages) — content-first layout; all
  // components/lib/data are shared (see the @shared alias)
  srcDir: '.',
  server: {
    port: 3010,
    // bind on all interfaces so the dev server is reachable from Docker
    // port mappings and other devices on the local network
    host: true,
  },
  vite: {
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
        // Astro components/lib shared with preview (single source of truth)
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
        '@ui': fileURLToPath(new URL('../shared/ui', import.meta.url)),
        // docs-only components (Example, DocsMenu, …)
        '@components': fileURLToPath(new URL('./components', import.meta.url)),
        // this package's pages dir — used by @shared/lib/docs-children's glob
        '@pages': fileURLToPath(new URL('./pages', import.meta.url)),
      },
    },
  },
  integrations: [mdx()],
  markdown: {
    // No typographic quote rewriting.
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
})
