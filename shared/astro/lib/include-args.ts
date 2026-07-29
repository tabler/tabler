/**
 * Reproduces the LiquidJS `include['x']` meta-property bug: when a param isn't
 * explicitly passed, referencing it as a bare property (rather than a lookup)
 * falls back to the include's argument COUNT instead of undefined. Some ported
 * components (ui/spinner.html, ui/nav-segmented.html) rely on this to emit
 * "junk" classes like `spinner-border-2` / `nav-2` that the DOM parity diff
 * does not strip, so they must be reproduced verbatim.
 */
export function includeArgCount(props: Record<string, unknown>, keys: readonly string[]): number {
	return keys.filter((k) => props[k] !== undefined).length;
}
