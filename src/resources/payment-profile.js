
const Resource = require('./resource')

class PaymentProfile extends Resource {
    
    endpoint() {
        return 'payment_profiles'
    }

    verify(id) {
        return this.action(id, 'verify')
    }
}

module.exports = PaymentProfile
