import { describe, it, expect, afterEach, vi } from 'vitest';
import { cosmiconfig } from 'cosmiconfig';

import { getConfiguration } from '@/utils/configuration';
import { DEFAULT_CONFIGURATION } from '@/constants/configuration';
import { validateConfiguration, validateEnvConfiguration } from '@/validators/configuration';

vi.mock('cosmiconfig');
vi.mock('@/validators/configuration');

const cosmiconfigFunctions = {
	clearCaches: () => undefined,
	clearLoadCache: () => undefined,
	clearSearchCache: () => undefined,
	load: () => Promise.resolve(null),
};

describe('[utils/configuration]', () => {
	describe('getConfiguration()', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('should return the default when there is no configuration file', async () => {
			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: () => Promise.resolve(null),
				...cosmiconfigFunctions,
			});

			const result = await getConfiguration();

			expect(result).toWeakEqual(DEFAULT_CONFIGURATION);
		});

		it('should return the default when configuration file is empty', async () => {
			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: () =>
					Promise.resolve({
						config: {},
						filepath: 'FILE_PATH_TEST',
						isEmpty: true,
					}),
				...cosmiconfigFunctions,
			});

			const result = await getConfiguration();

			expect(result).toWeakEqual(DEFAULT_CONFIGURATION);
		});

		it('should return the default when trying to get configuration file fails', async () => {
			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: Promise.reject,
				...cosmiconfigFunctions,
			});

			const result = await getConfiguration();

			expect(result).toWeakEqual(DEFAULT_CONFIGURATION);
		});

		it('should return the proper configuration when found configuration file', async () => {
			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: () =>
					Promise.resolve({
						config: { skipIssues: false },
						filepath: 'FILE_PATH_TEST',
						isEmpty: false,
					}),
				...cosmiconfigFunctions,
			});

			const result = await getConfiguration();

			const expectedOutput = {
				...DEFAULT_CONFIGURATION,
				skipIssues: false,
			};

			expect(result).toWeakEqual(expectedOutput);
		});

		it('should return the proper configuration when known environments variables are not set', async () => {
			const configurationFromFile = {
				skipIssues: false,
			};

			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: () =>
					Promise.resolve({
						config: configurationFromFile,
						filepath: 'FILE_PATH_TEST',
						isEmpty: false,
					}),
				...cosmiconfigFunctions,
			});

			const result = await getConfiguration();

			const expectedOutput = {
				...DEFAULT_CONFIGURATION,
				...configurationFromFile,
			};

			expect(result).toWeakEqual(expectedOutput);
		});

		it('should return the proper configuration when there are no configurations from fule returns an empty object and known environments variables are set', async () => {
			const configurationFromENVs = {
				skipIssues: false,
			};

			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: () =>
					Promise.resolve({
						config: {},
						filepath: 'FILE_PATH_TEST',
						isEmpty: true,
					}),
				...cosmiconfigFunctions,
			});
			vi.mocked(validateConfiguration).mockReturnValueOnce({});
			vi.mocked(validateEnvConfiguration).mockReturnValueOnce(configurationFromENVs);

			const result = await getConfiguration();

			const expectedOutput = {
				...DEFAULT_CONFIGURATION,
				...configurationFromENVs,
			};

			expect(result).toWeakEqual(expectedOutput);
		});

		it('should return the proper configuration when environment variables are set with same keys from configuration file (ENVs has priority)', async () => {
			const configurationFromFile = {
				skipIssues: true,
			};

			const configurationFromENVs = {
				skipIssues: false,
			};

			vi.mocked(cosmiconfig).mockReturnValueOnce({
				search: () =>
					Promise.resolve({
						config: configurationFromFile,
						filepath: 'FILE_PATH_TEST',
						isEmpty: false,
					}),
				...cosmiconfigFunctions,
			});
			vi.mocked(validateConfiguration).mockReturnValueOnce(configurationFromFile);
			vi.mocked(validateEnvConfiguration).mockReturnValueOnce(configurationFromENVs);

			const result = await getConfiguration();

			const expectedOutput = {
				...DEFAULT_CONFIGURATION,
				...configurationFromENVs,
			};

			expect(result).toWeakEqual(expectedOutput);
		});
	});
});
