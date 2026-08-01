# Modals

Based on `/preview/pages/modals.html` and `/shared/includes/ui/modal.html` in this repository.

## Base structure

```html
<div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal content here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

## Sizes

```html
<!-- Small -->
<div class="modal-dialog modal-sm modal-dialog-centered" role="document">...</div>

<!-- Default -->
<div class="modal-dialog modal-dialog-centered" role="document">...</div>

<!-- Large -->
<div class="modal-dialog modal-lg modal-dialog-centered" role="document">...</div>

<!-- Full width -->
<div class="modal-dialog modal-full-width modal-dialog-centered" role="document">...</div>
```

## Scrollable

```html
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">...</div>
```

## Success modal

```html
<div class="modal modal-blur fade" id="modal-success" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center py-4">
        <svg class="icon mb-2 text-success icon-xl"><use xlink:href="#icon-circle-check"/></svg>
        <h3>Success!</h3>
        <div class="text-secondary">Your action was completed successfully.</div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col"><button class="btn w-100" data-bs-dismiss="modal">Cancel</button></div>
            <div class="col"><button class="btn btn-success w-100" data-bs-dismiss="modal">OK</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Danger modal

```html
<div class="modal modal-blur fade" id="modal-danger" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center py-4">
        <svg class="icon mb-2 text-danger icon-xl"><use xlink:href="#icon-alert-circle"/></svg>
        <h3>Are you sure?</h3>
        <div class="text-secondary">This action cannot be undone.</div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col"><button class="btn w-100" data-bs-dismiss="modal">Cancel</button></div>
            <div class="col"><button class="btn btn-danger w-100">Delete</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Button to open modal

```html
<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal-simple">
  Open modal
</button>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `modal` | Modal overlay |
| `modal-blur` | Blur effect on the backdrop |
| `modal fade` | Fade animation |
| `modal-dialog` | Dialog container |
| `modal-dialog-centered` | Vertically centered |
| `modal-sm` | Small size |
| `modal-lg` | Large size |
| `modal-full-width` | Full width |
| `modal-dialog-scrollable` | Internal scroll |
| `modal-content` | Modal content |
| `modal-header` | Header |
| `modal-body` | Body |
| `modal-footer` | Footer |
| `modal-title` | Title |
| `btn-close` | Close button |
| `bg-surface-backdrop` | Backdrop background |
