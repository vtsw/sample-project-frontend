const { resolve } = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = ({ mode }) => {
	return {
		mode,
		context: resolve(__dirname, 'src'),
		entry: {
			app: './index.js',
		},
		output: {
			path: resolve(__dirname, 'dist'),
			filename: '[name].[chunkhash].js',
			publicPath: '/',
		},
		resolve: {
			alias: {
				'@src': resolve(__dirname, 'src'),
				'@pages': resolve(__dirname, 'src/pages'),
				'@components': resolve(__dirname, 'src/components'),
			},
			modules: ['node_modules', resolve(__dirname, 'src')],
			extensions: ['.js', '.jsx'],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
			],
		},
		devServer: {
			contentBase: resolve(__dirname, 'dist'),
			port: 3000,
			historyApiFallback: true,
			inline: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'CleVer',
				template: resolve('./src/index.html'),
				inject: true,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
				},
			}),
			new webpack.ProgressPlugin((percentage, message, ...args) => {
				console.log(`${(percentage * 100).toFixed()}% ${message}`, ...args)
			}),
			new CleanWebpackPlugin(),
		],
	}
}
