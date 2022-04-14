/**
 * The function remove "undefined" fields from the object
 * @param input the object to clean
 * @returns void
 */
export const cleanObject = (input: Record<string | number | symbol, unknown>) => {
	Object.keys(input).forEach((key) => input[key] === undefined && delete input[key]);
};
