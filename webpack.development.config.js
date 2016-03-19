const path = require('path');
const config = require('./webpack.common.config');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
  ].concat(config.entry),
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new WebpackNotifierPlugin(),
  ]),
  module: {
    loaders: config.module.loaders,
  },
  stylus: config.stylus,
};

