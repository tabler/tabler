// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
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
    // InlineScript.astro emits scripts inline at the component site —
    // docs pages have no <PageScripts /> drain
    define: {
      'import.meta.env.INLINE_PAGE_SCRIPTS': 'true',
    },
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
        // Astro components/lib shared with preview-astro (single source of truth)
        '@shared': fileURLToPath(new URL('../shared/astro', import.meta.url)),
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
