import { transformCommitType } from '@/pipes/commit-type';

describe('[utils/commit-type]', () => {
	it('transformCommitType | Function should return proper outputs for all possible inputs', () => {
		const input1 = {
			value: 'valueTest',
			description: 'descriptionTest',
			emoji: 'emojiTest',
		};

		const input2 = {
			value: 'valueTest',
			description: 'descriptionTest',
		};

		const result1 = transformCommitType(input1);
		const result2 = transformCommitType(input2);

		const expectedOutput1 = {
			name: 'emojiTest valueTest: descriptionTest',
			value: {
				type: 'valueTest',
				emoji: 'emojiTest',
			},
		};

		const expectedOutput2 = {
			name: 'valueTest: descriptionTest',
			value: {
				type: 'valueTest',
			},
		};

		expect(JSON.stringify(result1) === JSON.stringify(expectedOutput1)).toEqual(true);
		expect(JSON.stringify(result2) === JSON.stringify(expectedOutput2)).toEqual(true);
	});
});
