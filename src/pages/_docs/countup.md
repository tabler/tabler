---
title: Countup
description: A countup element is used to display numerical data in an interesting way and make the interface more interactive. All the available options can be found [here](https://inorganik.github.io/countUp.js/)
menu: docs.countup
libs: countup
---


## Default countup

To create a countup, add `data-countup` to any HTML text tag and specify the number which is to be reached. The animation will be triggered as soon as the number enters the viewport.

{% capture code %}
<h1 data-countup>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Duration

Set the `duration` to determine how long the animation should take. By default, the duration is set to 2 seconds, but you can modify it as you wish.

{% capture code %}
<h1 data-countup>30000</h1>
    <h1 data-countup='{"duration":4}'>30000</h1>
    <h1 data-countup='{"duration":6}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Starting value

By default the countup will start from zero. If you want to set a different start value use `startVal`. 
You can also set the start value to be greater than the final value, so that it counts down instead of up.

{% capture code %}
<h1 data-countup='{"startVal":12345}'>30000</h1>
<h1 data-countup='{"startVal":47655}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Decimal places

Set how many decimal numbers should be displayed using `decimalPlaces`.

{% capture code %}
<h1 data-countup>3.123</h1>
    <h1 data-countup='{"decimalPlaces":1}'>3.123</h1>
    <h1 data-countup='{"decimalPlaces":2}'>3.123</h1>
    <h1 data-countup='{"decimalPlaces":3}'>3.123</h1>
{% endcapture %}
{% include example.html code=code %}


## Easing

Disable easing using `"useEasing": false`. Easing is set to `true` by default, so that the animation speed changes over the course of its duration.

{% capture code %}
<h1 data-countup>30000</h1>
    <h1 data-countup='{"useEasing": false}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Use grouping

Disable grouping using `"useGrouping": false`. Grouping is set to `true` by default and the default group separator is a comma.

{% capture code %}
<h1 data-countup>30000</h1>
    <h1 data-countup='{"useGrouping": false}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Separator

You can change the default comma group separator using `separator` and specifying the one you wish to use.

{% capture code %}
<h1 data-countup>3000000</h1>
    <h1 data-countup='{"separator":" "}'>3000000</h1>
    <h1 data-countup='{"separator":"-"}'>3000000</h1>
    <h1 data-countup='{"separator":":"}'>3000000</h1>
{% endcapture %}
{% include example.html code=code %}


## Decimal separator

You can also change the decimal separator which is set to a full stop by default. To do it, use `decimal` and specify the decimal separator of your choice.

{% capture code %}
<h1 data-countup='{"decimalPlaces":2}'>3.12</h1>
    <h1 data-countup='{"decimalPlaces":2,"decimal":".."}'>3.12</h1>
    <h1 data-countup='{"decimalPlaces":2,"decimal":"^"}'>3.12</h1>
    <h1 data-countup='{"decimalPlaces":2,"decimal":":"}'>3.12</h1>
{% endcapture %}
{% include example.html code=code %}


## Prefix

Set the countup prefix using `prefix` and specifying the prefix you want to add, for instance a currency symbol.

{% capture code %}
<h1 data-countup='{"prefix":"$"}'>30000</h1>
    <h1 data-countup='{"prefix":"€"}'>30000</h1>
    <h1 data-countup='{"prefix":"£"}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Suffix

Set the countup suffix using `suffix`.

{% capture code %}
<h1 data-countup='{"suffix":"%"}'>30</h1>
    <h1 data-countup='{"suffix":"‰"}'>30</h1>
    <h1 data-countup='{"suffix":"k"}'>30</h1>
{% endcapture %}
{% include example.html code=code %}

Of course you can mix all of these:

{% capture code %}
<h1 data-countup='{"duration":6,"startVal":12345,"decimalPlaces":2,"separator":" ","prefix":"$"}'>64547834.76</h1>
{% endcapture %}
{% include example.html code=code %}

For more advanced features of countups, click [**here**](https://inorganik.github.io/countUp.js/) and see what more you can do.
