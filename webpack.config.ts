import path from 'path';

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const configuration: webpack.Configuration = {
	mode: 'production',
	target: 'node',
	entry: './src/index.ts',
	externals: [
		nodeExternals({
			modulesDir: path.resolve(__dirname, 'node_modules'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: 'tsconfig.build.json',
				extensions: ['.ts'],
			}),
		],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs',
	},
};

export default configuration;
