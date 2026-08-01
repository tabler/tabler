# Buttons

Based on `/preview/pages/buttons.html` and `/shared/includes/ui/button.html` in this repository.

## Base structure

Tabler uses `<a>` as the default element for buttons (also compatible with `<button>`).

```html
<a class="btn" href="#">Default</a>
<a class="btn btn-primary" href="#">Primary</a>
<a class="btn btn-secondary" href="#">Secondary</a>
<a class="btn btn-success" href="#">Success</a>
<a class="btn btn-warning" href="#">Warning</a>
<a class="btn btn-danger" href="#">Danger</a>
<a class="btn btn-info" href="#">Info</a>
```

## Variants

### Outline
```html
<a class="btn btn-outline btn-primary" href="#">Primary</a>
<a class="btn btn-outline btn-success" href="#">Success</a>
```

### Ghost
```html
<a class="btn btn-ghost btn-primary" href="#">Primary</a>
<a class="btn btn-ghost btn-secondary" href="#">Secondary</a>
```

### Square
```html
<a class="btn btn-square btn-primary" href="#">
  <svg class="icon"><use xlink:href="#icon-star"/></svg>
  Primary
</a>
```

### Pill
```html
<a class="btn btn-pill btn-primary" href="#">
  <svg class="icon"><use xlink:href="#icon-star"/></svg>
  Primary
</a>
```

## Sizes

```html
<a class="btn btn-sm" href="#">Small</a>
<a class="btn" href="#">Default</a>
<a class="btn btn-lg" href="#">Large</a>
<a class="btn btn-xl" href="#">Extra large</a>
```

## Icon buttons

```html
<a class="btn btn-icon" href="#" aria-label="Settings">
  <svg class="icon"><use xlink:href="#icon-settings"/></svg>
</a>
```

## Action buttons

```html
<div class="btn-actions">
  <a class="btn btn-action" href="#">
    <svg class="icon"><use xlink:href="#icon-edit"/></svg>
  </a>
  <a class="btn btn-action" href="#">
    <svg class="icon"><use xlink:href="#icon-copy"/></svg>
  </a>
</div>
```

## Button list (group with spacing)

```html
<div class="btn-list">
  <a class="btn btn-primary" href="#">Save</a>
  <a class="btn" href="#">Cancel</a>
</div>
```

## Animated icon buttons

```html
<a class="btn btn-animate-icon" href="#">
  Save <svg class="icon icon-end"><use xlink:href="#icon-arrow-right"/></svg>
</a>
<a class="btn btn-animate-icon btn-animate-icon-rotate" href="#">
  <svg class="icon"><use xlink:href="#icon-plus"/></svg> Add
</a>
<a class="btn btn-animate-icon btn-animate-icon-shake" href="#">
  <svg class="icon"><use xlink:href="#icon-bell"/></svg> Notifications
</a>
<a class="btn btn-animate-icon btn-animate-icon-pulse" href="#">
  <svg class="icon"><use xlink:href="#icon-heart"/></svg> Love
</a>
<a class="btn btn-animate-icon btn-animate-icon-tada" href="#">
  <svg class="icon"><use xlink:href="#icon-check"/></svg> Confirm
</a>
<a class="btn btn-animate-icon btn-animate-icon-move-start" href="#">
  <svg class="icon"><use xlink:href="#icon-chevron-left"/></svg> Previous
</a>
```

## Button groups

```html
<div class="btn-group" role="group">
  <button type="button" class="btn">Left</button>
  <button type="button" class="btn">Middle</button>
  <button type="button" class="btn">Right</button>
</div>

<div class="btn-group-vertical" role="group">
  <button type="button" class="btn">Top</button>
  <button type="button" class="btn">Middle</button>
  <button type="button" class="btn">Bottom</button>
</div>

<div class="btn-toolbar" role="toolbar">
  <div class="btn-group me-2" role="group">
    <button type="button" class="btn">1</button>
    <button type="button" class="btn">2</button>
  </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn">3</button>
    <button type="button" class="btn">4</button>
  </div>
</div>
```

## Social colors

```html
<a class="btn btn-github">
  <svg class="icon"><use xlink:href="#icon-brand-github"/></svg> GitHub
</a>
<a class="btn btn-twitter">
  <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg> Twitter
</a>
```

## Extra colors

Additional colors: `blue`, `azure`, `indigo`, `purple`, `pink`, `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cyan`

```html
<a class="btn btn-blue" href="#">Blue</a>
<a class="btn btn-teal" href="#">Teal</a>
```

## Link button
```html
<a class="btn btn-link" href="#">Link</a>
```

## Loading/disabled states

```html
<a class="btn btn-loading" href="#">Loading...</a>
<a class="btn disabled" href="#" tabindex="-1">Disabled</a>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `btn` | Base |
| `btn-{color}` | Color (primary, secondary, success, warning, danger, info) |
| `btn-outline btn-{color}` | Outline |
| `btn-ghost btn-{color}` | Ghost/transparent |
| `btn-square` | No border radius |
| `btn-pill` | Full border radius |
| `btn-sm`, `btn-lg`, `btn-xl` | Sizes |
| `btn-icon` | Icon only |
| `btn-action` | Small action button |
| `btn-link` | Link style |
| `btn-loading` | Loading state |
| `btn-animate-icon` | Icon animation |
| `btn-animate-icon-rotate` | Rotation |
| `btn-animate-icon-shake` | Shake |
| `btn-animate-icon-pulse` | Pulse |
| `btn-animate-icon-tada` | Tada animation |
| `btn-animate-icon-move-start` | Move left |
| `btn-list` | Button container with spacing |
| `btn-actions` | Action button container |
| `btn-group` | Button group |
| `btn-group-vertical` | Vertical group |
| `btn-toolbar` | Toolbar |
