# @tabler/core

## 1.5.0 - 2026-09-05

### Minor Changes

- 9ea657b: Added `.text-gray-50` through `.text-gray-950` utility classes alongside the existing `.bg-gray-*` utilities.
- 100a37b: Added background pattern utilities and documentation, including updated preview demos.
- 9d5c83f: Added Bootstrap 5.3.8 to the core source tree, with SCSS as modules and components converted to TypeScript.
- e1ecd39: Updated the supported browser baseline to what the CSS needs: Chrome 123, Firefox 128, Safari 17.5.
- 9c5d729: Added `.btn-ghost` button variant with transparent background and hover effects.
- ec94693: Added `.card-gradient` component with gradient variants, direction modifiers, and animated backgrounds.
- 324b0fb: Added `--tblr-card-header-bg` and `--tblr-card-footer-bg` variables so both backgrounds can be overridden independently.
- 09d419a: Added a `--tblr-chart-1` … `--tblr-chart-5` palette and wired ApexCharts theme tokens, so every chart follows the color mode.
- d2c1271: Added TypeScript declarations to the npm package, so `import { Modal } from "@tabler/core"` is typed.
- 9d5c83f: Added support for `data-tblr-*` attributes alongside `data-bs-*` for dropdown and other components.
- bf9e7ad: Added Driver.js to `libs.json` and `dist/libs` for product tours.
- bf9e7ad: Added `--tblr-dropdown-item-gap`, `--tblr-dropdown-item-icon-size` and `--tblr-dropdown-item-icon-color` to `.dropdown-menu`.
- 4f6e99b: Added a folded sidebar (`navbar-folded`, `navbar-folded-hover`) with flyout submenus, a pin toggle and a light `16rem` sidebar by default.
- 70f996b: Added the `.font-sans-serif`, `.font-serif` and `.font-comic` utilities next to `.font-monospace`.
- d2c1271: Added `.bg-gradient-{from,via,to}-transparent` and `-inverted` gradient stops, which the gradient docs already described.
- 5baf073: Added 74 new payment provider icons imported from `tabler-payments` and removed 12 outdated providers like `dotpay` and `solo`.
- 5e119d4: Added `bg-blur` utility and increased `container-tight` width for layout flexibility.
- 70f996b: Added the `data-bs-layout`, `data-bs-navbar-position`, `data-bs-navbar` and `data-bs-navbar-theme` layout settings.
- 0c79963: Added `media-print` mixin and print styles to hide interactive components during printing.
- 48dbd1e: Updated the core build system from Rollup to Vite, with identical UMD and ESM output.
- 4ce08ca: Updated the navbar-side component and reorganized its apps, language, notifications and user sections.
- 70f996b: Added `.navbar-side` support in the vertical navbar: a wrapper for a trailing `.navbar-nav` group pinned to the bottom of the menu.
- f11ece4: Added `--tblr-pattern-opacity-factor` and `.bg-pattern-opacity-*` utilities for background patterns.
- cad8eb8: Removed the `$prefix` Sass variable; the `--tblr-` prefix is now applied at build time by PostCSS.
- 9c5d729: Added Progress Background component with text labels and value display.
- 9c5d729: Added `.progress-lg` and `.progress-xl` size variants for the progress component.
- 9c5d729: Added Progress Steps component for step-by-step navigation indicators.
- bea97f8: Removed `@hotwired/turbo` integration, including `.turbo-progress-bar` styles and the Turbo loader preview demo.
- 8962710: Removed unused SCSS `!default` variables, which now raise a Sass error when set via `@use ... with (...)`.
- 9820d11: Updated core SCSS to the Sass module system with `@use` and `@forward`.
- 4f6e99b: Added `nav-section-title` group labels to the vertical sidebar, shown as short separators in the folded state.
- 4f6e99b: Added a `navbar-footer` sidebar zone with a user block; the sidebar nav scrolls between the pinned brand and footer.
- ff24af9: Updated the default `$font-family-sans-serif` and `$font-family-monospace` to the system font stacks. Tabler no longer bundles a web font, so no font files are downloaded.
- 9dd26fd: Changed the default theme of `tabler-theme.js` to `auto`, following the system color scheme.
- 7556ae2: Added an `auto` color mode to theme settings with system `prefers-color-scheme` support.
- e3d86c5: Updated `apexcharts` from `3.54.1` to `7.0.0` and added `--chart-{id}-color-{index}` variables.

### Patch Changes

