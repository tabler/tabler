---
title: Blog components
---

Tabler is a great choice when it comes to the blog management. It allows you to create advanced systems with which you'll be able to administrate your posts without the mess. With our components, your blog will be transparent and really nice-looking.

### Post card

The best way to make your post eye-catching is adding an image to it. To do so, just add the image with the `.card-img-top` class:

{% example html columns=1 %}
{% include cards/blog-single.html type="image" %}
{% endexample %}

We've added the `.d-flex .flex-column` classes to the `.card-body` to have the author details be on the bottom of the card.

If you want to create a couple of posts next to each other, add the `.row-deck` class to `.row`—then they will all have the same height:

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

See more live examples [here]({{ site.base }}/blog.html).
