import type { ZodIssue } from 'zod';

export const formatSchemaError = (issues: ZodIssue[]) => {
	return issues.reduce<string>((finalErrorMessage, issue) => {
		const configurationFieldPath = issue.path.join('.');
		const currentErrorMessage = `(cz-vinyl) Error from configuration field "${configurationFieldPath}": ${issue.message}`;

		return `${finalErrorMessage}\n${currentErrorMessage}`;
	}, '');
};

export const formatEnvSchemaError = (issues: ZodIssue[]) => {
	return issues.reduce<string>((finalErrorMessage, issue) => {
		const configurationFieldPath = issue.path.join('.');
		const currentErrorMessage = `(cz-vinyl) Error from env configuration "${configurationFieldPath}": ${issue.message}`;

		return `${finalErrorMessage}\n${currentErrorMessage}`;
	}, '');
};
