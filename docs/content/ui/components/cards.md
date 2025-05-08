---
title: Cards
summary: Cards are flexible user interface elements, which help organize content into meaningful sections and make it easier to display on different screen sizes. Cards contain various smaller components, such as images, text, links and buttons and may act as an entry to more detailed information, helping users scan the page quickly and find the most relevant content.
bootstrapLink: components/card/
description: Organize content with flexible cards.
---

## Default card

Use the `.card` and `.card-body` classes to create a card and use it as the basis for a more advanced card design. A card is a perfect way to organize content and make it look neat and tidy.

{% capture html -%}
<div class="card">
  <div class="card-body">
    <p>This is some text within a card body.</p>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

## Card padding

You can change the padding of a newly created card. To do it, use the `.card-sm`, `.card-md` or `.card-lg` classes.

Cards with the `.card-sm` class are well suited for small items such as widgets, etc., while the `.card-lg` class can be used for large blocks of text. Padding will be automatically reduced on small devices, to fit the screen size.

{% capture html -%}
<div class="card card-sm">
  <div class="card-body">This is some text within a card body.</div>
</div>
<div class="card">
  <div class="card-body">This is some text within a card body.</div>
</div>
<div class="card card-md">
  <div class="card-body">This is some text within a card body.</div>
</div>
<div class="card card-lg">
  <div class="card-body">This is some text within a card body.</div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

## Card with title

Add a title to your card by including the `.card-title` class within `.card-body`. You can also place the title inside the `.card-header` element to separate the title from the content with a horizontal line.

{% capture html -%}
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Card title</h3>
    <p class="text-secondary">This is some text within a card body.</p>
  </div>
</div>
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card title</h3>
  </div>
  <div class="card-body">
    <p class="text-secondary">This is some text within a card body.</p>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

## Card with title and image

To create a more visually appealing card, add a title and an image. Thanks to that, the card will go well with your interface design and draw users' attention.

{% capture html -%}
<div class="card">
  <!-- Photo -->
  <div
    class="img-responsive img-responsive-21x9 card-img-top"
    style="background-image: url(/static/photos/cup-of-coffee-and-an-open-book.jpg)"
  ></div>
  <div class="card-body">
    <h3 class="card-title">Card with title and image</h3>
    <p class="text-secondary">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt,
      iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
    </p>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

## Blog post card

Add an image to your blog post card to make it eye-catching. You can do it by adding the image, with a `.card-img-top` class, inside the `.card` element. Thanks to the `.d-flex` and `.flex-column` classes within `.card-body`, the author details will be displayed at the bottom of the card.

{% capture html -%}
<div class="card d-flex flex-column">
  <a href="#">
    <img class="card-img-top" src="/static/photos/book-on-the-grass.jpg" alt="" />
  </a>
  <div class="card-body d-flex flex-column">
    <h3 class="card-title">
      <a href="#">How do you know she is a witch?</a>
    </h3>
    <div class="text-secondary">
      Are you suggesting that coconuts migrate? No, no, no! Yes, yes. A bit. But she's got a wart.
      You ...
    </div>
    <div class="d-flex align-items-center pt-4 mt-auto">
      <span class="avatar" style="background-image: url(/static/avatars/023m.jpg)"></span>
      <div class="ms-3">
        <a href="#" class="text-body">Maryjo Lebarree</a>
        <div class="text-secondary">3 days ago</div>
      </div>
      <div class="ms-auto">
        <a href="#" class="icon d-none d-md-inline-block ms-3 text-secondary">
          {% include "ui/icon.html" icon="heart" %}
        </a>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

## Row deck

Add the `.row-deck` class to `.row`, if you want to display several cards next to one another. Thanks to that, they will all have the same height.

{% capture html -%}
<div class="row row-deck">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">Short content</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        Extra long content of card. Lorem ipsum dolor sit amet, consetetur sadipscing elitr
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">Short content</div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" %}

## Post card with aside image

You can also add an image on the left side of the card. To do it, add the `.card-aside` class to the element with the `.card` class. Then add the image in the `.card-aside-column` element and it will be automatically centered and scaled to the right size.