- 1effe22: Fixed invisible keyboard focus indicators and added `prefers-reduced-motion` and `forced-colors` support.
- 09d419a: Documented the ApexCharts dual license, which applies to the copy shipped in `dist/libs`, in the readme and chart docs.
- 080d3aa: Fixed the ApexCharts tooltip arrow staying white on the dark tooltip by setting the `--apx-tt-bg` and `--apx-tt-border` tokens.
- ffe3489: Updated `.badges-list` to `.badge-list` and `.tags-list` to `.tag-list`, keeping the old names as deprecated aliases.
- 059bae1: Updated Bootstrap exports to a single source of truth in `bootstrap.js` and removed the duplicates from `tabler.js`.
- 4f6e99b: Moved `btn-floating` to the end side of the screen, so it does not cover the sidebar.
- 5018aa9: Fixed `.btn-icon` to be square by aligning `min-width` calculation with base `.btn` formula.
- a508bb6: Updated hardcoded `rem` and `px` values to SCSS variables across core components for easier theming.
- c71a321: Updated the `@tabler/core` README with package usage, optional stylesheets, Sass setup and browser support.
- a0d84f6: Updated the npm package README with badges, quick links, CDN usage, documentation and changelog links.
- c860288: Fixed icon alignment for `.btn-sm` and `.btn-xl` sizes.
- 1adb710: Fixed `.alert-action` and `.alert-link` colors inside `.alert-important` so links stay readable.
- 2dc7eda: Updated `$border-color-translucent-dark` to `rgba(128, 150, 172, 0.2)` for better dark mode visibility.
- 09ab0bc: Fixed disabled buttons falling back to `currentColor` for the border and to a transparent background.
- febfa9f: Fixed the missing focus ring on buttons and `btn-check` button groups by using the shared focus ring token.
- 8324701: Fixed `.card-header` background being overridden by a `background: transparent` shorthand.
- 0187b26: Fixed the `card-status-*` strips leaving a thin line over the card border and a mismatched corner radius.
- 70ec683: Fixed card corner radius in tab layouts when tabs sit above or below tab content.
- c1e1fdf: Fixed the corner radius and the double bottom border on the first and last rows of a table inside a `.card`.
- de44d61: Fixed `.card-tabs .nav-tabs` sharing `z-index` with `.dropdown-menu`, which hid dropdowns behind card tabs.
- 6414238: Fixed barely visible checkbox and radio borders in dark theme by using `$input-border-color`.
- b1d49e9: Fixed CountUp to parse formatted number targets and avoid double-start when `enableScrollSpy` is enabled.
- 09d419a: Fixed chart colors in dark mode: axis lines and ticks, marker and treemap outlines, and the tooltip title.
- 070248d: Fixed dark mode link contrast: `--tblr-link-color` is now a lighter tint of `--tblr-primary` on dark surfaces.
- 601e950: Fixed dark mode text selection contrast with a new `$selection-bg` Sass variable.
- d0a793c: Fixed the disabled form control background in dark theme with a new `--tblr-bg-forms-disabled` variable.
- b1d49e9: Fixed dropdown `data-bs-boundary="viewport"` to use `document.documentElement` instead of the first `.btn` element.
- c527135: Fixed `.input-icon` inline-start padding for `.form-select`.
- 70f069c: Fixed `.form-select` keeping its default box-shadow inside `.input-group`.
- 9c78cf6: Fixed `.bg-gradient` conflicts that broke `from`/`via`/`to` rendering and updated the gradient docs.
- bc24b3a: Fixed `--tblr-gray-*-fg` tokens to map directly to `--tblr-gray-*` instead of contrast-based fallbacks.
- c8b8b24: Fixed gray theme custom properties output using SCSS interpolation and updated default `$body-color` to `$gray-500`.
- 70193fe: Fixed `.icon-pulse`, `.icon-tada` and `.icon-rotate` not animating webfont icons.
- f0b909d: Fixed the `sm` and `lg` size mismatch between form controls, buttons and input groups.
- 6e656ad: Fixed `.input-icon-addon` z-index issue with form validation feedback and added default height.
- b1d49e9: Fixed input mask `lazy` option to read `data-mask-visible` via `dataset.maskVisible`.
- fc16b6a: Defined `--tblr-body-text-align`, `--tblr-nav-link-font-size` and `--tblr-nav-link-active-color`, which the css already read.
- a883531: Fixed `.list-group-item-{color}`: the palette colors had no styling at all and no variant had its background.
- 9dd26fd: Fixed the markdown table header keeping its surface background instead of going transparent.
- 9d04e14: Fixed the marketing hero, browser and shape components reading custom properties nothing defined.
- 9dd26fd: Fixed `offcanvas-narrow`, which had no effect on the width of the panel.
- f5f75d4: Fixed print styles: hidden navbar/sidebar, forced light `color-scheme`, and avoided breaking `.card`/table rows.
- 1da70a7: Fixed ScrollSpy throwing on target ids that start with a digit, such as headings like `1. Setup`.
- 464a522: Fixed oversized and mismatched validation icons on `.form-select` and Tom Select selects.
- 8bc6fa7: Fixed status color classes to use CSS variables and to include the social colors.
- c527135: Fixed `.steps` horizontal overflow on small screens by enabling scrollable overflow below the `sm` breakpoint.
- cd0b210: Fixed the typographic `.steps` rule leaking its guideline and spacing onto the `.steps` component.
- 90c42f2: Fixed Tom Select's `.ts-dropdown` losing its z-index, background, and colors to the bootstrap5 preset CSS.
- 6849337: Fixed Tom Select styles to use `--tblr-*` variables instead of undefined `--bs-*` references.
- e206d7a: Fixed white space next to the scrollbar by using `scrollbar-gutter: stable` on `html`.
- bf9e7ad: Updated `.flag` to size by width with `$border-radius-xs` on `xs`, and narrowed tooltip `padding-x` to `spacer-2`.
- b8b63d7: Fixed Sass mixed-declaration warnings in the navbar, card, nav and table styles.
- 9432835: Updated SCSS files to use the `border-radius` mixin.
- 9c5d729: Updated `stroke-width` for `.icon-sm` from `1` to `1.5` for better visibility.
- bf9e7ad: Updated `.input-group-flat` addons to drop the inner border and sit above the control.
- fa678a7: Updated root color tokens to use CSS `light-dark()` so paired values live in one `:root` declaration.
- 7ae422f: Updated core SCSS to logical properties and a `--tblr-dir` multiplier, so RTL works with plain `tabler.css`.
- 301e778: Updated `rgba()` calls to the modern `color-mix()` and `color-transparent()` functions.
- 9dd26fd: Fixed the avatar corner radius inside `.form-imagecheck-image` and set `.nav` font size to the body font size.
- 4f6e99b: Fixed the `navbar-toggler` icon: the middle bar was flex-squeezed, breaking the open-state X and shortening the hamburger.
- 9c5d729: Added smooth transitions for progress bar `width` and `background-color` changes.
- 1489b13: Added `.prose` alias for markdown content and updated preview/docs references and redirects.
- f35aab3: Added the same border and radius to `figure` images as plain images in `.prose` and `.markdown` content.
- 66dc336: Fixed the `caret()` mixin by restoring `$caret-width` to `0.36em`.
- 70f996b: Fixed the sidebar marking two items as selected: a group holding the current page is now emphasized, not filled.
- 70f996b: Fixed the vertical navbar brand sitting at the far edge on small screens when nothing follows it in the top bar.
- 9c5d729: Updated skip-link to use `visually-hidden` for improved accessibility.
- 346e091: Fixed oversized `dist/libs` by copying only the runtime files each library declares in `libs.json`.
- d2c1271: Fixed `tabler-theme.js` replacing a server-rendered `data-bs-theme` when the visitor has no stored choice.
- 736e604: Updated deprecated global Sass functions to module equivalents (`map.merge`, `string.slice`, `math.percentage`, etc.).
- b8b63d7: Updated Bootstrap to v5.3.8.
- 9c5d729: Updated trending component to use `arrow-up`/`arrow-down` instead of `trending-up`/`trending-down`.
- 70ec683: Updated `$card-status-size` default from `$border-width-wide` to `3px`.
- 666ccd6: Updated shadow tokens (`--tblr-shadow-*`) to use the new `xs`–`2xl` and `overlay` values.

