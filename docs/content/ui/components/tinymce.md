---
title: TinyMCE
docs-libs: tinymce
summary: The WYSIWYG editor that is flexible, customizable, and designed with the user in mind. TinyMCE can handle any challenge, from the most simple implementation through to the most complex use case.
description: Flexible WYSIWYG editor for content.
---

[TinyMCE](https://www.tiny.cloud/docs/) documentation.

## Default text editor

Initialize TinyMCE 6 on any element (or elements) on the web page by passing an object containing a selector value to `tinymce.init()`. The selector value can be any valid CSS selector.

{% capture html -%}
<form method="post">
  <textarea id="tinymce-default">Hello, <b>Tabler</b>!</textarea>
</form>
<script src="{{ cdnUrl }}/dist/libs/tinymce/tinymce.min.js" defer></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    let options = {
      selector: "#tinymce-default",
      height: 300,
      menubar: false,
      statusbar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      toolbar:
        "undo redo | formatselect | " +
        "bold italic backcolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat",
      content_style:
        "body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; -webkit-font-smoothing: antialiased; }",
    };
    if (localStorage.getItem("tablerTheme") === "dark") {
      options.skin = "oxide-dark";
      options.content_css = "dark";
    }
    tinyMCE.init(options);
  });
</script>
{%- endcapture %}
{% include "docs/example.html" html=html %}
