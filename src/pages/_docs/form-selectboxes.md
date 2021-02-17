---
title: Form selectboxes
menu: docs.forms.selectboxes
---

Add selectboxes to make your form more intuitive by providing users with a set of options to choose from. You can add simple selectboxes with a label, use icons only or icons with labels. Alternatively, you can use pill selectboxes if they go well with your design.

{% capture code %}
{% include parts/form/input-selectgroups.html %}
{% endcapture %}
{% include example.html code=code %}


## Advanced selectboxes

Use more advanced selectboxes to display the range of available options. You can choose selectboxes with radio buttons, if you want users to select only one option or with checkboxes, if they are allowed to choose multiple options.

{% capture code %}
{% include parts/form/selectgroup-payments.html %}
{% include parts/form/selectgroup-project-manager.html %}
{% endcapture %}
{% include example.html code=code %}

