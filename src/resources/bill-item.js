
const Resource = require('./resource')

class BillItem extends Resource {
    endpoint() {
        return 'bill_items'
    }
}

module.exports = BillItem
