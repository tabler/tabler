---
title: Input mask
---


## Default markup

{% capture code %}
<label class="form-label">Telephone mask</label>
{% include ui/form/input-mask.html mask="(00) 0000-0000" placeholder="(00) 0000-0000" visible=true %}
{% endcapture %}
{% include example.html code=code %}
