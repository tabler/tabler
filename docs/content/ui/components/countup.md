---
title: Countup
summary: A countup element is used to display numerical data in an interesting way and make the interface more interactive.
docs-libs: countup
description: Display numbers dynamically with countups.
---

The countup component is used to display numbers dynamically. It is a great way to make the interface more interactive and engaging. The countup component is a simple and easy way to animate numbers in your application.

To be able to use the countup in your application you will need to install the countup.js dependency with `npm install countup.js`.

For more advanced features of countups, see the demo on the [countUp.js website](https://inorganik.github.io/countUp.js/).

## Basic usage

To create a countup, add `data-countup` to any HTML text tag and specify the number which is to be reached. The animation will be triggered as soon as the number enters the viewport.

```html
<h1 data-countup>30000</h1>
```

The results can be seen in the example below.

{% capture html -%}
<h1 data-countup>30000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html centered %}

## Duration

Set the `duration` to determine how long the animation should take. By default, the duration is set to 2 seconds, but you can modify it as you wish.

{% capture html -%}
<h1 data-countup>30000</h1>
<h1 data-countup='{"duration":4}'>30000</h1>
<h1 data-countup='{"duration":6}'>30000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Starting value

By default the countup will start from zero. If you want to set a different start value use `startVal`.
You can also set the start value to be greater than the final value, so that it counts down instead of up.
To see how the starting value affects the animation, look at the example below.

{% capture html -%}
<h1 data-countup='{"startVal":12345}'>30000</h1>
<h1 data-countup='{"startVal":47655}'>30000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Decimal places

Set how many decimal numbers should be displayed using `decimalPlaces`. By default, the number of decimal places is set to 0.

{% capture html -%}
<h1 data-countup>3.123</h1>
<h1 data-countup='{"decimalPlaces":1}'>3.123</h1>
<h1 data-countup='{"decimalPlaces":2}'>3.123</h1>
<h1 data-countup='{"decimalPlaces":3}'>3.123</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Easing

Disable easing using `"useEasing": false`. Easing is set to `true` by default, so that the animation speed changes over the course of its duration. Easing can be disabled to make the animation linear.

{% capture html -%}
<h1 data-countup>30000</h1>
<h1 data-countup='{"useEasing": false}'>30000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Use grouping

Disable grouping using `"useGrouping": false`. Grouping is set to `true` by default, so that the number is displayed with a separator.

{% capture html -%}
<h1 data-countup>30000</h1>
<h1 data-countup='{"useGrouping": false}'>30000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Separator

You can change the default separator using `separator` and specifying the one you wish to use.

{% capture html -%}
<h1 data-countup>3000000</h1>
<h1 data-countup='{"separator":" "}'>3000000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Decimal separator

You can change the default decimal separator using `decimal` and specifying the one you wish to use.

{% capture html -%}
<h1 data-countup='{"decimalPlaces":2}'>3.12</h1>
<h1 data-countup='{"decimalPlaces":2,"decimal":","}'>3.12</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Prefix

Set the countup prefix using `prefix` and specifying the prefix you want to add, for instance a currency symbol.

{% capture html -%}
<h1 data-countup='{"prefix":"$"}'>30000</h1>
<h1 data-countup='{"prefix":"€"}'>30000</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}

## Suffix

Set the countup suffix using `suffix` and specifying the suffix you want to add, for instance a percentage symbol.

{% capture html -%}
<h1 data-countup='{"suffix":"%"}'>300</h1>
<h1 data-countup='{"suffix":"‰"}'>300</h1>
{%- endcapture %}
{% include "docs/example.html" html=html vertical separated %}
