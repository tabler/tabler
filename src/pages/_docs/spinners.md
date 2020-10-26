---
title: Spinners
menu: docs.spinners
description: Spinners are used to show the loading state of a component or page. They provide feedback for an action a user has taken, when it takes a bit longer to complete.
bootstrap-link: components/spinners/
done: true
---


## Default markup

Use the default spinner to notify users that an action they have taken is in progress, helping them avoid confusion. 

{% capture code %}
{% include ui/spinner.html %}
{% endcapture %}
{% include example.html code=code %}


## Colors

Choose one of the available colors to customize the spinner and make it suit your design.

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/spinner.html color=c %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Size

Choose the size of your spinner. You can use the default size or use the `spinner-border-sm` class to display a smaller spinner.

{% capture code %}
{% include ui/spinner.html %}
{% include ui/spinner.html size="sm" %}
{% endcapture %}
{% include example.html code=code %}


## Growing spinner

Use the growing spinner, if you are looking for a more original design than a border spinner. The spinner grows to show the loading state. 

{% capture code %}
{% include ui/spinner.html type="grow" %}
{% endcapture %}
{% include example.html code=code %}

Growing spinners also come in a variety of colors to choose from.

{% capture code %}
{% for color in site.colors %}
{% assign c = color[0] %}
{% include ui/spinner.html color=c type="grow" %}
{% endfor %}
{% endcapture %}
{% include example.html code=code %}


## Buttons

Use buttons with spinners to notify users that an action they have taken by clicking the button is in progress and prevent them from clicking multiple times or giving up.  

{% capture code %}
{% include ui/button.html spinner=true text="Button" color="primary" %}
{% include ui/button.html spinner=true text="Button" color="danger" %}
{% include ui/button.html spinner=true text="Button" color="warning" %}
{% include ui/button.html spinner=true color="success" %}
{% include ui/button.html spinner=true color="white" %}
{% endcapture %}
{% include example.html code=code %}
