# Tables

Based on `/preview/pages/tables.html` and `/shared/includes/ui/table.html` in this repository.

## Base structure

```html
<div class="table-responsive">
  <table class="table table-vcenter">
    <thead>
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Email</th>
        <th>Role</th>
        <th class="w-1"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td class="text-secondary">Engineer, Engineering</td>
        <td class="text-secondary">
          <a href="#" class="text-reset">john@example.com</a>
        </td>
        <td class="text-secondary">Admin</td>
        <td><a href="#">Edit</a></td>
      </tr>
    </tbody>
  </table>
</div>
```

## Inside a card

```html
<div class="card">
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      ...
    </table>
  </div>
</div>
```

## With avatars

```html
<tr>
  <td>
    <div class="d-flex py-1 align-items-center">
      <span class="avatar avatar-sm me-2" style="background-image: url(./static/avatars/001.jpg)"></span>
      <div class="flex-fill">
        <div class="fw-medium">John Doe</div>
        <div class="text-secondary"><a href="#" class="text-reset">john@example.com</a></div>
      </div>
    </div>
  </td>
  <td>
    <div>Engineer</div>
    <div class="text-secondary">Engineering</div>
  </td>
  <td class="text-secondary">
    <div class="btn-list flex-nowrap">
      <a href="#" class="btn">Edit</a>
      <div class="dropdown">
        <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown">Actions</button>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="#">View</a>
          <a class="dropdown-item" href="#">Edit</a>
        </div>
      </div>
    </div>
  </td>
</tr>
```

## With status badges

```html
<tr>
  <td>John Doe</td>
  <td>john@example.com</td>
  <td>
    <span class="badge bg-success text-success-fg">Active</span>
  </td>
  <td>
    <span class="badge bg-warning text-warning-fg">Pending</span>
  </td>
  <td>
    <span class="badge bg-danger text-danger-fg">Inactive</span>
  </td>
</tr>
```

## Striped

```html
<table class="table table-vcenter card-table table-striped">
```

## Mobile responsive

```html
<table class="table table-vcenter table-mobile-md">
  <!-- use data-label on td to show labels on mobile -->
  <td data-label="Name">John Doe</td>
</table>
```

## Empty table (empty state)

```html
<div class="card">
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>...</thead>
      <tbody>
        <tr>
          <td colspan="5">
            <div class="empty">
              <p class="empty-title">No data found</p>
              <a href="#" class="btn btn-primary">Add first item</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `table` | Base Bootstrap 5 |
| `table-vcenter` | Vertically centered cells |
| `table-responsive` | Horizontal scroll on mobile |
| `card-table` | Table inside card (no padding) |
| `table-striped` | Alternating rows |
| `table-mobile-md` | Mobile mode with labels |
| `table-nowrap` | No text wrapping |
| `fw-medium` | Medium font weight for names |
| `text-secondary` | Secondary text |
| `data-label` | Label for mobile view |
