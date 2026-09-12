# Upgrading Tabler

## Upgrading to Tabler 2.0

Tabler 2.0 adopts Bootstrap v6's architecture while keeping the Bootstrap v5 class
names and public API. The full guide is written phase by phase on `v2-dev` and will
move into the documentation before the release. The plan and the per-phase breaking
changes live in [`BOOTSTRAP-V6-MIGRATION.md`](BOOTSTRAP-V6-MIGRATION.md).

### Removed classes

| Removed | Use instead |
| --- | --- |
| `.badge-outline` | A soft `.badge` with a `.bg-{color}-lt` fill, for example `<span class="badge bg-secondary-lt">`. It duplicated the soft variant without a role of its own. |

```diff
- <span class="badge badge-outline text-secondary">Label</span>
+ <span class="badge bg-secondary-lt">Label</span>
```

### Cascade layers

Tabler's CSS now lives in cascade layers, declared once at the top of every stylesheet:

```css
@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;
```

The reference is in the documentation: [Cascade layers](https://docs.tabler.io/ui/getting-started/customize/#cascade-layers).
What changes for an existing project:

| Before | Now |
| --- | --- |
| Your override had to beat Tabler on specificity, source order or `!important` | Unlayered CSS — your own stylesheet — wins over every Tabler rule, on every property |
| Utilities shipped with `!important` (2647 declarations in 1.5) | Utilities carry none; the `utilities` layer sits last and wins on its own |
| `$enable-important-utilities: false` turned that off | The variable is gone — remove it from your `@use … with ()` |
| Your `!important` always beat Tabler's `!important` | It still does from unlayered CSS, but inside a layer the order reverses: an important declaration in an earlier layer wins |
| A `.text-*` or `.bg-*` utility could restyle a plugin widget | Third-party CSS is unlayered and now beats the utilities — write those overrides in your own unlayered CSS |

Rules that relied on a Tabler class beating an element rule can flip, because the
layer decides before specificity does. Two known cases inside Tabler itself:

- `.small` and `.mark` sit in `reboot`, so a heading rule in `components` wins over
  `<h3 class="small">`.
- A helper such as `.ratio` sits in `helpers`, after `components`, so it now wins over
  a component that sets its own width.

If you need a rule to beat components but still lose to utilities, put it in the empty
`custom` layer:

```css
@layer custom {
  .card {
    border-radius: 0;
  }
}
```

`@keyframes`, `@property`, `@font-face` and `tabler-vendors.css` stay outside the
layers on purpose, so Tabler's plugin overrides keep beating each plugin's own
stylesheet. The exception is a few seed color declarations in `tabler-vendors.css`,
layered so a `.text-*` utility can still recolor the widget.

## Upgrading to Tabler 1.5

The 1.4 to 1.5 upgrade guide lives in the documentation: [Upgrade to 1.5](https://docs.tabler.io/ui/getting-started/upgrade/).

It covers every breaking change between 1.4 and 1.5, with a before and after example for each one.
