---
name: html-diff
description: >-
  Prove that a refactor changes no rendered HTML, using the `html-diff`
  harness over every preview page. Use before and after any change that is
  meant to be output-neutral — extracting or renaming a component, replacing
  hand-written markup with a `shared/ui` component, reordering props,
  restructuring a layout, migrating SCSS class emission — and whenever the
  user asks whether a change is safe or byte-identical. Covers capturing the
  baseline, reading the diff, and what counts as an acceptable difference.
---

# Prove a refactor changes no HTML

`.build/html-diff.ts` renders every preview page from a running dev server and compares it to a stored baseline. It is the only fast way to refactor shared components with confidence: one run covers every page that uses them.

## 1. When to use it

Use it for any change that **should not** alter output: component extraction, replacing repeated markup with a component, renaming props, moving code between `shared/` files, layout restructuring, prettier/format passes.

Do not use it for a change that intentionally alters markup — the whole run will be red and tell you nothing. There, review the diff of the pages you meant to change instead.

## 2. Capture the baseline first

The baseline must come from the tree **before** the change. If you have already started editing, stash first.

```bash
git stash                     # only if the working tree already has the change
pnpm --dir preview run dev    # or preview_start with the `preview` config
pnpm run html-diff:baseline
git stash pop
```

Before editing, list the pages that render what you are about to change:

```bash
grep -rl "Steps.astro" preview/pages docs/content
```

Green on everything is not the only result worth checking — knowing that `all-elements.html` **must** stay identical while `steps.html` is allowed to differ is what turns the run into a proof.

Snapshots land in `.cache/html-diff/` (one HTML file per page) and the directory is wiped on every baseline run. The dev server must be reachable at `http://localhost:3000`; override with `HTML_DIFF_BASE` if you run it elsewhere.

## 3. Check after the change

Keep the same dev server running — it recompiles pages on demand — and run:

```bash
pnpm run html-diff
```

Every page byte-identical:

```
✓ All 128 pages are byte-identical to the baseline.
```

Anything else exits non-zero and prints one line per differing page.

## 4. Reading the output

| Line | Meaning |
| --- | --- |
| `± page: differs at line N` with `-`/`+` | real difference — the first differing line of that page |
| `± page: WHITESPACE-ONLY difference` | identical after collapsing inter-tag whitespace |
| `± page: new page (no baseline snapshot)` | page added since the baseline |
| `± page: page removed` | page deleted, or it now fails to render |
| `✖ N page(s) failed to render` | the dev server is down, or a page throws — fix that before reading anything else |

A whitespace-only difference is usually inert (flex containers, `<select>` internals) but is **not** automatically fine: inside inline contexts whitespace is a rendered space. Open such a page and compare visually before waving it through.

For a full diff of one page, compare the snapshot to the live render:

```bash
diff <(cat .cache/html-diff/badges.html) <(curl -s http://localhost:3000/badges)
```

## 5. What the harness does not cover

- **Preview pages only.** Docs pages and dynamic routes (`[...]` in the filename) are skipped.
- **Dev output, not built output.** The build additionally prettifies HTML; a formatting-only difference can still appear in `dist`.
- The `Generated <date>` footer is normalised away; nothing else is.
- Pages are compared as text, so an attribute reorder counts as a difference even when the DOM is equivalent. That is the point — Tabler ships the HTML.

## 6. Checklist

- [ ] Baseline captured from the pre-change tree, with the dev server running
- [ ] Same dev server used for baseline and check
- [ ] `pnpm run html-diff` green, or every remaining difference explained
- [ ] Whitespace-only pages opened in the browser before accepting them
- [ ] New/removed pages are intentional
