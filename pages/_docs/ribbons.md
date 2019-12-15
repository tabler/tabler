---
title: Ribbons
menu: docs.ribbons
done: true
---

### Default markup

{% example html columns=1 %}
{% include_cached cards/ribbon.html %}
{% endexample %}

### Ribbon position

You can easily change the position of a ribbon by adding a class to the element.

- `ribbon-top` - moves it to the top
- `ribbon-right` - moves it to the right
- `ribbon-bottom` - moves it to the bottom
- `ribbon-left` - moves it to the lefg

You can also use multiple classes at once for example: `.ribbon.ribbon-top.ribbon-left` moves the ribbon to the top left corner.

{% example html columns=1 %}
{% include_cached cards/ribbon.html top=true left=true %}
{% endexample %}

### Ribbon color

Customize the ribbon's background color. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% example html columns=1 %}
{% include_cached cards/ribbon.html color="red" %}
{% endexample %}

### Ribbon text

Set your own text in a ribbon.

{% example html columns=1 %}
{% include_cached cards/ribbon.html color="green" text="-50%" %}
{% endexample %}

### Ribbon style

Change the style of a ribbon. 

{% example html columns=1 %}
{% include_cached cards/ribbon.html bookmark=true color="orange" text="-50%" %}
{% endexample %}
