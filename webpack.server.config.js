const webpack = require('webpack');
const fs = require('fs');
const config = require('./webpack.common.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server/server.js',
  target: 'node',
  output: {
    path: __dirname + '/build',
    filename: 'server.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
  ],
  externals: nodeModules,
  module: {
    loaders: config.module.loaders,
  },
  devtool: 'sourcemap',
  stylus: config.stylus,
  node: {
    __dirname: true,
  },
};
