
const Resource = require('./resource')

class Customer extends Resource {

    endpoint() {
        return 'customers'
    }

    unarchive(id) {
        return this.action(id, 'unarchive')
    }
}

module.exports = Customer
