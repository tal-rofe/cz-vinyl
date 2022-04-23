import { ICommitType } from '../interfaces/configuration';

/**
 * The function gets a commit type and transforms it into a an object dedicated for inquirier
 * @param commitType the commit type to transform
 * @returns a detailed object
 */
export const transformCommitType = (commitType: ICommitType) => {
	if (commitType.emoji) {
		return {
			name: `${commitType.emoji} ${commitType.value}: ${commitType.description}`,
			value: {
				type: commitType.value,
				emoji: commitType.emoji,
			},
		};
	}

	return {
		name: `${commitType.value}: ${commitType.description}`,
		value: { type: commitType.value },
	};
};
