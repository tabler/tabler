// The `.md` mirror of a docs page url; the mirror of `/` is `/index.md`.
// Shared by middleware.ts, [...slug].astro and llms.txt.ts — the same rule is
// hand-encoded in vercel.json's Link-header routes, which cannot import it.
// Kept dependency-free so Vercel's middleware bundler can include it.
export const markdownUrlFromDocsUrl = (url: string) => (url === '/' ? '/index.md' : `${url.replace(/\/$/, '')}.md`)
