---
name: tabler
description: Build admin dashboards and app UIs with Tabler, the open source UI kit built on Bootstrap 5. Use when a project uses Tabler or @tabler/core, or when asked for a dashboard, admin panel, settings page, data table or form styled with Tabler. Covers installation, the page layout, where to read the real component markup and the rules that keep the output consistent.
---

# Tabler

Tabler is a free, MIT-licensed UI kit for admin dashboards built on Bootstrap 5. It ships compiled CSS and JavaScript in the `@tabler/core` npm package, and every Bootstrap 5 class and JavaScript behaviour keeps working underneath it.

## Read the docs, do not guess class names

The documentation at ${site.docsUrl} is published for agents:

- `${site.docsUrl}/llms.txt` lists every page with a one-line summary and a class reference for every component. Read it first to find the right page.
- Append `.md` to any docs url to get that page as markdown, for example `${site.docsUrl}/ui/components/card.md`. The file holds the prose and the exact markup of every example.
- `${site.docsUrl}/llms-full.txt` is the whole documentation in one file.

Before writing markup for a component, fetch its `.md` page and copy the example that is closest to the task. Only use classes that appear in the docs or in Bootstrap 5. Do not invent `tabler-*` classes.

## Install

Plain HTML, from the CDN:

```html
${cdnPackageSnippet()}
```

Put the stylesheet in `<head>` and the script at the end of `<body>`. When the tags carry `integrity` and `crossorigin` attributes, keep them unchanged; the hashes belong to this exact version. In a project with a bundler install the package and import the same files:

```shell
npm install @tabler/core
```

```js
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
```

Optional plugin stylesheets live next to the core file: `tabler-flags.min.css`, `tabler-socials.min.css`, `tabler-payments.min.css`, `tabler-vendors.min.css`, `tabler-marketing.min.css`, `tabler-themes.min.css`. Framework guides for React, Vue, Next.js, Nuxt, Angular, SvelteKit, Astro, Laravel, Rails, Django and Symfony are at `${site.docsUrl}/ui/getting-started/frameworks`.

## Page skeleton

Every app page follows the same structure. `${site.docsUrl}/ui/layout/page-layouts.md` has the complete markup for the horizontal, vertical and combined navigation variants.

```html
<div class="page">
  <header class="navbar navbar-expand-md d-print-none">
    <!-- brand, navigation, user menu -->
  </header>
  <div class="page-wrapper">
    <div class="page-header d-print-none">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <div class="page-pretitle">Overview</div>
            <h2 class="page-title">Dashboard</h2>
          </div>
          <div class="col-auto ms-auto d-print-none">
            <!-- page actions -->
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">
        <div class="row row-deck row-cards">
          <!-- cards -->
        </div>
      </div>
    </div>
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl"><!-- footer links --></div>
    </footer>
  </div>
</div>
```

- A sidebar is `<aside class="navbar navbar-vertical navbar-expand-lg">` placed before `.page-wrapper`.
- Content goes in cards: `.card` with `.card-header`, `.card-body`, `.card-footer`. Put cards in `.row.row-deck.row-cards` so they align in height.
- Use `.container-xl` for boxed pages and `.container-fluid` for full-width ones.

## Icons

Icons are inline SVGs from Tabler Icons (`https://tabler.io/icons`, also the `@tabler/icons` packages). Give the `<svg>` the `icon` class, and add `icon-sm`, `icon-md` or `icon-lg` for size. In a button or link the icon goes before the text. Decorative icons get `aria-hidden="true"`.

## Colour modes and theming

Set `data-bs-theme="dark"`, `"light"` or `"auto"` on `<html>` to pick the colour mode. `data-bs-theme-base`, `data-bs-theme-font`, `data-bs-theme-primary` and `data-bs-theme-radius` adjust the gray shade, font family, primary colour and corner radius. Details are at `${site.docsUrl}/ui/getting-started/color-modes.md` and `${site.docsUrl}/ui/getting-started/customize.md`.

Colours are Bootstrap-style names: `primary`, `secondary`, `success`, `warning`, `danger`, `info` plus Tabler's palette (`blue`, `azure`, `indigo`, `purple`, `pink`, `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cyan`). They work as `bg-{color}`, `text-{color}`, `btn-{color}`, `badge bg-{color}`, `alert-{color}` and so on.

## Interactive components

Dropdowns, modals, offcanvas, tooltips, popovers, toasts, tabs and collapse use the Bootstrap 5 data API: `data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`. Tooltips and popovers are initialised automatically by `tabler.min.js` when the element has `data-bs-toggle="tooltip"` or `data-bs-toggle="popover"`. No extra JavaScript is needed for the rest.

## Rules of thumb

- Reach for a Tabler component before writing custom CSS. Spacing, colour and typography come from Bootstrap utilities (`mb-3`, `text-secondary`, `fw-bold`).
- Wrap groups of buttons, badges, avatars or tags in `.btn-list`, `.badge-list`, `.avatar-list` or `.tag-list` instead of adding margins by hand.
- Forms use `.form-label`, `.form-control`, `.form-select`, `.form-check` and `.form-hint`, the same as Bootstrap.
- Tables use `.table` inside `.table-responsive`, often with `.card-table` when they fill a card.
- Keep markup accessible: real `<button>` elements, labels on inputs, `aria-label` on icon-only buttons.
- The live demo at ${site.previewUrl} shows every layout and component in use. When unsure how pieces fit together, look at the matching demo page.
