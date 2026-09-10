# Rules of thumb

Part of the `design-system` skill. Short rules in the style of the Kumo design skill: an
imperative title, one sentence on why, a recommended example and one to avoid. Rules 1–9 are
Kumo rules that hold for Tabler as they are, 10–14 are Kumo rules adapted to Tabler's
choices, 15–24 are Tabler's own. Counts are the state of `preview/pages` and `shared/` on
`v2-dev`, 2026-09-08; they show that a rule is not yet met everywhere, so a review reports new
violations, not the backlog.

A review cites a rule by number: "rule 16 — buttons go in `btn-list`".

### 1. Use 14px for content text

Body copy, buttons, table cells and form values are 14px. 16px and above belong to headings.
Long-form prose inside `.markdown` is the one exception, at 16px (SKILL section 3).

```html
<!-- Recommended -->
<h3 class="card-title">API tokens</h3>
<p>Production token expires in 30 days.</p>

<!-- Avoid -->
<h3 class="card-title">API tokens</h3>
<p class="fs-3">Production token expires in 30 days.</p>
```

### 2. Always sentence case headings

Only the first word and product names take a capital. Title Case reads as marketing, not UI.
This covers all UI text: headings, card and page titles, subheaders, buttons, menu items and
table headers.
Today: 0 in `preview/pages` and `shared/` after the sentence-case pass of 2026-09-08; what is left
capitalised is a product or proper name ("Tabler Icons", "Front-End Learning", "United States").

```html
<!-- Recommended -->
<h3 class="card-title">Recent requests</h3>
<h3 class="card-title">Cloudflare Workers usage</h3>

<!-- Avoid -->
<h3 class="card-title">Recent Requests</h3>
<h3 class="card-title text-uppercase">Recent requests</h3>
```

### 3. Never use `fw-bold`

Headings are semibold (600) and emphasised inline text is medium (500). 700 is not on the
weight scale. Today: 0 × `fw-bold`, 23 × `fw-medium`, 7 × `fw-semibold`.

```html
<!-- Recommended -->
<div class="fw-medium">Account settings</div>
<p>This action <span class="fw-medium">is required</span>.</p>

<!-- Avoid -->
<div class="fw-bold">Account settings</div>
<p>This action <strong class="fw-bold">is required</strong>.</p>
```

### 4. Never change letter spacing

`letter-spacing` is 0 everywhere. The only tracked text comes from the `subheader()` mixin,
which the framework applies itself: `.subheader`, table heads, `.table-mobile` cell labels,
`.dropdown-header`, `.datagrid-title`, `.page-pretitle` and `.hr-text`, plus the sidebar
section title, which writes the same `0.04em` by hand. Markup never adds tracking.

```html
<!-- Recommended -->
<div class="subheader">Worker metrics</div>
<h2>Worker metrics</h2>

<!-- Avoid -->
<h2 style="letter-spacing: 0.05em">Worker metrics</h2>
<h2 class="text-uppercase tracking-wide">Worker metrics</h2>
```

### 5. Put related text closer together

A title and its description sit 8px apart; the group sits 16px from the next one. Equal
spacing everywhere hides the grouping.

```html
<!-- Recommended -->
<div class="mb-3">
  <h3 class="mb-1">Web analytics</h3>
  <p class="text-secondary mb-0">Measure site traffic without changing your code.</p>
</div>
<a href="#" class="btn">Configure</a>

<!-- Avoid -->
<h3 class="mb-3">Web analytics</h3>
<p class="text-secondary mb-3">Measure site traffic without changing your code.</p>
<a href="#" class="btn">Configure</a>
```

### 6. Reduce the font size of inline monospaced text

Monospace glyphs look larger than the sans at the same size. `code` is `0.857em` in the
framework, so use the element rather than a styled span.

```html
<!-- Recommended -->
<p>Edit <code>wrangler.toml</code> to continue.</p>

<!-- Avoid -->
<p>Edit <span class="font-monospace">wrangler.toml</span> to continue.</p>
```

