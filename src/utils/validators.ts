import { ICommitType, IConfiguration } from '@/models/configuration';

/**
 * The function validates a given number
 * @param input the input to validate
 * @returns the input if valid, otherwise undefined
 */
const validateInt = (input?: number) => {
	return input && Number.isSafeInteger(input) && input > -1 ? input : undefined;
};

/**
 * The function validates a given string
 * @param input the input to validate
 * @returns the input if valid, otherwise undefined
 */
const validateString = (input?: string) => {
	return input && typeof input === 'string' ? input : undefined;
};

/**
 * The function validates a given boolean
 * @param input the input to validate
 * @returns the input if valid, otherwise undefined
 */
const validateBoolean = (input?: boolean) => {
	return input && typeof input === 'boolean';
};

/**
 * The function validates a given string array
 * @param input the input to validate
 * @returns the input if valid (filtered), otherwise undefined
 */
const validateStringArray = (input?: ReadonlyArray<string>) => {
	return Array.isArray(input) ? input.filter((item) => item && typeof item === 'string') : undefined;
};

/**
 * The function parse a given string to its boolean value
 * @param input the string to parse
 * @returns the parsed value, or underfined if the input is invalid
 */
const parseStringToBoolean = (input?: string) => {
	if (!input) {
		return;
	}

	if (input === 'true') {
		return true;
	}

	if (input === 'false') {
		return false;
	}

	return;
};

/**
 * The function validates a given array of commit types
 * @param commitTypes the commit types array to validate
 * @returns the input if valid, otherwise undefined
 */
const validateCommitTypes = (commitTypes?: ICommitType[]) => {
	return Array.isArray(commitTypes) &&
		commitTypes.every(
			(commitType) =>
				commitType.value &&
				typeof commitType.value === 'string' &&
				commitType.description &&
				typeof commitType.description === 'string',
		)
		? commitTypes
		: undefined;
};

/**
 * The function validates a given configuration. Will return only valid keys from the input configuration
 * @param configuration the configuration to validate
 * @returns configuration with only valid keys
 */
export const validateConfiguration = (configuration: Partial<IConfiguration>) => {
	const finalConfiguration: Partial<IConfiguration> = {
		commitTypes: validateCommitTypes(configuration.commitTypes),
		maxCommitLineWidth: validateInt(configuration.maxCommitLineWidth),
		typeQuestion: validateString(configuration.typeQuestion),
		scopeQuestion: validateString(configuration.scopeQuestion),
		skipScope: validateBoolean(configuration.skipScope),
		scopes: validateStringArray(configuration.scopes),
		ticketIdQuestion: validateString(configuration.ticketIdQuestion),
		skipTicketId: validateBoolean(configuration.skipTicketId),
		ticketIdRegex: validateString(configuration.ticketIdRegex),
		subjectQuestion: validateString(configuration.subjectQuestion),
		subjectMaxLength: validateInt(configuration.subjectMaxLength),
		subjectMinLength: validateInt(configuration.subjectMinLength),
		bodyQuestion: validateString(configuration.bodyQuestion),
		skipBody: validateBoolean(configuration.skipBody),
		skipBreakingChanges: validateBoolean(configuration.skipBreakingChanges),
		issuesQuestion: validateString(configuration.issuesQuestion),
		skipIssues: validateBoolean(configuration.skipIssues),
	};

	Object.keys(finalConfiguration).forEach(
		(key) =>
			finalConfiguration[key as keyof IConfiguration] === undefined &&
			delete finalConfiguration[key as keyof IConfiguration],
	);

	return finalConfiguration;
};

export const validateEnvConfiguration = () => {
	let parsedCommitTypes: ICommitType[] | undefined;

	try {
		const parsedValue = JSON.parse(process.env.CZ_COMMIT_TYPES ?? '');

		parsedCommitTypes = validateCommitTypes(parsedValue);
	} catch {}

	let parsedScopes: string[] | undefined;

	try {
		const parsedValue = JSON.parse(process.env.CZ_SCOPES ?? '');

		parsedScopes = validateStringArray(parsedValue);
	} catch {}

	const envConfiguration: Partial<IConfiguration> = {
		commitTypes: parsedCommitTypes,
		maxCommitLineWidth: validateInt(parseInt(process.env.CZ_MAX_COMMIT_LINE_WIDTH ?? '')),
		typeQuestion: validateString(process.env.CZ_TYPE_QUESTION),
		scopeQuestion: validateString(process.env.CZ_SCOPE_QUESTION),
		skipScope: parseStringToBoolean(process.env.CZ_SKIP_SCOPE),
		scopes: parsedScopes,
		ticketIdQuestion: validateString(process.env.CZ_TICKET_ID_QUESTION),
		skipTicketId: parseStringToBoolean(process.env.CZ_SKIP_TICKET_ID),
		ticketIdRegex: validateString(process.env.CZ_TICKET_ID_REGEX),
		subjectQuestion: validateString(process.env.CZ_SUBJECT_QUESTION),
		subjectMaxLength: validateInt(parseInt(process.env.CZ_SUBJECT_MAX_LENGTH ?? '')),
		subjectMinLength: validateInt(parseInt(process.env.CZ_SUBJECT_MIN_LENGTH ?? '')),
		bodyQuestion: validateString(process.env.CZ_BODY_QUESTION),
		skipBody: parseStringToBoolean(process.env.CZ_SKIP_BODY),
		skipBreakingChanges: parseStringToBoolean(process.env.CZ_SKIP_BREAKING_CHANGES),
		issuesQuestion: validateString(process.env.CZ_ISSUES_QUESTION),
		skipIssues: parseStringToBoolean(process.env.CZ_SKIP_ISSUES),
	};

	Object.keys(envConfiguration).forEach(
		(key) =>
			envConfiguration[key as keyof IConfiguration] === undefined &&
			delete envConfiguration[key as keyof IConfiguration],
	);

	return envConfiguration;
};
