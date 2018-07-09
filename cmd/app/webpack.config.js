const webpack = require('webpack');

const config = {
	context: __dirname,
	entry: '../../frontend/app/index.js',
	output: {
		path: __dirname + '/dist/public/js',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				// We do not have to use 'use' here, since we are only loading
				// a single loader. 'use' would be for an array of loaders.
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							// Target build for browsers.
							targets: {browsers: ['last 2 versions']}
						}],
						'react'
					],
					plugins: ['transform-object-rest-spread']
				}
			}, {
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					}, {
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]__[hash:base64:5]'
						}
					}
				]
			}
		]
	},
	plugins: []
};

config.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			'SCHEME': JSON.stringify(process.env.SCHEME),
			'HOST': JSON.stringify(process.env.HOST)
		}
	})
);

module.exports = config;