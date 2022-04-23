import { formatIssues, formatHeader, formatBreakingChange } from '@/pipes/commit-format';

describe('[pipes/commit-format]', () => {
	it('formatIssues | Function should return empty output when there is empty input', () => {
		const result = formatIssues('');

		expect(result === '').toEqual(true);
	});

	it('formatIssues | Function should return "Closes" output when there are no issues in input', () => {
		const result = formatIssues('JUST A TEST');

		expect(result === 'Closes').toEqual(true);
	});

	it('formatIssues | Function should return proper output when there are issues in input', () => {
		const result = formatIssues('JUST A TEST #1 #2 #4#55');

		expect(result === 'Closes #1, closes #2, closes #4, closes #55').toEqual(true);
	});

	it('formatHeader | Function should return proper output for all possible options', () => {
		const result1 = formatHeader(
			'{type}: {emoji} [{ticket_id}] {subject}',
			'typeTest',
			'scopeTest',
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

	it('formatBreakingChange | Function should return empty output when the input is empty', () => {
		const result = formatBreakingChange('');

		expect(result === '').toEqual(true);
	});

	it('formatBreakingChange | Function should return proper output when there is non-empty breaking change input', () => {
		const breakingChangeInput = 'JUST A TEST';
		const result = formatBreakingChange(breakingChangeInput);

		expect(result === `BREAKING CHANGE: ${breakingChangeInput}`).toEqual(true);
	});
});
