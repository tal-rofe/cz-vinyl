export interface PromptAnswers {
	readonly type: Readonly<{
		type: string;
		emoji?: string;
	}>;
	readonly scope?: string;
	readonly ticket_id?: string;
	readonly subject: string;
	readonly body?: string;
	readonly breakingBody?: string;
	readonly issues?: string;
}
