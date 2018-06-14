const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
  output: {
    filename: 'photosBundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
