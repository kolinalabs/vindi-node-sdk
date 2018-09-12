
const Client = require('./../http/client')
const Links = require('./../http/links')
var querystring = require("querystring")

const Filter = require('./../filter/builder')

class Resource {

    constructor() {
        
        if (!this.endpoint) {
            throw new Error('The endpoint() method must be implemented')
        }

        this.apiUri = process.env.VINDI_API_URI ? process.env.VINDI_API_URI : 'https://app.vindi.com.br/api/v1'

        this.client = new Client({})
    }

    filter() {
        return new Filter
    }

    url(id, extra) {

        let endpoint = this.endpoint()
        
        if (id) endpoint += `/${id}`
        if (extra) endpoint += `/${extra}`

        return `${this.apiUri}/${endpoint}`
    }
    
    all(params) {

        /**
         * Compatibility problems were encountered in determining that the request parse the query string.
         * For this reason this procedure is performed here.
         */
        params = params ? params : {}
        const query = querystring.stringify(params)
        
        const uri = query ? `${this.url()}?${query}` : this.url()

        return new Promise((resolve, reject) => {
            this.client.get(uri, params).then(response => {
                
                const items = response.body[this.endpoint()]
                const links = Links.parse(response.headers['link'])

                resolve({
                    items: items,
                    links: links,
                    perPage: response.headers['per-page'],
                    total: response.headers['total'],
                    rates: {
                        limit: response.headers['rate-limit-limit'],
                        remaining: response.headers['rate-limit-remaining'],
                        reset: response.headers['rate-limit-reset']
                    }
                })

            }).catch(error => reject(error))
        })
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.client.post(this.url(), data).then(response => {
                const key = Object.keys(response.body)[0]
                resolve(response.body[key])
            }).catch(error => reject(error))
        })
    }

    retrieve(id) {
        return new Promise((resolve, reject) => {
            this.client.get(this.url(id), {}).then(response => {
                this.response(response, resolve)
            }).catch(error => reject(error))
        })
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            this.client.put(this.url(id), data).then(response => {
                this.response(response, resolve)
            }).catch(error => reject(error))
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.client.delete(this.url(id), {}).then(response => {
                this.response(response, resolve)
            }).catch(error => reject(error))
        })
    }

    action(id, action, method, data) {
        
        const httpMethod = method ? method.toLowerCase() : 'post'
        const httpData = data ? data : {}

        return new Promise((resolve, reject) => {
            this.client[httpMethod](this.url(id, action), httpData).then(response => {
                this.response(response, resolve)
            }).catch(error => reject(error))
        })
    }

    response(response, resolve) {
        const key = Object.keys(response.body)[0]
        resolve(response.body[key])
    }
}

module.exports = Resource
