export interface CommitType {
	value: string;
	description: string;
	emoji?: string;
}

export type Config = Partial<{
	headerFormat: string;
	commitTypes: CommitType[];
	maxCommitLineWidth: number;
	typeQuestion: string;
	scopeQuestion: string;
	skipScope: boolean;
	scopes: Array<string>;
	ticketIdQuestion: string;
	skipTicketId: boolean;
	ticketIdRegex: string;
	subjectQuestion: string;
	subjectMaxLength: number;
	subjectMinLength: number;
	bodyQuestion: string;
	skipBody: boolean;
	skipBreakingChanges: boolean;
	issuesQuestion: string;
	skipIssues: boolean;
}>;
