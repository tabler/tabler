import type { APIRoute } from 'astro'
import { site } from '@shared/lib/site'

export const prerender = true

// Vercel sets VERCEL_ENV to "production" on preview.tabler.io and to "preview"
// on branch deploys; it is unset locally. Only production may be crawled,
// and the sitemap URL is absolute outside development.
export const GET: APIRoute = () => {
  const environment = process.env.NODE_ENV || 'production'
  const isProduction = process.env.VERCEL_ENV === 'production'
  const sitemapBase = environment !== 'development' ? site.previewUrl : ''
  const body = `Sitemap: ${sitemapBase}/sitemap.xml

User-agent: *
Disallow:${isProduction ? '' : ' /'}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
