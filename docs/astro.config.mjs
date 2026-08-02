// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { satteri } from '@astrojs/markdown-satteri'
import { fileURLToPath } from 'node:url'
import { copyAssets } from '../.build/copy-assets'

/** @param {string} p */
const path = p => fileURLToPath(new URL(p, import.meta.url))

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
        // docs-only layouts (DocsLayout + the MDX adapter, referenced by `layout:` front matter)
        '@layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
        // this package's pages dir — used by @shared/lib/docs-children's glob
        '@pages': fileURLToPath(new URL('./pages', import.meta.url)),
      },
    },
  },
  integrations: [
    copyAssets({
      repo: path('..'),
      publicDir: path('./public'),
      copies: [
        {
          from: path('./assets'),
          to: path('./public'),
          label: '@tabler/docs',
          requiredFile: path('./assets/css/docs.css'),
        },
        {
          from: path('../core/dist'),
          to: path('./public/dist'),
          label: '@tabler/core',
          requiredFile: path('../core/dist/css/tabler.css'),
        },
        {
          // Sourced from preview's isolated tmp-assets/ (not dist/) — dist/ is Astro's
          // own build output there, and reading demo assets from it caused unbounded
          // growth across repeated builds. See preview/.build/vite.config.mts.
          from: path('../preview/tmp-assets'),
          to: path('./public/preview'),
          label: '@tabler/preview',
          requiredFile: path('../preview/tmp-assets/css/demo.css'),
        },
        {
          from: path('../shared/static'),
          to: path('./public/static'),
          label: 'shared assets',
          requiredFile: path('../shared/static/logo.svg'),
        },
      ],
      syncDirs: [
        { from: path('../core/dist'), to: path('./public/dist') },
        { from: path('../preview/tmp-assets'), to: path('./public/preview') },
        { from: path('./assets'), to: path('./public') },
        { from: path('../shared/static'), to: path('./public/static') },
      ],
    }),
    mdx(),
  ],
  markdown: {
    // No typographic quote rewriting.
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
})
