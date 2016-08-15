var moment = require('moment')
require('./style.less')

module.exports = {
  template: require('./template.jade'),
  data: function () {
    return {
      date: new Date(),
      holidays: []
    }
  },
  computed: {
    currentMonth: function () {
      return moment(this.date).get('month') + 1
    },
    currentYear: function () {
      return moment(this.date).get('year')
    },
    weeks: function () {
      var date = moment(this.date)
      var firstDay = date.clone().startOf('month').startOf('week')
      var day = firstDay.clone()
      var result = []
      while (day.clone().startOf('week').startOf('month').valueOf() <= date.clone().startOf('month').valueOf()) {
        var weekIndex = day.diff(firstDay, 'week')
        var weekList = result[weekIndex] = result[weekIndex] || []
        weekList.push({
          date: day.format('YYYY-MM-DD'),
          day: day.get('date'),
          isPrevMonth: day.get('time') < date.clone().startOf('month').get('time'),
          isNextMonth: day.get('time') > date.clone().endOf('month').get('time'),
          isHoliday: this.holidays.indexOf(day.format('YYYY-MM-DD')) >= 0
        })
        day = day.add(1, 'day').clone()
      }
      return result
    }
  },
  methods: {
    goPrevMonth: function () {
      this.date = moment(this.date).add(-1, 'month').toDate()
      this.sync()
    },

    goNextMonth: function () {
      this.date = moment(this.date).add(1, 'month').toDate()
      this.sync()
    },

    sync: function () {
      var self = this
      this.$http({
        url: '/api/admin/holiday',
        data: { day: moment(this.date).format('YYYY-MM-DD') }
      }).then(function (resp) {
        resp = resp.data
        resp.map(function (holiday) {
          if (holiday.status) self.holidays.push(holiday.date)
        })
      }, function (resp) {
        console.error(resp)
      })
    },

    saveHoliday: function (weekday, event) {
      var self = this
      var date = weekday.date
      this.$http({
        url: '/api/admin/holiday/' + date,
        method: 'post',
        data: {
          isHoliday: !weekday.isHoliday
        }
      }).then(function (resp) {
        if (!weekday.isHoliday && self.holidays.indexOf(date) === -1) {
          self.holidays.push(date)
        } else if (self.holidays.indexOf(date) !== -1) {
          self.holidays.$remove(date)
        }
      }, function (resp) {
        console.error(resp)
      })
    }
  },
  created: function () {
    this.sync()
  }
}
