---
title: Ribbons
menu: docs.ribbons
done: true
---


## Default markup

{% capture code %}
{% include cards/ribbon.html %}
{% endcapture %}
{% include example.html code=code %}


## Ribbon position

You can easily change the position of a ribbon by adding a class to the element.

- `ribbon-top` - moves it to the top
- `ribbon-right` - moves it to the right
- `ribbon-bottom` - moves it to the bottom
- `ribbon-left` - moves it to the lefg

You can also use multiple classes at once for example: `.ribbon.ribbon-top.ribbon-left` moves the ribbon to the top left corner.

{% capture code %}
{% include cards/ribbon.html top=true left=true %}
{% endcapture %}
{% include example.html code=code %}


## Ribbon color

Customize the ribbon's background color. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
{% include cards/ribbon.html color="red" %}
{% endcapture %}
{% include example.html code=code %}


## Ribbon text

Set your own text in a ribbon.

{% capture code %}
{% include cards/ribbon.html color="green" text="-50%" %}
{% endcapture %}
{% include example.html code=code %}


## Ribbon style

Change the style of a ribbon. 

{% capture code %}
{% include cards/ribbon.html bookmark=true color="orange" text="-50%" %}
{% endcapture %}
{% include example.html code=code %}
