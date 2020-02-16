---
title: Spinners
menu: docs.spinners
bootstrap-link: components/spinners/
done: true
---

## Default markup

{% capture code %}
{% include ui/spinner.html %}
{% endcapture %}
{% include example.html code=code %}


## Colors

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/spinner.html color=c %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}

## Size

{% capture code %}
{% include ui/spinner.html %}
{% include ui/spinner.html size="sm" %}
{% endcapture %}
{% include example.html code=code %}

## Growing spinner

{% capture code %}
{% include ui/spinner.html type="grow" %}
{% endcapture %}
{% include example.html code=code %}

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/spinner.html color=c type="grow" %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}

## Buttons

{% capture code %}
{% include ui/button.html spinner=true text="Button" color="primary" %}
{% include ui/button.html spinner=true text="Button" color="danger" %}
{% include ui/button.html spinner=true text="Button" color="warning" %}
{% include ui/button.html spinner=true color="success" %}
{% include ui/button.html spinner=true color="secondary" %}
{% endcapture %}
{% include example.html code=code %}
