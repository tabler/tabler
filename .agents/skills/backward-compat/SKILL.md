---
name: backward-compat
description: >-
  Keep a change to `@tabler/core` backward compatible, so a patch or minor release never breaks a project that updates. Use before renaming, removing or changing the meaning of anything a user can touch — a class, a `--tblr-*` custom property, a Sass variable, mixin or function, a `data-*` attribute or option, a JS export, an event, a file under `dist/`, a default value — and whenever a changeset on `dev` looks like it needs a `major` bump. Also consult it proactively when a cleanup or refactor in `core/` deletes something, since "dead" code is often somebody's API. Covers what counts as public API, the deprecated-alias patterns, how to diff the public surface against the last release, and what to do when a break cannot be avoided.
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

## 2. How to make the change compatible

### Rename

Ship both names. The old one becomes an alias that nobody has to touch.

- **Class**: add the alias to `core/scss/_extends.scss` with `@extend`, next to `.form-hint`. Start the comment with `` `<old>` is deprecated, use `<new>` instead ``.
- **Custom property**: keep reading the old name as a fallback — `var(--new, var(--old, <default>))` — or keep emitting the old one with the same value.
- **Sass variable**: keep the old variable and default the new one to it: `$new: $old !default;`. For a map key, accept both keys.
- **Mixin or function parameter**: add new parameters at the end, with defaults. Never rename a keyword argument; add a second one and map the old onto it.
- **Data attribute, option, JS export, event**: accept or fire both. The `data-bs-*` / `data-tblr-*` pair in `core/js/src/bootstrap/dom/manipulator.ts` is the pattern.

### Remove

Do not. Mark it deprecated, stop using it in Tabler's own code, keep it working, and list it for removal in the next major. This includes things that look dead: a declaration with no effect inside Tabler may still be what a user overrides.

### Change what a name means

Do not reuse the name. `.legend` was a dot in 1.5 and became a whole legend item in 1.6, so old markup rendered as nothing. Either give the new thing a new name, or keep the old use working — `.legend:empty` in `_extends.scss` still draws the dot.

### Add a name

Adding is safe, with one trap: a name that fits an existing pattern may already sit in user markup as a no-op. `.text-gray-200` did nothing in 1.4 and turned text light gray in 1.5. When a new utility completes a series (`.text-*`, `.bg-*`, `.border-*`), say so under "Visual changes" in the upgrade guide.

### Change a default

Keep the old default and make the new behaviour opt-in: a class, an attribute, an option or a Sass variable. The new default can flip in the next major.

### Drop a bundled library or a file

Keep the file in `dist/` and the entry in `core/libs.json` until the next major, even if Tabler's own pages stop using it. Replacing a library with built-in code is fine, as long as the old script tag still loads and the old global still works or is harmless.

### Validate input more strictly

New validation must not throw on input that used to work. Coerce the value, or log with `console.warn` and fall back to the default. A throw during page load stops all of `tabler.js`.

## 3. Check the public surface before the PR

Build core, then diff the compiled CSS against the last release. Anything in the output is a removed class or custom property and needs an alias or a revert.

```shell
last=$(npm view @tabler/core version)
curl -s "https://cdn.jsdelivr.net/npm/@tabler/core@$last/dist/css/tabler.css" -o /tmp/released.css

surface() { grep -oE "$1" "$2" | sort -u; }
class='\.[a-zA-Z][a-zA-Z0-9_-]*'
prop='--tblr-[a-zA-Z0-9_-]+'

# classes, then custom properties, that the release has and the build lost
comm -23 <(surface "$class" /tmp/released.css) <(surface "$class" core/dist/css/tabler.css)
comm -23 <(surface -e"$prop" /tmp/released.css) <(surface -e"$prop" core/dist/css/tabler.css)
```

For the rest, read the diff against the release tag with the table from section 1 in hand:

```shell
git diff "@tabler/core@$last"..HEAD -- core/scss/_variables.scss core/scss/mixins core/js core/libs.json core/package.json .browserslistrc
```

Look for deleted `$variables`, changed mixin signatures, removed exports in `core/js/tabler.ts`, removed `libs.json` entries and new or removed dependencies.

## 4. Changesets and the upgrade guide

- A changeset on `dev` is `patch` or `minor`. If the honest bump is `major`, the change is on the wrong branch — go back to section 2.
- Describe a deprecation as one, for example ``Added `.legend-dot`; an empty `.legend` still works but is deprecated.`` Never write `Removed` for something a user could have used.
- In the upgrade guide a deprecation goes under a "renamed" heading with "the old name still works" (see the `upgrade-guide` skill). A minor release should have nothing under a breaking-change heading.

## 5. When a break cannot be avoided

Some changes have no alias: dropping a whole color model, raising the browser floor, removing a dependency users import. Those belong to the next major release, not to `dev`. Say so in the PR, and do not split the change to sneak half of it into a minor. If you are unsure whether something is a break, assume it is and ask.
