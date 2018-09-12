
const Resource = require('./resource')

class Notification extends Resource {
    
    endpoint() {
        return 'notifications'
    }

    getItems(id) {
        return this.action(id, 'notification_items', 'GET')
    }
    
    addItem(id, data) {
        return this.action(id, 'notification_items', null, data)
    }

    removeItem(id, itemId) {
        return this.action(id, `notification_items/${itemId}`, 'DELETE')
    }
}

module.exports = Notification
