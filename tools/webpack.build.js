'use strict'
const webpack = require('webpack')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

module.exports = {
  entry: {
    main: './src/main.js',
    vendor: ['vue']
  },
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  plugins: [
    new CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new UglifyJsPlugin({})
  ]
}
