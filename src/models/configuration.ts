import { IConfiguration, ICommitType } from '../interfaces/configuration';
import { TICKET_ID_REGEX } from './ticket-id';

const DEFAULT_COMMIT_TYPES: ICommitType[] = [
	{
		description: 'Build process or auxiliary tool changes',
		emoji: '🤖',
		value: 'chore',
	},
	{
		description: 'CI related changes',
		emoji: '🚀',
		value: 'ci',
	},
	{
		description: 'Documentation only changes',
		emoji: '📘',
		value: 'docs',
	},
	{
		description: 'A new feature',
		emoji: '🔥',
		value: 'feat',
	},
	{
		description: 'A bug fix',
		emoji: '🐞',
		value: 'fix',
	},
	{
		description: 'A code change that improves performance',
		emoji: '⚡',
		value: 'perf',
	},
	{
		description: 'A code change that neither fixes a bug or adds a feature',
		emoji: '💡',
		value: 'refactor',
	},
	{
		description: 'Create a release commit',
		emoji: '🔖',
		value: 'release',
	},
	{
		description: 'Markup, white-space, formatting, missing semi-colons...',
		emoji: '🎨',
		value: 'style',
	},
	{
		description: 'Adding missing tests',
		emoji: '✅',
		value: 'test',
	},
];

export const CONFIGURATION_MODULE_NAME = 'czvinyl';

export const DEFAULT_CONFIGURATION: IConfiguration = {
	headerFormat: '{type}: {emoji} [{ticket_id}] {subject}',
	commitTypes: DEFAULT_COMMIT_TYPES,
	maxCommitLineWidth: 72,
	typeQuestion: "Select the type of changes you're commiting:\n",
	scopeQuestion: 'Specify a scope:',
	skipScope: true,
	scopes: [],
	ticketIdQuestion: 'Type the JIRA Id (ex. V-12345):',
	skipTicketId: false,
	ticketIdRegex: TICKET_ID_REGEX,
	subjectQuestion: 'Write a short, imperative mood description of the change:\n',
	subjectMaxLength: 70,
	subjectMinLength: 3,
	bodyQuestion: 'Provide a longer description of the change:\n',
	skipBody: false,
	skipBreakingChanges: true,
	issuesQuestion: 'List any issue closed (#1, #2, ...):',
	skipIssues: true,
};
