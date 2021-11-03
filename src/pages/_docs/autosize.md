---
title: Autosize
menu: docs.plugins.autosize
description: The autosize element will automatically adjust the textarea height and make it easier for users to follow as they type.
libs: autosize
---

To be able to use the autosize in your application you will need to install the autosize dependency with `npm install autosize`.

## Default markup

Add the autosize element to your input to make it automatically adjust to the length of a text as a user types it. 

{% capture code %}
<label class="form-label">Autosize example</label>
{% include ui/form/textarea-autosize.html %}
{% endcapture %}
{% include example.html code=code %}
