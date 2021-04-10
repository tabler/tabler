---
title: Download
menu: docs.base.download
description: Download Tabler to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm, yarn and more.
---


## CDN via unpkg

All files included in `{{ site.npm-package }}` npm package are available over a unpkg CDN. Use it to deliver cached version of Tabler’s compiled CSS and JS to your project.

```html
<script src="https://unpkg.com/{{ site.npm-package }}@{{ site.data.package.version }}/dist/js/tabler.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/{{ site.npm-package }}@{{ site.data.package.version }}/dist/css/tabler.min.css">
```

You can also include additional Tabler plugins:

```html
{% removeemptylines %}
{% for plugin in site.tabler-css-plugins %}
<link rel="stylesheet" href="https://unpkg.com/{{ site.npm-package }}@{{ site.data.package.version }}/dist/css/{{ plugin }}.min.css">
{% endfor %}
{% endremoveemptylines %}
```

## Package managers

Install Tabler in your Node.js powered apps with the npm package:

```
npm install {{ site.npm-package }}
```