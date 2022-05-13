import { describe, it, expect } from 'vitest';

import { validatePositiveInt, validateString, validateBoolean } from '@/validators/base';

describe('[validators/base]', () => {
	it('validatePositiveInt | should return "undefined" for all invalid inputs', () => {
		const result1 = validatePositiveInt('');
		const result2 = validatePositiveInt(true);
		const result3 = validatePositiveInt(Infinity);
		const result4 = validatePositiveInt(-5);
		const result5 = validatePositiveInt([]);
		const result6 = validatePositiveInt({});
		const result7 = validatePositiveInt(5.6);

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
		expect(result5 === undefined).toEqual(true);
		expect(result6 === undefined).toEqual(true);
		expect(result7 === undefined).toEqual(true);
	});

	it('validatePositiveInt | should return proper output for valid input', () => {
		const result = validatePositiveInt(5);

		expect(result).toEqual(5);
	});

	it('validateString | should return "undefined" for all invalid inputs', () => {
		const result1 = validateString('');
		const result2 = validateString(true);
		const result3 = validateString(-5);
		const result4 = validateString([]);
		const result5 = validateString({});

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
		expect(result5 === undefined).toEqual(true);
	});

	it('validateString | should return proper output for valid input', () => {
		const input = 'JUST A TEST';
		const result = validateString(input);

		expect(result === input).toEqual(true);
	});

	it('validateBoolean | should return "undefined" for all invalid inputs', () => {
		const result1 = validateBoolean('');
		const result2 = validateBoolean('true');
		const result3 = validateBoolean(0);
		const result4 = validateBoolean([]);
		const result5 = validateBoolean({});

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
		expect(result5 === undefined).toEqual(true);
	});

	it('validateBoolean | should return proper output for valid input', () => {
		const result = validateBoolean(true);

		expect(result).toEqual(true);
	});
});
