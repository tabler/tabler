// Single-pass CSS pipeline shared by @tabler/core and @tabler/preview.
//
// Runs sass, autoprefixer, the --tblr- prefix, rtlcss and cssnano in one
// process; each output file is written exactly once, fully processed. The
// options mirror the CLI invocations this replaced:
// - sass --no-source-map --load-path=node_modules --style expanded
// - postcss (autoprefixer cascade:false, rtlcss for --rtl, external map with
//   annotation + sourcesContent)
// Minification is a cssnano pass restricted to lossless transforms, see minify().
//
// --banner adds the license comment before any source map is generated, so
// the maps account for its lines (#2766).
//
// --no-prefix skips the --tblr- pass, for a stylesheet that inlines vendor css
// whose variables are set at runtime (docs/scss/docs.scss).
//
// Usage: tsx ../.build/build-css.ts <scssDir> <outDir> [--rtl] [--minify] [--banner] [--no-prefix]
// (cwd = the package)
/// <reference path="./modules.d.ts" />
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { compile as compileSass } from 'sass'
import postcss, { type Result } from 'postcss'
import autoprefixer from 'autoprefixer'
import prefixCustomProperties from 'postcss-prefix-custom-properties'
import rtlcss from 'rtlcss'
import type { Options as CssnanoOptions } from 'cssnano'
import { addBanner } from '../shared/banner/index.mjs'
import { cssVarIgnore, cssVarPrefix, inlineValueComments } from './css-var-prefix'

const args = process.argv.slice(2)
const flags = args.filter((arg) => arg.startsWith('--'))
const [scssDir, outDir] = args.filter((arg) => !arg.startsWith('--'))
if (!scssDir || !outDir) {
  console.error('usage: tsx build-css.ts <scssDir> <outDir> [--rtl] [--minify] [--banner] [--no-prefix]')
  process.exit(1)
}
const withRtl = flags.includes('--rtl')
const withMinify = flags.includes('--minify')
const withBanner = flags.includes('--banner')
const withPrefix = !flags.includes('--no-prefix')

const mapOptions = { inline: false, annotation: true, sourcesContent: true }

const written: string[] = []
const pendingWrites: { file: string; content: string }[] = []

// Skipping identical content keeps file watchers quiet for outputs a given scss
// edit did not actually change (the dev servers full-reload on these writes).
function queueWrite(file: string, content: string) {
  if (existsSync(file) && readFileSync(file, 'utf8') === content) return
  pendingWrites.push({ file, content })
}

// sass + autoprefixer for one entry: scss/x.scss → outDir/x.css (+ .map)
async function compile(entry: string): Promise<{ outFile: string; result: Result }> {
  const outFile = join(outDir, `${basename(entry, '.scss')}.css`)
  const compiled = compileSass(join(scssDir, entry), { loadPaths: ['node_modules'], style: 'expanded' })
  // The sass CLI ends its output files with a newline; the JS API's css string
  // does not. Keep the byte-identical CLI behavior (the annotation comment then
  // lands after a blank line, exactly like `postcss --replace` produced).
  const css = `${compiled.css}\n`
  // Banner goes in before postcss runs, so the map it generates already counts
  // the banner's lines — and so does the rtl map chained onto it below.
  const input = withBanner ? addBanner(css, outFile) : css
  // Prefixing is its own pass, ahead of the one that generates the map:
  // postcss maps generated positions back to *its own input*, so renaming
  // inside the map-generating pass would leave every mapping — and the
  // embedded sourcesContent — describing css that no longer exists on disk.
  const { css: prefixed } = withPrefix ? await postcss([inlineValueComments, prefixCustomProperties({ prefix: cssVarPrefix, ignore: cssVarIgnore })]).process(input, { from: outFile, to: outFile, map: false }) : { css: input }
  const result = await postcss([autoprefixer({ cascade: false })]).process(prefixed, {
    from: outFile,
    to: outFile,
    map: mapOptions,
  })
  queueWrite(outFile, result.css)
  if (result.map) queueWrite(`${outFile}.map`, result.map.toString())
  written.push(outFile)
  return { outFile, result }
}

// rtlcss over the prefixed, already autoprefixed output: outDir/x.css → outDir/x.rtl.css (+ .map)
async function rtl(entry: string, outFile: string, base: Result): Promise<void> {
  const rtlFile = join(outDir, `${basename(entry, '.scss')}.rtl.css`)
  // Same input the CLI read from disk: the prefixed css including its
  // sourceMappingURL annotation, so postcss picks up the previous map.
  // The previous map is not on disk yet (writes are buffered) — pass it in.
  const result = await postcss([rtlcss()]).process(base.css, {
    from: outFile,
    to: rtlFile,
    map: { ...mapOptions, prev: base.map.toString() },
  })
  queueWrite(rtlFile, result.css)
  if (result.map) queueWrite(`${rtlFile}.map`, result.map.toString())
  written.push(rtlFile)
}

// All compile work is done before the first write: compiles take seconds while
// writes take milliseconds, so watchers see one tight burst instead of writes
// spread across the whole build (which would need a long reload debounce).
function flushWrites(): void {
  for (const { file, content } of pendingWrites) {
    writeFileSync(file, content)
    console.log(`build-css: ${file}`)
  }
}

// Every cssnano transform that rewrites values, merges or reorders is off:
// only comments (except `/*! … */`), whitespace, empty rules and selector
// formatting are minified, so numbers keep their full precision and at-rules
// pass through untouched. A new cssnano default plugin has to be added here.
const minifierOptions: CssnanoOptions = {
  preset: [
    'default',
    {
      calc: false,
      colormin: false,
      convertValues: false,
      discardDuplicates: false,
      discardOverridden: false,
      mergeLonghand: false,
      mergeRules: false,
      minifyFontValues: false,
      minifyGradients: false,
      minifyParams: false,
      normalizeCharset: false,
      normalizeDisplayValues: false,
      normalizePositions: false,
      normalizeRepeatStyle: false,
      normalizeString: false,
      normalizeTimingFunctions: false,
      normalizeUnicode: false,
      normalizeUrl: false,
      orderedValues: false,
      reduceInitial: false,
      reduceTransforms: false,
      uniqueSelectors: false,
    },
  ],
}

// cssnano over every produced file: outDir/x.css → outDir/x.min.css (+ .map).
// postcss picks up each file's own map through its sourceMappingURL annotation.
// cssnano is ESM-only and this file runs as CJS under tsx, hence the import().
async function minify(files: string[]): Promise<void> {
  const { default: cssnano } = await import('cssnano')
  const minifier = cssnano(minifierOptions)
  for (const inputFile of files) {
    const minFile = inputFile.replace(/\.css$/, '.min.css')
    const result = await postcss([minifier]).process(readFileSync(inputFile, 'utf8'), {
      from: inputFile,
      to: minFile,
      map: mapOptions,
    })
    for (const warning of result.warnings()) console.warn(`build-css: ${warning.toString()}`)
    writeFileSync(minFile, result.css)
    writeFileSync(`${minFile}.map`, result.map.toString())
    console.log(`build-css: ${minFile}`)
  }
}

// Wrapped in a function because tsx compiles root-level .ts as CJS, where
// top-level await is unavailable.
async function main() {
  const entries = readdirSync(scssDir).filter((file) => file.endsWith('.scss') && !file.startsWith('_'))
  mkdirSync(outDir, { recursive: true })

  for (const entry of entries) {
    const { outFile, result } = await compile(entry)
    if (withRtl) await rtl(entry, outFile, result)
  }
  flushWrites()
  if (withMinify) await minify(written)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
