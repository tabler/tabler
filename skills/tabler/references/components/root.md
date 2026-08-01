# Root / Base Layout

The base page (`blank.html`) used as the initial template.

## Blank page

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <title>Blank page - Tabler</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler.min.css">
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/js/tabler-theme.min.js"></script>
  <div class="page">
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <h1 class="page-title">Blank page</h1>
            </div>
          </div>
        </div>
      </div>
      <main id="content" class="page-body">
        <div class="container-xl d-flex flex-column justify-content-center">
            <div class="empty">
              <p class="empty-title">No results found</p>
              <p class="empty-subtitle text-secondary">Start by adding some content.</p>
              <div class="empty-action">
                <a href="#" class="btn btn-primary">
                  <svg class="icon"><use xlink:href="#icon-plus"/></svg>
                  Add your first client
                </a>
              </div>
            </div>
        </div>
      </main>
      <footer class="footer footer-transparent d-print-none">
        <div class="container-xl">
          <div class="row text-center align-items-center flex-row-reverse">
            <div class="col-lg-auto ms-lg-auto">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item"><a href="https://tabler.io/docs" class="link-secondary">Documentation</a></li>
              </ul>
            </div>
            <div class="col-12 col-lg-auto mt-3 mt-lg-0">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item">Copyright &copy; 2026 <a href="." class="link-secondary">Tabler</a>.</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/js/tabler.min.js" defer></script>
</body>
</html>
```

For a blank page without a sidebar or empty state, simply omit the sidebar and use empty content in `page-body`.
