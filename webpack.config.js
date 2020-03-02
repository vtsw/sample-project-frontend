/**
 * TODO:
 * - Optimize split chunk, vendor, common, minify js by using terser-webpack-plugin
 * - Config ApolloGraphQL (done), Unit & Integration test
 * - Setup project structure (done)
 *
 */

const { resolve } = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = ({ mode, analyze }) => {
	const isEnvDevelopment = mode === 'development'
	const isEnvProduction = mode === 'production'
	let minimizer = []
	let plugins = [
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
	]

	if (isEnvProduction) {
		minimizer.push(new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin())
	}

	if (analyze) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	return {
		mode,
		context: resolve(__dirname, 'src'),
		entry: {
			app: './index.js',
		},
		output: {
			path: resolve(__dirname, 'dist'),
			filename: '[name].[chunkhash:8].js',
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
				{
					test: /\.(scss|css)$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
			inline: true,
		},
		devtool: isEnvProduction ? 'source-map' : 'eval-cheap-source-map',
		plugins,
		optimization: {
			minimize: isEnvProduction, //true by default in production mode
			minimizer,
			splitChunks: {
				cacheGroups: {
					default: false,
					vendors: false,
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: false,
						chunks: 'all',
					},
				},
			},
		},
	}
}
