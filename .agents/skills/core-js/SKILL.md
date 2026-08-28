---
name: core-js
description: >-
  Work on the framework's own JavaScript in `core/js/` — the `tabler.js` and
  `tabler-theme.js` bundles, the vendored Bootstrap component port, and their
  browser tests. Use when a Tabler behaviour needs adding or fixing (a
  `data-bs-toggle` handler, the theme switcher, a plugin initialiser), when a
  Bootstrap component's JS misbehaves, and before changing anything under
  `core/js/src/`. Not for demo-page scripts — that is the `astro-scripts`
  skill.
---

# The framework JavaScript

`core/js` builds two shipped bundles. Everything here is public API and is bound by a size budget.

## 1. Two entry points

| Entry | Ships as | Holds |
| --- | --- | --- |
| `js/tabler.ts` | `tabler.js` / `.esm.js` (+ `.min`) | plugin initialisers, the Bootstrap components, the `tabler` helper namespace |
| `js/tabler-theme.ts` | `tabler-theme.js` (+ variants) | the colour-mode/theme switcher only |

`tabler-theme.js` is loaded right after `<body>` and **not deferred**, so the chosen theme applies before the first paint. It stays tiny on purpose (bundlewatch: 1 kB raw, 800 B minified) — do not add anything to it that is not needed before paint.

## 2. `js/src/bootstrap/**` is a port, not our code

That directory is Bootstrap's JavaScript rewritten in TypeScript, MIT headers kept, `VERSION = '5.3.8'`. Treat it as vendored:

- Fix bugs the way upstream did, and keep the file's structure recognisable against `twbs/bootstrap`. Gratuitous restructuring makes the next upstream sync expensive.
- `js/src/bootstrap.ts` is the single source of truth for what is exported and for the `bootstrap` namespace object.
- Coverage is configured to measure exactly this directory (`js/src/bootstrap/**`), and `js/tests/unit/*.spec.ts` mirrors upstream's suite — a change here is expected to come with its test.

## 3. Tabler's own modules

Modules directly in `js/src/*.ts` (`autosize`, `countup`, `dropdown`, `input-mask`, `popover`, `sortable`, `switch-icon`, `tab`, `toast`, `tooltip`) are **side-effect initialisers**: importing them from `tabler.ts` wires the behaviour. The pattern is a `data-bs-toggle` query at import time:

```ts
// js-docs-start switch-icon-init
const switchesTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="switch-icon"]'))
switchesTriggerList.map(function (switchTriggerEl: HTMLElement) {
  switchTriggerEl.addEventListener('click', (e: MouseEvent) => {
    const active = switchTriggerEl.classList.toggle('active')
    switchTriggerEl.setAttribute('aria-pressed', active ? 'true' : 'false')
  })
})
// js-docs-end switch-icon-init
```

- The attribute API stays `data-bs-*`. Renaming it to `data-tblr-*` is a breaking change held for 2.0 — do not start it here.
- Keep the accessible state in sync with the class (`aria-pressed`, `aria-expanded`), as above.
- A new module must be imported from `js/tabler.ts`, or it never ships.
- Shared helpers go to `js/src/tabler.ts` (`prefix`, `hexToRgba`, `getColor`), which reads theme values through `--tblr-*` custom properties.

## 4. Docs markers

`js-docs-start <name>` / `js-docs-end <name>` mark the snippet a documentation page shows for that behaviour (`docs/components/CodeDocs.astro`, `docs/lib/llms.ts`). Keep the marked region self-contained and copy-pasteable, and check who references the name before renaming it.

## 5. Tests

Tests run in a **real browser** — vitest browser mode with Playwright Chromium, not jsdom:

```bash
pnpm --filter @tabler/core test:js
pnpm --filter @tabler/core test:js:watch
pnpm --filter @tabler/core test:js:coverage
```

- `js/tests/unit/**/*.spec.ts` — behaviour, using `js/tests/helpers/fixture.ts` to mount markup.
- `js/tests/visual/*.html` — pages for looking at a component by hand.
- The first run needs Playwright's browser installed; if it fails on a missing binary, install it rather than switching the config to jsdom.

## 6. Build and budget

`vite` builds each entry as a library in `es` + `umd` (`BASE_NAME` selects the entry), then terser produces the `.min` variants with source maps. Sizes are enforced:

| File | Limit |
| --- | --- |
| `dist/js/tabler.js` | 64 kB |
| `dist/js/tabler.min.js` | 48 kB |
| `dist/js/tabler-theme.js` | 1 kB |

```bash
pnpm --filter @tabler/core build
pnpm run bundlewatch
```

Prefer a small dependency-free implementation over pulling a package in: every kilobyte here lands on every Tabler page.

## 7. Checklist

- [ ] New module imported from `js/tabler.ts` (or deliberately kept out of the bundle)
- [ ] `data-bs-*` attribute API unchanged; accessible state updated with the class
- [ ] Bootstrap-port changes stay close to upstream and come with a `js/tests/unit` spec
- [ ] `js-docs-*` markers intact and self-contained
- [ ] `pnpm --filter @tabler/core test` (js + scss) clean
- [ ] `pnpm run type-check` and `pnpm run lint-prettier` clean
- [ ] `pnpm run bundlewatch` within budget, or the new limit justified in the PR
- [ ] Docs page updated and changeset written
