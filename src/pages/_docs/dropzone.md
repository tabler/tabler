---
title: Dropzone
menu: docs.plugins.dropzone
libs: dropzone
description: Dropzone is a simple JavaScript library that helps you add file drag and drop functionality to your web forms. It is one of the most popular drag and drop library on the web and is used by millions of people.
---

## Default Dropzone

{% capture code %}
{% include ui/dropzone.html id="default" %}
{% endcapture %}
{% include example.html code=code %}

## Add multiple files

{% capture code %}
{% include ui/dropzone.html id="mulitple" multiple=true %}
{% endcapture %}
{% include example.html code=code %}

## Custom Dropzone

{% capture code %}
{% include ui/dropzone.html id="custom" custom="true" text='Your text here' description="Your custom description here"%}
{% endcapture %}
{% include example.html code=code %}