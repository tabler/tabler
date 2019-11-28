---
title: Flags
menu: docs.flags
plugin: flags
done: true
---

### Flag

{% example html %}
{% include ui/flag.html flag="tg" class="mr-1" %}
{% include ui/flag.html flag="br" class="mr-1" %}
{% include ui/flag.html flag="pt" %}
{% endexample %}

### Flag sizes

{% example html %}
{% include ui/flag.html flag="pl" class="flag-size-xl mr-1" %}
{% include ui/flag.html flag="pl" class="flag-size-lg mr-1" %}
{% include ui/flag.html flag="pl" class="flag-size-md" %}
{% include ui/flag.html flag="pl" class="mr-1" %}
{% endexample %}

### Types

<table>
{% for flag in site.data.flags %}
<tr>
<td>{% include ui/flag.html flag=flag.flag %}</td>
<td><code>{{ flag.flag }}</code></td>
<td>{{ flag.name }}</td>
</tr>
{% endfor %}
</table>
