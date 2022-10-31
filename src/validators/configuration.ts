import { withCleanObject } from '../utils/object';
import type { ICommitType, IConfiguration } from '../interfaces/configuration';
import type { IUnknownRecord } from '../interfaces/unknown-record';
import { parseToBoolean } from '../pipes/base';
import { validateBoolean, validatePositiveInt, validateString } from './base';
import { validateCommitTypes } from './commit-type';
import { validateRegex, validateStringArray } from './complex';

/**
 * The function validates a given configuration.
 * Will return only valid keys from the input configuration
 * @param configuration the configuration to validate
 * @returns configuration with only valid keys
 */
export const validateConfiguration = (configuration: IUnknownRecord) => {
	const finalConfiguration: Partial<IConfiguration> = {
		headerFormat: validateString(configuration['headerFormat']),
		commitTypes: validateCommitTypes(configuration['commitTypes']),
		maxCommitLineWidth: validatePositiveInt(configuration['maxCommitLineWidth']),
		typeQuestion: validateString(configuration['typeQuestion']),
		scopeQuestion: validateString(configuration['scopeQuestion']),
		skipScope: validateBoolean(configuration['skipScope']),
		scopes: validateStringArray(configuration['scopes']),
		ticketIdQuestion: validateString(configuration['ticketIdQuestion']),
		skipTicketId: validateBoolean(configuration['skipTicketId']),
		ticketIdRegex: validateRegex(configuration['ticketIdRegex']),
		allowEmptyTicketIdForBranches: validateStringArray(configuration['allowEmptyTicketIdForBranches']),
		subjectQuestion: validateString(configuration['subjectQuestion']),
		subjectMaxLength: validatePositiveInt(configuration['subjectMaxLength']),
		subjectMinLength: validatePositiveInt(configuration['subjectMinLength']),
		bodyQuestion: validateString(configuration['bodyQuestion']),
		skipBody: validateBoolean(configuration['skipBody']),
		skipBreakingChanges: validateBoolean(configuration['skipBreakingChanges']),
		issuesQuestion: validateString(configuration['issuesQuestion']),
		skipIssues: validateBoolean(configuration['skipIssues']),
	};

	return withCleanObject(finalConfiguration);
};

/**
 * The function validates the configurations from environment variables.
 * Will return only valid keys from the input configuration
 * @returns configuration with only valid keys
 */
export const validateEnvConfiguration = () => {
	let parsedCommitTypes: ICommitType[] | undefined;

	try {
		const parsedValue = JSON.parse(process.env.CZ_COMMIT_TYPES ?? '');

		parsedCommitTypes = validateCommitTypes(parsedValue);
	} catch {}

	let parsedScopes: string[] | undefined;
	let parsedExcludedBranches: string[] | undefined;

	try {
		const parsedScopesValue = JSON.parse(process.env.CZ_SCOPES ?? '');

		const parsedExcludedBranchesValue = JSON.parse(
			process.env.CZ_ALLOW_EMPTY_TICKET_ID_FOR_BRANCHES ?? '',
		);

		parsedScopes = validateStringArray(parsedScopesValue);
		parsedExcludedBranches = validateStringArray(parsedExcludedBranchesValue);
	} catch {}

	const envConfiguration: Partial<IConfiguration> = {
		headerFormat: validateString(process.env.CZ_HEADER_FORMAT),
		commitTypes: parsedCommitTypes,
		maxCommitLineWidth: validatePositiveInt(parseInt(process.env.CZ_MAX_COMMIT_LINE_WIDTH ?? '')),
		typeQuestion: validateString(process.env.CZ_TYPE_QUESTION),
		scopeQuestion: validateString(process.env.CZ_SCOPE_QUESTION),
		skipScope: parseToBoolean(process.env.CZ_SKIP_SCOPE),
		scopes: parsedScopes,
		ticketIdQuestion: validateString(process.env.CZ_TICKET_ID_QUESTION),
		skipTicketId: parseToBoolean(process.env.CZ_SKIP_TICKET_ID),
		ticketIdRegex: validateRegex(process.env.CZ_TICKET_ID_REGEX),
		allowEmptyTicketIdForBranches: parsedExcludedBranches,
		subjectQuestion: validateString(process.env.CZ_SUBJECT_QUESTION),
		subjectMaxLength: validatePositiveInt(parseInt(process.env.CZ_SUBJECT_MAX_LENGTH ?? '')),
		subjectMinLength: validatePositiveInt(parseInt(process.env.CZ_SUBJECT_MIN_LENGTH ?? '')),
		bodyQuestion: validateString(process.env.CZ_BODY_QUESTION),
		skipBody: parseToBoolean(process.env.CZ_SKIP_BODY),
		skipBreakingChanges: parseToBoolean(process.env.CZ_SKIP_BREAKING_CHANGES),
		issuesQuestion: validateString(process.env.CZ_ISSUES_QUESTION),
		skipIssues: parseToBoolean(process.env.CZ_SKIP_ISSUES),
	};

	return withCleanObject(envConfiguration);
};
