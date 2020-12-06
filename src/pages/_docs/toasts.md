---
title: Toasts
menu: docs.components.toasts
description: Toasts are lightweight alert boxes which display for a few seconds after a user has taken an action, to inform them of the state or outcome. They can be used when a user clicks a button or submits a form and their aim is to provide feedback, rather than encourage to take action.
bootstrap-link: components/toasts/
---


## Default markup

Use the default toast message to inform users of the outcome of their action and provide additional information. It contains an `x` close button to make it possible for users to close the toast if they wish.

{% capture code %}
{% include ui/toast.html %}
{% endcapture %}
{% include example.html code=code %}


## Translucent

Toasts blend over the elements they appear over. If a browser supports the `backdrop-filter` CSS property, the elements under a toast will be blurred.

{% capture code %}
{% include ui/toast.html %}
{% endcapture %}
{% include example.html code=code %}


## Stacking toasts

Stack multiple toasts together by putting them within one `.toast-container`.

{% capture code %}
<div class="toast-container">
  {% include ui/toast.html person-id=3 %}
  {% include ui/toast.html date="7 mins ago" text="This is another toast message." %}
</div>
{% endcapture %}
{% include example.html code=code %}