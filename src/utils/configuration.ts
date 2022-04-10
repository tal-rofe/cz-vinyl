import { cosmiconfig } from 'cosmiconfig';

import { CONFIGURATION_MODULE_NAME, DEFAULT_CONFIGURATION, IConfiguration } from '@/models/configuration';
import { validateConfiguration, validateEnvConfiguration } from '@/utils/validators';

/**
 * The function sets a default configuration to work with and tries reading user's configuration file and environment variables
 * @returns The final configuration
 */
export const getConfiguration = async () => {
	let finalConfiguration: IConfiguration = DEFAULT_CONFIGURATION;

	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME);

	try {
		const result = await explorer.search();

		const configurationFromFile =
			result?.config && typeof result?.config === 'object' ? validateConfiguration(result.config) : {};

		if (result !== null) {
			finalConfiguration = {
				...finalConfiguration,
				...configurationFromFile,
			};
		}
	} catch {}

	const configurationFromENVs = validateEnvConfiguration();

	finalConfiguration = {
		...finalConfiguration,
		...configurationFromENVs,
	};

	return finalConfiguration;
};
