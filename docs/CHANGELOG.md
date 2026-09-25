# @tabler/docs

## 1.6.1

### Patch Changes

- d104e78: Fixed Confetti ignoring the trigger's `data-bs-*` options when `data-bs-target` points elsewhere.

## 1.6.0

### Minor Changes

- 0e2faa0: Added a `Clipboard` copy button built on the browser API; `dist/libs/clipboard` is deprecated.
- e63fe34: Added a `Confetti` component with `data-bs-toggle="confetti"`, a demo page and docs.
- 8ceb56b: Added an agent skill under `/.well-known/agent-skills/` and an `ai-catalog.json` manifest to the docs.
- 8ae47ae: Added a CSS variables section to component docs pages, replacing the hand-written SCSS variables sections.
- 7bfeb12: Added a Sortable docs page covering `data-sortable`, the drag styles and the `Sortable` component.
- be30919: Updated `.legend` into a legend item with `.legend-dot`, `.legend-value`, `.legend-off` and `.legend-list`, plus a `Legend` component.
- a744b84: Added the `OtpInput` component with grouped slots, masking, and validation states.
- a9efcc2: Added the Signal component (`.signal`): stepped bars that show a level such as priority, with a `Signal.astro` wrapper.
- 5d5be36: Added `Sparkline` component: inline SVG line, bar and circle charts from `data-bs-values`, with size classes and signed bars.
- 9669c0a: Added a `Strength` password meter with a segmented bar, configurable scoring and `change.bs.strength`.
- 6bd3fff: Added the upgrade guide for Tabler 1.6 and moved the upgrade guides to `/ui/getting-started/upgrade/` with one page per release.

### Patch Changes

- b295d84: Fixed `.accordion-button-toggle-plus` with sprite icons by rotating the plus into a close icon instead of hiding a path.
- 72a95d8: Fixed `.alert` layout so headings, descriptions, lists and buttons align and stack correctly.
- eda6503: Updated the preview navbar Sponsor button and the docs sidebar Illustrations card to an All Package link and card.
- a13ebc3: Added `Autosize` component to `tabler.js`, with `update()` and `dispose()` methods.
- 62408b8: Added a dependency-free `Autosize` component that fires `resized.bs.autosize`; `dist/libs/autosize` is deprecated.
- 038000f: Added the `--tblr-btn-input-*` control scale on `:root` (padding, font size, line height, radius, min height per size).
- 2129b0b: Added a `check:open-source` gate and the five missing attributions, including Popper, which ships inside `tabler.js`.
- ea10f0e: Added a dependency-free `CountUp` component that respects `prefers-reduced-motion`; `dist/libs/countup.js` is deprecated.
- 118380d: Added `Datepicker` plugin built on Vanilla Calendar Pro with a `datepicker` preview page; Litepicker is deprecated.
- 0905918: Updated the default gray scale (`$gray-50`…`$gray-950`) to `neutral`; `data-bs-theme-base="gray"` keeps the 1.5 look.
- da79879: Updated accordion docs examples to use `.bg-surface` on each `.accordion-item`.
- 7bfeb12: Added relative colors, `oklch(from …)`, to the features that set the minimum browser versions on the browser support page.
- bcf5991: Added `integrity` and `crossorigin` attributes to the CDN snippets on the installation and plugin pages.
- bab8f24: Updated the class reference table in the docs to use the bordered `.docs-table` box.
- c28e848: Updated the confetti amount example to use plain `.btn` buttons instead of `.btn-outline-primary`.
- 41e2dc7: Updated markdown tables in the docs with a bordered, scrollable `.docs-table` box and a tighter header row.
- 5a735bc: Added a note to the installation docs that `tabler.js` already includes Bootstrap and must not be loaded next to it.
- 7bfeb12: Added a note to the 1.5 upgrade guide that `.text-gray-*` classes, a no-op in 1.4, now set the text color.
- 7bfeb12: Added Litepicker, `.legend` and neutral gray sections to the 1.6 upgrade guide; fixed the jsVectorMap CDN link.
- e052821: Added `--tblr-status-color-rgb`, `pre` size, `.card-options`, `.page-section-title` and `.theme-dark` to the 1.6 upgrade guide.
- 364ccf8: Fixed keyboard access and accessible names across preview pages, `Alert`, `Avatar`, `Rating`, `Tag` and `Wysiwyg` components.
- 9268348: Fixed the missing icon spacing in the "Alerts with icons" example on the alert docs page.
- 86ac4f1: Fixed the unreadable "5" badge in the avatar status docs example by adding `text-gray-100`.
- 6f96282: Fixed the "Card on a background pattern" docs example so the preview shows the `.bg-pattern-diagonal` background.
- 084d202: Fixed docs breadcrumbs, unresolved `site` expressions in the `.md` mirrors and the missing `play` and `rss` icons.
- 127c56b: Fixed the empty gutter to the right of the navbar on non-scrolling pages by dropping `scrollbar-gutter: stable` from `html`.
- 0d39308: Fixed heading order, form `autocomplete` and accessible names on preview pages, `Alert`, `Button`, `Dropzone` and `Avatar`.
- 8636174: Fixed `Trending` signs, ApexCharts 7 legend markers, marketing asset paths, `pageLibs` checks and the notifications close button.
- 2b44251: Added the `.flag-country-yt` flag for Mayotte.
- 57e213b: Updated `.form-hint` to Bootstrap's `.form-text`, with `.form-hint` kept as a deprecated alias.
- cc7afaf: Fixed a disabled off `.form-switch` looking the same as an enabled one by filling its track and darkening the knob.
- a984752: Added `.legend-lg`, `.legend-unit` and `.legend-list-divided` for large legend items with a big value and a unit.
- 7e7b2ce: Added `.navbar-floating` and the `data-bs-navbar-style="floating"` theme setting for a navbar and sidebar with a `0.5rem` gap.
- 7e7b2ce: Added `.offcanvas-floating` and the `data-bs-offcanvas-style="floating"` theme setting for an offcanvas with a `0.5rem` gap.
- 0fe02b3: Updated color mixing to `color-mix(in oklab)`; the `--tblr-*-rgb` variables are deprecated and stay until 2.0.
- a984752: Added `.page-section-title` and `.page-section-description` classes for section headings inside the page body.
- 107e493: Updated the palette to `oklch()` and masked the check, switch, toggler and carousel icons; `tabler` JS namespace is deprecated.
- add68b2: Fixed the missing promo top banner on docs.tabler.io and preview.tabler.io by restoring the `banner.js` script.
- 0776b88: Added a `switch-icon-loading` state and a cancelable `toggle.bs.switch-icon` event with `event.wait(promise)` for async toggles.
- bd5c010: Added `SwitchIcon`, `CountUp`, `InputMask` and `Sortable` components to `tabler.js`.

