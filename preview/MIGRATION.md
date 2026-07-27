# Eleventy/Liquid → Astro migration conventions (@tabler/preview)

Historical note: this package was ported from Eleventy/Liquid with the goal of
producing HTML **semantically identical** to the Eleventy build
(`NODE_ENV=development`). Verification used a canonical DOM diff (sorted
attributes, normalized whitespace, no HTML comments); the parity tooling was
removed together with the Eleventy sources once the migration was complete
(see git history: `.build/compare-dom.py`, `.build/parity.mjs`,
`parity-manifest.json`). The conventions below still apply when porting or
writing components. Key fidelity rules:

- **Class token order must be identical** to the Liquid output (attributes are
  sorted for the diff, but attribute values are not).
- Whitespace/indentation/line breaks do not matter.
- HTML comments are not compared, but keep them (e.g. `<!-- BEGIN NAVBAR -->`) —
  the distributed HTML package contains them.

## Mapping

| Liquid | Astro |
|---|---|
| `{% include "x.html" a=1 b-c="y" %}` | `<X a={1} bC="y" />` — kebab-case params → camelCase props |
| `class` parameter | `class` prop (destructure as `class: className`) |
| `{{ content }}` in a layout | `<slot />` |
| `{{ page \| relative }}` | `"."` (root-level pages) |
| global data (`charts`, `menu`, `people`…) | import from `@data/*.json` (alias → `../shared/data`, single source of truth) |
| `site.*` | import `{ site }` from `src/lib/site.ts` (extend as needed) |
| `{% capture_script %}` / `{% scripts %}` | `addPageScript()` from `src/lib/page-scripts.ts` (emitted by BaseLayout) |
| `{% capture_modal %}` / `{% modals %}` | `addPageModal()` from `src/lib/page-modals.ts` / `Modal.astro` |

Script/modal registration MUST be synchronous in the component frontmatter
(before the first `await`) — Astro renders siblings concurrently, so a
registration after `await Astro.slots.render()` can lose the race against the
drain in `PageScripts`/`PageModals`.

## Environment

We mirror the development build: assets without `.min`, favicon
`./favicon-dev.ico`, no SRI, no analytics, `site.useIconfont = false`. Do NOT
add `?123...` cache-busters (they are an artifact of a css.html bug and are
stripped by the diff).

## Known bug we do NOT reproduce

Liquid `include['size']` returns the include argument count (LiquidJS `.size`
meta-property), so the Eleventy output contains junk classes like `icon-1`,
`icon-2`, `btn-4`. We do not generate them in Astro — the diff strips
` (icon|btn|...)-\d+` before comparing. An EXPLICIT `size` parameter
(e.g. `size="sm"` → `icon-sm`, `chart-sm`) is ported normally.

## Astro rules

- Inline `<style>` and `<script>` in components ALWAYS with `is:inline`
  (otherwise Astro adds `data-astro-cid-*` across the page or bundles the script).
- No scoped styles, no CSS imports in frontmatter.
- Components are `.astro` only; helper logic goes to `src/lib/*.ts`.
- TypeScript in frontmatter: `interface Props` + destructuring with defaults.
- Liquid does NOT escape `{{ variables }}` — where titles/content may contain
  entities or markup, use `set:html`.
- JSX decodes entities in attribute strings — pass entities as expressions:
  `title={"...&hellip;"}`.

## Existing building blocks (use, do not duplicate)

- `src/components/Icon.astro` — `<Icon name="eye" color="github" size="sm" inline class="..." />`;
  emits the `<!-- Download SVG icon ... -->` comment + `<svg aria-hidden focusable class="icon ...">`.
- `src/components/Button.astro` — equivalent of ui/button.html (text, href,
  external, element, color, outline, ghost, size, block, disabled, icon,
  iconColor, iconEnd, iconOnly, dismiss, class). Extend it per ui/button.html
  when parameters are missing.
- `src/components/Chart.astro` + `src/lib/chart-script.ts` — ApexCharts engine
  (props: chartId, id?, size? 'sm'|'lg', class?, height?). Never hand-write
  chart configs.
- `src/components/ui/*` — shared UI (Avatar, Trending, Progress, Pagination,
  Flag, DropdownMenu, DropdownDays, ChartSparkline, MapVector, ActivityPart).
- Layouts: `BaseLayout`, `DefaultLayout` (navbar/sidebar page chrome),
  `SingleLayout` (auth pages), `DocsLayout` + `DocsMdxLayout` (docs, MDX).
- Docs examples: `src/components/docs/Example.astro` (slot or `html` prop;
  the `html` prop is lossless for raw-HTML snippet text — MDX re-serializes
  slot content).

## Sources of truth

- Liquid templates: `../shared/includes/...`
- Data: `@data/*.json` → `../shared/data/*.json` (no copies; exceptions: `src/data/docs.json` — generated docs menu tree, `@tabler/core/libs.json` — page libraries)
- Reference output (the target): Eleventy dev build —
  `cd ../preview && NODE_ENV=development npx eleventy --output=<TMP>`
  (docs: same from `../docs`). ALWAYS compare your component against the
  corresponding fragment of the reference (search by text/comments). It
  settles every doubt about parameter values and condition branches.
