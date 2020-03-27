const dotenv = require('dotenv').config({
	path: __dirname + '/.env.production',
})
const webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common')

module.exports = () => {
	return merge(common, {
		mode: 'production',
		output: {
			filename: '[name].[chunkhash:8].js',
		},
		devtool: 'source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(dotenv.parsed),
			}),
		],
		optimization: {
			minimizer: [
				new TerserPlugin({
					// View details about TerserPlugin configs at:
					// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
					terserOptions: {
						parse: {
							ecma: 8,
						},
						compress: {
							ecma: 5,
							warnings: false,
							comparisons: false,
							inline: 2,
						},
						mangle: {
							safari10: true,
						},
						keep_classnames: true,
						keep_fnames: true,
						output: {
							ecma: 5,
							comments: false,
							ascii_only: true,
						},
					},
					sourceMap: true,
				}),
				new OptimizeCSSAssetsPlugin(),
			],
			splitChunks: {
				cacheGroups: {
					default: false,
					vendors: false,
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all',
					},
				},
			},
		},
	})
}
