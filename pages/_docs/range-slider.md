---
title: Range slider
menu: docs.range-slider
---

All options and features can be found [**here**](https://refreshless.com/nouislider/).

### Basic range slider

{% example %}
    <div data-slider='{"js-name": "slider1","start": 50,"range": {"min": 0,"max": 100}}'></div>
    <!-- Example only --><p demo-slider="slider1"></p>
{% endexample %}

## Options

Basic range slider options.

### Start

The start option sets the number of handles and corresponding start positions.

The start option uses the slider's `'format'` option to decode the input. Number input will be cast to string and decoded.

{% example %}
    <div data-slider='{"js-name": "slider2","start": 30,"range": {"min": 0,"max": 100}}'></div>
    <!-- Example only --><p demo-slider="slider2"></p>
    <div data-slider='{"js-name": "slider3","start": [40,65],"range": {"min": 0,"max": 100}}'></div>
    <!-- Example only --><p demo-slider="slider3"></p>
    <div data-slider='{"js-name": "slider4","start": [25,50,75],"range": {"min": 0,"max": 100}}'></div>
    <!-- Example only --><p demo-slider="slider4"></p>
{% endexample %}

### Range

Range sets the limits of the slider.

{% example %}
    <div data-slider='{"js-name": "slider5","start": 500,"range": {"min": -2000,"max": 10000}}'></div>
    <!-- Example only --><p demo-slider="slider5"></p>
    <div data-slider='{"js-name": "slider6","start": [-250,800],"range": {"min": -500,"max": 1000}}'></div>
    <!-- Example only --><p demo-slider="slider6"></p>
    <div data-slider='{"js-name": "slider7","start": [0.1,0.4,0.9],"range": {"min": 0.1,"max": 1}}'></div>
    <!-- Example only --><p demo-slider="slider7"></p>
{% endexample %}

### Step

By default, the slider slides fluently. In order to make the handles jump between intervals, you can use the step option.

{% example %}
    <div data-slider='{"js-name": "slider8","start": 5000,"range": {"min": 1000,"max": 10000},"step": 1000}'></div>
    <!-- Example only --><p demo-slider="slider8"></p>
    <div data-slider='{"js-name": "slider9","start": 500,"range": {"min": 100,"max": 1000},"step": 125}'></div>
    <!-- Example only --><p demo-slider="slider9"></p>
    <div data-slider='{"js-name": "slider10","start": 50,"range": {"min": 10,"max": 100},"step": 5}'></div>
    <!-- Example only --><p demo-slider="slider10"></p>
{% endexample %}

### Connect

The connect option can be used to control the bar between the handles or the edges of the slider.

If you are using one handle, set the value to either `'upper'` or `'lower'`.
For sliders with 2 or more handles, pass an array with a boolean for every connecting element, including the edges of the slider. The length of this array must match the handle count + 1.

Setting true sets the bars between the handles, but not between the handles and the sliders edges.

{% example %}
    <div data-slider='{"js-name": "slider11","start": 8000,"connect": "lower","range": {"min": [2000],"max": [20000]}}'></div>
    <!-- Example only --><p demo-slider="slider11"></p>
    <div data-slider='{"js-name": "slider12","start": 8000,"connect": "upper","range": {"min": [2000],"max": [20000]}}'></div>
    <!-- Example only --><p demo-slider="slider12"></p>
    <div data-slider='{"js-name": "slider13","start": [4000, 8000, 12000, 16000],"connect": [false, true, true, false, true],"range": {"min": [2000],"max": [20000]}}'></div>
    <!-- Example only --><p demo-slider="slider13"></p>
{% endexample %}

### Margin

When using two handles, the minimum distance between the handles can be set using the margin option. The margin value is relative to the value set in 'range'. This option is only available on linear sliders.

{% example %}
    <div data-slider='{"js-name": "slider14","start": [20,80],"range": {"min": 0,"max": 100},"margin":30}'></div>
    <!-- Example only --><p demo-slider="slider14"></p>
    <div data-slider='{"js-name": "slider15","start": [20,80],"range": {"min": 0,"max": 100},"margin":50}'></div>
    <!-- Example only --><p demo-slider="slider15"></p>
{% endexample %}

### Limit

The limit option is the oposite of the margin option, limiting the maximum distance between two handles. As with the margin option, the limit option can only be used on linear sliders.

{% example %}
    <div data-slider='{"js-name": "slider16","start": [10,120],"connect":true,"range": {"min": 0,"max": 100},"limit":40,"behaviour":"drag"}'></div>
    <!-- Example only --><p demo-slider="slider16"></p>
{% endexample %}

### Padding

Padding limits how close to the slider edges handles can be.

{% example %}
    <div data-slider='{"js-name": "slider17","start": [20,80],"range": {"min": 0,"max": 100},"padding":[10,15]}'></div>
    <!-- Example only --><p demo-slider="slider17"></p>
{% endexample %}

### Orientation

The orientation setting can be used to set the slider to `"vertical"` or `"horizontal"`.

Set dimensions! Vertical sliders don't assume a default `height`, so you'll need to set one. You can use any unit you want, including `%` or `px`.