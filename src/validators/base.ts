/**
 * The function validates a given number
 * @param input the input to validate
 * @returns the input if valid, otherwise undefined
 */
export const validatePositiveInt = (input: unknown) => {
	if (typeof input !== 'number' || !Number.isSafeInteger(input) || input < 0) {
		return;
	}

	return Math.round(input);
};

/**
 * The function validates a given string
 * @param input the input to validate
 * @returns the input if valid, otherwise undefined
 */
export const validateString = (input: unknown) => {
	return input && typeof input === 'string' ? input : undefined;
};

/**
 * The function validates a given boolean
 * @param input the input to validate
 * @returns the input if valid, otherwise undefined
 */
export const validateBoolean = (input: unknown) => {
	return typeof input === 'boolean' ? input : undefined;
};
