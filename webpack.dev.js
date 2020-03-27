const dotenv = require('dotenv').config({
	path: __dirname + '/.env.dev',
})
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = () => {
	return merge(common, {
		mode: 'development',
		output: {
			filename: '[name].[hash:8].js',
		},
		devServer: {
			hot: true,
		},
		devtool: 'eval-cheap-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(dotenv.parsed),
			}),
		],
	})
}
