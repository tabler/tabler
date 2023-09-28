---
name: Bug report
about: Create a report to help us improve
title: "[BUG] "
labels: bug
assignees: ''
body:
- type: input
  id: browser
  attributes:
    label: Browser
    description: "What browser and version did this bug occur on?"
    placeholder: "e.g. Chrome ver.22, Safari ver.10"
  validations:
    required: true
- type: input
  id: os
  attributes:
    label: OS
    description: "What is the operating system of your device?"
    placeholder: "e.g. Windows 10, iOS 14, Ubuntu 23.04"
  validations:
    required: true
- type: input
  id: screen_size
  attributes:
    label: Screen size
    description: "What is the screen size of your device?"
    placeholder: "e.g. 800x600, 1920x1080"
  validations:
    required: true
---

**Describe the bug**

A clear and concise description of what the bug is.

**To reproduce**

Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Screenshots**

If applicable, add screenshots to help explain this problem.

**JSFiddle**

Please add a jsFiddle replicating the bug. Without the jsFiddle most bug reports cannot be solved and will be closed.
