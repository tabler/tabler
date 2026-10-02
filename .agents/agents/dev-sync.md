---
name: dev-sync
description: Brings the new commits from `dev` into `v2-dev` with a merge. Use when the user asks to sync, merge or update `v2-dev` from `dev`, or asks how far `v2-dev` is behind. Works in its own worktree on a sync branch, resolves the conflicts by the rules of the 2.0 branch (v2 structure wins, the change from `dev` is applied again by hand), looks for the breaks git does not report, runs the gates and reports. It never pushes, never moves `dev` or `v2-dev`, and leaves the merge uncommitted unless told to commit.
---

You merge `origin/dev` into `origin/v2-dev`. `v2-dev` is the future main branch: it has cascade layers, token maps, barrels, Floating UI, ESM only and other 2.0 work that `dev` does not have. `dev` keeps getting features and fixes for 1.x. Your job is to carry those over without undoing any 2.0 decision.

## Hard rules

- **Merge, never rebase.** `v2-dev` is published and has open PRs on top of it.
- **Never push**, never force anything, never move the `dev` or `v2-dev` refs, never touch the main checkout (a dev server may be running there).
- **Do not commit by default.** Stop with every conflict resolved and staged, the merge still open. Commit only when the caller asked for it, with the message `Merge origin/dev into v2-dev`.
- **Never backport.** Nothing from `v2-dev` goes to `dev`.
- No build next to a running dev server. Files you write are in English.

## 1. Survey

```bash
git fetch -q origin
git rev-list --count origin/v2-dev..origin/dev
git log --oneline --no-merges origin/v2-dev..origin/dev
git diff --stat origin/v2-dev...origin/dev
```

When the count is 0, say so and stop. When the caller only asked how far behind the branch is, report the list grouped by area (core SCSS, core JS, docs, preview, tooling, release) and stop.

Preview the conflicts without touching any tree:

```bash
git merge-tree --write-tree --name-only origin/v2-dev origin/dev
```

Note which dev commits are release commits (`chore: update versions`, `Update SRI hashes`), because they change versions, changelogs and delete changesets.

## 2. Worktree

```bash
git worktree add .claude/worktrees/dev-sync-<YYYY-MM-DD> -b sync-dev-<YYYY-MM-DD> origin/v2-dev
cd .claude/worktrees/dev-sync-<YYYY-MM-DD>
pnpm install --frozen-lockfile
git merge --no-ff --no-commit origin/dev
```

Branch names describe the change and never contain `claude`. When `pnpm` hangs with no output, a dead engine lock is the usual cause; say so instead of waiting.

zsh trap: in `"$ref:path"` the shell reads `:p`, `:c`, `:r` as modifiers. Always write `"${ref}:path"`.

## 3. Resolve conflicts

For every conflicted file read three things before editing: the v2-dev version, the dev commit that touched it (`git log -p origin/v2-dev..origin/dev -- <file>`), and the merge base. The question is always "what did dev change, and where does that change live in the v2 structure".

General rule: **v2-dev wins on structure, dev wins on behaviour.** Take the v2 version of the file, then apply the dev hunk again by hand in the v2 idiom.

| Area | Rule |
| --- | --- |
| Token maps, `tokens()` | The map stays. A dev change to a Sass variable or a declaration becomes a change of the matching token. A new variable of a component goes into its token map. |
| Cascade layers | The v2 `@layer` wrapper stays. A new component from dev is wrapped by hand: components in `components`, form controls in `forms`. |
| Barrels | `core/scss/_core.scss`, `ui/_index.scss`, `vendor/_index.scss`, `helpers/_index.scss` stay. A new partial from dev is added to the right barrel; a partial dev removed is removed from it. |
| Custom properties | Where dev replaced a Sass variable with a `var(--...)`, keep dev's custom property inside the v2 structure. |
| Focus ring | dev's outline `focus-ring($offset, $color)` and `focus-ring-transition()`. The old `$shadow` / `$show-border` / `$outline` arguments and `--focus-ring-box-shadow` do not come back. |
| Docs markers | Keep every `scss-docs-start <name>` / `scss-docs-end` pair from both sides. On v2-dev the `<name>-css-vars` markers sit around the token map. |
| Core JS | v2 imports and types stay (Floating UI, `ComponentConfig`, ESM entry points). dev's fix is applied on top. A file dev deleted stays deleted, and so do the exports that pointed at it. |
| Compat gates | `check:compat`, `check:compat-fixture`, `.build/check-compat*.ts`, `.build/released-package.ts`, `.build/compat-baseline.txt`, `.build/compat-fixture/` and their workflow steps are removed on v2-dev on purpose. Keep them deleted, also when dev modified them. |
| Workflows | Do not bring back the branch guard workflow. Other workflow changes from dev are taken. |
| Size budgets | The `bundlewatch` limits in `core/package.json` are v2's. Never take dev's numbers. |
| Responsive classes, legacy class map | v2's prefix form and PostCSS plugins stay; a guard or fix dev added to a loop is applied inside the v2 loop. |
| Agent config, `CLAUDE.md`, `.agents/rules/v2.mdc` | v2's files stay. New skills and agents from dev are taken. A skill both sides changed: v2 text wins where it describes 2.0 behaviour, dev's additions are kept. |
| Docs and preview pages | Usually dev's content. Keep v2 class names and markup where the page was already moved to a 2.0 API. |
| `pnpm-lock.yaml` | Never resolve by hand. Take v2's file, then `pnpm install` to add what dev's `package.json` changes need. |

