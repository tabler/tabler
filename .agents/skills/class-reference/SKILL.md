---
name: class-reference
description: Write or update the `classnames` front matter that renders the class reference table on a Tabler docs page. Use whenever a component page needs its class list added, a component gains or loses a class in `core/scss/**`, or the user asks for a class reference, a class table, or a `classnames` block. Also consult it proactively after adding a class to an existing component, since the table is hand-written and will not notice on its own.
---

# Class reference front matter

Every component page carries a `classnames` block in its front matter. `DocsClassnames.astro` renders it as a table at the end of the page, `docs/pages/llms.txt.ts` reprints it for agents, and `docs/content.config.ts` validates it. Editing the table means editing the front matter — there is no markdown table to touch.

## 1. Shape

```yaml
classnames:
  component:
    - class: alert
      desc: Container element
  part:
    - class: alert-icon
      desc: Icon slot, sized and colored with the alert
  color:
    - class: alert-{color}
      desc: Any base color, for example alert-success or alert-blue
```

The schema is strict (`docs/content.config.ts`), so a mistyped key fails the build. Each entry takes `class`, `desc`, and optionally `default: true`, which renders a "default" badge.

## 2. The eight types

Rendered in this order regardless of the order in the file, so group by meaning rather than by position:

| Type | Holds | Examples |
| --- | --- | --- |
| `component` | the class that makes the thing | `alert`, `btn`, `card` |
| `part` | sub-elements it is built from | `card-header`, `alert-icon` |
| `style` | surface treatment | `btn-outline`, `btn-ghost`, `alert-minor` |
| `modifier` | shape or box changes | `btn-pill`, `btn-square`, `accordion-flush` |
| `behavior` | state and motion | `btn-loading`, `icon-pulse`, `table-hover` |
| `direction` | placement and orientation | `offcanvas-start`, `steps-vertical` |
| `color` | color variants | `alert-{color}`, `btn-{color}` |
| `size` | size variants | `btn-sm`, `avatar-{size}` |

The split between `style`, `modifier` and `behavior` follows daisyUI: how it looks, what shape it is, how it reacts.

## 3. Collapse generated families

Tabler generates colors, sizes, breakpoints and directions with loops. Listing each one turns a reference into a wall — `btn` alone compiles to 141 classes. Write one row with a brace placeholder and say what fills it:

```yaml
  - class: btn-{color}
    desc: Any base or social color, for example btn-primary or btn-facebook
  - class: table-mobile-{breakpoint}
    desc: Stacks rows into blocks below the breakpoint
  - class: switch-icon-slide-{direction}
    desc: Slides the icons; up, down, left, right, start or end
```

Collapse when the family is mechanical and complete. Keep separate rows when the members differ in meaning — `btn-sm`, `btn-lg` and `btn-xl` are worth spelling out, `flag-country-{code}` is not (258 members).

## 4. Leave out

- Classes a script toggles rather than an author writes: `carousel-item-next`, `modal-backdrop`, `accordion-collapse`, `active`, `show`.
- Bootstrap utilities that are not part of the component.
- Classes that do not exist. This is the failure mode to guard against — see section 6.

## 5. Writing the description

Say what the class does, from the rule, not from the name:

- `alert-minor` — "Drops the tinted background, keeps a plain border", not "minor style".
- `td-truncate` — "Cell whose content is cut with an ellipsis instead of stretching the table".

One line, no trailing period needed, simple English. Read the SCSS before writing:

```shell
sed -n '/^\.alert-minor/,/}/p' core/scss/ui/_alerts.scss
```

## 6. Check every class exists

Descriptions are hand-written, so a class can be invented or survive a rename. Three wrong entries were caught this way while the tables were first written — `trending` and `map` were never classes at all, and `.map` matched only a stray fragment in the compiled CSS.

Verify against the compiled stylesheet, and confirm the rule has a body rather than trusting a text match:

```shell
python3 -c "
import re
css = open('core/dist/css/tabler.css').read()
for c in ['alert-minor', 'alert-icon']:
    m = re.search(r'(^|\})\s*\.' + c + r'\s*\{([^}]*)\}', css)
    print(c, '->', ' '.join(m.group(2).split())[:70] if m else 'NOT A RULE')
"
```

Plugin classes live in their own sheets — `tabler-flags.css`, `tabler-socials.css`, `tabler-payments.css`, `tabler-vendors.css` — so read the right one.

Components with no class of their own are real: `trending` is built from `text-green` plus an arrow icon, and the map page frames an embed with `ratio`. Document what the page actually uses.

## 7. Also set `source`

Pages that carry `classnames` should carry `source` too — the repo-relative file that implements the component, rendered as the "Source code" link:

```yaml
source: core/scss/ui/_alerts.scss
```

Most map to `core/scss/ui/_<name>s.scss`. Exceptions worth knowing: `segmented-control` → `_segmented.scss`, `step` → `_steps.scss`, `star-rating` → `_stars.scss`, `divider` → `_type.scss`, `tab` → `_nav.scss`, `tooltip` → `bootstrap/_tooltip.scss`, `trending` → `shared/ui/Trending.astro`.

## 8. Finish

- Load the page and confirm the table renders and "Class reference" reaches the "On this page" rail.
- Run `pnpm run lint` and `pnpm --dir docs run type-check`.
- New pages also need a menu entry in `shared/data/docs.json` — see the write-docs skill.
