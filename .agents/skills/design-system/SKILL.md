---
name: design-system
description: >-
  Tabler's visual system — the colour, type, spacing, radius, shadow, state
  and motion scales extracted from `core/scss`, plus 24 do/don't rules with
  markup examples. Use whenever a change adds or alters something visible:
  a new component or variant in `core/scss/ui/` or `shared/ui/`, a demo page
  or docs example, a colour or size token, dark-mode styling. Also the
  checklist behind the `design-reviewer` agent. Not for the SCSS module
  mechanics (that is `core-scss`) or page structure (`demo-pages`).
---

# Tabler visual system

The visual language of Tabler, extracted from `core/scss` (last synced with `v2-dev` on 2026-09-08). Every value here is what the framework does today. When a value in this file and the code disagree, the code wins and this file needs a fix — say so in the report.

Use it in two ways:

- **Building** (a new component, variant, page or docs example): pick colours, sizes, radii, shadows and spacing from the tables below. Do not invent a value. If the scale has no fitting step, that is a design decision for the user, not a new literal.
- **Reviewing** (the `design-reviewer` agent, or a PR review): check the change against sections 2–8, then against [rules-of-thumb.md](rules-of-thumb.md), then check whether it touches a known deviation from section 9 (and whether it moves toward the recorded decision).

Section 9 lists where the code contradicts its own rules and what the maintainer decided for each; they are known deviations, not fresh findings. [rules-of-thumb.md](rules-of-thumb.md) holds 24 short do/don't rules with markup examples.

Sources: `core/scss/_variables.scss`, `_variables-dark.scss`, `_settings.scss`, `_props.scss`,
`layout/_root.scss`, `layout/_dark.scss`, `layout/_accessibility.scss`,
`ui/_buttons.scss`, `ui/_icons.scss`, `ui/_type.scss`, `ui/_cards.scss`. The custom-property
pattern itself (tokens on the root rule, the build-time `--tblr-` prefix) is in the `core-scss` skill.

---

## 1. Character

Five sentences that describe the look. Everything in later sections derives from them.

1. **Compact and dense.** 14px body text on a 20px line, 40px controls, 20px card padding.
   Tabler is an admin UI, not a marketing site.
2. **Neutral surfaces, one accent.** The UI is gray on white. The primary blue appears only
   where it carries meaning: links, the active item, the primary action, focus.
3. **Edges come from borders, not shadows.** A 1px translucent border plus a barely visible
   `xs` shadow separates a card from the page. Big shadows are reserved for things that
   float (dropdowns, popovers, modals).
4. **Everything sits on a 4px grid.** Spacing, line heights, control heights and icon sizes
   are all multiples of 4px.
5. **Dark mode is the same design with the tokens flipped.** Every colour is a
   `light-dark()` pair on `:root`; components never know which mode they are in.

---

## 2. Colour

### Palette

| Role | Light | Dark | Source |
| --- | --- | --- | --- |
| Body text | `gray-700` (compiled; the Sass `$body-color` still says `gray-800`) | `gray-200` | `--body-color` |
| Headings | `gray-900` | `white` | `$headings-color` |
| Secondary text | `gray-500` | `gray-400` | `--secondary` |
| Tertiary text / icons | `gray-400` | `gray-400` | `--tertiary`, `--icon-color` |
| Page background | `gray-50` | `gray-900` | `--body-bg` |
| Surface (card, dropdown, modal) | `white` | `gray-800` | `--bg-surface` |
| Surface secondary (badge bg, disabled) | `gray-50` | `gray-900` | `--bg-surface-secondary` |
| Surface tertiary (card cap, table head, striped rows) | `gray-50` | `gray-800` | `--bg-surface-tertiary` |
| Inverted surface (tooltip) | `gray-900` | `gray-100` | `--bg-surface-inverted` |
| Form background | surface | `gray-900` | `--bg-forms` |
| Border | `gray-200` | `gray-700` | `--border-color` |
| Border translucent | `gray-800` @ 11.9% | `rgba(128,150,172,.2)` | `--border-color-translucent` |
| Border active (hover on controls) | `gray-400` | `$dark` +12% | `--border-active-color` |

Gray scale: Tailwind-style `gray-50` … `gray-950` (`#f9fafb` … `#030712`). `$light` is
`gray-50`, `$dark` is `gray-800`.

### Semantic colours

