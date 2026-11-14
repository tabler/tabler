#!/usr/bin/env bash
# Vercel "Ignored Build Step". Exit 0 skips the build, exit 1 runs it.
# Runs from the project root directory; extra project paths come as arguments.

prev="$VERCEL_GIT_PREVIOUS_SHA"

[ -n "$prev" ] || exit 1
git cat-file -e "$prev^{commit}" 2>/dev/null || exit 1

git diff --quiet "$prev" HEAD -- . "$@" \
  ../core ../shared ../.build ../.browserslistrc \
  ../package.json ../pnpm-lock.yaml ../pnpm-workspace.yaml ../turbo.json || exit 1
