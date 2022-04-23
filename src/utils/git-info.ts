import { asyncExec } from './os';

/**
 * The function returns the current branch name
 * @returns branch name
 */
const getBranchName = async () => {
	const gitCommand = 'git rev-parse --abbrev-ref HEAD';
	const branchName = await asyncExec(gitCommand);

	return branchName;
};

/**
 * The function returns the ticket Id, if presents, in the branch name, or null if not
 * @returns ticket Id
 */
export const getTicketIdFromBranchName = async (ticketRegex: RegExp) => {
	try {
		const branchName = await getBranchName();
		const currentBranchTicketMatches = branchName.match(ticketRegex);

		if (currentBranchTicketMatches) {
			return currentBranchTicketMatches[0];
		}

		return null;
	} catch {
		return null;
	}
};