| Name | Value | Used for |
| --- | --- | --- |
| `primary` | `blue #066fd1` | links, active state, primary button, focus, checked inputs |
| `secondary` / `muted` | `gray-500` | secondary text, default badge text |
| `success` | `green #2fb344` | valid state, positive trend |
| `info` | `azure #4299e1` | informational alerts |
| `warning` | `yellow #f59f00` | warnings |
| `danger` | `red #d63939` | errors, invalid state, destructive actions |

Twelve extra hues (`blue azure indigo purple pink red orange yellow lime green teal cyan`),
each with a 100–900 tint/shade ladder (20% steps). Social brand colours are a separate map
and are never used for UI chrome.

### Derived per-colour tokens (generated in `_props.scss`)

For every theme colour `X`: `--X`, `--X-fg` (auto light/dark foreground), `--X-darken`
(hover: 80% colour + 20% transparent), `--X-lt` (10% tint on transparent, used for soft
badges/alerts), `--X-200` (20% tint). `--X-rgb` still exists but is 1.x only: phase 2 of the
migration plan removes it together with every `rgba(var(--X-rgb))` site, so build with
`color-mix()` or `--X-lt` instead.

### Rules

- Components read `--body-color`, `--secondary`, `--bg-surface-*`, `--border-*`. They never
  read a gray directly, except in the token definitions themselves.
