---
name: navigation
description: >-
  Make a page reachable and keep its links valid — the preview sidebar/navbar
  menu in `shared/data/menu.json`, the docs menu in `shared/data/docs.json`,
  and the redirects in `docs/astro.config.mjs`. Use whenever a page is added,
  renamed, moved or removed in `preview/pages/` or `docs/content/`, whenever a
  `pageMenu` key does not highlight the right entry, and whenever a docs URL
  changes. Covers both menu formats, the `pageMenu` key rules and the link
  gate.
---

# Menus, URLs and redirects

A new page that no menu points at is invisible, and a renamed docs URL breaks every external link to it. Both menus are hand-maintained JSON; nothing discovers pages automatically.

## 1. Preview menu — `shared/data/menu.json`

An object of top-level groups, each with nested `children`:

```json
"base": {
  "title": "Interface",
  "icon": "package",
  "columns": 2,
  "children": {
    "badges": { "url": "badges.html", "title": "Badges", "badge": "New" }
  }
}
```

| Key | Meaning |
| --- | --- |
| `title` / `title-long` | label; `title-long` is used where the navbar has room |
| `icon` | icon name for the group (top level) |
| `url` | **with the `.html` extension** — `badges.html`, matching `build.format: 'file'` |
| `badge` | small label on the entry, e.g. `"New"` |
| `columns` | split a long child list into N columns |
| `active`, `disabled`, `right` | force highlight, grey out, push to the right side |
| `children` | nested entries (a third level is allowed) |

**The `pageMenu` prop is the path of keys, dot-separated**: `base.badges` matches the `badges` child of the `base` group. `NavbarMenu.astro` splits on `.` and highlights by key, so a mismatch between the page prop and the JSON key silently highlights nothing. `menu-sample.json` is a separate, smaller menu used by sample layouts — leave it alone unless the task is about those.

## 2. Docs menu — `shared/data/docs.json`

An array-based tree (`menu`) plus a `links` list for the external links in the docs header:

```json
{ "title": "Getting started", "url": "/ui/getting-started",
  "children": [ { "title": "Installation", "url": "/ui/getting-started/installation" } ] }
```

- URLs are **absolute paths without an extension and without a trailing slash** (`/ui/components/badge`) — `vercel.json` sets `trailingSlash: false`, so a trailing slash costs a 308.
- The path mirrors the file: `docs/content/ui/components/badge.mdx` → `/ui/components/badge`; an `index.mdx` drops the last segment.
- A page in `docs/content/**` that is missing here still renders — it is simply unreachable by navigation, which is easy to miss because no build step complains.

## 3. Renamed or removed docs URLs

Add an entry to `redirects` in `docs/astro.config.mjs`, next to the existing ones:

```js
'/ui/base/markdown': { status: 301, destination: '/ui/base/prose' },
```

The plural component slugs kept there (`alerts` → `alert`, `cards` → `card`, …) are the pre-Astro URLs still present in Google's index and in external links — that is the standard this repo holds itself to: an old URL keeps working. The Vercel adapter turns these into real HTTP redirects; without an adapter they would only be meta-refresh pages.

Update in the same pass: `shared/data/docs.json`, any `related:` front matter pointing at the old path, and `<DocsLink path="…">` on the matching preview page.

## 4. Verify with the link gate

```bash
pnpm run check:docs-links
```

It resolves, from source and without a build: markdown links and `related:` in `docs/content/**/*.mdx`, menu and link URLs in `shared/data/docs.json`, redirect destinations from `docs/astro.config.mjs`, `href` literals in docs components, `<DocsLink path="…">` and `getDocsUrl('…')` in the demo site, plus asset paths that really render. Anchors are checked against real heading slugs.

It does **not** check `menu.json`: a wrong preview URL or a `pageMenu` key that matches nothing shows up only in the browser. Open the page and confirm the menu entry is highlighted (`astro-dev` skill).

## 5. Checklist

- [ ] New preview page added to `menu.json` with a `.html` url, and its `pageMenu` prop equals the dot-path of the keys
- [ ] New docs page added to `docs.json` at the right depth, url absolute and extension-free
- [ ] Renamed or removed docs URL has a 301 in `docs/astro.config.mjs`
- [ ] `related:` entries and `<DocsLink path="…">` updated to the new path
- [ ] `pnpm run check:docs-links` clean
- [ ] Menu highlighting checked in the browser
