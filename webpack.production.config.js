const path = require('path');
const config = require('./webpack.common.config');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

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
    new AssetsPlugin({ filename: 'build/assets.json' }),
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
  ],
  module: {
    loaders: config.module.loaders,
  },
  stylus: config.stylus,
};
