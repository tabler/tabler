---
title: Modals
menu: docs.modals
bootstrap-link: components/modal/
---

Bootstrap modal is a dialog box/popup with content such as header, body and footer.

### Demo modal
{% example html %}
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <!-- Modal header -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna tortor, consequat sit amet tincidunt nec, consectetur a odio. Nam pulvinar mi ut ligula efficitur bibendum vel non ipsum. Cras pellentesque metus semper velit ornare aliquet. Ut pharetra ante at pretium porttitor. Morbi pulvinar ipsum sit amet erat eleifend, eget blandit eros ultrices. Nulla a ultricies eros, ut sollicitudin urna. Maecenas vel eros laoreet, malesuada enim in, congue sem.
      </div>
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
{% endexample %}

### Modal size

You can change the modal sizes by adding these classes to `.modal-dialog`:
- `.modal-sm`
- `.modal-lg`

{% example html %}
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalSmall">
  Launch small modal
</button>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalFullWidth">
  Launch large modal
</button>

<!-- Small modal -->
<div class="modal fade" id="exampleModalSmall" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
    <!-- Modal header -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna tortor, consequat sit amet tincidunt nec, consectetur a odio. Nam pulvinar mi ut ligula efficitur bibendum vel non ipsum. Cras pellentesque metus semper velit ornare aliquet. Ut pharetra ante at pretium porttitor. Morbi pulvinar ipsum sit amet erat eleifend, eget blandit eros ultrices. Nulla a ultricies eros, ut sollicitudin urna. Maecenas vel eros laoreet, malesuada enim in, congue sem.
      </div>
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- Large modal -->
<div class="modal fade" id="exampleModalFullWidth" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
    <!-- Modal header -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna tortor, consequat sit amet tincidunt nec, consectetur a odio. Nam pulvinar mi ut ligula efficitur bibendum vel non ipsum. Cras pellentesque metus semper velit ornare aliquet. Ut pharetra ante at pretium porttitor. Morbi pulvinar ipsum sit amet erat eleifend, eget blandit eros ultrices. Nulla a ultricies eros, ut sollicitudin urna. Maecenas vel eros laoreet, malesuada enim in, congue sem.
      </div>
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
{% endexample %}

### Vertically centered

Add `.modal-dialog-centered` to `.modal-dialog` to vertically center the modal.

{% example html %}
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna tortor, consequat sit amet tincidunt nec, consectetur a odio. Nam pulvinar mi ut ligula efficitur bibendum vel non ipsum. Cras pellentesque metus semper velit ornare aliquet. Ut pharetra ante at pretium porttitor. Morbi pulvinar ipsum sit amet erat eleifend, eget blandit eros ultrices. Nulla a ultricies eros, ut sollicitudin urna. Maecenas vel eros laoreet, malesuada enim in, congue sem.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
{% endexample %}

### Remove the animation

If for some resons you don't want a modal to be animated just remove the `.fade` class.

{% example %}
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalNoAnimation">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal" id="exampleModalNoAnimation" tabindex="-1" role="dialog" aria-labelledby="exampleModalNoAnimation" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <!-- Modal header -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalNoAnimation">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna tortor, consequat sit amet tincidunt nec, consectetur a odio. Nam pulvinar mi ut ligula efficitur bibendum vel non ipsum. Cras pellentesque metus semper velit ornare aliquet. Ut pharetra ante at pretium porttitor. Morbi pulvinar ipsum sit amet erat eleifend, eget blandit eros ultrices. Nulla a ultricies eros, ut sollicitudin urna. Maecenas vel eros laoreet, malesuada enim in, congue sem.
      </div>
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
{% endexample %}