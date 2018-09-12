
const Resource = require('./resource')

class Bill extends Resource {

    endpoint() {
        return 'bills'
    }

    approve(id) {
        return this.action(id, 'approve')
    }

    charge(id) {
        return this.action(id, 'charge')    
    }

    invoice(id) {
        return this.action(id, 'invoice')
    }
}

module.exports = Bill
