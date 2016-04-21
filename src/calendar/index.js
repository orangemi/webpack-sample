var moment = require('moment')
var Vue = require('Vue')
var HTML = require('./index.html')

var calendar = new Vue({
  template: HTML,
  data: {
    year: moment().year(),
    month: moment().month(),
    days: []
  },
  methods: {
    init: function () {
      var year = this.year
      var month = this.month
      var firstDay = moment({year: year, month: month, day: 1})
      var firstWeekDay = firstDay.day()
      // console.log(weekday)
      for (var i = 0; i < firstWeekDay; i++) {
        this.days.push({day: ''})
      }
      for (var i = 0; i < firstDay.endOf('month').date(); i++) {
        this.days.push({day: i + 1})
      }
    }
  }
})

module.exports = calendar
