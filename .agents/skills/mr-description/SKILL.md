---
name: mr-description
description: >-
  Drafts a merge request (MR) or pull request title and body in simple English
  from the current branch versus origin/v2-dev (Tabler). Use when the
  user asks for an MR/PR description, GitLab merge request text, or a branch
  summary for reviewers.
---

# MR / PR description from branch

Produce a **short title** and a **markdown body**, each in its own fenced **`markdown`** block, ready to paste into GitLab (MR) or GitHub (PR). Ground everything in **actual git output** from this repo—not guesses.

## 1. Base branch (this repo)

**Default integration branch:** `v2-dev` (the 2.0 branch, which becomes the main branch). Compare against **`origin/v2-dev`**. `dev` is frozen for 1.x maintenance — use it only when the user explicitly asks for a 1.x PR.

If `origin/v2-dev` is missing (offline clone, no remote), fall back to local `v2-dev`, then ask the user. Only use another base (`dev` for 1.x, anything else) if the user says so explicitly.

**Comparison range:** use three-dot merge syntax so the description reflects *this branch’s* commits and diff:

- Commits: `git log origin/v2-dev...HEAD --oneline`
- Diff: `git diff origin/v2-dev...HEAD`
- Overview: `git diff origin/v2-dev...HEAD --stat`

If the branch is not pushed yet: `git merge-base v2-dev HEAD` then `git diff <merge-base>...HEAD` (or same with `origin/v2-dev` when available).

## 2. Gather facts (run in parallel when independent)

From the repository root:

- `git status -sb`
- `git log origin/v2-dev...HEAD --oneline` (or `v2-dev...HEAD` if no remote tracking)
- `git diff origin/v2-dev...HEAD --stat`
- `git diff origin/v2-dev...HEAD` — if output is very large, rely on `--stat` plus targeted `git diff origin/v2-dev...HEAD -- <paths>` for the touched areas
- `git branch --show-current` — current branch name for the Vercel preview URL

Use this to infer **intent**, **user-visible behavior**, and **risk**—not only filenames.

**Existing PR content:** Before drafting, check whether a PR already exists for this branch (e.g. `gh pr view --json title,body,number,url` for the current branch, or a PR number/URL the user gave you). If one exists, read its current title and body first:

- Carry over any issue references it already contains — `Closes #N`, `Fixes #N`, `Resolves #N`, or a plain `#N` mention — into the new body. Put them in **Notes / rollout** (or, if the PR uses a dedicated `Issue`/`Closes` line, keep that same convention) so a regenerated description never silently drops the link to a tracked issue.
- Don't assume the diff alone tells you which issue this closes — the existing PR body is often the only place that link is recorded.
- If no PR exists yet, skip this step (there is nothing to carry over).

**Vercel preview URL:** only when the diff has **visual / UI changes** a reviewer can check in the browser (CSS, preview pages, docs examples, components, layout). Skip the preview URL for non-visual work (agent skills, CI, tooling, docs prose-only, lockfile, config with no rendered UI effect).

When a preview URL is needed and the branch is pushed, Vercel deploys a preview. **The repo has two separate Vercel projects — pick the one matching the diff:**

| Diff touches | Project | Host |
| --- | --- | --- |
| `preview/**`, `core/**` (demo pages) | `tabler` | `https://tabler-git-{branch-slug}-tabler-io.vercel.app/` |
| `docs/**` (documentation site) | `tabler-docs` | `https://tabler-docs-git-{branch-slug}-tabler-io.vercel.app/` |

Using the `tabler` host for a docs page returns 404 — the pages simply do not exist in that project.

Build `{branch-slug}` from the branch name (`git branch --show-current`): replace `/` with `-`, **remove dots entirely** (do not replace them with dashes), lowercase. Examples: `feature/pricing-banner` → `feature-pricing-banner`, `update-icons-3.45.0` → `update-icons-3450`.

