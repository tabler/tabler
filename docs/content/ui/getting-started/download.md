---
title: Download
summary: Download Tabler to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm, yarn and more.
description: Get Tabler CSS, JS, and source code.
---

## CDN via jsDelivr

All files included in the `@tabler/core` npm package are available over a jsDelivr CDN. Use it to deliver cached versions of Tabler’s compiled CSS and JS to your project.

```html
<script src="{{ cdnUrl }}/dist/js/tabler.min.js"></script>
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler.min.css" />
```

You can also include additional Tabler plugins:

```html
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-flags.min.css" />
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-payments.min.css" />
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-social.min.css" />
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-vendors.min.css" />
```

## Package managers

Install Tabler in your Node.js powered apps with the npm package:

{% include "docs/tabs-package.html" name="@tabler/core" %}

Tabler uses other packages to enhance its functionality - for example, charts and input masks. These are not automatically installed to avoid huge
dependency trees and need to be installed by using npm install. We support the following packages as of writing.

- [apexcharts](https://apexcharts.com/)
- [autosize](http://www.jacklmoore.com/autosize/)
- [choices.js](https://github.com/Choices-js/Choices)
- [countup.js](https://inorganik.github.io/countUp.js/)
- [flatpickr](https://flatpickr.js.org/)
- [imask](https://imask.js.org/)
- [litepicker](https://litepicker.com/)
- [nouislider](https://refreshless.com/nouislider/)
- [tom-select](https://tom-select.js.org/)

For the complete list of supported packages you can check the peerDependencies section in our [package.json](https://github.com/tabler/tabler/blob/dev/package.json)