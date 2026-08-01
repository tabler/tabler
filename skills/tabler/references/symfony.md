# Symfony + Tabler Integration

## Installing Tabler in Symfony

### Option 1: CDN (fast, no build tools)
Add CDN assets directly in `base.html.twig`. No additional configuration required.

```twig
{# templates/base.html.twig #}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler.min.css">
<script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/js/tabler.min.js"></script>
```

### Option 2: AssetMapper (Symfony 6.4+)
```bash
# Download and copy assets
# Or use CDN for simplicity

composer require symfony/asset-mapper
```

In `config/packages/framework.yaml`:
```yaml
framework:
  asset_mapper:
    paths:
      - assets/
```

Copy the assets to `assets/vendor/tabler/` and reference them:
```twig
<link rel="stylesheet" href="{{ asset('vendor/tabler/dist/css/tabler.min.css') }}">
```

### Option 3: Webpack Encore
```bash
npm install @tabler/core
```

In `webpack.config.js`:
```js
// Copy Tabler assets
.copyFiles({
  from: 'node_modules/@tabler/core/dist/',
  to: 'tabler/[path][name].[ext]',
  pattern: /\.(css|js|svg|png|jpg|woff2?)$/
})
```

In `assets/app.js`:
```js
import '@tabler/core/dist/js/tabler.min.js';
```

## Recommended directory structure

```
templates/
  base.html.twig               # Base layout with all components
  _sidebar.html.twig           # Sidebar menu
  _navbar.html.twig            # Top navbar
  _flash_messages.html.twig    # Flash messages
  dashboard/
    index.html.twig            # Main dashboard
    stats.html.twig            # Statistics
    settings.html.twig         # Settings
  users/
    index.html.twig            # User list
    edit.html.twig             # Edit form
    show.html.twig             # User detail
  invoices/
    index.html.twig            # Invoice list
    show.html.twig             # Invoice detail
src/
  Controller/
    DashboardController.php
    UserController.php
    InvoiceController.php
```

## Sidebar with active items by route

**_sidebar.html.twig:**
```twig
{% set route = app.request.attributes.get('_route') %}
{% set is_active = route starts with 'dashboard_' %}

<aside class="navbar navbar-vertical navbar-expand-lg" data-bs-theme="dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h1 class="navbar-brand navbar-brand-autodark">
      <a href="{{ path('dashboard_index') }}">My App</a>
    </h1>
    <div class="collapse navbar-collapse" id="sidebar-menu">
      <ul class="navbar-nav pt-lg-3">
        <li class="nav-item {{ route starts with 'dashboard_' ? 'active' : '' }}">
          <a class="nav-link" href="{{ path('dashboard_index') }}">
            <span class="nav-link-title">Dashboard</span>
          </a>
        </li>
        <li class="nav-item {{ route starts with 'user_' ? 'active' : '' }}">
          <a class="nav-link" href="{{ path('user_index') }}">
            <span class="nav-link-title">Users</span>
          </a>
        </li>
        <li class="nav-item dropdown {{ route starts with 'invoice_' ? 'active' : '' }}">
          <a class="nav-link dropdown-toggle" href="#navbar-invoices" data-bs-toggle="dropdown">
            <span class="nav-link-title">Invoices</span>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="{{ path('invoice_index') }}">All</a>
            <a class="dropdown-item" href="{{ path('invoice_create') }}">New</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</aside>
```

## Navbar with user menu and theme toggle

**_navbar.html.twig:**
```twig
<header class="navbar navbar-expand-md d-none d-lg-flex d-print-none">
  <div class="container-xl">
    <div class="navbar-nav flex-row order-md-last">
      <!-- Theme toggle -->
      <div class="nav-item d-none d-md-flex me-3">
        <div class="btn-list">
          <a href="?theme=dark" class="nav-link px-0 hide-theme-dark" title="Dark mode">
            <svg class="icon" width="24" height="24">
              <use xlink:href="#icon-moon"/>
            </svg>
          </a>
          <a href="?theme=light" class="nav-link px-0 hide-theme-light" title="Light mode">
            <svg class="icon" width="24" height="24">
              <use xlink:href="#icon-sun"/>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- User dropdown -->
      <div class="nav-item dropdown">
        <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown">
          <span class="avatar avatar-sm">{{ app.user ? app.user.name[:2]|upper : '?' }}</span>
          <div class="d-none d-xl-block ps-2">
            <div>{{ app.user ? app.user.name : 'Anonymous' }}</div>
            <div class="mt-1 small text-secondary">{{ app.user ? app.user.role : 'Guest' }}</div>
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <a href="{{ path('user_profile') }}" class="dropdown-item">Profile</a>
          <a href="{{ path('dashboard_settings') }}" class="dropdown-item">Settings</a>
          <div class="dropdown-divider"></div>
          <a href="{{ path('app_logout') }}" class="dropdown-item text-danger">Log out</a>
        </div>
      </div>
    </div>
  </div>
</header>
```

