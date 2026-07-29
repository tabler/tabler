// String/number filters ported from shared/e11ty/filters.mjs and LiquidJS builtins.

/** Equivalent of the Liquid `capitalize` filter: uppercase first char, lowercase the rest. */
export function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** Equivalent of the Liquid `uc_first` filter: uppercase only the first char, leave the rest untouched. */
export function ucFirst(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Equivalent of the `first_letters` filter from shared/e11ty/filters.mjs. */
export function firstLetters(s: string): string {
	return (s || '').split(' ').map((w) => w.charAt(0)).join('');
}

/** Equivalent of the `format_number` filter from shared/e11ty/filters.mjs (thousands separator). */
export function formatNumber(value: number): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * LiquidJS `split` behaves like Ruby's String#split: trailing empty strings
 * are dropped (e.g. layout/header-actions/breadcrumb.html passes "Tabler,Pages,").
 */
export function rubySplit(str: string, sep: string): string[] {
	const items = str.split(sep);
	while (items.length > 0 && items[items.length - 1] === '') items.pop();
	return items;
}

/** Equivalent of the Liquid `slugify` filter for single-word inputs (lowercase only). */
export function slugifyWord(text: string): string {
	return text.toLowerCase();
}

/** Equivalent of `url | slug`: "/ui/getting-started/" -> "uigetting-started" (strip slashes, join). */
export function pathSlug(u: string): string {
	return u.split('/').filter(Boolean).join('');
}

/** Equivalent of `{% assign percentage = value | replace: '%', '' | default: 0 %}`. */
export function parsePercentage(value: number | string | undefined): string {
	return `${value ?? ''}`.split('%').join('') || '0';
}

/** Equivalent of the `miliseconds_to_minutes` filter from shared/e11ty/filters.mjs. */
export function milisecondsToMinutes(value: number): string {
	const minutes = Math.floor(value / 60000);
	const seconds = ((value % 60000) / 1000).toFixed(0);
	return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}

/** Parses a "$1,234.56"-style currency string into a plain number. */
export function parseCurrency(s: string): number {
	return parseFloat(s.replace(/[$,]/g, ''));
}

/** Equivalent of the Liquid `round: N` filter (trailing zeros dropped by number output). */
export function liquidRound(x: number, digits = 8): number {
	return parseFloat(x.toFixed(digits));
}

/** Equivalent of `items | sort: key` (LiquidJS case-sensitive string sort). */
export function liquidSortBy<T>(items: T[], key: (item: T) => string): T[] {
	return [...items].sort((a, b) => {
		const l = key(a);
		const r = key(b);
		return l < r ? -1 : l > r ? 1 : 0;
	});
}
