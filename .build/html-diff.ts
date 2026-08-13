#!/usr/bin/env node
// Renders every preview page from a running dev server and compares the HTML
// against a stored baseline, so internal refactors can prove they don't change
// the rendered output at all. Volatile content (the "Generated <date>" footer)
// is normalized away before comparing.
// Run: pnpm run html-diff:baseline  — capture baseline snapshots (before refactoring)
//      pnpm run html-diff           — re-render and diff against the baseline
// The dev server defaults to http://localhost:3000; override with HTML_DIFF_BASE.

import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const pagesDir = join(repoRoot, 'preview', 'pages')
const snapshotDir = join(repoRoot, '.cache', 'html-diff')
const baseUrl = process.env.HTML_DIFF_BASE ?? 'http://localhost:3000'
const mode = process.argv[2] === 'baseline' ? 'baseline' : 'check'

// ---------------------------------------------------------------------------
// Route table: every preview page url, keyed by its snapshot file name.
// ---------------------------------------------------------------------------
const routes = new Map<string, string>()
for (const file of sync(join(pagesDir, '**', '*.astro'))) {
  if (file.includes('[')) continue // dynamic routes have no single url
  const url =
    '/' +
    relative(pagesDir, file)
      .replace(/\/?index\.astro$/, '')
      .replace(/\.astro$/, '')
  routes.set((url === '/' ? 'index' : url.slice(1)).replaceAll('/', '_') + '.html', url)
}

// The footer stamps the render time into every page — meaningless for diffing.
const normalize = (html: string) => html.replace(/Generated \d{4}[^<]*/g, 'Generated')

const fetchPage = async (url: string): Promise<string> => {
  const response = await fetch(baseUrl + url)
  if (!response.ok) throw new Error(`${response.status} ${baseUrl + url}`)
  return normalize(await response.text())
}

// Render with a small worker pool — the dev server compiles pages on demand.
// Wrapped in main() because the root package is CJS (no top-level await).
const CONCURRENCY = 8

const main = async () => {
  const entries = [...routes.entries()]
  const failures: string[] = []
  const pages = new Map<string, string>()
  let cursor = 0
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < entries.length) {
        const entry = entries[cursor++]
        if (!entry) break
        const [name, url] = entry
        try {
          pages.set(name, await fetchPage(url))
        } catch (error) {
          failures.push(`${url} — ${error instanceof Error ? error.message : error}`)
        }
      }
    }),
  )

  if (failures.length > 0) {
    console.error(`✖ ${failures.length} page(s) failed to render (is the dev server running at ${baseUrl}?):`)
    for (const failure of failures) console.error(`  ${failure}`)
    process.exit(1)
  }

  if (mode === 'baseline') {
    rmSync(snapshotDir, { recursive: true, force: true })
    mkdirSync(snapshotDir, { recursive: true })
    for (const [name, html] of pages) writeFileSync(join(snapshotDir, name), html)
    console.log(`✓ Baseline captured: ${pages.size} pages → ${relative(repoRoot, snapshotDir)}`)
    return
  }

  if (!existsSync(snapshotDir)) {
    console.error(`✖ No baseline found in ${relative(repoRoot, snapshotDir)} — run "pnpm run html-diff:baseline" first.`)
    process.exit(1)
  }

  // Compare against the baseline; report the first differing line per page.
  let differing = 0
  for (const [name, html] of pages) {
    const baselineFile = join(snapshotDir, name)
    if (!existsSync(baselineFile)) {
      console.error(`± ${name}: new page (no baseline snapshot)`)
      differing++
      continue
    }
    const baseline = readFileSync(baselineFile, 'utf8')
    if (baseline === html) continue
    differing++
    // Classify: inter-tag whitespace reshuffles are usually visually inert
    // (flex containers, select internals) — but review inline contexts manually.
    const squash = (s: string) => s.replace(/>\s+</g, '><').replace(/\s+/g, ' ')
    if (squash(baseline) === squash(html)) {
      console.error(`± ${name}: WHITESPACE-ONLY difference (identical after normalization — verify inline contexts)`)
      continue
    }
    const baselineLines = baseline.split('\n')
    const currentLines = html.split('\n')
    const line = baselineLines.findIndex((l, i) => l !== currentLines[i])
    console.error(`± ${name}: differs at line ${line + 1}`)
    console.error(`  - ${(baselineLines[line] ?? '<missing>').trim().slice(0, 160)}`)
    console.error(`  + ${(currentLines[line] ?? '<missing>').trim().slice(0, 160)}`)
  }
  for (const name of sync(join(snapshotDir, '*.html'))) {
    const snapshotName = relative(snapshotDir, name)
    if (!pages.has(snapshotName)) {
      console.error(`± ${snapshotName}: page removed (baseline snapshot has no live page)`)
      differing++
    }
  }

  if (differing > 0) {
    console.error(`✖ ${differing} of ${pages.size} pages differ from the baseline.`)
    process.exit(1)
  }
  console.log(`✓ All ${pages.size} pages are byte-identical to the baseline.`)
}

main()
