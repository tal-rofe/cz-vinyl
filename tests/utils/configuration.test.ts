import sinon from 'sinon';
import * as CosmiconfigUtils from 'cosmiconfig';

import { getConfiguration } from '@/utils/configuration';
import { DEFAULT_CONFIGURATION } from '@/models/configuration';

describe('[utils/configuration]', () => {
	const sandbox = sinon.createSandbox();

	afterEach(sandbox.restore);

	it('getConfiguration | Function should return the default when there is no configuration file', async () => {
		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () => Promise.resolve(null),
			clearCaches: () => {
				return;
			},
			clearLoadCache: () => {
				return;
			},
			clearSearchCache: () => {
				return;
			},
			load: () => Promise.resolve(null),
		});

		const result = await getConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(DEFAULT_CONFIGURATION)).toEqual(true);
	});

	it('getConfiguration | Function should return the default when trying to get configuration file fails', async () => {
		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: Promise.reject,
			clearCaches: () => {
				return;
			},
			clearLoadCache: () => {
				return;
			},
			clearSearchCache: () => {
				return;
			},
			load: () => Promise.resolve(null),
		});

		const result = await getConfiguration();

		expect(JSON.stringify(result) === JSON.stringify(DEFAULT_CONFIGURATION)).toEqual(true);
	});

	it('getConfiguration | Function should return the proper configuration when found configuration file', async () => {
		sandbox.stub(CosmiconfigUtils, 'cosmiconfig').returns({
			search: () =>
				Promise.resolve({
					config: { skipIssues: false },
					filepath: 'FILE_PATH_TEST',
				}),
			clearCaches: () => {
				return;
			},
			clearLoadCache: () => {
				return;
			},
			clearSearchCache: () => {
				return;
			},
			load: () => Promise.resolve(null),
		});

		const result = await getConfiguration();

		const expectedOutput = {
			...DEFAULT_CONFIGURATION,
			skipIssues: false,
		};

		expect(JSON.stringify(result) === JSON.stringify(expectedOutput)).toEqual(true);
	});
});
