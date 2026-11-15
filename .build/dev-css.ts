// Astro integration that serves the stylesheets straight from scss while
// `astro dev` runs: the layout links `core/scss/tabler.scss` through Vite
// instead of the built `dist/css/tabler.css`, so an scss edit is compiled on
// request and swapped into the page by Vite's HMR, without a reload.
//
// RTL pages link `tabler.rtl.scss`, which is not a file: the plugin below
// answers it with a stylesheet that forwards `tabler.scss`, and postcss runs
// rtlcss over anything named `*.rtl.scss`. A name instead of a `?rtl` query,
// because Vite's client drops the query when it swaps a <link> on an update.
//
// Dev only. A build still links the files build-css.ts wrote, and the postcss
// steps below are the same ones it runs, from the same configuration.
//
// TABLER_DEV_CSS=0 turns it off, to run a dev server on the built files.
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

interface DevCssOptions {
  /** absolute path of core/scss */
  coreScss: string
  /** absolute path of the package's own scss directory */
  demoScss: string
  /** sass load paths, the `node_modules` build-css.ts resolves from */
  loadPaths: string[]
}

export const devCssEnabled = () => process.env.TABLER_DEV_CSS !== '0'

const rtlEntry = /\/([^/]+)\.rtl\.scss$/

const fsUrl = (dir: string) => `/@fs/${dir.replaceAll('\\', '/').replace(/^\//, '')}`

// Vite hands every stylesheet it serves to the same postcss config. The prefix
// belongs to the Tabler stylesheets only, so the pipeline runs for files under
// the given directories and leaves anything else alone.
function tablerPostcss(dirs: string[]): Plugin {
  const rtl = postcss([rtlcss()])
  const pipeline = postcss([inlineValueComments, prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore }), autoprefixer({ cascade: false })])
  return {
    postcssPlugin: 'tabler-dev-css',
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
    name: 'tabler-dev-css-rtl',
    resolveId: (id: string) => (entryOf(id) ? id : undefined),
    load: (id: string) => {
      const entry = entryOf(id)
      return entry ? `@use './${entry}';\n` : undefined
    },
  }
}

export function devCss({ coreScss, demoScss, loadPaths }: DevCssOptions): Integration {
  return {
    name: 'dev-css',
    hooks: {
      'astro:config:setup': ({ command, updateConfig }) => {
        if (command !== 'dev' || !devCssEnabled()) return
        updateConfig({
          vite: {
            plugins: [rtlEntries(coreScss)],
            define: {
              'import.meta.env.TABLER_DEV_CSS': JSON.stringify({ core: fsUrl(coreScss), demo: fsUrl(demoScss) }),
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
