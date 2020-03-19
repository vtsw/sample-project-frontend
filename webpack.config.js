const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
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
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(dotenv.parsed),
		}),
		new CleanWebpackPlugin(),
	]

	if (isEnvProduction) {
		minimizer.push(
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
			new OptimizeCSSAssetsPlugin()
		)
	}

	if (isEnvDevelopment) {
		plugins.push(new webpack.HotModuleReplacementPlugin())
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
			filename: isEnvProduction
				? '[name].[chunkhash:8].js'
				: '[name].[hash:8].js',
			publicPath: '/',
		},
		resolve: {
			alias: {
				'@material-ui/core': '@material-ui/core/es',
				'@src': resolve(__dirname, 'src'),
				'@views': resolve(__dirname, 'src/views'),
				'@components': resolve(__dirname, 'src/components'),
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
			hot: true,
			proxy: {
				'/mygraphql': 'http://172.76.10.161:4000/graphql',
			},
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
						name: 'vendor',
						chunks: 'all',
					},
				},
			},
		},
	}
}
