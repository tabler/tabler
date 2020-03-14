---
title: Ribbons
menu: docs.ribbons
description: Ribbons are graphical elements which attract users' attention to a given element of an interface and make it stand out. 
done: true
---


## Default markup

Use the `ribbon` class to add the default ribbon to any section of your interface.   

{% capture code %}
{% include cards/ribbon.html %}
{% endcapture %}
{% include example.html code=code %}


## Ribbon position

You can change the position of a ribbon by adding one of the following classes to the element:

- `ribbon-top` - moves it to the top
- `ribbon-right` - moves it to the right
- `ribbon-bottom` - moves it to the bottom
- `ribbon-left` - moves it to the lefg

Using multiple classes at once will give you more position options. For example, the following class: `.ribbon.ribbon-top.ribbon-left` will move the ribbon to the top left corner.

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

Add your own text to a ribbon to display any additional information and make it easy to spot for users.

{% capture code %}
{% include cards/ribbon.html color="green" text="-50%" %}
{% endcapture %}
{% include example.html code=code %}


## Ribbon style

Change the style of a ribbon to make it go well with your interface design. 

{% capture code %}
{% include cards/ribbon.html bookmark=true color="orange" text="-50%" %}
{% endcapture %}
{% include example.html code=code %}
