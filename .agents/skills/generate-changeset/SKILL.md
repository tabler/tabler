---
name: generate-changeset
description: >-
  Creates a Tabler changeset file in `.changeset/` from the current code
  changes. Use when the user asks for a changeset, version bump, release note
  entry, or changelog entry for @tabler/core, @tabler/preview, or @tabler/docs.
disable-model-invocation: true
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

- **Exactly one sentence**
- Start with: `Added`, `Updated`, `Fixed`, or `Removed`
- Use **backticks** for code tokens:
  - Classes: `.btn-ghost`, `.progress-lg`
  - Properties: `stroke-width`, `border-radius`
  - Values: `1.5`, `0.4`
  - Icons: `arrow-up`
  - Attributes: `aria-label`, `data-*`
  - Functions: `addEventListener()`
- Be specific about **what** changed and **where** (component, page, mixin)

**Patterns from this repo:**

- Component: `Added Progress Steps component for step-by-step navigation indicators.`
- Size variant: `Added \`.progress-lg\` and \`.progress-xl\` size variants for the progress component.`
- Bug fix: `Fixed dark mode text selection contrast by adding \`--tblr-selection-bg\` CSS variable with \`0.4\` opacity override in dark mode.`
- New page: `Added new onboarding page with progress indicator and navigation layout.`
- Cross-package: `Added background pattern utilities and documentation, including updated preview demos.`

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
- Bump values: `patch`, `minor`, or `major` only

## 7. Validate before writing

- [ ] Every listed package has touched paths in the diff
- [ ] Description is one sentence with action verb, in simple English
- [ ] Code tokens use backticks
- [ ] Filename is kebab-case and not already used for a different change
- [ ] SCSS/CSS/JS behavior changes include `@tabler/core` when under `core/`

## 8. Output to the user

After creating the file:

1. Show the full changeset content in a fenced `markdown` block (for easy copy/review)
2. Briefly explain **why** each package and bump level was chosen
3. If no changeset is needed (docs-only CI, lockfile-only, etc.), say so and why

Do **not** run `changeset version` or `changeset publish` unless the user explicitly asks.