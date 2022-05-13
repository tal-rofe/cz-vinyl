import { describe, it, expect } from 'vitest';

import { validateCommitTypes } from '@/validators/commit-type';

describe('[validators/commit-type]', () => {
	it('validateCommitTypes | should return "undefined" for all invalid inputs', () => {
		const result1 = validateCommitTypes('');
		const result2 = validateCommitTypes(true);
		const result3 = validateCommitTypes(Infinity);
		const result4 = validateCommitTypes(-5);
		const result5 = validateCommitTypes({});

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
		expect(result5 === undefined).toEqual(true);
	});

	it('validateCommitTypes | should return proper outputs for valid inputs or filter out invalid inputs in the array', () => {
		const item1 = '';
		const item2 = 5;

		const item3 = {
			value: '',
			description: 'DUMMY_DESCRIPTION',
		};

		const item4 = {
			value: 5,
			description: 'DUMMY_DESCRIPTION',
		};

		const item5 = {
			value: 'DUMMY_VALUE',
			description: '',
		};

		const item6 = {
			value: 'DUMMY_VALUE',
			description: 5,
		};

		const item7 = {
			value: 'DUMMY_VALUE',
			description: 'DUMMY_DESCRIPTION',
			emoji: '',
		};

		const item8 = {
			value: 'DUMMY_VALUE',
			description: 'DUMMY_DESCRIPTION',
			emoji: 5,
		};

		const item9 = {
			value: 'DUMMY_VALUE',
			description: 'DUMMY_DESCRIPTION',
		};

		const item10 = {
			value: 'DUMMY_VALUE',
			description: 'DUMMY_DESCRIPTION',
			emoji: 'DUMMY_EMOJI',
		};

		const result = validateCommitTypes([
			item1,
			item2,
			item3,
			item4,
			item5,
			item6,
			item7,
			item8,
			item9,
			item10,
		]);

		const expectedOutput = [item9, item10];

		expect(result).toJsonEqual(expectedOutput);
	});
});
