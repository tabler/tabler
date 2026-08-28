// Vercel Routing Middleware (https://vercel.com/docs/routing-middleware): serves
// the markdown mirror of a docs page when the client prefers it via
// `Accept: text/markdown`, and stamps the `Link: rel="alternate"` header that
// matches the representation actually served. Runs only on Vercel deployments.
import type { MiddlewareHandler } from 'astro'
import { next, rewrite } from '@vercel/functions'
import { preferredFormat } from './lib/accept'
import { redirects } from './lib/redirects'

// Astro also picks this file up as its own middleware (`srcDir` is the project
// root) and requires an `onRequest` export. Prerendered pages need none, so it
// is a passthrough — the negotiation lives in Vercel's routing layer below.
export const onRequest: MiddlewareHandler = (_context, nextHandler) => nextHandler()

export const config = {
  // Only extensionless paths outside the asset directories, i.e. the html docs
  // pages. Requests that name a file directly (.md, .txt, assets) skip
  // negotiation entirely.
  matcher: '/((?!(?:dist|preview|img|static|css|js)/)(?!.*\\.).*)',
}

// The `.md` mirror of a docs page url; the mirror of `/` is `/index.md`.
const markdownPath = (pathname: string) => (pathname === '/' ? '/index.md' : `${pathname.replace(/\/$/, '')}.md`)

const alternate = (path: string, type: string) => `<${path}>; rel="alternate"; type="${type}"`

export default function middleware(request: Request) {
  const url = new URL(request.url)

  // Renamed pages: fall through so Vercel's routing answers with the 301 for
  // every client; a markdown client negotiates again on the canonical url.
  if (Object.hasOwn(redirects, url.pathname)) return next()

  const format = preferredFormat(request.headers.get('accept'))

  if (format === 'markdown') {
    const htmlPath = url.pathname
    url.pathname = markdownPath(url.pathname)
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
      Link: alternate(markdownPath(url.pathname), 'text/markdown'),
      Vary: 'Accept',
    },
  })
}
