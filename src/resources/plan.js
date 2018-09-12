
const Resource = require('./resource')

class Plan extends Resource {
    endpoint() {
        return 'plans'
    }
}

module.exports = Plan
