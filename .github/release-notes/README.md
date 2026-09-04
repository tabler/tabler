# Release notes

The release workflow writes the GitHub release body from two parts:

1. **The intro** — the file in this directory named after the version, for
   example `1.5.0.md`. It is optional. Write it before the `chore: update
   versions` pull request is merged, because the workflow reads it from the
   commit it publishes.
2. **The changes** — `## Core changes`, `## Demo changes` and `## Docs
   changes`, built by `pnpm run release-notes` from the three `CHANGELOG.md`
   files. Never write these by hand.

A changeset that bumps several packages ends up in each of their changelogs, so
the script shows every entry once: under Core if core is involved, otherwise
under Demo, otherwise under Docs. The `Minor Changes` / `Patch Changes` split
is dropped — each package gets one flat list.

The workflow also renames the release from `@tabler/core@1.5.0` to
`Tabler v1.5.0`.

## What goes in the intro

Follow the earlier releases: a cover image, then one `##` section per headline
feature with two to four sentences on what it gives the user, and a screenshot
or a screen recording where it helps.

Images have to be reachable from GitHub. Either upload them to an issue comment
first and paste the `user-attachments` URL, or commit them next to the intro and
link them by their raw URL on `dev`:

```markdown
![Folded sidebar](https://raw.githubusercontent.com/tabler/tabler/dev/.github/release-notes/1.5.0-sidebar.png)
```

Link the branch, not the release tag: a tag like `@tabler/core@1.5.0` contains a
slash, which `raw.githubusercontent.com` cannot tell apart from the file path.

For a cover that comes in both color modes, commit the two files and let GitHub
pick:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tabler/tabler/dev/.github/release-notes/1.5.0-cover-dark.png">
  <img alt="Tabler 1.5" src="https://raw.githubusercontent.com/tabler/tabler/dev/.github/release-notes/1.5.0-cover.png">
</picture>
```

## Checking the result

`pnpm run release-notes` prints the body to stdout, so you can read it before
the release goes out. Pass a path to write it to a file instead.

## Fixing a published release

Edit the release on GitHub. The workflow only writes the body once, right after
it publishes, so a later push to `dev` will not overwrite your edit.
