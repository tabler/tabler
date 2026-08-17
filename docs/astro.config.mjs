// @ts-check
import { defineConfig, envField } from 'astro/config'
import vercel from '@astrojs/vercel'
import mdx from '@astrojs/mdx'
import { satteri } from '@astrojs/markdown-satteri'
import { unwrapJsxParagraphs } from './lib/satteri-unwrap-jsx-paragraphs.mjs'
import { fileURLToPath } from 'node:url'
import { copyAssets } from '../.build/copy-assets'

/** @param {string} p */
const path = (p) => fileURLToPath(new URL(p, import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.tabler.io',
  env: {
    // DocSearch/Algolia config for the docs search (see DocsNavbar.astro).
    // Values come from the environment only (.env locally, project settings on
    // Vercel) — see .env.example. When unset, the search input is hidden.
    schema: {
      DOCSEARCH_APP_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      DOCSEARCH_INDEX_NAME: envField.string({ context: 'client', access: 'public', optional: true }),
      DOCSEARCH_API_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  // Static output + the Vercel adapter: turns `redirects` below into real HTTP
  // redirects at Vercel's routing layer (no adapter = meta-refresh HTML pages).
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  // Renamed/moved pages. Add an entry here whenever a docs URL changes.
  // The plural component slugs are the pre-Astro URLs still present in the
  // Google index, Algolia search results and external backlinks.
  redirects: {
    '/ui/base/markdown': { status: 301, destination: '/ui/base/prose' },
    ...Object.fromEntries(
      [
        ['alerts', 'alert'],
        ['avatars', 'avatar'],
        ['badges', 'badge'],
        ['buttons', 'button'],
        ['cards', 'card'],
        ['dropdowns', 'dropdown'],
        ['icons', 'icon'],
        ['modals', 'modal'],
        ['ribbons', 'ribbon'],
        ['spinners', 'spinner'],
        ['statuses', 'status'],
        ['steps', 'step'],
        ['tables', 'table'],
        ['tabs', 'tab'],
        ['timelines', 'timeline'],
        ['toasts', 'toast'],
        ['tooltips', 'tooltip'],
      ].map(([from, to]) => [`/ui/components/${from}`, { status: 301, destination: `/ui/components/${to}` }]),
    ),
    // Components that need a third-party library moved to /ui/plugins/.
    ...Object.fromEntries(['autosize', 'chart', 'countup', 'dropzone', 'fullcalendar', 'inline-player', 'lightbox', 'range-slider', 'signature', 'vector-map', 'wysiwyg'].map((slug) => [`/ui/components/${slug}`, { status: 301, destination: `/ui/plugins/${slug}` }])),
    // Pre-Astro plural urls for two of those pages, sent straight to the new home.
    '/ui/components/charts': { status: 301, destination: '/ui/plugins/chart' },
    '/ui/components/vector-maps': { status: 301, destination: '/ui/plugins/vector-map' },
    // The form- prefix was redundant inside /ui/forms/.
    '/ui/forms/form-elements': { status: 301, destination: '/ui/forms/elements' },
    '/ui/forms/form-fieldset': { status: 301, destination: '/ui/forms/fieldset' },
    '/ui/forms/form-floating': { status: 301, destination: '/ui/forms/floating-labels' },
    '/ui/forms/form-helpers': { status: 301, destination: '/ui/forms/helpers' },
    '/ui/forms/form-selectboxes': { status: 301, destination: '/ui/forms/select-group' },
    '/ui/forms/form-image-check': { status: 301, destination: '/ui/forms/image-check' },
    '/ui/forms/form-color-check': { status: 301, destination: '/ui/forms/color-check' },
    '/ui/forms/form-select-tomselect': { status: 301, destination: '/ui/forms/advanced-select' },
    '/ui/forms/form-colorpicker': { status: 301, destination: '/ui/forms/color-picker' },
    '/ui/forms/form-datepicker': { status: 301, destination: '/ui/forms/date-picker' },
    '/ui/forms/form-input-mask': { status: 301, destination: '/ui/forms/input-mask' },
    '/ui/forms/form-validation': { status: 301, destination: '/ui/forms/validation' },
    // Illustrations and Emails lost their "introduction" wrapper.
    '/illustrations/introduction': { status: 301, destination: '/illustrations' },
    '/illustrations/introduction/preview': { status: 301, destination: '/illustrations/preview' },
    '/illustrations/introduction/contents': { status: 301, destination: '/illustrations/contents' },
    '/illustrations/introduction/customization': { status: 301, destination: '/illustrations/customization' },
    '/illustrations/introduction/license': { status: 301, destination: '/illustrations/license' },
    '/emails/introduction': { status: 301, destination: '/emails' },
    '/emails/introduction/contents': { status: 301, destination: '/emails/contents' },
    '/emails/introduction/compiled-html': { status: 301, destination: '/emails/compiled-html' },
    '/emails/introduction/source-html': { status: 301, destination: '/emails/source-html' },
  },
  // pages live at the package root (./pages) — content-first layout; all
  // components/lib/data are shared (see the @shared alias). The docs content
  // itself lives in ./content and is rendered by pages/[...slug].astro.
  srcDir: '.',
  server: {
    port: 3010,
    // bind on all interfaces so the dev server is reachable from Docker
    // port mappings and other devices on the local network
    host: true,
  },
  vite: {
    define: {
      TABLER_STATIC_BASE: JSON.stringify('/static'),
    },
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../shared/data', import.meta.url)),
        // Astro components/lib shared with preview (single source of truth)
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
        '@ui': fileURLToPath(new URL('../shared/ui', import.meta.url)),
        // docs-only components (Example, DocsMenu, …)
        '@components': fileURLToPath(new URL('./components', import.meta.url)),
        // docs-only layouts (DocsLayout)
        '@layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
        // docs-only helpers (docs collection queries)
        '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
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
          requiredFile: path('./assets/favicon.ico'),
        },
        {
          // docs css built by this package's sass pipeline (see the `css` script).
          // Source is tmp-assets/ (not dist/) for the same unbounded-growth reason
          // as in preview — see preview/.build/vite.config.mts.
          from: path('./tmp-assets/css'),
          to: path('./public/css'),
          label: '@tabler/docs',
          requiredFile: path('./tmp-assets/css/docs.css'),
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
      // watch-css writes straight into public/css — the file is already in
      // place, but Astro does not reload the browser on public/ changes.
      reloadDirs: [path('./public/css')],
    }),
    mdx(),
  ],
  markdown: {
    // No typographic quote rewriting.
    processor: satteri({ features: { smartPunctuation: false }, mdastPlugins: [unwrapJsxParagraphs] }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
})
