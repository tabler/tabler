---
name: write-docs
description: Write, update, or suggest Tabler documentation pages in simple English using the current docs schema. Use whenever the user asks to create docs, edit docs, add new feature docs to an existing page, or standardize docs structure across any docs category. Also consult this skill proactively — without being asked — whenever a new visual UI component (shared/ui/*.astro), plugin, or other user-facing feature has just been added or changed and has no matching, up-to-date page under docs/content/**, since undocumented components are easy to forget about.
---

# Write Tabler Docs

Follow the current Tabler documentation schema. How far to go depends on how the skill was triggered — see section 1.

## 1. Scope and behavior

- Works for any docs page type under `docs/content/**` (components, utilities, forms, layout, plugins, base, getting started, emails, illustrations, icons, index pages). Pages are MDX: leaf pages `foo.mdx`, parents with sub-pages `foo/index.mdx`.
- Edit existing pages when the user asks to document new functionality in an existing component/page.
- Create new pages when needed.
- Use simple English in all prose.

### Direct request vs. proactive suggestion

- If the user explicitly asked for docs (e.g. "document this", "write docs for X", "update the badge page"), write directly in the files — do not stop at draft mode.
- If this skill triggered on its own because something was built or changed without matching docs, don't start editing files unprompted. Point out what's missing in one or two sentences (which component/plugin, which page it would live under) and ask whether to write it. Proceed to write directly, per the rule above, only once the user says go.

## 2. Required language style (simple English)

- Use short sentences and common words.
- Keep one main idea per sentence when possible.
- Prefer direct verbs: `Use`, `Add`, `Set`, `Show`.
- Avoid buzzwords and marketing filler.
- Keep paragraphs short and easy to scan.

## 3. Frontmatter rules

Default frontmatter (required unless user asks otherwise):

```yaml
---
title: ...
summary: ...
description: ...
---
```

Rules:

- Keep frontmatter static YAML only.
- No `layout:` key — `docs/pages/[...slug].astro` renders every page.
- By default, include only `title`, `summary` and `description`.
- Add extended keys only when the user explicitly asks for them or nearby pages in the same category use them. The full set is `seoTitle`, `seoDescription`, `icon`, `order`, `related`, `docs-libs`, `css-plugins`, `hide-pagination`, `added-in` — the collection schema in `docs/content.config.ts` is strict, so anything else fails the build.

## 4. Documentation schema to follow

Use this section order as the default structure:

1. `## Overview`
2. `## Installation` (optional)
3. `## Variants` or `## Usage` (choose one based on page type)
4. `## Examples` (optional)
5. `## Accessibility`
6. `## SCSS variables` (optional)
7. `## Migration notes` (optional)

Guidance by page type:

- Component-like pages: prefer `Variants`.
- Utility or workflow pages: prefer `Usage`.
- Library/package pages (for example icons, emails): keep `Installation` + `Usage`.
- Intro/index pages: may use concise overview sections, but keep hierarchy clear and consistent.

## 5. Example and snippet pattern

For visual examples, use the shared `Example` component (import after the frontmatter):

```mdx
import Example from '@components/Example.astro';

<Example>
<button class="btn btn-primary">Primary button</button>
</Example>
```

- Add 1-2 short sentences before each preview block to explain what the preview shows.
- Use props when useful: `hideCode`, `centered`, `vertical`, `raw`, `column`, `bg`, `height`, `codeOnly`.
- For a cleaner displayed snippet than the rendered preview, pass `code={...}`.
- For icons and other shared components inside examples, import them from `@ui/` (for example `<Icon name="plus" />`).
- Raw HTML in the `Example` slot is reserialized by MDX — keep markup lines attached to tags to avoid stray `<p>` wrapping.

## 6. Analyzing the component or plugin source

Prose and example markup are only as accurate as their source. Before writing examples, ground them in the actual implementation rather than in guesses or in what a similar-looking page happens to show — nearby `.mdx` pages are a good style reference but can drift out of sync with the code.

- **UI components** live at `shared/ui/<ComponentName>.astro`. Read its `interface Props` block: each field (and its JSDoc comment, when present) is the authoritative list of supported options, defaults, and edge cases — for example `shared/ui/Badge.astro` documents `scale`, `light`, `icon`, and `personId` this way.
- **Plugins and utilities** are often CSS-class-driven rather than a single Astro component. Check `core/scss/**/_<name>.scss` (or `core/scss/tabler-<name>.scss`) for the class variants that actually exist, and `shared/data/<name>.json` when the plugin is data-driven (e.g. `flags`, `payments`, `social-icons`).
- **Real usage** in `preview/pages/**` renders the finished HTML and often exercises more combinations in practice than the docs page does — a useful cross-check for realistic examples.
- Turn what you find into `<Example>` blocks that reflect real, valid prop/class combinations rather than invented markup.

## 7. Registering new pages in the docs menu

`docs/content/**` is not scanned automatically to build navigation — the sidebar tree is frozen in `shared/data/docs.json` (see the comment in `docs/components/DocsMenu.astro`). A new leaf page with no entry there exists but is unreachable from the docs site.

- Only touch `docs.json` for genuinely **new** pages. Editing an existing page needs no menu change.
- Find the matching section in the `menu` array by directory: `docs/content/ui/components/*` → the `"Components"` entry under `"Tabler UI"`, `docs/content/ui/plugins/*` → `"Plugins"`, `docs/content/icons/libraries/*` → `"Libraries"` under `"Tabler Icons"`, and so on — the section `title`/`url` pairs mirror the `docs/content/ui/*` and `docs/content/icons/*` subdirectory names.
- Add `{ "title": "<Title Case name>", "url": "/<matching>/<slug>" }` to that section's `children`, in the same alphabetical position its neighbors already follow.
- **No trailing slash on `url`.** The menu compares it against the page url, which never has one, so a trailing slash silently breaks the active-item highlight for that page.
- The `title` and `url` must match the new page's frontmatter `title` and its file path exactly, or the sidebar entry will point at the wrong place.

## 8. Workflow for each request

1. Identify target file(s) in `docs/content/**` (or determine none exist yet — see section 7).
2. Read the target page and 2-3 nearby pages in the same category to match tone and conventions.
3. Read the underlying component/plugin source per section 6 so examples are accurate, not guessed.
4. Apply the schema from section 4.
5. Write/update the page directly in file(s).
6. If the page is new, add its entry to `shared/data/docs.json` per section 7.
7. Keep only required frontmatter by default.
8. Ensure prose is in simple English.
9. Verify heading hierarchy (`##` then `###`) and snippet validity.

## 9. Rules while updating existing docs

- Preserve valid existing content that is still correct.
- Add new functionality docs as focused new subsection(s), usually under `Variants`, `Usage`, or `Examples`.
- Remove or rewrite only conflicting or outdated text.
- Keep naming and terms consistent across the page.

## 10. Quality checklist before finishing

- [ ] Uses simple English.
- [ ] Examples reflect the real Props/classes found in the source (section 6), not guesses.
- [ ] Frontmatter uses static YAML.
- [ ] Default frontmatter contains only `title`, `summary`, `description`, `layout` (unless user requested extra keys).
- [ ] Follows schema and heading hierarchy.
- [ ] Examples use the `Example` component pattern where applicable.
- [ ] Accessibility section exists for interactive UI docs.
- [ ] New pages have a matching entry in `shared/data/docs.json` (section 7); edits to existing pages don't touch it.
- [ ] No mention of changeset reminders unless user asks.
