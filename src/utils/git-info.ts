import simpleGit from 'simple-git';

/**
 * The function returns the ticket Id, is presents, in the branch name
 * @returns ticket Id
 */
export const getTicketIdFromBranchName = async (ticketRegex: RegExp) => {
	const git = simpleGit();

	try {
		const localBranches = await git.branchLocal();
		const currentBranch = localBranches.current;
		const currentBranchTicketMatches = currentBranch.match(ticketRegex);

		if (currentBranchTicketMatches) {
			return currentBranchTicketMatches[0];
		}

		return null;
	} catch {
		return null;
	}
};
