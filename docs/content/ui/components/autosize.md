---
title: Autosize
summary: The autosize element will automatically adjust the textarea height and make it easier for users to follow as they type.
docs-libs: autosize
description: Auto-adjusting textarea for better usability.
---

To be able to use the autosize in your application you will need to install the autosize dependency with `npm install autosize`.

## Default markup

Add the autosize element to your input to make it automatically adjust to the length of a text as a user types it. 

To create autosize textarea, add the `data-bs-toggle="autosize"` attribute to the textarea element:

{% capture html -%}
<label class="form-label">Autosize example</label>
<textarea class="form-control" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
{%- endcapture %}
{% include "docs/example.html" html=html column vertical %}
