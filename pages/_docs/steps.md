---
title: Steps
---

Steps are progress indicators of a sequence of task steps.

### Default markup

{% example html %}
{% include ui/steps.html %}
{% endexample %}

### Size

{% example html %}
{% include ui/steps.html size="md" %}
{% include ui/steps.html size="lg" %}
{% endexample %}

### Color

{% example html %}
{% include ui/steps.html color="green" %}
{% include ui/steps.html color="red" %}
{% endexample %}

### Steps with title

{% example html %}
{% include ui/steps.html show-title=true %}
{% endexample %}

### Steps with numbers

{% example html %}
{% include ui/steps.html count=5 active=2 numbers=true color="lime" %}
{% endexample %}
