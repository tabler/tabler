---
title: Spinners
menu: docs.spinners
---

## Default markup

{% example html %}
{% include ui/spinner.html %}
{% endexample %}


## Colors

{% example html %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/spinner.html color=c %}
{% endfor %}
{% endexample %}

## Size

{% example html %}
{% include ui/spinner.html %}
{% include ui/spinner.html size="sm" %}
{% endexample %}

## Growing spinner

{% example html %}
{% include ui/spinner.html type="grow" %}
{% endexample %}

{% example html %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/spinner.html color=c type="grow" %}
{% endfor %}
{% endexample %}

## Buttons

{% example html wrapper=btn-list %}
{% include ui/button.html spinner=true text="Button" color="primary" %}
{% include ui/button.html spinner=true text="Button" color="danger" %}
{% include ui/button.html spinner=true text="Button" color="warning" %}
{% include ui/button.html spinner=true color="success" %}
{% include ui/button.html spinner=true color="secondary" %}
{% endexample %}
