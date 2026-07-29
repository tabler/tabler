import { describe, expect, it } from 'vitest';
import { randomDate, randomItem, randomNumber, timeagoLabel } from './liquid-random';

describe('randomNumber', () => {
	it('is deterministic for a given index', () => {
		expect(randomNumber(5, 0, 100)).toBe(randomNumber(5, 0, 100));
	});

	it('stays within [min, max]', () => {
		for (let i = 1; i <= 50; i++) {
			const value = randomNumber(i, 10, 20);
			expect(value).toBeGreaterThanOrEqual(10);
			expect(value).toBeLessThanOrEqual(20);
		}
	});

	it('floors the result when round is 0 (the default)', () => {
		const value = randomNumber(7, 0, 100);
		expect(Number.isInteger(value)).toBe(true);
	});

	it('rounds to the given number of digits when round is set', () => {
		const value = randomNumber(7, 0, 1, 8);
		expect(value).toBe(parseFloat(value.toFixed(8)));
	});
});

describe('randomDate', () => {
	it('returns a deterministic date within the 2024 range', () => {
		const date = randomDate(3);
		expect(date.getUTCFullYear()).toBe(2024);
		expect(date).toEqual(randomDate(3));
	});
});

describe('randomItem', () => {
	it('deterministically picks one of the given items', () => {
		const items = ['a', 'b', 'c', 'd'];
		const picked = randomItem(4, items);
		expect(items).toContain(picked);
		expect(randomItem(4, items)).toBe(picked);
	});
});

describe('timeagoLabel', () => {
	it('returns "now" when the random offset is 0 days', () => {
		// index=0 -> randomNumber(0, 0, N) hits the x=0 edge case (sin/cos of 0).
		expect(timeagoLabel(0, 5)).toBe('now');
	});

	it('pluralizes "day(s) ago" based on the offset', () => {
		const label = timeagoLabel(2, 10);
		expect(label === 'now' || /^\d+ days? ago$/.test(label)).toBe(true);
	});
});
