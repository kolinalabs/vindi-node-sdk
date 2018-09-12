
const Resource = require('./resource')

class Subscription extends Resource {

    endpoint() {
        return 'subscriptions'
    }

    renew(id) {
        return this.action(id, 'renew')
    }

    reactivate(id) {
        return this.action(id, 'reactivate')
    }
}

module.exports = Subscription
