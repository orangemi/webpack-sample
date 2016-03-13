'use strict'
const config = require('config')
const info = require('./package.json')
const toa = require('toa')
const toaStatic = require('toa-static')

let app = toa(function *() {}, function () {
  return true
})
app.use(toaStatic({}))

app.listen(config.port, function () {
  console.log(`${info.name}@${info.version} listen to ${config.port} ...`)
})
