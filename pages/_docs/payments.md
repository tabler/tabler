---
title: Payments
menu: docs.payments
plugin: payments
done: true
---

### Payment

{% example %}
{% include ui/payment.html payment="shopify"%}
{% include ui/payment.html%}
{% include ui/payment.html payment="paypal"%}
{% endexample %}

### Payment sizes

Using Bootstrap’s typical naming structure, you can create a standard payment, or scale it up to different sizes based on what’s needed.

{% example %}
{% include ui/payment.html payment="shopify" size="xl"%}
{% include ui/payment.html size="lg"%}
{% include ui/payment.html payment="paypal" size="md"%}
{% include ui/payment.html payment="amazon"%}
{% endexample %}

### Types

<table>
{% for payment in site.data.payments %}
    <tr>
    <td>{% include ui/payment.html payment=payment.payment %}</td>
    <td><code>{{ payment.payment }}</code></td>
    <td>{{ payment.name }}</td>
    </tr>
{% endfor %}
</table>
