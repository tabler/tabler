# Forms

Based on `/preview/pages/form-elements.html` and `/shared/includes/forms/` in this repository.

## Base structure

```html
<form class="card">
  <div class="card-header">
    <h4 class="card-title">Form title</h4>
  </div>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">Field label</label>
      <input type="text" class="form-control" placeholder="Placeholder">
    </div>
  </div>
  <div class="card-footer text-end">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
```

## Input types

### Text input
```html
<div class="mb-3">
  <label class="form-label">Username</label>
  <input type="text" class="form-control" placeholder="Username">
</div>
```

### Required label
```html
<label class="form-label required">Email address</label>
```

### Select
```html
<div class="mb-3">
  <label class="form-label">Country</label>
  <select class="form-select">
    <option value="">Germany</option>
    <option value="">Spain</option>
  </select>
</div>
```

### Textarea
```html
<div class="mb-3">
  <label class="form-label">Bio</label>
  <textarea class="form-control" rows="5" placeholder="Write something..."></textarea>
</div>
```

### Checkbox
```html
<div class="form-check mb-3">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">Option 1</label>
</div>
```

### Radio
```html
<div class="form-check mb-3">
  <input class="form-check-input" type="radio" name="radio" id="radio1">
  <label class="form-check-label" for="radio1">Option 1</label>
</div>
```

### Switch (toggle)
```html
<div class="form-check form-switch mb-3">
  <input class="form-check-input" type="checkbox" id="switch1">
  <label class="form-check-label" for="switch1">Enable notifications</label>
</div>
```

## Input with icon

### Icon on the left
```html
<div class="input-icon mb-3">
  <span class="input-icon-addon">
    <svg class="icon"><use xlink:href="#icon-search"/></svg>
  </span>
  <input type="text" class="form-control" placeholder="Search...">
</div>
```

### Loader
```html
<div class="input-icon mb-3">
  <span class="input-icon-addon">
    <div class="spinner-border spinner-border-sm" role="status"></div>
  </span>
  <input type="text" class="form-control" placeholder="Loading..." value="Loading...">
</div>
```

## Input groups

```html
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" placeholder="Price">
  <span class="input-group-text">.00</span>
</div>
```

## Validation states

```html
<div class="mb-3">
  <label class="form-label">Success</label>
  <input type="text" class="form-control is-valid" value="Valid input">
  <div class="valid-feedback">Looks good!</div>
</div>

<div class="mb-3">
  <label class="form-label">Error</label>
  <input type="text" class="form-control is-invalid" value="Invalid input">
  <div class="invalid-feedback">Please provide a valid value.</div>
</div>
```

## Input mask (with imask)

```html
<div class="mb-3">
  <label class="form-label">Date</label>
  <input type="text" class="form-control" data-mask="00/00/0000" placeholder="mm/dd/yyyy">
</div>
```

## Two-column form layout

```html
<form class="card">
  <div class="card-body">
    <h3 class="card-title">Edit Profile</h3>
    <div class="row row-cards">
      <div class="col-md-5">
        <div class="mb-3">
          <label class="form-label">Company</label>
          <input type="text" class="form-control" value="Creative Code Inc.">
        </div>
      </div>
      <div class="col-sm-6 col-md-3">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" value="michael23">
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" placeholder="Email">
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer text-end">
    <button type="submit" class="btn btn-primary">Update Profile</button>
  </div>
</form>
```

## Form footer with buttons

```html
<div class="card-footer text-end">
  <div class="d-flex">
    <a href="#" class="btn btn-link">Cancel</a>
    <button type="submit" class="btn btn-primary ms-auto">Send data</button>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `form-label` | Field label |
| `form-label.required` | Label with asterisk |
| `form-control` | Text input |
| `form-select` | Select dropdown |
| `form-check` | Checkbox/radio wrapper |
| `form-check-input` | Checkbox/radio input |
| `form-check-label` | Checkbox/radio label |
| `form-switch` | Toggle switch |
| `form-control.is-valid` | Valid state |
| `form-control.is-invalid` | Invalid state |
| `valid-feedback` | Success validation message |
| `invalid-feedback` | Error validation message |
| `input-icon` | Input with icon |
| `input-icon-addon` | Icon add-on |
| `input-group` | Input group |
| `input-group-text` | Text in input group |
| `mb-3` | Spacing entre campos |
