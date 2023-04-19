import type { z } from 'zod';

import type ConfigurationSchema from '../models/configuration';

const stringToCamelCase = (value: string) =>
	value
		.toLowerCase()
		.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

export const envToCamelCase = (env: Record<string, unknown>) => {
	return Object.keys(env).reduce<z.infer<typeof ConfigurationSchema>>((finalObj, envKey) => {
		return {
			...finalObj,
			[stringToCamelCase(envKey.replace('CZ_', ''))]: env[envKey],
		};
	}, {});
};
