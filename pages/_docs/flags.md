---
title: Flags
menu: docs.flags
description: Thanks to the Tabler flags plug-in, you can create flags to visually represent countries or languages. Flags are often used in forms, as an element of a delivery address, phone number dialling code and many more. 
plugin: flags
done: true
libs: tabler-flags
---


## Flag

To create a flag, add the `flag` class to a component and choose the country whose flag you want to use. The full list of countries can be found below. 

{% capture code %}
{% include ui/flag.html flag="tg" class="mr-1" %}
{% include ui/flag.html flag="br" class="mr-1" %}
{% include ui/flag.html flag="pt" %}
{% endcapture %}
{% include example.html code=code %}


## Flag sizes

Using Bootstrap’s typical naming structure, you can create a standard flag, or scale it up or down to different sizes based on what’s needed.

{% capture code %}
{% include ui/flag.html flag="pl" size="xl" class="mr-1" %}
{% include ui/flag.html flag="pl" size="lg" class="mr-1" %}
{% include ui/flag.html flag="pl" size="md" %}
{% include ui/flag.html flag="pl" class="mr-1" %}
{% endcapture %}
{% include example.html code=code %}


## Types

To use the flag of a particular country, add the `flag-country-(country name)` class. For example, to create a flag of Andorra should use the following class: `.flag-country-ad`.

<table>
{% for flag in site.data.flags %}
<tr>
<td>{% include ui/flag.html flag=flag.flag %}</td>
<td><code>{{ flag.flag }}</code></td>
<td>{{ flag.name }}</td>
</tr>
{% endfor %}
</table>
