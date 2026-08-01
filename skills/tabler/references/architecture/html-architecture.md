# Tabler UI v1.4.x HTML Architecture

Based on `/shared/layouts/base.html`, `/shared/layouts/default.html`, and `/shared/includes/layout/` in this repository.

## General layout structure

```
body
|-- script.tabler-theme.min.js      ← Theme init, goes BEFORE markup
|
|-- div.page                        ← Main wrapper
|   |
|   |-- aside.navbar-vertical       ← Sidebar (only if layout-sidebar: true)
|   |   |-- div.container-fluid
|   |       |-- button.navbar-toggler
|   |       |-- h1.navbar-brand.navbar-brand-autodark > a
|   |       |-- div.collapse.navbar-collapse#sidebar-menu
|   |           |-- ul.navbar-nav.pt-lg-3
|   |               |-- li.nav-item > a.nav-link
|   |               |-- li.nav-item.dropdown > a.nav-link.dropdown-toggle
|   |               |   |-- div.dropdown-menu
|   |
|   |-- header.navbar.navbar-expand-md.d-print-none   ← Top navbar
|   |   |-- div.container-xl
|   |       |-- button.navbar-toggler                 ← Mobile hamburger
|   |       |-- h1.navbar-brand.d-none-navbar-horizontal ← Logo
|   |       |-- div.navbar-nav.flex-row.order-md-last ← Icons (theme, notifs, user)
|   |       |-- div.collapse.navbar-collapse#navbar-menu ← Menu horizontal
|   |           |-- div.navbar
|   |               |-- div.container-xl
|   |                   |-- div.row.flex-column.flex-md-row
|   |                       |-- nav[aria-label="Primary"]
|   |                           |-- ul.navbar-nav
|   |
|   |-- div.page-wrapper             ← Main content
|       |
|       |-- div.page-header.d-print-none
|       |   |-- div.container-xl
|       |       |-- div.row.g-2.align-items-center
|       |           |-- div.col                    ← Title + pretitle
|       |           |   |-- div.page-pretitle      ← Optional
|       |           |   |-- h1.page-title           ← Page title
|       |           |-- div.col-auto.ms-auto.d-print-none ← Actions
|       |               |-- div.btn-list
|       |                   |-- a.btn.btn-primary
|       |
|       |-- main#content.page-body
|       |   |-- div.container-xl
|       |           |-- div.row.row-cards           ← Card grid
|       |               |-- div.col-sm-6.col-lg-3
|       |                   |-- div.card > div.card-body
|       |
|       |-- footer.footer.footer-transparent.d-print-none ← Footer
|           |-- div.container-xl
|               |-- div.row.text-center.align-items-center.flex-row-reverse
|                   |-- div.col-lg-auto.ms-lg-auto  ← Links
|                   |   |-- ul.list-inline.list-inline-dots
|                   |-- div.col-12.col-lg-auto.mt-3 ← Copyright
|                       |-- ul.list-inline.list-inline-dots
```

## Layout system (frontmatter)

The real Tabler repository uses **flags in frontmatter** (Nunjucks/YAML) to control layout, not separate HTML pages.

### Base layout (base.html)
```html
<html lang="en"{% if layout-rtl %} dir="rtl"{% endif %}>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
  <title>...</title>
  <link rel="stylesheet" href="dist/css/tabler.min.css">
  <!-- JS libs in head -->
</head>
<body{% if body-class or layout.body-class %} class="..."{% endif %}>
  <script src="dist/js/tabler-theme.min.js"></script>
  {{ content }}
  <!-- settings panel -->
  <!-- modals -->
  <script src="dist/js/tabler.min.js"></script>
</body>
</html>
```

### Default layout (default.html)
```
div.page
  {% if layout-sidebar %}
    sidebar.html (with flags: dark, end, transparent, breakpoint)
  {% endif %}
  
  {% unless layout-hide-topbar %}
    navbar.html (with flags: condensed, overlap, dark, sticky, transparent)
  {% endunless %}
  
  div.page-wrapper
    page-header.html
    main#content.page-body
      div.container-xl  (or without a container if no-container)
        {{ content }}
      /div
    /main
    footer.html
  /div.page-wrapper
/div.page
```

### Layout map -> flags

