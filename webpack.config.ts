import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

const packageJsonData = await fs.readFile('package.json', 'utf8');
const packageJsonObject = JSON.parse(packageJsonData);
const version = packageJsonObject.version;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configuration: webpack.Configuration = {
	context: __dirname,
	mode: 'production',
	target: 'node',
	entry: './src/index.ts',
	// * https://stackoverflow.com/questions/48673408/should-javascript-npm-packages-be-minified
	optimization: { minimize: false },
	externals: [
		nodeExternals({
			modulesDir: path.join(__dirname, 'node_modules'),
			importType: (moduleName) => `import ${moduleName}`,
		}),
	],
	experiments: { outputModule: true },
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: { configFile: 'tsconfig.build.json' },
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new WebpackShellPluginNext({
			onBuildStart: {
				scripts: ['rimraf dist'],
				blocking: true,
			},
			safe: true,
		}),
		new webpack.DefinePlugin({
			__PACKAGE_VERSION__: JSON.stringify(version),
		}),
	],
	resolve: {
		extensions: ['.ts'],
		plugins: [
			new TsconfigPathsPlugin({
				// * Need "base" file and not "paths" because the "base" contains the "baseUrl" key
				configFile: './tsconfig.base.json',
				extensions: ['.ts'],
			}),
		],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		library: { type: 'module' },
		chunkFormat: 'module',
	},
};

export default configuration;
