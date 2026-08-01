# Colors

Based on `/preview/pages/colors.html` in this repository.

## Base colors

Tabler provides a comprehensive color palette:

```html
<!-- Primary colors -->
<div class="bg-primary text-primary-fg">Primary</div>
<div class="bg-secondary text-secondary-fg">Secondary</div>
<div class="bg-success text-success-fg">Success</div>
<div class="bg-info text-info-fg">Info</div>
<div class="bg-warning text-warning-fg">Warning</div>
<div class="bg-danger text-danger-fg">Danger</div>
<div class="bg-light text-light-fg">Light</div>
<div class="bg-dark text-dark-fg">Dark</div>
```

## Extended color palette

```html
<!-- Blues -->
<div class="bg-blue text-blue-fg">Blue</div>
<div class="bg-azure text-azure-fg">Azure</div>
<div class="bg-indigo text-indigo-fg">Indigo</div>

<!-- Purples/Pinks -->
<div class="bg-purple text-purple-fg">Purple</div>
<div class="bg-pink text-pink-fg">Pink</div>

<!-- Warm colors -->
<div class="bg-red text-red-fg">Red</div>
<div class="bg-orange text-orange-fg">Orange</div>
<div class="bg-yellow text-yellow-fg">Yellow</div>

<!-- Greens -->
<div class="bg-lime text-lime-fg">Lime</div>
<div class="bg-green text-green-fg">Green</div>
<div class="bg-teal text-teal-fg">Teal</div>
<div class="bg-cyan text-cyan-fg">Cyan</div>
```

## Light tint variants (-lt suffix)

```html
<div class="bg-primary-lt">Primary Light</div>
<div class="bg-secondary-lt">Secondary Light</div>
<div class="bg-success-lt">Success Light</div>
<div class="bg-info-lt">Info Light</div>
<div class="bg-warning-lt">Warning Light</div>
<div class="bg-danger-lt">Danger Light</div>
<div class="bg-blue-lt">Blue Light</div>
<div class="bg-azure-lt">Azure Light</div>
<div class="bg-indigo-lt">Indigo Light</div>
<div class="bg-purple-lt">Purple Light</div>
<div class="bg-pink-lt">Pink Light</div>
<div class="bg-red-lt">Red Light</div>
<div class="bg-orange-lt">Orange Light</div>
<div class="bg-yellow-lt">Yellow Light</div>
<div class="bg-lime-lt">Lime Light</div>
<div class="bg-green-lt">Green Light</div>
<div class="bg-teal-lt">Teal Light</div>
<div class="bg-cyan-lt">Cyan Light</div>
```

## Text colors

```html
<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-success">Success text</p>
<p class="text-info">Info text</p>
<p class="text-warning">Warning text</p>
<p class="text-danger">Danger text</p>
<p class="text-light bg-dark">Light text</p>
<p class="text-dark">Dark text</p>
<p class="text-muted">Muted text</p>
<p class="text-body">Body text</p>
<p class="text-secondary">Secondary text</p>

<!-- Extended palette text -->
<p class="text-blue">Blue text</p>
<p class="text-azure">Azure text</p>
<p class="text-indigo">Indigo text</p>
<p class="text-purple">Purple text</p>
<p class="text-pink">Pink text</p>
<p class="text-red">Red text</p>
<p class="text-orange">Orange text</p>
<p class="text-yellow">Yellow text</p>
<p class="text-lime">Lime text</p>
<p class="text-green">Green text</p>
<p class="text-teal">Teal text</p>
<p class="text-cyan">Cyan text</p>
```

## Link colors

```html
<a href="#" class="link-primary">Primary link</a>
<a href="#" class="link-secondary">Secondary link</a>
<a href="#" class="link-success">Success link</a>
<a href="#" class="link-info">Info link</a>
<a href="#" class="link-warning">Warning link</a>
<a href="#" class="link-danger">Danger link</a>
<a href="#" class="link-light">Light link</a>
<a href="#" class="link-dark">Dark link</a>
```

## Border colors

```html
<div class="border border-primary p-3">Primary border</div>
<div class="border border-secondary p-3">Secondary border</div>
<div class="border border-success p-3">Success border</div>
<div class="border border-info p-3">Info border</div>
<div class="border border-warning p-3">Warning border</div>
<div class="border border-danger p-3">Danger border</div>
<div class="border border-light p-3">Light border</div>
<div class="border border-dark p-3">Dark border</div>
```

## Color utilities in components

