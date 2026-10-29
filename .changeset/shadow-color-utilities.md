---
"@tabler/core": minor
---

Add `.shadow-{color}` utilities (`.shadow-primary`, `.shadow-danger`, …, plus `.shadow-black`, `.shadow-white` and `.shadow-current`) that tint a shadow. The box shadows now read a local `--sc` custom property that falls back to `--shadow-color`, and `.shadow-*` size classes use it directly.
