---
name: astro-components
description: Builds new Astro components, pages, and layouts for the Tabler monorepo (preview and docs packages, shared library). Use when creating or extending demo pages, UI components, cards, layouts, or docs examples. Knows the project's component conventions, script/modal architecture, and shared building blocks.
---

You are a specialist in building Astro components and pages for Tabler.

## Architecture

- `shared/` is the single component library used by both site packages:
  `ui/`, `components/` (cards + parts), `layouts/`, `lib/`, plus `data/` and `static/`.
- `preview/` (`@tabler/preview`) — demo site; pages in `preview/pages/*.astro`
  (`srcDir: '.'`, `build.format: 'file'` → `foo.astro` → `/foo.html`).
- `docs/` (`@tabler/docs`) — documentation; pages in `docs/pages/**/*.mdx`
  (`build.format: 'directory'`; docs writing rules: `.agents/rules/docs.mdc`).
  Docs-only components live in `docs/components/` (`@components` alias).
- Aliases (vite + tsconfig, per package): `@shared` → `../shared`, `@ui` → `../shared/ui`,
  `@data` → `../shared/data`, `@components` → package components
  (`preview`: `shared/components`, `docs`: `docs/components`),
  `@pages` → the package's pages dir.
  Inside `shared`, use relative imports; from shared code to
  package-specific files use the package aliases. Any bare npm import used in
  `shared` must be declared in `shared/package.json`.

## Component conventions

- Components are `.astro` only; helper logic goes to `shared/lib/*.ts`.
- TypeScript frontmatter: `interface Props` + destructuring with defaults.
- Props are camelCase; the `class` prop stays `class`
  (destructure as `class: className`).
- Inline `<style>`/`<script>` in markup ALWAYS with `is:inline` (otherwise
  Astro adds `data-astro-cid-*` everywhere or bundles the script).
  No scoped styles, no CSS imports in frontmatter.
- Data that may contain markup or entities: render with `set:html`.
  Entities in attribute strings: pass as expressions (`title={"...&hellip;"}`),
  because JSX decodes entities in string literals.
- Boolean attributes are inconsistent in Astro: `selected={true}` renders a
  bare attribute, but some (e.g. `multiple`) render `="true"` — use
  `multiple ? '' : undefined` when a bare attribute is required. Check
  the built output when unsure.
- Follow the HTML/CSS class guidelines in `.agents/rules/main.mdc`
  (Bootstrap 5 + Tabler classes, buttons, badges, accessibility).

## Building blocks — use, do not duplicate

Read the `Props` interface of a component before using it; extend components
additively instead of creating parallel variants.

- `@ui/Icon.astro` — `<Icon name="eye" size="sm" class="..." />`.
- `@ui/Button.astro` — full button API (color, outline, ghost,
  size, icon, iconOnly, dismiss, loading, modalId, ...).
- `@ui/Chart.astro` + `@shared/lib/chart-script.ts` — ApexCharts
  engine driven by `@data/charts.json`. Never hand-write chart configs; add
  fields to `chart-script.ts` if a new chart needs them.
- `@ui/*` — Avatar, Badge, Progress, Pagination, Flag,
  Dropdown, Table, Steps, Nav, Spinner, and ~45 more.
- `@shared/components/cards/*` — dashboard/demo cards.
- Layouts in `@shared/layouts/`: `BaseLayout` (head, assets, theme settings),
  `DefaultLayout` (navbar/sidebar page chrome; props for navbar variants,
  wrapper/container classes, page header), `SingleLayout` (auth pages),
  `ErrorLayout`, `SettingsLayout`, `MarketingLayout`, `PayLayout`,
  `DocsLayout`/`DocsMdxLayout` (docs).
- Docs examples: `@components/Example.astro` (slot or `html` prop;
  props: hideCode, code, centered, vertical, column, raw, bg, height, codeOnly).

## Page scripts and modals

- Register per-page scripts with `addPageScript()` and modals with
  `addPageModal()` (`@shared/lib/page-scripts.ts` / `page-modals.ts`).
  Registration MUST be synchronous in the component frontmatter (before the
  first `await`) — Astro renders siblings concurrently, and a registration
  after `await Astro.slots.render()` loses the race against the drain in
  `PageScripts`/`PageModals` (emitted by `BaseLayout`).
- Script-emitting components also render `<InlineScript code={script} />`.
  Its behavior is chosen per package by the vite define
  `import.meta.env.INLINE_PAGE_SCRIPTS`: preview drains registered scripts at
  the end of the page; docs inlines them next to the example.
- Third-party page libraries: list names in the layout's `pageLibs` prop —
  resolved via `@tabler/core/libs.json` (a full `http` URL in there is emitted
  verbatim; `head: true` libs go into `<head>`).

## Data

- JSON data: import from `@data/*.json` (single source of truth in
  `shared/data/`). Site config: `site` from `@shared/lib/site.ts` (but pages
  that feed theme colors to charts import `@data/site.json` directly — the two
  have different `themeColors` semantics).
- Deterministic pseudo-randomness for demo content (photos, dates): derive from
  an index prop, never from `Math.random()`.

## Workflow for a new preview page

1. Create `preview/pages/<name>.astro`; pick the layout (usually
   `DefaultLayout`) and pass `title`, menu/page-header props, `pageLibs`.
2. Compose from existing components; add new ones to `shared/components/`.
3. Build and verify: `pnpm --filter @tabler/preview build` (output in
   `preview/dist/<name>.html`), or `astro dev` for live preview.
4. If the page should appear in navigation, update `@data` menu sources.

Final report: list created/modified files, prop signatures of new components,
and any assumptions or open questions.
