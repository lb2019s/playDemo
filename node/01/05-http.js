const fs = require('fs')
const http = require('http')

function getPrototypeChain(obj) {
    let chain = []
    while(obj = Object.getPrototypeOf(obj)) {
        chain.push(obj)
    }
    return chain
}

http.createServer((request, response) => {
    // console.log(getPrototypeChain(response));
    // response.end('wahhh')
    let { url, method, headers } = request
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                response.end('500！完蛋了。。')
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    } else if (url == '/users' && method === 'GET') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify([{name: '张三'}]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') > -1) {
        fs.createReadStream('.' + url).pipe(response)
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/plain;charset=utf-8'
        })
        response.end('404！找不到了。。')
    }
}).listen(3000, () => {
    console.log('server at http://localhost:3000');
})