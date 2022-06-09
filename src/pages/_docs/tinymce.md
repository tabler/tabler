---
title: TinyMCE
menu: docs.plugins.tinymce
libs: tinymce
description: The WYSIWYG editor that is flexible, customizable, and designed with the user in mind. TinyMCE can handle any challenge, from the most simple implementation through to the most complex use case.
---

[TinyMCE](https://www.tiny.cloud/docs/) documentation.

## Default text editor

Initialize TinyMCE 6 on any element (or elements) on the web page by passing an object containing a selector value to `tinymce.init()`. The selector value can be any valid CSS selector.

{% capture code %}
{% include ui/tinymce.html id="default" %}
{% endcapture %}
{% include example.html code=code %}