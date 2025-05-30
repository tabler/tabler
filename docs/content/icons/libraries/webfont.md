---
title: Webfont
description: Tabler Icons as a webfont.
summary: Tabler Icons as a webfont allows you to easily include icons in your projects using simple CSS classes, offering a lightweight and scalable solution for web development.
---

![](/img/icons/package-webfont.png)


## Installation

{% include "docs/tabs-package.html" name="@tabler/icons-webfont" %}

or just [download from Github](https://github.com/tabler/tabler-icons/releases).

### CDN

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@$ICONS_VERSION/dist/tabler-icons.min.css"
/>
```

Instead of a specific version, you can use `latest` to always get the newest icons.

## Usage

### HTML

```html
<i class="ti ti-brand-tabler"></i>
```

### CSS

```css
content: 'ec8f';
```


### SCSS

```scss
content: $ti-icon-brand-tabler;
```