## Symfony forms with Tabler

Use Symfony’s Bootstrap 5 form theme (compatible with Tabler):

```yaml
# config/packages/twig.yaml
twig:
  form_themes: ['bootstrap_5_layout.html.twig']
```

### Form inside a card
```twig
{% extends 'base.html.twig' %}

{% block title %}Edit user{% endblock %}
{% block page_title %}Edit user{% endblock %}

{% block page_actions %}
  <div class="col-auto ms-auto d-print-none">
    <a href="{{ path('user_index') }}" class="btn btn-ghost-secondary">Back</a>
  </div>
{% endblock %}

{% block body %}
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">User details</h3>
    </div>
    <div class="card-body">
      {{ form_start(form) }}
        <div class="mb-3">
          {{ form_label(form.name, 'Name', {'label_attr': {'class': 'form-label required'}}) }}
          {{ form_widget(form.name, {'attr': {'class': 'form-control', 'placeholder': 'Full name'}}) }}
          {{ form_errors(form.name) }}
        </div>
        <div class="mb-3">
          {{ form_label(form.email, 'Email', {'label_attr': {'class': 'form-label required'}}) }}
          {{ form_widget(form.email, {'attr': {'class': 'form-control', 'placeholder': 'email@example.com'}}) }}
          {{ form_errors(form.email) }}
        </div>
      {{ form_end(form) }}
    </div>
    <div class="card-footer text-end">
      <button type="submit" class="btn btn-primary">Save changes</button>
    </div>
  </div>
{% endblock %}
```

### Two-column form
```twig
{% block body %}
  <div class="card">
    <div class="card-body">
      {{ form_start(form) }}
        <div class="row">
          <div class="col-md-6 mb-3">
            {{ form_row(form.name) }}
          </div>
          <div class="col-md-6 mb-3">
            {{ form_row(form.email) }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            {{ form_row(form.role) }}
          </div>
          <div class="col-md-4 mb-3">
            {{ form_row(form.department) }}
          </div>
          <div class="col-md-4 mb-3">
            {{ form_row(form.status) }}
          </div>
        </div>
        <div class="form-footer text-end">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      {{ form_end(form) }}
    </div>
  </div>
{% endblock %}
```

## Lists with tables and pagination

```twig
{% extends 'base.html.twig' %}

{% block title %}Users{% endblock %}
{% block page_title %}Users{% endblock %}

{% block page_actions %}
  <div class="col-auto ms-auto d-print-none">
    <a href="{{ path('user_create') }}" class="btn btn-primary">
      <svg class="icon">...</svg>
      New user
    </a>
  </div>
{% endblock %}

{% block body %}
  <div class="card">
    <div class="table-responsive">
      <table class="table table-vcenter card-table">
        <thead>
          <tr>
            <th>{{ knp_pagination_sortable(users, 'Name', 'u.name') }}</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th class="w-1"></th>
          </tr>
        </thead>
        <tbody>
        {% for user in users %}
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <span class="avatar avatar-sm me-2">{{ user.name[:2]|upper }}</span>
                <div>{{ user.name }}</div>
              </div>
            </td>
            <td class="text-secondary">{{ user.email }}</td>
            <td>
              {% if user.role == 'Admin' %}
                <span class="badge bg-green">{{ user.role }}</span>
              {% else %}
                <span class="badge bg-azure">{{ user.role }}</span>
              {% endif %}
            </td>
            <td>
              <span class="status {{ user.active ? 'status-green' : 'status-red' }}">
                {{ user.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div class="dropdown">
                <a class="btn btn-ghost-secondary btn-icon" data-bs-toggle="dropdown">
                  <svg class="icon">...</svg>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                  <a class="dropdown-item" href="{{ path('user_show', {id: user.id}) }}">View</a>
                  <a class="dropdown-item" href="{{ path('user_edit', {id: user.id}) }}">Edit</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-danger" href="{{ path('user_delete', {id: user.id}) }}">Delete</a>
                </div>
              </div>
            </td>
          </tr>
        {% else %}
          <tr>
            <td colspan="5">
                <div class="empty">
                <p class="empty-title">No users found</p>
                <a href="{{ path('user_create') }}" class="btn btn-primary">Create one</a>
              </div>
            </td>
          </tr>
        {% endfor %}
        </tbody>
      </table>
    </div>
    {% if users.haveToPaginate %}
      <div class="card-footer d-flex justify-content-center">
        {{ knp_pagination_render(users) }}
      </div>
    {% endif %}
  </div>
{% endblock %}
```

