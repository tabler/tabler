---
title: Form helpers
summary: Use form helpers to provide additional information about a form element. You can use input help, required field, form hint, and additional info inside the label.
description: Provide additional guidance in forms.
---

## Input help

Use an input helper to display additional information about a form element. The text label will appear once a user hovers over the helper. To add an input helper, use the `.form-help` class.

```html
<span
  class="form-help"
  data-bs-toggle="popover"
  data-bs-placement="top"
  data-bs-html="true"
  data-bs-content="<p>...</p>"
  >?</span
>
```

Look at the example below to see how the input help works:

{% capture html -%}
<div>
  <label class="form-label">
    ZIP Code
    <span
      class="form-help"
      data-bs-toggle="popover"
      data-bs-placement="top"
      data-bs-html="true"
      data-bs-content="<p>ZIP Code must be US or CDN format. You can use an extended ZIP+4 code to determine address more accurately.</p><p class='mb-0'><a href=''>USP ZIP codes lookup tools</a></p>"
      >?</span
    >
  </label>
  <input type="text" class="form-control" placeholder="Your ZIP Code" />
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Required field

Use the `.required` class to indicate that a field is required. It will add a red asterisk to the label.

{% capture html -%}
<div>
  <label class="form-label required">Required</label>
  <input type="text" class="form-control" name="..." placeholder="Required..." />
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Form hint

Use a form hint to provide users with additional information about a form element. The text will appear below the input field. To add a form hint, use the `.form-hint` class.

```html
<div class="form-hint">We'll never share your email with anyone else.</div>
```

Look at the example below to see how the form hint works:

{% capture html -%}
<div>
  <label class="form-label">Email address</label>
  <input type="email" class="form-control" placeholder="Enter your email address" />
  <div class="form-hint">We'll never share your email with anyone else.</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Additional info inside label

Use the `.form-label-description` class to add additional information to the label. The text will appear next to the label. You can use it to add for example a character counter.

{% capture html -%}
<div>
  <label class="form-label">Textarea <span class="form-label-description">56/100</span> </label>
  <textarea class="form-control" name="" rows="3" placeholder="Content.."></textarea>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}