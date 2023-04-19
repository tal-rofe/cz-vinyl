import StringTemplate from 'string-template';

/**
 * The function receives the issues input and formats it into the commit message
 * @param issues the issues input
 * @returns the formatted issues
 */
export const formatIssues = (issues: string) => {
	const issuesInCommit = 'Closes ' + (issues.match(/#\d+/g) || []).join(', closes ');

	return issuesInCommit.trim();
};

/**
 * The function receives the relevant inputs for the header and formats those to the commit message
 * @param format format of the header
 * @param type type of the commit
 * @param scope scope of the commit
 * @param emoji emoji of the commit
 * @param ticketId ticket Id of the commit
 * @param subject subject of the commit
 * @returns the formatted header
 */
export const formatHeader = (
	format: string,
	type: string,
	scope: string | undefined,
	emoji: string | undefined,
	ticketId: string | undefined,
	subject: string,
) => {
	if (!scope && format.includes('{scope}')) {
		format = format.replace('{scope}', '');
	}

	if (!emoji && format.includes('{emoji}')) {
		format = format.replace('{emoji}', '');
	}

	if (!ticketId && format.includes('{ticket_id}')) {
		format = format.replace('[{ticket_id}]', '');
		format = format.replace('{ticket_id}', '');
	}

	const commitHeader = StringTemplate(format, {
		type,
		scope,
		emoji,
		ticket_id: ticketId,
		subject,
	})
		.replace(/\s{2,}/g, ' ')
		.trim();

	return commitHeader;
};

/**
 * The function receives the relevant inputs for the body and formats those to the commit message
 * @param format format of the body
 * @param type type of the commit
 * @param scope scope of the commit
 * @param ticketId ticket Id of the commit
 * @param body body of the commit
 * @returns the formatted body
 */
export const formatBody = (
	format: string,
	type: string,
	scope: string | undefined,
	ticketId: string | undefined,
	body: string | undefined,
) => {
	if (!scope && format.includes('{scope}')) {
		format = format.replace('{scope}', '');
	}

	if (!body && format.includes('{body}')) {
		format = format.replace('{body}', '');
	}

	if (!ticketId && format.includes('{ticket_id}')) {
		format = format.replace('[{ticket_id}]', '');
		format = format.replace('{ticket_id}', '');
	}

	const commitBody = StringTemplate(format, {
		type,
		scope,
		ticket_id: ticketId,
		body,
	})
		.replace(/\s{2,}/g, ' ')
		.trim();

	return commitBody;
};

/**
 * The function receives the breaking change input and formats it into the commit message
 * @param breakingChange the breaking change input
 * @returns the formatted breaking change
 */
export const formatBreakingChange = (breakingChange: string) => `BREAKING CHANGE: ${breakingChange}`;
