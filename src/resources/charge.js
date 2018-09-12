
const Resource = require('./resource')

class Charge extends Resource {

    endpoint() {
        return 'charges'
    }

    charge(id) {
        return this.action(id, 'charge')
    }

    fraudReview(id) {
        return this.action(id, 'fraud_review')
    }

    reissue(id) {
        return this.action(id, 'reissue')
    }

    refund(id) {
        return this.action(id, 'refund')
    }
}

module.exports = Charge
