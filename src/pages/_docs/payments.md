---
title: Payments
menu: docs.payments
description: The Tabler payments plug-in will let you use a set of payment provider icons to facilitate the payment process and make it more-user friendly.
plugin: payments
done: true
---


## Payment

To create a payment provider icon, add the `payment` class to a component and specify the payment provider. The full list of payment providers can be found below.

{% capture code %}
{% include ui/payment.html class="mr-3" payment="shopify"%}
{% include ui/payment.html class="mr-3" payment="visa" %}
{% include ui/payment.html class="mr-3" payment="paypal"%}
{% endcapture %}
{% include example.html code=code %}


## Payment sizes

Using Bootstrap’s typical naming structure, you can create a standard payment, or scale it up or down to different sizes based on what’s needed.

{% capture code %}
{% include ui/payment.html class="mr-3" payment="shopify" size="xl" %}
{% include ui/payment.html class="mr-3" payment="visa" size="lg" %}
{% include ui/payment.html class="mr-3" payment="paypal" size="md" %}
{% include ui/payment.html class="mr-3" payment="amazon" size="sm" %}
{% endcapture %}
{% include example.html code=code %}


## Types

Select an icon from the list of payment providers. Each icon comes in two color variants - light and dark, so you can choose the one that goes well with your design.

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
