---
name: ui-component
description: >-
  Build or extend a shared Astro component in `shared/ui/*.astro` (or
  `shared/components/**`) — the library that both the preview and the docs
  render. Use whenever the user asks for a new component, for a new prop,
  variant or size on an existing one, or for a refactor of a shared component.
  Covers the Props interface, the prop-name dictionary, class composition,
  slots, the `as` pitfall, and the follow-ups (demo page, docs, changeset) a
  new component needs.
---

# Build a shared UI component

`shared/ui/*.astro` is the component library. `@tabler/preview` and `@tabler/docs` render the same files, so every change here lands on demo pages and in documentation examples at once. Components are markup: the design lives in `core/scss/`, and logic longer than a few lines lives in `shared/lib/*.ts`.

## 1. Before creating a file

- **Extend, do not fork.** Read the `Props` interface of the closest existing component first. A new look is a prop on the existing component (`variant`, `size`, `light`), never a parallel `ButtonAlt.astro`.
- **Check the demo page before the component.** If `preview/pages/<name>.astro` hand-writes variants the component cannot express, those are the missing props, and the component has drifted from the markup it is supposed to own. Close that gap instead of adding one more hand-written block.
- **Find the CSS first.** A component wraps classes that exist in `core/scss/ui/_*.scss`. If the class is missing, writing it is part of the task — never invent class names in the component.
- Where it goes: generic building blocks in `shared/ui/`; fixed demo content (a dashboard card with its own data) in `shared/components/cards/`; docs-only components in `docs/components/`.
- Imports inside `shared/` are relative (`./Icon.astro`, `../components/CaptureScript.astro`). `@shared` / `@ui` / `@data` are for the site packages. Any bare npm import used in `shared/` must be declared in `shared/package.json`.

## 2. Skeleton

```astro
---
import Icon from './Icon.astro'

/** core/scss/ui/_badges.scss `.badge-{size}` modifier classes */
type BadgeSize = 'sm' | 'lg'

interface Props {
  text?: string
  color?: string
  size?: BadgeSize | undefined
  /** -lt colour variant + text-{color}-lt-fg */
  light?: boolean
  class?: string
  icon?: string
  /** remaining attributes (id, data-*, aria-*, …) are forwarded to the root element */
  [key: string]: unknown
}

const { text, color, size, light, class: className, icon, ...rest } = Astro.props

const classes = ['badge', size && `badge-${size}`, color && `bg-${color}${light ? '-lt' : ''}`, className]
---

<span class:list={classes} {...rest}>{icon && <Icon name={icon} />}{text}</span>
```

Rules the file above follows, and every component should:

- `interface Props` + destructuring with defaults. No untyped `Astro.props`.
- The `class` prop keeps its HTML name and is destructured as `class: className`.
- A union type for each modifier set (`'sm' | 'lg'`), with a doc comment naming the SCSS file the classes come from. Export the type (`export type IconSize`) when a sibling component reuses it.
- `[key: string]: unknown` + `...rest` spread on the root element, so callers can pass `id`, `data-*`, `aria-*` without a prop for each. Add it unless the component deliberately controls its own attributes.
- One doc comment per non-obvious prop, saying which class or attribute it emits.

## 3. Prop-name dictionary

Names are shared across the library so the API stays predictable (and stays portable to React/Vue later). Reuse these before inventing a name:

| Prop | Meaning |
| --- | --- |
| `class` | extra classes, merged last so callers can override |
| `id` | element id; **required** for components that a script initialises |
| `color` | palette colour (`primary`, `azure`, …), emitted as `-{color}` |
| `size` | `sm` / `md` / `lg` (…), where `md` emits no class |
| `variant` | style variant of the same component (`outline`, `ghost`, `important`) |
| `text`, `title`, `description`, `label` | content passed as a prop instead of a slot |
| `icon`, `iconEnd` | icon names, rendered through `Icon.astro` |
| `href`, `external` | link target; `external` adds `target="_blank" rel="noreferrer"` |
| `disabled`, `active`, `required`, `invalid` | state booleans, named after the HTML/CSS state |
| `show…` (`showClose`, `showValue`) | opt-in parts of the markup |
| `ariaLabel` | accessible name when the visible content is an icon or a colour |

