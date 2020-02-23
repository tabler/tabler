---
title: Countup
menu: docs.countup
---

Countups with many options that can be found [here](https://inorganik.github.io/countUp.js/)

To make countup add `data-countup` to any html text tag.


## Default countup

Set number to count up.

{% capture code %}
<h1 data-countup>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Duration

Set the `duration` of the countup. (2s is set by default)

{% capture code %}
<h1 data-countup>30000</h1>
    <h1 data-countup='{"duration":4}'>30000</h1>
    <h1 data-countup='{"duration":6}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Starting value

Set the start value of countup using `startVal`.
If you set it bigger than the `count`, countup will run reverse.

{% capture code %}
<h1 data-countup='{"startVal":12345}'>30000</h1>
<h1 data-countup='{"startVal":47655}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Decimal places

Set how many decimal places to show using `decimalPlaces`.

{% capture code %}
<h1 data-countup>3.123</h1>
    <h1 data-countup='{"decimalPlaces":1}'>3.123</h1>
    <h1 data-countup='{"decimalPlaces":2}'>3.123</h1>
    <h1 data-countup='{"decimalPlaces":3}'>3.123</h1>
{% endcapture %}
{% include example.html code=code %}


## Easing

Disable easing using `"useEasing": false`. (`true` by default)

{% capture code %}
<h1 data-countup>30000</h1>
    <h1 data-countup='{"useEasing": false}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Use grouping

Disable grouping using `"useGrouping": false`. (`true` by default)

{% capture code %}
<h1 data-countup>30000</h1>
    <h1 data-countup='{"useGrouping": false}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Separator

Set seperator that seperates groups using `separator`. (`,` by default)

{% capture code %}
<h1 data-countup>3000000</h1>
    <h1 data-countup='{"separator":" "}'>3000000</h1>
    <h1 data-countup='{"separator":"-"}'>3000000</h1>
    <h1 data-countup='{"separator":":"}'>3000000</h1>
{% endcapture %}
{% include example.html code=code %}


## Decimal separator

Set decimal separator using `decimal`. (`.` by default)

{% capture code %}
<h1 data-countup='{"decimalPlaces":2}'>3.12</h1>
    <h1 data-countup='{"decimalPlaces":2,"decimal":".."}'>3.12</h1>
    <h1 data-countup='{"decimalPlaces":2,"decimal":"^"}'>3.12</h1>
    <h1 data-countup='{"decimalPlaces":2,"decimal":":"}'>3.12</h1>
{% endcapture %}
{% include example.html code=code %}


## Prefix

Set countup prefix using `prefix`.

{% capture code %}
<h1 data-countup='{"prefix":"$"}'>30000</h1>
    <h1 data-countup='{"prefix":"€"}'>30000</h1>
    <h1 data-countup='{"prefix":"£"}'>30000</h1>
{% endcapture %}
{% include example.html code=code %}


## Suffix

Set countup suffix using `suffix`.

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

To do more advanced stuff with countups go [**here**](https://inorganik.github.io/countUp.js/) to check how it's done.
