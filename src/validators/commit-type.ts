import type { ICommitType } from '../interfaces/configuration';
import type { IUnknownRecord } from '../interfaces/unknown-record';

/**
 * The function validates a commit type
 * @param commitType the commit type to validate
 * @returns a boolean flag indicates the validity of the commit type
 */
const validateCommitType = (commitType: unknown) => {
	if (!commitType || typeof commitType !== 'object') {
		return false;
	}

	const cType = commitType as IUnknownRecord;
	const value = cType['value'];
	const description = cType['description'];
	const emoji = cType['emoji'];

	if (
		!value ||
		typeof value !== 'string' ||
		!description ||
		typeof description !== 'string' ||
		(emoji !== undefined && (!emoji || typeof emoji !== 'string'))
	) {
		return false;
	}

	return true;
};

/**
 * The function validates a given array of commit types
 * @param commitTypes the commit types array to validate
 * @returns the input if valid, otherwise undefined
 */
export const validateCommitTypes = (commitTypes: unknown) => {
	if (!Array.isArray(commitTypes)) {
		return undefined;
	}

	return commitTypes.filter(validateCommitType) as ICommitType[];
};
