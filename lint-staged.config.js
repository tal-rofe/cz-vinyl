module.exports = {
	'{src,tests}/**/*.ts': 'eslint --fix',
	'**/*.{ts,js,json,yaml}': 'prettier --write',
	'src/**/*.ts': 'jest -c jest.config.ts --bail --findRelatedTests',
	'**/*': 'inflint -c inflint.config.ts',
};
