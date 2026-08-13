---
name: demo-pages
description: >-
  Build or update a Tabler demo page under `preview/pages/*.astro` — the pages
  that show a component's variants side by side. Use whenever the user asks to
  add, extend, or clean up a preview/demo page, and on your own after adding a
  new `shared/ui` component that has no page showing it. Covers the page
  skeleton, the header (title, description, docs link, actions), the card grid,
  heading levels, and how to verify the result in the browser.
---

# Write a Tabler demo page

Demo pages live in `preview/pages/*.astro` and are served at `/<name>` in dev, `/<name>.html` in the build. Each one shows the variants of a single component so a reader can compare them at a glance. They are not documentation — the prose is one line per card; the depth lives in `docs/content/**` (see the `write-docs` skill).

## 1. Page skeleton

```astro
---
import DefaultLayout from '@shared/layouts/DefaultLayout.astro'
import Card from '@ui/Card.astro'
import CardBody from '@ui/CardBody.astro'
import CardTitle from '@ui/CardTitle.astro'
import CardSubtitle from '@ui/CardSubtitle.astro'
import DocsLink from '@ui/DocsLink.astro'
---

<DefaultLayout title="Badges" pageMenu="base.badges" description="Badges highlight a count, status, or short label attached to text, buttons, or menu items.">
  <DocsLink slot="page-header-actions" path="/ui/components/badge" />

  <div class="row row-cards">
    <div class="col-md-6 col-lg-4">
      <Card>
        <CardBody>
          <CardTitle>Basic</CardTitle>
          <CardSubtitle>One sentence on what this variant is for.</CardSubtitle>
          …
        </CardBody>
      </Card>
    </div>
  </div>
</DefaultLayout>
```

- `title` — browser title. It also becomes the page header, so **do not repeat it in a `pageHeader` prop**; `pageHeader` exists only for a header that differs from the browser title (`title="Dashboard" pageHeader="Boxed layout"`), or as `pageHeader={false}` for a page with no header at all.
- `description` — renders under the page title *and* fills `<meta name="description">`. One sentence, present tense, says what the component is for.
- `pageMenu` — the menu entry to highlight, e.g. `base.badges`. Match an existing key in `shared/data/menu.json`.
- Never hand-roll a title block inside the page body. The page header is the layout's job.

## 2. Page header extras

Anything to the right of the title goes in the `page-header-actions` slot, as a direct child of `<DefaultLayout>`:

```astro
<DocsLink slot="page-header-actions" path="/ui/components/badge" />
```

- **Docs link:** `path` is the page's path under `docs/content/**` without the extension — `docs/content/ui/components/badge.mdx` → `/ui/components/badge`. Add one whenever a matching docs page exists.
- **Check the path with `pnpm run check-docs-links`.** It resolves every `<DocsLink path="…">` against `docs/content/**` and fails on a typo, so you do not need a browser for this.
- If you do open the link, use `docs-dev.tabler.io`, which serves `dev`. `docs.tabler.io` serves the last release and still has the pre-content-collection urls, so a valid page can 404 there. A 404 on production alone is never a reason to change a path.
- **Prebuilt action groups** (`HeaderActionsButtons`, `HeaderActionsPrint`, `HeaderActionsPhotos`, …) live in `shared/components/layout/` and go in the same slot: `<HeaderActionsButtons slot="page-header-actions" />`. There is no `actions="buttons"` prop any more.

## 3. Card grid

- One card per variant, in `<div class="row row-cards">` with `col-*` wrappers. Keep column widths consistent down the page.
- `CardTitle` names the variant in 1-3 words. `CardSubtitle` explains it in one sentence, naming the prop or class it demonstrates: "Add `showClose` to let users close the alert."
- Put the class or prop in `<code>` inside the subtitle. Readers scan for the token.
- Never write `<h3 class="card-title">` or `<div class="card-subtitle">` by hand — use the components, which also keep the heading level right.

## 4. Heading levels

`CardTitle` and `CardHeader` render `h2`, directly under the page `h1`. Pass `as="h3"` only for a card nested under its own `h2` section heading. Do not introduce raw `<h3>`/`<h4>` headings for card titles; that is what made pages mix levels before.

## 5. Spacing between inline elements

Use the list wrappers instead of margin utilities on each child:

| Wrapper | For |
| --- | --- |
| `<ButtonList>` | rows of buttons |
| `<BadgeList>` | rows of badges |
| `<TagList>` | rows of tags |
| `<AvatarList>` | rows or stacks of avatars |

The pluralised class names (`.badges-list`, `.tags-list`) are deprecated aliases of `.badge-list` / `.tag-list`. Do not add `me-2`/`mb-2` to individual items.

## 6. Data and repetition

- Loop over `shared/data/*.json` (`site.json` colors, `people.json`, `flags.json`) instead of pasting 20 near-identical blocks.
- Cast JSON entries to a named type in the frontmatter when you index into them; `astro check` is part of the quality gates.

## 7. Registering the page

- Add the page to `shared/data/menu.json` so it is reachable, and use the same key in `pageMenu`.
- A new `shared/ui` component usually needs both a demo page and a docs page. After finishing here, check `docs/content/**` and consult the `write-docs` skill if it is missing.

## 8. Verify in the browser

Never hand the page to the user unchecked.

1. `preview_start` with the `preview` config from `.claude/launch.json`, then open `/<page-name>`.
2. Screenshot it, and read the console for errors.
3. For a page built by looping over data, assert the rendered structure instead of eyeballing it:

```shell
curl -s http://localhost:3000/badges | grep -o '<h[1-6]' | sort | uniq -c
```

A demo page should show exactly one `h1` and then `h2`s — no `h3` in the card grid.

## 9. Quality checklist

- [ ] `title` and `description` set; no `pageHeader` repeating the title
- [ ] `DocsLink` present when a docs page exists; `pnpm run check-docs-links` passes
- [ ] One card per variant; `CardTitle` + `CardSubtitle` on each
- [ ] No raw `card-title` / `card-subtitle` / `page-title` markup
- [ ] List wrappers instead of per-item margins
- [ ] `pnpm run format-prettier` and `pnpm run type-check` clean (repo root, not a tail-filtered subset)
- [ ] Page opened in the browser, console clean, heading order checked
- [ ] Changeset written with the `generate-changeset` skill
