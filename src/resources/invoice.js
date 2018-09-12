
const Resource = require('./resource')

class Invoice extends Resource {
    
    endpoint() {
        return 'invoices'
    }

    retry(id) {
        return this.action(id, 'retry')
    }
}

module.exports = Invoice
