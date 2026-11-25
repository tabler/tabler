# Accessibility

Tabler is a UI kit, so its accessibility has two halves. We are responsible for what ships in `@tabler/core`: the styles, the JavaScript components and the markup in our examples. You are responsible for what you build with it: the content, the labels, the heading order and the way components are put together on a
page.

This page says what we aim for, what we know is not there yet, and how to tell us about a barrier.

## Goals

We aim for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) level AA in the components and example pages we ship. This is a target, not a conformance claim. Tabler has not had an independent accessibility evaluation.

In practice we work on these things first:

- **Color contrast** of text, icons and control borders, in the light and the dark theme.
- **Keyboard use** of every interactive component, with a visible focus indicator.
- **Names and roles** that assistive technology can read: the right element, the right ARIA attributes, a label on every icon-only control.
- **Motion** that respects `prefers-reduced-motion`.
- **Right-to-left** layouts.

## What Tabler does for you

- A focus ring on every focusable element, with an outline fallback in forced-colors mode (Windows High Contrast).
- Decorative and looping animations are turned off under `prefers-reduced-motion: reduce`.
- The JavaScript components (modal, dropdown, offcanvas, tabs, tooltip and others) manage focus, keyboard interaction and ARIA state.
- The layouts in the preview include a "Skip to main content" link.
- `.visually-hidden` and `.visually-hidden-focusable` for text that only assistive technology needs.

## What stays with you

Tabler cannot do these for you:

- Give every icon-only button and link an accessible name (`aria-label` or visually hidden text).
- Connect every form control to a `<label>`.
- Keep headings in order and use landmarks (`<main>`, `<nav>`, `<header>`).
- Write alternative text for images and charts.
- Check contrast again after you change theme colors.
- Test your own pages. Accessible components do not guarantee an accessible page.

## Supported environments

Tabler supports the browsers listed in [`.browserslistrc`](../.browserslistrc): current versions of Chrome, Edge, Firefox, Safari, iOS Safari, Opera and Samsung Internet.

We check keyboard use and both color themes when we work on a component. We do not test every release with every screen reader. Reports from people who use NVDA, JAWS, VoiceOver, TalkBack, voice control, a switch or screen magnification are very welcome, because they cover what we cannot.

## Known limitations

- Some component labels and theme colors do not reach AA contrast yet: [#3630](https://github.com/tabler/tabler/issues/3630), [#3359](https://github.com/tabler/tabler/issues/3359).
- Toggle buttons do not set `aria-pressed` by default: [#3438](https://github.com/tabler/tabler/issues/3438).
- Third-party plugins that Tabler styles (charts, maps, calendars, rich text editors and others) have their own accessibility support. We style them, but we do not control their markup or keyboard behavior.
- The documentation has no single accessibility guide yet: [#2892](https://github.com/tabler/tabler/issues/2892).

All open reports are under the [`accessibility` label](https://github.com/tabler/tabler/issues?q=is%3Aissue+is%3Aopen+label%3Aaccessibility).

## Reporting a barrier

Open an issue with the [bug report template](https://github.com/tabler/tabler/issues/new?template=bug_report.yml). It helps to say:

- which component or page is affected,
- what you tried to do and what stopped you,
- your browser, operating system and assistive technology, if you use one.

Plain words are enough. You do not have to add a screenshot or a recording, and you never have to tell us anything about yourself or a disability.

If you do not want to post in public, start a thread in [GitHub Discussions](https://github.com/tabler/tabler/discussions) or contact the maintainers through the channels in [SUPPORT.md](SUPPORT.md).

## What happens next

1. We add the `accessibility` label and try to reproduce the problem.
2. If we need more detail, we ask in the issue.
3. A barrier that blocks someone from using a component is treated as a bug and goes into the next patch release when it can be fixed without a breaking change. Changes that would break existing projects wait for the next major version.
4. We link the fix in the issue, so you can check that it works for you.

Tabler is maintained by a small team in the open, so we cannot promise response times. We do read every report.

## For contributors

Before you open a pull request that adds or changes a component, check that:

- every action works with the keyboard alone, and the focus order makes sense,
- focus is always visible,
- icon-only controls have an accessible name,
- state is exposed, not only shown (`aria-expanded`, `aria-selected`, `aria-pressed`, `aria-invalid`, `disabled`),
- text and control borders meet AA contrast in the light and the dark theme,
- animation stops or shortens under `prefers-reduced-motion: reduce`,
- the layout holds in a right-to-left page and at 200% zoom.

Use native elements before ARIA: a `<button>` instead of a clickable `<div>`. The same list applies to changes made with a coding agent.

## Ownership

This page is maintained by the Tabler core maintainers, listed in [CODEOWNERS](CODEOWNERS). To suggest a change to it, open a pull request or an issue.
