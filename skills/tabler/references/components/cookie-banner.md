# Cookie Banner

Based on `/preview/pages/cookie-banner.html` in this repository.

## Base structure

```html
<div class="card card-stacked-bottom cookie-banner" id="cookie-banner">
  <div class="card-body">
    <div class="row">
      <div class="col">
        <h4 class="card-title">We use cookies</h4>
        <p class="text-secondary">
          This website uses cookies to ensure you get the best experience on our website.
          <a href="#" class="link-primary">Learn more</a>
        </p>
      </div>
      <div class="col-auto d-flex align-items-center">
        <button class="btn btn-primary" onclick="acceptCookies()">Accept all</button>
        <button class="btn btn-ghost-secondary ms-2" onclick="declineCookies()">Decline</button>
      </div>
    </div>
  </div>
</div>
```

## Positioned at bottom

```html
<div class="cookie-banner fixed-bottom bg-white border-top p-3" id="cookie-banner">
  <div class="container-xl">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <p class="mb-2 mb-lg-0">
          <strong>We value your privacy</strong><br>
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
        </p>
      </div>
      <div class="col-lg-4 text-lg-end">
        <button class="btn btn-primary me-2" onclick="acceptCookies()">Accept all</button>
        <button class="btn btn-outline-secondary" onclick="showPreferences()">Preferences</button>
      </div>
    </div>
  </div>
</div>
```

## Compact version

```html
<div class="card cookie-banner position-fixed bottom-0 end-0 m-3" style="max-width: 400px; z-index: 1050;" id="cookie-banner">
  <div class="card-body">
    <h4 class="card-title">Cookies</h4>
    <p class="text-secondary">We use cookies to improve your experience.</p>
    <div class="d-flex">
      <button class="btn btn-primary w-100" onclick="acceptCookies()">Accept</button>
      <button class="btn btn-ghost-secondary ms-2" data-bs-dismiss="alert" aria-label="Close">
        <svg class="icon"><use xlink:href="#icon-x"/></svg>
      </button>
    </div>
  </div>
</div>
```

## With cookie preferences modal

```html
<!-- Banner -->
<div class="card card-stacked-bottom cookie-banner" id="cookie-banner">
  <div class="card-body">
    <div class="row align-items-center">
      <div class="col">
        <h4 class="card-title">Cookie Settings</h4>
        <p class="text-secondary mb-0">We use cookies to improve your experience.</p>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cookie-modal">Manage preferences</button>
      </div>
    </div>
  </div>
</div>

<!-- Preferences Modal -->
<div class="modal modal-blur fade" id="cookie-modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Cookie Preferences</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Customize which cookies you want to accept.</p>
        
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="cookie-necessary" checked disabled>
            <label class="form-check-label" for="cookie-necessary">
              <strong>Necessary</strong> - Required for the website to function
            </label>
          </div>
        </div>
        
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="cookie-analytics">
            <label class="form-check-label" for="cookie-analytics">
              <strong>Analytics</strong> - Helps us improve our website
            </label>
          </div>
        </div>
        
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="cookie-marketing">
            <label class="form-check-label" for="cookie-marketing">
              <strong>Marketing</strong> - Used to deliver relevant advertisements
            </label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="savePreferences()">Save preferences</button>
      </div>
    </div>
  </div>
</div>
```

## JavaScript implementation

```javascript
// Check if user has already made a choice
function checkCookieConsent() {
  var consent = localStorage.getItem('cookieConsent');
  if (consent) {
    document.getElementById('cookie-banner').style.display = 'none';
  }
}

// Accept all cookies
function acceptCookies() {
  localStorage.setItem('cookieConsent', JSON.stringify({
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString()
  }));
  hideBanner();
  
  // Initialize analytics, marketing scripts, etc.
  initializeAnalytics();
}

// Decline all optional cookies
function declineCookies() {
  localStorage.setItem('cookieConsent', JSON.stringify({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString()
  }));
  hideBanner();
}

// Save custom preferences
function savePreferences() {
  var analytics = document.getElementById('cookie-analytics').checked;
  var marketing = document.getElementById('cookie-marketing').checked;
  
  localStorage.setItem('cookieConsent', JSON.stringify({
    necessary: true,
    analytics: analytics,
    marketing: marketing,
    timestamp: new Date().toISOString()
  }));
  
  // Close modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('cookie-modal'));
  modal.hide();
  
  hideBanner();
  
  // Initialize based on preferences
  if (analytics) initializeAnalytics();
  if (marketing) initializeMarketing();
}

// Hide banner with animation
function hideBanner() {
  var banner = document.getElementById('cookie-banner');
  banner.style.opacity = '0';
  banner.style.transform = 'translateY(100%)';
  setTimeout(function() {
    banner.style.display = 'none';
  }, 300);
}

// Initialize based on stored preferences
function initializeCookies() {
  var consent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
  
  if (!consent.timestamp) {
    // Show banner if no consent given
    return;
  }
  
  if (consent.analytics) initializeAnalytics();
  if (consent.marketing) initializeMarketing();
}

function initializeAnalytics() {
  // Load Google Analytics, etc.
  console.log('Analytics initialized');
}

function initializeMarketing() {
  // Load marketing scripts
  console.log('Marketing initialized');
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  checkCookieConsent();
  initializeCookies();
});
```

## With animation

```css
.cookie-banner {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cookie-banner.hidden {
  opacity: 0;
  transform: translateY(100%);
  pointer-events: none;
}
```

```javascript
function hideBanner() {
  document.getElementById('cookie-banner').classList.add('hidden');
}
```

## Reset consent (for testing)

```javascript
function resetCookieConsent() {
  localStorage.removeItem('cookieConsent');
  location.reload();
}
```

## GDPR compliance notes

```javascript
// Store consent in a way that can be audited
function logConsent(type, accepted) {
  var log = {
    type: type,
    accepted: accepted,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    ip: 'stored-server-side' // IP should be stored server-side
  };
  
  // Send to your server
  fetch('/api/consent-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log)
  });
}
```

## Classes

| Class | Purpose |
|-------|-----------|
| `cookie-banner` | Banner container |
| `card-stacked-bottom` | Fixed bottom card style |
| `fixed-bottom` | Fixed position at bottom |
| `position-fixed` | Fixed positioning |
| `bottom-0` / `end-0` | Position utilities |
