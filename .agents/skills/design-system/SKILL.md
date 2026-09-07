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
- **Reviewing** (the `design-reviewer` agent, or a PR review): check the change against sections 2–8, then against [rules-of-thumb.md](rules-of-thumb.md), then check whether it touches a known deviation from section 9.

Section 9 lists where the code contradicts its own rules; those are open decisions, not fresh findings. [rules-of-thumb.md](rules-of-thumb.md) holds 24 short do/don't rules with markup examples.

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
- No new hex literal outside `_variables.scss` / `_variables-dark.scss`.
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
| Small / large body | `0.765625rem` (12.25px) / `1.09375rem` (17.5px) |
| Weights | 400 body · 500 medium · 600 semibold · 300 display |
| Letter spacing | 0 |
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
- **500** buttons, form labels, badges, `kbd`, card titles.
- **600** headings, `strong`, navbar brand, alert links.

### Component text sizes

| Element | Size | Weight | Colour |
| --- | --- | --- | --- |
| Card title | h3 (16px) | 500 | heading colour |
| Card subtitle | h4 (14px) when inline | 400 | secondary |
| Page title | h2 (20px / 28px) | headings weight | |
| Form label | h4 (14px), margin-bottom 8px | 500 | body |
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
`--spacer` is `var(--spacer-2)` (8px). See section 9.

### Control heights (button = input = select)

Height is line-height + 2 × padding-y + 2px border.

| Size | Padding y / x | Line | Font | Icon | Height | Radius |
| --- | --- | --- | --- | --- | --- | --- |
| sm | 5px / 8px | 16px | h5 12px | 16px | **28px** | 4px |
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
| Modal widths | sm 380 · md 540 · lg 720 · xl 1140 |
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

- Width 1px; `wide` 2px (nav-bordered active, steps, modal status, progress ring).
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
| Hover (list, dropdown, table row) | `$hover-bg` (Sass only, no CSS token yet): secondary at 8% |
| Hover (button, input) | background unchanged, border to `--border-active-color`; coloured buttons use `--X-darken` |
| Active / selected | `--active-bg`: primary at 4% (dark: `$dark` +2%), text `--primary`, border `--primary` |
| Focus | ring `0 0 0 2px primary` plus `0 0 0 4px primary @ 25%` — `@include focus-ring()` from `mixins/_mixins.scss`; forced-colors: 2px `Highlight` outline |
| Disabled | button opacity 0.4; form-check opacity 0.5; text `--disabled-color` (body @ 40%); bg `--bg-surface-secondary` |

- The `.btn` default is a white surface with a gray border and `xs` shadow; `btn-primary` is
  the only filled button on a normal screen. `btn-ghost` is transparent with a gray hover.
- Coloured buttons: filled `btn-X`, `btn-outline-X` (transparent, coloured border, fills on
  hover), `btn-ghost-X` (no border, tints on hover).
- Nav variants: `pills` (active = `--active-bg` + primary text), `bordered` (2px primary
  underline), `tabs` (surface bg + border), `underline` (2px, emphasis colour).
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
| Reveal on hover (`$transition-time`) | `0.3s` — list-group item actions, card options; an opacity fade, not a colour change |
| Icon animations | pulse 2s, tada 3s, rotate 3s |

`prefers-reduced-motion`: decorative loops (blink, pulse, tada, rotate, animated gradient,
waves) are removed; loaders and indeterminate progress keep animating but at 3s so state is
still visible.

---

## 8. Icons

- Tabler Icons, outline, `stroke-width: 1.5` at 20px and 16px; `1` at 40px and 56px.
- Default colour `gray-400` (`--icon-color`); inside a button the icon inherits text colour.
- Inline icon: 16px, `vertical-align: -0.2rem`.
- In a button the icon is `--btn-icon-size` with a gap of half the horizontal padding and a
  negative outer margin of a quarter.
- Nav-link icons are the link colour at 50%, 80% on hover.
- Filled variant only via `.icon-filled`.

---

## 9. Known deviations (open decisions)

Places where the code contradicts its own rules. Each needs a decision from the maintainer: **keep as exception**, **fix**, or **drop the rule**. A review that touches one of these reports it as "known deviation #n", not as a new finding. When one is decided, move it out of this table into the rule it belongs to. A fix that changes the value behind an existing class (#2, #3, #4) is a value remap under the 2.0 policy: it needs an entry in `BOOTSTRAP-V6-MIGRATION.md` section 5 and an upgrade-guide line, not just a PR. Breakpoints, the spacing scale and the avatar/steps/progress sizes above are the 1.x values; migration questions 4 and 10 and phase 9 may change them, and then this file follows the code.

| # | Finding | Where | Suggested call |
| --- | --- | --- | --- |
| 1 | `$min-contrast-ratio: 2` picks the auto foreground (`--X-fg`); white on `yellow`, `lime`, `azure` fails WCAG 4.5:1. | `_settings.scss` | Decide with PR #2895 (high-contrast theme). Document as known until then. |
| 2 | Sass `$spacer` = 16px but CSS `--spacer` = 8px. Headings use the 8px one, `card-img-overlay` and popover header use the 16px one. | `_variables.scss:341`, `layout/_root.scss` | Pick one; probably rename the CSS token or alias both. |
| 3 | Small-element heights do not share a ladder: `btn-sm` 28 · `avatar-sm` 32 · tag/status 24 · `avatar-xs` 20. A `btn-sm` next to an `avatar-sm` is 4px shorter. | buttons, avatars, tags | Confirm the intended ladder (24 / 28 / 32 / 40 / 48) or align `btn-sm` to 32. |
| 4 | `$font-size-sm` is 12.25px, off the pixel grid; `h5` is 12px. Tooltips and popovers use the 12.25px one. | `_variables.scss:403` | Set `$font-size-sm: 0.75rem`. |
| 5 | Two focus indicators: the ring (`box-shadow`) everywhere, but `outline: 2px solid var(--primary)` in `_buttons.scss:294` and `_calendars.scss:73`. | buttons, calendars | Use the ring, or document `outline` as the rule for non-box elements. |
| 6 | Hex literals outside the variable files: decorative `--card-gradient-*` palettes, `.card-cover` fallback `#666`, `.card-note` `#fff7dd/#fff1c9`, calendar `#66758c` and `#fefeff`. | `ui/_cards.scss`, `ui/_calendars.scss` | Gradients: exception (brand art). `.card-note`, `.card-cover` and calendar: move to tokens with dark pairs. |
| 7 | `$dropdown-header-color: $gray-600` and the whole `dropdown-dark-*` family are not `light-dark()` pairs. | `_variables.scss` | Move to `--secondary` / tokens; drop the `$dropdown-dark-*` Sass variables in 2.0 but keep `.dropdown-menu-dark` emitting (v5 class, migration plan section 5 question 8). |
| 8 | Tooltip max 200px, popover max 276px, modal widths and toast 350px are the only pixel-defined widths; everything else is `rem`. | `_variables.scss` | Keep (Bootstrap heritage), note as exception. |
| 9 | Icon sizes `md` 40px and `lg` 56px reuse the avatar/control ladder but drop stroke to 1; `icon-sm` keeps 1.5. No `icon-xl`. | `ui/_icons.scss` | Confirm as intended. |
| 10 | Table `hover-bg` uses `--emphasis-color` at 7.5% while every other hover uses `--secondary` at 8%. | `_variables.scss` table block | Align to `--hover-bg`. |

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
