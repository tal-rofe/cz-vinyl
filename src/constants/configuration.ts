import type { FinalConfiguration } from '../types/final-configuration';
import { DEFAULT_COMMIT_TYPES } from './commit-type';
import { TICKET_ID_REGEX } from './ticket-id';

export const DEFAULT_CONFIGURATION: FinalConfiguration = {
	headerFormat: '{type}: {emoji} [{ticket_id}] {subject}',
	bodyFormat: '{body}',
	commitTypes: DEFAULT_COMMIT_TYPES,
	maxCommitLineWidth: 72,
	typeQuestion: "Select the type of changes you're committing:\n",
	scopeQuestion: 'Specify a scope:',
	skipScope: true,
	scopes: [],
	ticketIdQuestion: 'Type the JIRA Id (ex. V-12345):',
	skipTicketId: false,
	ticketIdRegex: TICKET_ID_REGEX,
	allowEmptyTicketIdForBranches: [],
	subjectQuestion: 'Write a short, imperative mood description of the change:\n',
	subjectMaxLength: 70,
	subjectMinLength: 3,
	bodyQuestion: 'Provide a longer description of the change:\n',
	skipBody: false,
	skipBreakingChanges: true,
	issuesQuestion: 'List any issue closed (#1, #2, ...):',
	skipIssues: true,
};