## 1.4.0 - 2025-07-13

### Minor Changes

- 9951fe9: Enhance button and hover animations
- a200d30: Improve breadcrumb styles
- 49ab9ea: Add new Tabler Illustrations

### Patch Changes

- 6c4dd36: Update class names from `*-left`, `*-right` to `*-start`, `*-end`
- 6fec73a: Fix relative line heights in buttons
- db6200a: Remove `license_key` option from HugeRTE init object
- e96f055: Add different favicon to development environment
- 6c38a48: Update Bootstrap to v5.3.7
- 2a12f72: Update CSS calculations to use `calc()`
- 666a296: Fix list group item hoverable only with `.list-group-hoverable` class
- cfd4cb6: Fix `.pagination-link` hover styles to non-active items

## 1.3.2 - 2025-05-19

### Patch Changes

- 446c34e: Fix README file in core package

## 1.3.1 - 2025-05-19

### Patch Changes

- a7f73d7: Fix README file in core package

## 1.3.0 - 2025-05-19

### Minor Changes

- a1af801: Add FullCalendar integration
- b9d434d: Add new charts to dashboard pages
- 79bd867: Add new form layout page

### Patch Changes

- cac5d92: Update illustrations to v1.7
- f94b153: Add SRI hashes to scripts and styles
- c127d65: Fix colour picker preview page not displaying correctly
- b6e9b18: Update icons to v3.31.0
- 8850f61: Enhance pagination component with new styles
- 9910dd0: Add "text features" menu item
- 638f36c: Refactor SCSS variable names for shadows
- 0d501e9: Correct `aria-label` of app menu link
- 3a02ef9: Fix some marketing site rows overflowing on mobile
- fd0fd47: Improve card footer layout and enhance entry display format in invoices
- 74e5d26: Fix color badge in navbar menu
- 72a1d67: Add clipboard functionality to Tabler documentation
- bb617b8: Fix colour swatches on small screens
- d73d78e: Add missing `tw` entry in `flags.json`
- 19a3d20: Delete missing demo RTL style
- b5e2f54: Enhance dropdown components for better accessibility
- a41c956: Remove unnecessary `!important` from body padding
- e675389: Fix missing border-radius to `.card-header-tabs`
- 9007e73: Fix FAQ accordion structure

## 1.2.0 - 2025-04-16

### Minor Changes

