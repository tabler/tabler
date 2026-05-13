# Badges

Based on `/preview/pages/badges.html` and `/shared/includes/ui/badge.html` in this repository.

## Base structure

```html
<span class="badge">Default</span>
```

## Colors

```html
<span class="badge bg-primary text-primary-fg">Primary</span>
<span class="badge bg-success text-success-fg">Success</span>
<span class="badge bg-warning text-warning-fg">Warning</span>
<span class="badge bg-danger text-danger-fg">Danger</span>
<span class="badge bg-info text-info-fg">Info</span>
<span class="badge bg-secondary text-secondary-fg">Secondary</span>
<span class="badge bg-dark text-dark-fg">Dark</span>
<span class="badge bg-light text-light-fg">Light</span>
```

### Badges light (background tint)
```html
<span class="badge bg-primary-lt">Primary</span>
<span class="badge bg-success-lt">Success</span>
<span class="badge bg-danger-lt">Danger</span>
```

### Outline badges
```html
<span class="badge badge-outline text-primary">Primary</span>
<span class="badge badge-outline text-success">Success</span>
```

## Sizes

```html
<span class="badge badge-sm">Small</span>
<span class="badge">Default (md)</span>
<span class="badge badge-lg">Large</span>
```

## With icon

```html
<span class="badge bg-primary text-primary-fg">
  <svg class="icon"><use xlink:href="#icon-star"/></svg>
  Primary
</span>
```

## Icon-only
```html
<span class="badge badge-icononly bg-primary text-primary-fg">
  <svg class="icon"><use xlink:href="#icon-star"/></svg>
</span>
```

## Positioned badges (notifications)

### Number
```html
<button type="button" class="btn">
  Notifications
  <span class="badge bg-secondary ms-2">4</span>
</button>
```

### Notification pill
```html
<button type="button" class="btn position-relative">
  Inbox
  <span class="badge bg-red badge-notification badge-pill">
    9+
    <span class="visually-hidden">unread messages</span>
  </span>
</button>
```

### Dot
```html
<button type="button" class="btn">
  Profile
  <span class="badge badge-dot bg-red badge-notification"></span>
</button>
```

### Blinking dot
```html
<button type="button" class="btn btn-icon">
  <svg class="icon"><use xlink:href="#icon-bell"/></svg>
  <span class="badge badge-dot bg-red badge-notification badge-blink"></span>
</button>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `badge` | Base |
| `badge-{size}` | Size (`sm`, `lg`) |
| `bg-{color}` | Background color |
| `text-{color}-fg` | Text color (foreground) |
| `bg-{color}-lt` | Light tint background |
| `badge-outline` | Outline style |
| `badge-icononly` | Icon only (no text) |
| `badge-pill` | Pill shape |
| `badge-dot` | Dot (no text) |
| `badge-blink` | Blink animation |
| `badge-notification` | Positioned for notifications |
| `badges-list` | Badge list container |
