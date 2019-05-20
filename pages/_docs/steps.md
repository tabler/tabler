---
title: Steps
menu: docs.steps
---

Steps are progress indicators of a sequence of task steps.

## Default markup

{% example %}
{% include ui/steps.html show-title=true %}
{% endexample %}

## Tooltips

{% example %}
{% include ui/steps.html show-title=true show-tooltip=true %}
{% endexample %}

## Color

{% example %}
{% include ui/steps.html color="green" show-title=true %}
{% include ui/steps.html color="red" show-title=true %}
{% endexample %}

## Steps without title

{% example %}
{% include ui/steps.html show-tooltip=true %}
{% endexample %}

## Steps with numbers

{% example %}
{% include ui/steps.html count=5 active=2 numbers=true color="lime" %}
{% endexample %}
