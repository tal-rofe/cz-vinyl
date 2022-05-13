import { expect } from 'vitest';
import { diffString } from 'json-diff';

expect.extend({
	toJsonEqual(received: unknown, expected: unknown) {
		const { isNot, equals } = this;

		return {
			pass: equals(JSON.stringify(received), JSON.stringify(expected)),
			message: () =>
				isNot
					? 'Expected Json inputs to differ.'
					: `Expected Json inputs to equal. Json difference:\n${diffString(received, expected)}`,
		};
	},
});
