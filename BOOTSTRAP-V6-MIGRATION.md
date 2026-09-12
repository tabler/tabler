# Bootstrap v5 → v6: analysis and a phased plan for Tabler 2.0

**Status:** analysis, decisions and task board. Nothing implemented yet beyond the Floating UI branch.

**Source of truth:** local Bootstrap checkout at `~/htdocs/bootstrap`, branch `v6-dev`
(`6.0.0-alpha1`, 495 commits ahead of `main`/5.3.8, work from 2025-08-26 to 2026-07-22).
Primary reference: `site/src/content/docs/guides/migration.mdx` (539 lines).
Upstream also ships `skills/bootstrap-v5-v6-migration`, a phase-by-phase migration skill for
coding agents — worth reading as a ready-made checklist.

Diff size: `scss/` 150 files, +11 585 / −8 889. `js/src/` 36 files, +6 208 / −2 149.

Tabler's exposure: `core/scss/bootstrap/` holds ~5 000 lines of vendored upstream Sass and
`core/js/src/bootstrap/` ~4 900 lines of a vendored TypeScript port of the v5 plugins.

---

## 1. What actually changed upstream

### 1.1 Class naming moved from infix to prefix

Every responsive and state class now uses a Tailwind-style `prefix:class` pattern.

| v5 | v6 |
| --- | --- |
| `.col-md-6` | `.md:col-6` |
| `.d-md-none` | `.md:d-none` |
| `.navbar-expand-md` | `.md:navbar-expand` |
| `.offset-md-2`, `.g-md-3` | `.md:offset-2`, `.md:g-3` |
| `.container-sm` | `.sm:container` |
| `.table-responsive-md` | `.md:table-responsive` |
| `.list-group-horizontal-md` | `.md:list-group-horizontal` |
| `.sticky-md-top` | `.md:sticky-top` |
| `.opacity-50-hover:hover` | `.hover:opacity-50` |
| `.d-print-none` | `.print:d-none` |
| `.dialog-fullscreen-sm-down` | `.sm-down:dialog-fullscreen` |

In Sass, `breakpoint-infix()` became `breakpoint-prefix()` and returns `"md\:"`;
`loop-breakpoints-up` / `loop-breakpoints-down` expose `$prefix` instead of `$infix`.

Breakpoints themselves moved: `lg` 992 → 1024, `xl` 1200 → 1280, `xxl` renamed to `2xl` and
1400 → 1536. Containers: `xl` 1140 → 1200, `2xl` 1320 → 1440. `$grid-breakpoints` → `$breakpoints`.

### 1.2 Sass architecture

- `_variables.scss`, `_variables-dark.scss` and `_maps.scss` are gone. New files: `_config.scss`
  (all variables), `_colors.scss`, `_theme.scss`, and a rewritten `_root.scss`.
- CSS cascade layers declared in `_root.scss` and applied across every partial. Upstream hit the
  same limitation we did: Sass will not allow `@use`/`@forward` inside `@layer`.
- `$prefix` was removed from Sass. Custom properties are authored unprefixed and prefixed at build
  time by `postcss-prefix-custom-properties` — the same approach Tabler already shipped in 1.5
  (`.build/build-css.ts`).
- Node Sass support dropped. RFS removed entirely (`scss/vendor/_rfs.scss` deleted); responsive
  type now uses `clamp()`.
- New directory grouping with `index.scss` per group: `scss/layout/`, `scss/content/`,
  `scss/buttons/`, `scss/forms/`, `scss/mixins/`, `scss/helpers/`.
- All `$*-focus-box-shadow` variables removed in favour of one `focus-ring()` mixin driven by
  `--focus-ring*` custom properties.
- `$enable-dark-mode` removed — dark mode is always compiled, switched at runtime via `data-bs-theme`.

### 1.3 Colour system

- Every colour variable is `oklch()`; tint/shade scales are generated with `color-mix(in lab, …)`
  in the compiled CSS.
- **All `--*-rgb` custom properties and `rgba()` patterns are gone.** This is a hard browser
  requirement on `oklch()` and `color-mix()`.
- A `.theme-*` class sets `--theme-bg`, `--theme-fg`, `--theme-border`, `--theme-contrast` and
  components only read those tokens. Per-colour component classes are replaced by composition:
  - `.btn-primary` → `.btn-solid .theme-primary`
  - `.btn-outline-primary` → `.btn-outline .theme-primary`
  - `.badge.bg-primary` → `.badge-subtle .theme-primary`
  - the same for alerts, tables, cards, accordions and pagination
- New button variants: `.btn-solid`, `.btn-outline`, `.btn-subtle`, `.btn-text`, `.btn-styled`,
  `.btn-icon`, plus a `.btn-xs` size. Buttons and inputs share `--btn-input-*` sizing tokens.

### 1.4 Components rebuilt on native browser APIs

This is the substantive part of the release, not the renames.

- **Modal → Dialog** on the native `<dialog>` element with `showModal()`/`show()`/`close()`.
  The `.modal-dialog` / `.modal-content` wrappers and the `.modal-backdrop` element are gone
  (`::backdrop` instead), and with them the internal `util/backdrop`, `util/focustrap` and
  `util/scrollbar` helpers — the browser supplies the backdrop, the focus trap and the inert top
  layer. Scroll lock is `:root.dialog-open` plus `scrollbar-gutter: stable`.
- **Offcanvas → Drawer**, sharing a `DialogBase` class with Dialog, plus swipe-to-dismiss and a
  `.drawer-sheet` variant.
- **Responsive navbar uses Drawer, not Collapse.** The toggler targets a `<dialog class="drawer">`.
  `.navbar-light` / `.navbar-dark` removed.
- **Accordion on `<details>`/`<summary>`**, no JavaScript for open/close. Exclusive groups use the
  HTML `name` attribute instead of `data-bs-parent`. `.accordion-button` and `.accordion-collapse`
  are gone.
