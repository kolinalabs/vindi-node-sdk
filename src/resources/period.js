
const Resource = require('./resource')

class Period extends Resource {

    endpoint() {
        return 'periods'
    }

    bill(id) {
        return this.action(id, 'bill')
    }
}

module.exports = Period
