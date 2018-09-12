
const Resource = require('./resource')

class ProductItem extends Resource {
    endpoint() {
        return 'product_items'
    }
}

module.exports = ProductItem