| Layout | Frontmatter flags |
|--------|----------------------|
| **Vertical** | `layout-sidebar: true`, `layout-sidebar-dark: true`, `layout-hide-topbar: true` |
| **Vertical Right** | `layout-sidebar: true`, `layout-sidebar-end: true`, `layout-hide-topbar: true` |
| **Vertical Transparent** | `layout-sidebar: true`, `layout-navbar-transparent: true`, `layout-hide-topbar: true` |
| **Horizontal** | (none, by default) |
| **Fluid** | `body-class: layout-fluid` |
| **Fluid Vertical** | `body-class: layout-fluid`, `layout-sidebar: true`, `layout-sidebar-dark: true`, `layout-hide-topbar: true` |
| **Boxed** | `body-class: layout-boxed` |
| **Combo** | `layout-sidebar: true`, `layout-sidebar-dark: true`, `layout-navbar-condensed: true`, `layout-navbar-hide-brand: true` |
| **Condensed** | `layout-navbar-condensed: true` |
| **Navbar Dark** | `layout-navbar-dark: true` |
| **Navbar Overlap** | `layout-navbar-overlap: true`, `layout-navbar-dark: true`, `layout-navbar-condensed: true` |
| **Navbar Sticky** | `layout-navbar-sticky: true` |
| **RTL** | `layout-rtl: true` |

## Detailed navbar structure

The navbar has **two modes** based on the flag `condensed`:

### Normal mode (not condensed)
```
header.navbar.navbar-expand-md.d-print-none
  div.container-xl
    button.navbar-toggler
    h1.navbar-brand.d-none-navbar-horizontal.pe-0.pe-md-3
    div.navbar-nav.flex-row.order-md-last (user, theme, notifs)
    div.collapse.navbar-collapse#navbar-menu
      div.navbar
        div.container-xl
          div.row.flex-column.flex-md-row.flex-fill.align-items-center
            div.col
              nav[aria-label="Primary"]
                ul.navbar-nav
```

### Condensed mode
```
header.navbar.navbar-expand-md (without lower menu)
  div.container-xl
    ...toggler, brand, user...
    div.collapse.navbar-collapse#navbar-menu
      nav[aria-label="Primary"]
        ul.navbar-nav  (horizontal menu inside the header)
```

## Detailed sidebar structure

```
aside.navbar.navbar-vertical.navbar-expand-lg[data-bs-theme="dark"]
  div.container-fluid
    button.navbar-toggler
    h1.navbar-brand.navbar-brand-autodark
      a href="."
        <!-- SVG logo -->
    div.collapse.navbar-collapse#sidebar-menu
      ul.navbar-nav.pt-lg-3
        li.nav-item.active
          a.nav-link
            span.nav-link-icon.d-md-none.d-lg-inline-block (SVG 24x24)
            span.nav-link-title  "Dashboard"
        li.nav-item
          a.nav-link ... 
        li.nav-item.dropdown
          a.nav-link.dropdown-toggle[data-bs-toggle="dropdown"]
            span.nav-link-title  "Interface"
          div.dropdown-menu
            a.dropdown-item  "Alerts"
            a.dropdown-item  "Buttons"
```

Sidebar variants:
- `data-bs-theme="dark"` → dark (default)
- Without `data-bs-theme` → light
- `.navbar-transparent` → transparent
- `.navbar-end` → right
- Without `layout-sidebar-dark` → light

## Footer structure

```
footer.footer.footer-transparent.d-print-none
  div.container-xl
    div.row.text-center.align-items-center.flex-row-reverse
      div.col-lg-auto.ms-lg-auto
        nav[aria-label="Footer"]
          ul.list-inline.list-inline-dots.mb-0
            li.list-inline-item > a.link-secondary  "Documentation"
            li.list-inline-item > a.link-secondary  "License"
            li.list-inline-item > a.link-secondary  "Source code"
      div.col-12.col-lg-auto.mt-3.mt-lg-0
        ul.list-inline.list-inline-dots.mb-0
          li.list-inline-item  "Copyright © 2026 Tabler"
          li.list-inline-item  "v1.4.0"
```

## Script loading order

1. **`tabler-theme.min.js`** — Immediately after opening `<body>` (before markup)
2. **`tabler.min.js`** — In `shared/includes/layout/js.html`, at the end with `defer`
3. **Third-party libraries** — via `layout/js-libs.html`; some are loaded in `<head>` when passed with `head`, others before `tabler(.min).js` at the end.
4. **Inline scripts** — via `{% scripts %}` or equivalent blocks; use `DOMContentLoaded` if you depend on DOM/rendering.

## CDN assets

```
CSS:
  @tabler/core@1.4.0/dist/css/tabler.min.css
  @tabler/core@1.4.0/dist/css/tabler-flags.min.css
  @tabler/core@1.4.0/dist/css/tabler-payments.min.css
  @tabler/core@1.4.0/dist/css/tabler-vendors.min.css
  @tabler/core@1.4.0/dist/css/tabler-socials.min.css

JS:
  @tabler/core@1.4.0/dist/js/tabler-theme.min.js
  @tabler/core@1.4.0/dist/js/tabler.min.js
  @tabler/core@1.4.0/dist/js/tabler.esm.min.js (ES module)
```
