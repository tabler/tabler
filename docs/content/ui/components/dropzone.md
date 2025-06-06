---
title: Dropzone
summary: Dropzone is a simple JavaScript library that helps you add file drag and drop functionality to your web forms. It is one of the most popular drag and drop libraries on the web and is used by millions of people.
description: Drag-and-drop file upload tool.
docs-libs: dropzone
---

## Basic usage

The basic implementation of Dropzone allows you to quickly enable drag-and-drop file uploads on your web forms. By default, it provides a fallback for browsers that don’t support drag-and-drop functionality. Below is an example of how to set up a simple Dropzone form.

```html
<form class="dropzone" id="dropzone-default" action="." autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" />
  </div>
</form>
```

To initialize the Dropzone form, you need to create a new instance of the Dropzone class and pass the form element as an argument. Here’s how you can do it:

```html
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new Dropzone("#dropzone-default");
  });
</script>
```

The Dropzone form will now be active and ready to accept file uploads. When a user drags and drops a file onto the form, the file will be uploaded to the server automatically.

{% capture html -%}
<form class="dropzone" id="dropzone-default" action="." autocomplete="off" novalidate>
  <div class="fallback">
    <input name="..." type="file" />
  </div>
</form>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new Dropzone("#dropzone-default");
  });
</script>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Add multiple files

To allow users to upload multiple files at once, you can enable the `multiple` attribute in the input field. This is particularly useful for applications that require batch uploads, such as image galleries or document management systems. Here’s how to configure Dropzone to accept multiple files:

```html
<input name="..." type="file" multiple />
```

By adding the `multiple` attribute to the input field, users can select multiple files from their local storage and upload them all at once. The Dropzone form will handle the file uploads automatically.

{% capture html -%}
<form class="dropzone" id="dropzone-mulitple" action="." autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" multiple />
  </div>
</form>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new Dropzone("#dropzone-mulitple");
  });
</script>
{%- endcapture %}
{% include "docs/example.html" html=html %}

## Custom Dropzone

You can further enhance the user experience by customizing the Dropzone interface. For instance, you can modify the drop area with custom messages or styles to make the file upload process more engaging and user-friendly. Below is an example of a custom Dropzone configuration:

{% capture html -%}
<form class="dropzone" id="dropzone-custom" action="." autocomplete="off" novalidate>
  <div class="fallback">
    <input name="file" type="file" />
  </div>
  <div class="dz-message">
    <h3 class="dropzone-msg-title">Your text here</h3>
    <span class="dropzone-msg-desc">Your custom description here</span>
  </div>
</form>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new Dropzone("#dropzone-custom");
  });
</script>
{%- endcapture %}
{% include "docs/example.html" html=html %}

By customizing the drop area, you can align the file upload process with your application’s branding or specific requirements.