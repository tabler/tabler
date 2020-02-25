---
title: Dropzone
---

## Usage

The typical way of using dropzone is by creating a form element with the class `dropzone`.

{% capture code %}
<form action="/file-upload"
      class="dropzone"
      id="my-awesome-dropzone"></form>
{% endcapture %}
{% include example.html code=code %}

That’s it. Dropzone will find all form elements with the class dropzone, automatically attach itself to it, and upload files dropped into it to the specified `action` attribute. The uploaded files can be handled just as if there would have been a html input like this:

{% capture code %}
<input type="file" name="file" />
{% endcapture %}
{% include example.html code=code %}

If you want another name than `file` you can [configure dropzone](https://www.dropzonejs.com/#configuration) with the option `paramName`.

If you want your file uploads to work even without JavaScript, you can include an element with the class `fallback` that dropzone will remove if the browser is supported. If the browser isn’t supported, Dropzone will not create fallback elements if there is a fallback element already provided. (Obviously, if the browser doesn’t support JavaScript, the form will stay as is)

Typically this will look like this:

{% capture code %}
<form action="/file-upload" class="dropzone">
  <div class="fallback">
    <input name="file" type="file" multiple />
  </div>
</form>
{% endcapture %}
{% include example.html code=code %}

### Create dropzones programmatically

Alternatively you can create dropzones programmaticaly (even on non form elements) by instantiating the `Dropzone` class.

```js
// Dropzone class:
var myDropzone = new Dropzone("div#myId", { url: "/file/post"});
```

or if you use jQuery, you can use the jQuery plugin Dropzone ships with:

```js
// jQuery
$("div#myId").dropzone({ url: "/file/post" });
```

**Don’t forget to specify an `url` option if you’re not using a form element, since Dropzone doesn’t know where to post to without an `action` attribute.**

### Server side implementation

Dropzone does not provide the server side implementation of handling the files, but the way files are uploaded is identical to simple file upload forms like this:

{% capture code %}
<form action="" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
</form>
{% endcapture %}
{% include example.html code=code %}

## Configuration

There are two ways to configure dropzones.

The obvious way is to pass an options object when instantiating a dropzone programmatically like in the previous *create dropzones programmatically* section.

The second way of doing this can be found [here](https://www.dropzonejs.com/#configuration).