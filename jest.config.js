const customJestConfig = {
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
	coveragePathIgnorePatterns: ['<rootDir>/src/models', '<rootDir>/src/index.ts'],
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60,
		},
	},
	moduleNameMapper: {
		'^@/utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@/models/(.*)$': '<rootDir>/src/models/$1',
	},
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleDirectories: ['node_modules', '<rootDir>/'],
};

module.exports = customJestConfig;
