# @tabler/docs

Documentation site for the Tabler ecosystem, deployed at [docs.tabler.io](https://docs.tabler.io). Built with [Astro](https://astro.build) and MDX.

## Development

From the repository root:

```sh
pnpm install
pnpm --dir docs run dev
```

The dev server runs at `http://localhost:3010`.

## Structure

Pages live at the package root (`srcDir: '.'`), not in `src/`:

| Path          | Purpose                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pages/`      | MDX content pages (`ui/`, `icons/`, `illustrations/`, `emails/`) plus `sitemap.xml.ts`, `robots.txt.ts` and `404.astro` |
| `layouts/`    | `DocsLayout.astro` (full page shell) and `DocsMdxLayout.astro` (MDX adapter)                                            |
| `components/` | Docs-only components (`Example`, `DocsMenu`, `DocsCard`, …)                                                             |
| `assets/`     | Docs CSS/JS sources, copied into `public/` at build time                                                                |
| `public/`     | Static assets; `dist/`, `preview/` and `static/` subdirs are synced from other packages by the `copyAssets` integration |

Shared components, layouts and data come from `../shared` (aliases `@shared`, `@ui`, `@data`).

The sidebar tree isn't generated from the filesystem. It's defined in `../shared/data/docs.json`, and a new page needs an entry there to be reachable (see `components/DocsMenu.astro`).

## Build

```sh
pnpm --dir docs run build
```

Static output goes to `dist/` and, via the `@astrojs/vercel` adapter, to `.vercel/output/`. Redirects for renamed pages are defined in `astro.config.mjs` (`redirects`).

## Checks

```sh
pnpm --dir docs run type-check
pnpm run lint:md
pnpm run check:docs-links # validates internal links at the source level (also part of `pnpm lint`)
```
