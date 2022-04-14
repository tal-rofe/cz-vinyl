import { Inquirer } from 'inquirer';
import InquirerAutoComplete from 'inquirer-autocomplete-prompt';
import InquirerMaxLength from 'inquirer-maxlength-input-prompt';
import wrap from 'word-wrap';

import { getConfiguration } from '@/utils/configuration';
import { formatHeader, formatIssues, formatBreakingChange } from '@/utils/commit-format';
import { getQuestions } from './utils/questions';

type Commit = (commitMessage: string) => void;

const prompter = async (cz: Inquirer, commit: Commit) => {
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

export default InqObj;
