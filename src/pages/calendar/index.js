var moment = require('moment')
require('./style.less')

module.exports = {
  template: require('./template.jade'),
  data: function () {
    return {
      year: moment().year(),
      month: moment().month(),
      days: []
    }
  },
  ready: function () {
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
