module.exports = {
  template: require('./template.jade'),
  data: function () {
    return {
      page: 1,
      banks: [],
      searchBankName: '',
      newBank: {
        rate: 100,
        name: '',
        account_name: '',
        account_number: '',
        bank_name: '',
        bank_number: ''
      }
    }
  },
  methods: {
    searchBank: function () {
      this.$http.get('/api/admin/bank{?name,page}', {
        params: {
          name: this.searchBankName,
          page: this.page
        }
      }).then(function (resp) {
        this.banks = resp.data
      }, function (resp) {
      })
    },
    saveBank: function (bank) {
      this.$http.post('/api/admin/bank' + (bank.id ? '/' + bank.id : ''), bank).then(function (resp) {
        alert('Update Success')
        if (!bank.id) {
          this.newBank.rate = 100
          this.newBank.name = ''
          this.newBank.account_name = ''
          this.newBank.account_number = ''
          this.newBank.bank_name = ''
          this.newBank.bank_number = ''
        }
      }, function (resp) {
        alert('Update failed')
      })
    }
  }
}
