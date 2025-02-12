---
title: Test
layout: default
---

test

{% capture html %}
{% include "ui/avatar.html" icon="heart" color="red" placeholder="as" %}
{% include "ui/avatar.html" %}
{% endcapture %}
{% include "example.html" html=html %}

```html
{% include "ui/avatar.html" icon="heart" color="red" placeholder="as" %}
```