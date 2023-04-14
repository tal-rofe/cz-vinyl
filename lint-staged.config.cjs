const lintStagedConfig = {
	'{src,tests}/**/*.ts': ['eslint --fix', () => 'tsc --noEmit'],
	'**/*.{ts,js,json,yaml}': 'prettier --write',
	'**/*': 'inflint -c ./inflint.config.cjs',
};

module.exports = lintStagedConfig;
