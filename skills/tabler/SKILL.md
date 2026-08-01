---
name: tabler
version: 1.4.0
description: >
  Build, modify, audit, or document pages, dashboards, components, layouts, and integrations for the Tabler project/repository or Tabler UI (@tabler/core). Use when the user mentions Tabler, this repository, dashboard/admin UI, Bootstrap 5 admin templates, preview pages, shared layouts/includes, Sass/JS assets, or needs cards, tables, forms, navbars, sidebars, charts, or responsive management interfaces that should follow Tabler source patterns.
---

# Tabler Skill

Use this skill for work in the Tabler repository and for generating UI that follows Tabler v1.4.x conventions. Prefer the local repository source over memory or external examples.

## Project map

- `core/` — published `@tabler/core` package: Sass in `core/scss/`, JS in `core/js/`, build output in `core/dist/` after build.
- `preview/` — Eleventy preview/demo site: pages in `preview/pages/`, preview-only Sass/JS in `preview/scss/` and `preview/js/`.
- `docs/` — documentation site.
- `shared/layouts/` — Eleventy layout templates. Main wrappers: `base.html`, `default.html`, auth/error/single variants.
- `shared/includes/layout/` — navbar, sidebar, page header, footer, CSS/JS includes, layout helpers.
- `shared/includes/ui/` — source snippets/macros for UI components. Check these before inventing markup.
- `shared/data/` — menu, layouts, icons, people, and other data used by preview/docs.
- `skills/tabler/references/` — compact skill references. Use them as quick guides, then verify against source if precision matters.

## Repository workflow

1. Inspect the relevant source files first:
   - Layout changes: `shared/layouts/base.html`, `shared/layouts/default.html`, `shared/includes/layout/*.html`, and matching `preview/pages/layout-*.html` frontmatter.
   - Component changes: `shared/includes/ui/<component>.html`, `preview/pages/<component>.html`, and corresponding `core/scss/**`.
   - Styling changes: `core/scss/` for package styles, `preview/scss/` only for demo/preview-only styles.
   - JS behavior: `core/js/` for package behavior, `preview/js/` only for demo behavior.
2. Preserve Eleventy/Liquid/Nunjucks-style conventions already present in nearby files.
3. Prefer editing source templates/includes over generated `dist/` output. Do not hand-edit generated build output unless the user explicitly asks.
4. Keep examples and docs aligned with the real source paths above.
5. Use `pnpm` commands from the repo root when validating. Common checks: `pnpm run lint-md`, package-specific `pnpm --filter @tabler/core build`, `pnpm --filter @tabler/preview build`, or narrower tests/scripts when available.

## Local layout facts from this repository

Tabler preview pages use frontmatter flags consumed by shared layouts, not a single magic class on `<body>`:

```yaml
---
page-header: Vertical layout
layout-sidebar: true
layout-sidebar-dark: true
permalink: layout-vertical.html
---
```

Important layout sources:

- `shared/layouts/base.html` defines the document shell, loads CSS/includes, runs `tabler-theme(.min).js` immediately after `<body>`, renders page content, modals/settings, then includes JS.
- `shared/layouts/default.html` wraps content with `<div class="page">`, conditionally includes sidebar/topbar, renders `<div class="page-wrapper">`, page header, `<main id="content" class="page-body">`, and footer.
- `shared/includes/layout/css.html` loads `dist/css/tabler(.min).css` or RTL CSS, then plugin CSS from `site.cssPlugins`, then preview demo CSS.
- `shared/includes/layout/js.html` loads page libs, `dist/js/tabler(.min).js` with `defer`, preview demo JS, and script blocks.
- `shared/includes/layout/page-header.html` renders `div.page-header... > div.container-xl > div.row.g-2.align-items-center`, uses `h1.page-title`, and conditionally renders actions in `div.col-auto.ms-auto.d-print-none`.

## Generating standalone Tabler HTML

