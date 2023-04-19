import { describe, it, expect } from 'vitest';

import { formatIssues, formatHeader, formatBreakingChange, formatBody } from '@/pipes/commit-format';

describe.concurrent('[pipes/commit-format]', () => {
	describe.concurrent('formatIssues()', () => {
		it('should return "Closes" output when there are no issues in input', () => {
			const result = formatIssues('JUST A TEST');

			expect(result === 'Closes').toEqual(true);
		});

		it('should return proper output when there are issues in input', () => {
			const result = formatIssues('JUST A TEST #1 #2 #4#55');

			expect(result === 'Closes #1, closes #2, closes #4, closes #55').toEqual(true);
		});
	});

	describe('formatHeader()', () => {
		it('should return proper output for all possible options', () => {
			const result1 = formatHeader(
				'{type}: {emoji} [{ticket_id}] {scope} {subject}',
				'typeTest',
				undefined,
				'emojiTest',
				'ticketIdTest',
				'subjectTest',
			);

			const result2 = formatHeader(
				'{type}: {emoji} [{ticket_id}] {subject}',
				'typeTest',
				'',
				'emojiTest',
				'ticketIdTest',
				'subjectTest',
			);

			const result3 = formatHeader(
				'{type}: {emoji} [{ticket_id}] {subject}',
				'typeTest',
				'',
				'',
				'ticketIdTest',
				'subjectTest',
			);

			const result4 = formatHeader(
				'{type}: {emoji} [{ticket_id}] {subject}',
				'typeTest',
				'',
				'',
				'',
				'subjectTest',
			);

			expect(result1 === 'typeTest(scopeTest): emojiTest [ticketIdTest] subjectTest');
			expect(result2 === 'typeTest: emojiTest [ticketIdTest] subjectTest');
			expect(result3 === 'typeTest: [ticketIdTest] subjectTest');
			expect(result4 === 'typeTest: subjectTest');
		});
	});

	describe('formatBody()', () => {
		it('should return proper output for all possible options', () => {
			const result1 = formatBody(
				'Type is: {type}. Ticket Id is: [{ticket_id}]. Body: {body}. From scope: {scope}',
				'typeTest',
				'scopeTest',
				'ticketIdTest',
				'bodyTest',
			);

			const result2 = formatBody(
				'{type} {body} {scope} {ticket_id}',
				'typeTest',
				undefined,
				undefined,
				undefined,
			);

			expect(
				result1 ===
					'Type is: typeTest. Ticket Id is: [ticketIdTest]. Body: bodyTest. From scope: scopeTest',
			);
			expect(result2 === 'typeTest');
		});
	});

	describe('formatBreakingChange()', () => {
		it('should return proper output when there is non-empty breaking change input', () => {
			const breakingChangeInput = 'JUST A TEST';
			const result = formatBreakingChange(breakingChangeInput);

			expect(result === `BREAKING CHANGE: ${breakingChangeInput}`).toEqual(true);
		});
	});
});
