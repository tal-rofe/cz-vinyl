import { describe, it, expect } from 'vitest';

import { validateStringArray, validateRegex } from '@/validators/complex';

describe('[validators/complex]', () => {
	it('validateStringArray | should return "undefined" for all invalid inputs', () => {
		const result1 = validateStringArray('');
		const result2 = validateStringArray(true);
		const result3 = validateStringArray(Infinity);
		const result4 = validateStringArray(-5);
		const result5 = validateStringArray({});

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
		expect(result5 === undefined).toEqual(true);
	});

	it('validatePositiveInt | should return proper outputs for valid inputs or filter out invalid inputs in the array', () => {
		const result1 = validateStringArray(['', 5]);
		const result2 = validateStringArray(['DUMMY_TEXT']);

		expect(result1).toJsonEqual([]);
		expect(result2).toJsonEqual(['DUMMY_TEXT']);
	});

	it('validateRegex | should return "undefined" for all invalid inputs', () => {
		const result1 = validateRegex('');
		const result2 = validateRegex(true);
		const result3 = validateRegex(Infinity);
		const result4 = validateRegex(-5);
		const result5 = validateRegex({});
		const result6 = validateRegex('(');

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
		expect(result5 === undefined).toEqual(true);
		expect(result6 === undefined).toEqual(true);
	});

	it('validatePositiveInt | should return proper output for valid input', () => {
		const result = validateRegex('^.*$');

		expect(result === '^.*$').toEqual(true);
	});
});
