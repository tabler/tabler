// Replicates the Eleventy Liquid `date` filter under `timezoneOffset: 0`
// (shared/e11ty/config.mjs). Two quirks matter for parity:
//  - `%s` (Unix seconds) is shifted by the local timezone offset, so it is NOT
//    the true epoch (LiquidJS renders the wall clock, then reads its seconds).
//  - `%B %d, %Y` uses the UTC wall-clock components of the original timestamp.
// Both are reproduced against the reference build on the same machine/timezone.
const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];

/** Equivalent of `{{ date | date: '%s' }}` with timezoneOffset: 0. */
export function liquidUnixSeconds(date: Date): number {
	return Math.floor(date.getTime() / 1000) + date.getTimezoneOffset() * 60;
}

/** Equivalent of `{{ date | date: '%B %d, %Y' }}` with timezoneOffset: 0. */
export function liquidLongDate(date: Date): string {
	return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, '0')}, ${date.getUTCFullYear()}`;
}
