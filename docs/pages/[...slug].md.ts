// Markdown mirror of every docs page: append `.md` to any docs url.
// `/ui/components/button` → `/ui/components/button.md`. The home page is
// `/index.md`, since `/.md` is not a usable route.
import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { docsUrlFromId } from '@lib/docs-pages'
import { baseUrl, pageMarkdown } from '@lib/llms'

export const prerender = true

export const getStaticPaths = (async () => {
  const entries = await getCollection('docs')

  return entries.map((entry) => ({
    // ids already mirror the page url, and `index` keeps the home page addressable
    params: { slug: entry.id },
    props: { entry },
  }))
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection<'docs'>>>[number] }
  const body = await pageMarkdown(entry, `${baseUrl()}${docsUrlFromId(entry.id)}`)

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
