import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
// `z` re-exported from astro:content is deprecated and slated for removal.
import { z } from 'astro/zod'

// Docs pages live in ./content (not ./pages) so they are not routed by the file
// system — pages/[...slug].astro renders them from this collection instead.

/** Accepts both `docs-libs: apexcharts` and `docs-libs: [apexcharts]`. */
const stringList = z.union([z.string(), z.array(z.string())]).transform((value) => (Array.isArray(value) ? value : [value]))

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './content',
    // Ids mirror the page URL without the leading slash: `ui/components/button`,
    // `ui/components` (from ui/components/index.mdx), `index` for the home page.
    // Explicit so ids never depend on Astro's default slugification.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, '').replace(/\/index$/, ''),
  }),
  schema: z
    .object({
      /** the page's h1 heading */
      'title': z.string(),
      /** lead paragraph below the title */
      'summary': z.string(),
      /** SEO description */
      'description': z.string(),
      'seoTitle': z.string().optional(),
      'seoDescription': z.string().optional(),
      /** icon name for the card this page gets on its parent index page */
      'icon': z.string().optional(),
      /** position among sibling pages; unordered pages sort last, then by title */
      'order': z.number().default(999),
      /** docs URLs of related pages, rendered above the pagination */
      'related': z.array(z.string()).default([]),
      /** extra libraries from libs.json (css+js) */
      'docs-libs': stringList.default([]),
      /** extra tabler-<name>.css sheets for this page's demos */
      'css-plugins': stringList.default([]),
      'hide-pagination': z.boolean().default(false),
      /** renders the "Added in X" badge next to the h1 */
      'added-in': z.string().optional(),
    })
    // strict so a mistyped key fails the build instead of being silently dropped
    .strict()
    // kebab-case front matter keys → the camelCase props DocsLayout expects
    .transform(({ 'docs-libs': docsLibs, 'css-plugins': cssPlugins, 'hide-pagination': hidePagination, 'added-in': addedIn, ...rest }) => ({ ...rest, docsLibs, cssPlugins, hidePagination, addedIn })),
})

export const collections = { docs }
