---
title: Modals
description: Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.
menu: docs.modals
---

## Default markup

{% capture code %}
<div class="modal-dialog" role="document">
    <div class="modal-content">
        {% include parts/modals/simple.html %}
    </div>
</div>
{% endcapture %}
{% include example.html code=code modal=true %}


## Prompt and alert

{% capture code %}
<div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
        {% include parts/modals/small.html %}
    </div>
</div>
{% endcapture %}
{% include example.html code=code modal=true %}


## Modal with form

{% capture code %}
<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        {% include parts/modals/report.html %}
    </div>
</div>
{% endcapture %}
{% include example.html code=code modal=true %}
