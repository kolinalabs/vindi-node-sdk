
const Resource = require('./resource')

class User extends Resource {
    
    endpoint() {
        return 'users'
    }

    current() {
        return this.action(null, 'current')
    }
}

module.exports = User
