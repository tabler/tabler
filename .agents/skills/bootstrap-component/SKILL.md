---
name: bootstrap-component
description: >-
  Write a new Bootstrap-style JavaScript component class in `core/js/src/bootstrap/` — a `BaseComponent` subclass with typed config, `EVENT_*`/`CLASS_NAME_*` constants and a `data-bs-toggle` Data API. Use whenever the user asks for a new component in the Bootstrap port (a toggler, a dialog, a chip input, a stepper) or
  wants an existing one brought up to this baseline. Covers file structure, TypeScript typing of `Default` and `DefaultType`, constructor and config merging, events, the Data API handler and the minimal public API. Not for the build, the tests or the size budget — that is the `core-js` skill.
---

# Rules for writing new components

You are a master of JavaScript and TypeScript.

The points below are the baseline for every new component class in `core/js/src/bootstrap/`. Read the `core-js` skill first for what that directory is (a vendored port of Bootstrap's JavaScript), how it is built, tested and size-budgeted.

## 1. File structure

In this order:

1. Header with the MIT license comment and the file name (`Bootstrap toggler.ts`).
2. Imports: `BaseComponent`, `EventHandler`, optionally `Manipulator`, `SelectorEngine`, helpers from `./util/*`.
3. Types and interfaces at the top (`ComponentConfig`, `ComponentConfigInput`).
4. Constants: `NAME`, `DATA_KEY`, `EVENT_KEY`, selectors, classes, event names.
5. `Default` and `DefaultType` with TS types.
6. The component class.
7. "Data API implementation" section (when applicable).
8. Default export of the class.

## 2. Typing

- Define `type ComponentConfig` and `type ComponentConfigInput`:

  ```ts
  type ComponentConfig = {
    attribute: string
    value: string | number | boolean | null
  }

  type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>
  ```

- Type `Default` as `ComponentConfig`.
- Type `DefaultType` as `Record<keyof ComponentConfig, string>`.
- In the class, declare:
  - `declare _element: HTMLElement` (or a more specific element type).
  - `declare _config: ComponentConfig`.
  - `declare _isTransitioning: boolean` (when needed).
- Type method signatures explicitly (`show(): void`, `hide(): void`).
- `EventHandler.trigger(...)` can return `null` — use `?.defaultPrevented`.
- Use `Event` for handlers, and cast when you need specifics (`const keyboardEvent = event as KeyboardEvent`). `EventHandler.on` is generic, so `(event: KeyboardEvent) => …` type-checks without a cast; for `event.delegateTarget` cast to `DelegatedEvent` from `./dom/event-handler`.
- `core/tsconfig.json` is `strict` and `core/js/src` has no `any` at all, so a missing null check or an implicit `any` fails `pnpm run type-check`. Reach for `unknown` plus a type guard, or a small named type, instead of `any`, `[key: string]: any` or `as any`.
- Prefer modern syntax like `#private` class fields over the `private` keyword.

## 3. Constructor and config

- Call `super(element, config as Record<string, unknown>)`.
- Read config from `Manipulator.getDataAttributes(...)` and merge with `Default`. `BaseComponent._getConfig` already does this through `_mergeConfigObj` → `_configAfterMerge` → `_typeCheckConfig`.
- If you need custom config processing, override `_getConfig` (or `_configAfterMerge`).
- After constructing, only set required fields and attach listeners.

## 4. Events and CSS classes

- Use constants in the format `EVENT_${NAME}` and `CLASS_NAME_*`.
- Build events with `EVENT_KEY` and `DATA_KEY` (as in `alert.ts`):

  ```ts
  const NAME = 'toggler'
  const DATA_KEY = 'bs.toggler'
  const EVENT_KEY = `.${DATA_KEY}`

  const EVENT_TOGGLE = `toggle${EVENT_KEY}`
  const EVENT_TOGGLED = `toggled${EVENT_KEY}`
  const CLASS_NAME_SHOW = 'show'
  ```

- Fire a cancellable `before` event, do the work, then fire the `after` event.
- Use only `EventHandler.on/off/one/trigger`.

## 5. Data API

- Selector in the form `[data-bs-toggle="name"]`. The attribute API stays `data-bs-*`; `data-tblr-*` is a 2.0 change (see `core-js`).
- Data API handler:
  - check `A/AREA` and `event.preventDefault()`.
  - use `SelectorEngine.getElementFromSelector`.
  - `Name.getOrCreateInstance(target, config)` for data attributes.
- Use the helpers from `./util/component-functions` instead of writing the handler by hand:
  - `eventActionOnPlugin(Component, 'click', SELECTOR_DATA_TOGGLE, 'toggle')` for a `data-bs-toggle` — resolves the targets (`data-bs-target` / `href`, or the trigger itself), skips `.disabled` / `:disabled`, prevents the default on `A/AREA`, and calls the method on `getOrCreateInstance` of every target. An optional
    fifth argument receives `{ targets, event, instances }`.
  - `enableDismissTrigger(Component, 'close')` for a `data-bs-dismiss`.
  - Write the `EventHandler.on(document, ...)` handler yourself only when the trigger needs config from data attributes or other custom logic.

## 6. Initialization and public API

- Minimal public API: `show`, `hide`, `toggle`, `dispose`.
- If the component has animation state, use `_queueCallback` and `_isAnimated`.
- Expose `static get NAME`, `static get Default`, `static get DefaultType`.
- Export the class from `core/js/src/bootstrap.ts` (named export and the `bootstrap` namespace object), otherwise it never ships.

## 7. Style and consistency

- Keep style consistent with existing components (indentation, naming, comments, the `// Getters` / `// Public` / `// Private` section comments).
- Avoid direct DOM operations outside `EventHandler` and `SelectorEngine`, unless the component requires otherwise.

## 8. Template

```ts
/**
 * --------------------------------------------------------------------------
 * Bootstrap toggler.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import BaseComponent from './base-component'
import EventHandler from './dom/event-handler'
import { eventActionOnPlugin } from './util/component-functions'

type ComponentConfig = {
  attribute: string
  value: string | number | boolean | null
}

type ComponentConfigInput = Partial<ComponentConfig> & Record<string, unknown>

/**
 * Constants
 */

const NAME = 'toggler'
const DATA_KEY = 'bs.toggler'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_TOGGLE = `toggle${EVENT_KEY}`
const EVENT_TOGGLED = `toggled${EVENT_KEY}`
const EVENT_CLICK = 'click'

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="toggler"]'

const DefaultType: Record<keyof ComponentConfig, string> = {
  attribute: 'string',
  value: '(string|number|boolean)',
}

const Default: ComponentConfig = {
  attribute: 'class',
  value: null,
}

/**
 * Class definition
 */

class Toggler extends BaseComponent {
  declare _element: HTMLElement
  declare _config: ComponentConfig

  constructor(element?: Element | string | null, config?: ComponentConfigInput | null) {
    super(element as string | HTMLElement, (config ?? undefined) as Record<string, unknown>)
  }

  // Getters
  static get Default(): ComponentConfig {
    return Default
  }

  static get DefaultType(): Record<keyof ComponentConfig, string> {
    return DefaultType
  }

  static get NAME(): string {
    return NAME
  }

  // Public
  toggle(): void {
    const toggleEvent = EventHandler.trigger(this._element, EVENT_TOGGLE)

    if (toggleEvent?.defaultPrevented) {
      return
    }

    this._execute()

    EventHandler.trigger(this._element, EVENT_TOGGLED)
  }

  // Private
  _execute(): void {
    const { attribute, value } = this._config

    if (attribute === 'class') {
      if (value) {
        this._element.classList.toggle(String(value))
      }
      return
    }

    // Compare as strings since getAttribute() always returns a string
    if (this._element.getAttribute(attribute) === String(value)) {
      this._element.removeAttribute(attribute)
      return
    }

    this._element.setAttribute(attribute, String(value))
  }
}

/**
 * Data API implementation
 */

eventActionOnPlugin(Toggler, EVENT_CLICK, SELECTOR_DATA_TOGGLE, 'toggle')

export default Toggler
```

## 9. Checklist

- [ ] File order as in §1, MIT header with the file name
- [ ] `ComponentConfig` / `ComponentConfigInput` defined; `Default` and `DefaultType` typed
- [ ] `declare _element` / `declare _config` in the class, explicit return types
- [ ] `EVENT_*` and `CLASS_NAME_*` constants, `?.defaultPrevented` on cancellable events
- [ ] Data API on `[data-bs-toggle="name"]` through `eventActionOnPlugin` (or a hand-written handler with the `A/AREA` guard and `getOrCreateInstance`)
- [ ] Public API limited to `show` / `hide` / `toggle` / `dispose`
- [ ] Exported from `core/js/src/bootstrap.ts`
- [ ] Spec in `js/tests/unit/`, and the `core-js` checklist (type-check, prettier, bundlewatch)