- c59bc9d: Add gradient background utilities
- f9e4da2: Add new apps card with brand icons in navbar
- 92a3afe: Replaced TinyMCE with HugeRTE to address license violation
- 199f39a: Update Bootstrap to version 5.3.5
- 9bbcb99: Add theme settings wizard
- b17b488: Add steps light colors
- 215eaa4: Add Turbo library integration

### Patch Changes

- aea3b0a: Rollback accordion component structure
- 3fc7b84: Add space between page numbers in pagination
- 2f8a372: Add Bootstrap components to Tabler JS
- 9fceadd: Fix tooltip colors in vector maps
- 44250db: Update avatar size variable to support list size configuration
- be1f3d1: Fix broken shape in South Korea flag
- c20d076: Refactor `border-radius` in components to use CSS variables
- 042e50f: Update disabled color variables in navbars
- 473fa38: Apply border radius to `tom-select` on focus
- 8646192: Add avatars page with various demos of avatars
- 922bb03: Minor spelling and grammar improvements to emails docs
- 44250db: Update avatar size variable to support list size configuration
- ddcd3a7: Refactor SCSS for alerts and close button styles
- e3d68d6: Fix `autosize` and `input mask` plugins to use window scope
- 4846828: Fix scrollbar color mixin to use body color variable
- 6b6617a: Improve README
- 94bea00: Make scrollbar track transparent
- e14e492: Fix scrollbar jumps when content is higher than screen
- 6d6d1bd: Add responsive font size for form controls on mobile devices
- 6c566cf: Add new advanced table example

## 1.1.1 - 2025-03-01

### Patch Changes

- f29c911: Fix Documentation structure

## 1.1.0 - 2025-03-01

### Minor Changes

- d3ae77c: Enable `scrollSpy` in `countup` module
- bd3d959: Refactor SCSS files to replace divide function with calc
- cb278c7: Add Segmented Control component
- b47725d: Add new text features page with mentions: user, color and app.
- b4b4d1a: Add Scroll Spy page
- 9cd5327: Update border radius variables for consistency across components
- 4376968: Add Signature Pad feature and signatures page
- f95f250: Update color utility classes and replace background colors in pricing table
- eaa7f81: Refactored the project into a monorepo, removed Gulp, and introduced a new, more efficient build process.
- ea14462: Add documentation for segmented control component
- 1edaff4: Add new payment provider (Troy)
- edbaa1e: Add selectable table functionality with active background color
- 378fba8: Refactor badge styles, remove Bootstrap styles
- f3c409f: Refactor alert component styles and markup, remove Bootstrap styles
- c240b5a: Refactor accordion component styles and markup, remove Bootstrap styles

### Patch Changes

- 687267d: Fix overflow of `label` in a `floating-input`
- 06b1dec: Fix size of `apexcharts` tooltip marker
- afd0700: Fix apexcharts heatmap example in docs
- 78383ef: Fix negative margins in `.navbar-bordered` variant
- 11f4487: Use the full license agreement for illustrations in docs
- b28ce9f: Fix vertical alignment in single page and error layouts
- 24b944c: Fix `.avatar-upload` double borders
- ca4ba14: Fixes navbar styles with new hover effects and color variables

## 1.0.0 - 2025-01-28

### Minor Changes

- c276a8b: Add new `Tag` component
- d380224: Add customizable Star Ratings component using `star-rating.js` library
- 47cd6c1: Add `flags.html` page with list of all flags
- be67ab6: Update CSS class from `text-muted` to `text-secondary` for better Bootstrap compatibility
- 080c746: Adding `alerts.html` page with example of alerts.
- b381273: Change primary color value to new Tabler branding
- 75619dd: Unify dark mode with latest Bootstrap API and improve dark mode elements
- cc82dbf: New Chat component
- 5a03643: Adjusting form element sizes for enhanced mobile devices compatibility
- be14607: Add new color picker component using `coloris.js` library
- d046570: Update Tabler Icons to version 2.23 with 18 new icons added
- 5488c50: New page with payment providers: `payment-providers.html`
- 5488c50: Add support for new payment providers: 2c2p, Adyen, Affirm, Alipay Plus, Allegro Pay, Amazon Pay, Apple Pay, Autopay, Binance USD, Bkash, Cash App, Chime, EasyPaisa, Ethereum, Google Pay, HubSpot, iDeal, Litecoin, Mercado Pago, MetaMask, MoneyGram, OpenSea, Payconiq, Payka, Payline, PayPo, Paysafe, Poli,
  Revolut Pay, Samsung Pay, Shop Pay, Solana, Spingo, Stax, Tether, True USD, Venmo, WeChat Pay, Wise, Zelle

### Patch Changes

