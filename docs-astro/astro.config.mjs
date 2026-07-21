// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { fileURLToPath } from 'node:url'

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.tabler.io',
  vite: {
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
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
