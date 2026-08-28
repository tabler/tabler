// The `.md` mirror of a docs page url; the mirror of `/` is `/index.md`.
// The same rule is hand-encoded in vercel.json's Link-header routes.
// Dependency-free so Vercel's middleware bundler can include it.
export const markdownUrlFromDocsUrl = (url: string) => (url === '/' ? '/index.md' : `${url.replace(/\/$/, '')}.md`)
