---
title: Divider
description: Dividers help organize content and make the interface layout clear and uncluttered. Greater clarity adds up to better user experience and enhanced interaction with a website or app.  
bootstrap-link: components/dropdowns/#dividers
done: true
---


## Default markup

Use dividers to visually separate content into parts. You can use a line only or add text that will be centered by default.   

{% capture code %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="See also" %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endcapture %}
{% include example.html code=code %}


## Text position

You can modify the position of the text which is to be included in a separator and make it left- or right-aligned. Otherwise, the text will remain centered.

{% capture code %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Left divider" position="left" %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Centered divider"  %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Right divider" position="right" %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endcapture %}
{% include example.html code=code %}


## Divider color

Customize the color of dividers to make them go well with your design. Click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
{% include ui/hr.html text="Green divider" color="green" %}
<p>
   Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Red divider" color="red" %}
<p>
   Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endcapture %}
{% include example.html code=code %}
