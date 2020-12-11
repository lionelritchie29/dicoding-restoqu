/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlCriticalPlugin({
      base: path.resolve(__dirname, 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
});