### 7. Align icons with the first line of text

An icon next to multi-line text aligns with the first line, not the middle of the block.
Inline icons are 16px (`icon-inline`) so they match the x-height.

```html
<!-- Recommended -->
<div class="d-flex">
  <Icon name="alert-triangle" class="me-2 mt-1" />
  <div>API token permissions cannot be changed after creation. Create a new token instead.</div>
</div>
<p>Runs on <Icon name="bolt" class="icon-inline" /> Workers.</p>

<!-- Avoid -->
<div class="d-flex align-items-center">
  <Icon name="alert-triangle" class="me-2" />
  <div>API token permissions cannot be changed after creation. Create a new token instead.</div>
</div>
```

### 8. Use concentric border radii

When one rounded box sits inside another with 8px or less between them, the inner radius is
the outer radius minus the gap. The framework does this for card headers and dropdown items;
hand-written nesting must too.

```html
<!-- Recommended: card 8px, 4px padding, inner element 4px -->
<div class="card p-1">
  <div class="bg-secondary-lt rounded-1 p-3">…</div>
</div>

<!-- Avoid: inner radius equal to the outer one (rounded-3 is the card's 8px) -->
<div class="card p-1">
  <div class="bg-secondary-lt rounded-3 p-3">…</div>
</div>
```

### 9. Use a border to separate sticky elements

A sticky table head or toolbar gets a 1px border on the edge that meets the content. A
shadow there reads as a floating surface, which it is not. Today: 4 × `sticky-top` in preview.

```html
<!-- Recommended -->
<div class="card-header sticky-top bg-surface border-bottom">…</div>

<!-- Avoid -->
<div class="card-header sticky-top bg-surface shadow-sm">…</div>
```

### 10. Hover feedback within 150ms

Kumo forbids colour transitions on hover. Tabler keeps them, but at `0.15s` only, because
that is fast enough to feel instant. Never put `--transition-base` (0.2s, `all`) on a hover.
An opacity reveal (actions that appear on hover) is not a colour change and uses
`$transition-time` (0.3s).

```scss
// Recommended
.my-item:hover { background: $hover-bg; }
.my-item { transition: background-color 0.15s ease-in-out; }

// Avoid
.my-item { transition: all 0.2s ease-in-out; }
```

### 11. Flat surfaces get a border plus the `xs` shadow, nothing more

Kumo says never combine a border with a shadow. Tabler's card is exactly that pair, on
purpose: the border draws the edge, the 1px `xs` shadow lifts it off the gray page. Anything
stronger belongs to floating surfaces.

```html
<!-- Recommended -->
<div class="card">…</div>
<div class="dropdown-menu">…</div> <!-- overlay shadow, it floats -->

<!-- Avoid -->
<div class="card shadow-lg">…</div>
<div class="card border-0 shadow">…</div>
```

### 12. Never nest a card inside a card body

