const http = require('http')
const zlib = require('zlib')

let option = {
    hostname: 'www.example.com',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip, deflate'
    }
}

http.request(option, res => {
    let body = []
    res.on('data', chunk => {
        body.push(chunk)
    })
    res.on('end', () => {
        body = Buffer.concat(body)
        if (res.headers['Content-Encoding'] === gzip) {
            zlib.gunzip(body, (err, data) => {
                console.log(data.toString())
            })
        } else {
            console.log(body.toString())
        }
    })
})