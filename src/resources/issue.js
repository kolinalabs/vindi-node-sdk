
const Resource = require('./resource')

class Issue extends Resource {
    endpoint() {
        return 'issues'
    }
}

module.exports = Issue
