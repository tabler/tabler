# Accordion

Based on `/preview/pages/accordion.html` in this repository.

## Base structure

```html
<div class="accordion" id="accordion-example">
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading-1">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapse-1" class="accordion-collapse collapse show" data-bs-parent="#accordion-example">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading-2">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapse-2" class="accordion-collapse collapse" data-bs-parent="#accordion-example">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default.
      </div>
    </div>
  </div>
</div>
```

## Variants

### Flush accordion (no borders)

```html
<div class="accordion accordion-flush" id="accordion-flush">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordion-flush">
      <div class="accordion-body">Content...</div>
    </div>
  </div>
</div>
```

### Always open (no auto-close)

Remove `data-bs-parent` attribute to keep items open when another is clicked:

```html
<div class="accordion" id="accordion-always-open">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-always-1">
        Always open item
      </button>
    </h2>
    <div id="collapse-always-1" class="accordion-collapse collapse show">
      <div class="accordion-body">This stays open when others are clicked.</div>
    </div>
  </div>
</div>
```

### With icon in header

```html
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-icon">
      <svg class="icon me-2"><use xlink:href="#icon-user"/></svg>
      User Settings
    </button>
  </h2>
  <div id="collapse-icon" class="accordion-collapse collapse show">
    <div class="accordion-body">Content with icon header...</div>
  </div>
</div>
```

## Inside a card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">FAQ</h3>
  </div>
  <div class="card-body">
    <div class="accordion accordion-flush">
      <!-- accordion items -->
    </div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `accordion` | Base wrapper |
| `accordion-item` | Single accordion item |
| `accordion-header` | Header container |
| `accordion-button` | Toggle button |
| `accordion-collapse` | Collapsible content wrapper |
| `accordion-body` | Content container |
| `accordion-flush` | No outer borders |
| `collapsed` | Collapsed state indicator |
| `show` | Expanded state |

## Data attributes

| Attribute | Purpose |
|-----------|---------|
| `data-bs-toggle="collapse"` | Activates collapse behavior |
| `data-bs-target` | Target collapse element |
| `data-bs-parent` | Parent accordion (for auto-close) |
| `aria-expanded` | Accessibility state |
