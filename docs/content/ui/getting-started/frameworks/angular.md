---
title: Angular
order: 5
summary: Set up Tabler in Angular and build a first working page.
description: Install `@tabler/core`, register CSS and JS in `angular.json`, and render a minimal Angular page with a Tabler card.
---

Use this guide to integrate Tabler in an Angular app.

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

Register Tabler CSS in the Angular build config (`angular.json`) under `projects.<app>.architect.build.options.styles`:

```json
{
  "styles": [
    "src/styles.scss",
    "node_modules/@tabler/core/dist/css/tabler.min.css"
  ]
}
```

For full theme customization, import SCSS sources in `src/styles.scss`:

```scss
@import "@tabler/core/scss/tabler";
```

`@tabler/core` does not define `exports`, so deep imports work in Angular CLI builds.

### Import and initialize JavaScript

Tabler JavaScript is required for interactive components such as dropdowns, modals, and tooltips.
Register it in `angular.json` under `projects.<app>.architect.build.options.scripts`:

```json
{
  "scripts": [
    "node_modules/@tabler/core/dist/js/tabler.min.js"
  ]
}
```

Angular-specific note: use `angular.json` for global CSS and JS registration so assets are included
in both development and production builds.

### Minimal working example

Use a simple root component template in `src/app/app.component.html`:

```html
<div class="page">
  <div class="page-wrapper">
    <div class="container-xl py-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Angular + Tabler</h3>
          <p class="text-secondary mb-0">Your Tabler setup is working.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

A minimal `angular.json` example (relevant part):

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.scss",
              "node_modules/@tabler/core/dist/css/tabler.min.css"
            ],
            "scripts": [
              "node_modules/@tabler/core/dist/js/tabler.min.js"
            ]
          }
        }
      }
    }
  }
}
```

Run the app:

```shell
npm run start
```

Open the local Angular URL and confirm the card is styled with Tabler.

### Next steps

- Continue with [Customize](/ui/getting-started/customize) to adjust styles and build setup.
- Explore [Layout](/ui/layout) to choose page structures.
- Browse [Components](/ui/components) to add UI building blocks.

</div>
