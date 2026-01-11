---
title: Customize Tabler
summary: Tabler has been designed so that it can be adjusted to your needs and requirements as much as possible. You can customize your own fonts, colors, font sizes, etc in it.
description: Adjust fonts, colors, and styles.	
---

## Custom Google Font

To use a custom Google Fonts font in Tabler you must import the font in the `<head>` section of the page. In this example we will use the _Inter_ font:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
```

Now you just need to tell Tabler to use your favorite font:

```html
<style>
  :root {
    --tblr-font-sans-serif: "Inter";
  }
</style>
```

## Custom font sizes

Tabler exposes typography settings as CSS variables. You can override them by setting variables on `:root` (global) or on any container (scoped).

### Base font size

To change the default font size used by body text and many components, override `--tblr-body-font-size`:

```html
<style>
  :root {
    --tblr-body-font-size: 1rem;
  }
</style>
```

### Headings

Headings use `--tblr-font-size-h1` … `--tblr-font-size-h6` and `--tblr-line-height-h1` … `--tblr-line-height-h6`:

```html
<style>
  :root {
    --tblr-font-size-h1: 2rem;
    --tblr-line-height-h1: 2.5rem;
  }
</style>
```

## Custom primary color

To change the primary color of Tabler you need to set the `--tblr-primary` variable in your CSS. You can use any color format you like (hex, rgb, hsl, etc). In this example we will use a custom red color:

```html
<style>
  :root {
    --tblr-primary: #f11d46;
  }
</style>
```

If you use `--tblr-primary` in `rgba()` contexts (or see inconsistent colors), also override `--tblr-primary-rgb` (as comma-separated RGB values) and optionally `--tblr-primary-fg` (text/icon color used on primary backgrounds):

```html
<style>
  :root {
    --tblr-primary: #f11d46;
    --tblr-primary-rgb: 241, 29, 70;
    --tblr-primary-fg: #fff;
  }
</style>
```

## Other system colors

Tabler also exposes a few "system" colors you can customize globally:

```html
<style>
  :root {
    --tblr-secondary: #6b7280;
    --tblr-tertiary: #9ca3af;
    --tblr-link-color: #066fd1;
    --tblr-link-hover-color: #045db0;
  }
</style>
```

### Gray scale

You can override the full gray palette (`--tblr-gray-50` … `--tblr-gray-950`) to match your brand:

```html
<style>
  :root {
    --tblr-gray-50: #f9fafb;
    --tblr-gray-100: #f3f4f6;
    --tblr-gray-200: #e5e7eb;
    --tblr-gray-300: #d1d5db;
    --tblr-gray-400: #9ca3af;
    --tblr-gray-500: #6b7280;
    --tblr-gray-600: #4b5563;
    --tblr-gray-700: #374151;
    --tblr-gray-800: #1f2937;
    --tblr-gray-900: #111827;
    --tblr-gray-950: #030712;
  }
</style>
```