When the user wants a self-contained HTML page outside this repository, use CDN assets and mirror the same structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <title>Dashboard - Tabler</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler.min.css">
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/js/tabler-theme.min.js"></script>
  <div class="page">
    <aside class="navbar navbar-vertical navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <h1 class="navbar-brand navbar-brand-autodark"><a href=".">Tabler</a></h1>
        <div class="collapse navbar-collapse" id="sidebar-menu">
          <ul class="navbar-nav pt-lg-3">
            <li class="nav-item active"><a class="nav-link" href="#"><span class="nav-link-title">Dashboard</span></a></li>
          </ul>
        </div>
      </div>
    </aside>
    <header class="navbar navbar-expand-md d-print-none">
      <div class="container-xl">
        <div class="navbar-nav flex-row order-md-last ms-auto"></div>
      </div>
    </header>
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <div class="page-pretitle">Overview</div>
              <h1 class="page-title">Dashboard</h1>
            </div>
            <div class="col-auto ms-auto d-print-none"><div class="btn-list"><a href="#" class="btn btn-primary">Action</a></div></div>
          </div>
        </div>
      </div>
      <main id="content" class="page-body">
        <div class="container-xl">
          <div class="row row-deck row-cards">
            <div class="col-sm-6 col-lg-3"><div class="card"><div class="card-body">Content</div></div></div>
          </div>
        </div>
      </main>
      <footer class="footer footer-transparent d-print-none"><div class="container-xl">Footer</div></footer>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/js/tabler.min.js" defer></script>
