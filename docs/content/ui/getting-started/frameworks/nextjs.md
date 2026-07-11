---
title: Next.js
order: 3
summary: Set up Tabler in Next.js and build a first working page.
description: Install `@tabler/core`, import CSS and JS in Next.js, and render a minimal page layout with a Tabler card.
---

Use this guide to integrate Tabler in a Next.js app.

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

Import Tabler CSS once in your global stylesheet (`app/globals.css`):

```scss
@import '@tabler/core/dist/css/tabler.min.css';
```

For full theme customization, import SCSS sources:

```scss
@import '@tabler/core/scss/tabler';
```

`@tabler/core` does not define `exports`, so deep imports work in common Next.js setups.

### Import and initialize JavaScript

Tabler JavaScript is required for interactive components such as dropdowns, modals, and tooltips.

Next.js-specific note: `tabler.min.js` accesses `document`, so load it only on the client. If you import it during SSR, Next.js throws `document is not defined`.

Use a client component and dynamic import:

```jsx
'use client'

import { useEffect } from 'react'

export function TablerScripts() {
  useEffect(() => {
    import('@tabler/core/dist/js/tabler.min.js')
  }, [])

  return null
}
```

### Minimal working example

Load styles globally and mount client-only scripts in the app layout.

`app/layout.jsx`:

```jsx
import './globals.css'
import { TablerScripts } from './tabler-scripts'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TablerScripts />
        {children}
      </body>
    </html>
  )
}
```

`app/page.jsx`:

```jsx
export default function Page() {
  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="container-xl py-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Next.js + Tabler</h3>
              <p className="text-secondary mb-0">Your Tabler setup is working.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

Run the app:

```shell
npm run dev
```

Open the local Next.js URL and confirm the card is styled with Tabler.

### Next steps

- Continue with [Customize](/ui/getting-started/customize) to adjust styles and build setup.
- Explore [Layout](/ui/layout) to choose page structures.
- Browse [Components](/ui/components) to add UI building blocks.

</div>
