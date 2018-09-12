
const Resource = require('./resource')

class Message extends Resource {

    endpoint() {
        return 'messages'
    }

    send(data) {
        return this.create(data)
    }
}

module.exports = Message
