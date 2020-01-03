---
title: Toasts
menu: docs.toasts
description: The toast component is like an alert box that is only shown for a couple of seconds when something happens (i.e. when the user clicks on a button, submits a form, etc.).
bootstrap-link: components/toasts/
---

### Default markup

{% example %}
{% include ui/toast.html %}
{% endexample %}

### Translucent

Toasts are slightly translucent, too, so they blend over whatever they might appear over. For browsers that support the `backdrop-filter` CSS property, we’ll also attempt to blur the elements under a toast.

{% example html class=bg-gray %}
{% include ui/toast.html %}
{% endexample %}

### Stacking toasts

If you want to stack toasts just put them in the same container.

{% example %}
{% include ui/toast.html person-id=3 %}
{% include ui/toast.html date="7 mins ago" text="This is another toast message." %}
{% endexample %}