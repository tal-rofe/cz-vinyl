module.exports = {
	'{src,tests}/**/*.{ts,tsx}': 'eslint --fix',
	'**/*.{ts,tsx,scss,js,json}': 'prettier --write',
	'src/**/*.{ts,tsx}': 'jest --bail --findRelatedTests',
};
