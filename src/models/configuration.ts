import { z } from 'zod';

const ConfigurationSchema = z
	.object({
		headerFormat: z.union([z.string(), z.function().returns(z.string())], {
			invalid_type_error:
				'"headerFormat" configuration key must be a string or function(must return string)',
		}),
		bodyFormat: z.union([z.string(), z.function().returns(z.string())], {
			invalid_type_error:
				'"bodyFormat" configuration key must be a string or function(must return string)',
		}),
		commitTypes: z.array(
			z.object({
				value: z.string(),
				description: z.string(),
				emoji: z.string().emoji().optional(),
			}),
			{
				invalid_type_error:
					'"commitTypes" configuration key must be an array with object(s) matching the commit type schema',
			},
		),
		maxCommitLineWidth: z.number({
			invalid_type_error: '"maxCommitLineWidth" configuration key must be a number',
		}),
		typeQuestion: z.string({ invalid_type_error: '"typeQuestion" configuration key must be a string' }),
		scopeQuestion: z.string({ invalid_type_error: '"scopeQuestion" configuration key must be a string' }),
		skipScope: z.boolean({ invalid_type_error: '"skipScope" configuration key must be a boolean' }),
		scopes: z.array(z.string(), {
			invalid_type_error: '"scopes" configuration key must be an array of strings',
		}),
		ticketIdQuestion: z.string({
			invalid_type_error: '"ticketIdQuestion" configuration key must be a string',
		}),
		skipTicketId: z.boolean({ invalid_type_error: '"skipTicketId" configuration key must be a boolean' }),
		ticketIdRegex: z.string({ invalid_type_error: '"ticketIdRegex" configuration key must be a string' }),
		allowEmptyTicketIdForBranches: z.array(z.string(), {
			invalid_type_error:
				'"allowEmptyTicketIdForBranches" configuration key must a an array of strings',
		}),
		subjectQuestion: z.string({
			invalid_type_error: '"subjectQuestion" configuration key must be a string',
		}),
		subjectMaxLength: z.number({
			invalid_type_error: '"subjectMaxLength" configuration key must be a number',
		}),
		subjectMinLength: z.number({
			invalid_type_error: '"subjectMinLength" configuration key must be a number',
		}),
		bodyQuestion: z.string({ invalid_type_error: '"bodyQuestion" configuration key must be a string' }),
		skipBody: z.boolean({ invalid_type_error: '"skipBody" configuration key must be a boolean' }),
		skipBreakingChanges: z.boolean({
			invalid_type_error: '"skipBreakingChanges" configuration key must be a boolean',
		}),
		issuesQuestion: z.string({
			invalid_type_error: '"issuesQuestion" configuration key must be a string',
		}),
		skipIssues: z.boolean({ invalid_type_error: '"skipIssues" configuration key must be a boolean' }),
	})
	.partial();

export default ConfigurationSchema;
