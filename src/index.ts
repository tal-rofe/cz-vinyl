import type { Inquirer } from 'inquirer';
import InquirerAutoComplete from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';
import wrap from 'word-wrap';

import { getConfiguration } from './utils/configuration';
import { formatHeader, formatIssues, formatBreakingChange } from './pipes/commit-format';
import { getQuestions } from './utils/questions';
import type { ICommitFunc } from './interfaces/commit';

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
	const answers = await cz.prompt(questions);

	commit(
		[
			formatHeader(
				configuration.headerFormat,
				answers.type.type,
				answers.scope,
				answers.type.emoji,
				answers.ticket_id,
				answers.subject,
			),
			wrap(answers.body || '', wrapOptions),
			wrap(formatBreakingChange(answers.breakingBody) || '', wrapOptions),
			formatIssues(answers.issues),
		]
			.filter(Boolean)
			.join('\n\n')
			.trim(),
	);
};

const InqObj = { prompter };

export * from './config';

export default InqObj;
