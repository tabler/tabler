import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '@shared/lib/site'
import { docsUrlFromId } from '@lib/docs-pages'

export const prerender = true

// Standalone .astro pages. Docs content is not here — it lives in the `docs`
// collection and is rendered by [...slug].astro (added below).
const pages = import.meta.glob('./**/*.astro')

const staticUrls = Object.keys(pages)
  .map((file) => {
    const path = file
      .replace(/^\.\//, '')
      .replace(/\/?index\.astro$/, '')
      .replace(/\.astro$/, '')
    return path ? `/${path}` : '/'
  })
  // the 404 page is not a real route; dynamic routes are expanded from the collection
  .filter((url) => url !== '/404' && !url.includes('['))

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export const GET: APIRoute = async () => {
  const entries = await getCollection('docs')
  const urls = [...new Set([...staticUrls, ...entries.map((entry) => docsUrlFromId(entry.id))])].sort((a, b) => {
    if (a === '/') return -1
    if (b === '/') return 1
    return a.localeCompare(b)
  })

  const isDevelopment = process.env.NODE_ENV === 'development'
  const baseUrl = isDevelopment ? '' : site.docsUrl
  const entriesXml = urls
    .map(
      (url) => `<url>
	<loc>${escapeXml(`${baseUrl}${url}`)}</loc>
</url>`,
    )
    .join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entriesXml}
</urlset>
`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
