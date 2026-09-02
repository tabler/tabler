// Snippets declared in page content render at the end of <body> (via PageScripts).
//
// One registry per render, keyed by the request object, so a render that never
// reaches PageScripts (the .md and llms endpoints render page content too)
// cannot leak its scripts into the next page the build produces.
//
// A string OR a promise of a string is registered: CaptureScript must register
// itself SYNCHRONOUSLY in its frontmatter (before it first yields control via
// await), because Astro renders siblings concurrently and PageScripts may drain
// the registry before the asynchronous render of the slot completes.
type Script = string | Promise<string>

const registries = new WeakMap<object, Script[]>()

export function addPageScript(render: object, html: Script): void {
  // No dedup: every registration is emitted, even byte-identical ones
  // (e.g. two identical star-rating inits).
  const scripts = registries.get(render) ?? []
  scripts.push(html)
  registries.set(render, scripts)
}

export function drainPageScripts(render: object): Script[] {
  const out = registries.get(render) ?? []
  registries.delete(render)
  return out
}