- 293d0a4: Change Twitter to X brand
- fd0935a: Updated link to icons documentation
- 1cf27dc: Dependencies update
- 041f4e4: Order menu items alphabetically
- 20cad01: Automatically retrieve and display the changelog from the CHANGELOG.md file.
- 34f3efc: Initialize Visual Studio Code config
- 7ba7717: Make horizontal rule direction aware
- 063ef58: Update Tabler Illustrations to v1.5
- 5e2c975: Update Tabler Icons to v3.29.0
- 9d5f7ca: Remove unused dependencies from `package.json`
- be69fd6: Replace Jekyll with Eleventy
- 2f5fad6: Dependencies update
- dfd7c88: Update TinyMCE to v7.0
- 056df18: Fix text color in dark version of navbar
- 17327dc: Remove invalid `z-index` setting for dropdowns
- 4ff077a: Update Tabler Icons to version 2.21 with 18 new icons added
- 867c8dd: Update Tabler Emails to v2.0
- d8605f2: Init changelog script
- 89c6234: Adding Two-Step Verification Pages
- f6e885b: Replace `.page-center` with `.my-auto` in single page layouts
- 7aa216f: Add border-opacity variable for improved color utility
- 88eb413: Fix icon display issues in the Star Ratings component
- 78392b6: Fix `color` of disabled `dropdown-item` in Navbar component
- 4deb8f4: Bump pnpm/action-setup from 2 to 3
- 9015472: Add social icons plugin
- 7fe30a1: `Dockerfile` fix
- e53942f: Update Jekyll to version 4.3.4
- 72f868b: Update Tabler Icons to version 2.20 with 37 new icons added
- e0443c0: Add Tabler Illustrations
- 5cca710: Update illustrations and enhance SVG handling in HTML
- 3a4f10f: Fix ids of custom size star ratings
- 7896562: Unify size of avatar, flag and payment components
- 1587905: Update icons to v2.42.0
- d9e00b2: Update Bootstrap to v5.3.0
- bc1d1a3: Set `font-size` of an `i` element with `icon` class in a `button` element
- 0195f9b: Dependencies update
- a5bf5d3: Fix icons in `form-elements.html`
- 736410c: Update Tabler Icons to v3.28.1
- 3f516ea: Fix `rgba` color values in `_variables.scss`
- e91884e: Fix description of alerts with a description
- 90cc744: Fix colors of disabled `.ts-control`
- 1801e41: Center content on error and single page layouts
- 45c83ac: Resolve map page issues
- faee63c: Improve base font family loading
- 5e7e0dd: Introduce Docker Compose Config to build and run Ttabler locally
- c293a66: Fix `@charset` CSS declaration in bundle.
- cb4a681: Update `_navbar.scss` with disabled dropdown menu items color
- af41fb3: Update Tabler Icons to v3.17.0
- 6cbe888: Update `@tabler/icons` to v3.0
- 0e4bf5f: Refactor data structure by converting YAML files to JSON
- 82cf257: Increase `z-index` of `ts-dropdown` to prevent overlapping by buttons
- 4b4b4f6: Adding punctuation to `SECURITY.md`
- a0a2d52: Fix form controls bugs in dark mode
- f45b697: Fix padding in code blocks
- 4de166d: Unified Box Shadows with Bootstrap Compatibility
- 87bf2f5: Remove duplicated setting of color in `th` element
- 5dc45aa: Fix layout of search results for small and medium screens
- 4ae0358: Remove `text-decoration` on hovering `a` element with class having `icon` class
- e798eb6: Fix small typo in tables docs
- 1c1d0c9: Improve documentation for alerts
- 371ef84: Bump `pnpm/action-setup` from 3 to 4
- 8421fc2: Update dependencies
- 0625f5f: Update Tabler Icons to version 2.22 with 18 new icons added
- ba65fc3: Update devDependencies
- a43ded4: Add All Contributions package to project for easy contribution tracking
- 2f622c9: Set value of `$font-family-monospace` as default
- 2c7c448: Refactor Dockerfile and package.json
- 5ec7f05: Resolved light dropdown issue on dark theme
- b0b07b9: Enhance documentation
- 0f129b1: Update Tabler Icons to version 2.19 with 18 new icons added
- 507df7b: Fix cells with inline icons
- 0e5b44a: Fix `color` of disabled `nav-link` in `nav-bordered`
- 65c1300: Fix the `z-index` value of the `nav-tab` inside `card-tab` #1933
- 8552a46: Switch from `npm` to `pnpm` for faster package installation
- 4a9e40d: Increase contrast of active `dropdown-item` in vertical layout
- 17ebdf4: Update documentation for Tabler components
- 4c88481: Add variable to configure `avatar-list` spacing
- df46ee7: Do not display empty `fieldset` element
- 875cafa: Refactor SCSS variables to use `color.adjust` for improved color manipulation
- eb28546: Add Tabler Illustrations
- 650d84c: Update required Node.js version to 18 and add `.nvmrc` file
- fb659d4: Fix table default background color
- f77c712: Avoid SCSS color dependency on `:focus`
- 71c68ce: Update changelog configuration and release scripts
- 34d124d: Update Tabler Icons to v3.26.0
- 4cd9215: Updated Tabler Icons to v3.24.0
- 7bb947b: Update Tabler Icons to version 2.18 with 18 new icons added
- c75cf55: Update Node.js engine requirement to allow versions >=20
- 1c34e8e: Update Tabler Icons to v3.14.0
- 289dd3b: Add Prettier to project for consistent code formatting
- f83e36c: Upgrade Node.js from version 18 to version 20 for improved performance, security, and feature updates.
- b885852: Update Tabler Icons to version 2.25 with 48 new icons added
- 53a5117: Fix responsiveness issue in Settings menu
- 38504e5: Added 3 new payments from Nepal: Esewa, FonePay, Khalti and Imepay
- 35ee14d: Add new Filled section to Icons page
- d32f242: Update `bootstrap` to v5.3.1
- d82f94e: Update package dependencies to latest versions
- 54c5ad0: Fix link to webfont version of Tabler Icons
- 94b83d4: Add support for changeset tool for more efficient and organized code changes
- c51ff28: Fix colors in date range datepicker

