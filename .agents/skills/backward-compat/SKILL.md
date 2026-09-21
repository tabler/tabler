---
name: backward-compat
description: >-
  Keep a change to `@tabler/core` backward compatible, so a patch or minor release never breaks a project that updates. Use before renaming, removing or changing the meaning of anything a user can touch — a class, a `--tblr-*` custom property, a Sass variable, mixin or function, a `data-*` attribute or option, a JS export, an event, a file under `dist/`, a default value — and whenever a changeset on `dev` looks like it needs a `major` bump. Also consult it proactively when a cleanup or refactor in `core/` deletes something, since "dead" code is often somebody's API. Covers what counts as public API, the `deprecated` files where compatibility code lives, the alias patterns, the `check:compat` gate, and what to do when a break cannot be avoided.
---

# Backward compatibility

The README promises [Semantic Versioning](https://semver.org/): breaking changes only land in major releases. Users install `^1.0.0` and expect `npm update` to be safe. Issue #3108 is what happens when it is not.

So on `dev`, which ships patch and minor releases, **every change is additive or has an alias**. A change that cannot be made compatible does not go to `dev`. It waits for the next major.

## 1. What is public API

Anything a user can write in their own project. If it is in the list, it cannot be removed, renamed or given a new meaning in a minor release.

| Surface | Examples | Breaks when |
| --- | --- | --- |
| Class names | `.legend`, `.form-hint`, `.card-options` | removed, renamed, or the same name starts to mean something else |
| Custom properties | `--tblr-primary-rgb`, `--tblr-btn-focus-box-shadow` | no longer emitted, or no longer read by the component |
| Sass variables, maps and keys | `$focus-ring-blur`, a key of `$form-validation-states` | removed, renamed, or the expected type changes (a color becomes a `var()`) |
| Sass mixins and functions | `focus-ring($show-border)` | removed, a parameter renamed or reordered, a positional argument changes meaning |
| Data attributes and their options | `data-countup='{…}'`, `data-bs-toggle="…"` | removed, renamed, an option dropped, or a value that used to be accepted now throws |
| JS exports and globals | `tabler.Modal`, `window.tabler.*`, named exports, published types | removed, renamed, a method signature changed |
| Events | `change.bs.switch-icon` | renamed, no longer fired, fired at a different moment |
| Files in the package | `dist/libs/litepicker/…`, `dist/css/tabler.rtl.css` | the path 404s after an update |
| Dependencies | `dependencies`, `peerDependencies` | a user must install or uninstall something for the update to work |
| Defaults | the gray scale, `forceFallback`, the color mode | an untouched project looks or behaves differently in a way the user did not ask for |
| Browser support | `.browserslistrc` | the minimum version of any browser goes up |

Not public: anything under `preview/`, `docs/`, `shared/`, `.build/`, file layout inside `core/scss/` that is not reachable through `@use`, private `_underscore` members of JS classes, and the exact bytes of the compiled CSS.

Bug fixes are fine even when they change rendering, as long as the old behaviour was clearly wrong (a knob that did not move in RTL). When a fix changes how a correct page looks, treat it as a default change.

## 2. Where compatibility code lives

Everything kept only for old projects goes into files named `deprecated`, so that the next major removes it by deleting files instead of digging through the tree. The Sass module system decides how many files that is:

| File | Holds | Why it is separate |
| --- | --- | --- |
| `core/scss/_variables-deprecated.scss` | old `$variables`, each `!default` | `@use … with ($x: …)` on a variable that does not exist is a compile error, so the variable has to stay declared. Forwarded from `_config.scss` **before** `variables`, so a new variable can default to the old one: `$focus-ring-width: $input-btn-focus-width !default;` |
| `core/scss/mixins/_deprecated.scss` | old functions and mixins as thin wrappers around the new ones | emits no CSS; forwarded from `_mixins.scss`. Each one calls `@include deprecate('<name>', '<since>', '<removed in>')` from `mixins/bootstrap/_deprecate.scss`, so the user gets a warning when compiling |
| `core/scss/_deprecated.scss` | everything that emits CSS: class aliases (`.form-hint`, `.legend:empty`), old custom properties such as `--tblr-*-rgb`, hooks like `box-shadow: var(--btn-focus-box-shadow, none)` | loaded last from `tabler.scss`, next to `_extends.scss`: an alias built with `@extend` needs the whole `core` upstream. The whole file sits inside `@if $enable-deprecated { … }` |
| `core/js/src/deprecated.ts` | old exports and globals, such as the `tabler` namespace with `getColor()` | one import to delete in the next major |

Create a file the first time you need it. `$enable-deprecated: true !default` lives in `_variables.scss`, next to `$enable-deprecation-messages`. A project that has migrated sets it to `false` and gets the bytes back; the next major flips the default, and the one after deletes the files.

Some compatibility cannot move into those files: a fallback inside a component rule (`mask-image: var(--form-check-bg-image, <default>)`), an old parameter in a mixin signature, a default value that was put back. Mark each of those where it is, with one fixed comment:

```scss
// deprecated(2.0): `$show-border` is the old name of `$offset`
```

`grep -rn "deprecated(2.0)" core/` plus the four files is then the full list of what the next major removes.

## 3. How to make the change compatible

### Rename

Ship both names. The old one becomes an alias that nobody has to touch.

- **Class**: add the alias to `core/scss/_deprecated.scss` with `@extend`. Start the comment with `` `<old>` is deprecated, use `<new>` instead ``.
- **Custom property**: keep reading the old name as a fallback — `var(--new, var(--old, <default>))` — or keep emitting the old one with the same value.
- **Sass variable**: keep the old variable in `_variables-deprecated.scss` and default the new one to it: `$new: $old !default;`. For a map key, accept both keys.
- **Mixin or function**: a removed one comes back in `mixins/_deprecated.scss` as a wrapper. For parameters, add new ones at the end, with defaults. Never rename or move an old parameter: callers pass arguments by position and by keyword, so it keeps both its name and its place.
- **Data attribute, option, JS export, event**: accept or fire both. The `data-bs-*` / `data-tblr-*` pair in `core/js/src/bootstrap/dom/manipulator.ts` is the pattern.

### Remove

Do not. Mark it deprecated, stop using it in Tabler's own code, keep it working, and list it for removal in the next major. This includes things that look dead: a declaration with no effect inside Tabler may still be what a user overrides.

### Change what a name means

Do not reuse the name. `.legend` was a dot in 1.5 and became a whole legend item in 1.6, so old markup rendered as nothing. Either give the new thing a new name, or keep the old use working — `.legend:empty` still draws the dot.

### Add a name

Adding is safe, with one trap: a name that fits an existing pattern may already sit in user markup as a no-op. `.text-gray-200` did nothing in 1.4 and turned text light gray in 1.5. When a new utility completes a series (`.text-*`, `.bg-*`, `.border-*`), say so under "Visual changes" in the upgrade guide.

### Change a default

Keep the old default and make the new behaviour opt-in: a class, an attribute, an option or a Sass variable. The new default can flip in the next major.

### Drop a bundled library or a file

Keep the file in `dist/` and the entry in `core/libs.json` until the next major, even if Tabler's own pages stop using it. Replacing a library with built-in code is fine, as long as the old script tag still loads and the old global still works or is harmless.

### Validate input more strictly

New validation must not throw on input that used to work. Coerce the value, or log with `console.warn` and fall back to the default. A throw during page load stops all of `tabler.js`.

## 4. Check the public surface before the PR

`check:compat` downloads the last release of `@tabler/core` from npm and compares it with the working tree. It needs `core/dist`, so build core first:

```shell
pnpm --filter @tabler/core build
pnpm run check:compat
```

It reports what the release has and the build lost, one key per line:

| Key | Means |
| --- | --- |
| `css:tabler.css:.legend` | a class is gone from that stylesheet |
| `css:tabler.css:--tblr-primary-rgb` | a custom property is gone |
| `sass:$focus-ring-blur` | a Sass variable is gone |
| `sass:@function url-svg` | a function or mixin is gone |
| `sass:@mixin focus-ring($show-border)` | that parameter was renamed or moved |
| `js:tabler.esm.js:tabler` | a top-level export is gone |
| `file:dist/libs/litepicker/dist/litepicker.js` | a file is gone from the package |

Fix each one with the patterns from section 3, then run it again. Known breaks are listed in `.build/compat-baseline.txt`; when you fix one, delete its line, or the check fails on the stale entry. Never add a line to the baseline to make a PR green. A line gets ` # accepted: <why>` only after the maintainers decided to ship that break. CI runs the check after the build, and with `--strict` on the versions pull request, so a release cannot be merged while an unaccepted line is left.

The check cannot see everything. It does not know about data attributes and their options, events, default values, a Sass variable whose type changed, or behaviour. For those, read the diff against the release tag with the table from section 1 in hand:

```shell
git diff "@tabler/core@$(npm view @tabler/core version)"..HEAD -- core/scss/_variables.scss core/js .browserslistrc
```

## 5. Changesets and the upgrade guide

- A changeset on `dev` is `patch` or `minor`. If the honest bump is `major`, the change is on the wrong branch — go back to section 3.
- Describe a deprecation as one, for example ``Added `.legend-dot`; an empty `.legend` still works but is deprecated.`` Never write `Removed` for something a user could have used.
- In the upgrade guide a deprecation goes under a "renamed" heading with "the old name still works" (see the `upgrade-guide` skill). A minor release should have nothing under a breaking-change heading.

## 6. When a break cannot be avoided

Some changes have no alias: dropping a whole color model, raising the browser floor, removing a dependency users import. Those belong to the next major release, not to `dev`. Say so in the PR, and do not split the change to sneak half of it into a minor. If you are unsure whether something is a break, assume it is and ask.