- No new hex literal outside `_variables.scss` / `_variables-dark.scss`. The `--card-gradient-*` palettes are the one exception (decision #6).
- Colour carries meaning. A coloured badge, dot or text says success/warning/danger; colour is
  not used to decorate. Categorical colour (mail labels, calendar categories, tags) is the one
  exception: every item in the set gets a colour, as a dot or a soft `-lt` badge, never solid,
  and the state colours are then not reused for categories.
- Links: `--link-color` is primary in light mode, primary tinted 40% white in dark mode (keeps
  4.5:1). Hover shades 20% in light, tints 20% in dark. No underline at rest, underline on hover.
- Text selection: primary at 10% (light) / 40% (dark).
- Backdrops: `gray-800` at 68% opacity with a 4px blur in light mode, black in dark.

---

## 3. Typography

| Token | Value |
| --- | --- |
| Font family | system stack (`system-ui, -apple-system, Segoe UI, Roboto, …`); no web font |
| Monospace | `ui-monospace, SFMono-Regular, Menlo, …` |
| Body size / line | `0.875rem` (14px) / `1.25rem` (20px) |
| Small / large body | `0.765625rem` (12.25px; `0.75rem` in 2.0, decision #4) / `1.09375rem` (17.5px) |
| Weights | 400 body · 500 medium · 600 semibold · 300 display |
| Letter spacing | 0, except `0.04em` from the `subheader()` mixin (`.subheader`, table heads, `.table-mobile` cell labels, `.dropdown-header`, `.datagrid-title`, `.page-pretitle`, `.hr-text`) and on `.badge` (open, deviation #11) |
| Root font size | not set; `rem` follows the user's browser setting (WCAG 1.4.4) |

### Heading scale (size / line, both on the 4px grid)

| | Size | Line | Weight |
| --- | --- | --- | --- |
| h1 | 24px | 32px | 600 |
| h2 | 20px | 28px | 600 |
| h3 | 16px | 24px | 600 |
| h4 | 14px | 20px | 600 |
| h5 | 12px | 16px | 600 |
| h6 | 10px | 16px | 600 |
| display-1 … display-6 | 80 · 72 · 64 · 56 · 48 · 32px | | 300 |

Heading margin-bottom is `--spacer` (8px). Headings and `strong` share the semibold weight.

### Where each weight is used

- **400** body text, lead (lead is body-size in the secondary colour, not larger).
- **500** buttons, form labels, badges, `kbd`, card titles, modal and offcanvas titles, ribbons,
  the chat bubble author, and the active item of a vertical nav, list or step (the active colour
  already carries the state).
- **600** headings, `strong`, navbar brand, alert links.

### Component text sizes

| Element | Size | Weight | Colour |
| --- | --- | --- | --- |
| Card title | h3 (16px) | 500 | heading colour |
| Card subtitle | h4 (14px) when inline | 400 | secondary |
| Modal / offcanvas title | h3 (16px) | 500 | heading colour |
| Page title | h2 (20px / 28px) | headings weight | |
| Form label | h4 (14px), margin-bottom 8px | 500 | body |
| Fieldset legend as a label (`legend.form-label`) | inherits 14px (the reboot's bare `legend` is 24px) | 500 | body |
| Markdown prose (`.markdown`) | h3 (16px), blockquote 16px; content rule says 14px (open, deviation #12) | 400 | body |
| Form hint / feedback | `0.875em`, margin-top 4px | 400 | secondary |
| Tooltip / popover body | small (12.25px) | | |
| Badge | `0.857em` of parent (sm `0.714em`, lg `1em`) | 500 | |
| Sidebar section title | 12px | | |
| Code | `0.857em`, `gray-600` on `gray-100` (dark: `gray-400` on `gray-900`) | | |

---

## 4. Spacing and sizing

### Spacing scale

| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| px | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | 112 | 128 |

Steps 1–6 are the utility classes (`m-*`, `p-*`, `gap-*`); 7–12 exist as `$spacers-extra`.
Note the scale skips 12px: the only 12px values in the framework are component paddings
(`0.75rem`), not utilities.

Two "default spacer" tokens exist and disagree: Sass `$spacer` is `1rem` (16px), CSS
`--spacer` is `var(--spacer-2)` (8px). Decision #2: `--spacer` becomes 16px in 2.0; write `--spacer-2` when you mean 8px.

### Control heights (button = input = select)

Height is line-height + 2 × padding-y + 2px border.

| Size | Padding y / x | Line | Font | Icon | Height | Radius |
| --- | --- | --- | --- | --- | --- | --- |
| sm | 5px / 8px | 16px | h5 12px | 16px | **28px** (32px in 2.0, decision #3) | 4px |
| default | 9px / 16px | 20px | 14px | 20px | **40px** | 6px |
| lg | 11px / 24px | 24px | h3 16px | 24px | **48px** | 8px |
| xl | 11px / 28px | 32px | h1 24px | 32px | **56px** | |

### Other element sizes

| Element | Sizes |
| --- | --- |
| Avatar | xxs 16 · xs 20 · sm 32 · **md 40** · lg 48 · xl 80 · 2xl 112 (px); pill radius |
| Icon | default 20px · `icon-sm`/inline 16px · `icon-md` 40px · `icon-lg` 56px |
| Tag, status | height 24px |
| Checkbox / radio | 20px box, checkbox radius 6px |
| Status dot | 8px; steps dot 8px; counter dot 24px |
| Badge empty dot | 8px |
| Loader | 40px |
| Progress | 8px (sm 4 · lg 12 · xl 16) |
| Close button touch target | at least 24 × 24px |

### Component padding

| Component | Padding |
| --- | --- |
| Card body, card header, list-group item | 20px (`1.25rem`); `.card-sm` 16px, `.card-lg` 32px |
| List or table inside a card | `card-list-group` / `card-table` (own borders and padding; never a bare `list-group-flush` in `card-body p-0`) |
| Card actions gutter | 8px |
| Modal | 24px; footer 12px vertical; header height 56px |
| Alert | 12px / 16px, gap 16px |
| Accordion | 16px / 20px |
| Dropdown item | 8px / 12px; menu min-width 176px; menu padding-y 4px |
| Nav link | 8px / 12px |
| Table cell | 12px / 12px; header row 8px vertical; `table-sm` 4px |
| Toast | 8px / 12px, max 350px |
| Tooltip | 4px / 8px, max 200px |
| Popover | header 8px / 16px, max 276px |
| Pagination link | min-width 32px, gap 4px |
| Empty state | 16px (md 48px), icon 48px |

### Layout chrome

| Token | Value |
| --- | --- |
| Breakpoints | Bootstrap: sm 576 · md 768 · lg 992 · xl 1200 · xxl 1400 |
| Containers | 540 · 720 · 960 · 1140 · 1320; `slim` 256 · `tight` 512 · `narrow` 990 |
| Page padding | 16px, 8px below `lg`; vertical 24px |
| Grid gutter | 16px; card grid gap = page padding |
| Navbar height | 56px |
| Sidebar | 256px, folded 64px, inset 8px, nav padding 12px, icon 24×20 |
| Modal widths | sm 380 · md 540 · lg 720 · xl 1140 (px today, `rem` in 2.0, decision #8) |
| Datagrid item | 240px |

---

## 5. Shape

### Radius scale

| Token | Value | Applied to |
| --- | --- | --- |
| `xs` | 2px | `avatar-xs`, card status corners |
| `sm` | 4px | `btn-sm`, `input-sm`, `pagination-sm` |
| `md` (default) | 6px | buttons, inputs, badges, dropdown, tooltip, tags, pills nav, accordion, toast, kbd, checkbox |
| `lg` | 8px | cards, modals, popovers, `btn-lg`, `input-lg` |
| `xl` / `xxl` | 16px / 32px | utilities only |
| `pill` | 100rem | avatars, pill buttons |

Rule of thumb: **controls 6px, containers 8px, small controls 4px.** A global
`--border-radius-scale` multiplier lets users flatten or round the whole UI at once.

### Borders

- Width 1px; `wide` 2px (nav-bordered active, steps, modal status, progress ring, card status bar, blockquote rule). Components write `var(--border-width)`, not `1px`.
- Colour: `--border-color-translucent` for cards, tables, dropdowns, alerts (blends on any
  background); `--border-color` for navbars, modals headers, list groups, tabs, popovers.
- Hover on a control raises the border to `--border-active-color`.

### Shadows

| Token | Value | Applied to |
| --- | --- | --- |
| `xs` | `0 1px 2px rgba(18,18,23,.05)` | **cards, inputs, buttons** (`--shadow-card`, `--shadow-input`) |
| `sm` | two layers, ≤ 3px | modal on `xs` screens |
| `md` (default `--shadow`) | two layers, ≤ 6px | modals, toasts |
| `lg` | two layers, ≤ 15px | popovers, card hover |
| `xl` / `2xl` | up to 50px | utilities |
| `overlay` | four layers + 1px ring | **dropdowns** |
| `border` | 1px ring only | utility |

Shadow colour is always `rgb(18,18,23)` at 3–25%. Flat surfaces get `xs`; floating
surfaces get `overlay` (dropdown) or `lg`/`md` (popover, modal).

---

## 6. Interaction states

Every interactive component expresses the same five states with the same tokens:

| State | Recipe |
| --- | --- |
| Hover (list, dropdown, table row) | `$hover-bg` (Sass only, no CSS token yet): secondary at 8%; tables still use their own 7.5% recipe until decision #10 lands |
| Hover (button, input) | background unchanged, border to `--border-active-color`; coloured buttons use `--X-darken` |
| Active / selected | `--active-bg`: primary at 4% (dark: `$dark` +2%), text `--primary`, border `--primary` |
| Focus | ring `0 0 0 2px primary` plus `0 0 0 4px primary @ 25%` — `@include focus-ring()` from `mixins/_mixins.scss`; forced-colors: 2px `Highlight` outline |
| Disabled | button opacity 0.4; form-check opacity 0.5; text `--disabled-color` (body @ 40%); bg `--bg-surface-secondary` |

- The `.btn` default is a white surface with a gray border and `xs` shadow; `btn-primary` is
  the only filled button on a normal screen. `btn-ghost` is transparent with a gray hover.
- Coloured buttons: filled `btn-X`, `btn-outline-X` (transparent, coloured border, fills on
  hover), `btn-ghost-X` (no border, tints on hover).
- Nav variants: `pills` (active = `--active-bg` + primary text), `bordered` (2px primary
  underline), `tabs` (surface bg + border), `underline` (2px, emphasis colour), `segmented`
  (tertiary track with an inset 1px translucent ring; active = surface bg + `--border-color`;
  sizes 32 / 40 / 48px, link gap 8px, lg 12px).
- Hover on a list, nav, pagination, action button or select-group item is `$hover-bg`; the
  open state of a `form-help` popover and the checked select-group item are `--active-bg`.
- Pagination active is the one place where a filled primary background is used for a
  selected item.

---

## 7. Motion

| Token | Value |
| --- | --- |
| Base | `all 0.2s ease-in-out` |
| Fade | `opacity 0.15s linear` |
| Collapse | `height 0.35s ease` |
| Modal | `transform 0.3s ease-out`, slides down 16px; static backdrop scales 1.02 |
| Progress bar | `width 0.6s ease` |
| Reveal on hover (`$transition-time`) | `0.3s` — list-group item actions, card options, switch-icon fade/scale/flip; an opacity fade, not a colour change |
| Icon animations | pulse 2s, tada 3s, rotate 3s (`.icon-*`); `.btn-animate-icon-*` pulse/shake/tada 0.9s once on hover |
| Everything else | `$transition-time` 0.3s or `0.15s`; no other durations in `core/scss/ui` |

`prefers-reduced-motion`: decorative loops (blink, pulse, tada, rotate, animated gradient,
waves) are removed; loaders and indeterminate progress keep animating but at 3s so state is
still visible.

---

## 8. Icons

- Tabler Icons, outline. Stroke follows size: `1.5` up to 24px (`icon-sm`, default, inline), `1` from 40px (`icon-md`, `icon-lg`). Intended, decision #9.
- Default colour `gray-400` (`--icon-color`); inside a button the icon inherits text colour.
- Inline icon: 16px, `vertical-align: -0.2rem`.
- In a button the icon is `--btn-icon-size` with a gap of half the horizontal padding and a
  negative outer margin of a quarter.
- Nav-link icons are the link colour at 50%, 80% on hover.
- Filled variant only via `.icon-filled`.

---

## 9. Known deviations and their decisions

Places where the code contradicts its own rules, found on 2026-09-08 and decided by the maintainer the same day. Until a row's fix has landed, a review that touches it reports "known deviation #n (decision: …)", not a new finding, and says whether the change moves toward or away from the decision. When a fix lands, delete the row and update the value in the section it belongs to. Every "fix in 2.0" that changes the value behind an existing class is a value remap under the 2.0 policy: it needs an entry in `BOOTSTRAP-V6-MIGRATION.md` section 5 and an upgrade-guide line. Breakpoints, the spacing scale and the avatar/steps/progress sizes above are the 1.x values; migration questions 4 and 10 and phase 9 may change them, and then this file follows the code.

| # | Finding | Where | Decision | Status |
| --- | --- | --- | --- | --- |
| 1 | `$min-contrast-ratio: 2` picks the auto foreground (`--X-fg`); white on `yellow`, `lime`, `azure` fails WCAG 4.5:1. | `_settings.scss` | **Keep for now.** Decided together with the high-contrast theme, PR #2895. | open, waits for #2895 |
| 2 | Sass `$spacer` = 16px but CSS `--spacer` = 8px. Headings use the 8px one, `card-img-overlay` and popover header use the 16px one. | `_variables.scss:341`, `layout/_root.scss` | **Fix in 2.0.** `--spacer` becomes 16px, equal to `$spacer`; headings get an explicit `--spacer-2`. Remap of the shipped `--tblr-spacer`: section 5 entry + upgrade guide. | planned 2.0 |
| 3 | Small-element heights do not share a ladder: `btn-sm` 28 · `avatar-sm` 32 · tag/status 24. | buttons, inputs, avatars | **Fix in 2.0.** `btn-sm` (and with it `form-control-sm`, `form-select-sm`) goes to 32px: `$input-btn-padding-y-sm` 5px → 7px. The ladder becomes 24 / 32 / 40 / 48 / 56. Section 5 entry + upgrade guide. | planned 2.0 |
| 4 | `$font-size-sm` is 12.25px, off the pixel grid; `h5` is 12px. | `_variables.scss:403` | **Fix in 2.0.** `$font-size-sm: 0.75rem`. Tooltips and popovers drop a quarter pixel. Short section 5 entry. | planned 2.0 |
| 5 | Two focus indicators: the ring everywhere, but `outline: 2px solid var(--primary)` on `.btn-action:focus-visible` (`_buttons.scss`), `.date-item:focus-visible` (`_calendars.scss`) and `.switch-icon:focus-visible` (`_switch-icon.scss`). | buttons, calendars, switch-icon | **Fix.** All three go through `@include focus-ring()`; added to the scope of issue #2972. | tracked, #2972 |
| 6 | Hex literals outside the variable files: `--card-gradient-*`, `.card-cover` `#666`, `.card-note` `#fff7dd/#fff1c9`, calendar `#66758c` and `#fefeff`. | `ui/_cards.scss`, `ui/_calendars.scss` | **Fix, with one exception.** `.card-note`, `.card-cover` and the calendar get `light-dark()` tokens. The gradients stay literal: they are artwork, nobody rethemes them. | planned, no remap |
| 7 | `$dropdown-header-color: $gray-600` and the `$dropdown-dark-*` family are not `light-dark()` pairs. | `_variables.scss` | **Fix in 2.0.** Header colour → `--secondary`. The `$dropdown-dark-*` Sass variables go; `.dropdown-menu-dark` keeps emitting through the dropdown tokens (v5 class, section 5 question 8). | planned 2.0 |
| 8 | Tooltip 200px, popover 276px, modals 380/540/720/1140px and toast 350px are the only pixel widths. | `_variables.scss` | **Fix in 2.0.** Move to `rem` (12.5 · 17.25 · 23.75/33.75/45/71.25 · 21.875rem) so overlays scale with the user's font size. Section 5 entry. | planned 2.0 |
| 9 | `icon-md` 40px and `icon-lg` 56px drop the stroke to 1; `icon-sm` keeps 1.5. | `ui/_icons.scss` | **Intended.** Rule: stroke 1.5 up to 24px, stroke 1 from 40px. Recorded in section 8. | closed, exception |
| 10 | Table hover uses `--emphasis-color` at 7.5% while every other hover uses `$hover-bg` (`--secondary` at 8%). | `_variables.scss` table block | **Fix in 2.0.** `$table-hover-bg: $hover-bg`. Short section 5 entry. | planned 2.0 |
| 11 | `.badge` tracks `letter-spacing: 0.04em`; rule 4 allows tracking only through the `subheader()` mixin. | `ui/_badges.scss` | **Open.** Either the badge loses its tracking or rule 4 lists the badge as the second tracked element. | needs decision |
| 12 | `.markdown` prose is 16px (`$markdown-font-size: var(--font-size-h3)`); rule 1 says content text is 14px. | `ui/_markdown.scss` | **Open.** Either prose drops to `--body-font-size` or section 3 records long-form prose as the exception. | needs decision |
| 13 | Demo pages nest example cards inside a section card (`SectionCard` > `SectionCardBody` > `Card`), and `cards.astro` documents "Cards inside card"; rule 12 forbids a card in a card body. | `preview/pages/cards.astro` and every `SectionCard` page | **Open.** Either rule 12 exempts the demo section wrapper (and the "cards inside card" demo goes), or the section pages switch to headings without a wrapping card. | needs decision |
| 14 | `badge-outline` is forbidden by `.agents/rules/main.mdc` but shipped by `core/scss/ui/_badges.scss` and shown as the "Outline" demo on `badges.astro`. | `_badges.scss`, `badges.astro`, `job-listing.astro` | **Open.** Either the class is removed in 2.0 (deprecate, section 5 entry) or the rule in `main.mdc` goes. | needs decision |
| 15 | Brand colour as UI chrome: the sponsor heart is `text-pink` inside `.btn` (`NavbarSide.astro`, `Sponsor.astro`), the favourite star is `text-yellow` inside `.btn-action` (`ProfileContact.astro`), the marketing footer uses filled `btn-facebook` / `btn-x` / `btn-instagram` / `btn-linkedin`, and `SmallStats color="facebook"` fills a stat avatar. Rule 21 and section 2 forbid both. | `shared/components/**`, `shared/layouts/MarketingLayout.astro` | **Open.** Either these become recorded brand exceptions (sponsor heart, social follow buttons) or the icons inherit and the footer uses plain `btn btn-icon`. | needs decision |
| 16 | Scroll containers carry an inline height: `ActivityCard` `height: 28rem`, `UsersListHeaders` `max-height: 35rem`, `NavbarSideApps` `max-height: 50vh`. Rule 18 forbids inline sizes, but nothing in `core/scss` names a scroll-container height; dropping the height on `ActivityCard` makes the homepage column run about 2000px past its neighbour. | `shared/components/cards/ActivityCard.astro`, `UsersListHeaders.astro`, `navbar/NavbarSideApps.astro` | **Open.** Needs a class or a `--card-body-scrollable-height` token on `.card-body-scrollable` in core; until then the three inline heights stay. | needs decision |

---

## 10. What a review checks (summary)

1. Colours, radii, shadows, spacing and font sizes come from the tables above. No new literal.
2. A component declares its tokens on its root rule — on `v2-dev` through its `$<component>-tokens`
   map and the `tokens()` mixin — and reads them below; modifiers change tokens, not properties
   (the mechanics are in `core-scss`).
3. Every new colour token is a `light-dark()` pair on `:root` in `layout/_root.scss`.
4. Controls are 40px tall by default, 6px radius, `xs` shadow, gray border; only the primary
   action is filled.
5. Hover, active, focus and disabled use the five recipes in section 6, nothing bespoke.
6. Flat surfaces: 1px translucent border + `xs` shadow. Floating surfaces: `overlay` / `lg`.
7. Everything on the 4px grid; heights from the control ladder; text from the heading scale.
8. Colour means state. Decorative colour lives only in explicitly decorative components
   (card gradients, illustrations).
9. Icons: outline, 1.5 stroke, 20px, inherit colour in buttons, `gray-400` elsewhere.
10. Motion: 0.15–0.35s, and every decorative animation has a reduced-motion fallback.

The long form of these, with examples, is [rules-of-thumb.md](rules-of-thumb.md).
