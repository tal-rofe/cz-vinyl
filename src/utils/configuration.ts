import { cosmiconfig } from 'cosmiconfig';

import { CONFIGURATION_MODULE_NAME, DEFAULT_CONFIGURATION, IConfiguration } from '@/models/configuration';

/**
 * The function sets a default configuration to work with and tries reading user's configuration file
 * @returns The final configuration
 */
export const getConfiguration = async () => {
	let finalConfiguration: IConfiguration = DEFAULT_CONFIGURATION;

	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME);

	try {
		const result = await explorer.search();

		if (result !== null) {
			finalConfiguration = { ...finalConfiguration, ...result.config };
		}
	} catch {}

	return finalConfiguration;
};
