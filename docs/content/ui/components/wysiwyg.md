---
title: WYSIWYG editor
docs-libs: [hugerte]
summary: The WYSIWYG editor that is flexible, customizable, and designed with the user in mind. HugeRTE can handle any challenge, from the most simple implementation through to the most complex use case.
description: Flexible WYSIWYG editor for content.
---

[HugeRTE](https://hugerte.org/) documentation.

## Default text editor

Initialize HugeRTE on any element (or elements) on the web page by passing an object containing a selector value to `hugerte.init()`. The selector value can be any valid CSS selector.

{% capture html -%}
{% include "ui/wysiwyg.html" %}
{{ script }}
{%- endcapture %}
{% include "docs/example.html" html=html %}
