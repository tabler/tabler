// Single-pass CSS pipeline shared by @tabler/core and @tabler/preview.
//
// Replaces the `sass` + `postcss` + `cleancss` CLI chain: each output file used
// to be written twice (sass first, then postcss rewriting it in place), which
// briefly exposed un-prefixed CSS on disk and made file watchers (dev-server
// live reload) fire once per write burst. Here everything runs in-process and
// each output file is written exactly once, fully processed.
//
// All options mirror the replaced CLI invocations exactly — the output has been
// verified byte-identical (css, rtl, min and their source maps):
// - sass --no-source-map --load-path=node_modules --style expanded
// - postcss (autoprefixer cascade:false, rtlcss for --rtl, external map with
//   annotation + sourcesContent — the former core/.build/postcss.config.mjs)
// - cleancss -O1 --format breakWith=lf --with-rebase --source-map
//   --source-map-inline-sources --batch --batch-suffix ".min"
//
// Usage: tsx ../.build/build-css.ts <scssDir> <outDir> [--rtl] [--minify]
// (cwd = the package)
/// <reference path="./modules.d.ts" />
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { EOL } from 'node:os'
import { basename, join, resolve } from 'node:path'
import { compile as compileSass } from 'sass'
import postcss, { type Result } from 'postcss'
import autoprefixer from 'autoprefixer'
import rtlcss from 'rtlcss'
import CleanCSS from 'clean-css'

const args = process.argv.slice(2)
const flags = args.filter((arg) => arg.startsWith('--'))
const [scssDir, outDir] = args.filter((arg) => !arg.startsWith('--'))
if (!scssDir || !outDir) {
  console.error('usage: tsx build-css.ts <scssDir> <outDir> [--rtl] [--minify]')
  process.exit(1)
}
const withRtl = flags.includes('--rtl')
const withMinify = flags.includes('--minify')

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
  const result = await postcss([autoprefixer({ cascade: false })]).process(`${compiled.css}\n`, {
    from: outFile,
    to: outFile,
    map: mapOptions,
  })
  queueWrite(outFile, result.css)
  if (result.map) queueWrite(`${outFile}.map`, result.map.toString())
  written.push(outFile)
  return { outFile, result }
}

// rtlcss over the prefixed output: outDir/x.css → outDir/x.rtl.css (+ .map)
async function rtl(entry: string, outFile: string, base: Result): Promise<void> {
  const rtlFile = join(outDir, `${basename(entry, '.scss')}.rtl.css`)
  // Same input the CLI read from disk: the prefixed css including its
  // sourceMappingURL annotation, so postcss picks up the previous map.
  // The previous map is not on disk yet (writes are buffered) — pass it in.
  const result = await postcss([autoprefixer({ cascade: false }), rtlcss()]).process(base.css, {
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

// clean-css over every produced file: outDir/x.css → outDir/x.min.css (+ .map).
// Mirrors clean-css-cli's option coercion and batch output naming/annotation
// (see the clean-css-cli package's index.js).
async function minify(files: string[]): Promise<void> {
  const minified = await new CleanCSS({
    batch: true,
    format: 'breakWith=lf',
    inline: 'local',
    level: { 1: true },
    rebase: true,
    rebaseTo: resolve(outDir),
    returnPromise: true,
    sourceMap: true,
    sourceMapInlineSources: true,
  }).minify(files)
  for (const inputFile of files) {
    const fileResult = minified[inputFile]
    if (!fileResult) throw new Error(`build-css: no minify result for ${inputFile}`)
    if (fileResult.errors.length > 0) throw new Error(fileResult.errors.join('\n'))
    for (const warning of fileResult.warnings) console.warn(`build-css: ${warning}`)
    const minFile = inputFile.replace(/\.css$/, '.min.css')
    writeFileSync(minFile, `${fileResult.styles}${EOL}/*# sourceMappingURL=${basename(minFile)}.map */`)
    writeFileSync(`${minFile}.map`, fileResult.sourceMap.toString())
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
