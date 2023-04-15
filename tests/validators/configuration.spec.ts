import { describe, it, expect, vi, beforeEach } from 'vitest';

import { validateConfiguration, validateEnvConfiguration } from '@/validators/configuration';

describe('[validators/configuration]', () => {
	beforeEach(() => {
		vi.stubEnv('CZ_HEADER_FORMAT', 'JUST A TEST');
		vi.stubEnv('CZ_SKIP_ISSUES', 'JUST A TEST');
		vi.stubEnv('CZ_SUBJECT_MAX_LENGTH', 'JUST A TEST');
		vi.stubEnv('CZ_SCOPES', '["SCOPE"]');
		vi.stubEnv('CZ_COMMIT_TYPES', '[]');
		vi.stubEnv('CZ_SUBJECT_MIN_LENGTH', '5');
		vi.stubEnv('CZ_MAX_COMMIT_LINE_WIDTH', '5');
		vi.stubEnv('CZ_ALLOW_EMPTY_TICKET_ID_FOR_BRANCHES', '["TEST"]');
	});

	it('validateConfiguration | should return object with all the valid-only fields', () => {
		const input = {
			headerFormat: 'DUMMY_HEADER_FORMAT',
			skipIssues: 'DUMMY_SKIP_ISSUES',
		};

		const expectedOutput = {
			headerFormat: 'DUMMY_HEADER_FORMAT',
		};

		const result = validateConfiguration(input);

		expect(result).toWeakEqual(expectedOutput);
	});

	it('validateEnvConfiguration | should return object with all the valid-only fields', () => {
		const expectedOutput = {
			headerFormat: 'JUST A TEST',
			commitTypes: [],
			maxCommitLineWidth: 5,
			scopes: ['SCOPE'],
			subjectMinLength: 5,
			allowEmptyTicketIdForBranches: ['TEST'],
		};

		const result = validateEnvConfiguration();

		expect(result).toWeakEqual(expectedOutput);
	});

	it('validateEnvConfiguration | should return object with all the valid-only fields when env "CZ_SCOPES" is invalid', () => {
		vi.stubEnv('CZ_SCOPES', '{');

		const expectedOutputWithInvalidEnv = {
			headerFormat: 'JUST A TEST',
			commitTypes: [],
			maxCommitLineWidth: 5,
			subjectMinLength: 5,
			allowEmptyTicketIdForBranches: ['TEST'],
		};

		const resultWithInvalidEnv = validateEnvConfiguration();

		expect(expectedOutputWithInvalidEnv).toWeakEqual(resultWithInvalidEnv);
	});

	it('validateEnvConfiguration | should return object with all the valid-only fields when env "CZ_ALLOW_EMPTY_TICKET_ID_FOR_BRANCHES" is invalid', () => {
		vi.stubEnv('CZ_ALLOW_EMPTY_TICKET_ID_FOR_BRANCHES', '{');

		const expectedOutputWithInvalidEnv = {
			headerFormat: 'JUST A TEST',
			commitTypes: [],
			maxCommitLineWidth: 5,
			scopes: ['SCOPE'],
			subjectMinLength: 5,
		};

		const resultWithInvalidEnv = validateEnvConfiguration();

		expect(expectedOutputWithInvalidEnv).toWeakEqual(resultWithInvalidEnv);
	});
});
