---
title: Divider
description: A divider visually segments content into groups
bootstrap-link: components/dropdowns/#dividers
done: true
---
### Default markup

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

### Divider color

Customize the color of the divider. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% capture code %}
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
{% include ui/hr.html text="Green divider" color="green" %}
<p>
   Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endcapture %}
{% include example.html code=code %}
