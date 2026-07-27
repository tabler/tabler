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
    // markdown-it in Eleventy did not produce typographic quotes — neither do we
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
})
