const path = require('path')
const http = require('http')
const url = require('url')
const route = require('./module/route')

http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname.replace('/', '')
    try {
        route[pathname](req, res)
    } catch(e) {
        route['error'](req, res)
    }
}).listen(3000)
