const path = require('path');
const config = require('./webpack.common.config');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const assetPath = path.join(__dirname, 'public');

module.exports = {
  devtool: 'source-map',
  entry: config.entry,
  output: {
    path: assetPath,
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new CleanPlugin([assetPath]),
    new ExtractTextPlugin('[name].[chunkhash].css', {
      allChunks: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ].concat(config.plugins),
  module: {
    loaders: config.module.loaders,
  },
  stylus: config.stylus,
};
