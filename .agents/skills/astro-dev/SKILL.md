---
name: astro-dev
description: >-
  Start a Tabler Astro dev server and verify a change in the browser. Use
  whenever a change to `preview/`, `docs/`, `shared/` or `core/` has to be
  seen running — before handing a page or component back — and whenever the
  dev server behaves oddly: stale CSS/JS, assets that vanish, a page that will
  not reload. Covers which server to start on which port, background mode, the
  rule against building while a dev server runs, and the verification loop.
---

# Run and verify the dev servers

Never ask the user to check a page manually. Start the server, look at the page, and show what you found.

## 1. Which server

| Package | Command | Port | Serves |
| --- | --- | --- | --- |
| `@tabler/preview` | `pnpm --dir preview run dev` | 3000 | demo pages (`preview/pages/*.astro`) |
| `@tabler/docs` | `pnpm --dir docs run dev` | 3010 | documentation (`docs/content/**/*.mdx`) |
| `@tabler/screenshots` | `pnpm --dir screenshots run dev` | 3020 | screenshot capture pages |

`preview_start` returns a `tabId` — pass it to every later `navigate` / `read_page` / `computer` call so they act on that tab and not on whatever is fronted. The same entries exist in `.claude/launch.json` (`preview`, `docs`, `screenshots`) — start them with `preview_start` so the browser pane opens on the right port, and use `preview-attach` when a server is already running. `pnpm dev` at the repo root starts everything through turbo; only do that when the change spans packages, because the persistent tasks make the output hard to read.

A `shared/` change shows up in both preview and docs. Verify in the package the user asked about, and open the other one too when the component is used there.

## 2. Full dev vs. astro-only

Each package's `dev` script is `astro dev` plus its asset watchers (`concurrently`), and turbo runs `dev:prepare` first so `tmp-assets/` and `public/` exist:

- **SCSS or `core/` touched → use the full `dev` script.** `astro dev` alone will not rebuild the stylesheets.
- **Only `.astro` / `.mdx` / `shared/lib` touched → `astro dev --background` inside the package is enough** and faster, provided the assets have been built before. Manage it with `astro dev status`, `astro dev logs`, `astro dev stop`; the log file is `.astro/dev.log` in the package. Add `--force` to replace a server that is already running.

## 3. Do not build while a dev server is running

`pnpm build` (or a per-package build) run next to a live dev server fights the watchers: the build's asset copy overwrites what the watcher just wrote into `public/`, and the two file watchers together can exhaust file handles (`EMFILE`). Verify through the running server and HMR instead. If a build is genuinely needed, stop the dev server first.

## 4. The verification loop

1. `preview_start` with the package's config, then open the page (`/badges` in dev; the built file is `/badges.html`).
2. `read_console_messages` — errors first, then warnings.
3. `read_page` or `curl` for structure; assert instead of eyeballing when the page is generated from data:

   ```bash
   curl -s http://localhost:3000/badges | grep -o '<h[1-6]' | sort | uniq -c
   ```

4. `computer` clicks/typing for anything interactive, then read the state back.
5. `resize_window` for responsive or dark-mode work; `colorScheme` for `data-bs-theme`.
6. Screenshot the result for the user when the change is visual.

## 5. When the page looks stale or unstyled

In order:

- **CSS did not change** — the SCSS watcher is not running. Restart with the full `dev` script rather than `astro dev`.
- **Assets 404 after a restart** — `public/preview` (or `docs/public`) was wiped by a build or a `clean`. Run `pnpm --dir <pkg> run dev:prepare`, then start dev again.
- **A `public/` file changed but the browser did not reload** — Astro does not watch `public/`; the `copyAssets` integration reloads the listed dirs, everything else needs a manual refresh.
- **`shared/` change not picked up** — the file is aliased, not watched through `node_modules`; confirm the import uses `@shared`/`@ui`, not a path into `node_modules`.
- Still wrong: `pnpm --dir <pkg> run clean`, then `dev:prepare`, then `dev`.

## 6. Gates before handing work back

Run at the repo root and read the **full** output — a tail hides TypeScript errors:

```bash
pnpm run type-check && pnpm run format:prettier && pnpm run lint
```

`type-check` is `astro check` per package, so it covers `.astro` frontmatter and templates. For a markup refactor that should not change output at all, also run the `html-diff` skill.

## 7. Checklist

- [ ] Right package started, on its own port
- [ ] Full `dev` script when SCSS or `core/` is involved
- [ ] No build started while a dev server was running
- [ ] Page opened, console clean, interaction exercised
- [ ] Screenshot for visual changes
- [ ] Repo-level `type-check` / `format:prettier` / `lint` clean, full output read
