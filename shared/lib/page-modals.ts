// Modals declared in page content render at the end of <body>, before the
// settings panel (via PageModals).
//
// A string OR a promise of a string is registered: CaptureModal must register
// itself SYNCHRONOUSLY in its frontmatter (before it first yields control via
// await), because Astro renders siblings concurrently and PageModals may drain
// the registry before the asynchronous render of the slot completes.
const modals: Array<string | Promise<string>> = []

export function addPageModal(html: string | Promise<string>): void {
  if (!modals.includes(html)) {
    modals.push(html)
  }
}

export function drainPageModals(): Array<string | Promise<string>> {
  const out = [...modals]
  modals.length = 0
  return out
}
