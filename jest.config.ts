import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	collectCoverageFrom: ['src/**/*.ts'],
	coveragePathIgnorePatterns: [
		'<rootDir>/src/models',
		'<rootDir>/src/index.ts',
		'<rootDir>/src/utils/questions.ts',
	],
	errorOnDeprecated: true,
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	moduleNameMapper: {
		'^@/utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@/models/(.*)$': '<rootDir>/src/models/$1',
		'^@/interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
		'^@/pipes/(.*)$': '<rootDir>/src/pipes/$1',
		'^@/validators/(.*)$': '<rootDir>/src/validators/$1',
	},
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.spec.json',
		},
	},
	moduleDirectories: ['node_modules', '<rootDir>/'],
};

export default config;
