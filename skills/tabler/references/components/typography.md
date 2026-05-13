# Typography

Based on `/preview/pages/typography.html` in this repository.

## Headings

```html
<h1>H1 Heading</h1>
<h2>H2 Heading</h2>
<h3>H3 Heading</h3>
<h4>H4 Heading</h4>
<h5>H5 Heading</h5>
<h6>H6 Heading</h6>
```

### Display headings (larger)

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>
```

### Subheadings

```html
<div class="subheader">Subheader text</div>
<div class="subheader mb-2">With margin bottom</div>
```

## Paragraphs

```html
<p>Regular paragraph text.</p>
<p class="lead">Lead paragraph (larger, prominent).</p>
<p class="text-muted">Muted/secondary text.</p>
```

## Text alignment

```html
<p class="text-start">Left aligned text.</p>
<p class="text-center">Center aligned text.</p>
<p class="text-end">Right aligned text.</p>
```

## Text transforms

```html
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
```

## Font weight

```html
<p class="fw-light">Light weight text.</p>
<p class="fw-normal">Normal weight text.</p>
<p class="fw-medium">Medium weight text.</p>
<p class="fw-semibold">Semibold weight text.</p>
<p class="fw-bold">Bold text.</p>
```

## Text colors

```html
<p class="text-primary">Primary text color.</p>
<p class="text-secondary">Secondary text color.</p>
<p class="text-success">Success text color.</p>
<p class="text-info">Info text color.</p>
<p class="text-warning">Warning text color.</p>
<p class="text-danger">Danger text color.</p>
<p class="text-light bg-dark">Light text on dark.</p>
<p class="text-dark">Dark text.</p>
<p class="text-muted">Muted text.</p>
```

### Custom colors

```html
<p class="text-blue">Blue text.</p>
<p class="text-azure">Azure text.</p>
<p class="text-indigo">Indigo text.</p>
<p class="text-purple">Purple text.</p>
<p class="text-pink">Pink text.</p>
<p class="text-red">Red text.</p>
<p class="text-orange">Orange text.</p>
<p class="text-yellow">Yellow text.</p>
<p class="text-lime">Lime text.</p>
<p class="text-green">Green text.</p>
<p class="text-teal">Teal text.</p>
<p class="text-cyan">Cyan text.</p>
```

## Links

```html
<a href="#">Standard link</a>
<a href="#" class="link-primary">Primary link</a>
<a href="#" class="link-secondary">Secondary link</a>
<a href="#" class="link-success">Success link</a>
<a href="#" class="link-danger">Danger link</a>
<a href="#" class="link-underline">Underlined link</a>
```

## Lists

### Unordered

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### Ordered

```html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
```

### Unstyled

```html
<ul class="list-unstyled">
  <li>First item</li>
  <li>Second item</li>
</ul>
```

### Inline

```html
<ul class="list-inline">
  <li class="list-inline-item">First</li>
  <li class="list-inline-item">Second</li>
  <li class="list-inline-item">Third</li>
</ul>
```

## Blockquotes

```html
<blockquote class="blockquote">
  <p>A well-known quote, contained in a blockquote element.</p>
</blockquote>

<blockquote class="blockquote">
  <p>Quoted text here.</p>
  <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

## Horizontal rules

```html
<hr>
<hr class="hr">
<hr class="hr-dashed">
```

## Text utilities

### Text wrapping and overflow

```html
<p class="text-wrap">Text that wraps normally.</p>
<p class="text-nowrap">Text that does not wrap.</p>
<p class="text-truncate">Text that truncates with ellipsis...</p>
<p class="text-break">LongTextThatBreaksAtAnyCharacterToPreventOverflow</p>
```

### Font size

```html
<p class="fs-1">Font size 1</p>
<p class="fs-2">Font size 2</p>
<p class="fs-3">Font size 3</p>
<p class="fs-4">Font size 4</p>
<p class="fs-5">Font size 5</p>
<p class="fs-6">Font size 6</p>
```

### Line height

```html
<p class="lh-1">Line height 1</p>
<p class="lh-sm">Small line height</p>
<p class="lh-base">Base line height</p>
<p class="lh-lg">Large line height</p>
```

## Code and preformatted text

```html
<p>Inline code: <code>&lt;section&gt;</code></p>
<p>Keyboard input: <kbd>Ctrl</kbd> + <kbd>S</kbd></p>
<pre><code>&lt;p&gt;Sample code block&lt;/p&gt;</code></pre>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `display-1` to `display-6` | Large display headings |
| `subheader` | Subheading style |
| `lead` | Prominent paragraph |
| `text-muted` | Muted/secondary text |
| `text-start/center/end` | Text alignment |
| `text-lowercase/uppercase/capitalize` | Text transform |
| `fw-light/normal/medium/semibold/bold` | Font weight |
| `text-{color}` | Text color |
| `link-{color}` | Link color |
| `list-unstyled` | Remove list styling |
| `list-inline` / `list-inline-item` | Horizontal list |
| `blockquote` / `blockquote-footer` | Blockquote styling |
| `hr` / `hr-dashed` | Horizontal rule |
| `text-wrap/nowrap/truncate/break` | Text overflow |
| `fs-1` to `fs-6` | Font size |
| `lh-1/sm/base/lg` | Line height |
| `text-decoration-none/underline/line-through` | Text decoration |
