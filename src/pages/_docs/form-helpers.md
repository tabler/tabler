---
title: Form helpers
description: A form helper can be used to provide users with additional information about the elements of a form that may be unclear. 
menu: docs.forms.form-helpers
---


## Input help

Use an input helper to display additional information about a form element. The text label will appear once a user hovers over the helper. 

{% capture code %}
<span class="form-help" data-bs-toggle="popover" data-bs-placement="top" data-bs-html="true" data-bs-content="<p>ZIP Code must be US or CDN format. You can use an extended ZIP+4 code to determine address more accurately.</p><p class='mb-0'><a href=''>USP ZIP codes lookup tools</a></p>">?</span>
{% endcapture %}
{% include example.html code=code %}