## 1.5.1

### Patch Changes

- ac001f8: Updated `astro` to 7.3.1 and `@astrojs/vercel` to 11.0.10, and stopped installing optional peers such as `next`.
- 8fc079d: Added the color palette, flags, payments and social icons tables to the docs `.md` mirrors via a new `MarkdownSource` component.
- 57a29eb: Fixed the docs "On this page" list running past the viewport; the sticky rail now scrolls on its own.

## 1.5.0

### Minor Changes

- 4a97921: Added `Accordion` documentation page with usage variants and Bootstrap `collapse` behavior examples.
- f5f75d4: Added a Printing docs page covering `d-print-*` utilities and the `media-print` mixin.
- 09d419a: Added a `charts-advanced` page and docs for two y-axes, chart annotations, a zoom brush and synced chart groups.
- 3277fa0: Added `Astro` icons library documentation page for the new `@tabler/icons-astro` package.
- d8956a0: Updated the `preview` and `docs` packages to build with Astro instead of Eleventy.
- 73f7c2a: Added `Accept: text/markdown` content negotiation for docs pages, with q-value parsing and `406` responses.
- 9dd26fd: Added an Accessibility section to every UI documentation page.
- d2c1271: Added a Background blur page, gray utilities on the colors page and a language selector section on the navbars page.
- 135f38d: Added `Info`, `Tip`, `Warning`, `Danger` and `Note` callouts, usable in any MDX page, with a reference page under Resources.
- 9dd26fd: Added installation and usage sections to the chart and countup pages, covering the `.chart-*` size classes and sparklines.
- 9dd26fd: Added a class reference table to every component page, from the new `classnames` front matter.
- 6e6084a: Added docs pages for the Datepicker and Tom Select form plugins, `form-datepicker` and `form-select-tomselect`.
- 9dd26fd: Updated the docs layout: elevated article panel, rounded sidebar navigation, "On this page" rail and restyled prev/next links.
- 9dd26fd: Listed every component class in `llms.txt`, from the `classnames` front matter.
- 73f7c2a: Added a `llms-full.txt` page with all docs in one file, `Content-Signal` in robots.txt and markdown `Link` alternate headers.
- 9dd26fd: Added a source link and a copy-as-markdown button, and moved the class reference to the end of the page.
- 9dd26fd: Added `classnames` to the social icons and flags pages.
- 9dd26fd: Rewrote the autosize, range slider, WYSIWYG and dropzone plugin pages with installation, usage and accessibility sections.
- 9dd26fd: Expanded the social icons, payments, vector map, inline player, PDF, EPS, illustrations preview and references pages.
- 9dd26fd: Documented `avatar-square`, `mention`, `offcanvas-narrow`, `btn-floating`, `card-cover`, `td-truncate` and other variants.
- 4f6e99b: Added a folded sidebar (`navbar-folded`, `navbar-folded-hover`) with flyout submenus, a pin toggle and a light `16rem` sidebar by default.
- 416ca63: Added framework integration guides for Laravel, React, Next.js, Vue, Angular, Nuxt, Symfony, Django, Rails, SvelteKit, and Astro.
- 1adeb68: Added a Docs for LLMs page explaining `llms.txt` and the `.md` page mirrors, with a sidebar link.
- 09d419a: Added radar, polar area, treemap, timeline, box plot, bubble and funnel chart types to the charts preview and docs.
- f35aab3: Added a Tabler Payments docs section with `@tabler/payments-*` package pages for React, Vue, Preact and Astro.
- 9dd26fd: Removed the EPS icons page, since `@tabler/icons-eps` is no longer maintained.
- fb3d7dc: Added an RTL support docs page covering the `dir="rtl"` attribute, the published `*.rtl.css` builds, how rtlcss generates them, and which utility classes are direction-aware.
- 4f6e99b: Added `nav-section-title` group labels to the vertical sidebar, shown as short separators in the folded state.
- 4f6e99b: Added a `navbar-footer` sidebar zone with a user block; the sidebar nav scrolls between the pinned brand and footer.
- bd4e381: Added `Star Rating` documentation page with static and interactive rating examples based on existing classes.
- 8af57f9: Added `Tag` documentation page with examples for icon, media, badge, checkbox, and list usage.
- 7b64726: Added a Theme base colors page documenting the five `data-bs-theme-base` gray palettes in `tabler-themes.css`.
- f4c514a: Added an `Upgrade to 1.5` page with the breaking changes, renamed classes and Sass updates from 1.4.