## 1.0.0-beta24 - 2025-01-11

- Enhanced documentation.
- Updated illustrations and improved SVG handling in HTML.
- Updated copyright year in LICENSE file to 2025.
- Added marketing pages plugin.

## 1.0.0-beta23 - 2025-01-07

- Documentation improvements.
- Added countup functionality and updated documentation example.
- Do not display empty `<fieldset>`.
- Set font-size of webfont icon inside a button.
- Ordered menu items alphabetically.
- Marked value of `$font-family-monospace` as `!default`.
- Fixed unpkg links to static-files icons.
- Fixed description of alerts with a description.
- Fixed layout of search results for small and medium screens.
- Removed invalid z-index setting for dropdown.
- Fixed IDs of custom size star ratings.
- Removed text-decoration on hover for elements with child icons.
- Fixed link to webfont icons.
- Updated color reference links in UI component documentation.
- Fixed typo in browser support documentation summary.
- Enhanced Figma plugin documentation with detailed usage instructions.
- Added documentation for Tabler Illustrations and updated index with a link.
- Enhanced documentation for various UI and icon sections.
- Added new documentation files for icons and UI components; restructured existing files.
- Updated documentation structure and content for icons and UI components.
- Removed outdated `menu.json` and added `index.mdx` files for UI documentation structure.
- General docs update.
- Increased contrast of active dropdown-item in vertical layout.
- Removed duplicated color setting in table headers.
- Increased `z-index` of `ts-dropdown`.
- Added social icons plugin.
- Described variables for datagrid in docs.
- Fixed multiple documentation issues.
- Removed unused config from the code.
- Fixed links to Tabler Icons.
- Updated dark image.
- Updated screenshot.
- Fixed icon issues.
- Fixed URL in documentation.

## 1.0.0-beta22 - 2025-01-02

- Fixed `@charset` CSS declaration in bundle.
- Fixed cells with inline icons.
- Fixed padding in code blocks.
- Fixed colors in date range datepicker.
- Fixed icon display issues in the Star Ratings component.
- Fixed `z-index` value of the `nav-tab` inside `card-tab`.
- Fixed wrong gray colors.
- Fixed incorrect CDN URL in `webfont.mdx`.
- Ensured border color works in dark mode.
- Replaced `.page-center` with `.my-auto` in single-page layouts.
- Updated Tabler Emails to v2.0.
- Updated Tabler Icons to v3.26.0.
- Updated docs structure.
- Updated `download.mdx`.
- Updated Node.js to version 20.
- Improved base font family.
- Made horizontal rule direction-aware.
- Added new payment providers.
- Read changelog from `CHANGELOG.md` file.
- Initialized VS Code configuration.

## 1.0.0-beta21 - 2024-09-08

- Updated dependencies.
- Updated Tabler Icons to v3.14.0 and the import script.
- Fixed invisible scrollbar in dark mode when navigating the preview.
- Styled `btn-close` specifically for `.modal-header`.
- Added proper borders to the ribbon start class.
- Changed brand color.
- Included `docs` in the `npm` package.
- Added Tabler Illustrations.
- Fixed use of the secondary color in specific form elements.
- Introduced Docker Compose Config for local Tabler builds.
- Allowed usage of `tinymce` v7.x as a peer dependency.
- Updated TinyMCE to v7.0.
- Rebranded Twitter to X.
- Replaced undraw illustrations with Tabler Illustrations.
- Added punctuation to `SECURITY.md`.
- Updated `_navbar.scss` to correct disabled dropdown menu item colors.
- Removed unused packages.
- Fixed map pages.
- Resolved issues with toasts in dark mode.
- Fixed alert background prefix.
- Corrected a typo in CHANGELOG.md.
- Fixed radial chart issue.
- Added documentation on running the site locally in Site README.
- Updated colors in `colors.mdx`.
- Fixed dynamic SCSS prefix in mixins.
- Changed `<h1>` to `<div>` in `navbar-logo.html`.
- Resolved vertical centering on error pages.
- Fixed navbar menu issues.
- Added `background-clip: border-box` to `.dropdown-menu` class.
- Replaced `href="#"` with `href="javascript:void(0)"`.
- Fixed disabled CSS class for links.
- Addressed missing variables and minor color adjustments.
- Improved heights, scrolls, and layouts in Docs examples.
- Fixed flags display in preview.

## 1.0.0-beta20 - 2023-08-24

