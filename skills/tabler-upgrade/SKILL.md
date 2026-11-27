---
name: tabler-upgrade
description: Upgrade a project to the latest Tabler (@tabler/core) release. Use when asked to update, upgrade, bump or migrate Tabler, when a project pins an old @tabler/core version in package.json or a CDN link, or when something broke after a Tabler update. Covers finding the installed and the latest version, reading the official upgrade guide of every release in between, finding the affected code, applying the documented before and after changes and checking the result.
---

# Upgrade Tabler

Tabler follows semantic versioning. A patch or minor release (1.7 to 1.8) keeps every class, custom property, Sass variable, data attribute and JavaScript export working, and most projects only need a version bump. What changes is documented in one upgrade guide per release, and that guide is the only source of truth for this task. Do not upgrade from memory and do not rename things the guide does not mention.

## 1. Find the installed version

Look for `@tabler/core` in the project, in this order:

- `package.json` and the lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`).
- CDN links: `cdn.jsdelivr.net/npm/@tabler/core@<version>/`, `unpkg.com/@tabler/core@<version>/` or another CDN. Pin without a version (`@tabler/core/dist/...`) means "latest", so that project is upgraded already and only needs the checks in step 5.
- A copied `dist/` folder: the first line of `tabler.css` or `tabler.min.css` says `Tabler v<version>`.
- A Sass build that imports `@tabler/core/scss/...` or a `@use` of it: the version comes from the package.

Write down the version and how Tabler is loaded (npm package, CDN tags, copied files, compiled Sass), because the guides have different steps for each.

## 2. Find the latest version

Run `npm view @tabler/core version`, or read the version from the CDN url in the installation page at `https://docs.tabler.io/ui/getting-started/installation.md`. The latest release when this skill was generated was 1.8.0; check anyway, there may be a newer one.

If the user asked for a specific version, use that one. Never downgrade.

## 3. Read the upgrade guides

The guides are at `https://docs.tabler.io/ui/getting-started/upgrade`. Append `.md` to any docs url to read it as markdown:

- `https://docs.tabler.io/ui/getting-started/upgrade.md` lists every guide. Releases that are not listed needed no work on the user's side.
- `https://docs.tabler.io/ui/getting-started/upgrade/1-8.md` is the guide for 1.8, `1-7.md` for 1.7 and so on.

Read every guide between the installed version and the target, oldest first, and read each one in full. Each guide has the same layout:

- An **Overview** table, "If you… | You need to…". Every row is one check to run against the project. A row that ends in "Nothing" needs no code change.
- **Update the package**, with the exact `npm install` command and CDN tags for that version.
- One section per change, with a `diff` block that shows the code before and after. Copy the "after" side as it is written.
- **Visual changes**, things drawn differently that need no markup change but may clash with custom CSS.
- **Sass changes**, only for projects that compile the `scss/` sources.
- **What is new**, which is not part of the upgrade; mention it to the user at the end if they ask.

A guide says "deprecated" for things that still work and go away in the next major release, and "you need to" for things that break. In a minor upgrade only the second kind is required.

## 4. Find the affected code and change it

Go through the Overview rows of every guide and search the project for each one. Search the project's own source files, not `node_modules`, `dist` or `vendor` directories. The categories that come up in most guides:

- **Package and CDN tags**: `@tabler/core@` in html, templates, layouts and build configs. When a `<link>` or `<script>` tag carries an `integrity` attribute, the hash belongs to one file of one version. Take the complete new tags from the guide's "Update the package" section or from `https://docs.tabler.io/ui/getting-started/installation.md`, never change only the version number in the url.
- **Bundled libraries**: `dist/libs/<name>` paths in `<script>` and `<link>` tags, and the globals those libraries define (`new Dropzone(`, `new Litepicker(`, `new ClipboardJS(`, `IMask(`, `autosize(`, `countUp`). A library that a guide marks as moved or deprecated has a replacement in `tabler.js`.
- **Custom properties**: `--tblr-` in the project's CSS and inline styles, in particular the `--tblr-*-rgb` triplets.
- **Sass**: `@use '@tabler/core` and `@import '@tabler/core`, the `with (…)` block, every `$` variable the project overrides, and Sass color functions (`darken(`, `lighten(`, `rgba(`, `color.adjust(`, `color.scale(`, `mix(`) called on a Tabler variable.
- **JavaScript**: `window.bootstrap`, `window.tabler`, `tabler.tabler.`, `bootstrap.bundle` and the component methods the guide names.
- **Class names**: the classes listed in the guide's tables, as whole words in markup and in template strings.

Then change the code:

1. Update the version first: the dependency in `package.json` and the install command, or the CDN tags. Install the package again so the lockfile follows.
2. Apply every required change from the guides, oldest guide first, using the before and after blocks. Change only what the guide names. Do not reformat, rename or restyle anything else.
3. For deprecated things, tell the user what still works and what replaces it, and change them only when the user asks for it or when the target is a new major release.
4. Keep a list of every file you changed and why, grouped by guide section.

## 5. Check the result

- Install and build. A Sass project has to compile without errors, and a bundler project has to build. A `… is not a color` Sass error or a missing `$variable` is covered by the Sass section of a guide.
- Start the app and open the pages that use the changed code. Watch the browser console for `404` on `dist/libs/...` paths and for JavaScript errors, and look at a page in dark mode as well as light mode.
- Check that Bootstrap's own CSS and JS are not loaded next to Tabler. Tabler ships them since 1.5, and a second copy starts every component twice.
- Walk through the **Visual changes** section of each guide and look at the elements it names when the project styles them itself.
- Confirm the version: `npm ls @tabler/core`, or the version in the CDN url, or the first line of `tabler.css`.

## 6. Report

Tell the user, in this order: the version before and after, every change you made with the guide section it comes from, the deprecated things you left as they are and when they go away, and the visual changes worth a look. Link each item to its guide: `https://docs.tabler.io/ui/getting-started/upgrade/<version>`. If a check in step 5 could not run, say so instead of assuming it passed.

## Rules

- The upgrade guides and the component docs at `https://docs.tabler.io` are the source of truth. Fetch the `.md` page; do not guess class or variable names, and do not invent `tabler-*` classes.
- Upgrade through every guide in order. Skipping a guide skips its changes.
- A minor upgrade must not need markup changes. If something breaks that no guide mentions, report it as a possible Tabler bug with the guide url, do not work around it by rewriting the user's markup.
- Full changelog, for the changes that need no work: `https://github.com/tabler/tabler/blob/dev/core/CHANGELOG.md`.
