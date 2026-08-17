// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { satteri } from '@astrojs/markdown-satteri'
import beautify from 'js-beautify'
import { globSync, statSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'
// Imported statically: a dynamic import() inside the hook below would go through
// Vite's module runner, which is already closed by the time astro:build:done runs
// (the config is bundled by vite-node because it imports a .ts module).
import prettier from 'prettier'
import { copyAssets } from '../.build/copy-assets'

/** @param {string} p */
const path = (p) => fileURLToPath(new URL(p, import.meta.url))

/**
 * After build, format page HTML with prettier (users copy it 1:1).
 * The formatting itself happens in .build/prettify-html-worker.mjs — see there
 * for why it is worth spreading over threads.
 * @returns {import('astro').AstroIntegration}
 */
function prettifyHtml() {
  return {
    name: 'prettify-html',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir)
        // dist/preview/ and dist/dist/ are copy-assets.mjs's copies of public/{preview,dist}
        // (demo css/js and @tabler/core's dist, including vendored libs) — not pages, and
        // some vendored libs ship their own malformed docs/*.html that trips the parser below.
        /** @param {string} file */
        const isVendorCopy = (file) => file.includes(`${outDir}preview/`) || file.includes(`${outDir}dist/`)
        const files = globSync(`${outDir}**/*.html`, { exclude: isVendorCopy })
        const firstFile = files[0]
        if (firstFile === undefined) return

        // Resolved once for the whole run: every page sits in the same directory
        // tree and no .prettierrc override matches *.html. The CLI pass this
        // replaced also needed --ignore-path devNull, because .gitignore and
        // .prettierignore both list "dist" (so normal lint/format passes skip build
        // output) and the CLI would have skipped the very directory it targeted.
        // format() reads no ignore files, so the workers need no such opt-out.
        const options = { ...(await prettier.resolveConfig(firstFile)), parser: 'html' }

        // Page sizes span two orders of magnitude, so an even split by file count
        // leaves one worker alone with the biggest page long after the others are
        // done. Dealing the size-ordered list round-robin evens the batches out.
        const workerCount = Math.min(availableParallelism(), 8, files.length)
        const ordered = files
          .map((file) => ({ file, size: statSync(file).size }))
          .sort((a, b) => b.size - a.size)
          .map(({ file }) => file)
        const batches = Array.from({ length: workerCount }, (_, worker) => ordered.filter((_, index) => index % workerCount === worker))

        await Promise.all(
          batches.map(
            (batch) =>
              new Promise((resolve, reject) => {
                const worker = new Worker(path('./.build/prettify-html-worker.mjs'), { workerData: { files: batch, options } })
                worker.on('error', reject)
                worker.on('exit', (code) => (code === 0 ? resolve(undefined) : reject(new Error(`prettify-html worker exited with code ${code}`))))
              }),
          ),
        )
        logger.info(`HTML formatted with prettier (${files.length} pages, ${workerCount} workers)`)
      },
    },
  }
}

// https://astro.build/config
export default defineConfig({
  // pages live at the package root (./pages) — all components/lib/data are
  // shared (see the @shared alias)
  srcDir: '.',
  server: {
    port: 3000,
    // bind on all interfaces so the dev server is reachable from Docker
    // port mappings and other devices on the local network
    host: true,
  },
  vite: {
    resolve: {
      alias: {
        // Demo data in shared/data (single source of truth).
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
        // Components/lib shared with docs.
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
        '@ui': fileURLToPath(new URL('../shared/ui', import.meta.url)),
        '@components': fileURLToPath(new URL('../shared/components', import.meta.url)),
      },
    },
  },
  build: {
    // Emit sign-in.html instead of sign-in/index.html (HTML is the product).
    format: 'file',
  },
  // Keep readable HTML; prettier formats after the build.
  compressHTML: false,
  integrations: [
    copyAssets({
      repo: path('..'),
      publicDir: path('./public'),
      copies: [
        {
          // @tabler/core dist (css/js/fonts/img/libs) — same as the Eleventy passthrough.
          // Fallback keeps current assets if core rebuilds dist mid-copy in turbo dev.
          from: path('./node_modules/@tabler/core/dist'),
          to: path('./public/dist'),
          label: '@tabler/core',
          allowDestinationFallback: true,
        },
        {
          // demo css/js built by this package's sass/vite pipeline. Source is
          // tmp-assets/ (NOT dist/) on purpose — dist/ is Astro's own build output,
          // and copying from a path Astro also writes to caused unbounded growth
          // across repeated builds. See preview/.build/vite.config.mts.
          from: path('./tmp-assets'),
          to: path('./public/preview'),
          label: '@tabler/preview',
          // Built by the separate "assets" script (its own turbo task), so this
          // build can start with a half-written tmp-assets from an aborted run.
          requiredFile: path('./tmp-assets/css/demo.css'),
        },
        {
          // static assets (photos, avatars, tracks, brand svgs...). The real source,
          // because preview/static is a symlink that may not survive deployment packaging.
          from: path('../shared/static'),
          to: path('./public/static'),
          label: 'shared assets',
        },
        // favicons (source assets of @tabler/preview)
        { from: path('./assets/favicon.ico'), to: path('./public/favicon.ico'), label: '@tabler/preview' },
        { from: path('./assets/favicon-dev.ico'), to: path('./public/favicon-dev.ico'), label: '@tabler/preview' },
      ],
      // Watch the real core/dist, not the node_modules symlink the startup copy
      // reads from — same directory.
      syncDirs: [
        { from: path('../core/dist'), to: path('./public/dist') },
        { from: path('../shared/static'), to: path('./public/static') },
      ],
      // watch-css/watch-js write straight into public/preview — the file is already
      // in place, but Astro does not reload the browser on public/ changes.
      reloadDirs: [path('./public/preview')],
    }),
    mdx(),
    prettifyHtml(),
  ],
  markdown: {
    // No typographic quote rewriting.
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      theme: 'github-dark',
      transformers: [
        {
          // Beautify html fences before highlighting.
          preprocess(code) {
            return this.options.lang === 'html' ? beautify.html(code, { indent_size: 2, wrap_line_length: 80 }) : code
          },
          // Keep shiki classes only (drop Astro's astro-code / data-language).
          pre(node) {
            node.properties.class = 'shiki github-dark'
            delete node.properties.dataLanguage
          },
        },
      ],
    },
  },
})
