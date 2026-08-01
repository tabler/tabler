# Social Icons

Based on `/preview/pages/social-icons.html` in this repository.

Tabler includes popular social media icons as CSS classes.

## Base usage

```html
<!-- Social icon with brand class -->
<a href="#" class="btn btn-facebook">
  <svg class="icon"><use xlink:href="#icon-brand-facebook"/></svg>
  Facebook
</a>

<a href="#" class="btn btn-twitter">
  <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg>
  Twitter
</a>

<a href="#" class="btn btn-google">
  <svg class="icon"><use xlink:href="#icon-brand-google"/></svg>
  Google
</a>
```

## Icon-only buttons

```html
<a href="#" class="btn btn-icon btn-facebook" aria-label="Facebook">
  <svg class="icon"><use xlink:href="#icon-brand-facebook"/></svg>
</a>

<a href="#" class="btn btn-icon btn-twitter" aria-label="Twitter">
  <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg>
</a>

<a href="#" class="btn btn-icon btn-instagram" aria-label="Instagram">
  <svg class="icon"><use xlink:href="#icon-brand-instagram"/></svg>
</a>

<a href="#" class="btn btn-icon btn-linkedin" aria-label="LinkedIn">
  <svg class="icon"><use xlink:href="#icon-brand-linkedin"/></svg>
</a>

<a href="#" class="btn btn-icon btn-github" aria-label="GitHub">
  <svg class="icon"><use xlink:href="#icon-brand-github"/></svg>
</a>
```

## Social icons list

```html
<div class="btn-list">
  <a href="#" class="btn btn-icon btn-facebook" aria-label="Facebook">
    <svg class="icon"><use xlink:href="#icon-brand-facebook"/></svg>
  </a>
  <a href="#" class="btn btn-icon btn-twitter" aria-label="Twitter">
    <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg>
  </a>
  <a href="#" class="btn btn-icon btn-instagram" aria-label="Instagram">
    <svg class="icon"><use xlink:href="#icon-brand-instagram"/></svg>
  </a>
  <a href="#" class="btn btn-icon btn-youtube" aria-label="YouTube">
    <svg class="icon"><use xlink:href="#icon-brand-youtube"/></svg>
  </a>
  <a href="#" class="btn btn-icon btn-linkedin" aria-label="LinkedIn">
    <svg class="icon"><use xlink:href="#icon-brand-linkedin"/></svg>
  </a>
</div>
```

## Available social brands

### Major platforms

| Brand | Class | Icon |
|-------|-------|------|
| Facebook | `btn-facebook` | `icon-brand-facebook` |
| Twitter/X | `btn-twitter` | `icon-brand-twitter` or `icon-brand-x` |
| Instagram | `btn-instagram` | `icon-brand-instagram` |
| LinkedIn | `btn-linkedin` | `icon-brand-linkedin` |
| YouTube | `btn-youtube` | `icon-brand-youtube` |
| GitHub | `btn-github` | `icon-brand-github` |
| GitLab | `btn-gitlab` | `icon-brand-gitlab` |
| Bitbucket | `btn-bitbucket` | `icon-brand-bitbucket` |

### Development platforms

| Brand | Class | Icon |
|-------|-------|------|
| Google | `btn-google` | `icon-brand-google` |
| Discord | `btn-discord` | `icon-brand-discord` |
| Slack | `btn-slack` | `icon-brand-slack` |
| Telegram | `btn-telegram` | `icon-brand-telegram` |
| WhatsApp | `btn-whatsapp` | `icon-brand-whatsapp` |
| Messenger | `btn-messenger` | `icon-brand-messenger` |
| Skype | `btn-skype` | `icon-brand-skype` |
| Zoom | `btn-zoom` | `icon-brand-zoom` |

### Design/Content platforms

| Brand | Class | Icon |
|-------|-------|------|
| Pinterest | `btn-pinterest` | `icon-brand-pinterest` |
| Dribbble | `btn-dribbble` | `icon-brand-dribbble` |
| Behance | `btn-behance` | `icon-brand-behance` |
| Figma | `btn-figma` | `icon-brand-figma` |
| Unsplash | `btn-unsplash` | `icon-brand-unsplash` |

### Professional/Community

| Brand | Class | Icon |
|-------|-------|------|
| Reddit | `btn-reddit` | `icon-brand-reddit` |
| Twitch | `btn-twitch` | `icon-brand-twitch` |
| TikTok | `btn-tiktok` | `icon-brand-tiktok` |
| Snapchat | `btn-snapchat` | `icon-brand-snapchat` |
| Spotify | `btn-spotify` | `icon-brand-spotify` |
| SoundCloud | `btn-soundcloud` | `icon-brand-soundcloud` |
| Vimeo | `btn-vimeo` | `icon-brand-vimeo` |
| Medium | `btn-medium` | `icon-brand-medium` |

