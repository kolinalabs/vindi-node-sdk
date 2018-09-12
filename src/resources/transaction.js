
const Resource = require('./resource')

class Transaction extends Resource {
    endpoint() {
        return 'transactions'
    }
}

module.exports = Transaction
