// @ts-check
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import { copyAssets } from '../.build/copy-assets'

/** @param {string} p */
const path = (p) => fileURLToPath(new URL(p, import.meta.url))

// https://astro.build/config
export default defineConfig({
  // pages live at the package root (./pages) — components/lib/data are shared
  // (see the @shared alias)
  srcDir: '.',
  server: {
    port: 3020,
    // bind on all interfaces so the dev server is reachable from Docker
    // port mappings and other devices on the local network
    host: true,
  },
  vite: {
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
        '@ui': fileURLToPath(new URL('../shared/ui', import.meta.url)),
        '@components': fileURLToPath(new URL('../shared/components', import.meta.url)),
      },
    },
  },
  build: {
    // Emit button.html instead of button/index.html — a stable, predictable
    // URL per component for the screenshot tool to iterate over.
    format: 'file',
  },
  compressHTML: false,
  integrations: [
    copyAssets({
      repo: path('..'),
      publicDir: path('./public'),
      copies: [
        {
          // @tabler/core dist (css/js/fonts/img/libs).
          // Fallback keeps current assets if core rebuilds dist mid-copy in turbo dev.
          from: path('./node_modules/@tabler/core/dist'),
          to: path('./public/dist'),
          label: '@tabler/core',
          allowDestinationFallback: true,
        },
        {
          // static assets referenced by demo data (avatar photos, brand svgs...).
          from: path('../shared/static'),
          to: path('./public/static'),
          label: 'shared assets',
        },
        { from: path('./assets/favicon.ico'), to: path('./public/favicon.ico'), label: '@tabler/screenshots' },
        { from: path('./assets/favicon-dev.ico'), to: path('./public/favicon-dev.ico'), label: '@tabler/screenshots' },
      ],
      // Watch the real core/dist, not the node_modules symlink the startup copy
      // reads from — same directory.
      syncDirs: [
        { from: path('../core/dist'), to: path('./public/dist') },
        { from: path('../shared/static'), to: path('./public/static') },
      ],
    }),
  ],
})
