# Steps

Based on `/preview/pages/steps.html` and `/shared/includes/ui/steps.html` in this repository.

## Base structure

```html
<ul class="steps steps-green my-4">
  <li class="step-item">1</li>
  <li class="step-item active">2</li>
  <li class="step-item">3</li>
</ul>
```

## Variants

### With counter (automatic numbers)
```html
<ul class="steps steps-green steps-counter my-4">
  <li class="step-item"></li>
  <li class="step-item active"></li>
  <li class="step-item"></li>
</ul>
```

### With text
```html
<ul class="steps steps-green steps-counter my-4">
  <li class="step-item">Cart</li>
  <li class="step-item active">Billing Information</li>
  <li class="step-item">Confirmation</li>
</ul>
```

### Vertical
```html
<ul class="steps steps-vertical">
  <li class="step-item">
    <div class="h4 m-0">Order received</div>
    <div class="text-secondary">Lorem ipsum dolor sit amet.</div>
  </li>
  <li class="step-item active">
    <div class="h4 m-0">Out for delivery</div>
    <div class="text-secondary">Lorem ipsum dolor sit amet.</div>
  </li>
  <li class="step-item">
    <div class="h4 m-0">Finalized</div>
  </li>
</ul>
```

### Vertical with counter
```html
<ul class="steps steps-counter steps-vertical">
  <li class="step-item">Step one</li>
  <li class="step-item active">Step two</li>
  <li class="step-item">Step three</li>
</ul>
```

### Breadcrumb-style
```html
<ol class="breadcrumb breadcrumb-arrows">
  <li class="breadcrumb-item"><a href="#">Step one</a></li>
  <li class="breadcrumb-item active"><a href="#">Step two</a></li>
  <li class="breadcrumb-item disabled">Step three</li>
</ol>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `steps` | Steps container |
| `steps-{color}` | Color (green, blue, red, etc.) |
| `steps-counter` | Automatic numbering |
| `steps-vertical` | Vertical layout |
| `step-item` | Individual step |
| `step-item.active` | Active step |
| `breadcrumb-arrows` | Breadcrumb style with arrows |
| `breadcrumb-muted` | Muted breadcrumb style |
