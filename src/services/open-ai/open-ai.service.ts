import {
	Configuration as OpenAiConfiguration,
	OpenAIApi,
	ChatCompletionRequestMessageRoleEnum,
	type ChatCompletionRequestMessage,
} from 'openai';

import { getStagedFilesDiff } from '@/utils/git-info';
import AiResponseSchema from '@/models/ai-response';

import { getAssistantMessage, getSystemMessage } from './utils/message';
import { USER_MESSAGE } from './constants/message';

class OpenAiService {
	private openAiApi: OpenAIApi;
	private subjectMaxLength: number;
	private skipBody: boolean;

	constructor(token: string, subjectMaxLength: number, skipBody: boolean) {
		const configuration = new OpenAiConfiguration({ apiKey: token });

		this.openAiApi = new OpenAIApi(configuration);

		this.subjectMaxLength = subjectMaxLength;
		this.skipBody = skipBody;
	}

	private async getPromptMessages() {
		const systemMessage = getSystemMessage(this.subjectMaxLength, this.skipBody);
		const assistantMessage = getAssistantMessage(this.skipBody);
		const stagedDiff = await getStagedFilesDiff();

		const messages: ChatCompletionRequestMessage[] = [
			{
				role: ChatCompletionRequestMessageRoleEnum.System,
				content: systemMessage,
			},
			{
				role: ChatCompletionRequestMessageRoleEnum.User,
				content: USER_MESSAGE,
			},
			{
				role: ChatCompletionRequestMessageRoleEnum.Assistant,
				content: assistantMessage,
			},
			{
				role: ChatCompletionRequestMessageRoleEnum.User,
				content: stagedDiff,
			},
		];

		return messages;
	}

	public async generateCommitData() {
		try {
			const messages = await this.getPromptMessages();

			const { data } = await this.openAiApi.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages,
				temperature: 0,
				top_p: 0.1,
				max_tokens: 196,
			});

			if (data.choices.length === 0) {
				return null;
			}

			const responseMessage = data.choices[0]!.message?.content;

			if (!responseMessage) {
				return null;
			}

			const parseResult = await AiResponseSchema.parseAsync(JSON.parse(responseMessage));

			return parseResult;
		} catch {
			return null;
		}
	}
}

export default OpenAiService;