Props are camelCase. Booleans default to `false` — never `showClose = true`.

## 4. Class composition

- Use `class:list={[...]}` with falsy entries for conditionals; it drops them and merges the caller's `className` for you. `.filter(Boolean).join(' ')` is only for a string you have to pass to a helper (`iconSvg`).
- Put `className` last so the caller wins.
- Do not emit a class for a default (`size !== 'md' && \`btn-${size}\``).
- No `<style>` blocks and no CSS imports in the frontmatter. Styling is `core/scss/`.

## 5. Slots and containers

Container components (`Card`, `CardBody`, `ButtonList`, …) take a `<slot />` rather than a content prop. Use `Astro.slots.has('name')` when the markup differs depending on whether a named slot was filled.

Polymorphic containers take an `as` prop — with one trap:

```astro
---
import type { HTMLTag } from 'astro/types'

// `as` must stay out of the Props body: Astro's frontmatter scanner bails on a member
// literally named `as` and silently falls back to untyped props.
type PolymorphicProps = { as?: HTMLTag }

interface Props extends PolymorphicProps {
  class?: string
}

const { as: Element = 'div', class: className }: Props = Astro.props
---

<Element class:list={['card', className]}><slot /></Element>
```

Heading components pick their own level (`CardTitle` renders `h2`, `as="h3"` for a nested section) so pages cannot skip levels.

## 6. Escape hatches and Astro traps

- Content that may contain markup or entities (`&hellip;`) → `set:html` / `<Fragment set:html={…} />`. Entities in attribute strings must be passed as an expression (`title={"…&hellip;"}`), because JSX decodes them inside string literals.
- Boolean attributes are inconsistent: `selected={true}` renders bare, but some (e.g. `multiple`) render `="true"`. Use `multiple ? '' : undefined` when a bare attribute is required, and check the rendered HTML.
- Client-side behaviour (plugin init, event wiring) does **not** go in an ad-hoc `<script>` — see the `astro-scripts` skill.
- Icons always through `<Icon name="…" />`, never inline SVG.

## 7. Logic belongs in `shared/lib`

Anything beyond assembling classes and simple ternaries (formatting, data shaping, SVG handling, deterministic demo data) goes to `shared/lib/*.ts` and is imported by the component. Every module there has a sibling `*.test.ts` run by vitest (`pnpm --filter @tabler/shared test`) — add one for the function you introduce, and keep it pure so it is testable without a DOM.

Use `pseudo-random.ts` instead of `Math.random()` for demo data: pages are rebuilt constantly and random output would change the HTML on every build.

## 8. After the component exists

A new component is not done until it is visible and documented:

1. **Demo page** — a page in `preview/pages/` showing its variants (`demo-pages` skill).
2. **Docs page** — `docs/content/**` (`write-docs` skill), plus the class table (`class-reference` skill) when the component introduces classes.
3. **Changeset** — `generate-changeset` skill, `minor` for a new component, `patch` for a fix.

## 9. Checklist

- [ ] Extends an existing component instead of duplicating one
- [ ] Classes exist in `core/scss/`; no invented class names
- [ ] `interface Props` typed, prop names taken from the dictionary in section 3
- [ ] `class: className` merged last, `...rest` forwarded
- [ ] Accessible: semantic element, `ariaLabel` where the content is an icon
- [ ] Logic in `shared/lib` with a test, not in the frontmatter
- [ ] `pnpm run format-prettier` and `pnpm run type-check` clean at the repo root (full output, not a tail)
- [ ] Demo page + docs page + changeset
