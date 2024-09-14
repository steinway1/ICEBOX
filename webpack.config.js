const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'partial.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};