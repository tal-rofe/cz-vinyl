import fuse from 'fuse.js';

import type { AiResult } from '@/interfaces/ai-result';

import { transformCommitType } from '../pipes/commit-type';
import OpenAiService from '../services/open-ai/open-ai.service';
import type { FinalConfiguration } from '../types/final-configuration';
import { getTicketIdFromBranchName, shouldValidateTicketId } from './git-info';

/**
 * The function returns the questions for commitizen according to given configuration
 * @param configuration the configuration to use to build the questions
 * @returns questions
 */
export const getQuestions = async (configuration: FinalConfiguration) => {
	let aiCommitDataPromise: Promise<AiResult> | null = null;

	if (configuration.openAiToken) {
		const openAiApi = new OpenAiService(
			configuration.openAiToken,
			configuration.subjectMaxLength,
			configuration.skipBody,
		);

		aiCommitDataPromise = openAiApi.generateCommitData();
	}

	const subjectQuestionDefaultFunction = async () => {
		if (!aiCommitDataPromise) {
			return undefined;
		}

		const aiCommitData = await aiCommitDataPromise;

		return aiCommitData?.subject;
	};

	const bodyQuestionDefaultFunction = async () => {
		if (!aiCommitDataPromise) {
			return undefined;
		}

		const aiCommitData = await aiCommitDataPromise;

		return aiCommitData?.body;
	};

	const defaultCommitTypes = configuration.commitTypes.map(transformCommitType);
	const isScopesListsMode = Array.isArray(configuration.scopes) && configuration.scopes.length > 0;

	const commitTypesFuse = new fuse(configuration.commitTypes, {
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: ['value', 'emoji', 'description'],
	});

	const scopesFuse = new fuse(configuration.scopes, {
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
	});

	const shouldValidateTicket = await shouldValidateTicketId(configuration.allowEmptyTicketIdForBranches);

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
			type: isScopesListsMode ? 'autocomplete' : 'input',
			name: 'scope',
			when: !configuration.skipScope,
			message: configuration.scopeQuestion,
			source: (_: unknown, query: string) =>
				Promise.resolve(
					query
						? scopesFuse.search(query).map((match) => ({ name: match.item, value: match.item }))
						: configuration.scopes,
				),
		},
		{
			type: 'input',
			name: 'ticket_id',
			when: !configuration.skipTicketId,
			message: configuration.ticketIdQuestion,
			default: shouldValidateTicket
				? await getTicketIdFromBranchName(new RegExp(configuration.ticketIdRegex))
				: undefined,
			validate: (input: string) => {
				if (!shouldValidateTicket) {
					return true;
				}

				return new RegExp(configuration.ticketIdRegex).test(input) || 'Ticket Id must be valid';
			},
		},
		{
			type: 'maxlength-input',
			name: 'subject',
			default: aiCommitDataPromise ? subjectQuestionDefaultFunction : undefined,
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
			when: !configuration.skipBody,
			default: aiCommitDataPromise ? bodyQuestionDefaultFunction : undefined,
			message: configuration.bodyQuestion,
		},
		{
			type: 'input',
			name: 'breakingBody',
			when: !configuration.skipBreakingChanges,
			message:
				'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
		},
		{
			type: 'input',
			name: 'issues',
			when: !configuration.skipIssues,
			message: configuration.issuesQuestion,
		},
	];
};
