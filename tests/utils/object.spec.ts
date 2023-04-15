import { describe, it, expect } from 'vitest';

import { withCleanObject } from '@/utils/object';

describe('[utils/object]', () => {
	it('withCleanObject | Function should remove nothing if the input has no "undefined" fields', () => {
		const input = {
			test: 'test',
		};

		const result = withCleanObject(input);

		expect(result).toWeakEqual(input);
	});

	it('withCleanObject | Function should remove "undefined" fields', () => {
		const input = {
			test: undefined,
		};

		const result = withCleanObject(input);

		const expectedObject = {};

		expect(result).toWeakEqual(expectedObject);
	});
});
