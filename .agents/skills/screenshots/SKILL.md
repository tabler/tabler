---
name: screenshots
description: >-
  Make a picture of a Tabler component or screen with the `screenshots/` app —
  the images used in release notes, the website, the README and social posts.
  Use whenever a new component or page deserves a picture, when an existing one
  has to be retaken after a design change, and before touching anything under
  `screenshots/`. Covers the two layouts, how to show a state the capture
  cannot click, running the server, capturing, and the build trap.
---

# Make a Tabler screenshot

Every picture comes from a page in `screenshots/pages/*.astro`, so it can be made again after any
change, with the same framing, fonts and data. Finished PNGs land in `screenshots/captures/`,
which is not committed.

## 1. Pick a layout

| Layout | Frame | For |
| --- | --- | --- |
| `ScreenshotLayout` | 1024×768 card on a gradient, logo at the bottom | one component or card |
| `ScreenshotAppLayout` | 1708×1068 screen, reduced to a 1280 px picture | whole app screens: sidebar, navbar, theme panel |

`ScreenshotLayout` props: `title`, `columns` (caps the subject at `columns * 310px`), `zoom`,
`pageLibs` (third-party libs from `libs.json`, e.g. `['apexcharts']`), `cssPlugins`, `rtl`,
`showLogo`, `class`.

Do not reach for `zoom` to fit more of a screen in — that is what `ScreenshotAppLayout` is for.

## 2. Write the page

- Open with a comment saying what the scene is and why, the way the existing pages do.
- Build it from `@ui` components, exactly like a demo page. Fixed data only: no `Math.random`,
  no dates that move. The picture has to be reproducible.
- Do not add margin utilities to `CardTitle` or `CardSubtitle`. They bring their own spacing.
- The file name becomes the picture name, so `clipboard.astro` gives `clipboard.png`.

## 3. Show the state, do not script it

The capture loads the page and shoots it. It never types, clicks or hovers. A component that only
looks interesting after an interaction has to be handed that state:

- **Give inputs a value.** A password field with a value makes the strength meter render a level on
  load; a filled field makes a countup animate to its number.
- **Write the state into the markup.** The legend page sets `active` and `off` by hand; the
  clipboard page renders the copied row as a green check with no `data-bs-toggle` on it. A still
  picture of a real state is honest; faking a state the component cannot reach is not.
- **Point with the fake cursor.** `<span class="cursor" />` inside a `position-relative` parent. It
  sits below and left by default, so on a small icon it covers the subject — nudge it with an
  inline `style="top: 90%; left: 70%"`.

## 4. Look at it in the browser

```sh
pnpm run dev-screenshots   # port 3020; the root `pnpm run dev` leaves this app out
```

It serves the core assets a previous `pnpm run dev` or build emitted, so start those first if the
page renders unstyled. Check both colour modes with `?theme=dark`.

## 5. Capture

```sh
pnpm --dir screenshots run capture              # every page
pnpm --dir screenshots run capture clipboard    # just these slugs
```

Four files per page: `<slug>.png`, `<slug>@2x.png`, `<slug>-dark.png`, `<slug>-dark@2x.png`. Only
the @2x picture is rasterized; the 1x one is downscaled from it, which keeps hairlines and text
crisp.

**The trap:** `capture` runs `turbo build` first, and a build while a dev server is running breaks
the server's watchers. Stop the dev servers, or iterate with a throwaway Playwright script instead:

```js
// screenshots/.build/_tmp.mjs — inside the repo, so `playwright` resolves; delete it after
import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1708, height: 1068 }, deviceScaleFactor: 2 })
await page.goto('http://localhost:3020/<slug>?theme=light', { waitUntil: 'load' })
await page.waitForFunction(() => document.documentElement.dataset.screenshotReady === 'true')
await page.addStyleTag({ content: '[data-screenshot-chrome] { display: none !important; }' })
await page.locator('#screenshot').screenshot({ path: '/tmp/shot.png' })
await browser.close()
```

Run it with `node screenshots/.build/_tmp.mjs`. A script outside the repo cannot resolve
`playwright`.

## 6. What the layout already handles

- Transitions, animations and the caret are off, so nothing is caught mid-frame.
- Inter is loaded, so the picture shows the face the design was drawn in on every machine.
- The theme comes from `?theme=`, not from `localStorage`.
- Anything marked `data-screenshot-chrome` is hidden before the shot.
- The page signals `data-screenshot-ready` after two animation frames; the capture waits for it.

## 7. Checklist

- [ ] Right layout for the subject, `pageLibs` set when the scene needs a chart or a plugin
- [ ] Deterministic content, no random or time-based data
- [ ] The interesting state is visible without an interaction
- [ ] Looked at on port 3020 in light and dark
- [ ] `pnpm --dir screenshots run type-check` clean (`astro check`)
- [ ] Captured, and all four files checked
