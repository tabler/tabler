# Toasts

Based on `/preview/pages/toasts.html` and `/shared/includes/ui/toast.html` in this repository.

## Base structure

```html
<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div class="toast show" id="toast-simple" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
    <div class="toast-header">
      <span class="avatar avatar-xs me-2">JD</span>
      <strong class="me-auto">John Doe</strong>
      <small>11 mins ago</small>
      <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
```

## Button to show toast

```html
<button class="btn" data-bs-toggle="toast" data-bs-target="#toast-simple">Show toast</button>
```

## Cookies toast

```html
<div class="toast show" id="toast-cookies" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
  <div class="toast-body">
    🍪 Our site uses cookies. By continuing to use our site, you agree to our Cookie Policy.
    <div class="mt-2 pt-2 border-top">
      <a href="#" class="btn btn-primary btn-sm">I understand</a>
    </div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `toast-container` | Positioned container |
| `toast` | Base |
| `toast.show` | Visible |
| `toast-header` | Header |
| `toast-body` | Body |
| `position-fixed bottom-0 end-0` | Fixed bottom-right position |
| `data-bs-toggle="toast"` | Trigger button |
| `data-bs-autohide` | Auto-hide (false = remains) |
