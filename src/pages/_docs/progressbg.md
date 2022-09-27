---
title: Progressbg
menu: help.docs.components.progressbg
---

{% capture code %}
<div class="progressbg">
  {% include ui/progress.html value=35 class="progressbg-progress" color="primary-lt" %}
  <div class="progressbg-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eos ullam ut. Doloribus est in laborum, ratione recusandae reprehenderit tenetur. Accusantium consectetur ea enim facere ipsam praesentium quas soluta tenetur?</div>
  <div class="progressbg-value">35%</div>
</div>
{% endcapture %}
{% include example.html code=code %}