var Vue = require('vue')
var HTML = require('./main.html')
var calendar = require('./calendar')

var app = new Vue({
  el: '#app',
  template: HTML,
  data: {
    newTodo: '',
    todos: [
      { text: 'Add some todos' }
    ]
  },
  components: {
    calendar: calendar
  },
  methods: {
    addTodo: function () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text })
        this.newTodo = ''
      }
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    }
  }
})
module.exports = app
