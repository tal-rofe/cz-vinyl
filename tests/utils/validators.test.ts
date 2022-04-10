import sinon from 'sinon';

import { validateConfiguration, validateEnvConfiguration } from '@/utils/validators';

describe('[utils/validators]', () => {
	const sandbox = sinon.createSandbox();

	afterEach(sandbox.restore);

	it('validateConfiguration | Function should return empty object when got empty object as input', () => {
		const result = validateConfiguration({});

		expect(JSON.stringify(result) === JSON.stringify({})).toEqual(true);
	});

	// ! - Note that the object's order is important
	it('validateConfiguration | Function should return proper object when got valid object as input', () => {
		const configObject = {
			commitTypes: [{ value: 'a', description: 'b' }],
			maxCommitLineWidth: 5,
			scopes: ['JUST A TEST1', 'JUST A TEST2'],
			bodyQuestion: 'JUST A TEST',
			skipBody: true,
		};

		const result = validateConfiguration(configObject);

		expect(JSON.stringify(result) === JSON.stringify(configObject)).toEqual(true);
	});

	it('validateEnvConfiguration | Function should return an empty object when there are no relevant environment variables', () => {
		sandbox.stub(process, 'env').value({});

		const result = validateEnvConfiguration();

		expect(JSON.stringify(result) === JSON.stringify({})).toEqual(true);
	});

	it('validateEnvConfiguration | Function should return an empty object when a known envirnoment variables types are invalid', () => {
		sandbox.stub(process, 'env').value({
			CZ_SKIP_ISSUES: 'JUST A TEST',
			CZ_SUBJECT_MAX_LENGTH: 'JUST A TEST',
			CZ_SCOPES: 'JUST A TEST',
			CZ_COMMIT_TYPES: 'JUST A TEST',
		});

		const result = validateEnvConfiguration();

		expect(JSON.stringify(result) === JSON.stringify({})).toEqual(true);
	});

	// ! - Note that the object's order is important
	it('validateEnvConfiguration | Function should return a proper object when a known envirnoment variables types are valid', () => {
		const expectedOutput = {
			commitTypes: [{ value: 'X', description: 'Y' }],
			scopes: ['JUST A TEST'],
			subjectMaxLength: 5,
			skipIssues: true,
		};

		sandbox.stub(process, 'env').value({
			CZ_SKIP_ISSUES: 'true',
			CZ_SUBJECT_MAX_LENGTH: '5',
			CZ_SCOPES: '["JUST A TEST"]',
			CZ_COMMIT_TYPES: '[{ "value": "X", "description": "Y" }]',
		});

		const result = validateEnvConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});

	// ! - Note that the object's order is important
	it('validateEnvConfiguration | Function should return a proper object when a known envirnoment variables types are valid', () => {
		const expectedOutput = {
			commitTypes: [{ value: 'X', description: 'Y' }],
			maxCommitLineWidth: 5,
			scopes: ['JUST A TEST'],
			subjectMaxLength: 5,
			subjectMinLength: 10,
			skipIssues: false,
		};

		sandbox.stub(process, 'env').value({
			CZ_SKIP_ISSUES: 'false',
			CZ_MAX_COMMIT_LINE_WIDTH: '5',
			CZ_SUBJECT_MAX_LENGTH: '5',
			CZ_SUBJECT_MIN_LENGTH: '10',
			CZ_SCOPES: '["JUST A TEST"]',
			CZ_COMMIT_TYPES: '[{ "value": "X", "description": "Y" }]',
		});

		const result = validateEnvConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});
});
