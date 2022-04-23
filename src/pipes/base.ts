/**
 * The function parse a given input to its boolean value
 * @param input the input to parse
 * @returns the parsed value, or underfined if the input is invalid
 */
export const parseToBoolean = (input: unknown) => {
	if (input === 'true') {
		return true;
	}

	if (input === 'false') {
		return false;
	}

	return;
};