- **Carousel on CSS scroll snap.** No more `float` + `translateX` or a custom swipe handler. New
  multi-slide, peek, gap and centre modes. `ride` → `autoplay` (boolean, opt-in), `wrap` →
  `ends: loop|wrap|stop`. Removed `.carousel-caption`, `.carousel-dark`, `.carousel-control-prev/next`
  and the transitional `.carousel-item-*` classes.
- **Dropdown → Menu.** `.dropdown-menu` → `.menu`, `.dropdown-item` → `.menu-item`,
  `data-bs-toggle="dropdown"` → `"menu"`, events `*.bs.dropdown` → `*.bs.menu`. The `.dropdown`
  wrapper and `.dropdown-toggle` class are gone and markup flattens from `<ul><li><a>` to
  `<div class="menu"><a class="menu-item">`. Direction comes from `data-bs-placement`.
- Icons (close button, navbar toggler, breadcrumb divider, carousel controls, checkbox marks) are
  drawn with `mask-image` tinted by `currentcolor` instead of embedded SVG or filters.
  `.btn-close-white` and `$btn-close-white-filter` removed.
- `.card-group` and `.*:list-group-horizontal` switched from media queries to **container queries** —
  without a query container (e.g. `.contains-inline`) on a parent they stay stacked.

### 1.5 JavaScript

- **ESM only.** No UMD bundles, no `window.bootstrap` global; `<script type="module">` is required.
  Data attribute APIs are unchanged.
- **Popper replaced by Floating UI** (`@floating-ui/dom`, a peer dependency). The `popperConfig`
  option is now `floatingConfig`.
- **Vanilla Calendar Pro** added as a peer dependency for the new Datepicker.
- ScrollSpy rewritten on `IntersectionObserver` with an activation line (`topMargin`, default `12%`);
  the deprecated `offset` and `method` options are gone.
- New plugins: `Menu`, `Dialog`, `Drawer`, `Combobox`, `Chips`, `OtpInput`, `Strength`, `Range`,
  `Toggler`, `Datepicker`, `NavOverflow`.

### 1.6 Utilities — the quiet breakage

Class names survive but their values change, so old markup compiles and silently looks wrong.

- `$spacers` grew from 0–5 to 0–9 and **remapped**: v5 `3` (1rem) is v6 `4`; v5 `4` (1.5rem) is v6 `6`;
  v5 `5` (3rem) is v6 `9`.
- `.rounded-N` regenerated from a numeric `$radii` map (`--radius-0`…`--radius-9`); v5 `.rounded-1`
  is roughly v6 `.rounded-3`, v5 `.rounded-4` is v6 `.rounded-8`.
- `.fs-1`…`.fs-6` replaced by ascending t-shirt sizes `.fs-xs`…`.fs-6xl`; `.lh-base` → `.lh-md`;
  `.display-1`…`.display-6` and `.lead` removed with no single-class replacement.
- `.text-*` colour utilities → `.fg-*`; `.text-bg-*`, `.bg-light`, `.bg-dark` and `.bg-body-*`
  removed in favour of a neutral `.bg-1`…`.bg-4` scale; `.text-reset` → `.fg-reset`.
- `.mh-*` / `.mw-*` → `.max-h-*` / `.max-w-*`; new `.min-h-*` / `.min-w-*`.
- Negative margins reduced to `.ms--1`, `.ms--2`, `.me--1`, `.me--2`.
- Spacing and border utilities now emit **logical properties** (`margin-block-start`,
  `padding-inline-start`, `border-inline-end`) with unchanged class names.
- Layered, themeable shadows: `.shadow-xs`…`.shadow-xl`, `.shadow-{color}`, `.shadow-opacity-*`.
- `link-*` utilities folded into `underline-*`.
- New `.contains-inline` / `.contains-size` container-query utilities, `.grid-cols-*`,
  `.place-items`, `.justify-items`, `.border-keyline` (0.5px).

### 1.7 Forms

- **`.form-select` removed** — use `.form-control` on `<select>`.
- `_form-check.scss` split into `_checkbox`/`_radio`/`_switch`; `.check` goes directly on the
  `<input>` with no wrapper. `.btn-check` moves to the `<label>` with a nested input, using `:has()`
  instead of `id`/`for` pairs.
- Validation rewritten: no `.was-validated`, no bare `:valid`/`:invalid`. Opt in with
  `data-bs-validate` on the `<form>` and style `:user-invalid`. `$enable-validation-icons` and all
  background validation icons removed. `$form-validation-states` → `$validation-states`.
- `.form-range` becomes a wrapper; the input takes `.form-range-input` and the component is
  JavaScript-driven.
- New `.form-field` / `.form-group` grid layout primitive (label + control + help + feedback).
  Input groups lose `flex-wrap` and `.has-validation`.

### 1.8 Bootstrap moved onto Tabler's turf

