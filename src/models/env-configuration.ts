import { z as baseZ } from 'zod';

const z = baseZ.coerce;

const EnvConfigurationSchema = baseZ
	.object({
		CZ_HEADER_FORMAT: z.string({
			invalid_type_error: '"CZ_HEADER_FORMAT" env must be a string',
		}),
		CZ_BODY_FORMAT: z.string({
			invalid_type_error: '"CZ_BODY_FORMAT" env must be a string',
		}),
		CZ_MAX_COMMIT_LINE_WIDTH: z.number({
			invalid_type_error: '"CZ_MAX_COMMIT_LINE_WIDTH" env must be a number',
		}),
		CZ_TYPE_QUESTION: z.string({ invalid_type_error: '"CZ_TYPE_QUESTION" env must be a string' }),
		CZ_SCOPE_QUESTION: z.string({ invalid_type_error: '"CZ_SCOPE_QUESTION" env must be a string' }),
		CZ_SKIP_SCOPE: z.boolean({ invalid_type_error: '"CZ_SKIP_SCOPE" env must be a boolean' }),
		CZ_TICKET_ID_QUESTION: z.string({
			invalid_type_error: '"CZ_TICKET_ID_QUESTION" env must be a string',
		}),
		CZ_SKIP_TICKET_ID: z.boolean({
			invalid_type_error: '"CZ_SKIP_TICKET_ID" env must be a boolean',
		}),
		CZ_TICKET_ID_REGEX: z.string({ invalid_type_error: '"CZ_TICKET_ID_REGEX" env must be a string' }),
		CZ_SUBJECT_QUESTION: z.string({
			invalid_type_error: '"CZ_SUBJECT_QUESTION" env must be a string',
		}),
		CZ_SUBJECT_MAX_LENGTH: z.number({
			invalid_type_error: '"CZ_SUBJECT_MAX_LENGTH" env must be a number',
		}),
		CZ_SUBJECT_MIN_LENGTH: z.number({
			invalid_type_error: '"CZ_SUBJECT_MIN_LENGTH" env must be a number',
		}),
		CZ_BODY_QUESTION: z.string({
			invalid_type_error: '"CZ_BODY_QUESTION" env must be a string',
		}),
		CZ_SKIP_BODY: z.boolean({ invalid_type_error: '"CZ_SKIP_BODY" env must be a boolean' }),
		CZ_SKIP_BREAKING_CHANGES: z.boolean({
			invalid_type_error: '"CZ_SKIP_BREAKING_CHANGES" env must be a boolean',
		}),
		CZ_ISSUES_QUESTION: z.string({
			invalid_type_error: '"CZ_ISSUES_QUESTION" env must be a string',
		}),
		CZ_SKIP_ISSUES: z.boolean({ invalid_type_error: '"CZ_SKIP_ISSUES" env must be a boolean' }),
	})
	.partial();

export default EnvConfigurationSchema;
