---
title: Cards
menu: docs.cards
description: Cards are flexible user interface elements, which help organize content into meaningful sections and make it easier to display on different screen sizes. Cards contain various smaller components, such as images, text, links and buttons and may act as an entry to more detailed information, helping users scan the page quickly and find the most relevant content.
bootstrap-link: components/card/
done: true
---


## Default card

Use the `.card` and `.card-body` classes to create a card and use it as the basis for a more advanced card design. A card is a perfect way to organize content and make it look neat and tidy. 

{% capture code %}
{% include cards/card.html body="This is some text within a card body." %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Card padding

You can change the padding of a newly created card. To do it, use the `.card-sm`, `.card-md` or `.card-lg` classes. 

Cards with the `.card-sm` class are well suited for small items such as snippets, etc., while the `.card-lg` class can be used for large blocks of text. Padding will be automatically reduced on small devices, to fit the screen size.

{% capture code %}
{% include cards/card.html class="card-sm" body="This is some text within a card body." %}
{% include cards/card.html body="This is some text within a card body." %}
{% include cards/card.html class="card-md" body="This is some text within a card body." %}
{% include cards/card.html class="card-lg" body="This is some text within a card body." %}
{% endcapture %}
{% include example.html code=code columns=2 %}


## Card with title

Add a title to your card by including the `.card-title` class within `.card-body`. You can also place the title inside the `.card-header` element to separate the title from the content with a horizontal line.

{% capture code %}
{% include cards/card.html title="Card title" body="This is some text within a card body." %}
{% include cards/card.html header-title="Card title" body="This is some text within a card body." %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Card with title and image

To create a more visually appealing card, add a title and an image. Thanks to that, the card will go well with your inteface design and draw users' attention.  

{% capture code %}
{% include cards/card.html img-top=true title="Card with title and image" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Blog post card

Add an image to your blog post card to make it eye-catching. You can do it by adding the image in the `.card-img-top` class. Thanks to the `.d-flex` and `.flex-column` classes within `.card-body`, the author details will be displayed at the bottom of the card.

{% capture code %}
{% include cards/blog-single.html type="image" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Row deck

Add the `.row-deck` class to `.row`, if you want to display several cards next to one another. Thanks to that, they will all have the same height.

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

You can also add an image on the left side of the card. To do it, add the `.card-aside` class to the element with the `.card` class. Then add the image in the `.card-aside-column` element and it will be automatically centered and scaled to the right size.

{% capture code %}
{% include cards/blog-single.html type="aside" liked=1 article-id=3 %}
{% endcapture %}
{% include example.html code=code columns=2 %}


## Color variations

Add a status color to your card, either at the top or on the side of the card, to customise it and make it more eye-catching. 

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

Use the `card-stacked` class to stack up multiple cards, if you want to save screen space or create a visually appealing effect.

{% capture code %}
{% include cards/card.html class="card-stacked" title="Stacked card" %}
{% endcapture %}
{% include example.html code=code columns=1 %}


## Tabbed card

Organize multiple cards into tabs to be able to display more content in a well-organized way and allow users to alternate between them easily.

{% capture code %}
{% include cards/card-tabs.html count=4 %}
{% endcapture %}
{% include example.html code=code columns=2 %}

