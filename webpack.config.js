const config = {
	mode: 'development',
	entry: {
		main: ['./src/js/main.js', ]
	},
	output: {
		filename: 'partial.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
}

module.exports = config;