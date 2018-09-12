
const Resource = require('./resource')

class PaymentMethod extends Resource {
    endpoint() {
        return 'payment_methods'
    }
}

module.exports = PaymentMethod
