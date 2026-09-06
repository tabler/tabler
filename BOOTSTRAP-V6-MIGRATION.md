# Bootstrap v5 → v6: analysis and a phased plan for Tabler 2.0

**Status:** analysis only, nothing implemented. Written 2026-09-06.

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
`migrate-popper-to-floating-ui`) · the `$radii` scale · scroll-snap carousel.

**Skip or defer:**
the `md:` prefix syntax · the `modal`→`dialog`, `offcanvas`→`drawer`, `dropdown`→`menu` renames
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

- Browser baseline: are `oklch()` and `color-mix()` in? This gates phases 2 and 3.
- ESM-only distribution: does 2.0 drop the UMD `tabler.js` bundle? This gates phase 5.
- Class-name policy: confirm v5 names stay, and write down the exceptions we are willing to make.
- Component namespace policy for `.avatar` / `.chip` / `.stepper` (see phase 9).
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
- Keep `@layer` out of this phase — it is a separate, previously withdrawn prototype.

**Files:** `core/scss/_variables.scss`, `_variables-dark.scss`, `_maps.scss`, `_config.scss`,
`_props.scss`, `_settings.scss`, `_core.scss`, `tabler.scss`.
**Gate:** `html-diff` must show zero diff; byte-diff of `core/dist/css/tabler.css`.
**Risk:** low mechanically, high in volume. This is the phase where `@use … as *` writing back to
config bites, per the existing SCSS module notes.

### Phase 2 — Colour system on oklch and theme tokens

The point of no return for browser support.

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
- Consider the layered shadow scale (`.shadow-xs`…`.shadow-xl`) and `.border-keyline`.
- Skip the `.fs-*` renaming — it inverts the scale direction and breaks every page.

**Files:** `core/scss/_config.scss`, `_props.scss`, `core/scss/mixins/**`, `core/scss/_utilities.scss`.
**Gate:** `html-diff` zero diff for the radius and focus-ring work.

### Phase 4 — Logical properties

Already scoped on the `migrate-css-physical-directions-to-logical` branch. Upstream did the same,
which validates the direction.

- Emit `margin-block-*` / `padding-inline-*` / `border-inline-*` from spacing and border utilities
  with unchanged class names.
- Reconcile with the `--tblr-dir` multiplier work for `translateX`, and keep the `/*rtl:ignore*/`
  workaround for rtlcss negating `calc()`.

**Gate:** RTL build comparison; `html-diff` zero diff.

### Phase 5 — JavaScript runtime

- Decide ESM-only, then drop the UMD build from `core/package.json` (`js:build:standalone`,
  `js:min:*`) or keep a compatibility bundle for one more major.
- Finish the Floating UI migration and rename `popperConfig` → `floatingConfig` in our API.
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

- Decide on `.form-select`: dropping it means touching ~650 occurrences across the repo. Options are
  to keep it as an alias over `.form-control` or to defer entirely.
- Split `_form-check.scss` into checkbox / radio / switch, with `.check` directly on the input.
- Move validation to `data-bs-validate` + `:user-invalid`; drop the built-in validation icons.
- Make `.form-range` a wrapper with a JavaScript-driven filled track.
- Evaluate `.form-field` as a layout primitive against Tabler's existing form markup.

**Files:** `core/scss/bootstrap/forms/**`, `core/scss/ui/forms/**`, `shared/ui/` form components,
`docs/content/**` form pages.
**Risk:** medium-high, and the most visible to template users.

### Phase 8 — Utilities and the responsive naming question

Kept last because it is the most disruptive and the most optional.

- Container-query utilities (`.contains-inline`, `.contains-size`) and grid utilities
  (`.grid-cols-*`, `.place-items`, `.justify-items`) are pure additions — take them.
- The `md:` prefix syntax is **not adopted in 2.0** (decided 2026-09-06). Adopting it would mean
  rewriting roughly 1 800 class occurrences across ~200 files in `preview/`, `docs/` and `shared/`,
  and breaking every third-party Tabler template. v5 infix names (`.col-md-6`, `.d-md-none`) stay.
- Revisit for 3.0 at the earliest; if ever adopted, ship both spellings for one major and add a codemod.
- Breakpoint value changes (`lg` 1024, `xl` 1280, `2xl` 1536) can be considered independently of the
  naming, but they reflow every layout, so treat them as their own decision.

**Gate:** `check-markup-classes` is the gate that makes any of this reviewable.

### Phase 9 — Component namespace collisions

For each of `.avatar`, `.chip`, `.stepper` (Tabler's `.steps`), `.progress` and `.status`, decide
whether Tabler keeps its own definition, adopts upstream's, or renames. Then decide whether to
implement v6's genuinely new components ourselves: **otp-input**, **combobox**, **datepicker**,
**password strength**, **prose**, **form-adorn**, **nav-overflow**, **form-field**.

Note that our datepicker plans and upstream's choice of Vanilla Calendar Pro may or may not agree —
worth checking before committing to a library.

**Deliverable:** a component ownership table in the 2.0 planning notes.

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
Phase 4  logical properties ─────────────┘
   ↓
Phase 6  native components (per component, independently shippable)
   ↓
Phase 7  forms
   ↓
Phase 8  utilities / naming decision
   ↓
Phase 9  component ownership
   ↓
Phase 10 docs and gates
```

## 5. Open questions

1. Browser baseline for `oklch()` and `color-mix()` — the gate on phases 2 and 3.
2. ESM-only, or one more major with a UMD bundle?
3. `.form-select`: alias, removal, or defer?
4. `$spacers`: keep the v5 scale, or accept the silent reflow of every template?
5. Who owns `.avatar` / `.chip` / `.stepper` when upstream ships them too?
6. Does the v6 navbar-as-drawer pattern survive contact with the folded sidebar from 1.5?
