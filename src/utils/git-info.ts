import { asyncExec } from './os';

/**
 * The function returns the current branch name
 * @returns branch name
 */
const getBranchName = async () => {
	const gitCommand = 'git rev-parse --abbrev-ref HEAD';
	const { stdout: branchName, stderr } = await asyncExec(gitCommand);

	if (stderr) {
		throw new Error(stderr);
	}

	return branchName.trim();
};

/**
 * The function returns the ticket ID, if presents, in the branch name, or null if not
 * @returns ticket ID
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

/**
 * The function returns whether a validation for ticket ID is required
 * @param excludedBranches excluded branches to allow empty ticket ID
 * @returns indicator flag - whether to validate ticket ID
 */
export const shouldValidateTicketId = async (excludedBranches: string[]) => {
	let branchName: string;

	try {
		branchName = await getBranchName();
	} catch {
		return false;
	}

	return !excludedBranches.includes(branchName);
};
