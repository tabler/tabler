// Astro integration that serves the framework's stylesheets and scripts straight
// from source while `astro dev` runs: the layout links `core/scss/tabler.scss`
// and `core/js/tabler.ts` through Vite instead of the built files in `dist/`.
// A style edit is compiled on request and swapped into the page by Vite's HMR,
// without a reload; a script edit reloads the page as soon as it is saved,
// without waiting for a bundle.
//
// RTL pages link `tabler.rtl.scss`, which is not a file: the plugin below
// answers it with a stylesheet that forwards `tabler.scss`, and postcss runs
// rtlcss over anything named `*.rtl.scss`. A name instead of a `?rtl` query,
// because Vite's client drops the query when it swaps a <link> on an update.
//
// Scripts work the same way: `tabler.global.js` is not a file either, it is a
// module that imports `tabler.ts` and puts its exports on the `tabler` global,
// which is what the UMD bundle does for the classic page scripts.
// `tabler-theme.js` stays the built file: it has to block rendering, and a
// module script cannot.
//
// Dev only. A build still links the files build-css.ts and the core vite builds
// wrote, and the postcss steps below are the same ones build-css.ts runs, from
// the same configuration.
//
// TABLER_DEV_ASSETS=0 turns it off, to run a dev server on the built files.
import { sep } from 'node:path'
import autoprefixer from 'autoprefixer'
import postcss, { type Plugin, type Root } from 'postcss'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import rtlcss from 'rtlcss'
import { cssVarIgnore, cssVarPrefix, inlineValueComments } from './css-var-prefix'

interface Integration {
  name: string
  hooks: {
    'astro:config:setup'?: (options: { command: string; updateConfig: (config: Record<string, unknown>) => unknown }) => void
  }
}

interface DevAssetsOptions {
  /** absolute path of core/scss */
  coreScss: string
  /** absolute path of core/js */
  coreJs: string
  /** absolute path of the package's own scss directory */
  demoScss: string
  /** sass load paths, the `node_modules` build-css.ts resolves from */
  loadPaths: string[]
}

export const devAssetsEnabled = () => process.env.TABLER_DEV_ASSETS !== '0'

// Built files that Vite serves from source instead. copy-assets still syncs
// them, but a change in one must not reload the page a second time.
export const servedFromSource = (file: string) => devAssetsEnabled() && (file.endsWith('.css') || (file.includes(`${sep}dist${sep}js${sep}`) && !file.includes('tabler-theme')))

const rtlEntry = /\/([^/]+)\.rtl\.scss$/
const globalEntry = /\/((?:maps\/)?[^/]+)\.global\.js$/

const fsUrl = (dir: string) => `/@fs/${dir.replaceAll('\\', '/').replace(/^\//, '')}`

// Vite hands every stylesheet it serves to the same postcss config. The prefix
// belongs to the Tabler stylesheets only, so the pipeline runs for files under
// the given directories and leaves anything else alone.
function tablerPostcss(dirs: string[]): Plugin {
  const rtl = postcss([rtlcss()])
  const pipeline = postcss([inlineValueComments, prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore }), autoprefixer({ cascade: false })])
  return {
    postcssPlugin: 'tabler-dev-assets',
    async Once(root: Root) {
      const file = root.source?.input.file
      if (!file || !dirs.some((dir) => file.startsWith(dir + sep))) return
      await pipeline.process(root, { from: file, to: file, map: false })
      if (!rtlEntry.test(file)) return
      // rtlcss reads its `/*rtl:ignore*/` directives from the raw value, which
      // still holds the text from before the prefix pass. build-css.ts never
      // sees this, it hands rtlcss freshly parsed css.
      root.walkDecls((decl) => {
        if (decl.raws.value) decl.raws.value = { raw: decl.value, value: decl.value.replace(/\/\*.*?\*\//gs, '').trim() }
      })
      await rtl.process(root, { from: file, to: file, map: false })
    },
  }
}

function rtlEntries(dir: string) {
  const entryOf = (id: string) => {
    const file = id.split('?')[0] ?? id
    return file.startsWith(`${dir}/`) ? rtlEntry.exec(file)?.[1] : undefined
  }
  return {
    name: 'tabler-dev-assets-rtl',
    resolveId: (id: string) => (entryOf(id) ? id : undefined),
    load: (id: string) => {
      const entry = entryOf(id)
      return entry ? `@use './${entry}';\n` : undefined
    },
  }
}

// Same globals as the UMD builds in core/.build/vite.config.mts: the main bundle
// and its add-ons share `tabler`, each map file adds to `tablerVectorMaps`.
function globalEntries(dir: string) {
  const entryOf = (id: string) => {
    const file = id.split('?')[0] ?? id
    return file.startsWith(`${dir}/`) ? globalEntry.exec(file)?.[1] : undefined
  }
  return {
    name: 'tabler-dev-assets-global',
    // A component that loads a vendored library at runtime builds the URL from
    // its own, e.g. `../libs/maplibre-gl/…` next to `dist/js/tabler-map.js`.
    // From `core/js/src/` that lands in `core/js/libs/`, which does not exist.
    configureServer(server: { middlewares: { use(handler: (req: { url?: string }, res: { statusCode: number; setHeader(name: string, value: string): void; end(): void }, next: () => void) => void): void } }) {
      const libs = `${fsUrl(dir)}/libs/`
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith(libs)) return next()
        res.statusCode = 302
        res.setHeader('Location', `/dist/libs/${req.url.slice(libs.length).split('?')[0]}`)
        res.end()
      })
    },
    resolveId: (id: string) => (entryOf(id) ? id : undefined),
    load: (id: string) => {
      const entry = entryOf(id)
      if (!entry) return undefined
      const name = entry.startsWith('maps/') ? 'tablerVectorMaps' : 'tabler'
      return `import * as lib from '${dir}/${entry}.ts'\nwindow.${name} = Object.assign(window.${name} ?? {}, lib)\n`
    },
  }
}

export function devAssets({ coreScss, coreJs, demoScss, loadPaths }: DevAssetsOptions): Integration {
  return {
    name: 'dev-assets',
    hooks: {
      'astro:config:setup': ({ command, updateConfig }) => {
        if (command !== 'dev' || !devAssetsEnabled()) return
        updateConfig({
          vite: {
            plugins: [rtlEntries(coreScss), globalEntries(coreJs)],
            define: {
              'import.meta.env.TABLER_DEV_ASSETS': JSON.stringify({ scss: fsUrl(coreScss), js: fsUrl(coreJs), demoScss: fsUrl(demoScss) }),
            },
            // Keep url() pointing at the image files, as in the built css,
            // instead of inlining every small svg as a data URI.
            build: { assetsInlineLimit: 0 },
            css: {
              devSourcemap: true,
              postcss: { plugins: [tablerPostcss([coreScss, demoScss])] },
              preprocessorOptions: { scss: { loadPaths } },
            },
          },
        })
      },
    },
  }
}
