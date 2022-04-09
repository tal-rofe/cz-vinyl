/**
 * The function receives the issues input and formats it into the commit message
 * @param issues the issues input
 * @returns the formatted issues
 */
export const formatIssues = (issues: string) => {
	const issuesInCommit = issues ? 'Closes ' + (issues.match(/#\d+/g) || []).join(', closes ') : '';

	return issuesInCommit.trim();
};

/**
 * The function receives the relevant inputs fro the header and format those to the commit message
 * @param type type of the commit
 * @param scope scope of the commit
 * @param emoji emoji of the commit
 * @param ticketId ticket Id of the commit
 * @param subject subject of the commit
 * @returns the formatted header
 */
export const formatHeader = (
	type: string,
	scope: string,
	emoji: string,
	ticketId: string,
	subject: string,
) => {
	const scopeInHeader = `${scope ? `(${scope})` : ''}`;
	const ticketIdInHeader = `${ticketId ? `[${ticketId}]` : ''}`;

	const commitHeader = `${type}${scopeInHeader}: ${emoji || ''} ${ticketIdInHeader} ${subject}`
		.replace(/\s{2,}/g, ' ')
		.trim();

	return commitHeader;
};

/**
 * The function receives the breaking change input and formats it into the commit message
 * @param breakingChange the breaking change input
 * @returns the formatted breaking change
 */
export const formatBreakingChange = (breakingChange: string) => {
	const breakingChangesInCommit = `${breakingChange ? `BREAKING CHANGE: ${breakingChange}` : ''}`;

	return breakingChangesInCommit;
};