### E-commerce/Payment

| Brand | Class | Icon |
|-------|-------|------|
| PayPal | `btn-paypal` | `icon-brand-paypal` |
| Stripe | `btn-stripe` | `icon-brand-stripe` |
| Amazon | `btn-amazon` | `icon-brand-amazon` |
| Shopify | `btn-shopify` | `icon-brand-shopify` |
| Ebay | `btn-ebay` | `icon-brand-ebay` |
| Alibaba | `btn-alibaba` | `icon-brand-alibaba` |
| Apple Pay | `btn-apple` | `icon-brand-apple` |
| Google Pay | `btn-google` | `icon-brand-google` |

### Microsoft products

| Brand | Class | Icon |
|-------|-------|------|
| Microsoft | `btn-microsoft` | `icon-brand-microsoft` |
| Windows | `btn-windows` | `icon-brand-windows` |
| Outlook | `btn-outlook` | `icon-brand-outlook` |
| Office 365 | `btn-office` | `icon-brand-office` |
| OneDrive | `btn-onedrive` | `icon-brand-onedrive` |
| Teams | `btn-teams` | `icon-brand-teams` |

## Share buttons

```html
<div class="btn-list">
  <a href="https://facebook.com/sharer/sharer.php?u=URL" target="_blank" class="btn btn-facebook" rel="noopener">
    <svg class="icon"><use xlink:href="#icon-brand-facebook"/></svg>
    Share
  </a>
  <a href="https://twitter.com/intent/tweet?url=URL&text=TEXT" target="_blank" class="btn btn-twitter" rel="noopener">
    <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg>
    Tweet
  </a>
  <a href="https://www.linkedin.com/shareArticle?mini=true&url=URL" target="_blank" class="btn btn-linkedin" rel="noopener">
    <svg class="icon"><use xlink:href="#icon-brand-linkedin"/></svg>
    Share
  </a>
  <a href="https://wa.me/?text=URL" target="_blank" class="btn btn-whatsapp" rel="noopener">
    <svg class="icon"><use xlink:href="#icon-brand-whatsapp"/></svg>
    Share
  </a>
</div>
```

## Login with social

```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title text-center mb-4">Sign in with</h3>
    <div class="row g-2">
      <div class="col">
        <a href="#" class="btn btn-white w-100">
          <svg class="icon text-google"><use xlink:href="#icon-brand-google"/></svg>
          Google
        </a>
      </div>
      <div class="col">
        <a href="#" class="btn btn-white w-100">
          <svg class="icon text-facebook"><use xlink:href="#icon-brand-facebook"/></svg>
          Facebook
        </a>
      </div>
    </div>
    <div class="hr-text">or</div>
    <!-- Email/password form -->
  </div>
</div>
```

## Social links in footer

```html
<footer class="footer footer-transparent d-print-none">
  <div class="container-xl">
    <div class="row text-center align-items-center flex-row-reverse">
      <div class="col-lg-auto ms-lg-auto">
        <ul class="list-inline list-inline-dots mb-0">
          <li class="list-inline-item">
            <a href="#" class="link-secondary" aria-label="Facebook">
              <svg class="icon"><use xlink:href="#icon-brand-facebook"/></svg>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="#" class="link-secondary" aria-label="Twitter">
              <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="#" class="link-secondary" aria-label="GitHub">
              <svg class="icon"><use xlink:href="#icon-brand-github"/></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
```

## Outline variant

```html
<a href="#" class="btn btn-outline-facebook">
  <svg class="icon"><use xlink:href="#icon-brand-facebook"/></svg>
  Facebook
</a>

<a href="#" class="btn btn-outline-twitter">
  <svg class="icon"><use xlink:href="#icon-brand-twitter"/></svg>
  Twitter
</a>
```

## Required CSS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler-socials.min.css">
```

Or use the full bundle:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.4.0/dist/css/tabler.min.css">
```

## Required icons

Social icons are part of Tabler Icons:
```html
<!-- Load Tabler Icons -->
<script src="https://cdn.jsdelivr.net/npm/@tabler/icons@3.40.0/icons-sprite.svg"></script>

<!-- Or use the sprite -->
<svg class="icon"><use xlink:href="path/to/tabler-sprite.svg#tabler-brand-facebook"/></svg>
```

## Classes

| Class | Purpose |
|-------|-----------|
| `btn-{brand}` | Brand-colored button |
| `btn-outline-{brand}` | Outline brand button |
| `text-{brand}` | Brand text color |
| `bg-{brand}` | Brand background color |
