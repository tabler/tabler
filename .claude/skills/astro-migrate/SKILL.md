---
name: astro-migrate
description: Converts Tabler pages/partials (Eleventy/Liquid, preview and docs packages) to the Astro workspace package preview-astro/ with a guaranteed 1:1 DOM match. Use when the user wants to port/migrate/convert a page, card, include, or docs page to Astro ("migrate page X to Astro", "convert docs Z").
---

# Eleventy/Liquid → Astro migration (Tabler)

Goal: the ported page must generate a **semantically identical DOM** to the
Eleventy build. The completion criterion is binary: `compare-dom.py` must print
`IDENTICAL`. Do not report success without it.

Target project: `preview-astro/` (workspace package in this repo). Porting
conventions (parameter mapping, is:inline, known bugs): `preview-astro/MIGRATION.md` — read
it before the first port. State and pitfalls: memory `tabler-astro-poc`.

## Process

1. **Reference.** Build the Eleventy dev build into a temporary directory:
   - preview: `cd preview && NODE_ENV=development npx eleventy --output=<TMP>/eleventy-dist`
   - docs: `cd docs && NODE_ENV=development npx eleventy --output=<TMP>/docs-dist`
   The reference HTML file settles every doubt about condition branches and
   parameter values — compare against it tag by tag.

2. **Recon.** Read the page front matter (`preview/pages/*.html`), the layout
   chain (`shared/layouts/`), the includes used (`shared/includes/`) and data
   (`shared/data/*.json` → copy what's needed into `preview-astro/src/data/`).

3. **Inventory.** Check what already exists in `preview-astro/src/components/` —
   do not duplicate. Extend existing components according to the Liquid source
   while preserving their current output (already-migrated pages must stay
   IDENTICAL — after changing a shared component, re-diff all of them).

4. **Port.** Kebab-case parameters → camelCase props; `class` stays `class`;
   class token order identical to Liquid. Charts go through `Chart.astro`
   (never hand-write ApexCharts configs). Page scripts/modals go through
   `addPageScript`/`addPageModal` — registration MUST be synchronous in the
   frontmatter (before the first `await`), because Astro renders siblings
   concurrently.

5. **Build + diff.** In preview-astro: `pnpm test` — it builds the package,
   builds/reuses the Eleventy references in `.parity/` and checks every page
   from `parity-manifest.json` (comparator: `preview-astro/.build/compare-dom.py`).
   For a single page during iteration:
   `python3 .build/compare-dom.py <ref>.html dist/<page>.html --out-dir .parity/diff`
   Iterate until `IDENTICAL`, then ADD THE PAGE to `parity-manifest.json` —
   that's what locks it against regressions. The comparator normalizes
   only non-semantic things: attribute order, whitespace, comments,
   cache-busters, the footer timestamp, the `include['size']` bug classes
   (`icon-N`/`btn-N` etc.) and shiki block presentation (code content is
   compared as text). Do NOT add normalizations that hide real differences.

6. **Visual check.** preview-astro dev server (port 4321) + screenshot; check
   the console and interactions (dropdowns, modals, charts).

An accepted, unavoidable residual diff (rare — e.g. MDX re-serialization
artifacts) can be frozen: save the semantic.diff under `.build/known-diffs/`
and reference it from the manifest entry as `knownDiff`. The gate then fails
on any deviation from the frozen diff.

## Large pages — parallelism

Split a dashboard-sized page into clusters (chrome / shared UI / cards) and
delegate them to `astro-porter` subagents (definition in `.claude/agents/`).
Give each: the Liquid source files, the target files (disjoint between
agents!), the reference path, and a no-build rule. Do the assembly and the
diff loop yourself.

## Docs → MDX

Convert `docs/content/**/*.md` pages to `src/pages/.../index.mdx` with
`scripts/convert-docs-md.py` (maps `{% capture html %}` + `docs/example.html`
to `<Example>`, ui/* includes to components). Layout: `DocsMdxLayout.astro`
(frontmatter/headings adapter for `DocsLayout`). Slot-form limitation: MDX
re-serializes raw HTML (entities, `<path/>`, `<p>` around multi-line text) —
the converter joins text onto tag lines; when snippet-text fidelity is a hard
requirement, use the `html={...}` prop instead.

## Known pitfalls (discovered via diff — do not skip)

- `<style>`/`<script>` in templates always with `is:inline` (otherwise scoped
  CSS adds `data-astro-cid-*` across the page / the script gets bundled).
- `markdown.smartypants: false` is already set — do not remove it (Liquid does
  not produce typographic quotes).
- JSX decodes entities in attribute strings — pass entities as expressions:
  `title={"...&hellip;"}`.
- Liquid does NOT escape `{{ variables }}` — equivalents need `set:html`.
- Astro appends `overflow-x: auto` to shiki `<pre>` — the post-build
  integration in astro.config already strips it.
- The `include['size']` bug in 16 Liquid partials (returns the argument count) —
  port the INTENT (class only with an explicit `size`), never the bug itself.
- Chart height: `include.height`/`data.height`/size sm=2.5, lg=15, ×16
  multiplier — see `chart-script.ts`.
