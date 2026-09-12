// Worker half of the prettify-html integration in astro.config.mjs: formats one
// batch of built pages while the sibling workers format theirs. Prettier is
// single-threaded and the built HTML is ~18 MB, so one pass over it is by far
// the slowest part of the build when it runs on a single thread.
import { readFileSync, writeFileSync } from 'node:fs'
import { workerData } from 'node:worker_threads'
import prettier from 'prettier'

const { files, options } = workerData

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  // Astro appends "overflow-x: auto" to the shiki <pre> style — the Eleventy
  // pipeline doesn't have it and HTML is the product: restore 1:1.
  const cleaned = source.replaceAll('; overflow-x: auto;', '')
  // filepath is not redundant next to parser: "html" — prettier's printer keys
  // some output off it, and without it the doctype comes out as <!DOCTYPE html>
  // instead of the <!doctype html> the prettier CLI writes.
  const formatted = await prettier.format(cleaned, { ...options, filepath: file })
  if (formatted !== source) writeFileSync(file, formatted)
}
