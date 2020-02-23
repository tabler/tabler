---
title: Payments
menu: docs.payments
plugin: payments
done: true
---


## Payment

{% capture code %}
{% include ui/payment.html class="mr-3" payment="shopify"%}
{% include ui/payment.html class="mr-3" payment="visa" %}
{% include ui/payment.html class="mr-3" payment="paypal"%}
{% endcapture %}
{% include example.html code=code %}


## Payment sizes

Using Bootstrap’s typical naming structure, you can create a standard payment, or scale it up to different sizes based on what’s needed.

{% capture code %}
{% include ui/payment.html class="mr-3" payment="shopify" size="xl" %}
{% include ui/payment.html class="mr-3" payment="visa" size="lg" %}
{% include ui/payment.html class="mr-3" payment="paypal" size="md" %}
{% include ui/payment.html class="mr-3" payment="amazon" size="sm" %}
{% endcapture %}
{% include example.html code=code %}


## Types

<table class="table-vcenter">
{% for payment in site.data.payments %}
<tr>
    <td>{{ payment.name }}</td>
    <td><code>{{ payment.logo }}</code></td>
    <td class="w-1">{% include ui/payment.html payment=payment.logo %}</td>
    <td class="w-1">{% include ui/payment.html payment=payment.logo dark=true %}</td>
</tr>
{% endfor %}
</table>
