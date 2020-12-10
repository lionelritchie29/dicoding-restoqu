/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src/styles/components'),
        ],
        use: [
          'to-string-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/styles/config.scss',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [path.resolve(__dirname, 'src/styles/components')],
        use: [
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/styles/config.scss',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'src/templates/components'),
          path.resolve(__dirname, 'src/templates/home'),
          path.resolve(__dirname, 'src/templates/detail'),
          path.resolve(__dirname, 'src/templates/favorite'),
          path.resolve(__dirname, 'src/templates/skeleton'),
          path.resolve(__dirname, 'src/templates/nav-footer'),
        ],
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/public/images/chef.png',
      favicons: {
        icons: {
          windows: false,
          coast: false,
          yandex: false,
          appleStartup: false,
        },
      },
    }),
    new InjectManifest({
      swSrc: './src/src-sw.js',
      swDest: 'service-worker.js',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.pwa.json',
      name: 'Restoqu',
      short_name: 'Restoqu',
      description:
        // eslint-disable-next-line max-len
        'Restoqu provide you with informations about restaurants across Indonesia',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#D89572',
      theme_color: '#D89572',
      crossorigin: 'use-credentials',
      ios: true,
      fingerprints: false,
      inject: true,
      icons: [
        {
          src: path.resolve('src/public/images/icons/icon-512x512.png'),
          sizes: [96, 128, 144, 192, 256, 384, 512],
          destination: 'icons',
          purpose: 'maskable',
        },
      ],
    }),
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
        ImageminPngquant(),
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
