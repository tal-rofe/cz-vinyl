module.exports = {
	'{src,tests}/**/*.ts': 'eslint --fix',
	'**/*.{ts,js,json}': 'prettier --write',
	'src/**/*.ts': 'jest -c jest.config.ts --bail --findRelatedTests --coverage',
	'**/*': 'inflint -c inflint.config.js',
};
