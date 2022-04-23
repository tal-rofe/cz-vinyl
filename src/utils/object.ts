/**
 * The function remove "undefined" fields from the object
 * @param input the object to clean
 * @returns void
 */
export const withCleanObject = <T extends object>(input: T) => {
	const obj = { ...input };

	Object.keys(obj).forEach((key) => obj[key as keyof T] === undefined && delete obj[key as keyof T]);

	return obj;
};
