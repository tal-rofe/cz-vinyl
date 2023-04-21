export const getSystemMessage = (
	subjectMaxLength: number,
	skipBody: boolean,
) => `You are to act as the author of a commit message in git. Your mission is to create clean and comprehensive commit messages and explain why a change was done. I'll send you an output of 'git diff --staged' command, and you convert it into a commit message.
This commit message must not be longer than ${subjectMaxLength} characters.
${
	!skipBody
		? 'Add a short description of WHY the changes are done after the commit message. Don\'t start it with "This commit", just describe the changes.'
		: "Don't add any descriptions to the commit, only commit message."
}
Use the present tense. Lines must not be longer than 74 characters. Use English to answer.`;

export const getAssistantMessage = (skipBody: boolean) => {
	const subject = 'add support for process.env.PORT environment variable';

	const body =
		'The port variable is now named PORT, which improves consistency with the naming conventions as PORT is a constant. Support for an environment variable allows the application to be more flexible as it can now run on any available port specified via the process.env.PORT environment variable.';

	if (skipBody) {
		return subject;
	}

	return `${subject}\n${body}`;
};
