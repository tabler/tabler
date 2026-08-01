# Wizard / Steps

Based on `/preview/pages/wizard.html` and `/shared/includes/ui/steps.html` in this repository.

## Base structure

```html
<div class="card">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
      <li class="nav-item">
        <a href="#tabs-step-1" class="nav-link active" data-bs-toggle="tab">Step 1</a>
      </li>
      <li class="nav-item">
        <a href="#tabs-step-2" class="nav-link" data-bs-toggle="tab">Step 2</a>
      </li>
      <li class="nav-item">
        <a href="#tabs-step-3" class="nav-link" data-bs-toggle="tab">Step 3</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="tab-content">
      <div class="tab-pane active show" id="tabs-step-1">
        <h3>Step 1 Content</h3>
        <p>First step content goes here...</p>
        <div class="mt-4">
          <button class="btn btn-primary" onclick="nextStep(2)">Next</button>
        </div>
      </div>
      <div class="tab-pane" id="tabs-step-2">
        <h3>Step 2 Content</h3>
        <p>Second step content...</p>
        <div class="mt-4">
          <button class="btn" onclick="prevStep(1)">Previous</button>
          <button class="btn btn-primary" onclick="nextStep(3)">Next</button>
        </div>
      </div>
      <div class="tab-pane" id="tabs-step-3">
        <h3>Step 3 Content</h3>
        <p>Final step...</p>
        <div class="mt-4">
          <button class="btn" onclick="prevStep(2)">Previous</button>
          <button class="btn btn-success">Complete</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

```javascript
function nextStep(step) {
  var tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabs[step - 1].click();
}

function prevStep(step) {
  var tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabs[step - 1].click();
}
```

## Horizontal steps

```html
<div class="card">
  <div class="card-body">
    <div class="steps steps-horizontal mb-4">
      <a href="#" class="step-item active">
        <span class="step-item-icon">1</span>
        <span class="step-item-title">Account</span>
      </a>
      <a href="#" class="step-item">
        <span class="step-item-icon">2</span>
        <span class="step-item-title">Profile</span>
      </a>
      <a href="#" class="step-item">
        <span class="step-item-icon">3</span>
        <span class="step-item-title">Review</span>
      </a>
    </div>
    
    <div class="wizard-content">
      <!-- Wizard content here -->
    </div>
  </div>
</div>
```

## Vertical steps

```html
<div class="row">
  <div class="col-md-4">
    <div class="steps steps-vertical">
      <a href="#" class="step-item active">
        <span class="step-item-icon">1</span>
        <div class="step-item-content">
          <div class="step-item-title">Account</div>
          <div class="step-item-desc">Setup your account</div>
        </div>
      </a>
      <a href="#" class="step-item">
        <span class="step-item-icon">2</span>
        <div class="step-item-content">
          <div class="step-item-title">Profile</div>
          <div class="step-item-desc">Add your details</div>
        </div>
      </a>
      <a href="#" class="step-item">
        <span class="step-item-icon">3</span>
        <div class="step-item-content">
          <div class="step-item-title">Review</div>
          <div class="step-item-desc">Check everything</div>
        </div>
      </a>
    </div>
  </div>
  <div class="col-md-8">
    <!-- Wizard content -->
  </div>
</div>
```

## Steps with checkmark

```html
<div class="steps steps-horizontal">
  <a href="#" class="step-item active">
    <span class="step-item-icon">
      <svg class="icon"><use xlink:href="#icon-check"/></svg>
    </span>
    <span class="step-item-title">Completed</span>
  </a>
  <a href="#" class="step-item">
    <span class="step-item-icon">2</span>
    <span class="step-item-title">Current</span>
  </a>
  <a href="#" class="step-item">
    <span class="step-item-icon">3</span>
    <span class="step-item-title">Pending</span>
  </a>
</div>
```

## Steps with colors

```html
<div class="steps steps-horizontal">
  <a href="#" class="step-item step-item-success">
    <span class="step-item-icon">
      <svg class="icon"><use xlink:href="#icon-check"/></svg>
    </span>
    <span class="step-item-title">Success</span>
  </a>
  <a href="#" class="step-item step-item-warning">
    <span class="step-item-icon">!</span>
    <span class="step-item-title">Warning</span>
  </a>
  <a href="#" class="step-item step-item-danger">
    <span class="step-item-icon">×</span>
    <span class="step-item-title">Error</span>
  </a>
</div>
```

## Complete wizard example with form validation

```html
<div class="card">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" id="wizard-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="tab-step1" data-bs-toggle="tab" href="#step1" role="tab">
          <span class="step-number">1</span> Personal
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="tab-step2" data-bs-toggle="tab" href="#step2" role="tab">
          <span class="step-number">2</span> Account
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="tab-step3" data-bs-toggle="tab" href="#step3" role="tab">
          <span class="step-number">3</span> Review
        </a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <form id="wizard-form">
      <div class="tab-content">
        <div class="tab-pane fade show active" id="step1" role="tabpanel">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" name="firstName" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" name="lastName" required>
          </div>
          <div class="text-end">
            <button type="button" class="btn btn-primary" onclick="validateAndNext(1)">Next</button>
          </div>
        </div>
        
        <div class="tab-pane fade" id="step2" role="tabpanel">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="email" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" name="password" required>
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" onclick="goToStep(0)">Previous</button>
            <button type="button" class="btn btn-primary" onclick="validateAndNext(2)">Next</button>
          </div>
        </div>
        
        <div class="tab-pane fade" id="step3" role="tabpanel">
          <div class="alert alert-info">
            <h4>Review your information</h4>
            <p>Please review before submitting.</p>
          </div>
          <div id="review-content">
            <!-- Populated by JavaScript -->
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" onclick="goToStep(1)">Previous</button>
            <button type="submit" class="btn btn-success">Submit</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
```

```javascript
function validateAndNext(currentStep) {
  var currentPane = document.getElementById('step' + currentStep);
  var inputs = currentPane.querySelectorAll('input[required]');
  var isValid = true;
  
  inputs.forEach(function(input) {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      isValid = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });
  
  if (isValid) {
    goToStep(currentStep);
  }
}

function goToStep(stepIndex) {
  var tabs = document.querySelectorAll('#wizard-tabs .nav-link');
  tabs[stepIndex].click();
}

// Review step population
document.getElementById('tab-step3').addEventListener('shown.bs.tab', function() {
  var form = document.getElementById('wizard-form');
  var review = document.getElementById('review-content');
  var data = new FormData(form);
  
  review.innerHTML = `
    <p><strong>First Name:</strong> ${data.get('firstName')}</p>
    <p><strong>Last Name:</strong> ${data.get('lastName')}</p>
    <p><strong>Email:</strong> ${data.get('email')}</p>
  `;
});
```

## Classes

| Class | Purpose |
|-------|-----------|
| `steps` | Steps container |
| `steps-horizontal` | Horizontal layout |
| `steps-vertical` | Vertical layout |
| `step-item` | Single step |
| `step-item-icon` | Step number/icon |
| `step-item-title` | Step title |
| `step-item-content` | Content wrapper (vertical) |
| `step-item-desc` | Step description |
| `step-item-success` | Success state color |
| `step-item-warning` | Warning state color |
| `step-item-danger` | Danger state color |
| `active` | Active step |
