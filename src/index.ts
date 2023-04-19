import type { Inquirer } from 'inquirer';
import InquirerAutoComplete from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';
import wrap from 'word-wrap';

import { getConfiguration } from './utils/configuration';
import { formatHeader, formatIssues, formatBreakingChange, formatBody } from './pipes/commit-format';
import { getQuestions } from './utils/questions';
import type { ICommitFunc } from './interfaces/commit';
import type { PromptAnswers } from './interfaces/prompt-answers';

const prompter = async (cz: Inquirer, commit: ICommitFunc) => {
	cz.prompt.registerPrompt('autocomplete', InquirerAutoComplete);
	cz.prompt.registerPrompt('maxlength-input', InquirerMaxLength);

	const configuration = await getConfiguration();

	const wrapOptions = {
		indent: '',
		trim: true,
		width: configuration.maxCommitLineWidth,
	};

	const questions = await getQuestions(configuration);
	const answers = await cz.prompt<PromptAnswers>(questions);

	const answersForHeader = [
		answers.type.type,
		answers.scope,
		answers.type.emoji,
		answers.ticket_id,
		answers.subject,
	] as const;

	const header =
		typeof configuration.headerFormat === 'function'
			? configuration.headerFormat.call(null, ...answersForHeader)
			: formatHeader(configuration.headerFormat, ...answersForHeader);

	const answersForBody = [answers.type.type, answers.scope, answers.ticket_id, answers.body] as const;

	const body =
		typeof configuration.bodyFormat === 'function'
			? configuration.bodyFormat.call(null, ...answersForBody)
			: formatBody(configuration.bodyFormat, ...answersForBody);

	commit(
		[
			header,
			body.length > 0 ? wrap(body, wrapOptions) : false,
			answers.breakingBody ? wrap(formatBreakingChange(answers.breakingBody), wrapOptions) : false,
			answers.issues ? formatIssues(answers.issues) : false,
		]
			.filter(Boolean)
			.join('\n\n')
			.trim(),
	);
};

const InqObj = { prompter };

export * from './config';

export default InqObj;