## Main dashboard with metrics from the controller

**DashboardController.php:**
```php
#[Route('/admin', name: 'dashboard_')]
class DashboardController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(UserRepository $userRepo, InvoiceRepository $invoiceRepo): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'total_users' => $userRepo->count([]),
            'active_users' => $userRepo->count(['active' => true]),
            'total_invoices' => $invoiceRepo->count([]),
            'monthly_revenue' => $invoiceRepo->getMonthlyRevenue(),
            'recent_invoices' => $invoiceRepo->findBy([], ['createdAt' => 'DESC'], 5),
            'monthly_sales' => $invoiceRepo->getSalesLastSixMonths(),
        ]);
    }
}
```

**dashboard/index.html.twig:**
```twig
{% extends 'base.html.twig' %}

{% block body %}
  <!-- Metrics -->
  <div class="row row-deck row-cards">
    <div class="col-sm-6 col-lg-3">
      <div class="card">
        <div class="card-body">
          <div class="subheader">Total users</div>
          <div class="h1 mb-3">{{ total_users }}</div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3">
      <div class="card">
        <div class="card-body">
          <div class="subheader">Active users</div>
          <div class="h1 mb-3">{{ active_users }}</div>
          <div class="progress progress-sm">
            {% set pct = total_users > 0 ? (active_users / total_users * 100)|round : 0 %}
            <div class="progress-bar bg-success" style="width: {{ pct }}%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Chart + Table -->
  <div class="row row-deck row-cards mt-3">
    <div class="col-lg-8">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Monthly sales</h3>
          <div id="chart-sales"></div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Latest invoices</h3>
        </div>
        {% if recent_invoices is empty %}
          <div class="card-body">
            <div class="empty">
              <p class="empty-title">No invoices</p>
            </div>
          </div>
        {% else %}
          <div class="table-responsive">
            <table class="table table-vcenter card-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {% for invoice in recent_invoices %}
                <tr>
                  <td>{{ invoice.client }}</td>
                  <td class="text-secondary">${{ invoice.amount|number_format(0) }}</td>
                </tr>
              {% endfor %}
              </tbody>
            </table>
          </div>
        {% endif %}
      </div>
    </div>
  </div>
{% endblock %}

{% block javascripts %}
  {{ parent() }}
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script>
  document.addEventListener("DOMContentLoaded", function () {
    window.ApexCharts && (new ApexCharts(document.getElementById('chart-sales'), {
      chart: { type: "line", height: 300, fontFamily: 'inherit' },
      series: [{ name: "Sales", data: {{ monthly_sales|json_encode }} }],
      xaxis: {
        categories: {{ monthly_labels|default(['Jan','Feb','Mar','Apr','May','Jun'])|json_encode }}
      },
      colors: ["#206bc4"],
      stroke: { width: 2, curve: "smooth" }
    })).render();
  });
  </script>
{% endblock %}
```

## Persistent dark theme with cookies

Create an EventSubscriber or a simple controller:

```php
// src/Controller/ThemeController.php
#[Route('/theme')]
class ThemeController extends AbstractController
{
    #[Route('/switch/{theme}', name: 'theme_switch')]
    public function switch(string $theme, Request $request): Response
    {
        if (!in_array($theme, ['light', 'dark'])) {
            $theme = 'light';
        }
        
        $response = $this->redirect($request->headers->get('referer', '/'));
        $response->headers->setCookie(
            new Cookie('theme', $theme, time() + 365*24*3600)
        );
        
        return $response;
    }
}
```

## Useful packages for Symfony + Tabler

| Package | Use |
|---------|-----|
| `knplabs/knp-paginator-bundle` | Table pagination |
| `symfony/form` | Forms with Bootstrap 5 theme |
| `symfony/asset-mapper` | Asset management (Symfony 6.4+) |
| `symfony/webpack-encore-bundle` | Asset build with Webpack |
| `symfony/translation` | Translations i18n |
| `symfony/security-bundle` | Authentication and roles |
| `doctrine/doctrine-bundle` | ORM for data |