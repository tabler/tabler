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

## Upgrading to Tabler 1.5

The 1.4 to 1.5 upgrade guide lives in the documentation: [Upgrade to 1.5](https://docs.tabler.io/ui/getting-started/upgrade/).

It covers every breaking change between 1.4 and 1.5, with a before and after example for each one.
