---
name: upgrade-guide
description: >-
  Write or update the upgrade guide for a Tabler release — the page under `docs/content/ui/getting-started/upgrade/<version>.mdx` that lists every breaking change with a before and after example. Use whenever the user asks for a migration or upgrade guide, release migration notes, or "what breaks in X.Y", and
  proactively before a release when `.changeset/` holds entries that remove or rename something. Covers where the facts come from, the page skeleton, the menu and ordering rules, and how to check the result.
---

# Upgrade guides

One page per release that changes something a user has to touch in their own code. The pages live in `docs/content/ui/getting-started/upgrade/`, the index there lists them as cards, and the docs menu has an "Upgrade" group next to "Frameworks".

```
docs/content/ui/getting-started/upgrade/
  index.mdx   # "Upgrade" — intro + <DocsChildrenCards />, never lists versions by hand
  1-5.mdx     # "Upgrade to 1.5", order: 2
  1-6.mdx     # "Upgrade to 1.6", order: 1
```

A patch or minor release must not break anything (see the `backward-compat` skill), so its guide lists **deprecations**: what still works, what replaces it, and when it goes away. Say "deprecated" and "the old name still works", never "removed" or "gone", and check each claim against the diff from the release tag. Breaking changes, with "you need to", belong to the guide of a major release. A release with nothing deprecated and nothing visible gets no page. Say so in the changelog instead.

## 1. Collect the facts first

The guide is only as good as the list of changes behind it. Never write it from memory or from the changelog summary alone.

1. Find the base commit: the `chore: update versions` commit of the previous release (`git log --oneline --grep "update versions"`), or the last release tag when tags exist.
2. Read every changeset in `.changeset/*.md`. The `minor` ones with "Removed", "Renamed", "Replaced" or "Updated" are the candidates.
3. Diff the things a user can depend on, from that base to `HEAD`:
   - Sass variables and functions: `git diff <base> HEAD -- core/scss | grep -E '^[-+][$@]'`, then split into removed, added and changed. A variable that is removed from `@use … with (…)` is a compile error for the user, so every removed `$var` must be on the page.
   - Custom properties: look at `core/scss/_props.scss` and `_root.scss` for removed `--*` names. Remember the runtime prefix is `--tblr-`, and the sources are written without it.
   - JavaScript exports: `git diff <base> HEAD -- core/js/tabler.ts core/js/src/*.ts | grep '^[-+]export'`. A removed export, a renamed data attribute or a changed global breaks user code.
   - Third-party libraries: `core/libs.json` and `core/package.json`. A library that left `dist/libs` breaks every `<script src="/dist/libs/…">`.
   - Class names: `git diff <base> HEAD -- core/scss | grep -E '^-\.[a-z]'` for removed selectors, and the `check-markup-classes` baseline when it changed.
4. Read the docs diff of each PR (`git show <sha> -- docs`) — the component page usually already has the new usage, and the guide should agree with it word for word.
5. Verify every name you're about to print against the current source. A wrong attribute in a guide is worse than no guide.

## 2. Page skeleton

Copy the structure of the newest existing guide. The order is fixed so readers can compare releases:

```text
---
title: Upgrade to 1.7
summary: Move a project from Tabler 1.6 to 1.7. …
description: Upgrade guide from Tabler 1.6 to 1.7 with all breaking changes, …
added-in: '1.7.0'
order: 1
related: [/ui/getting-started/upgrade/1-6, /ui/getting-started/customize]
---

Intro: how big the upgrade is and the two or three things most likely to bite.
Link to the previous guide for people more than one version behind.

## Overview             "If you… | You need to…" table, one row per change, links to sections
## Update the package   npm + CDN snippet with the exact version
## <One per change>     one section per breaking change: before/after, then what to do
## Sass changes         only for people compiling scss/ themselves: removed variables table,
                        removed functions, changed defaults
## Visual changes       not breaking, but visible: bullets with a bold lead
## What is new in 1.7   short bullet list with links to the component pages, then a changelog link
```

Rules for the body:

- Every breaking change gets a `diff` or a "1.6 / 1.7" pair of code blocks. A sentence without an example is not enough.
- Show the fix, not only the removal. "Removed `$x`" is half a row; "use `$y`" or "nothing, drop it" completes it.
- Removed Sass variables and functions go in a table, even when the section above already explains them. Readers grep the table.
- Deprecated aliases (`.form-hint` → `.form-text`) are listed under a "renamed" heading with "the old name still works", never among the breaking changes.
- The `summary` and `description` must not contain `: ` — unquoted YAML breaks the build.
- Simple English, contractions allowed, no marketing. The `write-docs` skill has the tone rules.

## 3. Ordering and the index

- `order` in the front matter drives the cards on the index and the menu is hand-written, so both must agree: newest release first. When adding `1-7.mdx`, give it `order: 1` and bump the older ones by one.
- `index.mdx` renders `<DocsChildrenCards url="/ui/getting-started/upgrade" />`; do not add cards or a version list by hand.
- Add the new page to `shared/data/docs.json` under the `"Upgrade"` group, first in `children`, `"url": "/ui/getting-started/upgrade/1-7"` with no trailing slash. The group is a level-two entry next to "Frameworks", because the docs menu only nests two levels below a section.
- Update `related` on the previous guide's neighbours when they point at the old newest page.

## 4. Renaming or moving a guide

A guide's URL is linked from release notes on GitHub and npm, so it must never just disappear. Add the old path to `docs/lib/redirects.ts` with `status: 301`. The middleware reads the same map, so nothing else is needed.

## 5. Check

1. Restart the docs dev server: a new page 404s until it does (`astro-dev` skill, port 3010).
2. Open `/ui/getting-started/upgrade` and the new page. Check the sidebar highlights the entry, the cards are in the right order, and every anchor in the overview table resolves.
3. `pnpm run check:docs-links` — dead internal links fail it.
4. `pnpm run lint:md` for the markdownlint rules on `docs/content`. `docs.json` is tab-indented and outside the prettier scope, so don't run prettier on it.

Do not write a changeset for the guide unless asked; the `generate-changeset` skill covers that when the PR is opened.
