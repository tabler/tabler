---
title: Payments
menu: docs.payments
plugin: payments
done: true
---

### Payment

{% example %}
{% include ui/payment.html class="mr-3" payment="shopify"%}
{% include ui/payment.html class="mr-3" payment="visa" %}
{% include ui/payment.html class="mr-3" payment="paypal"%}
{% endexample %}

### Payment sizes

Using Bootstrap’s typical naming structure, you can create a standard payment, or scale it up to different sizes based on what’s needed.

{% example %}
{% include ui/payment.html class="mr-3" payment="shopify" size="xl" %}
{% include ui/payment.html class="mr-3" payment="visa" size="lg" %}
{% include ui/payment.html class="mr-3" payment="paypal" size="md" %}
{% include ui/payment.html class="mr-3" payment="amazon" size="sm" %}
{% endexample %}

### Types

<table class="table-vcenter">
{% for payment in site.data.payments %}
<tr>
    <td>{{ payment.name }}</td>
    <td><code>{{ payment.logo }}</code></td>
    <td class="w-1p">{% include ui/payment.html payment=payment.logo %}</td>
    <td class="w-1p">{% include ui/payment.html payment=payment.logo dark=true %}</td>
</tr>
{% endfor %}
</table>
