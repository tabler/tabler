# Avatars

Based on `/preview/pages/avatars.html` and `/shared/includes/ui/avatar.html` in this repository.

## Base structure

```html
<span class="avatar">
  <svg class="icon"><use xlink:href="#icon-user"/></svg>
</span>
```

## Variants

### Placeholder (initials)
```html
<span class="avatar">JD</span>
```

### With image
```html
<span class="avatar" style="background-image: url(./static/avatars/001.jpg)"></span>
```

### With icon
```html
<span class="avatar">
  <svg class="icon"><use xlink:href="#icon-settings"/></svg>
</span>
```

### With background color (light tint)
```html
<span class="avatar bg-primary-lt">JD</span>
```

## Sizes

| Class | Size |
|-------|--------|
| `avatar-xxs` | 20px |
| `avatar-xs` | 24px |
| `avatar-sm` | 32px |
| `avatar-md` | 40px (default) |
| `avatar-lg` | 56px |
| `avatar-xl` | 64px |
| `avatar-2xl` | 128px |

```html
<span class="avatar avatar-sm">JD</span>
<span class="avatar avatar-lg">JD</span>
<span class="avatar avatar-xl">JD</span>
```

## Shapes

```html
<span class="avatar">JD</span>
<span class="avatar rounded-circle">JD</span>
<span class="avatar rounded-0">JD</span>
```

## With status dot

```html
<span class="avatar avatar-rounded">
  JD
  <span class="badge bg-red"></span>
</span>
```

Status colors: `red`, `green`, `blue`, `yellow`, `secondary`

## Avatar lists

### Basic list
```html
<div class="avatar-list">
  <span class="avatar">JD</span>
  <span class="avatar">JS</span>
</div>
```

### Stacked (overlapped)
```html
<div class="avatar-list avatar-list-stacked">
  <span class="avatar">JD</span>
  <span class="avatar">JS</span>
  <span class="avatar">BJ</span>
</div>
```

### With “more” link
```html
<div class="avatar-list avatar-list-stacked">
  <span class="avatar">JD</span>
  <span class="avatar">JS</span>
  <a class="avatar" href="#">
    <svg class="icon"><use xlink:href="#icon-plus"/></svg>
  </a>
</div>
```

## Avatar upload

```html
<label class="avatar avatar-xl" for="avatar-upload">
  <svg class="icon"><use xlink:href="#icon-plus"/></svg>
</label>
<input type="file" id="avatar-upload" class="d-none">
```

## Avatar brands

```html
<span class="avatar">
  <span class="avatar-brand" style="background-image: url(./static/brands/netflix.svg);"></span>
</span>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `avatar` | Base |
| `avatar-{size}` | Size |
| `avatar-rounded` | Border radius redondeado |
| `rounded-circle` | Perfect circle |
| `rounded-0` | No border radius |
| `bg-{color}-lt` | Background color light tint |
| `avatar-list` | List container |
| `avatar-list-stacked` | Overlapped avatars |
| `avatar-list-{size}` | Stacked size |
| `avatar-thumb` | Thumbnail style |
| `avatar-brand` | Brand logo inside the avatar |
| `avatar-icon` | Icon inside the avatar |
