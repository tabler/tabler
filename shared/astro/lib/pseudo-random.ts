// Deterministic pseudo-random values seeded by a loop index, used to generate
// stable-looking demo data (numbers, dates, "time ago" labels) without a real RNG.

export function randomNumber(x: number, min = 0, max = 100, round = 0): number {
	let value =
		((x * x * Math.PI * Math.E * (max + 1) * (Math.sin(x) / Math.cos(x * x))) % (max + 1 - min)) + min;

	value = value > max ? max : value;
	value = value < min ? min : value;

	if (round !== 0) {
		value = parseFloat(value.toFixed(round));
	} else {
		value = Math.floor(value);
	}

	return value;
}

export function randomDate(x: number): Date {
	const start = new Date('2024-01-01').getTime() / 1000;
	const end = new Date('2024-12-30').getTime() / 1000;

	return new Date(randomNumber(x, start, end) * 1000);
}

export function randomItem<T>(x: number, items: T[]): T {
	return items[randomNumber(x, 0, items.length - 1)];
}

/** A date up to `maxDays` days ago, formatted as "now" / "N day(s) ago". */
export function timeagoLabel(index: number, maxDays: number): string {
	const days = randomNumber(index, 0, maxDays);
	if (days === 0) return 'now';
	return `${days} day${days > 1 ? 's' : ''} ago`;
}
