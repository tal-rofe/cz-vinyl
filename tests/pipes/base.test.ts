import { parseToBoolean } from '@/pipes/base';

describe('[pipes/base]', () => {
	it('parseToBoolean | should return "undefined" for all invalid inputs', () => {
		const result1 = parseToBoolean(true);
		const result2 = parseToBoolean(1);
		const result3 = parseToBoolean([]);
		const result4 = parseToBoolean({});

		expect(result1 === undefined).toEqual(true);
		expect(result2 === undefined).toEqual(true);
		expect(result3 === undefined).toEqual(true);
		expect(result4 === undefined).toEqual(true);
	});

	it('parseToBoolean | should return proper outputs for valid inputs', () => {
		const result1 = parseToBoolean('true');
		const result2 = parseToBoolean('false');

		expect(result1).toEqual(true);
		expect(result2).toEqual(false);
	});
});
