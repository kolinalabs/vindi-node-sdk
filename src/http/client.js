
const BaseRequest = require('request')
const fs = require('fs')

class Client {

    constructor(config) {

        if (!config.apiKey) {
            config.apiKey = process.env.VINDI_API_KEY
        }

        if (!config.apiKey) {
            throw new Error('The apiKey is required.')
        }
        
        this.config = config ? config : {}
    }

    encodeApiKey() {
        return Buffer.from(this.config.apiKey).toString('base64')
    }
    
    createBasicAuth() {
        return `Basic ${this.encodeApiKey()}`
    }
    
    request(method, uri, options) {
                
        options.uri = uri
        options.method = method
        options.headers = {
            Authorization: this.createBasicAuth()
        }

        if (!options.hasOwnProperty('json')) {
            options.json = true
        }

        options.cert = fs.readFileSync(`${__dirname}/ssl/ca-bundle.crt`)

        return new Promise((resolve, reject) => {

            BaseRequest(options, (error, response, body) => {
                
                const errorCodes = /(5|4)[0-9]{2}/

                if (error) reject(error)

                if (errorCodes.test(response.statusCode)) reject(body)

                resolve(response)
            })
        })
    }

    get(uri, params) {
        return this.request('GET', uri, params)
    }

    post(uri, params) {
        return this.request('POST', uri, { json: params })
    }

    put(uri, params) {
        return this.request('PUT', uri, { json: params })
    }

    delete(uri, params) {
        return this.request('DELETE', uri, params)
    }
}

module.exports = Client