- Update `bootstrap` to v5.3.1
- Add new `Chat` component
- Add new `Tag` component
- Add customizable Star Ratings component using `star-rating.js` library
- Add new color picker component using `coloris.js` library
- Add `alerts.html` page with example of alerts.
- Add `flags.html` page with list of all flags
- Add Two-Step Verification Pages
- Add variable to configure `avatar-list` spacing
- Unify dark mode with latest Bootstrap API and improve dark mode elements
- Unify Box Shadows with Bootstrap Compatibility
- Avoid SCSS color dependency on `:focus`
- Update CSS class from `text-muted` to `text-secondary` for better Bootstrap compatibility
- Fix text color in dark version of navbar
- Adjusting form element sizes for enhanced mobile devices compatibility
- Resolved light dropdown issue on dark theme
- Update Tabler Icons to version 2.32 with 48 new icons added
- Fix table default background color
- Fix responsiveness issue in Settings menu
- Update required Node.js version to 18 and add `.nvmrc` file
- Add support for changeset tool for more efficient and organized code changes
- `Dockerfile` fix
- Switch from `npm` to `pnpm` for faster package installation

## 1.0.0-beta19 - 2023-05-15

- Add customizable Star Ratings component using `star-rating.js` library (#1571)
- Add new "Filled" section to Icons page (#1574)
- Fix form controls bugs in dark mode (#1573)
- Fix text color in dark version of navbar (#1569)
- Changelog update

## 1.0.0-beta18 - 2023-05-14

- new page: Cookie banner
- Unify dark mode with latest Bootstrap API and improve dark mode elements (#1561)
- Update Tabler Icons to version 2.18 with 18 new icons added (#1560)
- Switch from `npm` to `pnpm` for faster package installation (#1559)
- Add Prettier to project for consistent code formatting (#1558)
- Update required Node.js version to 18 and add `.nvmrc` file (#1555)
- Add All Contributions package to project for easy contribution tracking (#1556)
- Add support for changeset tool for more efficient and organized code changes (#1553)
- Fix bug where `border-1`, `border-2`, etc don't work (#1526)
- Fix indeterminate input background color (#1536)
- Update Bootstrap to `5.3.0-alpha3` (#1543)
- `tom-select` dark mode styling fixes
- Advanced udage of `tom-select` (#1480)
- Fix Dropdown menu in rtl mode (#801)
- Fix `tom-select` dropdown will be shaded in table-responsive (#1409)
- Remove overflow scroll from body
- Fix avatars overlap transparently (#1464)
- Fix TinyMCE dropdown icon list transparent (#1426)
- Dark mode lite colors improvement
- Fix non full width selects (#1392)

## 1.0.0-beta17 - 2023-01-28

- update `bootstrap` to v5.3.0
- update icons to v2.1.2
- add 72 new brands, browsers logos update
- new `Trial ended` page
- new `Page loader` page
- new `Profile` page
- headings fix
- dropdown background color fix
- fix rgba conversion bug
- fix autofill text color, not matching in dark mode
- update license
- header html5 tags
- add input with appended `<kbd>`
- `bootstrap` import fix
- font improvements
- change `$body-color` to CSS variable
- scrollbars improvements
- move `@tabler/icons` to `dev-dependencies`
- fix #1370: avatar stacked list is not stacked anymore

## 1.0.0-beta16 - 2022-11-12

- new `Photogrid` page
- `Steps` component improvements
- fix #1348: Make job listing responsive for smaller devices
- fix #1357: buttons group not active
- fix #1352: fix deprecation warning
- fix #1180: number input with `form-control-sm` looks weird
- fix #1328: color input should show different color for inner check symbol on white ellipse
- fix #1355 - missing font sizes
- update icons to v1.111.0
- homepage navbar fix
- fix #1262 - `.bg-opacity-xx` class is not functioning properly

## 1.0.0-beta15 - 2022-11-01

- new `badges` page
- `<kbd>` styling
- update icons to v1.109.0
- `tom-select` border fix
- exclude `playgrounds` from build
- update jekyll to v4.3.1
- fix: facebook color update
- navbar aria atributes fixes
- fix #808 - `navbar-menu` and `sidebar-menu` has the same `id`
- fix #1335 - missing color variables usage in `alert` and `btn-ghost-*`
- move border style to CSS variables
- add missing forms
- `btn-actions` fixes
- replace `$text-muted` to css variable

## 1.0.0-beta14 - 2022-10-21

- fix active items in dark mode
- update Jekyll to newest version

## 1.0.0-beta13 - 2022-10-18

- update Bootstrap to 5.2.1, update dependencies
- new `tracking` component
- new radio button version of `form-imagecheck`
- update icons to v1.105.0
- dark mode improvements
- corrects the spelling of New Zealand (#1318)
- remove `$border-color-dark`
- fix #1301 - code snippets in docs look bad in dark mode
- fix #1305 - different default link color for dark mode
- fix popover background in dark mode
- fix button default border color
- fix `form-imagecheck` bg in dark mode
- navbar logo fix
- move card ribbons config to variables
- navbar border fix
- dark mode active fix
- using globalThis instead of window (#1315)
- fix #1210 - lastmod not generated for pages in `sitemap.xml`
- fix card border in dark mode
- fix #895 - background color overwrites background image
- fix #1302 - wrong card header in dark mode
- fix #1303 - wrong color when hovering over `selectgroup` in dark mode
- fix #1308 - bad coloring in table in dark mode
- fix #1273 - datepicker background color broken
- fix `$prefix` hard coded `layout/_dark.scss`
- fix #1275 - remove last border-right on progress bar
- fix #1261 - broken offcanvas bg

## 1.0.0-beta12 - 2022-09-19

- new "Job listing" page
- new "Sign in with cover" page
- new "Logs" page
- new `progressbg` component
- add a lot of CSS variables
- add Dockerfile with alpine base
- add icon pulse/tada/rotate animations
- use `:host` in selectors to support Web Components
- use dark table variant colors in dark mode (#1200)
- update Tabler Icons to v1.96
- change `space-y` component
- headings, shadows and borders unify
- toggle TinyMCE dark mode and skin based on the set Tabler theme
- fix `card-footer` background
- fix headers weight
- fix transparent hover background in pagination
- fix dark mode card text color
- fix `--#{$prefix}card-bg` is undefined
- fix global variable for `.card` and `.btn`
- fix code sample in the customize tabler docs
- fix form elements demo page radio buttons
- replace `gulp-minify` with `gulp-terser`

## 1.0.0-beta11 - 2022-08-05

- new `Dropzone` component
- new `Lightbox` component
- new `TinyMCS` component
- new `Inline Player` component
- new `Pricing table` component
- new `Datagrid` component
- new optgroup form examples
- new settings page
- update Tabler Icons to v1.78
- added popover docs page
- fix: #1125 incorrect chart display in the mobile version
- update Bootstrap to 5.2.0

## 1.0.0-beta10 - 2022-04-29

- new `datatable` component
- update Tabler Icons to v1.67
- fix: #1024 - fix Tom-select in dark mode
- new carousel indicators: dots, vertical, thumbs (#1101)
- replace !important modifier with more specific selectors (#1100)
- new `FAQ` page

## 1.0.0-beta9 - 2022-02-26

- fix: #1061 - list group item colors in light and dark modes
- new `tasks` dashboard
- fix: #1059 - upload button in form element in dark view has problem
- fix: #1052 - card background icon is practically invisible
- remove Inter font and use default font system stack
- fix: #1018 - vector map not working
- fix: #1035 - wrong background color of hovered list group items in dark mode
- dependencies update
- add `font-display: swap;` to improve font loading
- new `Boxed` layout

## 1.0.0-beta8 - 2022-02-05

- update dependencies
- new vector maps demos
- fixes update map on resize
- docs improvement
- replace `badge` with `status-dot` in `navbar-notifications.html`
- map tooltip fixes

## 1.0.0-beta7 - 2022-02-05

- fix: #1019 - project-overview.html link not working
- fix: #1010 - card with bottom tabs has incorrect border radius
- uptime monitor mobile fixes
- navbar dark button fix
- `tabler-icons` link
- autoloading webfonts
- cards fixes, new cards demos
- ruby dependencies update
- RTL stylesheet fixes
- new card action demos

## 1.0.0-beta6 - 2022-01-18

- pricing cards fix
- fix bug `fw-...`, `.fs-...` is missed (#987)
- avatar class fix
- fix bug #903 `litepicker` with date range not having correct border
- page wrapper fix
- fix #900 `is-invalid-lite` class is not working under `was-validated` form class
- update `@tabler/icons` to version 1.48
- fix #960 - Badges not honoring font sizes
- fix #959 - `node-sass` does not properly compile nested media queries
- update package dependencies to newest version

## 1.0.0-beta5 - 2021-12-07

**Tabler has finally lived to see dark mode! 🌝🌚**

- **Dark mode enabled!**
- add more cursors (#947)
- fix #892 - media queries need to be nested when negating
- update `@tabler/icons` to newest version
- move optional dependencies to peerDependencies (#924)
- move deployment to Github Actions (#934)
- table border fixes
- antialiased fix
- update `@tabler/icons` to version 1.42
- change default font to 'Inter'
- colors unify
- add `tom-select` and remove `choices.js`

## 1.0.0-beta4 - 2021-10-24

- upgrade required node.js version to 14
- upgrade Bootstrap to 5.1
- upgrade dependencies
- fix #775 - litepicker not initializing
- fix `nouislider` import in dev

## 1.0.0-beta3 - 2021-05-08

- upgrade Bootstrap to 5.0
- upgrade dependencies
- change `$border-radius-pill` variable
- badge vertical align fix

## 1.0.0-beta2 - 2021-03-29

- update dependencies
- `li` marker fix
- page wrapper, nav fixes
- scripts optimize, remove `capture_once`
- `page-body` fixes
- layout navbar fix
- typography fix
- ribbon fix
- charts label fixes
- charts docs

## 1.0.0-beta - 2021-02-17

**Initial beta release of Tabler v1.0! Lots more coming soon though 😁**

- update Bootstrap to 5.0.0-beta2
- update other dependencies.
