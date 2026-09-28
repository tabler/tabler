// Modals declared in page content render at the end of <body>, before the
// settings panel (via PageModals).
//
// One registry per render, keyed by the request object (like page-scripts):
// Astro renders pages concurrently in the build and the dev server, so a
// module-level list would hand one page's modals to another.
//
// A string OR a promise of a string is registered: CaptureModal must register
// itself SYNCHRONOUSLY in its frontmatter (before it first yields control via
// await), because Astro renders siblings concurrently and PageModals may drain
// the registry before the asynchronous render of the slot completes.
type Modal = string | Promise<string>

const registries = new WeakMap<object, Modal[]>()

export function addPageModal(render: object, html: Modal): void {
  // No dedup: every slots.render() is a new promise, so identical markup
  // could never be told apart here anyway.
  const modals = registries.get(render) ?? []
  modals.push(html)
  registries.set(render, modals)
}

export function drainPageModals(render: object): Modal[] {
  const out = registries.get(render) ?? []
  registries.delete(render)
  return out
}
