'use strict'
var Vue = require('vue')
var Router = require('vue-router')
var Resource = require('vue-resource')
require('bootstrap/less/bootstrap.less')
// require('./service/callouts.css')

Vue.use(Router)
Vue.use(Resource)
Vue.use(function (Vue) {
  if (Vue.$app) throw new Error('Vue.$app exists')
  Vue.$app = {}
})

// require('./service/util')

var App = require('pages/home')
var router = new Router()
router.map({
  '/': {
    component: {
      template: '<h3> Admin Home</h3>'
    }
  },
  '/calendar': {
    component: function (resolve) {
      resolve(require('pages/calendar'))
    }
  },
  '/bank': {
    component: function (resolve) {
      resolve(require('pages/bank-list'))
    }
  },
  '/*any': {
    component: {
      template: '<h3>Not found</h3>'
    }
  }
})

router.start(App, '#app')