v6 adds components Tabler already ships under the same names: **avatar** (`core/scss/ui/_avatars.scss`),
**chip** (`_chips.scss`), **stepper** (Tabler's `_steps.scss`), plus progress and status work.
It also adds ones Tabler does not have: **otp-input**, **datepicker**, **combobox**, **prose**,
**form-adorn**, **password strength**, **nav-overflow**, **form-field**.

The class names collide while the APIs and tokens do not. Before 2.0 we have to decide, per
component, whose definition of `.avatar`, `.chip` and `.stepper` wins.

---

## 2. Fit with the agreed 2.0 direction

The decision on record for 2.0 is: our own core, **v5 class names with v6 architecture**, no
wholesale port of v6. Against that, the upstream diff splits fairly cleanly.

**Take:**
`_config` / `_colors` / `_theme` / `_root` split with the `defaults()` + `tokens()` pattern ·
cascade layers · PostCSS prefixing (already shipped in 1.5) · one `focus-ring()` mixin ·
logical properties · native `<dialog>` and `<details>` (removes JavaScript and fixes several
findings from our a11y audit) · Floating UI (already in progress on
`migrate-popper-to-floating-ui`) · the `$radii` scale · scroll-snap carousel ·
the `md:` prefix syntax (decided 2026-09-10, phase 8).

**Skip or defer:**
the `modal`→`dialog`, `offcanvas`→`drawer`, `dropdown`→`menu` renames
(take the implementations, keep the v5 names) · the `$spacers` and `.rounded-*` remapping ·
`.text-*` → `.fg-*`.

**Cannot be taken halfway:**
`oklch()` + `color-mix()` and the death of `--*-rgb` — they are the foundation of the `.theme-*`
system and every colour variant, so adopting the v6 token architecture means adopting the browser
requirement too. Same for ESM-only JavaScript.

---

## 3. Phased migration plan

Phases are ordered by dependency. **All 2.0 work targets the long-lived `v2-dev` branch** (already on
origin); each phase lands as its own feature branch cut from `v2-dev` and merged back by PR, never
into `dev`, which is frozen for 1.x. Every phase that
claims to be output-neutral must be proved with the `html-diff` harness; every phase that changes
class emission must go through `check-markup-classes`.

### Phase 0 — Decisions and prerequisites

No code. Settle the things that later phases cannot proceed without.

- Browser baseline: `oklch()` and `color-mix()` are in. Phases 2 and 3 can start.
- Distribution: ESM only, the UMD `tabler.js` bundle is dropped. Phase 5 can start.
- Class-name policy: confirm v5 names stay, and write down the exceptions we are willing to make.
- Component namespace policy for `.avatar` / `.chip` / `.stepper`: unify with upstream (see phase 9).
- Read `~/htdocs/bootstrap/skills/bootstrap-v5-v6-migration/SKILL.md` and lift anything reusable
  into our own migration notes.

**Deliverable:** a short decision record; 2.0 upgrade guide skeleton in `UPGRADE.md`; this document
committed on `v2-dev` (it currently sits there untracked).

### Phase 1 — Sass module architecture

Restructure without changing a single byte of compiled CSS.

- Split `core/scss/_variables.scss`, `_variables-dark.scss` and `_maps.scss` into `_config.scss`,
  `_colors.scss`, `_theme.scss`, reworking `_props.scss` / `_root` accordingly.
- Add `index.scss` per directory (`ui/`, `forms/`, `mixins/`, `helpers/`, `layout/`) and route
  `tabler.scss` through them.
- Introduce the `defaults()` + `tokens()` pattern so compile-time and runtime overrides are one
  mechanism.
- Keep `@layer` out of this phase — it lands in phase 3b, after the byte-diff-gated phases.

**Files:** `core/scss/_variables.scss`, `_variables-dark.scss`, `_maps.scss`, `_config.scss`,
`_props.scss`, `_settings.scss`, `_core.scss`, `tabler.scss`.
**Gate:** `html-diff` must show zero diff; byte-diff of `core/dist/css/tabler.css`.
**Risk:** low mechanically, high in volume. This is the phase where `@use … as *` writing back to
config bites, per the existing SCSS module notes.

### Phase 2 — Colour system on oklch and theme tokens

The point of no return for browser support, and we take it. The 2.0 browser baseline is whatever
supports `oklch()` and `color-mix()`; write that baseline into the upgrade guide.

- Convert colour variables to `oklch()`; generate tint/shade with `color-mix(in lab, …)`.
- Introduce `--theme-bg` / `--theme-fg` / `--theme-border` / `--theme-contrast` and a `.theme-*`
  class family.
- Remove `--tblr-*-rgb` and every `rgba(var(--tblr-*-rgb), …)` call site.
- Decide whether Tabler's colour variants keep emitting `.btn-primary` etc. as thin compositions
  over `.theme-primary`, so v5 markup keeps working.

**Files:** `core/scss/_colors.scss` (new), `_theme.scss` (new), `_props.scss`, all of
`core/scss/ui/**` that uses `-rgb`.
**Gate:** contrast gate from the a11y work; visual review of dark mode; `html-diff` will legitimately
differ here, so review it by hand.
**Risk:** high. The earlier standalone `light-dark()` / `color-mix()` attempt (issue #2720, branch
`dev-scss-light-dark`) is abandoned; this phase supersedes it, so reuse its lessons (cascade order
of `color-scheme`, the token-dump verification harness) but not its code.

### Phase 3 — Token scales

- Adopt the numeric `$radii` map and `--radius-0`…`--radius-9`, keeping `.rounded-*` mapped to the
  v5 values so existing markup does not shift.
- Decide on `$spacers`: adopting the v6 0–9 scale silently changes every `.p-3` / `.m-4` in every
  Tabler template. Recommendation: keep the v5 scale, add finer steps at new keys.
- Replace all `$*-focus-box-shadow` with one `focus-ring()` mixin over `--focus-ring*` tokens.
  Done (#2972). Step 1: `focus-ring()` is the one implementation and every focus consumer calls it;
  the `$*-focus-box-shadow` variables stay as `!default` aliases; CSS byte-identical. Step 2: `:root`
  emits `--focus-ring-inner-width` and `--focus-ring-box-shadow`, the mixin reads the token so the
  ring retunes at runtime and per theme, and the `.focus-ring` helper stops referencing the phantom
  `--focus-ring-x/-y/-blur`; the Step 2 CSS diff is limited to focus declarations and the `:root`
  tokens. Tabler keeps the two-layer `box-shadow` look, not v6's `outline`, and the `forced-colors`
  fallback in `layout/_accessibility.scss` stays. `.form-select` stays a single-layer exception, and
  the three `outline: 2px solid` rules (`.btn-action`, `.date-item`, `.switch-icon`) are not
  converted — both are follow-ups.
- Consider the layered shadow scale (`.shadow-xs`…`.shadow-xl`) and `.border-keyline`.
- Skip the `.fs-*` renaming — it inverts the scale direction and breaks every page.

**Files:** `core/scss/_config.scss`, `_props.scss`, `core/scss/mixins/**`, `core/scss/_utilities.scss`.
**Gate:** `html-diff` zero diff for the radius and focus-ring work.

### Phase 3b — Cascade layers

One PR, decided 2026-09-08 (section 5, item 9). Placed after phase 3 because it is the first phase
whose CSS output changes by design, so it must not sit under the byte-diff-gated phases.

- Declare the layer order once, with Bootstrap v6's flat names, in the root partial:
  `colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities`.
  No `tabler.*` nesting; the Tailwind v4 name overlap is accepted, as upstream accepts it.
- Wrap per partial with `@layer x { … }` (Sass forbids `@use`/`@forward` inside a block; the
  `meta.load-css` variant from PR #2396 is not used). The module graph from PR #2689 stays as is.
- Mapping: `root` = `bootstrap/root`, `props`, `layout/root`, `tabler-themes` (the `:root` tokens go
  into the layer, as upstream); `reboot`; `layout` = containers, grid, `layout/page`, `layout/core`;
  `content` = type, images, tables, `ui/typo`; `forms` = `bootstrap/forms` + `ui/forms`;
  `components` = buttons, every other `bootstrap/*` and `ui/*`, `layout/navbar`, `layout/dark`;
  `custom` = empty, documented slot for user overrides; `helpers`; `utilities` = `utilities/api` +
  `utils/*`.
- Hoist `bootstrap/forms/_input-group.scss` and `_validation.scss` into `components` — they
  cross-style `.btn` and z-index, and break grouped-button radii from the `forms` layer (the July
  prototype hit this; upstream does the same).
- Unlayered on purpose: `@property`, `@font-face`, `@keyframes`, and the whole `tabler-vendors.scss`
  — third-party CSS is unlayered, so a layered override would lose to it.
- Drop `!important` from utilities and remove `$enable-important-utilities`, as upstream did (v6 dist
  carries 150 `!important`, Tabler 1.5 carries 2647). Layer order now guarantees utilities beat
  components; unlayered project CSS beats utilities, which is the documented model.
- Review `_extends.scss`: Sass places an extending selector in the layer of the rule it extends
  (`.h1 { @extend h1 }` lands in `content`), so cross-layer extends move selectors silently.
- Docs: a "Cascade layers" section in the customisation guide and an upgrade-guide entry — unlayered
  project CSS now wins on every property, and project `!important` no longer beats Tabler's.

**Files:** `core/scss/_root.scss` (order), every partial under `core/scss/bootstrap/**`, `ui/**`,
`layout/**`, `helpers/**`, `utils/**`, `_utilities.scss`, `_extends.scss`, `_config.scss`.
**Gate:** by-design CSS diff, so no byte-diff; instead zero `html-diff`, the screenshots package over
every preview page, a `getComputedStyle` per-page comparison before/after, and a control test that a
utility beats a component without `!important`.
**Risk:** medium. The specificity model changes for every user; the `!important` inversion inside
layers is the part that bites, so the review has to list every remaining `!important` and its layer.

### Phase 4 — Logical properties

Already scoped on the `migrate-css-physical-directions-to-logical` branch. Upstream did the same,
which validates the direction.

- Emit `margin-block-*` / `padding-inline-*` / `border-inline-*` from spacing and border utilities
  with unchanged class names.
- Reconcile with the `--tblr-dir` multiplier work for `translateX`, and keep the `/*rtl:ignore*/`
  workaround for rtlcss negating `calc()`.

**Gate:** RTL build comparison; `html-diff` zero diff.

**Status:** #2974 landed the block axis of the spacing and border utilities (`mt` / `mb` / `my`,
`pt` / `pb` / `py`, `.border-top` / `.border-bottom` / `.border-y`, negative `mt` / `mb` / `my`) plus
the non-geometry physical leftovers (`_extends.scss` markdown-table padding, `_spinners.scss` border).
The inline axis was already logical. `tabler.css` changed by property rename only; `tabler.rtl.css`
changed by the same renames plus the three inline-axis sweep lines, which rtlcss no longer flips
because the logical property now resolves the direction itself — rendered output is unchanged.

**Why rtlcss and `--dir` stay.** Logical properties cover box-model sides (margin, padding, border,
inset, size) but there is no logical form for `transform`, so a physical `translateX(-50%)` cannot be
mirrored by the browser. Tabler bridges that with `--tblr-dir` (`1` in LTR, `-1` in RTL, set in
`_props.scss`) multiplied into the `calc()` of every direction-sensitive translate — `.translate-middle`
in `_utilities.scss`, `$form-floating-label-transform` in `_variables.scss` — each carrying a
`/*rtl:ignore*/` so rtlcss (which would otherwise negate the `calc()` a second time) leaves it alone.
rtlcss is still run in `.build/build-css.ts` for everything `--dir` does not reach.

**What would let us drop rtlcss.** Every remaining `rtl:` marker under `core/scss` has to be gone
first — `grep -rn 'rtl:' core/scss --include='*.scss'` is the live checklist. They fall into:

- *Transforms* — `.translate-middle`, `$form-floating-label-transform`, and the `translateX` /
  `rotate` uses in `ui/_steps.scss`, `ui/_switch-icon.scss`, `ui/_buttons.scss`, `ui/_badges.scss`,
  `ui/_loaders.scss`, `ui/_dropdowns.scss`, `layout/_navbar.scss`, `bootstrap/_carousel.scss`,
  `bootstrap/_offcanvas.scss`, `bootstrap/_spinners.scss`. These need the `--dir` multiplier applied
  the same way, or a future CSS logical transform.
- *Popover / tooltip arrow geometry* (`bootstrap/_popover.scss`, `_tooltip.scss`) — physical
  `border-*` triangles on absolutely positioned arrows; the Floating UI work (phase 5) is expected to
  replace this with placement-driven values.
- *`rtl:raw` blocks* in `bootstrap/_reboot.scss` and `ui/_breadcrumbs.scss`, and the
  `rtl:begin:remove` block in `mixins/bootstrap/_utilities.scss` — hand-written RTL overrides that
  would need a logical-property equivalent.

Once the checklist is empty, `rtlcss` and the `tabler.rtl.css` build come out and one stylesheet
serves both directions, matching Bootstrap v6.

### Phase 5 — JavaScript runtime

- ESM only. Drop the UMD build from `core/package.json` (`js:build:standalone`, `js:min:*`); no
  compatibility bundle. `<script type="module">` becomes
  the documented way to load `tabler.js`, and the `window.tabler` global goes with the bundle.
- Finish the Floating UI migration (#2966). The option is `positionConfig`, not v6's
  `floatingConfig`; `popperConfig` stays as a deprecated alias for one major.
- Take the ScrollSpy rewrite (`IntersectionObserver` + activation line) into
  `core/js/src/bootstrap/scrollspy.ts`.
- Prepare to delete `util/backdrop.ts`, `util/focustrap.ts`, `util/scrollbar.ts` — but only after
  phase 6 lands, since they are what the native `<dialog>` replaces.

**Files:** `core/js/src/bootstrap/**` (~4 900 lines), `core/js/src/tabler.ts`, `core/package.json`,
`core/.build/vite.config.mts`.
**Gate:** `core` vitest suites; browser smoke test of every preview page that initialises a plugin.

### Phase 6 — Native components

The phase with the best effort-to-value ratio: less code, better accessibility, same class names.

- Rebuild the modal on `<dialog>` while keeping `.modal` / `.modal-header` / `.modal-body` /
  `data-bs-toggle="modal"`. Watch for Tabler's own modal variants and the `preview/` modal
  architecture.
- Rebuild offcanvas on the same `DialogBase`.
- Rebuild the accordion on `<details>`/`<summary>`; `.accordion-button` disappears, so the docs
  class reference and every accordion example need updating (~126 occurrences across 6 files).
- Rebuild the carousel on CSS scroll snap.
- Consider the responsive navbar moving from Collapse to a drawer — but Tabler's navbar and sidebar
  are heavily customised, including the 1.5 folded sidebar, so evaluate this separately.
- Convert close button, navbar toggler and breadcrumb divider icons to `mask-image` + `currentcolor`.

**Files:** `core/scss/bootstrap/_modal.scss`, `_offcanvas.scss`, `_carousel.scss`,
`core/scss/ui/_modals.scss`, `_offcanvas.scss`, `_carousel.scss`, `_accordion.scss`, `_close.scss`,
`core/js/src/bootstrap/{modal,offcanvas,carousel,collapse}.ts`, plus `shared/ui/**` and
`preview/pages/**` markup.
**Gate:** `html-diff` will differ by design — review page by page; keyboard and screen-reader passes.
**Risk:** high, but each component can ship independently.

### Phase 7 — Forms

- `.form-select` stays as it is in 2.0; nothing in markup, docs or SCSS changes for it. Revisit
  after 2.0.
- Split `_form-check.scss` into checkbox / radio / switch, with `.check` directly on the input.
- Move validation to `data-bs-validate` + `:user-invalid`; drop the built-in validation icons.
- Make `.form-range` a wrapper with a JavaScript-driven filled track.
- Evaluate `.form-field` as a layout primitive against Tabler's existing form markup.

**Files:** `core/scss/bootstrap/forms/**`, `core/scss/ui/forms/**`, `shared/ui/` form components,
`docs/content/**` form pages.
**Risk:** medium-high, and the most visible to template users.

### Phase 8 — Utilities and the responsive prefix

Kept late because it is the most disruptive phase and the only one that breaks templates on purpose.

- Container-query utilities (`.contains-inline`, `.contains-size`) and grid utilities
  (`.grid-cols-*`, `.place-items`, `.justify-items`) are pure additions — take them (#2975).
- **The `md:` prefix syntax is adopted in 2.0** (decided 2026-09-10). This reverses the earlier note
  in this plan, which deferred it to 3.0 at the earliest. `breakpoint-infix()` becomes
  `breakpoint-prefix()` and returns `"md\:"`; responsive classes move from `.col-md-6` / `.d-md-none`
  to `.md\:col-6` / `.md\:d-none`.
- Measured scope: **2 480 responsive classes across all bundles** (1 670 in `tabler.css`, 810 more in
  `tabler-marketing.css`, which carries its own utilities map), **129 of them actually used in our own
  markup, 4 866 occurrences across 353 files**: `docs/` 4 042 in 209 files (mostly copyable examples in
  `.mdx`), `preview/` 582 in 78, `shared/` 191 in 50 (including class names inside `shared/data/*.json`),
  and 40 across `core/js/tests/visual/`, `screenshots/` and `.agents/`. The earlier "~1 800 occurrences
  in ~200 files" estimate in this plan was low by about 2.7×.
- **Sass side done** (`breakpoint-prefix()`, all call sites, the compatibility plugin). `breakpoint-infix()`
  survives as a deprecated alias so custom Sass written against 1.x still compiles.
- Print keeps its 1.x middle position (`.d-print-none`) until question 18 is settled, so
  `generate-utility()` now takes a `$prefix` (front) and an `$infix` (middle) separately.
- The prefix sits at the **front of the whole class**, not in the middle, so the 19
  `breakpoint-infix()` call sites in 13 files cannot be sed'ed: `.col#{$infix}-6` becomes
  `.#{$prefix}col-6`. The four nested `&#{$infix}` blocks (`ui/_tables.scss`, `layout/_navbar.scss`
  ×2, `bootstrap/_navbar.scss`) have to be unrolled into full selectors, because `&` cannot prepend.
  This is the bulk of the SCSS work.
- The markup sweep is no longer on the critical path: the compatibility plugin keeps every 1.x class
  alive, so `preview/`, `docs/` and `shared/` can move page by page. The codemod still needs a
  whitelist from the frozen list rather than a regex — parsing alone reads `btn-sm` as `sm:btn`.
  Prettier does not run on `.mdx`, so the codemod owns formatting there.
- `css-escape-ident()` from upstream is only needed if the breakpoints are renamed (question 10). It
  exists to escape the leading digit of `2xl` (`.\32 xl\:`); with `xxl` kept, `xxl\:` needs no escape.
- Hand-written `classnames` front matter (at least `page-layouts`, `navbars`, `modal`, `table`,
  `offcanvas`, `list-group`, `dropdown`, `datagrid`, `carousel`) and the grid and utility prose do not
  follow a codemod — that is separate work, and it is why phase 10 grows with this phase.
- Upstream `.stylelintrc.json` gained a `selector-class-pattern` that allows the prefix; ours sets
  that rule to `null`, so nothing breaks, but turning it on in the v6 form buys a syntax gate.
- v6 also renamed breakpoint values (question 10) and moved `.navbar-expand` and `.table-responsive`
  to container queries. Both are independent of the naming and stay their own decisions.

**Gate:** `check-markup-classes` is the gate that makes any of this reviewable — and it could not
read escaped selectors at all: its css reader stopped at the backslash, so every prefixed class
would have been reported as undefined. Fixed ahead of the phase (#3028). It is not urgent while the
compatibility layer is on — the gate reads the 1.x alias and our markup still uses it — but it blocks
the codemod, since prefixed markup needs a parser that can read the prefixed selector.

`html-diff` cannot prove this phase neutral, because the output changes by design. The proof used
instead compares, for every class in every bundle, its `@media` context, selector shape and
declarations before and after: 11 617 1.x classes preserved, none lost, none changed, and exactly
the 2 480 expected prefixed classes added. That comparison is what caught the three real defects in
the first pass — print utilities emitting `.-printd-inline`, five size modifiers wrongly on the
frozen list, and 810 marketing-bundle classes missing from it.

### Phase 9 — Component namespace collisions

`.avatar`, `.chip`, `.stepper` (Tabler's `.steps`), `.progress` and `.status` are unified with
upstream. Tabler's definition is reworked so that the class names,
modifiers and tokens are compatible with Bootstrap v6's component of the same name; Tabler-only
extras stay as additive modifiers on top. Where Tabler's current name differs (`.steps` vs
`.stepper`) the v6 name is adopted and the old class stays as an alias for one major, listed in the
upgrade guide. This is the one deliberate exception to "v5 names stay", because these components
have no v5 name to keep. Still to decide, per component, is whether to
implement v6's genuinely new components ourselves: **otp-input**, **combobox**, **datepicker**,
**password strength**, **prose**, **form-adorn**, **nav-overflow**, **form-field**.

Note that our datepicker plans and upstream's choice of Vanilla Calendar Pro may or may not agree —
worth checking before committing to a library.

**Deliverable:** a per-component table (Tabler class, v6 class, what changes, what is aliased) in
the 2.0 planning notes, produced with the `bootstrap-v6-reference` agent before any SCSS moves.

### Phase 10 — Documentation and gates

- Write the 2.0 upgrade guide the way 1.5's was written, with before/after for each breaking change.
- Update `classnames` front matter across `docs/content/**` for every class that moved.
- Extend `check-markup-classes` baselines.
- Add changesets per phase.

---

## 4. Suggested ordering

```
Phase 0  decisions
   ↓
Phase 1  Sass architecture ──────────────┐
   ↓                                     │
Phase 2  oklch + theme tokens            │ (Phase 5 JS can run in parallel
   ↓                                     │  from the start, except for the
Phase 3  token scales                    │  util/* deletions, which wait
   ↓                                     │  on Phase 6)
Phase 3b cascade @layer                  │
   ↓                                     │
Phase 4  logical properties ─────────────┘
   ↓
Phase 6  native components (per component, independently shippable)
   ↓
Phase 7  forms
   ↓
Phase 8  utilities + responsive prefix
   ↓
Phase 9  component ownership
   ↓
Phase 10 docs and gates
```

## 5. Decisions and open questions

Decided:

1. Browser baseline: 2.0 requires `oklch()` and `color-mix()`.
2. ESM only. The UMD bundle is dropped in 2.0.
3. `.form-select` is untouched in 2.0.
5. `.avatar` / `.chip` / `.stepper` / `.progress` / `.status` are unified with Bootstrap v6's
   components; old names aliased for one major (phase 9).
7. The option that replaces `popperConfig` is `positionConfig` (#2966); `popperConfig` is kept as a
   deprecated alias. v6's `floatingConfig` is not adopted.
9. Cascade `@layer` lands as phase 3b, one PR after the token scales: flat Bootstrap v6 layer
   names (no `tabler.*` nesting), `:root` tokens inside the `root` layer, utilities without
   `!important` and `$enable-important-utilities` removed (decided 2026-09-08).
14. `.badge-outline` is removed in 2.0, not aliased (#3011, decided 2026-09-08). It duplicated the
    soft `.badge.bg-{color}-lt` variant without a role of its own, and `.agents/rules/main.mdc`
    already forbade it. This is a deliberate exception to "every 1.x class stays": upgrade-guide
    line, no replacement class — markup moves to `.badge.bg-{color}-lt`.
15. The `md:` responsive prefix is adopted in 2.0 (decided 2026-09-10, phase 8). This overrides the
    earlier entry in this plan that deferred it to 3.0. It is a deliberate exception to "v5 class
    names stay": every responsive class in every template changes, so it ships with a codemod and an
    upgrade-guide entry. Question 18 is the part still open.
16. The 1.x spelling survives, added back over the built css by a PostCSS plugin
    (`.build/postcss-legacy-responsive.ts`, decided 2026-09-10): `.md\:d-block { … }` ships as
    `.md\:d-block, .d-md-block { … }`. One authored spelling in Sass, one extra selector per rule
    rather than a duplicated rule, both names at identical specificity and cascade position, and the
    whole layer goes away by deleting the plugin and its frozen class list one major after 2.0. Cost
    measured on `tabler.css`: +98 KB raw, +9 KB gzip (+11%). The alias list cannot be derived by
    parsing — `btn-sm` reads as `sm:btn` — so it is a frozen list of the 2 480 classes 1.x released.
17. The prefix is a **pure rename, with no change in behaviour** (decided 2026-09-10):
    `md:navbar-expand` expands from `md` up, exactly as `.navbar-expand-md` does today, even though
    it now reads like the opposite of `md:table-mobile`. Making the two read alike would change what
    existing markup does, so it is a documentation problem, not a behavioural one. Revisit only with
    the container-query rework of `.navbar-expand` and `.table-responsive`.

Open:

4. `$spacers`: keep the v5 scale, or accept the silent reflow of every template?
6. Does the v6 navbar-as-drawer pattern survive contact with the folded sidebar from 1.5?
8. Classes that native components remove (`.accordion-button`, `.accordion-collapse`,
   `.carousel-caption`, `.carousel-control-*`, `.btn-close-white`): keep on the new element, keep as
   an empty alias, or drop with an upgrade-guide entry? The policy rule promises every 1.x class.
10. Breakpoint values (`lg` 1024, `xl` 1280, `2xl` 1536): separate from the naming, undecided.
11. Forms validation (`data-bs-validate`, `:user-invalid`, no `.was-validated`) and the
    `_form-check` split — visible to every template user, not yet decided.
12. Datepicker library: upstream picked Vanilla Calendar Pro; do we follow?
13. `data-bs-*` → `data-tblr-*`: does 2.0 switch docs and markup and drop `data-bs-*`, or only keep
    the alias?
18. Does 2.0 also take the other v6 prefixes — `print:`, `dark:` and the state variants
    (`hover:link-10`)? They share the same mechanism in `generate-utility()`. `dark:` has to agree
    with our `_dark.scss` and `light-dark()` approach first.

## 6. Task board

One PR per task unless noted. Size: S under a day, M a few days, L a week or more. "Gate" is the
proof the PR must carry per `.agents/rules/v2.mdc`. Order inside a group is the suggested order.

### 6.1 Ready now — no open question involved

**Start with the light ones, in this order:** #2969, #2977, #2970, #2971, #2972, #2973, #2974, then
#2975 and #2976 with their docs parts left out. Documentation (the upgrade guide, the docs pass and the
docs halves of #2975 / #2976) is deliberately last; the heavy phases (Sass split, oklch, component
parity, native components) wait until the light ones are in and get their issues then. The Floating UI
PR #2966 is parked.

| Issue | Phase | Task | Files | Gate | Size |
| --- | --- | --- | --- | --- | --- |
| #2966 (PR) | 5 | Finish Floating UI: apply the parked `boundary: viewport/document` fix (stash on the branch, tests green), reworded changeset, merge | `core/js/src/bootstrap/util/floating-ui.ts`, `dropdown.ts`, `tooltip.ts` | vitest, tsc | S |
| #2969 | 1 | `_index.scss` per directory (`ui/`, `forms/`, `mixins/`, `layout/`, `utils/`) and route `tabler.scss` through them | `core/scss/**/_index.scss`, `tabler.scss` | byte-identical `tabler.css` | S |
| #2977 | 1 | `defaults()` and `tokens()` mixins; card, badge and avatar converted to per-component token maps (`$card-tokens` rendered on `.card`) as the reference pattern; further components as small follow-up PRs | `core/scss/mixins/**`, `core/scss/ui/_cards.scss`, `_badges.scss`, `_avatars.scss`, `_variables.scss` | byte-identical `tabler.css`, SCSS unit tests | S |
| — | 1 | Split `_variables` / `_variables-dark` / `_maps` into `_config` / `_colors` / `_theme` / `_root`, introduce `defaults()` + `tokens()` | `core/scss/_variables.scss`, `_variables-dark.scss`, `_maps.scss`, `_props.scss`, `_settings.scss`, `_core.scss` | byte-identical `tabler.css`, zero `html-diff` | L |
| #2972 | 3 | One `focus-ring()` mixin over `--focus-ring*` tokens, replacing 46 `*-focus-box-shadow` sites; same values for now | `core/scss/mixins/**`, `core/scss/ui/**`, `_config.scss` | byte-identical `tabler.css` | M |
| #2970 | 3 | Numeric `$radii` map and `--radius-0…9`, with `$border-radius-*` and `.rounded-*` mapped to today's values | `_config.scss`, `_props.scss`, `_utilities.scss` | byte-identical `tabler.css` | S |
| #3016 | 3b | Cascade `@layer` with the flat v6 layer order, per-partial wrapping, `input-group`/`validation` hoisted to `components`, vendors and `@property` unlayered, utilities without `!important`; docs and upgrade-guide entry | `core/scss/_root.scss`, `bootstrap/**`, `ui/**`, `layout/**`, `helpers/**`, `utils/**`, `_utilities.scss`, `_extends.scss`, `_config.scss`, docs customisation page | zero `html-diff`, screenshots, `getComputedStyle` comparison, utility-beats-component control test | M |
| #2974 | 4 | Logical properties on the block axis of spacing and border utilities (inline axis is already logical), class names unchanged; keep rtlcss and `--dir` for transforms | `core/scss/_utilities.scss`, `_extends.scss`, `bootstrap/_spinners.scss` | diff limited to renamed properties in `tabler.css` and `tabler.rtl.css`, zero `html-diff` | S–M |
| #2973 | 5 | ScrollSpy on `IntersectionObserver` with an activation line; drop the deprecated `offset` and `method` options | `core/js/src/bootstrap/scrollspy.ts`, its spec | vitest, preview smoke | M |
| #2976 | 5 | ESM only: remove the UMD scripts from `core/package.json`, fix `exports`, document `<script type="module">` and the loss of `window.tabler` in the upgrade guide | `core/package.json`, `core/.build/vite.config.mts`, `docs/content/**` getting started | build, preview pages still initialise plugins | M |
| #2975 | 8 | Additive utilities: `.contains-inline` / `.contains-size`, `.grid-cols-*`, `.place-items`, `.justify-items`, `.shadow-xs…xl`, `.border-keyline` | `core/scss/_utilities.scss`, docs utility pages, `classnames` front matter | `check-markup-classes` baseline extended | M |
| ~~—~~ done | 8 | ~~`breakpoint-prefix()` and every call site moved to a leading prefix, the four nested `&#{$infix}` blocks unrolled, `breakpoint-infix()` removed, print split onto its own `$infix` argument, plus the compatibility plugin and its frozen class list~~ | `core/scss/mixins/**`, `bootstrap/**`, `ui/_tables.scss`, `layout/_navbar.scss`, `helpers/_helpers.scss`, `.build/postcss-legacy-responsive.ts`, `.build/legacy-responsive-classes.txt` | per-class behaviour comparison over every bundle, SCSS unit tests | L |
| — | 8 | Codemod for our own markup: `preview/`, `docs/`, `shared/data/*.json`, `core/js/tests/visual/`, `screenshots/`. Not urgent — the compatibility layer keeps the current spelling working — but it needs #3028 merged first, so the gate can read prefixed classes | `preview/**`, `docs/**`, `shared/**` | `check-markup-classes` | M |
| — | 8 | Hand-written `classnames` front matter and the grid/utility prose, which no codemod reaches | `docs/content/**` | docs build, link gate | M |
| #2971 | 6 | Framework icons drawn with `mask-image` + `currentcolor`; close button, toggler and breadcrumb are already done, so the scope is the form-control, select, carousel and validation SVGs and dropping their `-dark` variants; `.btn-close-white` kept as an empty alias | `core/scss/bootstrap/forms/**`, `bootstrap/_navbar.scss`, `_carousel.scss`, `ui/forms/**`, `ui/_close.scss` | visual review light/dark, `check:css-vars` | S–M |
| — | 0 | Lift the reusable parts of upstream `skills/bootstrap-v5-v6-migration/SKILL.md` into our notes; start the 2.0 section of `UPGRADE.md` with the browser baseline (oklch, color-mix) and the ESM-only note | `UPGRADE.md`, `.agents/` | none | S |
| — | 2 | Colours on `oklch()` + `color-mix(in lab)`, `--theme-bg/fg/border/contrast` and `.theme-*`, remove the 52 `--tblr-*-rgb` sites; `.btn-primary` etc. keep emitting via the theme tokens | `_colors.scss`, `_theme.scss`, `_props.scss`, `core/scss/ui/**` | contrast gate, dark mode screenshots, hand-reviewed `html-diff` | L |
| — | 9 | Component parity table for `.avatar`, `.chip`, `.steps`→`.stepper`, `.progress`, `.status` against v6 (via the `bootstrap-v6-reference` agent); then one rework PR per component with the old names aliased | planning notes, then `core/scss/ui/_avatars.scss`, `_chips.scss`, `_steps.scss`, `_progress.scss`, `_status.scss` | `check-markup-classes`, `classnames`, changeset | S + 5×M |
| — | 6 | Modal on native `<dialog>` under the v5 names, events and data attributes; keep Tabler's modal variants and the preview modal architecture working | `core/scss/bootstrap/_modal.scss`, `core/scss/ui/_modals.scss`, `core/js/src/bootstrap/modal.ts`, `shared/ui/**` | a11y checklist (focus trap, Escape, backdrop, focus return), by-design `html-diff` | L |
| — | 6 | Offcanvas on the same `DialogBase` | `core/scss/bootstrap/_offcanvas.scss`, `core/js/src/bootstrap/offcanvas.ts` | same as the modal | M |
| — | 6 | Carousel on CSS scroll snap; `autoplay` and `ends` options; removed classes handled per question 8 | `core/scss/bootstrap/_carousel.scss`, `core/js/src/bootstrap/carousel.ts` | preview smoke, keyboard pass | M |
| — | 5 | Delete `util/backdrop.ts`, `util/focustrap.ts`, `util/scrollbar.ts` once the modal and offcanvas rebuilds are merged | `core/js/src/bootstrap/util/**` | vitest | S |
| — | 10 | 2.0 upgrade guide with before/after per breaking change, `classnames` updates, extended `check-markup-classes` baselines, changesets per phase | `UPGRADE.md`, `docs/content/**` | docs build, link gate | M, grows with each task |

Dependencies: #2977 after #2969; the Sass split after #2977. #2972 and #2970 can land before the
Sass split (in `_variables.scss`, moved later). oklch after the Sass split; #3016 (`@layer`, 3b) after oklch and before #2974; the component parity
reworks after oklch (they use theme tokens). Modal → offcanvas → deleting the `util/*` helpers. The
upgrade guide runs alongside everything. The phase 8 `breakpoint-prefix()` task needs #3028 (landed)
and should go in before the codemod, so the gate can police the sweep.

### 6.2 Waiting on a decision (section 5)

| Open question | Task once answered |
| --- | --- |
| 4 `$spacers` | either nothing, or a remap PR plus a codemod for every template |
| 6 navbar as drawer | prototype against the folded sidebar, then decide |
| 8 classes removed by native components | accordion on `<details>` (phase 6, M, no issue yet) is blocked on this: it decides what happens to `.accordion-button` / `.accordion-collapse` (195 occurrences in 12 files) |
| 10 breakpoint values | either nothing, or a reflow PR with screenshots of every preview page; also decides whether `css-escape-ident()` is needed for `2xl` |
| 11 forms validation and `_form-check` split | phase 7 PRs |
| 12 datepicker library | new component or nothing |
| 13 `data-tblr-*` switch | docs and markup sweep, or nothing |
| 18 `print:` / `dark:` / state prefixes | additional utility variants, or nothing |

