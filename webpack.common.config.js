const webpack = require('webpack');
const pick = require('lodash').pick;
const whitelist = require('./config/whitelist');
const nib = require('nib');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: [
    './client/index.js',
    './assets/all.styl',
  ],
  plugins: [
    // makes .env vars available to server and client
    new webpack.DefinePlugin({
      'process.env': Object.keys(pick(process.env, whitelist)).reduce((o, k) => {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {}),
    }),
    new AssetsPlugin({ filename: 'assets.json' }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader'),
      },
    ],
  },
  stylus: {
    use: [nib()],
  },
};
