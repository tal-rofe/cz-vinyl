module.exports = {
	'{src,tests}/**/*.ts': 'eslint --fix',
	'**/*.{ts,js,json}': 'prettier --write',
	'src/**/*.ts': 'jest --bail --findRelatedTests',
};