Two borders and two paddings in a row look like a mistake. Kumo's rule is "never stack";
Tabler has `.card-stacked` for the deliberate stack, so the rule is about nesting. A list in a
card is `card-list-group`, a table is `card-table`; both keep the card's edge and padding.
The demo pages' `SectionCard` wrapper is exempt: it frames the examples on a preview page, it
is not product markup (deviation #13, closed).

```html
<!-- Recommended -->
<div class="card">
  <div class="card-header"><h3 class="card-title">Recent requests</h3></div>
  <div class="table-responsive"><table class="table card-table">…</table></div>
</div>

<!-- Avoid -->
<div class="card">
  <div class="card-body">
    <div class="card"><div class="card-body"><table class="table">…</table></div></div>
  </div>
</div>
```

### 13. Modals live in the DOM and open with `data-bs-toggle`

Kumo's "never conditionally render dialogs" becomes: never inject a modal with a script or
toggle it with `display`. The framework owns the fade, the backdrop and the focus trap.

```html
<!-- Recommended -->
<a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-edit">Edit</a>
<div class="modal" id="modal-edit" tabindex="-1">…</div>

<!-- Avoid -->
<a href="#" class="btn" onclick="document.getElementById('modal-edit').style.display='block'">Edit</a>
```

### 14. Maintain content size during collapse animations

A collapsing element animates `height` only. If the content inside reflows to the new
width mid-animation, text jumps. Fix the inner width, not the animation.

```html
<!-- Recommended -->
<div class="collapse" id="details">
  <div class="card-body">…</div>
</div>

<!-- Avoid -->
<div class="collapse" id="details">
  <div class="card-body w-auto d-flex flex-wrap">…</div>
</div>
```

### 15. Only one filled button per view

`btn-primary` marks the single main action. Everything else is the plain `btn`, so the eye
finds the primary without reading.

```html
<!-- Recommended -->
<div class="btn-list">
  <a href="#" class="btn">Cancel</a>
  <a href="#" class="btn btn-primary">Save changes</a>
</div>

<!-- Avoid -->
<div class="btn-list">
  <a href="#" class="btn btn-secondary">Cancel</a>
  <a href="#" class="btn btn-primary">Save changes</a>
  <a href="#" class="btn btn-success">Publish</a>
</div>
```

### 16. Buttons go in `btn-list`, badges in `badge-list`, avatars in `avatar-list`

The wrappers own the gap and the wrapping. Hand-written `me-2` breaks at the last item and
in RTL. Today: 0 × `me-2` on a button, badge or avatar; 49 × `<ButtonList>`, 10 × `<BadgeList>`,
13 × `<AvatarList>`, 9 × `<TagList>`. The remaining 53 × `me-2` sit on inline icons and text.

```html
<!-- Recommended -->
<div class="btn-list">
  <a href="#" class="btn">Export</a>
  <a href="#" class="btn btn-primary">Create</a>
</div>

<!-- Avoid -->
<a href="#" class="btn me-2">Export</a>
<a href="#" class="btn btn-primary">Create</a>
```

### 17. Use `text-secondary`, never `text-muted`

One class for secondary text. `text-muted` is a Bootstrap alias kept for compatibility.
Today: 0 × `text-muted` anywhere in `preview/pages`, `shared/` and `docs/content`, including
`<Icon color="muted">`, which is gone; `text-secondary` is the only secondary-text class. The
`.text-muted` utility itself stays as a Bootstrap alias until 2.0 drops the aliases.

```html
<!-- Recommended -->
<div class="text-secondary">Last deployed 4 minutes ago</div>

<!-- Avoid -->
<div class="text-muted">Last deployed 4 minutes ago</div>
```

### 18. No inline `style` for sizes

Sizes come from utilities or a component token, so they follow the scale and the theme.
Today: 0 inline sizes in `preview/pages`; demo-only sizes live as classes in
`preview/scss/demo.scss` (`demo-photo-placeholder`, `demo-dropdown-menu-wide`,
`modal-demo-scrollable`). In `shared/` three scroll-container heights stay inline on purpose (deviation #16): a scroll
height is a per-instance layout choice, not a scale value.
The exceptions are data, not layout: SVG illustration fills, `background-image` URLs and
progress-bar widths that carry the value.

```html
<!-- Recommended -->
<div class="img-responsive img-responsive-21x9 card-img-top" style="background-image: url(…)"></div>
<div class="chart chart-lg">…</div>

<!-- Avoid -->
<div class="card-img-top" style="height: 8rem"></div>
<div class="chart" style="height: 128px; width: 350px">…</div>
```

### 19. Vertical rhythm is `mb-3` inside a card and `row-cards` between cards

One spacing step per level. Mixing `mb-3`, `mb-4` and `mt-3` in the same block gives uneven
gaps nobody chose. Today: 148 × `mb-3`, 46 × `mb-4`, 33 × `mt-3`, 27 × `mt-4`; the `mb-4`
left is mostly the auth and marketing cards, which use a wider rhythm on purpose.

```html
<!-- Recommended -->
<div class="row row-cards">
  <div class="md:col-6"><div class="card"><div class="card-body">
    <div class="mb-3">…</div>
    <div class="mb-3">…</div>
    <div>…</div>
  </div></div></div>
</div>

<!-- Avoid -->
<div class="card mb-4"><div class="card-body">
  <div class="mb-3">…</div>
  <div class="mt-4">…</div>
  <div class="mb-2 mt-3">…</div>
</div></div>
```

### 20. Colour means state

A coloured badge, dot or text says success, warning or danger. Colour used for decoration
makes real states invisible. Categorical colour (mail labels, calendar categories, tags) is
allowed when every item in the set gets one, as a dot or a soft `-lt` badge, never solid,
and the state colours are not reused for categories.

```html
<!-- Recommended -->
<span class="badge bg-success-lt">Active</span>
<span class="badge bg-danger-lt">Failed</span>
<span class="badge">Draft</span>

<!-- Avoid: a state colour on a category, and a solid badge for decoration -->
<span class="badge bg-success-lt">Marketing</span>
<span class="badge bg-purple">Sales</span>
```

### 21. Icons inherit colour inside controls, `gray-400` elsewhere

A button's icon is the button's text colour. A stand-alone icon is `--icon-color`.
Colouring an icon separately makes it read as a second control. Two exceptions: the on-state of
a toggle carries a state colour on purpose (rule 20) — that is what `.switch-icon-b` is for, and
`SwitchIcon` takes it as `activeColor` — and the sponsor heart, which carries the brand
(deviation #15).

```html
<!-- Recommended -->
<a href="#" class="btn btn-primary"><Icon name="plus" /> Create</a>
<Icon name="search" class="text-secondary" />
<button class="switch-icon" data-bs-toggle="switch-icon">
  <span class="switch-icon-a text-secondary"><Icon name="heart" /></span>
  <span class="switch-icon-b text-red"><Icon name="heart" class="icon-filled" /></span>
</button>

<!-- Avoid -->
<a href="#" class="btn"><Icon name="plus" class="text-primary" /> Create</a>
```

### 22. Uppercase only in `.subheader` and list-group headers

The framework uppercases `.subheader`, `.list-group-header`, avatar initials, ribbons, the
pagination "page" label and, through the `subheader()` mixin, table heads, `.dropdown-header`,
`.datagrid-title`, `.page-pretitle` and `.hr-text`. Nothing else, so `<th class="text-uppercase">`
is redundant. Today: 0 × `text-uppercase` in `preview/pages` and `shared/`.

```html
<!-- Recommended -->
<div class="subheader">Total revenue</div>
<div class="list-group-header">Today</div>

<!-- Avoid -->
<h3 class="card-title text-uppercase">Total revenue</h3>
<th class="text-uppercase">Status</th>
```

### 23. Empty states use `.empty`

The component gives the icon, title, hint and action the same spacing on every page. A
hand-written "No data" paragraph does not.

```html
<!-- Recommended -->
<Empty icon="database-off" title="No results found" description="Try adjusting your search or filter.">
  <a href="#" class="btn btn-primary">Clear filters</a>
</Empty>

<!-- Avoid -->
<div class="card-body text-center text-secondary py-5">No data</div>
```

### 24. Every `light-dark()` pair is checked in both modes before merge

A new colour token is not done when light mode looks right. Capture the page with
`screenshots/` (both modes come out of one run) or toggle `data-bs-theme="dark"` in the
preview and compare.

```scss
// Recommended
--note-bg: light-dark(var(--yellow-lt), color-mix(in oklab, var(--yellow) 15%, transparent));

// Avoid
--note-bg: #fff7dd;
```
