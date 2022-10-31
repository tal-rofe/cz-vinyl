module.exports = {
	'{src,tests}/**/*.ts': ['eslint --fix', () => 'tsc --noEmit'],
	'**/*.{ts,js,json,yaml}': 'prettier --write',
	'**/*': 'inflint -c inflint.config.ts',
};
