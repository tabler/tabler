---
title: Range slider
docs-libs: nouislider
description: Adjust values with range sliders.
summary: Range sliders allow users to select a range of values by adjusting two handles along a track, providing an intuitive and space-efficient input method.
---

To be able to use the range slider in your application you will need to install the noUiSlider dependency with `npm install nouislider`.

## Basic range slider

{% capture html -%}
<div id="range-simple"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    window.noUiSlider &&
      noUiSlider.create(document.getElementById("range-simple"), {
        start: 20,
        connect: [true, false],
        step: 10,
        range: {
          min: 0,
          max: 100,
        },
      });
  });
</script>
{%- endcapture %}
{% include "docs/example.html" html=html %}

For more details on customizing a noUiSlider element, see the documentation on the [noUiSlider website](https://refreshless.com/nouislider/).
