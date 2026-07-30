// Equivalent of eleventy {% capture_script %} / {% scripts %}: snippets declared
// in the page content render at the end of <body> (via PageScripts).
//
// A string OR a promise of a string is registered: CaptureScript must register
// itself SYNCHRONOUSLY in its frontmatter (before it first yields control via
// await), because Astro renders siblings concurrently and PageScripts may drain
// the registry before the asynchronous render of the slot completes.
const scripts: Array<string | Promise<string>> = []

export function addPageScript(html: string | Promise<string>): void {
  // No dedup: Liquid's {% capture_script %} emits every snippet, even
  // byte-identical ones (e.g. two identical star-rating inits).
  scripts.push(html)
}

export function drainPageScripts(): Array<string | Promise<string>> {
  const out = [...scripts]
  scripts.length = 0
  return out
}