### Patch Changes

- 1effe22: Fixed the skip link to appear on focus and added missing `<main>` and labelled `<nav>` landmarks.
- 2a06640: Added `added-in` badges to Card gradient, Progress steps and new getting-started guides; fixed background patterns' version.
- 1adb710: Added `action` and `link` examples to the important alerts in the alerts preview and docs pages.
- 09d419a: Documented the ApexCharts dual license, which applies to the copy shipped in `dist/libs`, in the readme and chart docs.
- 100a37b: Added background pattern utilities and documentation, including updated preview demos.
- 46da1f7: Updated background patterns documentation with missing pattern variants, transparent utility usage, and size coverage.
- ffe3489: Updated `.badges-list` to `.badge-list` and `.tags-list` to `.tag-list`, keeping the old names as deprecated aliases.
- e1ecd39: Updated the supported browser baseline to what the CSS needs: Chrome 123, Firefox 128, Safari 17.5.
- 09d419a: Added a `--tblr-chart-1` … `--tblr-chart-5` palette and wired ApexCharts theme tokens, so every chart follows the color mode.
- 1ec82d0: Updated the contributing guide, README and Docker setup for the Astro-based development toolchain.
- 8704725: Updated preview and docs examples to the unified demo component props: `variant`, `color`, `size`, `ariaLabel`.
- 38df58d: Added the `not-found` illustration and a search button to the docs 404 page.
- 9dd26fd: Documented card status, progress, actions, subtitle, surfaces, scrollable body, tables, links and overlays.
- 9dd26fd: Fixed highlighted code blocks using hardcoded colors instead of the Tabler surface tokens.
- 9dd26fd: Fixed the copy button in docs examples to be a `button` with an accessible name.
- 684f40e: Updated the documentation to explain font sizing and system color CSS variables.
- 9dd26fd: Fixed docs example code blocks gluing inline elements like `<label>` and `<input>` onto one line.
- 9dd26fd: Added a `dark` background option to the docs `<Example>` component.
- 9dd26fd: Updated docs examples to use the `<Icon />` component and consistent Prettier formatting.
- d2c1271: Fixed duplicate ids and missing targets in the modal, offcanvas, page headers and page layouts examples.
- 9dd26fd: Fixed keyboard access in docs examples for carousel controls, disabled links, `btn-loading` and progress bars.
- 9dd26fd: Fixed install snippets pointing at urls that do not resolve on the vector map, inline player and icon pages.
- 9dd26fd: Fixed docs examples using classes that do not exist, such as `alert-facebook`, `btn-close-white`, `bg-gray`, `btn-xs`, `alert-title` and `hr-text-center`.
- 9dd26fd: Added tooltips and accessible names to the footer icon links.
- 9dd26fd: Stacked form docs examples in a column and tightened the sidebar nested menu indent.
- 9dd26fd: Moved the form pages backed by a third-party library into the Plugins section.
- 9dd26fd: Renamed form docs pages without the `form-` prefix and flattened the Illustrations and Emails sections.
- a0d84f6: Updated the How to Contribute guide with starter issues, Codespaces setup, commands and PR conventions.
- f35aab3: Added Introduction pages with quick starts and cover images to the Icons, Illustrations, Emails and Payments docs sections.
- 1ec82d0: Fixed documentation formatting issues: heading hierarchy, missing image alt texts and broken list structure across docs pages.
- 9dd26fd: Split the getting started menu group into Getting started and Resources.
- 9dd26fd: Updated the docs navbar to use `container-lg`.
- 4afc2ea: Updated the prose on 75 docs pages to plain English, shortened the page summaries and merged duplicate sections on the button and card pages.
- 9dd26fd: Moved components that need a third-party library into the Plugins section.
- 9dd26fd: Moved the Website, Preview and Support links from the docs sidebar to the top navbar.
- 9dd26fd: Restyled the related and prev/next cards, and moved prev/next below the article panel.
- 9dd26fd: Restored the `docs.scss` source for the docs styles, compiled with Sass instead of a checked-in `docs.css`.
- 9dd26fd: Fixed the search modal using the Algolia palette instead of Tabler colors, including an unreadable selected result.
- 9dd26fd: Darkened the docs sidebar links, kept rows to one line and added a visible focus ring.
- c430cfe: Updated UI component docs to singular file names and frontmatter, with redirects from plural routes.
- 826a073: Added `sitemap.xml` and `robots.txt` endpoints for the docs site and fixed docs layout title rendering outside production.
- 2f8f495: Fixed the docs header not staying sticky, and the table of contents sliding under it.
- 9dd26fd: Documented sortable headers, selectable rows, stacked mobile tables, and outline, dot and icon-only badges.
- 9dd26fd: Rewrote the timeline and datagrid pages with markup, variants and accessibility notes.
- 9dd26fd: Fixed plugin demos showing their stock styles, because library CSS loaded after `tabler-vendors.css`.
- ee4c88f: Updated `@docsearch/js` and `@docsearch/css` to v5 and kept the docs search on the keyword-only entry point.
- 1adeb68: Fixed html comments in docs code examples running into the closing tag of the element before them.
- 0f8dcb0: Updated preview and docs to use the shared `date-format`, `string-format` and `pseudo-random` helpers.
- 09d419a: Fixed chart colors in dark mode: axis lines and ticks, marker and treemap outlines, and the tooltip title.
- 09d419a: Fixed the small chart example on the chart docs page, which shared an element id with the line chart example and stayed empty.
- c547329: Fixed the `Plugins` card on the docs homepage linking to a 404 `/plugins` route instead of `/ui/plugins`.
- 1da70a7: Fixed the docs logo link name, dead example links in the navbar and offcanvas pages, and the vector map error on its plugin page.
- 9c78cf6: Fixed `.bg-gradient` conflicts that broke `from`/`via`/`to` rendering and updated the gradient docs.
- ee4c88f: Fixed docs pages with callouts falling back to their MDX source in `llms.txt` instead of the rendered examples.
- c71a321: Fixed the Sass import in the framework guides to use `@use` instead of the deprecated `@import`.
- 25f466b: Updated the icon count on the icons pages to read from `icons-info.json`, so it follows the installed version.
- 5baf073: Added 74 new payment provider icons imported from `tabler-payments` and removed 12 outdated providers like `dotpay` and `solo`.
- 70f996b: Documented the layout theme settings on the color modes and page layouts pages.
- 1adeb68: Fixed the `.md` docs mirrors showing component tags like `<Icon />` instead of the rendered html.
- f11ece4: Added `--tblr-pattern-opacity-factor` and `.bg-pattern-opacity-*` utilities for background patterns.
- 43eee38: Added `Progress Step` component documentation and cleaned up the progress steps preview markup for cleaner rendered output.
- 08cad98: Updated the `Progress Bar` documentation with new variants and full-width stacked previews.
- 1489b13: Added `.prose` alias for markdown content and updated preview/docs references and redirects.
- 09d419a: Replaced the placeholder chart data on the charts page and in the chart docs with realistic series, and titled every demo card.
- 4d04c10: Removed the unused `bootstrapLink` front matter field from `DocsLayout`, `DocsMdxLayout`, and all docs pages.
- ff24af9: Updated the default `$font-family-sans-serif` and `$font-family-monospace` to the system font stacks. Tabler no longer bundles a web font, so no font files are downloaded.
- 53f5244: Updated the `Illustration` and `Empty` components to accept only the bundled illustration names, checked at build time.
- 369322a: Updated Tabler Illustrations to v1.17.0 with 25 new illustrations.
