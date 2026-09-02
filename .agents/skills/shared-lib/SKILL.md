---
name: shared-lib
description: >-
  Move logic out of Astro frontmatter into `shared/lib/*.ts` and cover it with
  a vitest test. Use when a component's or page's frontmatter grows past
  assembling classes, when demo data needs shaping or formatting, when the
  same helper appears in two components, or when the user asks for a helper,
  utility or unit test under `shared/`. Covers what belongs there, module
  conventions, the sibling `*.test.ts` rule, deterministic demo data, and the
  strict-TypeScript patterns the repo uses.
---

# Helpers in `shared/lib`

`shared/lib/*.ts` is the only place in `shared/` where real logic lives. Components stay markup; anything with a branch worth testing moves here, gets a name, and gets a test.

## 1. What belongs here

Move it to `shared/lib` when it is:

- **formatting** — dates, numbers, strings (`date-format.ts`, `string-format.ts`)
- **data access** — turning a JSON file into a typed export (`people.ts`, `site.ts`)
- **generation** — deterministic demo values (`pseudo-random.ts`), SVG/icon handling (`svg.ts`), markdown rendering (`render-markdown.ts`)
- **anything duplicated** in two components, or longer than a few lines in frontmatter

Keep it in the component when it is class assembly, a ternary over props, or a single `.map()` over a prop — pushing that into `lib` only adds an import.

Do not put in `shared/lib`: DOM code (that is an inline script — see the `astro-scripts` skill), Astro-specific rendering (that is a component), or build-time tooling (that is `.build/`).

## 2. Module conventions

```ts
// Demo data date formatting quirks:
// - unix seconds are shifted by local timezone offset (not the true epoch)
const MONTHS = ['January', 'February', /* … */]

/** Formats a date as "Month DD, YYYY" using its UTC components. */
export function formatLongDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, '0')}, ${date.getUTCFullYear()}`
}
```

- Named exports only, one topic per file, filename in kebab-case matching the topic.
- Explicit return types; pure functions with no module-level mutable state (`page-scripts.ts` is the deliberate exception — a render-scoped registry).
- A file-header comment when the module encodes a quirk (why the epoch is shifted, why the RNG is fake). A `/** … */` line on each exported function.
- Export the types consumers need (`export interface Person`), so call sites do not re-cast.
- Imports inside `shared/` are relative (`./array`, `../data/people.json`). Any bare npm import must be declared in `shared/package.json`.

## 3. Every module has a sibling test

`shared/vitest.config.mts` collects `lib/**/*.test.ts`, so `foo.ts` gets `foo.test.ts` next to it. This is not optional — every module in the directory has one.

```bash
pnpm --filter @tabler/shared test        # one run
pnpm --filter @tabler/shared test:watch  # while writing
pnpm run test                            # all packages, via turbo
```

Test the branches, not the happy path only: the fallback when a regex does not match, the empty range, the thrown error. `globals: true` is set, but the existing files still import `describe`/`it`/`expect` from `vitest` — keep that style.

## 4. Demo data must be deterministic

Pages are rebuilt constantly and the rendered HTML is compared byte-for-byte (`html-diff` skill), so a helper that produces different output on each run breaks the harness and pollutes diffs.

- Use `pseudo-random.ts` (`randomNumber`, `randomDate`, `randomItem`, `timeagoLabel`), seeded by the loop index — never `Math.random()`.
- Never seed demo data from `Date.now()` / `new Date()` without arguments. Fixed dates only.

## 5. Strict TypeScript patterns

Every package extends `astro/tsconfigs/strictest`, so indexing an array yields `T | undefined`:

- Use `requireIndex(items, i)` from `array.ts` when the demo data is trusted to have the entry — it throws with a useful message instead of rendering `undefined`.
- Cast a JSON import to its type **once**, in the lib module, and export the typed value (`export const people = peopleData as Person[]`). Call sites import the typed export; they never re-cast the JSON.
- Give such interfaces an index signature (`[key: string]: unknown`) when the JSON has more fields than the components read.

`pnpm run type-check` runs `astro check` per package and covers these files.

## 6. Checklist

- [ ] Logic is out of the frontmatter and named after what it does
- [ ] Named exports, explicit return types, no hidden state
- [ ] Header comment for quirks, doc comment per exported function
- [ ] Sibling `*.test.ts` covering the branches, not just the happy path
- [ ] Deterministic: `pseudo-random.ts`, no `Math.random()`, no unseeded dates
- [ ] JSON cast once in the lib module, `requireIndex` for trusted indexing
- [ ] `pnpm --filter @tabler/shared test`, repo-level `type-check` and `format:prettier` clean
