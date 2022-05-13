module.exports = {
	'{src,tests}/**/*.ts': ['eslint --fix', () => 'tsc --noEmit'],
	'**/*.{ts,js,json,yaml}': 'prettier --write',
	'src/**/*.ts': 'vitest related -c vite.config.ts',
	'**/*': 'inflint -c inflint.config.ts',
};
