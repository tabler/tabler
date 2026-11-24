# Tabler

Tabler is a UI framework: CSS and JavaScript in `@tabler/core`, plus the preview and docs sites that show it.

## Plugin lifecycle

**Plugin**:
A JavaScript class that attaches behaviour to one element and has at most one instance per element. Bootstrap components and Tabler's own plugins are the same kind of thing.
_Avoid_: component (in JS), widget, module

**Registration**:
The record that tells Tabler which elements a Plugin belongs to and how it starts on them. Every Plugin has one, even a Plugin that only starts from a trigger.
_Avoid_: entry, descriptor

**Trigger**:
An element whose click (or other event) creates or drives a Plugin instance on a target, such as `data-bs-toggle="modal"`.
_Avoid_: toggle, handler

**Page start**:
The single start of the whole page when the bundle loads, at import time, on `DOMContentLoaded` or on `load`. It includes effects that concern the whole document, such as opening a tab from the URL hash.
_Avoid_: boot, auto-init

**Root init**:
Starting Plugins for the markup under one root after the page has started, for example after a fetched fragment is added. It can be repeated and never touches anything outside the root.
_Avoid_: re-init, refresh

**Root dispose**:
Releasing every Plugin instance on the elements under one root before that markup is removed or replaced.
_Avoid_: destroy, teardown
