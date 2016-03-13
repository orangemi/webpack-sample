var Vue = require('vue')
var HTML = require('./todo.html')

module.exports = new Vue({
  template: HTML,
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue.js' },
      { text: 'Build Something Awesome' }
    ]
  }
})
