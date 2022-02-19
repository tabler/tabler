---
menu: docs.content.customize
title: Customize Tabler
description: Tabler has been designed so that it can be adjusted to your needs and requirements as much as possible. You can customize your own fonts, colors, font sizes, etc in it.
---

## Custom Google Font

To use a custom Google Fonts font in Tabler you must import the font in the `<head>` section of the page. In this example we will use the _Inter_ font:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Now you just need to tell Tabler to use your favorite font:

```html
<style>
body {
  --tblr-font-sans-serif: 'Inter';
}
</style>
```