</body>
</html>
```

Only include optional CDN CSS such as `tabler-flags`, `tabler-payments`, or `tabler-vendors` when the page actually uses flags, payments, vendor plugins, or matching add-ons.

## Component lookup

For detailed examples, use `skills/tabler/references/components/*.md` as quick references. For source truth, prefer:

| Need | Check first |
|---|---|
| Alerts, badges, buttons, forms, tables, cards | `shared/includes/ui/*.html`, `preview/pages/*.html` |
| Layouts/sidebar/navbar/footer/header | `shared/includes/layout/*.html`, `shared/layouts/*.html` |
| Charts/maps/calendar/dropzone/datatables | `preview/pages/<plugin>.html`, `shared/includes/ui/<plugin>.html`, page libs |
| Sass variables/classes | `core/scss/` |
| Runtime behavior | `core/js/`, then `preview/js/` for demo-only code |

### Available Component References

| Component | File | Category |
|-----------|------|----------|
| **Layout** | `architecture/html-architecture.md` | Core |
| **Root/Blank Page** | `components/root.md` | Core |
| **Accordion** | `components/accordion.md` | UI |
| **Alerts** | `components/alerts.md` | UI |
| **Avatars** | `components/avatars.md` | UI |
| **Badges** | `components/badges.md` | UI |
| **Breadcrumb** | `components/breadcrumb.md` | UI |
| **Buttons** | `components/buttons.md` | UI |
| **Cards** | `components/cards.md` | UI |
| **Card Actions** | `components/card-actions.md` | UI |
| **Carousel** | `components/carousel.md` | UI |
| **Chat** | `components/chat.md` | UI |
| **Charts** | `components/charts.md` | Plugin |
| **Colors** | `components/colors.md` | Utilities |
| **Cookie Banner** | `components/cookie-banner.md` | UI |
| **Data Grid** | `components/data-grid.md` | UI |
| **Dropdowns** | `components/dropdowns.md` | UI |
| **Empty States** | `components/empty-states.md` | UI |
| **Flags** | `components/flags.md` | Icons |
| **Forms** | `components/forms.md` | UI |
| **Gallery** | `components/gallery.md` | UI |
| **Lightbox** | `components/lightbox.md` | Plugin |
| **Lists** | `components/lists.md` | UI |
| **Maps** | `components/maps.md` | Plugin |
| **Modals** | `components/modals.md` | UI |
| **Navigation** | `components/navigation.md` | UI |
| **Offcanvas** | `components/offcanvas.md` | UI |
| **Pagination** | `components/pagination.md` | UI |
| **Patterns** | `components/patterns.md` | Utilities |
| **Popovers** | `components/popovers.md` | UI |
| **Pricing** | `components/pricing.md` | UI |
| **Progress** | `components/progress.md` | UI |
| **Spinners** | `components/spinners.md` | UI |
| **Social Icons** | `components/social-icons.md` | Icons |
| **Statuses** | `components/statuses.md` | UI |
| **Steps** | `components/steps.md` | UI |
| **Tables** | `components/tables.md` | UI |
| **Tabs** | `components/tabs.md` | UI |
| **Tags** | `components/tags.md` | UI |
| **Timelines** | `components/timelines.md` | UI |
| **Toasts** | `components/toasts.md` | UI |
| **Tooltips** | `components/tooltips.md` | UI |
| **Tracking** | `components/tracking.md` | UI |
| **Typography** | `components/typography.md` | Utilities |
| **Wizard** | `components/wizard.md` | UI |
| **Dropzone** | `components/dropzone.md` | Plugin |
| **FullCalendar** | `components/fullcalendar.md` | Plugin |
| **WYSIWYG** | `components/wysiwyg.md` | Plugin |
| **Symfony Integration** | `references/symfony.md` | Integration |

## Icon System

Tabler uses **Tabler Icons** - a free and open-source icon set with over 5200+ icons.

### Using Icons

```html
<!-- Inline SVG (recommended) -->
<svg class="icon">
  <use xlink:href="#icon-home"/>
</svg>

<!-- With size modifiers -->
<svg class="icon icon-sm">
  <use xlink:href="#icon-home"/>
</svg>

<svg class="icon icon-lg">
  <use xlink:href="#icon-home"/>
</svg>

<svg class="icon icon-xl">
  <use xlink:href="#icon-home"/>
</svg>
```

### Icon Sizes

| Class | Size |
|-------|------|
| `icon-xs` | 12px |
| `icon-sm` | 14px |
| `icon` | 16px (default) |
| `icon-md` | 20px |
| `icon-lg` | 24px |
| `icon-xl` | 32px |

### Icon in Components

```html
<!-- Button with icon -->
<button class="btn btn-primary">
  <svg class="icon"><use xlink:href="#icon-plus"/></svg>
  Add New
</button>

<!-- Icon-only button -->
<button class="btn btn-icon" aria-label="Settings">
  <svg class="icon"><use xlink:href="#icon-settings"/></svg>
</button>

<!-- Icon at end -->
<button class="btn btn-primary">
  Continue
  <svg class="icon icon-end"><use xlink:href="#icon-arrow-right"/></svg>
</button>
```

### Loading Icons (SVG Sprite)

For CDN or standalone HTML, load the Tabler Icons sprite:

```html
<!-- Method 1: Using SVG sprite -->
<svg class="icon">
  <use xlink:href="https://cdn.jsdelivr.net/npm/@tabler/icons@3.40.0/icons-sprite.svg#tabler-home"/>
</svg>

<!-- Method 2: Direct SVG (from tabler-icons) -->
<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
  <path d="M5 12l-2 0l9 -9l9 9l-2 0"/>
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
</svg>
```

### Common Icons

| Icon | Name |
|------|------|
| `icon-home` | Home |
| `icon-user` | User |
| `icon-settings` | Settings |
| `icon-search` | Search |
| `icon-plus` | Add/Plus |
| `icon-pencil` | Edit |
| `icon-trash` | Delete |
| `icon-check` | Check/Success |
| `icon-x` | Close/X |
| `icon-arrow-left` | Arrow Left |
| `icon-arrow-right` | Arrow Right |
| `icon-chevron-left` | Chevron Left |
| `icon-chevron-right` | Chevron Right |
| `icon-menu` | Menu/Hamburger |
| `icon-bell` | Notifications |
| `icon-mail` | Email |
| `icon-calendar` | Calendar |
| `icon-file` | File |
| `icon-folder` | Folder |
| `icon-download` | Download |
| `icon-upload` | Upload |
| `icon-graph` | Chart/Graph |
| `icon-lock` | Lock/Security |
| `icon-logout` | Logout |
| `icon-brand-github` | GitHub |
| `icon-brand-twitter` | Twitter/X |
| `icon-brand-facebook` | Facebook |
| `icon-brand-instagram` | Instagram |
| `icon-brand-linkedin` | LinkedIn |

### Icon Font (Alternative)

If the project already uses icon fonts:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">

<i class="ti ti-home"></i>
<i class="ti ti-user"></i>
```

## Utility Classes

Tabler includes Bootstrap 5 utility classes plus additional Tabler-specific utilities.

### Spacing

Uses `1rem = 16px` base. Scale: 0, 1(0.25rem), 2(0.5rem), 3(1rem), 4(1.5rem), 5(3rem)

```html
<!-- Margin -->
<div class="m-0">No margin</div>
<div class="m-1">0.25rem margin</div>
<div class="m-2">0.5rem margin</div>
<div class="m-3">1rem margin</div>
<div class="m-4">1.5rem margin</div>
<div class="m-5">3rem margin</div>
<div class="mt-3">Top margin only</div>
<div class="mb-3">Bottom margin only</div>
<div class="ms-3">Start/left margin</div>
<div class="me-3">End/right margin</div>
<div class="mx-3">Horizontal margin</div>
<div class="my-3">Vertical margin</div>
<div class="m-auto">Auto margin</div>

<!-- Padding (same pattern) -->
<div class="p-3">1rem padding</div>
<div class="pt-3">Top padding</div>
<div class="pb-3">Bottom padding</div>
<div class="px-3">Horizontal padding</div>
<div class="py-3">Vertical padding</div>
```

### Display

```html
<div class="d-none">Hidden</div>
<div class="d-block">Block</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline block</div>
<div class="d-flex">Flex</div>
<div class="d-inline-flex">Inline flex</div>
<div class="d-grid">Grid</div>
<div class="d-table">Table</div>
<div class="d-table-cell">Table cell</div>

<!-- Responsive -->
<div class="d-none d-md-block">Hidden on mobile, block on md+</div>
<div class="d-block d-md-none">Block on mobile, hidden on md+</div>
```

### Flexbox

```html
<!-- Direction -->
<div class="flex-row">Row</div>
<div class="flex-column">Column</div>
<div class="flex-row-reverse">Row reverse</div>
<div class="flex-column-reverse">Column reverse</div>

<!-- Justify content -->
<div class="justify-content-start">Start</div>
<div class="justify-content-end">End</div>
<div class="justify-content-center">Center</div>
<div class="justify-content-between">Space between</div>
<div class="justify-content-around">Space around</div>
<div class="justify-content-evenly">Space evenly</div>

<!-- Align items -->
<div class="align-items-start">Start</div>
<div class="align-items-end">End</div>
<div class="align-items-center">Center</div>
<div class="align-items-baseline">Baseline</div>
<div class="align-items-stretch">Stretch</div>

<!-- Align self -->
<div class="align-self-start">Self start</div>
<div class="align-self-center">Self center</div>
<div class="align-self-end">Self end</div>

<!-- Wrap -->
<div class="flex-wrap">Wrap</div>
<div class="flex-nowrap">No wrap</div>
<div class="flex-wrap-reverse">Wrap reverse</div>

<!-- Grow/shrink -->
<div class="flex-grow-1">Grow</div>
<div class="flex-shrink-0">Don't shrink</div>
```

### Position

```html
<div class="position-static">Static</div>
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>
<div class="position-fixed">Fixed</div>
<div class="position-sticky">Sticky</div>

<!-- Position utilities -->
<div class="position-absolute top-0 start-0">Top left</div>
<div class="position-absolute top-0 end-0">Top right</div>
<div class="position-absolute bottom-0 start-0">Bottom left</div>
<div class="position-absolute bottom-0 end-0">Bottom right</div>
<div class="position-absolute top-50 start-50 translate-middle">Centered</div>
```

### Sizing

```html
<!-- Width -->
<div class="w-25">25%</div>
<div class="w-50">50%</div>
<div class="w-75">75%</div>
<div class="w-100">100%</div>
<div class="w-auto">Auto</div>
<div class="vw-100">100vw</div>
<div class="mw-100">Max 100%</div>
<div class="min-vw-100">Min 100vw</div>

<!-- Height -->
<div class="h-25">25%</div>
<div class="h-50">50%</div>
<div class="h-75">75%</div>
<div class="h-100">100%</div>
<div class="h-auto">Auto</div>
<div class="vh-100">100vh</div>
<div class="min-vh-100">Min 100vh</div>
```

### Text

```html
<!-- Alignment -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>

<!-- Transform -->
<p class="text-lowercase">lowercase</p>
<p class="text-uppercase">UPPERCASE</p>
<p class="text-capitalize">Capitalized</p>

<!-- Weight -->
<p class="fw-light">Light</p>
<p class="fw-normal">Normal</p>
<p class="fw-medium">Medium</p>
<p class="fw-semibold">Semibold</p>
<p class="fw-bold">Bold</p>

<!-- Decoration -->
<p class="text-decoration-none">No underline</p>
<p class="text-decoration-underline">Underlined</p>
<p class="text-decoration-line-through">Strikethrough</p>

<!-- Wrapping -->
<p class="text-wrap">Wraps text normally</p>
<p class="text-nowrap">No wrapping</p>
<p class="text-truncate">Truncates with ellipsis...</p>
<p class="text-break">Breaks long words</p>
```

### Visibility

```html
<div class="visible">Visible</div>
<div class="invisible">Invisible (hidden but takes space)</div>
```

### Borders

```html
<div class="border">All sides</div>
<div class="border-top">Top only</div>
<div class="border-end">End/right only</div>
<div class="border-bottom">Bottom only</div>
<div class="border-start">Start/left only</div>
<div class="border-0">No border</div>
<div class="border-top-0">No top border</div>

<!-- Border width -->
<div class="border border-1">1px border</div>
<div class="border border-2">2px border</div>
<div class="border border-3">3px border</div>
<div class="border border-4">4px border</div>
<div class="border border-5">5px border</div>

<!-- Border radius -->
<div class="rounded">Rounded</div>
<div class="rounded-0">No radius</div>
<div class="rounded-1">Small radius</div>
<div class="rounded-2">Default radius</div>
<div class="rounded-3">Large radius</div>
<div class="rounded-circle">Circle</div>
<div class="rounded-pill">Pill</div>
<div class="rounded-top">Top only</div>
<div class="rounded-bottom">Bottom only</div>
```

### Shadows

```html
<div class="shadow-none">No shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
```

### Overflow

```html
<div class="overflow-auto">Auto scroll</div>
<div class="overflow-hidden">Hidden</div>
<div class="overflow-visible">Visible</div>
<div class="overflow-scroll">Always scroll</div>
```

## Theme / Dark Mode

Tabler supports automatic and manual theme switching between light and dark modes.

### Automatic Theme Detection

Tabler automatically detects the user's system preference:

```html
<html lang="en">
  <!-- Automatically uses light or dark based on system preference -->
</html>
```

### Manual Theme Toggle

```html
<!-- Theme toggle buttons -->
<div class="nav-item d-none d-md-flex me-3">
  <div class="btn-list">
    <a href="?theme=dark" class="nav-link px-0 hide-theme-dark" title="Enable dark mode">
      <svg class="icon"><use xlink:href="#icon-moon"/></svg>
    </a>
    <a href="?theme=light" class="nav-link px-0 hide-theme-light" title="Enable light mode">
      <svg class="icon"><use xlink:href="#icon-sun"/></svg>
    </a>
  </div>
</div>
```

### Theme-aware Components

Many components adapt automatically:

```html
<!-- Navbar adapts to theme -->
<nav class="navbar navbar-expand-md" data-bs-theme="dark">
  <!-- Will use dark theme colors -->
</nav>

<!-- Cards, tables, etc. adapt automatically -->
<div class="card">
  <!-- Automatically switches light/dark styles -->
</div>
```

### Dark Theme Classes

```html
<!-- Force dark theme on element -->
<div class="bg-dark text-white p-4" data-bs-theme="dark">
  <h3>Dark Section</h3>
  <p>This section is always dark.</p>
</div>

<!-- Force light theme on element -->
<div class="bg-white p-4" data-bs-theme="light">
  <h3>Light Section</h3>
  <p>This section is always light.</p>
</div>
```

### JavaScript Theme Control

```javascript
// Set theme
document.documentElement.setAttribute('data-bs-theme', 'dark');
document.documentElement.setAttribute('data-bs-theme', 'light');

// Toggle theme
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-bs-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', next);
  localStorage.setItem('theme', next);
}

// Initialize from storage
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-bs-theme', saved);
  }
});
```

### Theme Colors (CSS Variables)

```css
:root {
  /* Light theme (default) */
  --tblr-body-bg: #ffffff;
  --tblr-body-color: #182433;
  --tblr-secondary-bg: #f1f5f9;
  --tblr-border-color: #e2e8f0;
}

