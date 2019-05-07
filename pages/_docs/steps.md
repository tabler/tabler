---
title: Steps
---

Steps are progress indicators of a sequence of task steps.

## Default markup

{% example html %}
{% include ui/steps.html show-title=true %}
{% endexample %}

## Tooltips

{% example html %}
{% include ui/steps.html show-title=true show-tooltip=true %}
{% endexample %}

## Color

{% example html %}
{% include ui/steps.html color="green" show-title=true %}
{% include ui/steps.html color="red" show-title=true %}
{% endexample %}

## Steps without title

{% example html %}
{% include ui/steps.html show-tooltip=true %}
{% endexample %}

## Steps with numbers

{% example html %}
{% include ui/steps.html count=5 active=2 numbers=true color="lime" %}
{% endexample %}
