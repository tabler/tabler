// Vercel Routing Middleware (https://vercel.com/docs/routing-middleware): serves
// the markdown mirror of a docs page when the client prefers it via
// `Accept: text/markdown`. Runs only on Vercel deployments.
import type { MiddlewareHandler } from 'astro'
import { next, rewrite } from '@vercel/functions'
import { preferredFormat } from './lib/accept'

// Astro also picks this file up as its own middleware (`srcDir` is the project
// root) and requires an `onRequest` export. Prerendered pages need none, so it
// is a passthrough — the negotiation lives in Vercel's routing layer below.
export const onRequest: MiddlewareHandler = (_context, nextHandler) => nextHandler()

export const config = {
  // Only extensionless paths, i.e. the html docs pages. Requests that name a
  // file directly (.md, .txt, assets) skip negotiation entirely.
  matcher: '/((?!.*\\.).*)',
}

export default function middleware(request: Request) {
  const format = preferredFormat(request.headers.get('accept'))

  if (format === 'markdown') {
    const url = new URL(request.url)
    url.pathname = url.pathname === '/' ? '/index.md' : `${url.pathname.replace(/\/$/, '')}.md`
    return rewrite(url)
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

  return next()
}
