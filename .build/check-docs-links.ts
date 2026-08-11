#!/usr/bin/env node
// Validates internal links in the docs at the source level (no build needed):
// - markdown links and `related:` frontmatter in docs/content/**/*.mdx
// - menu/link urls in shared/data/docs.json
// - redirect destinations in docs/astro.config.mjs
// - href string literals in docs .astro components
// Anchors are checked against heading slugs computed with github-slugger —
// the same library the markdown pipeline uses. Demo markup inside <Example>
// blocks and code fences is ignored; its links are illustrative by design.
// Run: pnpm run check-docs-links

import { existsSync, readFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'
import GithubSlugger from 'github-slugger'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const pagesDir = join(repoRoot, 'docs', 'pages')
// Docs content sits outside the routing dir — pages/[...slug].astro renders it
// from the `docs` collection (see docs/content.config.ts).
const contentDir = join(repoRoot, 'docs', 'content')

// ---------------------------------------------------------------------------
// Route table: every docs page, keyed by its url.
// ---------------------------------------------------------------------------
const routeFiles = new Map<string, string>()
const addRoute = (baseDir: string, file: string) => {
  const url =
    '/' +
    relative(baseDir, file)
      .replace(/\/?index\.(?:mdx|astro)$/, '')
      .replace(/\.(?:mdx|astro)$/, '')
  routeFiles.set(url === '/404' ? url : url.replace(/\/$/, '') || '/', file)
}
for (const file of sync(join(contentDir, '**', '*.mdx'))) addRoute(contentDir, file)
// dynamic routes are expanded from the content dir above, not routes of their own
for (const file of sync(join(pagesDir, '**', '*.astro'))) {
  if (!file.includes('[')) addRoute(pagesDir, file)
}

// Redirect sources are valid link targets; their destinations must exist.
const astroConfig = readFileSync(join(repoRoot, 'docs', 'astro.config.mjs'), 'utf8')
const redirectSources = new Set<string>()
const redirectDestinations: string[] = []
// static entries: '/from': { status: 301, destination: '/to' }
for (const match of astroConfig.matchAll(/'(\/[^']+)':\s*\{\s*status:\s*\d+,\s*destination:\s*'(\/[^']+)'/g)) {
  redirectSources.add(match[1] ?? '')
  redirectDestinations.push(match[2] ?? '')
}
// generated entries: ['alerts', 'alert'], … mapped onto /ui/components/<slug>
for (const match of astroConfig.matchAll(/\['([a-z-]+)',\s*'([a-z-]+)'\]/g)) {
  redirectSources.add(`/ui/components/${match[1]}`)
  redirectDestinations.push(`/ui/components/${match[2]}`)
}

// Asset urls are served from these source directories (synced by copyAssets).
const assetRoots: Record<string, string[]> = {
  '/img': [join(repoRoot, 'docs', 'assets', 'img')],
  '/static': [join(repoRoot, 'shared', 'static')],
  '/css': [join(repoRoot, 'docs', 'assets', 'css')],
}
// Built artifacts of other packages — not resolvable without a build.
const skipPrefixes = ['/dist/', '/preview/', '/_vercel/', '/_astro/']
// Element ids rendered by DocsLayout, valid as anchors on every page.
const layoutIds = new Set(['content', 'related', 'docsearch', 'menu', 'toc'])

// ---------------------------------------------------------------------------
// Heading slugs per page, computed like the markdown pipeline does.
// ---------------------------------------------------------------------------
const slugCache = new Map<string, Set<string>>()
const headingSlugsOf = (file: string): Set<string> => {
  let slugs = slugCache.get(file)
  if (!slugs) {
    const slugger = new GithubSlugger()
    slugs = new Set<string>()
    if (file.endsWith('.mdx')) {
      for (const line of stripDemosAndCode(body(file)).split('\n')) {
        const heading = line.match(/^#{1,6}\s+(.*)$/)
        if (heading) {
          const text = (heading[1] ?? '').replace(/[`*_]|\[([^\]]*)\]\([^)]*\)/g, '$1').trim()
          slugs.add(slugger.slug(text))
        }
      }
    }
    slugCache.set(file, slugs)
  }
  return slugs
}

const body = (file: string): string => {
  const source = readFileSync(file, 'utf8')
  return source.startsWith('---') ? (source.split(/^---$/m, 3)[2] ?? '') : source
}

const frontmatter = (file: string): string => {
  const source = readFileSync(file, 'utf8')
  return source.startsWith('---') ? (source.split(/^---$/m, 3)[1] ?? '') : ''
}

const stripDemosAndCode = (text: string): string =>
  text
    .replace(/<Example\b[\s\S]*?<\/Example>/g, '')
    .replace(/<Example\b[^>]*\/>/g, '')
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/`[^`\n]*`/g, '')

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const errors: string[] = []
let checkedLinks = 0

const checkTarget = (sourceLabel: string, link: string, sourceFile?: string) => {
  checkedLinks++
  const [pathPart = '', fragment] = link.split('#') as [string, string | undefined]

  if (pathPart === '') {
    if (fragment && sourceFile && !headingSlugsOf(sourceFile).has(fragment) && !layoutIds.has(fragment)) {
      errors.push(`${sourceLabel}: dead anchor "#${fragment}"`)
    }
    return
  }

  if (skipPrefixes.some((prefix) => pathPart.startsWith(prefix))) return

  const cleanPath = pathPart.replace(/\/+$/, '') || '/'
  const assetRoot = Object.keys(assetRoots).find((prefix) => cleanPath.startsWith(`${prefix}/`))
  if (assetRoot) {
    const roots = assetRoots[assetRoot] ?? []
    if (!roots.some((root) => existsSync(join(root, cleanPath.slice(assetRoot.length + 1))))) {
      errors.push(`${sourceLabel}: dead asset link "${link}"`)
    }
    return
  }

  // Root-level files (favicon.ico, apple-touch-icon.png, …) live in docs/assets
  // or docs/public and are copied to the site root at build time.
  if (/^\/[^/]+\.[a-z0-9]+$/i.test(cleanPath)) {
    const file = cleanPath.slice(1)
    if (![join(repoRoot, 'docs', 'assets', file), join(repoRoot, 'docs', 'public', file)].some((p) => existsSync(p))) {
      errors.push(`${sourceLabel}: dead asset link "${link}"`)
    }
    return
  }

  if (redirectSources.has(cleanPath)) return
  const targetFile = routeFiles.get(cleanPath)
  if (!targetFile) {
    errors.push(`${sourceLabel}: dead link "${link}"`)
    return
  }
  if (fragment && !headingSlugsOf(targetFile).has(fragment) && !layoutIds.has(fragment)) {
    errors.push(`${sourceLabel}: dead anchor "${link}"`)
  }
}

// 1. Markdown links + `related:` frontmatter in every mdx page.
for (const file of sync(join(contentDir, '**', '*.mdx'))) {
  const label = relative(repoRoot, file)
  const prose = stripDemosAndCode(body(file))

  for (const match of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
    const link = match[1] ?? ''
    if (/^(?:https?:|mailto:|tel:)/.test(link)) continue
    if (!link.startsWith('/') && !link.startsWith('#')) {
      errors.push(`${label}: relative link "${link}" (use an absolute path)`)
      continue
    }
    checkTarget(label, link, file)
  }

  // `related:` accepts both the array and the scalar form (see content.config.ts).
  const related = frontmatter(file).match(/^related:\s*(.+)$/m)
  if (related) {
    const value = (related[1] ?? '').trim()
    const entries = value.startsWith('[') ? value.replace(/^\[|\]$/g, '').split(',') : [value]
    for (const url of entries.map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))) {
      if (url) checkTarget(`${label} (related)`, url)
    }
  }
}

// 2. Menu and resource links in docs.json.
const docsJson = JSON.parse(readFileSync(join(repoRoot, 'shared', 'data', 'docs.json'), 'utf8')) as {
  menu?: unknown
  links?: { url?: string }[]
}
const walkMenu = (nodes: { url?: string; children?: unknown }[]) => {
  for (const node of nodes) {
    if (node.url?.startsWith('/')) checkTarget('shared/data/docs.json', node.url)
    if (Array.isArray(node.children)) walkMenu(node.children as { url?: string; children?: unknown }[])
  }
}
walkMenu((docsJson.menu as { url?: string; children?: unknown }[]) ?? [])

// 3. Redirect destinations must resolve to real pages.
for (const destination of redirectDestinations) {
  checkedLinks++
  if (!routeFiles.has(destination)) {
    errors.push(`docs/astro.config.mjs: redirect destination "${destination}" does not exist`)
  }
}

// 4. Internal href literals in docs components, layouts and astro pages.
for (const file of sync(join(repoRoot, 'docs', '{components,layouts,pages}', '**', '*.astro'))) {
  const label = relative(repoRoot, file)
  for (const match of readFileSync(file, 'utf8').matchAll(/href(?:=|:\s*)["'](\/[^"']*)["']/g)) {
    checkTarget(label, match[1] ?? '')
  }
}

const uniqueErrors = [...new Set(errors)]
if (uniqueErrors.length > 0) {
  console.error(`Found ${uniqueErrors.length} dead link(s) (${checkedLinks} links checked):\n`)
  for (const error of uniqueErrors) console.error(`  ${error}`)
  process.exit(1)
}

console.log(`OK — ${checkedLinks} links checked across ${routeFiles.size} pages, no dead links.`)
