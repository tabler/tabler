# Pricing Tables

Based on `/preview/pages/pricing.html` and `/preview/pages/pricing-table.html` in this repository.

## Base structure

### Simple pricing cards

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm">
      <div class="card-body text-center">
        <div class="card-title">Free</div>
        <div class="display-5 fw-bold my-3">$0</div>
        <ul class="list-unstyled lh-lg mb-4">
          <li><strong>3</strong> Team members</li>
          <li><strong>1</strong> Project</li>
          <li>Limited features</li>
        </ul>
        <a href="#" class="btn w-100">Choose plan</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm">
      <div class="card-body text-center">
        <div class="card-title">Premium</div>
        <div class="display-5 fw-bold my-3">$49</div>
        <ul class="list-unstyled lh-lg mb-4">
          <li><strong>10</strong> Team members</li>
          <li><strong>100</strong> Projects</li>
          <li>Premium features</li>
        </ul>
        <a href="#" class="btn btn-primary w-100">Choose plan</a>
      </div>
    </div>
  </div>
</div>
```

## Highlighted plan (recommended)

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm">
      <div class="card-body text-center">
        <div class="card-title">Basic</div>
        <div class="display-5 fw-bold my-3">$9</div>
        <ul class="list-unstyled lh-lg mb-4">
          <li><strong>5</strong> Team members</li>
          <li><strong>20</strong> Projects</li>
        </ul>
        <a href="#" class="btn w-100">Choose plan</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm card-active">
      <div class="ribbon bg-primary">Recommended</div>
      <div class="card-body text-center">
        <div class="card-title">Premium</div>
        <div class="display-5 fw-bold my-3">$49</div>
        <ul class="list-unstyled lh-lg mb-4">
          <li><strong>Unlimited</strong> Team members</li>
          <li><strong>Unlimited</strong> Projects</li>
          <li>Priority support</li>
        </ul>
        <a href="#" class="btn btn-primary w-100">Choose plan</a>
      </div>
    </div>
  </div>
</div>
```

## Comparison table

```html
<div class="card">
  <div class="table-responsive">
    <table class="table table-vcenter table-bordered text-center">
      <thead>
        <tr>
          <th class="w-25">Features</th>
          <th class="w-25">Free</th>
          <th class="w-25">Premium</th>
          <th class="w-25">Enterprise</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-start">Team members</td>
          <td>3</td>
          <td>10</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <td class="text-start">Projects</td>
          <td>1</td>
          <td>100</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <td class="text-start">Storage</td>
          <td>1 GB</td>
          <td>100 GB</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <td class="text-start">API access</td>
          <td>
            <svg class="icon text-secondary"><use xlink:href="#icon-x"/></svg>
          </td>
          <td>
            <svg class="icon text-success"><use xlink:href="#icon-check"/></svg>
          </td>
          <td>
            <svg class="icon text-success"><use xlink:href="#icon-check"/></svg>
          </td>
        </tr>
        <tr>
          <td class="text-start">Priority support</td>
          <td>
            <svg class="icon text-secondary"><use xlink:href="#icon-x"/></svg>
          </td>
          <td>
            <svg class="icon text-secondary"><use xlink:href="#icon-x"/></svg>
          </td>
          <td>
            <svg class="icon text-success"><use xlink:href="#icon-check"/></svg>
          </td>
        </tr>
        <tr class="bg-light">
          <td></td>
          <td>
            <a href="#" class="btn">Choose</a>
          </td>
          <td>
            <a href="#" class="btn btn-primary">Choose</a>
          </td>
          <td>
            <a href="#" class="btn">Choose</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Pricing with yearly toggle

```html
<div class="text-center mb-4">
  <div class="btn-group" role="group" aria-label="Pricing toggle">
    <button type="button" class="btn btn-outline-primary active" id="monthly-btn">Monthly</button>
    <button type="button" class="btn btn-outline-primary" id="yearly-btn">Yearly <span class="badge bg-green ms-1">-20%</span></button>
  </div>
</div>

