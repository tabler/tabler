---
title: Social Icons
summary: Social icons are a great way to make your website more engaging and user-friendly. You can use social icons to help users quickly find your social media profiles and connect with you.
plugin: socials
docs-libs: tabler-socials
description: Connect users to your social profiles.
---

## Installation

This part of Tabler is distributed as a plugin. To enable it you should include `tabler-socials.css` or `tabler-socials.min.css` file in your page.

You can also include the plugin via CDN:

```html
<link rel="stylesheet" href="{{ cdnUrl }}/dist/css/tabler-socials.min.css" />
```

## Social icons

To create a social icon, add the `social` class to a component and provide the class `social-app-*` with the social app whose icon you want to use.

{% capture html -%}
<span class="social social-app-facebook"></span>
<span class="social social-app-x"></span>
<span class="social social-app-instagram"></span>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Social apps list

Here is a list of all available social apps:

{% include "docs/socials.html" %}