// https://llmstxt.org — index of the docs, pointing at the .md mirror of each
// page (see [...slug].md.ts). Order and grouping follow the sidebar tree in
// docs.json; any page missing from that tree still lands in "Other", so the
// index can never silently omit a page.
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import docs from '@data/docs.json'
import { site } from '@shared/lib/site'
import { docsUrlFromId } from '@lib/docs-pages'
import { baseUrl } from '@lib/llms'

export const prerender = true

type MenuNode = { title?: string; url?: string; children?: MenuNode[] }

const normalizeUrl = (url: string) => {
  const parts = url.split('/').filter(Boolean)
  return parts.length ? `/${parts.join('/')}` : '/'
}

export const GET: APIRoute = async () => {
  const entries = await getCollection('docs')
  const byUrl = new Map(entries.map((entry) => [docsUrlFromId(entry.id), entry]))
  const base = baseUrl()
  const listed = new Set<string>()

  const item = (url: string) => {
    const entry = byUrl.get(url)
    if (!entry || listed.has(url)) return null
    listed.add(url)
    // `/` has no `.md` sibling — its mirror is `/index.md`
    return `- [${entry.data.title}](${base}${url === '/' ? '/index' : url}.md): ${entry.data.description}`
  }

  const sections: string[] = []
  for (const group of docs.menu as MenuNode[]) {
    for (const section of group.children ?? []) {
      const urls = [section.url, ...(section.children ?? []).map((child) => child.url)].filter((url): url is string => typeof url === 'string' && url.startsWith('/'))
      const lines = urls.map((url) => item(normalizeUrl(url))).filter(Boolean)
      if (lines.length) {
        sections.push(`## ${group.title} — ${section.title}\n\n${lines.join('\n')}`)
      }
    }
  }

  const remaining = [...byUrl.keys()]
    .filter((url) => !listed.has(url))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
    .map((url) => item(url))
    .filter(Boolean)
  if (remaining.length) {
    sections.push(`## Other\n\n${remaining.join('\n')}`)
  }

  const body = `# Tabler

> ${site.description}

Tabler is a free and open source dashboard UI kit built on Bootstrap. This file indexes the documentation at ${site.docsUrl}.

Every page is available as markdown by appending \`.md\` to its url, for example \`${site.docsUrl}/ui/components/button.md\`. Those files contain the same prose as the html page plus the markup of every example, as fenced code blocks.

The markup is taken from the documentation source. A small number of examples are written with Tabler's own documentation components, and those appear as component tags (for example \`<Alert type="success" />\`) instead of the final html; open the page itself for those.

${sections.join('\n\n')}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
