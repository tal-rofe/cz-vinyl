import { cosmiconfig } from 'cosmiconfig';
import TypeScriptLoader from 'cosmiconfig-typescript-loader';

import { DEFAULT_CONFIGURATION } from '../constants/configuration';
import { CONFIGURATION_MODULE_NAME, SEARCH_PLACES } from '../constants/cosmiconfig';
import ConfigurationSchema from '../models/configuration';
import { formatEnvSchemaError, formatSchemaError } from '../pipes/schema-error';
import LoggerService from '../services/logger.service';
import EnvConfigurationSchema from '../models/env-configuration';
import { envToCamelCase } from '../pipes/env-format';

/**
 * The function sets a default configuration to work with,
 * and tries reading user's configuration file and environment variables
 * @returns The final configuration
 */
export const getConfiguration = async () => {
	let finalConfiguration = DEFAULT_CONFIGURATION;

	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME, {
		searchPlaces: SEARCH_PLACES,
		loaders: {
			'.ts': TypeScriptLoader(),
		},
	});

	try {
		const result = await explorer.search();

		if (result && !result.isEmpty && typeof result.config === 'object') {
			const parseResult = await ConfigurationSchema.safeParseAsync(result.config);

			if (!parseResult.success) {
				const schemaErrorMessage = formatSchemaError(parseResult.error.issues);

				LoggerService.error(schemaErrorMessage);

				process.exit(1);
			}

			finalConfiguration = {
				...finalConfiguration,
				...parseResult.data,
			};
		}
	} catch {}

	const parseResult = await EnvConfigurationSchema.safeParseAsync(process.env);

	if (!parseResult.success) {
		const schemaErrorMessage = formatEnvSchemaError(parseResult.error.issues);

		LoggerService.error(schemaErrorMessage);

		process.exit(1);
	}

	const envConfiguration = envToCamelCase(parseResult.data);

	finalConfiguration = {
		...finalConfiguration,
		...envConfiguration,
	};

	return finalConfiguration;
};
