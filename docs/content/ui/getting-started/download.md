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

## 3rd-party Libraries

Tabler uses other packages to enhance its functionality - for example, charts and input masks. These are not automatically installed to avoid huge
dependency trees and need to be installed by using `npm install`. The full list of recommended libraries is available on the 
[3rd-party Libraries & Resources](/ui/getting-started/references) page. 
For the most recent list of supported packages, you can also check the [libs.json](https://github.com/tabler/tabler/blob/dev/core/libs.json) file.