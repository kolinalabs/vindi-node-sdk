
const Resource = require('./resource')

class Merchant extends Resource {
    
    endpoint() {
        return 'merchants'
    }

    current() {
        return this.action(null, 'current')
    }
}

module.exports = Merchant
