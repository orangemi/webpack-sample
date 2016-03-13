'use strict'
const buildConfig = require('./webpack.build')
buildConfig.devtool = '#source-map'
module.exports = buildConfig
