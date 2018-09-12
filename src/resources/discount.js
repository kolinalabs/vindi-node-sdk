
const Resource = require('./resource')

class Discount extends Resource {
    endpoint() {
        return 'discounts'
    }
}

module.exports = Discount
