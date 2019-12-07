---
title: Icons list
---

Click [**here** {% include_cached ui/icon.html icon="search" class="icon-sm2" %}](/icons.html) to find the one you looking for **easier**!

{% for icon in site.data.icons %}
### - {{icon[0] | capitalize }}
{% for ico in icon[1] %}
<ul>
    <li id="{{ico}}"><code>{{ico}}</code></li>
</ul>
{% example %}
    {% include_cached ui/icon.html icon=ico class="icon-md" %}
{% endexample %}
{% endfor %}
{% endfor %}