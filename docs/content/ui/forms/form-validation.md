---
title: Validation states
summary: To inform users whether the entered value is correct or not, use either of the validation states. Thanks to that, users will immediately know which form elements they need to correct and, if the state displays as invalid, why the value is incorrect.
description: Indicate valid or invalid inputs.
---

## Validation states

To inform users whether the entered value is correct or not, use either of the validation states. Thanks to that, users will immediately know which form elements they need to correct and, if the state displays as invalid, why the value is incorrect.

To apply the validation state to the form control, use the `.is-valid` and `.is-invalid` classes.

{% capture html -%}
<input type="text" class="form-control is-valid" placeholder="Valid State..." />
<input type="text" class="form-control is-invalid" placeholder="Invalid State..." />
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Validation feedback

To provide users with additional information about the validation state, you can use the `.valid-feedback` and `.invalid-feedback` classes.

{% capture html -%}
<div>
  <label class="form-label required">City</label>
  <input type="text" class="form-control is-invalid" required />
  <div class="invalid-feedback">Please provide a valid city.</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

You can also use the `.valid-feedback` to provide users with positive feedback.

{% capture html -%}
<div>
  <label class="form-label required">City</label>
  <input type="text" class="form-control is-valid" value="Warsaw" />
  <div class="valid-feedback">Looks good!</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Subtle validation states

If you prefer a more subtle manner of informing users of the input control validation state, you can use tick and cross symbols and refrain from using colored control frames and the validation feedback.

To do this, use the `.is-valid-lite` and `.is-invalid-lite` classes.

{% capture html -%}
<input type="text" class="form-control is-valid is-valid-lite" placeholder="Valid State..." />
<input type="text" class="form-control is-invalid is-invalid-lite" placeholder="Invalid State..." />
{%- endcapture %}
{% include "docs/example.html" html=html %}
