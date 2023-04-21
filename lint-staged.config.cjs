const lintStagedConfig = {
	'{src,tests}/**/*.ts': ['eslint --fix', () => 'tsc --noEmit'],
	'**/*.{ts,js,json,yaml}': 'prettier --write',
	'**/*': ['inflint -c ./inflint.config.cjs', 'cspell lint -c ./cspell.json --no-progress --no-summary'],
	'src/**/*': 'vitest related --run',
};

module.exports = lintStagedConfig;
