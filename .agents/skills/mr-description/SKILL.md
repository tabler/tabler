---
name: mr-description
description: >-
  Drafts a merge request (MR) or pull request title and body in simple English
  from the current branch versus origin/dev (Tabler). Use when the
  user asks for an MR/PR description, GitLab merge request text, or a branch
  summary for reviewers.
disable-model-invocation: true
---

# MR / PR description from branch

Produce a **short title** and a **markdown body**, each in its own fenced **`markdown`** block, ready to paste into GitLab (MR) or GitHub (PR). Ground everything in **actual git output** from this repo—not guesses.

## 1. Base branch (this repo)

**Default integration branch:** `dev`. Compare against **`origin/dev`**.

If `origin/dev` is missing (offline clone, no remote), fall back to local `dev`, then ask the user. Only use another base (e.g. `develop`) if the user says so explicitly.

**Comparison range:** use three-dot merge syntax so the description reflects *this branch’s* commits and diff:

- Commits: `git log origin/dev...HEAD --oneline`
- Diff: `git diff origin/dev...HEAD`
- Overview: `git diff origin/dev...HEAD --stat`

If the branch is not pushed yet: `git merge-base dev HEAD` then `git diff <merge-base>...HEAD` (or same with `origin/dev` when available).

## 2. Gather facts (run in parallel when independent)

From the repository root:

- `git status -sb`
- `git log origin/dev...HEAD --oneline` (or `dev...HEAD` if no remote tracking)
- `git diff origin/dev...HEAD --stat`
- `git diff origin/dev...HEAD` — if output is very large, rely on `--stat` plus targeted `git diff origin/dev...HEAD -- <paths>` for the touched areas
- `git branch --show-current` — current branch name for the Vercel preview URL

Use this to infer **intent**, **user-visible behavior**, and **risk**—not only filenames.

**Existing PR content:** Before drafting, check whether a PR already exists for this branch (e.g. `gh pr view --json title,body,number,url` for the current branch, or a PR number/URL the user gave you). If one exists, read its current title and body first:

- Carry over any issue references it already contains — `Closes #N`, `Fixes #N`, `Resolves #N`, or a plain `#N` mention — into the new body. Put them in **Notes / rollout** (or, if the PR uses a dedicated `Issue`/`Closes` line, keep that same convention) so a regenerated description never silently drops the link to a tracked issue.
- Don't assume the diff alone tells you which issue this closes — the existing PR body is often the only place that link is recorded.
- If no PR exists yet, skip this step (there is nothing to carry over).

**Vercel preview URL:** after the branch is pushed, Vercel deploys a preview. Build the link from the branch name:

1. Take the current branch name from `git branch --show-current`.
2. Replace `/` with `-`, **remove dots entirely** (do not replace them with dashes), and use lowercase (e.g. `feature/pricing-banner` → `feature-pricing-banner`, `update-icons-3.45.0` → `update-icons-3450`).
3. Insert into: `https://tabler-git-{branch-slug}-tabler-io.vercel.app/`

Examples:
- branch `bundle-framing-posthog-flag` → `https://tabler-git-bundle-framing-posthog-flag-tabler-io.vercel.app/`
- branch `update-icons-3.45.0` → `https://tabler-git-update-icons-3450-tabler-io.vercel.app/`

If the diff touches specific routes or pages, append that path to the preview URL. **Preview pages use the `.html` extension**: a page from `preview/pages/icons.astro` is served at `/icons.html` (e.g. `…vercel.app/icons.html`), not `/icons`. Docs pages use directory URLs without extension: a page from `docs/pages/ui/components/badge.mdx` is served at `/ui/components/badge/`. Mention the exact path(s) in **Preview**.

## 3. Title

- One line, **imperative mood**, **≤ 72 characters** when possible.
- Prefer **why** or **outcome** over a generic “Update components”.
- Match existing team style if `git log origin/dev..HEAD` shows a pattern (e.g. conventional prefixes).
- If the title names a **code-level identifier** (feature-flag key, exported function, env var, route, exact symbol from the diff), wrap that token in **backticks** (grave accents), not quotes.

**Deliver the title to the user** inside a fenced **`markdown`** block with **only** the title line inside (no heading, no label). That matches the body block and makes one-click copy work in the UI.

Example (what you output):

```markdown
Remove `money-back-guarantee` flag; show label on paid plans
```

## 4. Body (markdown template)

Output the body in a **second** fenced **`markdown`** block after the title block. Use this structure inside that block. Omit **Notes / rollout** if nothing applies. Do **not** add a separate `## Test plan` section unless the user explicitly asks for one—use **Preview** instead.

```markdown
## Summary

- …

## Preview

- **URL:** [preview link](https://tabler-git-{branch-slug}-tabler-io.vercel.app/…)
- **How to test:** … (concrete steps tied to the diff—what to open, click, or verify; mention feature flags, env, or auth if the diff requires them)

## Notes / rollout

- … (breaking changes, feature flags, migrations—only if supported by the diff)
```

**Summary bullets:** 1–4 bullets tying changes to product/engineering impact.

**Preview:** Always include when the branch is pushed (or note that preview is unavailable until push). Use the Vercel URL format from §2. Link the most relevant path(s)—homepage only if changes are global; otherwise deep-link (e.g. `/pricing`, `/blog/…`). **How to test** should be actionable: which page, which UI element or behavior changed, and what the reviewer should expect to see.

**Notes:** Feature flags, env vars, backwards compatibility—only when evidenced in the diff or commit messages. Also include any issue reference carried over from an existing PR (see §2), e.g. `Closes #123`.

## 5. Language (simple English)

Write the **title** and **full MR body** in **simple English**, even if the user asked in another language.

- Short sentences. Common words. One idea per sentence when possible.
- No buzzwords or filler. Use technical terms only when they appear in the code or are needed to name a behavior.
- Bullets should be easy to scan; avoid nested lists unless necessary.

## 6. After output

Offer to open/create the MR if the user uses **GitLab** (project MCP or UI) or **GitHub** (`gh pr create`), without running destructive git commands unless they ask.
