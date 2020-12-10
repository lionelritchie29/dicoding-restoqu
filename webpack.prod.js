/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    new BundleAnalyzerPlugin(),
  ],
});
