module.exports = {
  mode: "development",
  entry: './src',
  output: {
    filename: "dist/bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};
