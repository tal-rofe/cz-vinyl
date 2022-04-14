import { cleanObject } from '@/utils/object';

describe('[utils/object]', () => {
	it('cleanObject | Function should remove nothing if the input has no "undefined" fields', () => {
		const input = {
			test: 'test',
		};

		cleanObject(input);

		const expectedObject = {
			test: 'test',
		};

		expect(JSON.stringify(expectedObject) === JSON.stringify(input)).toEqual(true);
	});

	it('cleanObject | Function should remove "undefined" fields', () => {
		const input = {
			test: undefined,
		};

		cleanObject(input);

		const expectedObject = {};

		expect(JSON.stringify(expectedObject) === JSON.stringify(input)).toEqual(true);
	});
});
