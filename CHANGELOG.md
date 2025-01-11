# Changelog

## `1.0.0-beta24` - 2025-01-11

- Enhanced documentation.
- Updated illustrations and improved SVG handling in HTML.
- Updated copyright year in LICENSE file to 2025.
- Added marketing pages plugin.

## `1.0.0-beta23` - 2025-01-07

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

## `1.0.0-beta22` - 2025-01-02

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

## `1.0.0-beta21` - 2024-09-8

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

## `1.0.0-beta20` - 2023-08-24

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


## `1.0.0-beta19` - 2023-05-15

- Add customizable Star Ratings component using `star-rating.js` library (#1571)
- Add new "Filled" section to Icons page (#1574)
- Fix form controls bugs in dark mode (#1573)
- Fix text color in dark version of navbar (#1569)
- Changelog update


## `1.0.0-beta18` - 2023-05-14

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


## `1.0.0-beta17` - 2023-01-28

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


## `1.0.0-beta16` - 2022-11-12

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


## `1.0.0-beta15` - 2022-11-01

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


## `1.0.0-beta14` - 2022-10-21

- fix active items in dark mode
- update Jekyll to newest version


## `1.0.0-beta13` - 2022-10-18

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


## `1.0.0-beta12` - 2022-09-19

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


## `1.0.0-beta11` - 2022-07-05

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


## `1.0.0-beta10` - 2022-04-29

- new `datatable` component
- update Tabler Icons to v1.67
- fix: #1024 - fix Tom-select in dark mode
- new carousel indicators: dots, vertical, thumbs (#1101)
- replace !important modifier with more specific selectors (#1100)
- new `FAQ` page


## `1.0.0-beta9` - 2022-02-26

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


## `1.0.0-beta8` - 2022-02-05

- update dependencies
- new vector maps demos
- fixes update map on resize
- docs improvement
- replace `badge` with `status-dot` in `navbar-notifications.html`
- map tooltip fixes


## `1.0.0-beta7` - 2022-02-05

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


## `1.0.0-beta6` - 2022-01-18

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


## `1.0.0-beta5` - 2021-12-07

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


## `1.0.0-beta4` - 2021-10-24

- upgrade required node.js version to 14
- upgrade Bootstrap to 5.1
- upgrade dependencies
- fix #775 - litepicker not initializing
- fix `nouislider` import in dev


## `1.0.0-beta3` - 2021-05-08

- upgrade Bootstrap to 5.0
- upgrade dependencies
- change `$border-radius-pill` variable
- badge vertical align fix


## `1.0.0-beta2` - 2021-03-29

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


## `1.0.0-beta` - 2021-02-17

**Initial beta release of Tabler v1.0! Lots more coming soon though 😁**

- update Bootstrap to 5.0.0-beta2
- update other dependencies.
