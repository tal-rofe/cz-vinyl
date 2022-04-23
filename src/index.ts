import { Inquirer } from 'inquirer';
import InquirerAutoComplete from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';
import wrap from 'word-wrap';

import { getConfiguration } from './utils/configuration';
import { formatHeader, formatIssues, formatBreakingChange } from './pipes/commit-format';
import { getQuestions } from './utils/questions';
import { ICommitFunc } from './interfaces/commit';

const prompter = (cz: Inquirer, commit: ICommitFunc) => {
	cz.prompt.registerPrompt('autocomplete', InquirerAutoComplete);
	cz.prompt.registerPrompt('maxlength-input', InquirerMaxLength);

	// ! - There is an open issue for using "then" rather than "await": https://github.com/commitizen/cz-cli/issues/926
	getConfiguration().then(async (configuration) => {
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
	});
};

const InqObj = { prompter };

export * from './interfaces/configuration';

export default InqObj;
