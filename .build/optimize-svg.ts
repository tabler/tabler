#!/usr/bin/env node
// Minifies the SVG images shipped in core/dist/img (flags, payments, social)
// with svgo. The payment logos are optimized again on every import, see
// import-payments.ts.
//
// Run: pnpm run optimize:svg          — rewrite the files in place
//      pnpm run optimize:svg -- check — fail when a file is not optimized
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimize } from 'svgo'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const imgDirs = ['flags', 'payments', 'social'].map((dir) => join(repoRoot, 'core', 'img', dir))

// preset-default keeps the viewBox and the title in svgo 4. The files are
// loaded as standalone images, so rewriting ids is safe.
export function optimizeSvg(svg: string, path?: string): string {
  return optimize(svg, { path, multipass: true }).data
}

// Returns the files that changed (or would change, with write: false).
export function optimizeSvgDir(dir: string, write = true): string[] {
  const changed: string[] = []
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.svg'))) {
    const path = join(dir, file)
    const source = readFileSync(path, 'utf8')
    const output = optimizeSvg(source, path)
    if (output === source) continue
    changed.push(path)
    if (write) writeFileSync(path, output)
  }
  return changed
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('check')
  const changed = imgDirs.flatMap((dir) => optimizeSvgDir(dir, !check))
  if (check && changed.length) {
    console.error(`optimize-svg: ${changed.length} file(s) not optimized — run \`pnpm run optimize:svg\`:`)
    for (const path of changed) console.error(`  ${relative(repoRoot, path)}`)
    process.exit(1)
  }
  console.log(check ? 'optimize-svg: all images are optimized' : `optimize-svg: ${changed.length} file(s) optimized`)
}
