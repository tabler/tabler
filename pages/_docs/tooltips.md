---
title: Tooltips
menu: docs.tooltips
description: The Tooltip component is small pop-up box that appears when the user moves the mouse pointer over an element.
bootstrap-link: components/tooltips/
---

### Default markup

{% capture code %}
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
  Tooltip on top
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on right">
  Tooltip on right
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
  Tooltip on bottom
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
  Tooltip on left
</button>
{% endcapture %}
{% include example.html code=code %}

### Tooltip with HTML

{% capture code %}
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
  Tooltip with HTML
</button>
{% endcapture %}
{% include example.html code=code %}
