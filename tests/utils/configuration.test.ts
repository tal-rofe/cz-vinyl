import sinon from 'sinon';
import * as CosmiconfigUtils from 'cosmiconfig';

import { getConfiguration } from '@/utils/configuration';
import { DEFAULT_CONFIGURATION } from '@/models/configuration';
import * as ValidatorsUtils from '@/utils/validators';

const cosmiconfigFunctions = {
	clearCaches: () => undefined,
	clearLoadCache: () => undefined,
	clearSearchCache: () => undefined,
	load: () => Promise.resolve(null),
};

describe('[utils/configuration]', () => {
	const sandbox = sinon.createSandbox();

	afterEach(sandbox.restore);

	it('getConfiguration | Function should return the default when there is no configuration file', async () => {
		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () => Promise.resolve(null),
			...cosmiconfigFunctions,
		});

		const result = await getConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(DEFAULT_CONFIGURATION)).toEqual(true);
	});

	it('getConfiguration | Function should return the default when trying to get configuration file fails', async () => {
		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: Promise.reject,
			...cosmiconfigFunctions,
		});

		const result = await getConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(DEFAULT_CONFIGURATION)).toEqual(true);
	});

	it('getConfiguration | Function should return the proper configuration when found configuration file', async () => {
		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () =>
				Promise.resolve({
					config: { skipIssues: false },
					filepath: 'FILE_PATH_TEST',
				}),
			...cosmiconfigFunctions,
		});

		const result = await getConfiguration();

		const expectedOutput = {
			...DEFAULT_CONFIGURATION,
			skipIssues: false,
		};

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});

	it('getConfiguration | Function should return the proper configuration when "validateConfigurtion" returns expected object and known environments variables are not set', async () => {
		const configurationFromFile = {
			skipIssues: false,
		};

		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () =>
				Promise.resolve({
					config: configurationFromFile,
					filepath: 'FILE_PATH_TEST',
				}),
			...cosmiconfigFunctions,
		});
		sandbox.stub(ValidatorsUtils, 'validateConfiguration').returns(configurationFromFile);
		sandbox.stub(ValidatorsUtils, 'validateEnvConfiguration').returns({});

		const result = await getConfiguration();

		const expectedOutput = {
			...DEFAULT_CONFIGURATION,
			...configurationFromFile,
		};

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});

	it('getConfiguration | Function should return the proper configuration when "validateConfigurtion" returns an empty object and known environments variables are set', async () => {
		const configurationFromENVs = {
			skipIssues: false,
		};

		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () =>
				Promise.resolve({
					config: {},
					filepath: 'FILE_PATH_TEST',
				}),
			...cosmiconfigFunctions,
		});
		sandbox.stub(ValidatorsUtils, 'validateConfiguration').returns({});
		sandbox.stub(ValidatorsUtils, 'validateEnvConfiguration').returns(configurationFromENVs);

		const result = await getConfiguration();

		const expectedOutput = {
			...DEFAULT_CONFIGURATION,
			...configurationFromENVs,
		};

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});

	it('getConfiguration | Function should return the proper configuration when environment variables are set with same keys from configuration file (ENVs has priority)', async () => {
		const configurationFromFile = {
			skipIssues: true,
		};

		const configurationFromENVs = {
			skipIssues: false,
		};

		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () =>
				Promise.resolve({
					config: configurationFromFile,
					filepath: 'FILE_PATH_TEST',
				}),
			...cosmiconfigFunctions,
		});
		sandbox.stub(ValidatorsUtils, 'validateConfiguration').returns(configurationFromFile);
		sandbox.stub(ValidatorsUtils, 'validateEnvConfiguration').returns(configurationFromENVs);

		const result = await getConfiguration();

		const expectedOutput = {
			...DEFAULT_CONFIGURATION,
			...configurationFromENVs,
		};

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});
});
