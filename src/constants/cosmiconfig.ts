import os from 'node:os';
import path from 'node:path';

export const CONFIGURATION_MODULE_NAME = 'czvinyl';

export const SEARCH_PLACES = [
	'package.json',
	`.${CONFIGURATION_MODULE_NAME}rc`,
	`.${CONFIGURATION_MODULE_NAME}rc.json`,
	`.${CONFIGURATION_MODULE_NAME}rc.yaml`,
	`.${CONFIGURATION_MODULE_NAME}rc.yml`,
	`.${CONFIGURATION_MODULE_NAME}rc.js`,
	`.${CONFIGURATION_MODULE_NAME}rc.cjs`,
	`${CONFIGURATION_MODULE_NAME}.config.js`,
	`${CONFIGURATION_MODULE_NAME}.config.cjs`,
	`${CONFIGURATION_MODULE_NAME}.config.ts`,

	path.join(os.homedir(), 'package.json'),
	path.join(os.homedir(), `.${CONFIGURATION_MODULE_NAME}rc`),
	path.join(os.homedir(), `.${CONFIGURATION_MODULE_NAME}rc.json`),
	path.join(os.homedir(), `.${CONFIGURATION_MODULE_NAME}rc.yaml`),
	path.join(os.homedir(), `.${CONFIGURATION_MODULE_NAME}rc.yml`),
	path.join(os.homedir(), `.${CONFIGURATION_MODULE_NAME}rc.js`),
	path.join(os.homedir(), `.${CONFIGURATION_MODULE_NAME}rc.cjs`),
	path.join(os.homedir(), `${CONFIGURATION_MODULE_NAME}.config.js`),
	path.join(os.homedir(), `${CONFIGURATION_MODULE_NAME}.config.cjs`),
];
