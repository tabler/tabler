# Compatibility fixture

A small project written the way a Tabler **1.5** user would write it. It must
compile and behave the same on the last release from npm and on the working
tree. `pnpm run check:compat-fixture` runs it against both.

- `project.scss` configures and reads 1.5 Sass variables, and calls 1.5
  functions and mixins.
- `page.html` loads the compiled files from `dist/` with 1.5 markup, the
  libraries from `dist/libs`, and the old JavaScript helpers.

Do not update this project when Tabler changes. When a check fails, fix Tabler:
see the `backward-compat` skill. Add to it only when a new kind of break shows
that it missed something a real project does.
