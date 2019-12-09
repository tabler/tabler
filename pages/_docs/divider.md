---
title: Divider
description: A divider visually segments content into groups
done: true
---

### Default markup

{% example html max-width=300 %}
{% include ui/hr.html %}
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

{% example %}
{% include ui/hr.html text="Green divider" color="green" %}
<p>
Dicta error hic illo iure necessitatibus nihil officiis omnis perferendis, praesentium repellendus rerum, saepe sed, sit!
</p>
{% endexample %}
