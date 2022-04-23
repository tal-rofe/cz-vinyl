import sinon from 'sinon';

import { validateConfiguration, validateEnvConfiguration } from '@/validators/configuration';

describe('[validators/configuration]', () => {
	const sandbox = sinon.createSandbox();

	afterEach(sandbox.restore);

	it('validateConfiguration | should return object with all the valid-only fields', () => {
		const input = {
			headerFormat: 'DUMMY_HEADER_FORMAT',
			skipIssues: 'DUMMY_SKIP_ISSUES',
		};

		const expectedOutput = {
			headerFormat: 'DUMMY_HEADER_FORMAT',
		};

		const result = validateConfiguration(input);

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});

	it('validateEnvConfiguration | should return object with all the valid-only fields', () => {
		sandbox.stub(process, 'env').value({
			CZ_HEADER_FORMAT: 'JUST A TEST',
			CZ_SKIP_ISSUES: 'JUST A TEST',
			CZ_SUBJECT_MAX_LENGTH: 'JUST A TEST',
			CZ_SCOPES: '["SCOPE"]',
			CZ_COMMIT_TYPES: '[]',
			CZ_SUBJECT_MIN_LENGTH: '5',
			CZ_MAX_COMMIT_LINE_WIDTH: '5',
		});

		const expectedOutput = {
			headerFormat: 'JUST A TEST',
			commitTypes: [],
			maxCommitLineWidth: 5,
			scopes: ['SCOPE'],
			subjectMinLength: 5,
		};

		const result = validateEnvConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});
});
