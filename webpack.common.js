const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	context: resolve(__dirname, 'src'),
	entry: {
		app: './index.js',
	},
	output: {
		path: resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	resolve: {
		alias: {
			'@material-ui/core': '@material-ui/core/es',
			'@src': resolve(__dirname, 'src'),
			'@views': resolve(__dirname, 'src/views'),
			'@views_components': resolve(__dirname, 'src/views/components'),
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
			{
				test: /\.(scss|css)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/images/',
				},
			},
		],
	},
	devServer: {
		contentBase: resolve(__dirname, 'dist'),
		port: 3000,
		historyApiFallback: true,
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
