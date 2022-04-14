import fuse from 'fuse.js';

import { IConfiguration } from '@/models/configuration';
import { transformCommitType } from './commit-type';
import { getTicketIdFromBranchName } from './git-info';

/**
 * The function returns the questions for commitizen according to given configuration
 * @param configuration the configuration to use to build the questions
 * @returns questions
 */
export const getQuestions = async (configuration: IConfiguration) => {
	const defaultCommitTypes = configuration.commitTypes.map(transformCommitType);

	const commitTypesFuse = new fuse(configuration.commitTypes, {
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: ['value', 'emoji', 'description'],
	});

	return [
		{
			type: 'autocomplete',
			name: 'type',
			message: configuration.typeQuestion,
			source: (_: unknown, query: string) =>
				Promise.resolve(
					query
						? commitTypesFuse.search(query).map((match) => transformCommitType(match.item))
						: defaultCommitTypes,
				),
		},
		{
			type: Array.isArray(configuration.scopes) && configuration.scopes.length > 0 ? 'list' : 'input',
			name: 'scope',
			message: configuration.scopeQuestion,
			choices:
				Array.isArray(configuration.scopes) && configuration.scopes.length > 0
					? configuration.scopes
					: null,
			when: !configuration.skipScope,
		},
		{
			type: 'input',
			name: 'ticket_id',
			message: configuration.ticketIdQuestion,
			default: await getTicketIdFromBranchName(new RegExp(configuration.ticketIdRegex)),
			validate: (input: string) =>
				new RegExp(configuration.ticketIdRegex).test(input) || 'Ticket Id must be valid',
			when: !configuration.skipTicketId,
		},
		{
			type: 'maxlength-input',
			name: 'subject',
			message: configuration.subjectQuestion,
			maxLength: configuration.subjectMaxLength,
			filter: (input: string) => {
				let subject = input.trim();

				subject = input.trim();

				while (subject.endsWith('.')) {
					subject = subject.substring(0, subject.length - 1).trim();
				}

				return subject;
			},
			validate: (input: string) =>
				input.length >= configuration.subjectMinLength ||
				`The subject must have at least ${configuration.subjectMinLength} characters`,
		},
		{
			type: 'input',
			name: 'body',
			message: configuration.bodyQuestion,
			when: !configuration.skipBody,
		},
		{
			type: 'input',
			name: 'breakingBody',
			message:
				'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
			when: !configuration.skipBreakingChanges,
		},
		{
			type: 'input',
			name: 'issues',
			message: configuration.issuesQuestion,
			when: !configuration.skipIssues,
		},
	];
};
