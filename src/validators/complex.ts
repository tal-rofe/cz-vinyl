/**
 * The function validates a given string array
 * @param input the input to validate
 * @returns the input if valid (filtered), otherwise undefined
 */
export const validateStringArray = (input: unknown) => {
	return Array.isArray(input) ? input.filter((item) => item && typeof item === 'string') : undefined;
};

/**
 * The function validate a given regex
 * @param input the regex to validate
 * @returns the input if valid, otherwise undefined
 */
export const validateRegex = (input: unknown) => {
	if (!input || typeof input !== 'string') {
		return;
	}

	try {
		new RegExp(input);

		return input;
	} catch {
		return;
	}
};
