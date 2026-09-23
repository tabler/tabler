#!/usr/bin/env node
// Copies img/ to dist/img — only the images the stylesheets actually reference.
// The references are read from the compiled CSS of every scss/*.scss entry, so
// a flag or payment logo that no `$flag-countries` / `$payment-providers` /
// `$social-apps` entry points at is not shipped — except the files below.
import { compile } from 'sass'
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const coreDir = join(__dirname, '..')
const scssDir = join(coreDir, 'scss')
const srcDir = join(coreDir, 'img')
const outDir = join(coreDir, 'dist', 'img')

// Shipped in 1.x without any class pointing at them. Removing a file from dist/
// is a breaking change (check:compat), so they stay until 2.0.
const keptUntilV2 = ['flags/kn-sk.svg']

const used = new Set<string>(keptUntilV2)
for (const entry of readdirSync(scssDir).filter((file) => file.endsWith('.scss') && !file.startsWith('_'))) {
  const { css } = compile(join(scssDir, entry), { loadPaths: [join(coreDir, 'node_modules')], quietDeps: true, silenceDeprecations: ['import'] })
  for (const [, path] of css.matchAll(/url\(\s*['"]?[^'")]*?\/img\/([^'")?#]+)/g)) used.add(path)
}

const missing = [...used].filter((path) => !existsSync(join(srcDir, path)))
if (missing.length) {
  console.error(`copy-img: referenced but missing in img/: ${missing.join(', ')}`)
  process.exit(1)
}

rmSync(outDir, { recursive: true, force: true })
for (const path of used) {
  mkdirSync(dirname(join(outDir, path)), { recursive: true })
  copyFileSync(join(srcDir, path), join(outDir, path))
}

const all = readdirSync(srcDir, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).length
console.log(`copy-img: ${used.size} of ${all} images copied to dist/img`)