[data-bs-theme="dark"] {
  /* Dark theme */
  --tblr-body-bg: #0f172a;
  --tblr-body-color: #f8fafc;
  --tblr-secondary-bg: #1e293b;
  --tblr-border-color: #334155;
}
```

### Theme-aware Backgrounds

```html
<!-- Body background -->
<body class="theme-light">
  <!-- Or -->
<body class="theme-dark">

<!-- Component backgrounds -->
<div class="bg-body">Matches body background</div>
<div class="bg-body-secondary">Secondary background</div>
<div class="bg-body-tertiary">Tertiary background</div>
```

## Integration notes

- Symfony/Twig guidance lives in `references/symfony.md`; adapt it to the project being integrated, but keep Tabler structure and script order from this repository.
- For backend templates, split sidebar/navbar/footer into partials, keep page-specific content in a content block, and keep `tabler-theme` before visible markup.
- For icon examples, prefer Tabler Icons via inline SVG/includes in repo templates or the icon font only if the consuming project already uses it.

## Gotchas

- Do not claim `aria-label="Page header"` is required for this repository; current `shared/includes/layout/page-header.html` does not include it.
- Do not use `h2.page-title` as the repository default; current source renders `h1.page-title`.
- Do not say layouts are controlled by body classes only. Body classes can exist, but layout selection in preview is primarily via frontmatter flags and shared includes.
- Do not put the footer outside `page-wrapper` for the default layout.
- Do not always load every Tabler add-on CSS; load only what is needed.
