---
title: Toasts
menu: docs.toasts
description: The toast component is like an alert box that is only shown for a couple of seconds when something happens (i.e. when the user clicks on a button, submits a form, etc.).
bootstrap-link: components/toasts/
---


## Default markup

{% capture code %}
{% include ui/toast.html %}
{% endcapture %}
{% include example.html code=code %}


## Translucent

Toasts are slightly translucent, too, so they blend over whatever they might appear over. For browsers that support the `backdrop-filter` CSS property, we’ll also attempt to blur the elements under a toast.

{% capture code %}
{% include ui/toast.html %}
{% endcapture %}
{% include example.html code=code %}


## Stacking toasts

If you want to stack toasts just put them in the same container.

{% capture code %}
{% include ui/toast.html person-id=3 %}
{% include ui/toast.html date="7 mins ago" text="This is another toast message." %}
{% endcapture %}
{% include example.html code=code %}