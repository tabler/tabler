---
title: Cards
icon: fe fe-image
description: A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options. 
---

The `.card` element is simply a container with a shadow, a border, a radius, and some padding. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components.

### Default card

{% example html columns=1 %}
{% include cards/card.html hide-options=true %}
{% endexample %}

### Advanced card

{% example html columns=1 %}
{% include cards/card.html show-buttons=true show-footer=true %}
{% endexample %}

### Blog post card

The best way to make your post eye-catching is adding an image to it. To do so, just add the image with the `.card-img-top` class. We've added the `.d-flex .flex-column` classes to the `.card-body` to have the author details be on the bottom of the card.

{% example html columns=1 %}
{% include cards/blog-single.html type="image" %}
{% endexample %}

### Row deck

If you want to create a couple of posts next to each other, add the `.row-deck` class to `.row`—then they will all have the same height.

{% example html columns=2 %}
<div class="row row-cards row-deck">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">Short content</div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">Extra long content of card. Lorem ipsum dolor sit amet, consetetur sadipscing elitr</div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">Short content</div>
        </div>
    </div>
</div>
{% endexample %}

### Post card with aside image

You can also add the image on the left side of the card. All you need do to is: add the `.card-aside` class to the element with the `.card` class. Then add the image in the `.card-aside-column` element. No worries, tabler will automatically center it and scale to right size:

{% example html columns=2 %}
{% include cards/blog-single.html type="aside" liked=1 %}
{% endexample %}

### Color variations

{% example html columns=2 %}
<div class="row row-cards row-deck">
    <div class="col-md-6">
        {% include cards/card.html title="Card status" hide-options=true status="purple" %}
    </div>
    <div class="col-md-6">
        {% include cards/card.html title="Card status on left side" hide-options=true status-left="blue" %}
    </div>
</div>
{% endexample %}


### Card with switch

{% example html columns=1 %}
{% include cards/card.html title="Card with switch" show-switch=true %}
{% endexample %}

### Card with loader

{% example html columns=1 %}
{% include cards/card.html title="Card with loader" hide-options=true show-loader=true %}
{% endexample %}