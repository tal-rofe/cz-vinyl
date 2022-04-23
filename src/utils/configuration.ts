import { cosmiconfig } from 'cosmiconfig';

import { CONFIGURATION_MODULE_NAME, DEFAULT_CONFIGURATION } from '../models/configuration';
import type { IConfiguration } from '../interfaces/configuration';
import { validateConfiguration, validateEnvConfiguration } from '../validators/configuration';

/**
 * The function sets a default configuration to work with,
 * and tries reading user's configuration file and environment variables
 * @returns The final configuration
 */
export const getConfiguration = async () => {
	let finalConfiguration: IConfiguration = DEFAULT_CONFIGURATION;

	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME);

	try {
		const result = await explorer.search();

		let configurationFromFile: Partial<IConfiguration>;

		if (!result || result.isEmpty || typeof result.config !== 'object') {
			configurationFromFile = {};
		} else {
			configurationFromFile = validateConfiguration(result.config);
		}

		finalConfiguration = {
			...finalConfiguration,
			...configurationFromFile,
		};
	} catch {}

	const configurationFromENVs = validateEnvConfiguration();

	finalConfiguration = {
		...finalConfiguration,
		...configurationFromENVs,
	};

	return finalConfiguration;
};
