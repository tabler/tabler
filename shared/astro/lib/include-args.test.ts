import { describe, expect, it } from 'vitest';
import { includeArgCount } from './include-args';

describe('includeArgCount', () => {
	const keys = ['a', 'b', 'c'] as const;

	it('counts only the keys present with a defined value', () => {
		expect(includeArgCount({ a: 1, b: undefined, c: 'x' }, keys)).toBe(2);
	});

	it('returns 0 when no keys are present', () => {
		expect(includeArgCount({}, keys)).toBe(0);
	});

	it('counts falsy-but-defined values (0, "", false) as present', () => {
		expect(includeArgCount({ a: 0, b: '', c: false }, keys)).toBe(3);
	});
});
