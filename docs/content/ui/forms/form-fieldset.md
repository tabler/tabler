---
title: Form fieldset
summary: By grouping form elements together with the fieldset element, you can improve the organization and accessibility of your forms, making it easier for users to understand the purpose of each input and provide accurate information.
description: Group form elements for clarity.
---

## Default markup

Group parts of your form to make it well-structured and clearer for users, using the `fieldset` element.

{% capture html -%}
<fieldset class="form-fieldset">
  <div class="mb-3">
    <label class="form-label required">Full name</label>
    <input type="text" class="form-control" autocomplete="off" />
  </div>
  <div class="mb-3">
    <label class="form-label required">Company</label>
    <input type="text" class="form-control" autocomplete="off" />
  </div>
  <div class="mb-3">
    <label class="form-label required">Email</label>
    <input type="email" class="form-control" autocomplete="off" />
  </div>
  <div class="mb-3">
    <label class="form-label">Phone number</label>
    <input type="tel" class="form-control" autocomplete="off" />
  </div>
  <label class="form-check">
    <input type="checkbox" class="form-check-input" />
    <span class="form-check-label required">I agree to the Terms & Conditions</span>
  </label>
</fieldset>
{%- endcapture %}
{% include "docs/example.html" html=html %}
