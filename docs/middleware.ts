// Vercel Routing Middleware (https://vercel.com/docs/routing-middleware):
// serves the markdown mirror of a docs page when the client prefers it via
// `Accept: text/markdown`. Runs only on Vercel deployments.
import type { MiddlewareHandler } from 'astro'
import { next, rewrite } from '@vercel/functions'
import { preferredFormat } from './lib/accept'
import { markdownUrlFromDocsUrl } from './lib/markdown-url'
import { redirects } from './lib/redirects'

// Astro picks this file up as its own middleware (`srcDir` is the project
// root) and requires an `onRequest` export; the real logic is Vercel-only.
export const onRequest: MiddlewareHandler = (_context, nextHandler) => nextHandler()

export const config = {
  // extensionless paths outside the asset directories — the html docs pages
  matcher: '/((?!(?:dist|preview|img|static|css|js)/)(?!.*\\.).*)',
}

const alternate = (path: string, type: string) => `<${path}>; rel="alternate"; type="${type}"`

export default function middleware(request: Request) {
  const url = new URL(request.url)

  // renamed pages fall through to their 301; negotiation reruns on the target
  if (Object.hasOwn(redirects, url.pathname)) return next()

  const format = preferredFormat(request.headers.get('accept'))

  if (format === 'markdown') {
    const htmlPath = url.pathname
    url.pathname = markdownUrlFromDocsUrl(url.pathname)
    return rewrite(url, {
      headers: {
        Link: alternate(htmlPath, 'text/html'),
        Vary: 'Accept',
      },
    })
  }

  if (format === 'none') {
    return new Response('Not acceptable. This page is available as text/html or text/markdown.\n', {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Vary': 'Accept',
      },
    })
  }

  return next({
    headers: {
      Link: alternate(markdownUrlFromDocsUrl(url.pathname), 'text/markdown'),
      Vary: 'Accept',
    },
  })
}
