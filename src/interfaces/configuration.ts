export interface ICommitType {
	readonly value: string;
	readonly description: string;
	readonly emoji?: string;
}

export interface IConfiguration {
	readonly headerFormat: string;
	readonly commitTypes: ICommitType[];
	readonly maxCommitLineWidth: number;
	readonly typeQuestion: string;
	readonly scopeQuestion: string;
	readonly skipScope: boolean;
	readonly scopes: ReadonlyArray<string>;
	readonly ticketIdQuestion: string;
	readonly skipTicketId: boolean;
	readonly ticketIdRegex: string;
	readonly subjectQuestion: string;
	readonly subjectMaxLength: number;
	readonly subjectMinLength: number;
	readonly bodyQuestion: string;
	readonly skipBody: boolean;
	readonly skipBreakingChanges: boolean;
	readonly issuesQuestion: string;
	readonly skipIssues: boolean;
}
