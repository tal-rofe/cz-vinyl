import { expect } from 'vitest';
import { diffString } from 'json-diff';
import { diff } from 'deep-object-diff';

/**
 * @author tal-rofe
 * * This extends the behavior of "expect" and allows to compare (weakly) two objects
 * * By "weakly" we mean that all keys and values are equal but order isn't important
 */
expect.extend({
	toWeakEqual(received: object, expected: object) {
		const { isNot } = this;

		return {
			pass: Object.keys(diff(received, expected)).length === 0,
			message: () =>
				isNot
					? 'Expected Json inputs to differ.'
					: `Expected Json inputs to equal. Json difference:\n${diffString(received, expected)}`,
		};
	},
});
