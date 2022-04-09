import { Inquirer } from 'inquirer';
import InquirerAutoComplete from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';
import fuse from 'fuse.js';
import wrap from 'word-wrap';

import { getConfiguration } from '@/utils/configuration';
import { transformCommitType } from '@/utils/commit-type';
import { getTicketIdFromBranchName } from '@/utils/git-info';
import { formatHeader, formatIssues, formatBreakingChange } from '@/utils/commit-format';

type Commit = (commitMessage: string) => void;

const prompter = async (cz: Inquirer, commit: Commit) => {
	cz.prompt.registerPrompt('autocomplete', InquirerAutoComplete);
	cz.prompt.registerPrompt('maxlength-input', InquirerMaxLength);

	const configuration = await getConfiguration();

	const wrapOptions = {
		indent: '',
		trim: true,
		width: configuration.maxCommitLineWidth,
	};

	const commitTypesFuse = new fuse(configuration.commitTypes, {
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: ['value', 'emoji', 'description'],
	});

	const defaultCommitTypes = configuration.commitTypes.map(transformCommitType);

	const answers = await cz.prompt([
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
			validate: (input) =>
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
			validate: (input) =>
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
	]);

	commit(
		[
			formatHeader(
				answers.type.type,
				answers.scope,
				answers.type.emoji,
				answers.ticket_id,
				answers.subject,
			),
			wrap(answers.body || '', wrapOptions),
			wrap(formatBreakingChange(answers.breakingBody) || '', wrapOptions),
			formatIssues(answers.issues),
		]
			.filter(Boolean)
			.join('\n\n')
			.trim(),
	);
};

const InqObj = { prompter };

export default InqObj;
