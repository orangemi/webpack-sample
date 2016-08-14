'use strict'
const path = require('path')
// const config = require('config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const DefinePlugin = webpack.DefinePlugin

module.exports = {
  entry: {
    main: './src',
    vendor: ['vue', 'moment', 'vue-resource', 'vue-router', 'lodash']
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/build/',
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      pages: path.resolve(__dirname, '../src/pages')
    }
  },
  module: {
    loaders: [
      { test: /\.html$/,
        loader: 'html-loader' },
      { test: /\.jade$/,
        loader: 'jade-static-loader' },
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?.*)?$/,
        loader: 'file' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file' },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
    new CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new UglifyJsPlugin({
      compress: {warnings: false}
    }),
    new ExtractTextPlugin('[name].bundle.css'),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    })
  ]
}
