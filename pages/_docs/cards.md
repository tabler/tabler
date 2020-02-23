---
title: Cards
menu: docs.cards
description: A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options. 
bootstrap-link: components/card/
done: true
---

The `.card` element is simply a container with a shadow, a border, a radius, and some padding. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components.


## Default card

To create a new card you have to use the `.card` and `.card-body` classes. You can put any content inside. 

{% capture code %}
{% include cards/card.html body="This is some text within a card body." %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Card padding

You can change the padding of a newly created card. You can do this with the `.card-sm`, `.card-md` and `.card-lg` classes. 

Cards with the `.card-sm` class are very well suited for small items such as snippets, etc., while `.card-lg` can be used for large blocks of text. On small devices, padding will automatically be reduced to fit on the screen.

{% capture code %}
{% include cards/card.html class="card-sm" body="This is some text within a card body." %}
{% include cards/card.html body="This is some text within a card body." %}
{% include cards/card.html class="card-md" body="This is some text within a card body." %}
{% include cards/card.html class="card-lg" body="This is some text within a card body." %}
{% endcapture %}
{% include example.html code=code columns=2 %}


## Card with title

To add a title to a card you should add a class `.card-title` inside `.card-body`.

You can also place the title inside the `.card-header` element - then the title will be separated from the content by a horizontal line.

{% capture code %}
{% include cards/card.html title="Card title" body="This is some text within a card body." %}
{% include cards/card.html header-title="Card title" body="This is some text within a card body." %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Card with title and image

{% capture code %}
{% include cards/card.html img-top=true title="Card with title and image" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Blog post card

The best way to make your post eye-catching is adding an image to it. To do so, just add the image with the `.card-img-top` class. We've added the `.d-flex .flex-column` classes to the `.card-body` to have the author details be on the bottom of the card.

{% capture code %}
{% include cards/blog-single.html type="image" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Row deck

If you want to create a couple of posts next to each other, add the `.row-deck` class to `.row`—then they will all have the same height.

{% capture code %}
<div class="row row-deck">
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
{% endcapture %}
{% include example.html code=code columns=2 %}


## Post card with aside image

You can also add the image on the left side of the card. All you need do to is: add the `.card-aside` class to the element with the `.card` class. Then add the image in the `.card-aside-column` element. No worries, tabler will automatically center it and scale to right size:

{% capture code %}
{% include cards/blog-single.html type="aside" liked=1 article-id=3 %}
{% endcapture %}
{% include example.html code=code columns=2 %}


## Color variations

{% capture code %}
<div class="row row-deck">
    <div class="col-md-6">
        {% include cards/card.html status-top="danger" title="Card with top status" %}
    </div>
    <div class="col-md-6">
        {% include cards/card.html status-left="green" title="Card with side status" %}
    </div>
</div>
{% endcapture %}
{% include example.html code=code columns=2 %}


## Stacked card

{% capture code %}
{% include cards/card.html class="card-stacked" title="Stacked card" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabbed card

{% capture code %}
{% include cards/card-tabs.html count=4 %}
{% endcapture %}
{% include example.html code=code columns=2 %}

