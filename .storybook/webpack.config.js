const { resolve } = require('path')

module.exports =  {
		resolve: {
			alias: {
				'@material-ui/core': '@material-ui/core/es',
				'@src': resolve(__dirname, '../src'),
				'@views': resolve(__dirname, '../src/views'),
				'@components': resolve(__dirname, '../src/components'),
				'@views_components': resolve(__dirname, '../src/views/components'),
			},
			modules: ['node_modules', resolve(__dirname, '../src')],
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
					test: /\.mdx$/,
					use: ['babel-loader', '@mdx-js/loader'],
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
		
}
