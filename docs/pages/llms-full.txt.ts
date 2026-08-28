// https://llmstxt.org — the whole docs as one markdown file, so an agent can
// ingest everything in a single fetch instead of walking the /llms.txt index.
// Pages are the same markdown the `.md` mirrors serve (see [...slug].md.ts):
// home page first, then sidebar order (the same order llms.txt presents),
// pages missing from the sidebar tree last, alphabetically.
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { site } from '@shared/lib/site'
import { docsUrlFromId } from '@lib/docs-pages'
import { baseUrl, menuOrderedUrls, pageMarkdown } from '@lib/llms'

export const prerender = true

export const GET: APIRoute = async () => {
  const menuRank = new Map(menuOrderedUrls().map((url, index) => [url, index]))
  const rank = (url: string) => menuRank.get(url) ?? Infinity
  const entries = (await getCollection('docs')).sort((a, b) => {
    const [urlA, urlB] = [docsUrlFromId(a.id), docsUrlFromId(b.id)]
    if (urlA === '/' || urlB === '/') return urlA === '/' ? -1 : 1
    return rank(urlA) - rank(urlB) || urlA.localeCompare(urlB)
  })

  const base = baseUrl()
  const pages = await Promise.all(entries.map((entry) => pageMarkdown(entry, `${base}${docsUrlFromId(entry.id)}`)))

  const body = `# Tabler — full documentation

> ${site.description}

This is the complete documentation of ${site.docsUrl} as a single markdown file. A curated index of the same pages lives at ${site.docsUrl}/llms.txt.

---

${pages.join('\n\n---\n\n')}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
