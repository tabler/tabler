---
title: Cards
menu: docs.cards
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
    <div class="col-md-4">
        {% include cards/card.html title="Card status on top" hide-options=true status-position="top" status-color="red" body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque" %}
    </div>
    <div class="col-md-4">
        {% include cards/card.html title="Card status on left side" hide-options=true status-position="left" status-color="blue" body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque"  %}
    </div>
    <div class="col-md-4">
        {% include cards/card.html title="Card status on bottom" hide-options=true status-position="bottom" status-color="green" body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque"  %}
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

### Card with badge on image

{% example html columns=2 %}
<div class="card flex-row flex-row-reverse">
	<div class="media media-4x3 col-4">
		<a class="media-content " style="background-image:url({% include ui/image.html id=7 %})">
		</a>
		<div class="media-overlay overlay-top">
			<a href="#"><span class="badge badge-md text-uppercase bg-yellow">NATURE</span></a>
		</div>
		<div class="media-action ">
		</div>
	</div>
	<div class="card-body d-flex flex-column">
		<div class="flex-fill ">
			<a href="#" class="card-title text-md">
				It’s 2018, and the race is on between tech giants to decide who will control what you see every time you open your eyes
			</a>
			<a class="text-muted mt-2 ">What Not To Wear: The Hats, Scarves In History</a>
		</div>
		<div class="">
			<div class="text-muted text-sm">Feb 28, 10:54 am</div>
		</div>
	</div>
</div>
{% endexample %}

### Card with badge

{% example html columns=2 %}
<div class="card flex-row">
	<div class="media media-4x3 col-5">
		<a class="media-content " style="background-image:url({% include ui/image.html id=13 %})">
		</a>
		<div class="media-action ">
		</div>
	</div>
	<div class="card-body d-flex flex-column ">
		<div class="flex-fill ">
			<div class="mb-3">
				<a href="#">
					<span class="badge badge-md text-uppercase bg-danger">Fashion</span>
				</a>
			</div>
			<a href="#" class="card-title h-2x">
				What Not To Wear: The Hats, Scarves In History
			</a>
		</div>
		<div class="">
			<div class="text-muted text-sm">Feb 26, 1:49 am</div>
		</div>
	</div>
</div>
{% endexample %}



### Card with aside image

{% example html columns=2 %}
<div class="card flex-row">
	<div class="media media-4x3 col-4">
		<a class="media-content" style="background-image:url({% include ui/image.html id=6 %})"></a>
		<div class="media-overlay overlay-top">
			<a href="#"><span class="badge badge-md text-uppercase bg-white-overlay">MUSIC</span></a>
		</div>
		<div class="media-action ">
		</div>
	</div>
	<div class="card-body d-flex flex-column">
		<div class="flex-fill">
			<a href="#" class="card-title text-md">
				Radio Listeners Prepare For An Impending Alien Invasion In This Visually Stunning Short Film
			</a>
			<a class="text-muted mt-2">What Not To Wear: The Hats, Scarves In History</a>
		</div>
		<div class="text-muted text-sm">Feb 22, 11:38 am</div>
	</div>
</div>
{% endexample %}

### Card with image
{% example html columns=1 %}
<div class="card">
	<img class="card-img-top" src="{{ site.base }}/img/photos/{{ site.data.photos[17].file }}" alt="Card image cap">
	<div class="card-body">
		<h5 class="card-title">Card title that wraps to a new line</h5>
		<p class="card-text">This is a longer card with supporting text below as a natural lead-in to
			additional content. This content is a little bit longer.</p>
		<div class="text-muted text-sm">Feb 28, 10:54 am</div>
	</div>
</div>
{% endexample %}

### Quote card

{% example html columns=1 %}
<div class="card">
  <cardquote class="cardquote text-white bg-primary mb-0 card-body">
	 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
	 <footer class="cardquote-footer">
		 <small>
			 Someone famous in <cite title="Source Title">Source Title</cite>
		 </small>
	 </footer>
  </cardquote>
  </div>
{% endexample %}

### Another Card

{% example html columns=3 %}
<div class="row row-deck">
   <div class="col-6">
      <div class="card text-center">
         <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional
               content.</p>
            <p class="card-text">
               <small class="text-muted">Last updated 3 mins ago</small>
            </p>
         </div>
      </div>
   </div>
   <div class="col-6">
      <div class="card text-right">
         <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional
               content.</p>
            <p class="card-text">
               <small class="text-muted">Last updated 3 mins ago</small>
            </p>
         </div>
      </div>
   </div>
</div>
{% endexample %}

### Image card

{% example html columns=1 %}
<div class="card">
	<img class="card-img" src="{{ site.base }}/img/photos/{{ site.data.photos[19].file }}" alt="Card image">
</div>
{% endexample %}
 