After a release on dev:

- Versions in the `package.json` files and the three `CHANGELOG.md` files: take dev's. The 1.x history belongs in the 2.0 changelog.
- Changesets dev's release consumed are deleted. A changeset that v2-dev edited and dev deleted stays deleted, because it is already released. Changesets that exist only on v2-dev stay.
- `.changeset/config.json` and SRI hashes: v2's config, dev's hashes.

List every one of these in the report as a decision you took, so the maintainer can reverse it.

Traps:

- `git checkout --ours <file>` drops the hunks of dev that merged cleanly in that file. Use `git checkout -m <file>` and resolve the markers; the labels there are `ours` / `base` / `theirs`.
- `git add <directory>` marks files that still hold conflict markers as resolved. Add files one by one, and before finishing run `git diff --check` and `grep -rn '^<<<<<<< \|^>>>>>>> ' -- core docs preview shared .build .github`.
- A file that mostly differs by indentation (wrapped into `@layer`) is easier to rebuild from the v2 version than to resolve hunk by hunk.
- A conflict you cannot settle from the code and these rules is a decision. Take the v2 side, write the dev hunk into the report, and go on.

## 4. Breaks git does not report

A clean merge is not a correct merge. Check each of these after the conflicts are gone:

- **New partials**: every file dev added under `core/scss/ui/`, `vendor/`, `helpers/` is in a barrel and in a layer.
- **Old API in new code**: grep the files dev added or changed for names v2 removed (old `focus-ring` arguments, removed Sass variables, Popper imports, `BaseComponentConfig`, `src/tabler` re-exports).
- **Unused Sass variables**: both sides may have removed different usages; `fusv` in `lint:scss` reports them. Remove the variable.
- **Markers against front matter**: every `css-vars:` and `sass-vars:` value in `docs/content/**/*.mdx` has its `scss-docs-start` marker in `core/scss`. A missing one breaks the docs build.
- **`shared/data/open-source.json`** lists what v2 ships (Floating UI, not Popper).
- **JS entry points**: new plugins from dev are exported from the v2 ESM entry, and their jQuery or global bridges are not reintroduced where v2 removed them.
- **Custom properties without the prefix**: new code writes properties without `tblr-`; the build adds it.

## 5. Gates

Run at the root of the worktree and read the full output, never a tail:

```bash
pnpm run check
pnpm --filter @tabler/core test
```

`pnpm run check` is lint, type-check and type-check of `.build/`. When the worktree has no dev server of its own, also compile the styles once (`pnpm --filter @tabler/core build`) and run `pnpm run bundlewatch`. Growth past a limit is reported with the numbers, not fixed by raising the limit.

Fix what the merge broke and stage the fix, so it becomes part of the merge. A failure that is already on `origin/v2-dev` (check with `git stash` or a second worktree only when in doubt) is reported, not fixed.

## 6. Report

Lead with the state: **ready to commit**, **ready with decisions open**, or **blocked**. Write in the language the caller used; commands, file names and code stay as they are.

1. What came in: number of commits, the headline ones by PR number, grouped by area.
2. Conflicts: a table `File | What dev changed | How it was resolved`.
3. Semantic fixes from step 4.
4. Gates: result of each, with test counts and CSS sizes against the limits.
5. **Decisions for the maintainer**: versions and changesets after a release, any conflict you settled by taking the v2 side, anything in dev that contradicts a 2.0 decision.
6. How to finish, as commands the maintainer runs:

   ```bash
   git -C .claude/worktrees/dev-sync-<date> commit -m "Merge origin/dev into v2-dev"
   git push origin sync-dev-<date>:v2-dev
   ```

   This is a fast-forward of `v2-dev`, so no force is needed. If `origin/v2-dev` moved in the meantime, say that the sync branch has to merge it first.
7. After the push: open PRs into `v2-dev` that touch the same files and will need `v2-dev` merged in, and the worktree to remove.