### Buttons with colors

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-azure">Azure</button>
<button class="btn btn-indigo">Indigo</button>
<button class="btn btn-purple">Purple</button>
<button class="btn btn-pink">Pink</button>
<button class="btn btn-red">Red</button>
<button class="btn btn-orange">Orange</button>
<button class="btn btn-yellow">Yellow</button>
<button class="btn btn-lime">Lime</button>
<button class="btn btn-green">Green</button>
<button class="btn btn-teal">Teal</button>
<button class="btn btn-cyan">Cyan</button>
```

### Outline buttons

```html
<button class="btn btn-outline-primary">Outline Primary</button>
<button class="btn btn-outline-azure">Outline Azure</button>
<button class="btn btn-outline-purple">Outline Purple</button>
```

### Ghost buttons

```html
<button class="btn btn-ghost-primary">Ghost Primary</button>
<button class="btn btn-ghost-azure">Ghost Azure</button>
<button class="btn btn-ghost-purple">Ghost Purple</button>
```

### Badges with colors

```html
<span class="badge bg-blue-lt">Blue</span>
<span class="badge bg-azure-lt">Azure</span>
<span class="badge bg-indigo-lt">Indigo</span>
<span class="badge bg-purple-lt">Purple</span>
<span class="badge bg-pink-lt">Pink</span>
<span class="badge bg-red-lt">Red</span>
<span class="badge bg-orange-lt">Orange</span>
<span class="badge bg-yellow-lt">Yellow</span>
<span class="badge bg-lime-lt">Lime</span>
<span class="badge bg-green-lt">Green</span>
<span class="badge bg-teal-lt">Teal</span>
<span class="badge bg-cyan-lt">Cyan</span>
```

### Cards with colors

```html
<div class="card bg-primary-lt">
  <div class="card-body">
    <h3 class="card-title">Primary Light Card</h3>
    <p>This card uses the primary light background.</p>
  </div>
</div>

<div class="card">
  <div class="card-status-top bg-primary"></div>
  <div class="card-body">
    <h3 class="card-title">Card with status</h3>
  </div>
</div>
```

### Alerts with colors

```html
<div class="alert alert-primary">Primary alert</div>
<div class="alert alert-azure">Azure alert</div>
<div class="alert alert-indigo">Indigo alert</div>
<div class="alert alert-purple">Purple alert</div>
<div class="alert alert-pink">Pink alert</div>
<div class="alert alert-red">Red alert</div>
<div class="alert alert-orange">Orange alert</div>
<div class="alert alert-yellow">Yellow alert</div>
<div class="alert alert-lime">Lime alert</div>
<div class="alert alert-green">Green alert</div>
<div class="alert alert-teal">Teal alert</div>
<div class="alert alert-cyan">Cyan alert</div>
```

## CSS Variables

Tabler uses CSS custom properties for colors:

```css
/* Primary colors */
--tblr-primary: #206bc4;
--tblr-secondary: #667382;
--tblr-success: #2fb344;
--tblr-info: #4299e1;
--tblr-warning: #f76707;
--tblr-danger: #d63939;
--tblr-light: #fcfdfe;
--tblr-dark: #182433;

/* Extended palette */
--tblr-blue: #206bc4;
--tblr-azure: #4299e1;
--tblr-indigo: #4263eb;
--tblr-purple: #ae3ec9;
--tblr-pink: #d6336c;
--tblr-red: #d63939;
--tblr-orange: #f76707;
--tblr-yellow: #f59f00;
--tblr-lime: #74b816;
--tblr-green: #2fb344;
--tblr-teal: #0ca678;
--tblr-cyan: #17a2b8;
```

## Color opacity

```html
<div class="bg-primary bg-opacity-10">10% opacity</div>
<div class="bg-primary bg-opacity-25">25% opacity</div>
<div class="bg-primary bg-opacity-50">50% opacity</div>
<div class="bg-primary bg-opacity-75">75% opacity</div>
<div class="bg-primary bg-opacity-100">100% opacity</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `bg-{color}` | Background color |
| `bg-{color}-lt` | Light tint background |
| `bg-{color}-fg` | Foreground/text color for contrast |
| `text-{color}` | Text color |
| `link-{color}` | Link color |
| `border-{color}` | Border color |
| `btn-{color}` | Button color |
| `btn-outline-{color}` | Outline button |
| `btn-ghost-{color}` | Ghost button |
| `alert-{color}` | Alert color |
| `table-{color}` | Table color |
| `bg-opacity-{10,25,50,75,100}` | Background opacity |
