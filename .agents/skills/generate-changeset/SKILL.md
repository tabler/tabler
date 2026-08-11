---
name: generate-changeset
description: >-
  Creates a Tabler changeset file in `.changeset/` from the current code
  changes. Use this skill for every changeset in this repo — when the user asks
  for a changeset, version bump, release note, or changelog entry, and also on
  your own whenever a change under `core/`, `preview/`, or `docs/` is about to
  be committed or opened as a PR. Never hand-write the file instead.
---

# Generate changeset

Create one `.changeset/<name>.md` file per logical change. Ground package selection and bump level in **actual git output**—not guesses.

## 1. Inspect the change

From the repository root, determine scope:

- **Uncommitted work:** `git status -sb`, `git diff`, `git diff --cached`
- **Branch work (default base: `dev`):** `git diff origin/dev...HEAD --stat`, then targeted `git diff origin/dev...HEAD -- <paths>`

If the user points at specific files or a feature, read those diffs first.

## 2. Map paths to packages

| Path | Package |
|------|---------|
| `core/` | `@tabler/core` |
| `preview/` | `@tabler/preview` |
| `docs/` | `@tabler/docs` |
| `shared/includes/`, `shared/data/` | Usually `@tabler/preview`; add `@tabler/docs` if docs examples reference it |
| Root tooling (`.github/`, `turbo.json`, lockfile only) | Often **no changeset** unless it affects published package behavior |

Include **every affected package** in the frontmatter. Omit packages with no relevant changes.

## 3. Choose bump level (per package)

| Level | When |
|-------|------|
| **patch** | Bug fixes, small improvements, style/accessibility tweaks, variable/token fixes, doc typo/format fixes |
| **minor** | New components, new pages, new CSS classes/utilities, significant enhancements, new preview demos |
| **major** | Breaking changes, removed APIs/classes, rewrites that break consumers (rare in this repo) |

Packages can differ: e.g. `@tabler/core`: minor + `@tabler/docs`: patch is valid.

When unsure between patch and minor: prefer **patch** for fixes and visual tweaks; prefer **minor** for new user-facing capabilities.

## 4. Write the description

A changeset is one line in a changelog. It is not a summary of the work.

- **One sentence, 130 characters or fewer**, including backticks. This is the limit to write to.
- **160 characters is a hard ceiling.** Go over 130 only when a shorter version would drop a fact the reader needs — a long list of affected components, for example. Never go over 160.
- Start with: `Added`, `Updated`, `Fixed`, or `Removed`
- Say **what** changed and **where** (component, page, utility). Then stop.
- **Name at least one concrete thing**: a component, class, CSS variable, Sass variable, page, data file, or dependency. "Fixed mixed declarations in SCSS" and "Updated flags and avatars styling" name nothing — a reader cannot tell whether the change affects them. There is no minimum length, but an entry under ~40 characters that names nothing is almost always too vague; a dependency bump like `Updated Bootstrap to v5.3.8.` is fine at 28, because the dependency and version are the content.
- Use **backticks** for code tokens:
  - Classes: `.btn-ghost`, `.progress-lg`
  - Properties: `stroke-width`, `border-radius`
  - Values: `1.5`, `0.4`
  - Icons: `arrow-up`
  - Attributes: `aria-label`, `data-*`
  - Functions: `addEventListener()`

**Count the characters before writing the file:**

```shell
printf '%s' 'Added Progress Steps component for step-by-step navigation indicators.' | wc -c
```

If it is over the limit, **cut words**. Never split it into two sentences, a second paragraph, or a bullet list.

### Leave this out

These belong in the PR description or the commit body, not in the changeset:

- Why the change was made, or what was broken before
- How it was built: file paths, mixin internals, refactor steps
- A list of every affected component, page, or variable
- Migration and rollout notes, unless the change is breaking

**Cut the tail first.** An over-long entry in this repo is almost always a good sentence with a trailing justification clause glued on. Delete that clause and the length problem is usually solved:

```text
… and removed duplicate exports from `tabler.js` for better maintainability.
… with `var(--tblr-bg-surface-secondary)` so it adapts to dark mode.
… live in one `:root` declaration instead of separate dark-mode overrides.
```

### Examples

Good — short and specific:

```text
(70) Added Progress Steps component for step-by-step navigation indicators.
(81) Added `.progress-lg` and `.progress-xl` size variants for the progress component.
(78) Fixed dark mode text selection contrast with a `--tblr-selection-bg` variable.
(58) Removed `license_key` option from the HugeRTE init object.
```

Too vague — name the thing that changed:

```text
 (33) ❌ Fixed mixed declarations in SCSS.
 (79) ✅ Fixed Sass mixed-declaration warnings in the navbar, card, nav and table styles.
 (26) ❌ Updated activity messages.
 (82) ✅ Updated the activity feed messages in `activity.json` and the activity preview page.
```

Too long — trim it:

```text
(175) ❌ Fixed accessibility issues for skip links, keyboard focus, `prefers-reduced-motion`, form labels, and action controls that incorrectly used links instead of `button` elements.
(117) ✅ Fixed accessibility issues in skip links, keyboard focus, `prefers-reduced-motion`, form labels, and action controls.
```

Over 130 but justified — the list of components is the content, and cutting it would say nothing:

```text
(137) Added missing ARIA roles and states to `Pagination`, `NavSegmented`, `Accordion`, `Steps`, tabs, `Modal`, `Offcanvas` and `CarouselCard`.
```

Write in **simple English**, even if the user asked in another language.

### Language (simple English)

- Short sentences. Common words. One idea per sentence when possible.
- No buzzwords or filler. Use technical terms only when they appear in the code or are needed to name a behavior.
- Prefer plain phrasing: “Fixed squircle border radius for cards” over “Enhanced squircle corner-shape rendering pipeline”.
- Keep the description easy to scan in a changelog—reviewers and users should understand it without reading the diff.

## 5. Pick the filename

- Location: `.changeset/`
- **Kebab-case**, descriptive: `progress-sizes.md`, `fix-dark-mode-selection-contrast.md`, `button-ghost.md`
- One logical change per file; split unrelated changes into separate changesets
- Do not overwrite an existing changeset unless the user asks to update it

## 6. File format

```md
---
"@tabler/core": patch
"@tabler/preview": minor
---

One-sentence description here.
```

Rules:

- Frontmatter uses quoted package names: `"@tabler/core": patch`
- Blank line after closing `---`
- No title heading, no bullet list in the body
- Body is a single line — no second paragraph
- Bump values: `patch`, `minor`, or `major` only

## 7. Validate before writing

- [ ] Every listed package has touched paths in the diff
- [ ] Description is one sentence with action verb, in simple English
- [ ] Description is **130 characters or fewer** — counted, not estimated; over 130 only with a reason, never over 160
- [ ] Description names a concrete component, class, variable, page, file, or dependency
- [ ] Code tokens use backticks
- [ ] Filename is kebab-case and not already used for a different change
- [ ] SCSS/CSS/JS behavior changes include `@tabler/core` when under `core/`

## 8. Output to the user

After creating the file:

1. Show the full changeset content in a fenced `markdown` block (for easy copy/review)
2. Give the description length, e.g. `112 / 130 characters`; if it is over 130, say why the extra words earn their place
3. Briefly explain **why** each package and bump level was chosen
4. If no changeset is needed (docs-only CI, lockfile-only, etc.), say so and why

Do **not** run `changeset version` or `changeset publish` unless the user explicitly asks.