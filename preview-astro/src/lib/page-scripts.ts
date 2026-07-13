// Equivalent of eleventy {% capture_script %} / {% scripts %}: components in the
// page content register snippets (<style>/<script>) during rendering, and BaseLayout
// emits them at the end of <body>. This works because Astro streams the render
// sequentially: the <slot /> content renders before the tail of the layout.
const scripts: string[] = [];

export function addPageScript(html: string): void {
	if (!scripts.includes(html)) {
		scripts.push(html);
	}
}

/** Returns the collected snippets and clears the buffer (called once per page, in BaseLayout). */
export function drainPageScripts(): string[] {
	const out = [...scripts];
	scripts.length = 0;
	return out;
}
