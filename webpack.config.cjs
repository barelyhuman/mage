// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {DIR, EXT = 'ts'} = process.env

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: `./examples/${DIR}/src/index.${EXT}`,
	output: {
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `./examples/${DIR}/public/index.html`,
		}),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@barelyhuman/mage': `${__dirname}/source`,
		},
	},
	devServer: {
		port: process.env.PORT || '8080',
		static: {
			directory: `./examples/${DIR}/public`,
		},
		historyApiFallback: true,
	},
}
