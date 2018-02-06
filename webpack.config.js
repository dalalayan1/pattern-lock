var path = require('path');

console.log('running webpack-dev');

var config = {
	entry:[
		'./src/main.js'
		],
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js',
        publicPath: '/'
	},
	devServer: {
		inline: true,
		contentBase:'./',
		port:3001
	},
	module: {
		loaders: [
		{
			test:/\.jsx?$/,
			exclude:/node_modules/,
			loader:'babel-loader',
			include: path.join(__dirname, 'src')
		},
		{
			test: /\.scss$/,
			exclude:/node_modules/,
			loader: 'style-loader!css-loader!sass-loader',
			include: path.join(__dirname, 'src')
		}
		]
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx']
	}
}
module.exports = config;