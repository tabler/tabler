---
"@tabler/core": minor
---

Added `.theme-{color}` classes (`.theme-red`, `.theme-yellow`, `.theme-facebook` and every other theme, extra and social color) that color the component they sit on: buttons, badges, avatars, alerts, statuses, tags, toasts, progress bars, steps, form checks, ranges, ribbons and more read the new `--theme-bg`, `--theme-fg`, `--theme-darken`, `--theme-lt`, `--theme-muted` and `--theme-border` tokens. The tokens do not inherit, so components nested inside a colored one keep their own look, and there is no `.theme-dark` color class because `.theme-dark` stays the dark mode switch.
