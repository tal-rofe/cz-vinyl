import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths({ projects: ['tsconfig.spec.json'] })],
	test: {
		include: ['tests/**/*.spec.ts'],
		setupFiles: './vitest.setup.ts',
		coverage: {
			'100': true,
			'skipFull': true,
			'provider': 'v8',
		},
	},
});
