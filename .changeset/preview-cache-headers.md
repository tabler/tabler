---
"@tabler/preview": patch
---

Added `Cache-Control` headers for the static files of the Vercel preview deployment (`/static`, `/dist`, `/preview`), so browsers and the CDN stop revalidating them on every request.
