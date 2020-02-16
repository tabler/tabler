---
title: Flags
menu: docs.flags
plugin: flags
done: true
---


## Flag

{% capture code %}
{% include ui/flag.html flag="tg" class="mr-1" %}
{% include ui/flag.html flag="br" class="mr-1" %}
{% include ui/flag.html flag="pt" %}
{% endcapture %}
{% include example.html code=code %}


## Flag sizes

Using Bootstrap’s typical naming structure, you can create a standard flag, or scale it up to different sizes based on what’s needed.

{% capture code %}
{% include ui/flag.html flag="pl" size="xl" class="mr-1" %}
{% include ui/flag.html flag="pl" size="lg" class="mr-1" %}
{% include ui/flag.html flag="pl" size="md" %}
{% include ui/flag.html flag="pl" class="mr-1" %}
{% endcapture %}
{% include example.html code=code %}


## Types

To set the flag of the country you want add a class `flag-(country name)`. For example to create a flag of Andorra your class should look like this: `.flag-ad`.

<table>
{% for flag in site.data.flags %}
<tr>
<td>{% include ui/flag.html flag=flag.flag %}</td>
<td><code>{{ flag.flag }}</code></td>
<td>{{ flag.name }}</td>
</tr>
{% endfor %}
</table>