<div class="row row-cards" id="pricing-cards">
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm">
      <div class="card-body text-center">
        <div class="card-title">Basic</div>
        <div class="display-5 fw-bold my-3">
          <span class="price" data-monthly="$9" data-yearly="$90">$9</span>
          <span class="text-secondary fs-6">/mo</span>
        </div>
        <ul class="list-unstyled lh-lg mb-4">
          <li><strong>5</strong> Team members</li>
          <li><strong>20</strong> Projects</li>
        </ul>
        <a href="#" class="btn btn-primary w-100">Get started</a>
      </div>
    </div>
  </div>
</div>
```

```javascript
// Toggle between monthly and yearly
document.getElementById('monthly-btn').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('yearly-btn').classList.remove('active');
  updatePrices('monthly');
});

document.getElementById('yearly-btn').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('monthly-btn').classList.remove('active');
  updatePrices('yearly');
});

function updatePrices(period) {
  document.querySelectorAll('.price').forEach(function(el) {
    el.textContent = el.dataset[period];
  });
}
```

## Large feature cards

```html
<div class="row row-cards">
  <div class="col-md-6">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div class="bg-primary text-white stamp stamp-md me-3">
            <svg class="icon"><use xlink:href="#icon-users"/></svg>
          </div>
          <div>
            <div class="h2 m-0">$29</div>
            <div class="text-secondary">per month</div>
          </div>
        </div>
        <h3 class="card-title">Team Plan</h3>
        <p class="text-secondary">Perfect for small teams getting started.</p>
        <ul class="list-unstyled space-y-2 mb-4">
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            Up to 10 team members
          </li>
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            50 projects
          </li>
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            24/7 Support
          </li>
        </ul>
        <button class="btn btn-primary w-100">Get started</button>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card card-active">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div class="bg-success text-white stamp stamp-md me-3">
            <svg class="icon"><use xlink:href="#icon-building"/></svg>
          </div>
          <div>
            <div class="h2 m-0">$99</div>
            <div class="text-secondary">per month</div>
          </div>
        </div>
        <h3 class="card-title">Enterprise</h3>
        <p class="text-secondary">For large organizations with advanced needs.</p>
        <ul class="list-unstyled space-y-2 mb-4">
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            Unlimited team members
          </li>
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            Unlimited projects
          </li>
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            Dedicated support
          </li>
          <li class="d-flex align-items-center">
            <svg class="icon text-success me-2"><use xlink:href="#icon-check"/></svg>
            SLA guarantee
          </li>
        </ul>
        <button class="btn btn-success w-100">Contact sales</button>
      </div>
    </div>
  </div>
</div>
```

## Enterprise CTA

```html
<div class="card card-active">
  <div class="card-body">
    <div class="row align-items-center">
      <div class="col">
        <h3 class="card-title">Need a custom plan?</h3>
        <p class="text-secondary mb-0">Contact us for enterprise pricing and custom features.</p>
      </div>
      <div class="col-auto">
        <a href="#" class="btn btn-primary">Contact sales</a>
      </div>
    </div>
  </div>
</div>
```

## Pricing with icon features

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">All plans include</h3>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="d-flex align-items-center">
          <span class="bg-blue-lt avatar me-3">
            <svg class="icon text-blue"><use xlink:href="#icon-shield-check"/></svg>
          </span>
          <div>SSL Security</div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="d-flex align-items-center">
          <span class="bg-green-lt avatar me-3">
            <svg class="icon text-green"><use xlink:href="#icon-backup"/></svg>
          </span>
          <div>Daily backups</div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="d-flex align-items-center">
          <span class="bg-purple-lt avatar me-3">
            <svg class="icon text-purple"><use xlink:href="#icon-api"/></svg>
          </span>
          <div>API access</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `card-sm` | Smaller card padding |
| `display-5` | Large price display |
| `card-active` | Highlighted/active plan |
| `ribbon` / `ribbon-*` | Recommended badge |
| `stamp` / `stamp-md` | Icon stamp |
| `bg-{color}-lt` | Light background tint |
