---
name: astro-scripts
description: >-
  Add or fix client-side JavaScript in a Tabler Astro component or page —
  plugin initialisation, Bootstrap wiring, anything that needs a `<script>` in
  the rendered HTML. Use whenever a component needs browser behaviour, a
  third-party library has to be initialised, an inline script does not run, or
  a script has to be moved out of a page. Covers `CaptureScript` /
  `PageScripts`, `script is:inline define:vars`, the IIFE trap, init timing,
  per-instance registries, and when a script must be assembled as a string.
---

# Client-side scripts in Astro components

The preview HTML is the product: users copy a page out of `preview/dist` and expect the scripts in it to be readable and self-contained. That single fact drives every rule below.

## 1. Never let Astro bundle a script

Always `<script is:inline>`. A plain `<script>` is bundled, hashed, and moved into a module chunk — invisible in the copied HTML — and a plain `<style>` makes Astro stamp `data-astro-cid-*` on every element of the component.

## 2. Where the script ends up

Scripts render at the **end of `<body>`**, not where the component sits, so they run after their markup and after the vendor libraries in `<head>`. The route:

```text
<CaptureScript>  →  addPageScript()  →  page-scripts registry  →  <PageScripts />
```

- `shared/components/CaptureScript.astro` captures its slot and registers it.
- `shared/layouts/BaseLayout.astro` and `docs/layouts/DocsLayout.astro` drain the registry through `<PageScripts />`.
- Registration is **synchronous** in `CaptureScript`'s frontmatter on purpose: Astro renders siblings concurrently, so a script registered after an `await` can miss the drain. Do not make `CaptureScript` async.
- The registry does not dedupe. Two instances of a component emit two scripts — write them so that is harmless (see section 6).

## 3. The standard snippet

```astro
---
import CaptureScript from '../components/CaptureScript.astro'

interface Props {
  id: string
}

const { id } = Astro.props
const selector = `#wysiwyg-${id}`
---

<textarea id={`wysiwyg-${id}`}></textarea>
<CaptureScript>
  <!-- BEGIN WYSIWYG -->
  <script is:inline define:vars={{ selector }}>
    function initWysiwyg() {
      hugeRTE.init({ selector, height: 300 })
    }

    document.readyState !== 'loading' ? initWysiwyg() : document.addEventListener('DOMContentLoaded', initWysiwyg, { once: true })
  </script>
  <!-- END WYSIWYG -->
</CaptureScript>
```

- `BEGIN … / END …` comments mark the block in the copied HTML. Use the component name in caps.
- A named `init…` function plus the `readyState` guard, never a bare call: the script may be parsed after `DOMContentLoaded` has already fired.
- The component takes a required `id` prop and derives ids and selectors from it in the frontmatter. Never query by class or by tag — a page renders many instances.

## 4. Passing data with `define:vars`

`define:vars` JSON-serialises the values and declares them as consts at the top of the script. It carries data only: no functions, no DOM nodes, no closures over frontmatter helpers. Pass config objects whole (`chartOptions`, `markers`, `sortKeys`) instead of interpolating them into a template string.

Two known snags:

- **Astro wraps a `define:vars` script in an IIFE.** Anything the markup calls (`onclick="setPageListItems(this)"`) must be assigned to `window` explicitly — see `shared/components/demo/AdvancedTable.astro`. If several instances define the same global, make it stateless and resolve the instance from the clicked element.
- The type checker does not see `define:vars` bindings used inside template literals. `shared/components/marketing/hero/Side.astro` carries a `// @ts-nocheck` for exactly that; copy the comment with its explanation rather than restructuring the script.

## 5. When the script has to be a string

If caller-supplied JS must land *inside* a function body, `define:vars` cannot do it — it injects variables, not code. Then build the script as a template string in the frontmatter and render it with `<Fragment set:html={script} />` inside `<CaptureScript>` (see `shared/ui/Signature.astro`). Serialise every interpolated value with `JSON.stringify` and keep raw-JS props documented as an escape hatch.

## 6. Instance registries

Plugin instances go into a namespaced global keyed by id, so demo pages, docs examples, and the browser console can reach them:

```js
window.tabler_rating ??= {}
window.tabler_rating[ratingKey] = new StarRating(ratingSelector, { … })
```

`window.tabler_list`, `window.tabler_rating`, … follow the same shape. Never store an instance in a bare global.

## 7. Loading the library

The library itself is not imported — it is a global loaded from `libs.json`:

1. Check `core/libs.json` for the plugin (`npm`, `js`, `css`, `head`); add an entry if it is missing.
2. Preview pages declare it on the layout: `pageLibs={['nouislider', 'tom-select']}` on `DefaultLayout` / `BaseLayout`.
3. Docs pages declare it in front matter: `docs-libs: apexcharts` (and `css-plugins:` for extra `tabler-*.css`).

A component that silently assumes a global is a broken page whenever someone forgets the prop — say which lib it needs in a frontmatter comment and in the docs page.

## 8. Prettier caveat

`prettier-plugin-astro` cannot parse HTML comments or `<script>` tags inside a JSX expression (`{cond && (<Fragment><!-- … --><script>…)}`). Files that do this on purpose are listed at the bottom of `.prettierignore`. Prefer a plain (non-conditional) `<CaptureScript>` block so the file stays formattable; only add a new entry to `.prettierignore` when the conditional really is required, and keep it in the commented group.

## 9. Verify

An inline script that throws leaves the page looking fine but dead. Never hand one over unchecked:

1. Start the dev server and open the page (`astro-dev` skill).
2. `read_console_messages` — zero errors.
3. Interact with the component (click, type) and confirm the behaviour, or read the instance back from `window.tabler_*` with `javascript_tool`.

## 10. Checklist

- [ ] `<script is:inline>` inside `<CaptureScript>`, with `BEGIN`/`END` comments
- [ ] Required `id` prop; selectors derived from it, no class-wide queries
- [ ] Data passed via `define:vars`, not string interpolation
- [ ] `init…()` + `readyState` guard
- [ ] Globals the markup needs assigned to `window` (IIFE trap)
- [ ] Instance stored in a `window.tabler_*` registry keyed by id
- [ ] Library present in `core/libs.json` and declared via `pageLibs` / `docs-libs`
- [ ] Two instances on one page still work
- [ ] Console clean in the browser; `pnpm run format-prettier` and `pnpm run type-check` clean
