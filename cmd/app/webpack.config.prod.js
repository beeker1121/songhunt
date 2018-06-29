const webpack = require('webpack');

// App imports.
const config = require('./webpack.config.js');

// Set NODE_ENV environment variable to production.
config.plugins = [];
config.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	})
);

// Handle optimizations.
config.optimization = {
	minimize: true
};

module.exports = config;