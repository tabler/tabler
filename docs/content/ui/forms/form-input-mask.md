---
title: Input mask
summary: An input mask is used to clarify the input format required in a given field and is helpful for users, removing confusion and reducing the number of validation errors.
description: Clarify input formats for users.
docs-libs: imask
---

## Installation

To be able to use the input mask in your application you will need to install the imask dependency. You can do this by running the following command:

{% include "docs/tabs-package.html" name="imask" %}

And import or require:

```javascript
import IMask from 'imask';
```

You can also use the CDN link to include the script in your project:

```html
<script src="https://cdn.jsdelivr.net/npm/imask"></script>
```

If you struggle with the installation, you can find more information in the [IMask documentation](https://imask.js.org/guide.html#installation).

## Default markup

Use an input mask in the fields where users have to enter their phone number, to make the formatting rules clear and help them avoid confusion.

To create an input mask, add the `data-mask` attribute to the input element:

```html
<input
  type="text"
  name="input-mask"
  class="form-control"
  data-mask="(00) 0000-0000"
  placeholder="(00) 0000-0000"
  autocomplete="off"
/>
```

Look at the example below to see how the input mask works:

{% capture html -%}
<label class="form-label">Telephone mask</label>
<input
  type="text"
  name="input-mask"
  class="form-control"
  data-mask="(00) 0000-0000"
  data-mask-visible="true"
  placeholder="(00) 0000-0000"
  autocomplete="off"
/>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## More examples

If you need more examples of input masks, you can find them in the [IMask documentation](https://imask.js.org/guide.html#masked-input).