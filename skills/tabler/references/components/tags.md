# Tags / Chips

Based on `/preview/pages/tags.html` in this repository.

## Base structure

```html
<span class="tag">Simple tag</span>
<a href="#" class="tag">Link tag</a>
```

## Variants

### Colors

```html
<span class="tag">Default</span>
<span class="tag tag-blue">Blue</span>
<span class="tag tag-azure">Azure</span>
<span class="tag tag-indigo">Indigo</span>
<span class="tag tag-purple">Purple</span>
<span class="tag tag-pink">Pink</span>
<span class="tag tag-red">Red</span>
<span class="tag tag-orange">Orange</span>
<span class="tag tag-yellow">Yellow</span>
<span class="tag tag-lime">Lime</span>
<span class="tag tag-green">Green</span>
<span class="tag tag-teal">Teal</span>
<span class="tag tag-cyan">Cyan</span>
```

### Status colors (semantic)

```html
<span class="tag tag-primary">Primary</span>
<span class="tag tag-secondary">Secondary</span>
<span class="tag tag-success">Success</span>
<span class="tag tag-info">Info</span>
<span class="tag tag-warning">Warning</span>
<span class="tag tag-danger">Danger</span>
<span class="tag tag-light">Light</span>
<span class="tag tag-dark">Dark</span>
```

### Light/ghost tags

```html
<span class="tag tag-blue-lt">Blue light</span>
<span class="tag tag-green-lt">Green light</span>
<span class="tag tag-red-lt">Red light</span>
```

### Outline tags

```html
<span class="tag tag-outline tag-blue">Blue outline</span>
<span class="tag tag-outline tag-green">Green outline</span>
```

### With icon

```html
<span class="tag tag-green">
  <svg class="icon tag-icon"><use xlink:href="#icon-check"/></svg>
  Verified
</span>
```

### With avatar

```html
<span class="tag tag-azure">
  <span class="tag-avatar avatar avatar-xs" style="background-image: url(...)"></span>
  John Doe
</span>

<span class="tag tag-primary">
  <span class="tag-avatar avatar avatar-xs">JL</span>
  Jane Lee
</span>
```

### Dismissible tags

```html
<span class="tag">
  Tag
  <a href="#" class="btn-close"></a>
</span>

<span class="tag tag-blue">
  <svg class="icon tag-icon"><use xlink:href="#icon-user"/></svg>
  User
  <a href="#" class="btn-close"></a>
</span>
```

### Tags list

```html
<div class="tags-list">
  <span class="tag">First</span>
  <span class="tag">Second</span>
  <span class="tag">Third</span>
  <span class="tag tag-outline">+ Add</span>
</div>
```

### Input-style tags (for forms)

```html
<div class="form-selectgroup">
  <label class="form-selectgroup-item">
    <input type="checkbox" name="tags" value="html" class="form-selectgroup-input" checked>
    <span class="form-selectgroup-label">HTML</span>
  </label>
  <label class="form-selectgroup-item">
    <input type="checkbox" name="tags" value="css" class="form-selectgroup-input" checked>
    <span class="form-selectgroup-label">CSS</span>
  </label>
  <label class="form-selectgroup-item">
    <input type="checkbox" name="tags" value="js" class="form-selectgroup-input">
    <span class="form-selectgroup-label">JavaScript</span>
  </label>
</div>
```

### Pill-style tags

```html
<span class="tag tag-pill tag-blue">Pill tag</span>
<span class="tag tag-pill tag-green">Pill green</span>
```

## Inside a card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Skills</h3>
  </div>
  <div class="card-body">
    <div class="tags-list">
      <span class="tag tag-blue">JavaScript</span>
      <span class="tag tag-azure">TypeScript</span>
      <span class="tag tag-green">Node.js</span>
      <span class="tag tag-purple">React</span>
    </div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `tag` | Base tag |
| `tag-{color}` | Color variant |
| `tag-{color}-lt` | Light/ghost variant |
| `tag-outline` | Outline style |
| `tag-pill` | Pill/border-radius variant |
| `tag-icon` | Icon inside tag |
| `tag-avatar` | Avatar inside tag |
| `tags-list` | Container for multiple tags |
| `form-selectgroup` | Checkbox/radio tag group |
| `form-selectgroup-item` | Single selectable tag |
| `form-selectgroup-input` | Hidden input |
| `form-selectgroup-label` | Visible tag label |
