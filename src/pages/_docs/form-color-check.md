---
title: Color check
menu: docs.forms.color-check
---

Your input controls can come in a variety of colors, depending on your preferences. Click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% include parts/form/input-color.html %}
{% endcapture %}
{% include example.html code=code %}

{% capture code %}
{% include parts/form/input-color.html name="color-rounded" rounded=true %}
{% endcapture %}
{% include example.html code=code %}


## Input color picker

Add an color picker to your form to let users customise it according to their preferences.

{% capture code %}
{% include parts/form/input-colorpicker.html %}
{% endcapture %}
{% include example.html code=code %}

