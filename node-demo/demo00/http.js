const http = require('http')
const { hostname } = require('os')
const port = 3000
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset="utf-8"')
    res.end('你好，nodejs\n')
})
// server.listen(port, () => {
//     console.log(`服务器运行在 http://${hostname}:${port}/`)
// })
console.log(http.STATUS_CODES)