**Verify before pasting.** The slug rule is a convention, not a guarantee. Read the real url from the deployment, then `curl` each link you intend to put in the body:

```shell
gh api repos/tabler/tabler/deployments --jq '[.[] | select(.environment=="Preview – tabler-docs")][0].id'
gh api repos/tabler/tabler/deployments/<id>/statuses --jq '.[0].environment_url'
curl -s -o /dev/null -w '%{http_code}\n' <link>
```

**Links to the published docs** (not a Vercel preview) belong to a different pair of hosts: `docs.tabler.io` serves the last release, `docs-dev.tabler.io` serves `dev` (the 1.x branch — nothing publishes `v2-dev` yet, so 2.0 docs changes are only visible on the Vercel preview). Check any `docs.tabler.io` link you mention against `docs-dev.tabler.io` — production still serves the pre-content-collection URLs, so a page that exists in `docs/content/**` can 404 there without being a broken link.

If the diff touches specific routes or pages, append that path. Path shape differs per project:

- **Preview pages use the `.html` extension**: `preview/pages/icons.astro` → `/icons.html`, not `/icons`.
- **Docs pages use directory urls with no extension and no trailing slash** (`vercel.json` sets `trailingSlash: false`): `docs/content/ui/components/badge.mdx` → `/ui/components/badge`. A trailing slash still resolves, but through a 308 redirect.

Mention the exact path(s) in **Preview**.

## 3. Title

- One line, **imperative mood**, **≤ 72 characters** when possible.
- Prefer **why** or **outcome** over a generic “Update components”.
- Match existing team style if `git log origin/v2-dev..HEAD` shows a pattern (e.g. conventional prefixes).
- If the title names a **code-level identifier** (feature-flag key, exported function, env var, route, exact symbol from the diff), wrap that token in **backticks** (grave accents), not quotes.

**Deliver the title to the user** inside a fenced **`markdown`** block with **only** the title line inside (no heading, no label). That matches the body block and makes one-click copy work in the UI.

Example (what you output):

```markdown
Remove `money-back-guarantee` flag; show label on paid plans
```

## 4. Body (markdown template)

Output the body in a **second** fenced **`markdown`** block after the title block. Use this structure inside that block. Omit **Notes / rollout** if nothing applies. Omit the **URL** line (or the whole **Preview** section) when there are no visual changes—do not link a Vercel preview in that case. Do **not** add a separate `## Test plan` section unless the user explicitly asks for one—use **Preview** (or a short “how to review” note under Summary) instead.

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

**Preview:** Include a Vercel **URL** only when the change is visual and the branch is pushed (or note that preview is unavailable until push). If there are no visual changes, omit the preview link entirely—do not add a homepage or generic preview URL. When a URL is included, use the Vercel format from §2 and deep-link the most relevant path(s)—homepage only if changes are global. **How to test** should be actionable: which page, which UI element or behavior changed, and what the reviewer should expect to see. For non-visual PRs, say how to review the diff instead (e.g. which files to read).

**Notes:** Feature flags, env vars, backwards compatibility—only when evidenced in the diff or commit messages. Also include any issue reference carried over from an existing PR (see §2), e.g. `Closes #123`.

## 5. Language (simple English)

Write the **title** and **full MR body** in **simple English**, even if the user asked in another language.

- Short sentences. Common words. One idea per sentence when possible.
- No buzzwords or filler. Use technical terms only when they appear in the code or are needed to name a behavior.
- Bullets should be easy to scan; avoid nested lists unless necessary.

## 6. After output

Offer to open/create the MR if the user uses **GitLab** (project MCP or UI) or **GitHub** (`gh pr create`), without running destructive git commands unless they ask.

Create the PR with `gh pr create --base v2-dev --milestone "2.0" …` — every PR into `v2-dev` belongs to the GitHub milestone **2.0**. If the PR already exists, add it with `gh pr edit <n> --milestone "2.0"`. Only a 1.x PR into `dev` skips the milestone.
