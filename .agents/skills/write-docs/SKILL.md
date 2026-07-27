---
name: write-docs
description: Write or update Tabler documentation pages in simple English using the current docs schema. Use when the user asks to create docs, edit docs, add new feature docs to an existing page, or standardize docs structure across any docs category.
disable-model-invocation: true
---

# Write Tabler Docs

Write docs directly in files (do not stop at draft mode) and follow the current Tabler documentation schema.

## 1. Scope and behavior

- Works for any docs page type under `docs/pages/**` (components, utilities, forms, layout, plugins, base, getting started, emails, illustrations, icons, index pages). Pages are MDX: leaf pages `foo.mdx`, parents with sub-pages `foo/index.mdx`.
- Edit existing pages when the user asks to document new functionality in an existing component/page.
- Create new pages when needed.
- Use simple English in all prose.

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
layout: '@shared/layouts/DocsMdxLayout.astro'
---
```

Rules:

- Keep frontmatter static YAML only.
- By default, include only `title`, `summary`, `description`, and `layout`.
- Add extended keys (for example `bootstrapLink`, `order`, `plugin`, `docs-libs`, `redirect`) only when the user explicitly asks for them or nearby pages in the same category use them.

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
import Example from '@shared/components/docs/Example.astro';

<Example>
<button class="btn btn-primary">Primary button</button>
</Example>
```

- Add 1-2 short sentences before each preview block to explain what the preview shows.
- Use props when useful: `hideCode`, `centered`, `vertical`, `raw`, `column`, `bg`, `height`, `codeOnly`.
- For a cleaner displayed snippet than the rendered preview, pass `code={...}`.
- For icons and other shared components inside examples, import them from `@shared/components/` (for example `<Icon name="plus" />`).
- Raw HTML in the `Example` slot is reserialized by MDX — keep markup lines attached to tags to avoid stray `<p>` wrapping.

## 6. Workflow for each request

1. Identify target file(s) in `docs/pages/**`.
2. Read the target page and 2-3 nearby pages in the same category to match tone and conventions.
3. Apply the schema from section 4.
4. Write/update the page directly in file(s).
5. Keep only required frontmatter by default.
6. Ensure prose is in simple English.
7. Verify heading hierarchy (`##` then `###`) and snippet validity.

## 7. Rules while updating existing docs

- Preserve valid existing content that is still correct.
- Add new functionality docs as focused new subsection(s), usually under `Variants`, `Usage`, or `Examples`.
- Remove or rewrite only conflicting or outdated text.
- Keep naming and terms consistent across the page.

## 8. Quality checklist before finishing

- [ ] Uses simple English.
- [ ] Frontmatter uses static YAML.
- [ ] Default frontmatter contains only `title`, `summary`, `description`, `layout` (unless user requested extra keys).
- [ ] Follows schema and heading hierarchy.
- [ ] Examples use the `Example` component pattern where applicable.
- [ ] Accessibility section exists for interactive UI docs.
- [ ] No mention of changeset reminders unless user asks.