{% capture html -%}
<div class="card d-flex flex-column">
  <div class="row row-0 flex-fill">
    <div class="col-md-3">
      <a href="#">
        <img
          src="/static/photos/a-woman-works-on-a-laptop-at-home.jpg"
          class="w-100 h-100 object-cover"
          alt="Card side image"
        />
      </a>
    </div>
    <div class="col">
      <div class="card-body h-full d-flex flex-column">
        <h3 class="card-title">
          <a href="#">Shut up!</a>
        </h3>
        <div class="text-secondary">
          Burn her! How do you know she is a witch? You don't frighten us, English pig-dogs! Go and
          boil yo...
        </div>
        <div class="d-flex align-items-center pt-4 mt-auto">
          <span class="avatar" style="background-image: url(/static/avatars/029m.jpg)"></span>
          <div class="ms-3">
            <a href="#" class="text-body">Egan Poetz</a>
            <div class="text-secondary">3 days ago</div>
          </div>
          <div class="ms-auto">
            <a href="#" class="icon d-none d-md-inline-block ms-3 text-red">
              {% include "ui/icon.html" icon="heart" %}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" %}

## Color variations

Add a status color to your card, either at the top or on the side of the card, to customize it and make it more eye-catching. Use `card-status-*` and `bg-*` classes to change the placement and color of the status border.

{% capture html -%}
<div class="row row-deck">
  <div class="col-md-6">
    <div class="card">
      <div class="card-status-top bg-danger"></div>
      <div class="card-body">
        <h3 class="card-title">Card with top status</h3>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt,
          iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card">
      <div class="card-status-start bg-green"></div>
      <div class="card-body">
        <h3 class="card-title">Card with side status</h3>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt,
          iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
        </p>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" %}

## Stacked card

Use the `card-stacked` class to stack up multiple cards, if you want to save screen space or create a visually appealing effect.

{% capture html -%}
<div class="card card-stacked">
  <div class="card-body">
    <h3 class="card-title">Stacked card</h3>
    <p class="text-secondary">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt,
      iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
    </p>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

## Tabbed card

Organize multiple cards into tabs to be able to display more content in a well-organized way and allow users to alternate between them easily.

{% capture html -%}
<div class="card-tabs">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="#tab-top-1" class="nav-link active" data-bs-toggle="tab">Tab 1</a>
    </li>
    <li class="nav-item">
      <a href="#tab-top-2" class="nav-link" data-bs-toggle="tab">Tab 2</a>
    </li>
    <li class="nav-item">
      <a href="#tab-top-3" class="nav-link" data-bs-toggle="tab">Tab 3</a>
    </li>
    <li class="nav-item">
      <a href="#tab-top-4" class="nav-link" data-bs-toggle="tab">Tab 4</a>
    </li>
  </ul>
  <div class="tab-content">
    <div id="tab-top-1" class="card tab-pane active show">
      <div class="card-body">
        <div class="card-title">Content of tab #1</div>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
          distinctio dolorem expedita, fugiat hic magni molestiae molestias odit.
        </p>
      </div>
    </div>
    <div id="tab-top-2" class="card tab-pane">
      <div class="card-body">
        <div class="card-title">Content of tab #2</div>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
          distinctio dolorem expedita, fugiat hic magni molestiae molestias odit.
        </p>
      </div>
    </div>
    <div id="tab-top-3" class="card tab-pane">
      <div class="card-body">
        <div class="card-title">Content of tab #3</div>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
          distinctio dolorem expedita, fugiat hic magni molestiae molestias odit.
        </p>
      </div>
    </div>
    <div id="tab-top-4" class="card tab-pane">
      <div class="card-body">
        <div class="card-title">Content of tab #4</div>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
          distinctio dolorem expedita, fugiat hic magni molestiae molestias odit.
        </p>
      </div>
    </div>
  </div>
</div>
{%- endcapture %}
{% include "docs/example.html" html=html bg="surface-secondary" column %}

