import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

export type DocsPage = {
  url: string
  title: string
  description: string
  icon?: string
  order: number
}

const segments = (url: string) => url.split('/').filter(Boolean)

/** Canonical docs URL form: leading slash, no trailing slash, root stays "/". */
const normalizeUrl = (url: string) => {
  const parts = segments(url)
  return parts.length ? `/${parts.join('/')}` : '/'
}

/** Collection id → docs URL: `ui/components` → `/ui/components`, `index` → `/`. */
export const docsUrlFromId = (id: string) => (id === 'index' ? '/' : `/${id}`)

const toPage = (entry: CollectionEntry<'docs'>): DocsPage => ({
  url: docsUrlFromId(entry.id),
  title: entry.data.title,
  description: entry.data.description,
  ...(entry.data.icon ? { icon: entry.data.icon } : {}),
  order: entry.data.order,
})

// Both helpers below run on every page render; one collection read is enough.
let pages: Promise<DocsPage[]> | null = null
const allPages = () => (pages ??= getCollection('docs').then((entries) => entries.map(toPage)))

/** Card data (title, description, icon) for a single docs url, or null when unknown. */
export async function getDocsPage(url: string): Promise<DocsPage | null> {
  const target = normalizeUrl(url)
  return (await allPages()).find((page) => page.url === target) ?? null
}

/** Direct child pages of a docs index url. */
export async function getDocsChildren(parentUrl: string): Promise<DocsPage[]> {
  const parent = normalizeUrl(parentUrl)
  const depth = segments(parent).length + 1

  return (await allPages())
    .filter((page) => {
      const parts = segments(page.url)
      return parts.length === depth && normalizeUrl(parts.slice(0, -1).join('/')) === parent
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}
