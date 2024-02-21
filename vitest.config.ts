import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths({ projects: ['tsconfig.spec.json'] })],
	test: {
		include: ['tests/**/*.spec.ts'],
		setupFiles: './vitest.setup.ts',
		coverage: {
			thresholds: { '100': true },
			skipFull: true,
			provider: 'v8',
			include: ['./src/**/*'],
		},
	},
});
