---
title: Divider
description: A divider visually segments content into groups
bootstrap-link: https://getbootstrap.com/docs/4.4/components/dropdowns/#dividers
done: true
---
### Default markup

{% example html columns=1 %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Left divider" %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Centered divider" position="center" %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% include ui/hr.html text="Right divider" position="right" %}
<p>
  Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endexample %}

### Divider color

Customize the color of the divider. You can click [here]({% docs_url colors %}) to see the list of available colors.

{% example html columns=1 %}
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, dolore dolores doloribus est ex.
</p>
{% include ui/hr.html text="Green divider" color="green" %}
<p>
   Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endexample %}
