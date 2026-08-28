---
name: page-layouts
description: >-
  Pick and configure the right layout for a Tabler preview page, and change or
  add a layout in `shared/layouts/`. Use whenever a page needs different page
  chrome — sidebar, navbar variant, boxed/fluid body, centered card, error or
  marketing page — whenever a page hand-rolls a page header or wrapper markup,
  and before adding a new layout file. Covers the layout map, the
  `DefaultLayout` props, the page-header slot, and the rules for a new layout.
---

# Page layouts

Layouts own the page chrome: `<head>`, assets, body classes, navbar/sidebar, page header, footer. A page supplies content and a handful of props — never its own header block, wrapper divs, or `<html>` scaffolding.

## 1. Which layout

| Layout | Use for |
| --- | --- |
| `DefaultLayout` | the normal app page — navbar/sidebar, page header, footer (98 of the preview pages) |
| `SingleLayout` | centered card on an empty page: sign-in, sign-up, error-ish flows (`containerSize`, `hideLogo`) |
| `SettingsLayout` | settings pages — wraps the body in a card with the settings nav (`active`) |
| `ProseLayout` | long-form text in a `card-lg` + `.prose` body (terms, changelog) |
| `ErrorLayout` | error pages, content driven by `pageError` keyed into `errors.json` |
| `MarketingLayout` | marketing/landing pages with the marketing navbar and footer |
| `PayLayout` | minimal checkout chrome: small logo + close button |
| `RedirectLayout` | bare meta-refresh document (`url`, `base`) |
| `BaseLayout` | only when a page needs no chrome at all (screenshot/playground pages). Everything above wraps it. |

Docs pages do not choose a layout — `docs/pages/[...slug].astro` renders the collection through `DocsLayout`, and MDX front matter has no `layout:` key.

## 2. `DefaultLayout` — content props

| Prop | Effect |
| --- | --- |
| `title` | `<title>` **and**, by default, the page header title |
| `pageHeader` | header title when it differs from `title`; `pageHeader={false}` removes the header |
| `pretitle` | small line above the title (`page-pretitle`) |
| `description` | line under the title *and* `<meta name="description">` |
| `pageMenu` | menu entry to highlight, e.g. `base.badges` — must match a key in `shared/data/menu.json` |
| `pageLibs` | third-party libs to load, keyed into `core/libs.json` (`['apexcharts']`) |
| `pageHeaderFile` | swaps the title block for a prebuilt header (`"profile"`, `"uptime"`) |

Do not pass `pageHeader` when it repeats `title` — the fallback already covers it.

## 3. `DefaultLayout` — chrome flags

Each flag maps to one documented body/layout class, so reach for the prop instead of `bodyClass`:

| Prop | Class |
| --- | --- |
| `sidebar`, `sidebarDark`, `sidebarEnd` | `layout-sidebar`, `layout-sidebar-dark`, `layout-sidebar-end` |
| `hideTopbar` | `layout-hide-topbar` |
| `navbarTransparent`, `navbarCondensed`, `navbarDark`, `navbarOverlap`, `navbarSticky`, `navbarHideBrand` | the matching `layout-navbar-*` classes |
| `navbarClass` | extra classes on the navbar |
| `wrapperFull` | `page-wrapper-full`, drops the `.container-xl` around the body |
| `containerCentered`, `containerClass` | `my-auto` / extra classes on the `.container-xl` |
| `bodyClass` | free-form body classes — `layout-boxed`, `layout-fluid` |
| `rtl` | `dir="rtl"` plus the RTL stylesheets |

## 4. The page-header slot

Anything to the right of the title goes in the `page-header-actions` slot, as a direct child of the layout:

```astro
<DocsLink slot="page-header-actions" path="/ui/components/badge" />
<HeaderActionsButtons slot="page-header-actions" />
```

Prebuilt groups live in `shared/components/layout/` (`HeaderActionsButtons`, `HeaderActionsPrint`, `HeaderActionsPhotos`, `HeaderActionsBreadcrumb`, …). The header renders the actions column only when the slot has content.

## 5. Never hand-roll chrome

If a page contains `<div class="page-header">`, `<h2 class="page-title">`, `page-wrapper`, `page-body`, or its own `<head>` markup, that is a layout prop that was missed. Add or extend the prop instead of duplicating the markup — the same header exists on 100+ pages and drifts the moment one copy is edited.

## 6. Adding or changing a layout

- A new layout wraps `BaseLayout` (or `DefaultLayout` when it only reshapes the body, like `SettingsLayout` and `ProseLayout`). It never re-emits `<html>`, assets, or theme settings.
- Every prop gets a doc comment naming the class or front-matter key it maps to — follow the existing style in `DefaultLayout`.
- Booleans default to off; content props are optional with a sensible fallback.
- Keep `<!-- BEGIN … -->` / `<!-- END … -->` markers around structural blocks: users copy the rendered HTML.
- Pass `pageLibs` through to `BaseLayout` so pages using the new layout can still load plugins.
- Changing a shared layout touches every page that uses it — prove it with the `html-diff` skill.

## 7. Checklist

- [ ] Layout chosen from the table, not `BaseLayout` plus hand-written chrome
- [ ] `title`, `description`, `pageMenu` set; no `pageHeader` repeating `title`
- [ ] Chrome via named flags, `bodyClass` only for `layout-boxed` / `layout-fluid`
- [ ] Header extras in the `page-header-actions` slot
- [ ] `pageLibs` listed for every plugin the page initialises
- [ ] Page opened in the browser (`astro-dev` skill); `html-diff` run if a shared layout changed
