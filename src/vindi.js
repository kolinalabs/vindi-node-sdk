
const Filter = require('./filter')
const resources = require('./resources')

function V() {}

const camelize = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

const hasResource = (resource) => {
    return resources.hasOwnProperty(resource)
}

const handler = {
    get: function(target, property) {

        if ('V' !== target.name) {
            return
        }

        const resource = camelize(property)

        if (hasResource(resource)) {
            return new resources[resource]
        }

        if (property === 'filter') {
            return new Filter()
        }
    }
}

module.exports = new Proxy(V, handler)
