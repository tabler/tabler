---
title: SvelteKit
order: 10
summary: Set up Tabler in SvelteKit and build a first working page.
description: Install `@tabler/core`, import CSS and optional JS in SvelteKit, and render a minimal page layout with a Tabler card.
---

Use this guide to integrate Tabler in a SvelteKit app.

Tabler works with any framework as markup + CSS; JS is only needed for interactive components.

<div class="steps steps-vertical">

### Install Tabler package

Install `@tabler/core` with your preferred package manager:

{% include "docs/tabs-package.html" name="@tabler/core" %}

You can also use CDN files when you need a quick setup:

```html
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler.min.css" />
<script src="{{ cdnUrl }}/dist/js/tabler.min.js"></script>
```

### Import styles

Import Tabler CSS once in your global stylesheet (`src/app.css`):

```scss
@import "@tabler/core/dist/css/tabler.min.css";
```

For full theme customization, import SCSS sources instead:

```scss
@import "@tabler/core/scss/tabler";
```

`@tabler/core` does not define `exports`, so deep imports work in common SvelteKit setups.

### Import and initialize JavaScript

Tabler JavaScript is required for interactive components such as dropdowns, modals, and tooltips.

In SvelteKit, load `tabler.min.js` only on the client:

```js
import { browser } from "$app/environment";

if (browser) {
  await import("@tabler/core/dist/js/tabler.min.js");
}
```

SvelteKit-specific note: `tabler.min.js` accesses `document`, so importing it during SSR can cause
`document is not defined`.

### Minimal working example

Create a simple `src/routes/+layout.svelte` that loads global styles:

```html
<script>
  import "../app.css";
</script>

<slot />
```

Then add a minimal page in `src/routes/+page.svelte`:

```html
<script>
  import { browser } from "$app/environment";

  if (browser) {
    import("@tabler/core/dist/js/tabler.min.js");
  }
</script>

<div class="page">
  <div class="page-wrapper">
    <div class="container-xl py-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">SvelteKit + Tabler</h3>
          <p class="text-secondary mb-0">Your Tabler setup is working.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

Run the app:

```shell
npm run dev
```

Open the local SvelteKit URL and confirm the card is styled with Tabler.

### Next steps

- Continue with [Customize](/ui/getting-started/customize) to adjust styles and build setup.
- Explore [Layout](/ui/layout) to choose page structures.
- Browse [Components](/ui/components) to add UI building blocks.

</div>
