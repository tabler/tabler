---
title: Validation states
menu: docs.forms.validation-states
description: To inform users whether the entered value is correct or not, use either of the validation states. Thanks to that, users will immediately know which form elements they need to correct and, if the state displays as invalid, why the value is incorrect.
---

{% capture code %}
{% include parts/form/validation-states.html %}
{% endcapture %}
{% include example.html code=code %}


## Subtle validation states

If you prefer a more subtle manner of informing users of the input control validation state, you can use tick and cross symbols and resign from colored control frames and the validation feedback.

{% capture code %}
{% include parts/form/validation-states.html lite=true %}
{% endcapture %}
{% include example.html code=code %}