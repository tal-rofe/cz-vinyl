import { cosmiconfig } from 'cosmiconfig';
import TypeScriptLoader from 'cosmiconfig-typescript-loader';

import { DEFAULT_CONFIGURATION } from '../constants/configuration';
import type { IConfiguration } from '../interfaces/configuration';
import { validateConfiguration, validateEnvConfiguration } from '../validators/configuration';
import { CONFIGURATION_MODULE_NAME, SEARCH_PLACES } from '../constants/cosmiconfig';

/**
 * The function sets a default configuration to work with,
 * and tries reading user's configuration file and environment variables
 * @returns The final configuration
 */
export const getConfiguration = async () => {
	let finalConfiguration: IConfiguration = DEFAULT_CONFIGURATION;

	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME, {
		searchPlaces: SEARCH_PLACES,
		loaders: {
			'.ts': TypeScriptLoader(),
		},
	});

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
