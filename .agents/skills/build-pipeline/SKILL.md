---
name: build-pipeline
description: >-
  Understand or repair the Tabler asset pipeline — `core/dist`, `tmp-assets/`,
  the generated `public/` directories, the `copy-assets` Astro integration,
  `build-css.ts`, the vite/terser JS builds and the turbo dev graph. Use when
  assets are missing, stale, duplicated or growing between builds, when a
  watcher's output disappears after a restart, when a page 404s on
  `/dist/css/tabler.css`, and before editing anything under `.build/`, a
  package's asset manifest in `astro.config.mjs`, or the dev/build scripts.
---

# The asset pipeline

Astro only renders pages. Every stylesheet, script, font and image on a page arrives through a separate pipeline, and almost every "weird assets" bug is a directory being written by the wrong step.

## 1. Who writes what

| Directory | Written by | Notes |
| --- | --- | --- |
| `core/dist/` | `@tabler/core` (`css:dev`, `js:build`, `copy`) | the framework: css, js, fonts, img, vendored libs |
| `preview/tmp-assets/` | `preview` `assets` (`build-css.ts` + vite/terser) | demo css/js, isolated from Astro's output |
| `docs/tmp-assets/css/` | `docs` `css` / `watch:css` (build-css, `--no-prefix`) | docs stylesheets |
| `<pkg>/public/` | **`copy-assets` only** | fully generated, wiped and rebuilt on every Astro start |
| `<pkg>/dist/` | `astro build` | the shipped site |

`public/`, `tmp-assets/` and `dist/` are all git-ignored per package. Never hand-edit a file in any of them, and never commit one.

## 2. `copy-assets` (`.build/copy-assets.ts`)

An Astro integration, configured per package in `astro.config.mjs`:

- On `astro:config:done` it **deletes `public/`** and rebuilds it from the `copies` manifest (core dist, the package's `tmp-assets`, `shared/static`, favicons). Running it twice must never accumulate content — that is why it starts from a clean directory.
- It is skipped when the Astro command is `sync`, so `astro check` (and CI's type-check job) does not need built workspace assets.
- In dev it watches `syncDirs` and copies changed files into `public/`, then sends one coalesced `full-reload` (250 ms window, `.map` files ride along with their source file). `reloadDirs` are directories a watcher already writes into directly — those only get the reload.
- `allowDestinationFallback` keeps the existing copy when the source vanishes mid-copy — `@tabler/core` cleaning `dist/` while `turbo dev` starts the dependents.

**Rule for watchers:** because `public/` is wiped at startup, a watcher writing straight into it (preview's `watch:css` / `watch:js`) only works when `dev:prepare` has produced the same output into `tmp-assets` first, so the startup copy seeds it. The safer arrangement is docs': the watcher writes into `tmp-assets/css` and `copy-assets` syncs it to `public/css`. Prefer that for anything new.

## 3. Ordering

`turbo.json` encodes the graph: `@tabler/core#dev:prepare` → `@tabler/preview#dev:prepare` → the `dev` tasks (docs depends on both). `dev:prepare` is what guarantees `core/dist` and `preview/tmp-assets` exist before a dependent package's `copy-assets` runs. If you add a package or an asset dependency, add the edge here too — inside a package, ordering comes from Astro's own lifecycle, not from a pre-script.

## 4. Traps already paid for

Do not undo these; each has a comment at the site:

- **Build output must not be an Astro output dir.** `preview/.build/vite.config.mts` writes to `tmp-assets/js`, not inside `dist/`: `astro build` copies `public/` into `dist/`, so an `outDir` under `dist/` gets re-seeded and re-copied, growing without bound across builds.
- **No leading-dot output path.** terser's CLI `--source-map` parser rejects a path segment starting with a dot (`.build/out/…`) with a bogus "not a supported option".
- **One write per output file.** `build-css.ts` runs sass + postcss + clean-css in-process so each file is written once, fully processed; it also skips writes when the content is unchanged, to keep watchers quiet. Do not reintroduce a step that rewrites a finished file in place — that is what shifted every source-map mapping when the banner was added afterwards (#2766).
- **Vendor copies are not pages.** `preview`'s `prettify-html` integration formats built HTML on `astro:build:done` but excludes `dist/preview/` and `dist/dist/`, which are asset copies and contain third-party HTML that breaks the parser.

## 5. Diagnosing

Work down this list; each step is cheap:

1. **404 on `/dist/css/tabler.css` or `/preview/css/demo.css`** — the source was never built. `pnpm --dir core run dev:prepare`, then `pnpm --dir preview run dev:prepare`.
2. **Assets vanished after restarting dev** — something wrote into `public/` that `copy-assets` does not know about; it was wiped at startup. Add it to the manifest, or write it into `tmp-assets` instead.
3. **CSS/JS edits do not appear** — the watcher is not running (started `astro dev` alone instead of the package's `dev` script), or its output dir is not in `syncDirs`/`reloadDirs`.
4. **Stale content that survives a rebuild** — `pnpm --dir <pkg> run clean`, then `dev:prepare`.
5. **`dist/` grows between identical builds** — an output dir is nested inside another copy step (see the first trap).
6. **CI type-check fails on missing assets** — something made `copy-assets` run for the `sync` command; keep the early return.

Read the dev server's own log first: `copy-assets` logs `public/ rebuilt from workspace assets`, each fallback warning, and every reload with the file that caused it.

## 6. When you change the pipeline

- Verify **both** paths: `pnpm --dir <pkg> run dev` and a clean `pnpm --dir <pkg> run build`.
- Verify **both** packages when the change is in `.build/` — preview and docs share those files, with different manifests.
- Run the build twice in a row and compare `du -sh <pkg>/dist` — equal sizes are the accumulation check.
- Confirm `git status` stays clean: nothing generated may become tracked.
- Do not start a build while a dev server is running (`astro-dev` skill).

## 7. Checklist

- [ ] Nothing writes into `public/` except `copy-assets`
- [ ] New generated output lands in `tmp-assets/`, and is listed in the package's `copies` (and `syncDirs` when it changes during dev)
- [ ] Cross-package ordering added to `turbo.json` if a new dependency appeared
- [ ] Dev and clean build both verified, build run twice with stable output size
- [ ] `git status` clean; `pnpm run type-check` clean without prebuilt assets
