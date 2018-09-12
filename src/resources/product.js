
const Resource = require('./resource')

class Product extends Resource {
    endpoint() {
        return 'products'
    }
}

module.exports = Product
