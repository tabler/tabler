import type { APIRoute } from 'astro'
import { site } from '@shared/lib/site'

export const prerender = true

// development, and crawling is allowed only in the preview environment.
export const GET: APIRoute = () => {
  const environment = process.env.NODE_ENV || 'production'
  const sitemapBase = environment !== 'development' ? site.previewUrl : ''
  const body = `Sitemap: ${sitemapBase}/sitemap.xml


User-agent: *
Disallow:${environment === 'preview' ? '' : ' /'}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
