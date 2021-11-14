---
title: Input mask
description: An input mask is a used to clarify the input format required in a given field and is helpful for users, removing confusion and reducing the number of validation errors.
menu: docs.plugins.input-mask
---

To be able to use the input mask in your application you will need to install the imask dependency with `npm install imask`.

## Default markup

Use an input mask in the fields where users have to enter their phone number, to make the formatting rules clear and help them avoid confusion.

{% capture code %}
<label class="form-label">Telephone mask</label>
{% include ui/form/input-mask.html mask="(00) 0000-0000" placeholder="(00) 0000-0000" visible=true %}
{% endcapture %}
{% include example.html code=code %}
